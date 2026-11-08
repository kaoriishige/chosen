import fs from 'node:fs';

let html = fs.readFileSync('dist/index.html', 'utf8');

// 順位ごとのマーケティング役割マスター定義
const priorityRolesMap = {
  1: {
    label: "★ 第1優先（メイン看板・フラッグシップ）",
    role: "公式サイトTOPファーストビュー・名刺・メイン看板・パンフ表紙",
    desc: "お店や会社の「代表コンセプト」。パッと見で『何のお店・宿なのか』を強烈に認知させ、第一選択肢にします。",
    badgeClass: "p1"
  },
  2: {
    label: "第2優先（主力サブ・専用LP）",
    role: "Google検索広告・専用ランディングページ・主力プラン",
    desc: "メイン看板とは異なる切実なニーズを持つ客層向け。専用LPや検索広告でピンポイントに成約させます。",
    badgeClass: "sub"
  },
  3: {
    label: "第3優先（特定ニーズ・季節企画）",
    role: "季節限定キャンペーン・平日/オフシーズン対策・リピーター向けLINE配信",
    desc: "特定のこだわり層や、オフシーズンの稼働率底上げに活用。ニッチだが熱狂的なファンを作ります。",
    badgeClass: "sub"
  },
  4: {
    label: "第4優先（AI検索FAQ・深掘り記事）",
    role: "AI検索（ChatGPT/Perplexity）用公式FAQ・ブログ深掘り記事",
    desc: "AI検索で顧客が細かい条件で探した際に、ピンポイントで自社が推薦されるための公式一次情報として掲載します。",
    badgeClass: "sub"
  },
  5: {
    label: "第5優先（リピーター・安心の裏づけ）",
    role: "公式Webのこだわり詳細ページ・口コミ返信・現場のおもてなし",
    desc: "来店・宿泊した顧客の満足度を高め、口コミやリピートにつなげるための現場の隠れたこだわりとして機能します。",
    badgeClass: "sub"
  }
};

// スクリプト内の関数を追加・差し替え
const priorityFunctions = `
      // 順位ごとの実践マーケティング用途マスター
      const PRIORITY_MARKETING_ROLES = {
        1: {
          label: "★ 第1優先（メイン看板・フラッグシップ）",
          role: "公式サイトTOP一番上・メイン看板・パンフレット表紙・代表メッセージ",
          desc: "お店や会社の『代表コンセプト』。初見の顧客に『何のお店・宿なのか』を一瞬で認知させ、第一選択肢にします。",
          badgeClass: "p1"
        },
        2: {
          label: "第2優先（主力サブ・専用LP）",
          role: "Google検索広告・専用ランディングページ（LP）・主力宿泊プラン",
          desc: "メインとは異なる切実なニーズ（例：ぬる湯・湯治等）を持つ客層向け。専用LPや広告でピンポイントに成約させます。",
          badgeClass: "sub"
        },
        3: {
          label: "第3優先（特定ニーズ・季節企画）",
          role: "季節限定キャンペーン・平日/オフシーズン対策プラン・リピーター向けLINE配信",
          desc: "特定のこだわり層や、閑散期の稼働率底上げに活用。ニッチだが客単価の高いファンを作ります。",
          badgeClass: "sub"
        },
        4: {
          label: "第4優先（AI検索FAQ・深掘り記事）",
          role: "AI検索（ChatGPT/Perplexity）用公式FAQ・公式ブログ深掘り記事",
          desc: "AI検索でユーザーが細かい条件で探した際に、他社を差し置いてピンポイントで推薦されるための公式一次情報にします。",
          badgeClass: "sub"
        },
        5: {
          label: "第5優先（安心の裏づけ・現場対応）",
          role: "公式サイトのこだわり詳細ページ・口コミ返信・現場スタッフのおもてなし",
          desc: "来店・宿泊した顧客の感動体験を深め、高評価口コミやリピートを自然に生み出す現場のこだわりとして機能させます。",
          badgeClass: "sub"
        }
      };

      // 順位（1〜5位）の自由な変更・入れ替え処理
      window.changeSlotPriority = (slotIdx, newPriorityStr) => {
        const newPriority = parseInt(newPriorityStr, 10);
        if (isNaN(newPriority) || newPriority < 1 || newPriority > 5) return;

        const currentSlotObj = state.answers.slots[slotIdx];
        const oldPriority = currentSlotObj.priority;
        if (oldPriority === newPriority) return;

        // 同じ順位を持っている他のスロットを探して入れ替え（swap）
        const otherSlot = state.answers.slots.find((s, i) => i !== slotIdx && s.priority === newPriority);
        if (otherSlot) {
          otherSlot.priority = oldPriority;
          if (PRIORITY_MARKETING_ROLES[oldPriority]) {
            otherSlot.marketingRole = PRIORITY_MARKETING_ROLES[oldPriority].role;
          }
        }

        currentSlotObj.priority = newPriority;
        if (PRIORITY_MARKETING_ROLES[newPriority]) {
          currentSlotObj.marketingRole = PRIORITY_MARKETING_ROLES[newPriority].role;
        }

        // 優先度順にソート
        state.answers.slots.sort((a, b) => a.priority - b.priority);

        // 現在選択中のスロットインデックスを更新
        const newIdx = state.answers.slots.findIndex(s => s.id === currentSlotObj.id);
        state.selectedSlotIndex = newIdx >= 0 ? newIdx : 0;

        saveState();
        renderHeroSteps();
        renderStepNavList();
        renderQuestionPanel();
        renderStrategyBoard();
        showToast(\`順位を「第\${newPriority}優先」に更新しました！\`);
      };

      // 順位を1つ上げる（上へ移動）
      window.moveSlotUp = (slotIdx) => {
        if (slotIdx <= 0) return;
        const currentP = state.answers.slots[slotIdx].priority;
        window.changeSlotPriority(slotIdx, currentP - 1);
      };

      // 順位を1つ下げる（下へ移動）
      window.moveSlotDown = (slotIdx) => {
        if (slotIdx >= state.answers.slots.length - 1) return;
        const currentP = state.answers.slots[slotIdx].priority;
        window.changeSlotPriority(slotIdx, currentP + 1);
      };
`;

// ステップ2のHTML全体を「実践的な使い方ガイド＋順位選択UI」に大幅強化
const newStep2Html = `
        // ステップ2：5つの切り口（洞察 × 誰に）と優先順位づけ
        else if (stepNum === 1) {
          contentHtml = \`
            <div class="question-header">
              <span class="question-stage-tag">\${escapeHtml(currentStage.tag)}</span>
              <h2 class="question-title">\${escapeHtml(currentStage.title)}</h2>
              <p class="question-desc">\${escapeHtml(currentStage.desc)}</p>
            </div>

            <!-- ★実践マーケティング活用ガイド（これをどう使うのかの完全解説） -->
            <div style="background:linear-gradient(135deg, #f0fdfa, #f8fafc); border:1.5px solid #99f6e4; border-radius:12px; padding:18px; margin-bottom:18px;">
              <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:10px; margin-bottom:12px;">
                <h3 style="margin:0; font-size:1.02rem; font-weight:800; color:var(--teal-dark); display:flex; align-items:center; gap:8px;">
                  <span>📖</span>
                  <span>5つの切り口と優先順位の実践的な使い方（集客活用法）</span>
                </h3>
                <button type="button" class="ai-adopt-btn" style="flex:none; padding:6px 14px; white-space:nowrap;" onclick="window.regenerateSlotsFromCurrentBusiness()">
                  🔄 サイト情報・事業内容から切り口を再生成
                </button>
              </div>

              <p style="margin:0 0 12px; font-size:0.86rem; color:var(--ink-soft); line-height:1.6;">
                どんな店舗・企業でも、お客様の悩み（洞察）によって求める価値が異なります。<strong>「すべてを同時に言おうとする（総花化）」と誰にも刺さらなくなる</strong>ため、下のように<strong>優先順位をつけて発信媒体ごとに使い分ける</strong>のが最強の戦略です。
              </p>

              <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:10px; font-size:0.8rem;">
                <div style="background:#ffffff; border:1px solid #fed7aa; border-left:4px solid #d97706; border-radius:8px; padding:10px 12px;">
                  <strong style="color:#b45309; display:block; margin-bottom:2px;">★ 第1優先【メイン看板・フラッグシップ】</strong>
                  <span style="color:var(--ink-soft); display:block; margin-bottom:4px;"><strong>使い道:</strong> 公式サイトTOPの一番上・名刺・メイン看板・パンフレット表紙</span>
                  <span style="color:var(--muted); font-size:0.75rem;">一目で「何のお店・宿なのか」を認知させ、他社との差別化を決定づける看板メッセージにします。</span>
                </div>
                <div style="background:#ffffff; border:1px solid #bae6fd; border-left:4px solid #0284c7; border-radius:8px; padding:10px 12px;">
                  <strong style="color:#0369a1; display:block; margin-bottom:2px;">第2・第3優先【主力サブ・専用LP・季節企画】</strong>
                  <span style="color:var(--ink-soft); display:block; margin-bottom:4px;"><strong>使い道:</strong> Google検索広告（リスティング）・専用LP・予約サイト主力プラン</span>
                  <span style="color:var(--muted); font-size:0.75rem;">メイン看板とは異なる切実なニーズ（ぬる湯、静寂、一人旅など）を持つ顧客を専用ページで確実に刈り取ります。</span>
                </div>
                <div style="background:#ffffff; border:1px solid #bbf7d0; border-left:4px solid #16a34a; border-radius:8px; padding:10px 12px;">
                  <strong style="color:#15803d; display:block; margin-bottom:2px;">第4・第5優先【AI検索FAQ・オウンドメディア】</strong>
                  <span style="color:var(--ink-soft); display:block; margin-bottom:4px;"><strong>使い道:</strong> ChatGPT/Perplexity用公式FAQ・ブログ深掘り記事・口コミ返信</span>
                  <span style="color:var(--muted); font-size:0.75rem;">AI検索で顧客が細かい条件で質問した際、自社がピンポイントで第一選択肢に推薦される一次情報にします。</span>
                </div>
              </div>
            </div>

            <!-- 5つの切り口カード一覧（各カードで順位変更可能） -->
            <div class="cut-cards-container">
              \${state.answers.slots.map((s, idx) => {
                const isP1 = s.priority === 1;
                const isSelected = idx === state.selectedSlotIndex;
                const roleInfo = PRIORITY_MARKETING_ROLES[s.priority] || { label: \`第\${s.priority}優先\`, role: s.marketingRole, desc: "" };

                return \`
                  <div class="cut-card \${isP1 ? 'is-priority1' : ''} \${isSelected ? 'is-active' : ''}">
                    <!-- カード上部：優先順位セレクトとタイトル -->
                    <div class="cut-card-head">
                      <div class="cut-card-title-row">
                        <span class="cut-priority-badge \${isP1 ? 'p1' : 'sub'}">
                          \${isP1 ? '★ 第1優先（メイン看板）' : \`第\${s.priority}優先\`}
                        </span>
                        <h3 class="cut-card-title">\${escapeHtml(s.title)}</h3>
                      </div>

                      <!-- 優先順位変更ドロップダウン＆上下ボタン -->
                      <div style="display:flex; align-items:center; gap:8px;">
                        <div style="display:flex; align-items:center; gap:4px; background:var(--surface-alt); border:1px solid var(--line); border-radius:6px; padding:2px 6px;">
                          <label style="font-size:0.72rem; font-weight:700; color:var(--muted);">順位変更:</label>
                          <select style="border:none; background:transparent; font-size:0.78rem; font-weight:700; color:var(--ink); cursor:pointer;" onchange="window.changeSlotPriority(\${idx}, this.value)">
                            <option value="1" \${s.priority === 1 ? 'selected' : ''}>★ 第1優先（メイン看板）</option>
                            <option value="2" \${s.priority === 2 ? 'selected' : ''}>第2優先（専用LP）</option>
                            <option value="3" \${s.priority === 3 ? 'selected' : ''}>第3優先（特定ニーズ）</option>
                            <option value="4" \${s.priority === 4 ? 'selected' : ''}>第4優先（AI検索FAQ）</option>
                            <option value="5" \${s.priority === 5 ? 'selected' : ''}>第5優先（こだわり詳細）</option>
                          </select>
                        </div>
                        <div style="display:flex; gap:2px;">
                          <button type="button" class="ai-append-btn" style="padding:2px 6px; font-size:0.7rem;" title="順位を1つ上げる" onclick="window.moveSlotUp(\${idx})" \${idx === 0 ? 'disabled style="opacity:0.3;"' : ''}>▲</button>
                          <button type="button" class="ai-append-btn" style="padding:2px 6px; font-size:0.7rem;" title="順位を1つ下げる" onclick="window.moveSlotDown(\${idx})" \${idx === state.answers.slots.length - 1 ? 'disabled style="opacity:0.3;"' : ''}>▼</button>
                        </div>
                      </div>
                    </div>

                    <!-- 実践マーケティング使い道バナー -->
                    <div style="background:\${isP1 ? '#fffbeb' : '#f8fafc'}; border:1px solid \${isP1 ? '#fde68a' : 'var(--line)'}; border-radius:8px; padding:8px 12px; font-size:0.78rem;">
                      <div style="color:\${isP1 ? '#b45309' : 'var(--ink)'}; font-weight:700; margin-bottom:2px;">
                        🎯 <strong>この切り口の使い道:</strong> \${escapeHtml(s.marketingRole || roleInfo.role)}
                      </div>
                      <div style="color:var(--muted); font-size:0.73rem;">
                        \${escapeHtml(roleInfo.desc)}
                      </div>
                    </div>

                    <!-- 洞察と理想顧客の表示 -->
                    <div class="cut-body-grid">
                      <div>
                        <span class="cut-block-label">🔍 顧客の洞察（普段の悩み・避けたい不安）:</span>
                        <p class="cut-block-text">\${escapeHtml(s.friction)}</p>
                        <span class="cut-block-label" style="margin-top:8px;">✨ 顧客の望む理想状態:</span>
                        <p class="cut-block-text">\${escapeHtml(s.desired)}</p>
                      </div>
                      <div>
                        <span class="cut-block-label">🎯 だから選ぶべき「理想の顧客（誰に）」:</span>
                        <p class="cut-block-text" style="font-weight:700; color:var(--teal-dark);">\${escapeHtml(s.target)}</p>
                      </div>
                    </div>

                    <!-- アクションバー -->
                    <div class="cut-card-actions">
                      <div style="font-size:0.75rem; color:var(--muted);">
                        \${isP1 ? '👑 公式サイトTOP・名刺のメインコンセプトとして反映中' : '専用LP・特定ニーズ向けとして保持'}
                      </div>
                      <div style="display:flex; gap:8px;">
                        \${!isP1 ? \`
                          <button type="button" class="set-p1-btn" onclick="window.changeSlotPriority(\${idx}, 1)">
                            ★ この切り口を第1優先にする
                          </button>
                        \` : \`
                          <span style="font-size:0.78rem; font-weight:800; color:#b45309; background:#fef3c7; padding:5px 12px; border-radius:6px; border:1px solid #d97706;">
                            👑 メイン看板に設定中
                          </span>
                        \`}
                        <button type="button" class="ai-adopt-btn" style="flex:none; padding:6px 12px;" onclick="window.focusSlot(\${idx})">
                          ✏️ この切り口の内容を編集
                        </button>
                      </div>
                    </div>
                  </div>
                \`;
              }).join("")}
            </div>

            <!-- 選択中切り口の直接編集エリア -->
            <div class="form-group" style="margin-top:20px; background:var(--surface-alt); border:1px solid var(--line); border-radius:10px; padding:16px;">
              <h4 style="margin:0 0 10px; font-size:0.92rem; color:var(--ink);">
                ✏️ 選択中切り口（\${escapeHtml(slot.title)}）の詳細微調整
              </h4>
              <div class="form-group">
                <label class="form-label">切り口のテーマ名</label>
                <input type="text" id="slotTitleInput" class="form-input" value="\${escapeHtml(slot.title)}" />
              </div>
              <div class="form-group">
                <label class="form-label">この切り口のマーケティング用途（使い道）</label>
                <input type="text" id="slotRoleInput" class="form-input" value="\${escapeHtml(slot.marketingRole)}" />
              </div>
              <div class="form-group">
                <label class="form-label">顧客の悩み・避けたい不安（摩擦）</label>
                <textarea id="slotFrictionInput" class="form-textarea">\${escapeHtml(slot.friction)}</textarea>
              </div>
              <div class="form-group">
                <label class="form-label">顧客が本当に望む理想状態</label>
                <textarea id="slotDesiredInput" class="form-textarea">\${escapeHtml(slot.desired)}</textarea>
              </div>
              <div class="form-group">
                <label class="form-label">理想の顧客像（誰に）</label>
                <textarea id="slotTargetInput" class="form-textarea">\${escapeHtml(slot.target)}</textarea>
              </div>
            </div>
          \`;
        }
`;

// 差し替えを実行
html = html.replace('// 業種ごとのデフォルト5つの切り口データベース', `${priorityFunctions}\n\n      // 業種ごとのデフォルト5つの切り口データベース`);

const oldStep2Regex = /\/\/\s*ステップ2：5つの切り口[\s\S]*?else if \(stepNum === 2\) \{/;
html = html.replace(oldStep2Regex, `${newStep2Html}\n        // ステップ3：顧客に対して約束できる成果は？\n        else if (stepNum === 2) {`);

// フォームバインドで slotRoleInput も反映できるようにする
const roleBindCode = `          const sRole = document.getElementById("slotRoleInput");
          if (sRole) sRole.addEventListener("input", (e) => {
            slot.marketingRole = e.target.value;
            saveState();
            renderStrategyBoard();
          });`;

html = html.replace('if (sTitle) sTitle.addEventListener("input", (e) => {', `${roleBindCode}\n          if (sTitle) sTitle.addEventListener("input", (e) => {`);

fs.writeFileSync('dist/index.html', html, 'utf8');
console.log('Successfully implemented priority selection and marketing usage guide in dist/index.html!');

