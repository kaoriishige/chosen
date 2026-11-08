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
    return `あなたは書籍『顧客を買う気にさせる ビコーズ・フレームワーク』の専属AIコンサルタント兼プロのコピーライターです。
店舗オーナーや経営者であるユーザーの指示・要望を正確に汲み取り、「顧客がその成果を信じるに足るビコーズ（根拠・なぜなら〜だからです）」を書き換えてください。

【絶対厳守ルール】
1. ユーザーの発言の意味・文脈・ニュアンスを深く理解してください。入力文をそのままコピペして繋げるような機械的な処理は絶対にしないでください。
2. ユーザーが否定・訂正した内容（例：「個室料理ではない」「部屋食ではない」「高級ではない」「12歳制限はない」等）は完全に削除し、一切残さないでください。
3. ユーザーが伝えた事実・強み・こだわり（例：看板猫、ぬる湯、家庭料理、アットホーム、手作業、実績など）を魅力的な「選ばれる根拠」に昇華させてください。
4. 各候補の \`body\` は、「なぜなら、【body】だからです。」の【body】に入る自然な文章（文末は「〜ているから。」「〜があるから。」など）にしてください。
5. \`reply\` はユーザーに直接語りかける丁寧で自然な返答（「ご指摘ありがとうございます！〇〇の表現を外し、△△の魅力が伝わるように書き換えました。」など）にしてください。「ユーザーのご要望を〜」のような三人称表現は禁止です。
6. 必ず以下のJSONオブジェクトのみを出力してください：
{
  "reply": "ユーザーへの丁寧で的確な返答メッセージ（1〜2文）",
  "candidates": [
    {
      "category": "systematic",
      "tag": "★ AI最新提案①（要望直球反映・メイン案）",
      "title": "案の短い見出し（15文字以内）",
      "body": "ユーザーの要望を最も的確に反映したビコーズ（根拠）の文章（50〜110文字程度）"
    },
    {
      "category": "perceived",
      "tag": "AI最新提案②（安心感・現場の温もり重視）",
      "title": "案の短い見出し（15文字以内）",
      "body": "顧客が安心し信頼できる角度から表現したビコーズ（根拠）の文章（50〜110文字程度）"
    },
    {
      "category": "created",
      "tag": "AI最新提案③（シンプル・簡潔版）",
      "title": "案の短い見出し（15文字以内）",
      "body": "短く端的にまとめたビコーズ（根拠）の文章（35〜65文字程度）"
    }
  ]
}`;
  }

  // デフォルト: outcome（顧客に対して約束できる成果）
  return `あなたは書籍『顧客を買う気にさせる ビコーズ・フレームワーク』の専属AIコンサルタント兼プロのコピーライターです。
店舗オーナーや経営者であるユーザーの指示・要望を正確に汲み取り、「顧客に対して約束できる具体的な成果（顧客が手に入れる嬉しい変化・ベネフィット）」を書き換えてください。

【絶対厳守ルール】
1. ユーザーの発言の意味・文脈・ダメ出し・要望を深く理解してください。入力された言葉をそのまま機械的に当てはめるのではなく、プロの日本語コピーとして自然で魅力的な文章に書き換えてください。
2. ユーザーが否定・訂正した内容（例：「個室料理ではない」「豪華ではない」「露天風呂はない」等）は完全に削除し、一切残さないでください。
3. 事業内容やユーザーの発言にない架空の要素（プロポーズ、高級懐石など）を勝手に捏造しないでください。
4. 単なる設備や特徴の羅列ではなく、それによって「顧客がどんな嬉しい体験・気分の変化・満足を得られるか」まで描いてください。
5. 各候補の \`body\` は、「（誰に）に、【body】を提供します。」につながる自然な文章（文末は「〜できる。」「〜を得られる。」「〜を過ごせる。」など）にしてください。
6. \`reply\` はユーザーに直接語りかける丁寧で自然な返答（「承知いたしました！〇〇の表現をなくし、△△の良さがしっかり伝わる成果文に書き換えました。」など）にしてください。「ユーザーのご要望を〜」のような三人称は禁止です。
7. 必ず以下のJSONオブジェクトのみを出力してください：
{
  "reply": "ユーザーへの丁寧で的確な返答メッセージ（1〜2文）",
  "candidates": [
    {
      "tag": "★ AI最新提案①（要望直球反映・メイン案）",
      "title": "案の短い見出し（15文字以内）",
      "body": "ユーザーの要望を最も的確かつ魅力的に反映した成果の文章（50〜110文字程度）"
    },
    {
      "tag": "AI最新提案②（感情・体験シーン重視）",
      "title": "案の短い見出し（15文字以内）",
      "body": "顧客の心が動く体験シーンや感情の変化を描いた成果の文章（50〜110文字程度）"
    },
    {
      "tag": "AI最新提案③（シンプル・簡潔版）",
      "title": "案の短い見出し（15文字以内）",
      "body": "ひと目でスッと伝わる簡潔な成果の文章（35〜65文字程度）"
    }
  ]
}`;
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
      response_format: { type: "json_object" },
      messages,
      temperature: 0.7
    })
  });

  if (!res.ok) {
    throw new Error(`LLM HTTP error: ${res.status}`);
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
