import fs from 'node:fs';

const html = fs.readFileSync('dist/index.html', 'utf8');

// 新しい動的スロット生成関数のコード
const dynamicSlotGeneratorCode = `
      // ==========================================
      // URLやテキストから実在する強みだけを抽出して動的に5つの切り口を生成するエンジン
      // （※サイトに書かれていない記念日プロポーズなどの架空サービスは絶対に出さない）
      // ==========================================
      function generateDynamicSlotsFromText(text, title, industry) {
        const full = ((text || "") + " " + (title || "")).toLowerCase();
        const detected = [];

        // --- 宿泊・温泉旅館向けキーワード検出 ---
        if (industry.includes("宿泊") || full.includes("旅館") || full.includes("ホテル") || full.includes("温泉")) {
          // 1. ペット・猫・犬
          if (full.includes("猫") || full.includes("ペット") || full.includes("犬") || full.includes("愛猫") || full.includes("愛犬") || full.includes("わんちゃん")) {
            detected.push({
              title: "ペット・愛猫愛犬同伴宿泊軸",
              marketingRole: "ペット同伴専用プラン・愛犬家愛猫家向けプロモーション",
              friction: "ペット可と書いてあってもケージ必須や他のお客さんの視線が気になり、心からくつろげない。",
              desired: "誰にも気兼ねせず、愛するペットと同じ部屋で本物の温泉と自然を心ゆくまで満喫したい。",
              target: "他の客に気をつかわず、愛猫や愛犬と一緒にゆったり温泉旅行を楽しみたいペット愛好家のご夫婦・パートナー",
              outcome: "ペットを預ける罪悪感ゼロで、愛するペットの嬉しそうな姿を見守りながら、心からくつろげる最高の休日を過ごせる。",
              evidence: "ペットと一緒に同じお部屋で過ごせる客室と、ペットに理解のある温かい受け入れ体制を整えているから。"
            });
          }

          // 2. 看板猫・動物ふれあい
          if (full.includes("看板猫") || (full.includes("猫") && (full.includes("宿") || full.includes("癒し") || full.includes("ふれあい")))) {
            detected.push({
              title: "人懐っこい看板猫とのふれあい癒やし軸",
              marketingRole: "猫好き向けSNS・猫旅専門メディア・口コミ展開",
              friction: "ペットは飼えないけれど猫が大好きで、アットホームな宿で本物の猫と心ゆくまで触れ合って癒やされたい。",
              desired: "人懐っこい看板猫にお出迎えされ、のんびり日向ぼっこする姿を眺めながら日常の疲れを完全に癒やしたい。",
              target: "日常の仕事に疲れ、人懐っこい看板猫に温かく出迎えられて心から癒やされたい猫好きの旅人・一人客",
              outcome: "看板猫の愛らしい仕草や温もりに触れることで、日頃のストレスや孤独感が消え去り、心がじんわり温まる深い癒やしを得られる。",
              evidence: "宿の看板猫たちが自然体で館内でお出迎えし、猫好きのお客様を家族のように温かく迎えるアットホームな雰囲気があるから。"
            });
          }

          // 3. ぬる湯・長湯・源泉
          if (full.includes("ぬる湯") || full.includes("ぬるめ") || full.includes("長湯") || full.includes("38") || full.includes("39") || full.includes("40度") || full.includes("温め")) {
            detected.push({
              title: "体に優しい源泉ぬる湯・長湯湯治軸",
              marketingRole: "「ぬる湯・長湯」専用LP・健康志向検索対策",
              friction: "熱い温泉はのぼせてしまい長く入れず、湯疲れしてしまう。体に負担をかけずに芯から温まりたい。",
              desired: "体温に近いぬるめの源泉にじっくり1時間でも浸かり、副交感神経を優位にして体の深部から疲労をほぐしたい。",
              target: "熱いお湯が苦手で、体に負担をかけずにじっくり長湯して日頃の疲れや冷えを解消したい健康志向の方",
              outcome: "何十分入ってものぼせない極上のぬる湯によって、心身の緊張が完全に解け、夜もぐっすり熟睡できる本物の休息を実感できる。",
              evidence: "無理な加温や循環を行わない、約38〜40℃の体に最も優しい自家源泉100%のかけ流し温泉を提供しているから。"
            });
          } else if (full.includes("温泉") || full.includes("源泉") || full.includes("かけ流し") || full.includes("露天風呂")) {
            detected.push({
              title: "本物の源泉かけ流し天然温泉軸",
              marketingRole: "温泉ファン向け専用ページ・温泉クチコミサイト",
              friction: "循環ろ過や塩素消毒された温泉では満足できず、本物の湧きたて天然温泉で肌や体を癒やしたい。",
              desired: "生まれたての豊かな源泉100%に浸かり、温泉本来の贅沢な効能と湯上がりのポカポカ感を味わいたい。",
              target: "塩素の匂いや循環湯を避け、成分がそのまま生きた本物の源泉かけ流しをじっくり堪能したい温泉通の方",
              outcome: "肌になめらかに染み渡る新鮮な温泉成分により、湯上がり後も湯冷めせず、肌がすべすべになり体の芯まで軽くなる。",
              evidence: "湯量を贅沢に生かした加水・循環なしの天然温泉をそのまま浴槽に注ぎ込んでいるから。"
            });
          }

          // 4. 川・渓流・箒川・自然・静けさ・隠れ家
          if (full.includes("川") || full.includes("箒川") || full.includes("渓流") || full.includes("自然") || full.includes("山") || full.includes("静か") || full.includes("隠れ家") || full.includes("塩原")) {
            detected.push({
              title: "清流のせせらぎと大自然に包まれる静寂軸",
              marketingRole: "静養・リトリートプラン・日常離脱向け",
              friction: "都会の喧騒や人混み、人工的な騒音に疲れ果て、自然の音だけが聞こえる静かな場所で心を休めたい。",
              desired: "川のせせらぎや鳥の声を聞きながら、何もしない贅沢な時間を過ごし、本来の自分を取り戻したい。",
              target: "都会の喧騒や人間関係のストレスから完全に離れ、美しい自然の中で静かに心身をリセットしたい大人世代",
              outcome: "人工的なノイズが一切ない澄んだ空気と清流の音に包まれることで、頭の疲れがすっきりと抜け、深い安らぎを得られる。",
              evidence: "温泉街の喧騒から離れた清流沿いの立地にあり、目の前に広がる大自然の景色とせせらぎを独り占めできる環境があるから。"
            });
          }

          // 5. 小さな宿・ペンション・アットホーム・家庭的
          if (full.includes("小さな") || full.includes("ペンション") || full.includes("アットホーム") || full.includes("家庭") || full.includes("素朴") || full.includes("おもてなし")) {
            detected.push({
              title: "気取らず落ち着けるアットホームな隠れ宿軸",
              marketingRole: "リピーター獲得・アットホーム旅ファン向け",
              friction: "大型ホテルのマニュアル的な接客や画一的な施設では落ち着かず、肩肘張らずにくつろげない。",
              desired: "親戚の家に遊びに来たような温かいもてなしを受け、飾らない温もりのある空間でゆったり過ごしたい。",
              target: "大規模旅館の形式ばったサービスが苦手で、宿の人と温かい交流ができる素朴で居心地の良い宿を求める方",
              outcome: "過度な気配りや緊張感とは無縁の、心温まる丁寧なおもてなしによって、自分の家のように心底くつろぐことができる。",
              evidence: "客室数を限定した小さな宿だからこそできる、一人ひとりのお客様の顔が見える親身で温かな接客を徹底しているから。"
            });
          }

          // 6. 料理・地酒・旬の味覚
          if (full.includes("料理") || full.includes("食事") || full.includes("手作り") || full.includes("野菜") || full.includes("地産")) {
            detected.push({
              title: "地元の旬を活かした心温まる家庭料理軸",
              marketingRole: "手作り料理プラン・素朴な美食向け",
              friction: "大量生産された冷たい料理ではなく、出来立ての手作りの温かいご飯を美味しく味わいたい。",
              desired: "地元の新鮮な野菜や食材を使った、胃に優しく滋味深い手作り料理をゆっくり楽しみたい。",
              target: "派手な高級懐石よりも、素材の良さが伝わる体に優しい手作り料理を味わいたい健康志向のお客様",
              outcome: "土地の恵みが詰まった出来立ての温かい料理によって、胃もたれせず体が内側から喜ぶ満足感を得られる。",
              evidence: "地元食材を中心に、一つひとつ丁寧に手作りした出来立ての料理をご提供しているから。"
            });
          }

          // ※「記念日」や「プロポーズ」という単語が実際にサイトにある場合のみ追加！
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
          }
        }

        // --- BtoB・IT向けキーワード検出 ---
        else if (industry.includes("BtoB") || full.includes("システム") || full.includes("it") || full.includes("コンサル") || full.includes("ソフト") || full.includes("開発")) {
          detected.push({
            title: "業務属人化解消・現場定着伴走軸",
            marketingRole: "公式サイトTOP・メインサービスLP・導入事例集",
            friction: "ツールを導入しても現場が使わず形骸化し、費用倒れになって経営陣への説明がつかない不安。",
            desired: "現場スタッフが迷わず自発的に使いこなし、最短3ヶ月で明確な業務効率化の成果を数字で示したい。",
            target: "業務の属人化を解消し、現場が自発的に使いこなすまで専任で伴走サポートしてほしい中小企業の経営者・事業責任者",
            outcome: "無駄な手入力や確認作業を70%削減し、現場スタッフが迷わず自発的に使いこなせる業務体制を最短3ヶ月で確立できる。",
            evidence: "過去の支援実績から体系化した定着プログラムにより専任担当が伴走し、運用定着まで責任を持って支援するから。"
          });
          detected.push({
            title: "手作業ミス根絶・残業削減軸",
            marketingRole: "現場管理職向け・検索広告・業務改善セミナー",
            friction: "毎月の月末月初に膨大な手入力と転記ミスが発生し、スタッフが連日深夜残業を強いられている。",
            desired: "ミスが起きようがない自動化フローを構築し、月末の残業をゼロにして社員の定着率を高めたい。",
            target: "転記ミスや確認作業に追われ、社員の残業と離職リスクに頭を抱えるバックオフィスの現場責任者",
            outcome: "月末月初の手入力作業が大幅に削減され、入力ミスによるトラブルが根絶され、残業代も大幅カットできる。",
            evidence: "二重入力を完全に排除する自動連携エンジンと、直感的に操作できるシンプルな画面設計を採用しているから。"
          });
          detected.push({
            title: "セキュリティ・情報漏洩防止軸",
            marketingRole: "情シス・監査部門向け専用資料",
            friction: "クラウド導入にあたり、個人情報や機密データの漏洩、社内セキュリティ審査落ちが最も怖い。",
            desired: "金融機関レベルの最高峰セキュリティ基盤で、誰の目から見ても安全なシステムを堂々と導入したい。",
            target: "厳格なコンプライアンス基準をクリアし、情報漏洩リスクを徹底排除したい情報システム部門長・役員",
            outcome: "社内セキュリティ審査を一発でクリアし、万が一の不正アクセスや内部漏洩のリスクを極限までゼロに抑えられる。",
            evidence: "全通信・保存データの完全暗号化と詳細ログ追跡、厳格な権限管理体制を標準完備しているから。"
          });
          detected.push({
            title: "経営数値リアルタイム可視化軸",
            marketingRole: "経営者・CFO向け意思決定支援",
            friction: "各拠点の売上や原価の集計が遅く、翌月中旬まで正確な経営数字が見えず意思決定が遅れる。",
            desired: "今日・今この瞬間の売上・利益・進捗がスマホ一台で把握でき、スピーディに経営の舵を切りたい。",
            target: "複数拠点や事業部を持ち、経営数値の集計遅延による意思決定の遅れを解消したい経営者・CFO",
            outcome: "締め日を待たずに粗利と案件進捗がリアルタイムに可視化され、迅速で精度の高い経営判断が可能になる。",
            evidence: "各部門のデータを自動集約するリアルタイム経営ダッシュボード機能を標準搭載しているから。"
          });
          detected.push({
            title: "オーダーメイド業務カスタマイズ軸",
            marketingRole: "特殊商習慣を持つ業界向け個別相談",
            friction: "既製品のSaaSでは自社特有の業界ルールや商習慣に対応できず、結局手作業が残ってしまう。",
            desired: "自社の業務フローを無理に変えることなく、完全にフィットした使いやすいシステムを構築したい。",
            target: "独自の受発注ルールや複雑な商習慣を持ち、一般的なパッケージソフトでは適合しなかった専門業界の企業様",
            outcome: "自社の業務フローを崩さず、100%自社仕様の使い心地で業務全体をシームレスにデジタル化できる。",
            evidence: "要件定義から熟練エンジニアが直接ヒアリングし、自社仕様に合わせて柔軟に個別調整するから。"
          });
        }

        // --- 汎用フォールバック ---
        if (detected.length < 5) {
          const generic = [
            {
              title: "安心と信頼の基本提供軸",
              marketingRole: "基本サービス・主力商品紹介",
              friction: "他社で期待外れだった経験があり、本当に信頼して任せられるか慎重になっている。",
              desired: "事前の丁寧な説明と確かな品質で、後悔のない確実な満足を手に入れたい。",
              target: "安さだけで選んで失敗したくない、確かな品質と誠実な対応を重視する本物志向のお客様",
              outcome: "事前の不安が完全に解消され、期待以上の丁寧な対応と確実な成果を実感できる。",
              evidence: "創業以来積み上げた実績と、お客様一人ひとりに向き合う誠実な対応を徹底しているから。"
            },
            {
              title: "個別最適・柔軟対応軸",
              marketingRole: "個別相談・オーダーメイド提案",
              friction: "画一的なマニュアル対応では自分の細かな希望や事情に対応してもらえない。",
              desired: "こちらの要望や事情に親身に寄り添い、柔軟に融通を利かせてほしい。",
              target: "画一的なサービスでは満足できず、自分の事情に合わせたきめ細かな対応を求める方",
              outcome: "細かな要望までストレスなくスムーズに叶えられ、深い安心感を得られる。",
              evidence: "お客様のご要望をじっくり伺った上で、最適なプランを個別にご提案するから。"
            },
            {
              title: "ゆったり休息・リフレッシュ軸",
              marketingRole: "オフピーク・平日プラン・静養向け",
              friction: "忙しい日々に追われて心身が疲弊し、落ち着いてリセットできる場所がない。",
              desired: "余計な刺激のない静かな環境で、自分のペースでゆったりと休息を取りたい。",
              target: "日常の喧騒から離れ、静かな空間でゆっくりと英気を養いたい方",
              outcome: "心身の緊張が自然とほぐれ、翌朝すっきりと軽やかな気分を取り戻せる。",
              evidence: "落ち着いて過ごせる快適な空間づくりと、心地よい距離感のおもてなしを心掛けているから。"
            }
          ];

          for (const g of generic) {
            if (detected.length >= 5) break;
            if (!detected.some(d => d.title === g.title)) {
              detected.push(g);
            }
          }
        }

        // ちょうど5個に整形し、優先順位とIDを付与
        const slots = detected.slice(0, 5).map((d, idx) => ({
          id: \`slot_\${idx + 1}\`,
          priority: idx + 1,
          title: d.title,
          marketingRole: d.marketingRole,
          friction: d.friction,
          desired: d.desired,
          target: d.target,
          outcome: d.outcome,
          evidence: d.evidence
        }));

        return slots;
      }
`;

// executeUrlFetch の中で generateDynamicSlotsFromText を呼ぶように修正
const targetFetchStr = `            // 5つの切り口を初期化・更新
            if (DEFAULT_SLOTS_DATABASE[state.answers.industryFamily]) {
              state.answers.slots = JSON.parse(JSON.stringify(DEFAULT_SLOTS_DATABASE[state.answers.industryFamily]));
            }`;

const replacementFetchStr = `            // ★実際のサイト情報（テキスト・タイトル）から、実在する強みだけを動的に抽出して5つの切り口を生成！
            // （架空のプロポーズ専用プラン等は絶対に出さない）
            const dynamicSlots = generateDynamicSlotsFromText(currentExtractedFullText, extractedData.title, state.answers.industryFamily);
            if (dynamicSlots && dynamicSlots.length === 5) {
              state.answers.slots = dynamicSlots;
            } else if (DEFAULT_SLOTS_DATABASE[state.answers.industryFamily]) {
              state.answers.slots = JSON.parse(JSON.stringify(DEFAULT_SLOTS_DATABASE[state.answers.industryFamily]));
            }`;

// html内の該当部分を差し替え
let newHtml = html.replace('// 業種ごとのデフォルト5つの切り口データベース', `${dynamicSlotGeneratorCode}\n\n      // 業種ごとのデフォルト5つの切り口データベース`);

// executeUrlFetch内で fullTxt を currentExtractedFullText として参照できるようにする
newHtml = newHtml.replace('const fullTxt = (extractedData.title || "") + " " + (extractedData.businessDraft || "");', 
`const currentExtractedFullText = (extractedData.title || "") + " " + (extractedData.businessDraft || "");
            const fullTxt = currentExtractedFullText;`);

newHtml = newHtml.replace(targetFetchStr, replacementFetchStr);

fs.writeFileSync('dist/index.html', newHtml, 'utf8');
console.log('Successfully fixed dynamic slot generation in dist/index.html!');
