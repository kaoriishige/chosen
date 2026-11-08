// Netlify Function: 本物の大規模言語モデル（LLM）を使って、
// ユーザーの自由な文章要望・対話文脈を理解し、「約束できる成果」や「ビコーズ（根拠）」を書き換える

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store"
    }
  });
}

function buildSystemPrompt(mode) {
  if (mode === "evidence") {
    return `あなたは『ビコーズ・フレームワーク』の専門コピーライターです。
オーナーの要望通りに「信頼のビコーズ（なぜなら〜だからです）」を書き換えてください。
・オーナーが否定した内容（12歳未満制限、個室料理、離れ等）は完全に削除すること。
・架空の設備を捏造しないこと。文末は「〜ているから。」「〜があるから。」にすること。
・replyはオーナーへの丁寧な返答（1文）にすること。
以下のJSONのみ出力してください:
{"reply":"返答","candidates":[{"category":"systematic","tag":"★ AI最新提案①（要望反映）","title":"見出し","body":"文章"},{"category":"perceived","tag":"AI最新提案②（安心・実績）","title":"見出し","body":"文章"},{"category":"created","tag":"AI最新提案③（簡潔版）","title":"見出し","body":"短い文章"}]}`;
  }

  return `あなたは『ビコーズ・フレームワーク』の専門コピーライターです。
オーナーの要望通りに「顧客に対して約束できる成果（ベネフィット）」を書き換えてください。
・オーナーが否定した内容（個室料理、豪華等）は完全に削除すること。
・架空の要素を捏造しないこと。文末は「〜できる。」「〜を得られる。」「〜を過ごせる。」にすること。
・replyはオーナーへの丁寧な返答（1文）にすること。
以下のJSONのみ出力してください:
{"reply":"返答","candidates":[{"tag":"★ AI最新提案①（要望反映）","title":"見出し","body":"文章"},{"tag":"AI最新提案②（感情重視）","title":"見出し","body":"文章"},{"tag":"AI最新提案③（簡潔版）","title":"見出し","body":"短い文章"}]}`;
}

export async function callLlmChat({ mode, companyName, industryFamily, business, slot, chatHistory, userRequest }) {
  const systemPrompt = buildSystemPrompt(mode);

  const historyText = Array.isArray(chatHistory) && chatHistory.length > 0
    ? chatHistory.slice(-5).map(h => `オーナーの指示: ${h.user}\nAIの返答: ${h.ai}`).join("\n")
    : "（今回が最初の指示）";

  const userPrompt = `【企業・店舗情報】
・業種：${industryFamily || "未設定"}
・屋号/企業名：${companyName || "未設定"}
・事業内容・特徴：${business || "未設定"}

【現在編集中の切り口】
・切り口テーマ：${slot?.title || ""}
・顧客の悩み（洞察）：${slot?.friction || ""}
・顧客の望み：${slot?.desired || ""}
・対象顧客（誰に）：${slot?.target || ""}
・現在の「約束できる成果」：${slot?.outcome || ""}
・現在の「信頼のビコーズ（根拠）」：${slot?.evidence || ""}

【これまでの会話履歴】
${historyText}

【オーナーからの今回の要望・指示】
「${userRequest}」

上記の要望・指示の意味を正確に理解し、現在の文章をプロ品質で書き換えたJSONを出力してください。`;

  const messages = [
    { role: "system", content: systemPrompt },
    { role: "user", content: userPrompt }
  ];

  // 1. OpenAI API Key がある場合は公式OpenAI APIを使用
  if (process.env.OPENAI_API_KEY) {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        response_format: { type: "json_object" },
        messages,
        temperature: 0.7
      })
    });
    if (res.ok) {
      const data = await res.json();
      const content = data.choices?.[0]?.message?.content;
      if (content) return JSON.parse(content);
    }
  }

  // 2. キー不要のOpenAI互換LLMエンドポイントを使用
  const res = await fetch("https://text.pollinations.ai/openai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "openai-fast",
      max_tokens: 2048,
      reasoning_effort: "low",
      messages
    })
  });

  if (!res.ok) {
    const errTxt = await res.text().catch(() => "");
    throw new Error(`LLM HTTP error: ${res.status} ${errTxt}`);
  }

  const data = await res.json();
  let rawContent = data.choices?.[0]?.message?.content || "";
  rawContent = rawContent.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/\s*```$/, "").trim();
  return JSON.parse(rawContent);
}

export default async function handler(request) {
  if (request.method !== "POST") {
    return jsonResponse({ error: "Method Not Allowed" }, 405);
  }
  try {
    const payload = await request.json();
    if (!payload || !payload.userRequest) {
      return jsonResponse({ error: "要望テキストが入力されていません。" }, 400);
    }
    const result = await callLlmChat(payload);
    return jsonResponse(result, 200);
  } catch (err) {
    return jsonResponse({ error: err.message || "AI生成エラー" }, 500);
  }
}
