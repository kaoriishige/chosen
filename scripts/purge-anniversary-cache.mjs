import fs from 'node:fs';

let html = fs.readFileSync('dist/index.html', 'utf8');

// 1. STORAGE_KEY を v2 に変更
html = html.replace('const STORAGE_KEY = "because-framework-5slots-v1";', 'const STORAGE_KEY = "because-framework-5slots-v2";');

// 2. 記念日・プロポーズ判定ブロックを完全削除
const anniversaryCheckBlock = `          // ※「記念日」や「プロポーズ」という単語が実際にサイトにある場合のみ追加！
          if (full.includes("記念日") || full.includes("プロポーズ") || full.includes("誕生日") || full.includes("ハレの日")) {
            detected.push({
              title: "記念日・特別なハレの日のお祝い軸",
              marketingRole: "誕生日・記念日専用プラン・ギフト需要",
              friction: "大切なパートナーの記念日で、せっかくの旅行が期待外れで台無しになる不安。",
              desired: "一生の思い出に残るサプライズと温かいおもてなしで、相手が心から喜ぶ笑顔を見たい。",
              target: "結婚記念日やパートナーの誕生日を、温かいおもてなしと個室空間で思い出深いものにしたいご夫婦・カップル",
              outcome: "事前の丁寧な相談と温かいおもてなしにより、パートナーから深く感謝される最高の記念日を過ごせる。",
              evidence: "記念日のお客様に寄り添った特別な演出や記念特典をご用意しているから。"
            });
          }`;

html = html.replace(anniversaryCheckBlock, '');

// 3. sanitizeSlots 関数と loadState 内での古いキャッシュ自動消去処理を追加
const targetLoadState = `      function loadState() {
        try {
          const raw = localStorage.getItem(STORAGE_KEY);
          if (raw) {
            const parsed = JSON.parse(raw);
            if (parsed && parsed.answers && parsed.answers.slots && parsed.answers.slots.length === 5) {
              state = Object.assign(state, parsed);
            }
          }
        } catch (e) {
          console.warn("Storage load error:", e);
        }
      }`;

const replacementLoadState = `      // 古いキャッシュや不適切な記念日スロットを強制的に自動浄化する関数
      function sanitizeSlots(slots) {
        if (!slots || !Array.isArray(slots)) return slots;
        return slots.map((s, idx) => {
          const t = s.title || "";
          const f = s.friction || "";
          const tgt = s.target || "";
          if (t.includes("記念日") || t.includes("ハレの日") || f.includes("記念日") || tgt.includes("プロポーズ")) {
            return {
              id: s.id || \`slot_\${idx + 1}\`,
              priority: s.priority || (idx + 1),
              title: "人懐っこい看板猫とのふれあい癒やし軸",
              marketingRole: "猫好き向けSNS・猫旅専門メディア・口コミ展開",
              friction: "ペットは飼えないけれど猫が大好きで、アットホームな宿で本物の猫と心ゆくまで触れ合って癒やされたい。",
              desired: "人懐っこい看板猫にお出迎えされ、のんびり日向ぼっこする姿を眺めながら日常の疲れを完全に癒やしたい。",
              target: "日常の仕事に疲れ、人懐っこい看板猫に温かく出迎えられて心から癒やされたい猫好きの旅人・一人客",
              outcome: "看板猫の愛らしい仕草や温もりに触れることで、日頃のストレスや孤独感が消え去り、心がじんわり温まる深い癒やしを得られる。",
              evidence: "宿の看板猫たちが自然体で館内でお出迎えし、猫好きのお客様を家族のように温かく迎えるアットホームな雰囲気があるから。"
            };
          }
          return s;
        });
      }

      function loadState() {
        try {
          // ブラウザに残った古いキャッシュを強制破棄
          localStorage.removeItem("because-framework-5slots-v1");
          localStorage.removeItem("because-framework-v2");
          localStorage.removeItem("because-ai-expert-v1");

          const raw = localStorage.getItem(STORAGE_KEY);
          if (raw) {
            const parsed = JSON.parse(raw);
            if (parsed && parsed.answers && parsed.answers.slots && parsed.answers.slots.length === 5) {
              parsed.answers.slots = sanitizeSlots(parsed.answers.slots);
              state = Object.assign(state, parsed);
            }
          }
          state.answers.slots = sanitizeSlots(state.answers.slots);
        } catch (e) {
          console.warn("Storage load error:", e);
        }
      }`;

html = html.replace(targetLoadState, replacementLoadState);

fs.writeFileSync('dist/index.html', html, 'utf8');
console.log('Successfully purged anniversary cache and updated STORAGE_KEY to v2!');
