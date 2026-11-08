import fs from 'node:fs';
import path from 'node:path';

const htmlContent = `<!doctype html>
<html lang="ja">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="description" content="AIに正確に理解され、人にも選ばれるための戦略AI。ビコーズ・フレームワーク公式ロジックに基づき、誰に・どんな成果を・なぜ提供できるのかを整理して選ばれる理由を自動生成します。" />
  <meta name="theme-color" content="#0b1528" />
  <title>選ばれる理由AI | ビコーズ・フレームワーク実践システム</title>
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%230b1528'/%3E%3Cpath d='M17 18h30v9H28v6h15v9H28v4h19v9H17z' fill='%232dd4bf'/%3E%3C/svg%3E" />
  <style>
    :root {
      --ink: #0b1528;
      --ink-soft: #243247;
      --muted: #5e6f85;
      --line: #dbe4ee;
      --line-subtle: #edf2f7;
      --canvas: #f1f5f9;
      --surface: #ffffff;
      --surface-alt: #f8fafc;
      --teal: #0d9488;
      --teal-dark: #0f766e;
      --teal-soft: #ccfbf1;
      --teal-light: #f0fdfa;
      --sky: #0284c7;
      --sky-soft: #e0f2fe;
      --amber: #d97706;
      --amber-soft: #fef3c7;
      --rose: #e11d48;
      --rose-soft: #ffe4e6;
      --purple: #7c3aed;
      --purple-soft: #ede9fe;
      --success: #16a34a;
      --shadow-sm: 0 1px 3px rgba(11, 21, 40, .06), 0 1px 2px rgba(11, 21, 40, .04);
      --shadow: 0 10px 25px -5px rgba(11, 21, 40, .08), 0 8px 10px -6px rgba(11, 21, 40, .04);
      --shadow-lg: 0 20px 35px -5px rgba(11, 21, 40, .12), 0 10px 15px -5px rgba(11, 21, 40, .06);
      --radius: 12px;
      font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Hiragino Sans", "Yu Gothic", Meiryo, sans-serif;
    }

    * { box-sizing: border-box; }

    body {
      margin: 0;
      color: var(--ink);
      background:
        radial-gradient(circle at 10% 20%, rgba(13, 148, 136, .05) 0%, transparent 40%),
        radial-gradient(circle at 90% 80%, rgba(2, 132, 199, .05) 0%, transparent 40%),
        var(--canvas);
      min-width: 320px;
      font-size: 15px;
      line-height: 1.6;
    }

    button, textarea, input, select { font: inherit; }
    button { cursor: pointer; }

    .app-shell { min-height: 100vh; display: flex; flex-direction: column; }

    /* ヘッダー */
    .topbar {
      background: rgba(255, 255, 255, 0.92);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid var(--line);
      padding: 12px 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: sticky;
      top: 0;
      z-index: 100;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .brand-mark {
      width: 40px;
      height: 40px;
      background: linear-gradient(135deg, #0b1528, #0f766e);
      border-radius: 10px;
      color: #2dd4bf;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      font-weight: 900;
      box-shadow: 0 4px 12px rgba(15, 118, 110, .25);
    }

    .brand h1 {
      margin: 0;
      font-size: 1.25rem;
      font-weight: 800;
      letter-spacing: -0.02em;
      color: var(--ink);
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .brand-badge {
      font-size: 0.72rem;
      font-weight: 700;
      background: var(--teal-soft);
      color: var(--teal-dark);
      padding: 2px 8px;
      border-radius: 999px;
      border: 1px solid rgba(13, 148, 136, .2);
    }

    .topbar-actions {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
    }

    .sample-btn {
      font-size: 0.8rem;
      font-weight: 600;
      padding: 6px 12px;
      border-radius: 8px;
      border: 1px solid var(--line);
      background: var(--surface);
      color: var(--ink-soft);
      transition: all .2s;
    }
    .sample-btn:hover {
      background: var(--surface-alt);
      border-color: var(--teal);
      color: var(--teal-dark);
    }

    .reset-btn {
      font-size: 0.8rem;
      font-weight: 600;
      padding: 6px 12px;
      border-radius: 8px;
      border: 1px solid #fecaca;
      background: #fff1f2;
      color: var(--rose);
      transition: all .2s;
    }
    .reset-btn:hover {
      background: #ffe4e6;
    }

    /* ヒーローセクション */
    .hero-banner {
      background: linear-gradient(135deg, #0b1528 0%, #172554 50%, #0f766e 100%);
      color: #ffffff;
      padding: 36px 24px 32px;
      text-align: center;
      position: relative;
      overflow: hidden;
    }
    .hero-banner::after {
      content: "";
      position: absolute;
      inset: 0;
      background: radial-gradient(circle at 50% 120%, rgba(45, 212, 191, .2) 0%, transparent 60%);
      pointer-events: none;
    }
    .hero-content {
      max-width: 980px;
      margin: 0 auto;
      position: relative;
      z-index: 1;
    }
    .hero-tag {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(255, 255, 255, 0.12);
      backdrop-filter: blur(8px);
      padding: 4px 14px;
      border-radius: 999px;
      font-size: 0.82rem;
      font-weight: 600;
      color: #a7f3d0;
      margin-bottom: 12px;
      border: 1px solid rgba(255, 255, 255, 0.15);
    }
    .hero-title {
      font-size: 1.85rem;
      font-weight: 900;
      margin: 0 0 10px;
      line-height: 1.35;
      letter-spacing: -0.01em;
    }
    .hero-title span {
      background: linear-gradient(90deg, #5eead4, #38bdf8);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .hero-subtitle {
      font-size: 0.98rem;
      color: #cbd5e1;
      margin: 0 auto 24px;
      max-width: 720px;
      line-height: 1.55;
    }

    /* 6ステップ フローナビ（ヒーロー内） */
    .hero-flow-steps {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      gap: 8px;
      margin-top: 18px;
      text-align: left;
    }
    @media (max-width: 860px) {
      .hero-flow-steps { grid-template-columns: repeat(3, 1fr); gap: 6px; }
    }
    @media (max-width: 520px) {
      .hero-flow-steps { grid-template-columns: repeat(2, 1fr); }
    }
    .hero-step-pill {
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 10px;
      padding: 10px 10px;
      transition: all .2s;
      cursor: pointer;
    }
    .hero-step-pill:hover, .hero-step-pill.active {
      background: rgba(45, 212, 191, 0.18);
      border-color: #2dd4bf;
      transform: translateY(-2px);
    }
    .hero-step-num {
      display: inline-block;
      width: 20px;
      height: 20px;
      line-height: 20px;
      text-align: center;
      background: #2dd4bf;
      color: #0b1528;
      font-weight: 900;
      font-size: 0.75rem;
      border-radius: 6px;
      margin-bottom: 4px;
    }
    .hero-step-name {
      font-size: 0.78rem;
      font-weight: 700;
      color: #f1f5f9;
      display: block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    /* メインワークスペース（3カラム） */
    .workspace {
      display: grid;
      grid-template-columns: 260px 1fr 380px;
      gap: 20px;
      max-width: 1560px;
      width: 100%;
      margin: 20px auto;
      padding: 0 20px 40px;
      flex: 1;
    }
    @media (max-width: 1240px) {
      .workspace { grid-template-columns: 240px 1fr; }
      .strategy-panel { grid-column: span 2; }
    }
    @media (max-width: 820px) {
      .workspace { grid-template-columns: 1fr; padding: 0 12px 30px; }
      .strategy-panel { grid-column: auto; }
    }

    .panel {
      background: var(--surface);
      border: 1px solid var(--line);
      border-radius: var(--radius);
      box-shadow: var(--shadow-sm);
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }

    .panel-header {
      padding: 16px 20px;
      border-bottom: 1px solid var(--line);
      background: var(--surface);
    }
    .panel-header h2 {
      margin: 0;
      font-size: 1.05rem;
      font-weight: 800;
      color: var(--ink);
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .panel-header p {
      margin: 4px 0 0;
      font-size: 0.8rem;
      color: var(--muted);
    }

    /* 左カラム：ステップリスト */
    .step-nav-list {
      display: flex;
      flex-direction: column;
      padding: 10px;
      gap: 6px;
    }
    .step-nav-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 14px;
      border-radius: 10px;
      border: 1px solid transparent;
      background: transparent;
      text-align: left;
      width: 100%;
      color: var(--ink-soft);
      transition: all .2s;
    }
    .step-nav-item:hover {
      background: var(--surface-alt);
      border-color: var(--line);
    }
    .step-nav-item.active {
      background: var(--teal-light);
      border-color: var(--teal);
      color: var(--teal-dark);
      font-weight: 700;
      box-shadow: 0 2px 8px rgba(13, 148, 136, .12);
    }
    .step-badge {
      width: 28px;
      height: 28px;
      border-radius: 8px;
      background: var(--line-subtle);
      color: var(--muted);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      font-size: 0.85rem;
      flex-shrink: 0;
    }
    .step-nav-item.active .step-badge {
      background: var(--teal);
      color: #ffffff;
    }
    .step-nav-item.completed .step-badge {
      background: var(--success);
      color: #ffffff;
    }
    .step-text {
      flex: 1;
      min-width: 0;
    }
    .step-title {
      font-size: 0.85rem;
      display: block;
      font-weight: 700;
      line-height: 1.35;
    }
    .step-sub {
      font-size: 0.72rem;
      color: var(--muted);
      display: block;
      margin-top: 2px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    /* 中央カラム：質問＆AI提案パネル */
    .question-panel {
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .question-header {
      border-bottom: 1px solid var(--line);
      padding-bottom: 16px;
    }
    .question-stage-tag {
      font-size: 0.78rem;
      font-weight: 800;
      color: var(--teal-dark);
      background: var(--teal-soft);
      padding: 3px 10px;
      border-radius: 6px;
      display: inline-block;
      margin-bottom: 8px;
    }
    .question-title {
      font-size: 1.3rem;
      font-weight: 800;
      margin: 0 0 6px;
      color: var(--ink);
      line-height: 1.4;
    }
    .question-desc {
      font-size: 0.88rem;
      color: var(--muted);
      margin: 0;
      line-height: 1.55;
    }

    /* 入力フォーム共通 */
    .form-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .form-label {
      font-size: 0.9rem;
      font-weight: 700;
      color: var(--ink);
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .form-label .req {
      font-size: 0.7rem;
      color: var(--rose);
      background: var(--rose-soft);
      padding: 2px 6px;
      border-radius: 4px;
    }
    .form-helper {
      font-size: 0.8rem;
      color: var(--muted);
      margin: -4px 0 2px;
    }
    .form-input, .form-textarea, .form-select {
      width: 100%;
      border: 1px solid var(--line);
      border-radius: 8px;
      padding: 10px 14px;
      font-size: 0.92rem;
      color: var(--ink);
      background: #ffffff;
      transition: all .2s;
    }
    .form-input:focus, .form-textarea:focus, .form-select:focus {
      outline: none;
      border-color: var(--teal);
      box-shadow: 0 0 0 3px rgba(13, 148, 136, .15);
    }
    .form-textarea {
      min-height: 90px;
      resize: vertical;
      line-height: 1.55;
    }

    /* URL自動解析カード（ステップ1専用） */
    .url-fetcher-box {
      background: linear-gradient(135deg, #f0fdfa, #f8fafc);
      border: 1px solid #99f6e4;
      border-radius: 10px;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .url-fetcher-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
    }
    .url-fetcher-title {
      font-size: 0.88rem;
      font-weight: 700;
      color: var(--teal-dark);
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .url-input-row {
      display: flex;
      gap: 8px;
    }
    .url-input-row input {
      flex: 1;
    }
    .url-fetch-btn {
      background: var(--teal);
      color: #ffffff;
      border: none;
      border-radius: 8px;
      padding: 0 16px;
      font-weight: 700;
      font-size: 0.85rem;
      white-space: nowrap;
      transition: all .2s;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .url-fetch-btn:hover {
      background: var(--teal-dark);
    }
    .url-fetch-btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    .url-status-msg {
      font-size: 0.8rem;
      padding: 8px 12px;
      border-radius: 6px;
      display: none;
    }
    .url-status-msg.info {
      display: block;
      background: var(--sky-soft);
      color: #0369a1;
      border: 1px solid #bae6fd;
    }
    .url-status-msg.success {
      display: block;
      background: var(--teal-soft);
      color: var(--teal-dark);
      border: 1px solid #99f6e4;
    }
    .url-status-msg.error {
      display: block;
      background: var(--rose-soft);
      color: var(--rose);
      border: 1px solid #fecaca;
    }

    /* 音声入力ボタン */
    .voice-bar {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-top: 4px;
    }
    .voice-btn {
      background: var(--surface-alt);
      border: 1px solid var(--line);
      border-radius: 8px;
      padding: 6px 12px;
      font-size: 0.8rem;
      font-weight: 600;
      color: var(--ink-soft);
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all .2s;
    }
    .voice-btn:hover {
      background: var(--teal-light);
      border-color: var(--teal);
      color: var(--teal-dark);
    }
    .voice-btn.recording {
      background: #ffe4e6;
      border-color: var(--rose);
      color: var(--rose);
      animation: pulse 1.5s infinite;
    }
    @keyframes pulse {
      0% { box-shadow: 0 0 0 0 rgba(225, 29, 72, .4); }
      70% { box-shadow: 0 0 0 8px rgba(225, 29, 72, 0); }
      100% { box-shadow: 0 0 0 0 rgba(225, 29, 72, 0); }
    }
    .voice-hint {
      font-size: 0.75rem;
      color: var(--muted);
    }

    /* ★AI提案セクション（各ステップ共通） */
    .ai-suggest-section {
      background: linear-gradient(135deg, #f8fafc, #f1f5f9);
      border: 1px solid #cbd5e1;
      border-radius: var(--radius);
      padding: 18px;
      margin-top: 10px;
    }
    .ai-suggest-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 12px;
    }
    .ai-suggest-title {
      font-size: 0.95rem;
      font-weight: 800;
      color: var(--ink);
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .ai-badge {
      background: linear-gradient(135deg, #7c3aed, #0284c7);
      color: #ffffff;
      font-size: 0.7rem;
      font-weight: 800;
      padding: 3px 8px;
      border-radius: 6px;
      letter-spacing: 0.02em;
    }
    .ai-refresh-btn {
      background: var(--surface);
      border: 1px solid var(--line);
      border-radius: 6px;
      padding: 4px 10px;
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--muted);
      transition: all .2s;
    }
    .ai-refresh-btn:hover {
      color: var(--ink);
      border-color: var(--muted);
    }

    .ai-cards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 12px;
    }

    .ai-card {
      background: #ffffff;
      border: 1px solid var(--line);
      border-radius: 10px;
      padding: 14px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 10px;
      box-shadow: 0 1px 3px rgba(0,0,0,.03);
      transition: all .2s;
    }
    .ai-card:hover {
      border-color: var(--teal);
      box-shadow: 0 4px 12px rgba(13, 148, 136, .1);
      transform: translateY(-1px);
    }
    .ai-card-tag {
      font-size: 0.72rem;
      font-weight: 700;
      color: var(--sky);
      background: var(--sky-soft);
      padding: 2px 8px;
      border-radius: 4px;
      display: inline-block;
      align-self: flex-start;
    }
    .ai-card-title {
      font-size: 0.88rem;
      font-weight: 700;
      color: var(--ink);
      margin: 0;
      line-height: 1.45;
    }
    .ai-card-body {
      font-size: 0.82rem;
      color: var(--ink-soft);
      margin: 0;
      line-height: 1.5;
    }
    .ai-card-actions {
      display: flex;
      gap: 6px;
      margin-top: 4px;
    }
    .ai-adopt-btn {
      flex: 1;
      background: var(--teal-light);
      border: 1px solid var(--teal);
      color: var(--teal-dark);
      font-weight: 700;
      font-size: 0.78rem;
      padding: 6px 10px;
      border-radius: 6px;
      transition: all .2s;
      text-align: center;
    }
    .ai-adopt-btn:hover {
      background: var(--teal);
      color: #ffffff;
    }
    .ai-append-btn {
      background: var(--surface-alt);
      border: 1px solid var(--line);
      color: var(--muted);
      font-weight: 600;
      font-size: 0.75rem;
      padding: 6px 8px;
      border-radius: 6px;
      transition: all .2s;
    }
    .ai-append-btn:hover {
      color: var(--ink);
      border-color: var(--ink-soft);
    }

    /* 17のテクニック（ステップ5専用タブ＆バッジ） */
    .technique-tabs {
      display: flex;
      gap: 8px;
      margin-bottom: 12px;
      border-bottom: 1px solid var(--line);
      padding-bottom: 8px;
      flex-wrap: wrap;
    }
    .technique-tab {
      background: transparent;
      border: 1px solid transparent;
      padding: 6px 14px;
      border-radius: 8px;
      font-size: 0.82rem;
      font-weight: 700;
      color: var(--muted);
      transition: all .2s;
    }
    .technique-tab.active {
      background: var(--teal);
      color: #ffffff;
    }
    .technique-card {
      border-left: 4px solid var(--teal);
    }
    .technique-card.systematic { border-left-color: #0284c7; }
    .technique-card.perceived { border-left-color: #d97706; }
    .technique-card.created { border-left-color: #16a34a; }

    /* 後半3つのアクション（ステップ6専用カード） */
    .action-step-card {
      background: #ffffff;
      border: 1px solid var(--line);
      border-radius: 10px;
      padding: 16px;
      margin-bottom: 14px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .action-step-badge {
      font-size: 0.75rem;
      font-weight: 800;
      padding: 3px 8px;
      border-radius: 4px;
      align-self: flex-start;
    }
    .action-step-badge.innovation { background: #fef3c7; color: #b45309; }
    .action-step-badge.platform { background: #e0f2fe; color: #0369a1; }
    .action-step-badge.touchpoint { background: #dcfce7; color: #15803d; }

    /* ステップ操作バー（前へ・次へ） */
    .step-actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 10px;
      padding-top: 16px;
      border-top: 1px solid var(--line);
    }
    .nav-btn {
      padding: 10px 20px;
      border-radius: 8px;
      font-size: 0.9rem;
      font-weight: 700;
      transition: all .2s;
    }
    .nav-btn.prev {
      background: var(--surface);
      border: 1px solid var(--line);
      color: var(--ink-soft);
    }
    .nav-btn.prev:hover {
      background: var(--surface-alt);
    }
    .nav-btn.next {
      background: var(--teal);
      border: 1px solid var(--teal);
      color: #ffffff;
      box-shadow: 0 4px 12px rgba(13, 148, 136, .25);
    }
    .nav-btn.next:hover {
      background: var(--teal-dark);
    }

    /* 右カラム：戦略ボード */
    .strategy-panel {
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 18px;
      background: var(--surface-alt);
    }

    /* インフルエンスステートメント（目玉カード） */
    .influence-card {
      background: linear-gradient(135deg, #0b1528, #1e293b);
      color: #ffffff;
      border-radius: var(--radius);
      padding: 20px;
      box-shadow: var(--shadow);
      position: relative;
      overflow: hidden;
    }
    .influence-card::before {
      content: "";
      position: absolute;
      top: -20px;
      right: -20px;
      width: 100px;
      height: 100px;
      background: radial-gradient(circle, rgba(45, 212, 191, .3), transparent 70%);
      pointer-events: none;
    }
    .influence-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 12px;
    }
    .influence-badge {
      font-size: 0.72rem;
      font-weight: 800;
      color: #2dd4bf;
      background: rgba(45, 212, 191, .15);
      padding: 3px 10px;
      border-radius: 999px;
      border: 1px solid rgba(45, 212, 191, .3);
    }
    .copy-btn {
      background: rgba(255, 255, 255, 0.12);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: #ffffff;
      border-radius: 6px;
      padding: 4px 10px;
      font-size: 0.75rem;
      font-weight: 600;
      transition: all .2s;
    }
    .copy-btn:hover {
      background: rgba(255, 255, 255, 0.25);
    }
    .influence-text {
      font-size: 0.95rem;
      line-height: 1.7;
      margin: 0;
      color: #f1f5f9;
    }
    .influence-text strong {
      color: #2dd4bf;
      text-decoration: underline;
      text-underline-offset: 4px;
    }

    /* ビコーズ・マトリクス表 */
    .matrix-card {
      background: #ffffff;
      border: 1px solid var(--line);
      border-radius: var(--radius);
      padding: 16px;
    }
    .matrix-card h3 {
      margin: 0 0 10px;
      font-size: 0.88rem;
      font-weight: 800;
      color: var(--ink);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .matrix-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.8rem;
    }
    .matrix-table th {
      background: var(--surface-alt);
      color: var(--muted);
      font-weight: 700;
      text-align: left;
      padding: 8px 10px;
      border-bottom: 1px solid var(--line);
    }
    .matrix-table td {
      padding: 8px 10px;
      border-bottom: 1px solid var(--line-subtle);
      color: var(--ink);
      vertical-align: top;
    }
    .matrix-table tr:last-child td { border-bottom: none; }

    /* 後半アクション要約 */
    .actions-summary-card {
      background: #ffffff;
      border: 1px solid var(--line);
      border-radius: var(--radius);
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .actions-summary-card h3 {
      margin: 0;
      font-size: 0.88rem;
      font-weight: 800;
      color: var(--ink);
    }
    .action-item-row {
      display: flex;
      gap: 10px;
      align-items: flex-start;
      font-size: 0.8rem;
    }
    .action-icon-badge {
      width: 22px;
      height: 22px;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.72rem;
      font-weight: 800;
      flex-shrink: 0;
    }

    /* プロンプト＆エクスポート */
    .export-box {
      background: #ffffff;
      border: 1px solid var(--line);
      border-radius: var(--radius);
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .export-box h3 {
      margin: 0;
      font-size: 0.85rem;
      font-weight: 800;
      color: var(--ink);
    }
    .export-btns {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }
    .export-btn {
      flex: 1;
      padding: 8px 10px;
      font-size: 0.78rem;
      font-weight: 700;
      border-radius: 6px;
      border: 1px solid var(--line);
      background: var(--surface-alt);
      color: var(--ink-soft);
      transition: all .2s;
      text-align: center;
    }
    .export-btn:hover {
      background: var(--teal-light);
      border-color: var(--teal);
      color: var(--teal-dark);
    }

    /* トースト通知 */
    .toast {
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: #0b1528;
      color: #ffffff;
      padding: 12px 20px;
      border-radius: 8px;
      box-shadow: var(--shadow-lg);
      font-size: 0.88rem;
      font-weight: 600;
      z-index: 1000;
      transform: translateY(100px);
      opacity: 0;
      transition: all .25s cubic-bezier(0.16, 1, 0.3, 1);
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .toast.show {
      transform: translateY(0);
      opacity: 1;
    }

    /* ユーティリティ */
    .text-muted { color: var(--muted); }
    .fw-bold { font-weight: 700; }
  </style>
</head>
<body>
  <div class="app-shell">
    <!-- トップナビゲーション -->
    <header class="topbar">
      <div class="brand">
        <div class="brand-mark" aria-hidden="true">R</div>
        <div>
          <h1>
            選ばれる理由AI
            <span class="brand-badge">公式ビコーズ・フレームワーク準拠</span>
          </h1>
        </div>
      </div>
      <div class="topbar-actions">
        <button id="sampleRyokanBtn" type="button" class="sample-btn" title="温泉旅館の成功モデルを読み込みます">♨️ 旅館サンプル</button>
        <button id="sampleBtobBtn" type="button" class="sample-btn" title="BtoBサービスの成功モデルを読み込みます">💼 BtoBサンプル</button>
        <button id="resetAllBtn" type="button" class="reset-btn" title="すべての入力をリセットします">🗑 回答リセット</button>
      </div>
    </header>

    <!-- ヒーローフローバナー（6つのステップ） -->
    <section class="hero-banner">
      <div class="hero-content">
        <div class="hero-tag">✨ 質問に答えるだけ！AIが洞察・顧客・成果・17のビコーズ・後半3アクションを提案</div>
        <h2 class="hero-title">
          あなたの商品がどうしても欲しいと思わせる、<br>
          <span>「選ばれる理由（コンセプト）」</span>を作る。
        </h2>
        <p class="hero-subtitle">
          『顧客を買う気にさせる ビコーズ・フレームワーク』完全準拠。質問に答えるだけで、AIが顧客の深層心理と強力な根拠を提案し、プロフェッショナルなコンセプトが自動で完成します。
        </p>

        <!-- 6ステップ ナビゲーションバー -->
        <div class="hero-flow-steps" id="heroSteps">
          <!-- JSでレンダリング -->
        </div>
      </div>
    </section>

    <!-- メインワークスペース（3カラム） -->
    <main class="workspace">
      <!-- 左カラム：進行ステップリスト -->
      <aside class="panel" aria-label="ステップ進行ナビ">
        <div class="panel-header">
          <h2>進捗ステップ</h2>
          <p>6つの問いに答えて選ばれる理由を構築</p>
        </div>
        <nav class="step-nav-list" id="stepNavList">
          <!-- JSでレンダリング -->
        </nav>
      </aside>

      <!-- 中央カラム：質問入力 ＆ AI提案パネル -->
      <section class="panel question-panel" id="questionPanel" aria-live="polite">
        <!-- JSでレンダリング -->
      </section>

      <!-- 右カラム：完成した「選ばれる理由」戦略ボード -->
      <aside class="panel strategy-panel" aria-label="完成した戦略ボード">
        <div class="panel-header">
          <h2>🎯 選ばれる理由ボード</h2>
          <p>リアルタイムにコンセプトが組み上がります</p>
        </div>

        <!-- ① ビコーズ公式インフルエンスステートメント -->
        <div class="influence-card">
          <div class="influence-header">
            <span class="influence-badge">公式インフルエンスステートメント</span>
            <button id="copyInfluenceBtn" type="button" class="copy-btn">📋 コピー</button>
          </div>
          <p class="influence-text" id="influenceText">
            <!-- JSでリアルタイム生成 -->
          </p>
        </div>

        <!-- ② ビコーズ・マトリクス（要素整理表） -->
        <div class="matrix-card">
          <h3>
            <span>📊 ビコーズ・マトリクス</span>
            <button id="copyMatrixBtn" type="button" class="copy-btn" style="color:var(--ink-soft); border-color:var(--line); background:var(--surface);">📋 Markdown</button>
          </h3>
          <table class="matrix-table">
            <tbody>
              <tr>
                <th style="width: 32%;">① 誰に<br><small>(理想顧客)</small></th>
                <td id="matrixTarget" style="font-weight: 600;">未入力</td>
              </tr>
              <tr>
                <th>② どんな成果を<br><small>(約束成果)</small></th>
                <td id="matrixOutcome">未入力</td>
              </tr>
              <tr>
                <th>③ なぜ提供できるか<br><small>(信頼のビコーズ)</small></th>
                <td id="matrixEvidence">未入力</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- ③ 後半3つのアクション実行サマリー -->
        <div class="actions-summary-card">
          <h3>🚀 後半3つのアクション実行ボード</h3>
          <div class="action-item-row">
            <div class="action-icon-badge" style="background:#fef3c7; color:#b45309;">1</div>
            <div>
              <strong style="display:block; font-size:0.78rem;">イノベーション創出:</strong>
              <span id="summaryInnovation" class="text-muted">未設定</span>
            </div>
          </div>
          <div class="action-item-row">
            <div class="action-icon-badge" style="background:#e0f2fe; color:#0369a1;">2</div>
            <div>
              <strong style="display:block; font-size:0.78rem;">プラットフォーム構築:</strong>
              <span id="summaryPlatform" class="text-muted">未設定</span>
            </div>
          </div>
          <div class="action-item-row">
            <div class="action-icon-badge" style="background:#dcfce7; color:#15803d;">3</div>
            <div>
              <strong style="display:block; font-size:0.78rem;">全接点での実行:</strong>
              <span id="summaryTouchpoint" class="text-muted">未設定</span>
            </div>
          </div>
        </div>

        <!-- ④ AIプロンプト＆戦略ブリーフ出力 -->
        <div class="export-box">
          <h3>🤖 AI引き継ぎ＆戦略ブリーフ</h3>
          <p style="margin:0; font-size:0.76rem; color:var(--muted);">ChatGPTやClaudeに渡してLP原稿・営業資料・FAQを一発作成できます。</p>
          <div class="export-btns">
            <button id="copyPromptBtn" type="button" class="export-btn">📋 AI用プロンプトをコピー</button>
            <button id="copyBriefBtn" type="button" class="export-btn">📄 戦略ブリーフをコピー</button>
          </div>
        </div>
      </aside>
    </main>
  </div>

  <!-- トースト通知 -->
  <div id="toast" class="toast" role="status" aria-live="polite"></div>

  <script>
    (() => {
      "use strict";

      const STORAGE_KEY = "because-framework-v2";

      // 6つのステップ定義（ユーザー要求・書籍完全準拠）
      const STAGES = [
        {
          id: "step1",
          num: "1",
          title: "業種と公式ホームページURLの入力",
          shortName: "業種・公式HP",
          tag: "STEP 1: 事業概要の特定",
          desc: "あなたの事業の業種を選択し、公式ホームページのURLを入力してください。URLを入力すると、サイトの事業内容・会社名・商品サービスの特徴を自動解析して反映します。",
          icon: "🏢"
        },
        {
          id: "step2",
          num: "2",
          title: "顧客についての洞察を考える",
          shortName: "顧客の洞察",
          tag: "STEP 2: 顧客の深層心理（書籍 STEP 2）",
          desc: "顧客が普段感じている『避けたい不安・摩擦・失敗』と、『本当に得たい理想の状態』を言語化します。AIも業種と事業内容から深い洞察を考えて提案します。",
          icon: "🔍"
        },
        {
          id: "step3",
          num: "3",
          title: "あなたにとって、理想的な顧客とは？",
          shortName: "理想的な顧客",
          tag: "STEP 3: 本命ターゲットの特定（書籍 STEP 1）",
          desc: "『理想的な顧客をあぶり出す12個の問い』に基づき、自社の強みを最も評価し、最高の価値を届けられる本命のお客様を決めます。AIも理想の顧客像を考えて提案します。",
          icon: "🎯"
        },
        {
          id: "step4",
          num: "4",
          title: "顧客に対して約束できる成果は？",
          shortName: "約束できる成果",
          tag: "STEP 4: 約束できる成果（書籍 STEP 3）",
          desc: "単なる商品の機能やスペックではなく、理想の顧客が手に入れる『具体的な変化・嬉しい結果・ベネフィット』を定めます。AIも成果を考えて提案します。",
          icon: "🎁"
        },
        {
          id: "step5",
          num: "5",
          title: "顧客の信頼に足るビコーズは？",
          shortName: "信頼に足るビコーズ",
          tag: "STEP 5: 17のテクニック（書籍 STEP 4）",
          desc: "なぜその成果を提供できるのか？ビコーズを創り出す17のテクニック（体系的な根拠・知覚される根拠・生み出された根拠）からAIが最適なビコーズを提案します。",
          icon: "🛡️"
        },
        {
          id: "step6",
          num: "6",
          title: "ビコーズ・フレームワーク（後半）３つのアクション",
          shortName: "後半3つのアクション",
          tag: "STEP 6: 後半3つのアクション（書籍 STEP 5, 6, 7）",
          desc: "『イノベーション創出』『ビコーズ・プラットフォーム構築』『あらゆる顧客接点で実行』の3つのアクションから、AIが選ばれ続けるビコーズを創り出して提案します。",
          icon: "🚀"
        }
      ];

      // 業種リスト
      const INDUSTRY_OPTIONS = [
        "宿泊・観光・温泉旅館",
        "飲食・カフェ・レストラン",
        "小売・EC・通販",
        "美容・健康・サロン・治療院",
        "住宅・建築・リフォーム・修理",
        "高信頼サービス（士業・医療・コンサル）",
        "教育・スクール・コーチング",
        "不動産・地域ビジネス",
        "BtoB・IT・SaaS・受託開発",
        "製造・加工・卸・専門商材",
        "その他・複合サービス"
      ];

      // 書籍準拠：ビコーズを創り出す17のテクニック
      const SEVENTEEN_TECHNIQUES = [
        // 体系的な根拠（4種）
        { id: "tech_process", category: "systematic", categoryName: "体系的な根拠", num: 1, name: "独自のプロセス、システム、方法論", summary: "再現性のある独自の工程・診断フロー・ステップ管理によりブレずに成果を出す仕組み。" },
        { id: "tech_tech", category: "systematic", categoryName: "体系的な根拠", num: 2, name: "独自の技術", summary: "他社が真似できない高度な専門技術、特許技術、特殊設備、独自ノウハウ。" },
        { id: "tech_materials", category: "systematic", categoryName: "体系的な根拠", num: 3, name: "独自の配合、材料、素材", summary: "厳選された天然素材、独自の調合比率、契約農家直送などの希少素材。" },
        { id: "tech_cert", category: "systematic", categoryName: "体系的な根拠", num: 4, name: "品質証明、試験プロセス、認証", summary: "第三者機関による実証実験、ISO等の認証取得、厳しい品質基準のクリア。" },
        // 知覚される根拠（6種）
        { id: "tech_heritage", category: "perceived", categoryName: "知覚される根拠", num: 5, name: "ヘリテージ（伝統・歴史・実績）", summary: "創業年数、受け継がれた歴史、累計実績数、長年の地域での信頼。" },
        { id: "tech_philosophy", category: "perceived", categoryName: "知覚される根拠", num: 6, name: "企業哲学・理念", summary: "創業者の強い信念、絶対に妥協しない想い、顧客と社会に対する誓い。" },
        { id: "tech_craftsmanship", category: "perceived", categoryName: "知覚される根拠", num: 7, name: "クラフトマンシップ（こだわり・職人技）", summary: "熟練の職人による手仕事、細部まで妥協しない仕込みと丁寧な仕上がり。" },
        { id: "tech_social", category: "perceived", categoryName: "知覚される根拠", num: 8, name: "社会的根拠（ソーシャルプルーフ）", summary: "多数のお客様の声、口コミ高評価（星4.8以上）、メディア・TV・雑誌掲載。" },
        { id: "tech_visual", category: "perceived", categoryName: "知覚される根拠", num: 9, name: "視覚的根拠", summary: "一目でわかるビフォーアフター写真、実演動画、作業工程の完全オープン化。" },
        { id: "tech_third_party", category: "perceived", categoryName: "知覚される根拠", num: 10, name: "第三者による裏づけのある信頼性", summary: "専門家や大学教授の推薦・監修、業界アワード受賞、公的機関の表彰。" },
        // 生み出された根拠（7種）
        { id: "tech_diff", category: "created", categoryName: "生み出された根拠", num: 11, name: "商品とサービスの差別化要因", summary: "他社にはない独自スペック、専用設計、特定の悩みに特化した設計。" },
        { id: "tech_pricing", category: "created", categoryName: "生み出された根拠", num: 12, name: "価格体系", summary: "完全定額明朗会計、成果報酬型、追加費用なしの安心できる料金設計。" },
        { id: "tech_custom", category: "created", categoryName: "生み出された根拠", num: 13, name: "カスタマイズ", summary: "一人ひとりの状況に合わせた完全個別オーダーメイド・専用カルテ設計。" },
        { id: "tech_value_add", category: "created", categoryName: "生み出された根拠", num: 14, name: "付加価値", summary: "購入後1年間の無料点検、無償アフター相談、限定オリジナルガイド特典。" },
        { id: "tech_org", category: "created", categoryName: "生み出された根拠", num: 15, name: "独自の組織体制", summary: "専任担当コンシェルジュ制、即日駆けつけ体制、専門チーム連携。" },
        { id: "tech_guarantee", category: "created", categoryName: "生み出された根拠", num: 16, name: "保証", summary: "全額返金保証、無償やり直し保証、長期安心保証で顧客リスクをゼロに。" },
        { id: "tech_innovation", category: "created", categoryName: "生み出された根拠", num: 17, name: "新しいアプローチ／イノベーション", summary: "業界の常識を覆す新しい仕組み、AIやDXの活用、新提供モデル。" }
      ];

      // 後半3つのアクション
      const THREE_ACTIONS = [
        {
          id: "action_innovation",
          step: "STEP 5",
          cls: "innovation",
          title: "アクション①：イノベーションを起こす",
          sub: "強力なビコーズがない場合、新たな付加価値や保証を重ねて創出する",
          desc: "もし既存の商品に強いビコーズが足りない場合、顧客の洞察に立ち返り、新保証・独自工程・付加価値を組み合わせて『選ばれる理由』を新たに創り出します。"
        },
        {
          id: "action_platform",
          step: "STEP 6",
          cls: "platform",
          title: "アクション②：ビコーズ・プラットフォームを構築する",
          sub: "完成したビコーズをWeb・LP・AI検索（一次情報・FAQ）へ体系展開する",
          desc: "インフルエンスステートメントを起点に、公式サイト・LPファーストビュー・営業資料・動画・そしてChatGPTやPerplexityに参照される公式FAQを整備します。"
        },
        {
          id: "action_touchpoint",
          step: "STEP 7",
          cls: "touchpoint",
          title: "アクション③：あらゆる顧客接点で取り組みを実行する",
          sub: "現場スタッフ・販売後フォロー・全接点でビコーズを一貫して体現する",
          desc: "言葉だけで終わらせず、現場スタッフの権限委譲、接客トーク、販売後7日目フォロー、クチコミ回収など、すべての接点でビコーズを証明し続けます。"
        }
      ];

      // アプリケーション状態
      let state = {
        currentStep: 0,
        answers: {
          industryFamily: "宿泊・観光・温泉旅館",
          companyWebsiteUrl: "",
          companyName: "",
          business: "",
          friction: "",
          desired: "",
          target: "",
          outcome: "",
          evidence: "",
          innovationAction: "",
          platformAction: "",
          touchpointAction: ""
        }
      };

      // 音声認識状態
      let recognition = null;
      let isRecording = false;

      // ローカルストレージ復元
      function loadState() {
        try {
          const raw = localStorage.getItem(STORAGE_KEY);
          if (raw) {
            const parsed = JSON.parse(raw);
            if (parsed && parsed.answers) {
              state = Object.assign(state, parsed);
            }
          }
        } catch (e) {
          console.warn("Storage load error:", e);
        }
      }

      function saveState() {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch (e) {
          console.warn("Storage save error:", e);
        }
      }

      function showToast(msg) {
        const toast = document.getElementById("toast");
        toast.textContent = msg;
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 2600);
      }

      function escapeHtml(str) {
        return (str || "")
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#039;");
      }

      // ==========================================
      // AI提案生成エンジン
      // ==========================================
      function getAISuggestions(stepNum) {
        const ind = state.answers.industryFamily || "宿泊・観光・温泉旅館";
        const biz = state.answers.business || "";
        const cName = state.answers.companyName || "当社";
        const friction = state.answers.friction || "";
        const desired = state.answers.desired || "";
        const target = state.answers.target || "";
        const outcome = state.answers.outcome || "";

        // キーワード抽出
        const isPet = biz.includes("ペット") || biz.includes("猫") || biz.includes("犬");
        const isOnsen = biz.includes("温泉") || ind.includes("宿泊");
        const isFood = ind.includes("飲食") || biz.includes("料理") || biz.includes("カフェ");
        const isB2B = ind.includes("BtoB") || ind.includes("IT") || biz.includes("システム") || biz.includes("コンサル");
        const isBeauty = ind.includes("美容") || biz.includes("サロン") || biz.includes("治療");
        const isHousing = ind.includes("住宅") || biz.includes("リフォーム") || biz.includes("修理");

        if (stepNum === 1) {
          // ステップ2：顧客の洞察提案
          if (isPet && isOnsen) {
            return [
              {
                tag: "ペット同伴客の切実な不安",
                title: "他のお客様の視線や鳴き声への気兼ね",
                body: "「ペット可の宿でも、実際はケージ必須だったり他の宿泊客の目が気になって、全く気が休まらなかった…」という強い後悔と不安。",
                friction: "ペット可と書いてあっても、ケージ必須や他のお客さんの冷たい視線が気になり、心からくつろげない。",
                desired: "誰にも気兼ねせず、愛するペットと同じ部屋で本物の源泉かけ流し温泉と美味しい料理を心ゆくまで堪能したい。"
              },
              {
                tag: "ペットホテルへの罪悪感",
                title: "家族であるペットを置いていく辛さ",
                body: "「旅行のたびにペットホテルに預けるのが可哀想で、罪悪感を感じていた」という本音。",
                friction: "ペットを預ける罪悪感と、狭いケージでストレスを与えてしまう心配。",
                desired: "家族の一員として一緒に同じ部屋で過ごし、一生残る素晴らしい思い出を一緒に作りたい。"
              },
              {
                tag: "温泉と料理の妥協",
                title: "ペット優先で料理や温泉の質を諦めている",
                body: "「ペットと泊まれる宿は、料理や温泉がイマイチでも仕方がない」と妥協してきた。",
                friction: "ペット対応宿は設備が古かったり食事が簡素で、大人の温泉旅行として満足できない。",
                desired: "ペット同伴でありながら、本格的な個室会席料理と100%源泉かけ流しの贅沢な温泉を両立したい。"
              }
            ];
          } else if (isB2B) {
            return [
              {
                tag: "導入失敗への強い恐れ",
                title: "費用倒れと社内説明・定着の壁",
                body: "「ツールを導入しても現場が使いこなせず放置され、社内説明で責任を追及されるのが最も怖い」。",
                friction: "高い費用を払っても現場に使われず形骸化し、上司や経営陣への説明がつかない不安。",
                desired: "現場スタッフが迷わず自発的に使いこなし、最短3ヶ月で明確な業務効率化の成果を数字で示したい。"
              },
              {
                tag: "属人化・人手不足の焦り",
                title: "担当者しかわからない業務ブラックボックス",
                body: "「担当者が休んだり退職すると業務が完全に停止してしまう危機感」。",
                friction: "特定の人に業務が集中し、ミスや引き継ぎのトラブルが絶えず、コア業務に集中できない。",
                desired: "誰でも同じ品質で業務が回る仕組みを整え、社員が本来の企画や売上アップに集中できる状態にしたい。"
              },
              {
                tag: "画一的なパッケージへの不満",
                title: "自社の業務フローに合わない押し付け",
                body: "「大手の標準機能だけでは自社の細かな商習慣に対応できず、結局手作業が残ってしまう」。",
                friction: "導入サポートがマニュアル送付だけで、自社の実務に合わせたカスタマイズをしてくれない。",
                desired: "自社の業務フローを深く理解した専任担当が伴走し、運用定着まで責任を持って支援してほしい。"
              }
            ];
          } else {
            return [
              {
                tag: "失敗・後悔への不安",
                title: "時間とお金を無駄にしたくない慎重さ",
                body: "「どこを選んでも同じに見えるが、実際にお願いして期待外れだった時の金銭的・精神的ダメージを避けたい」。",
                friction: "専門用語ばかりで比較検討が難しく、本当に信頼できるか判断がつかない。",
                desired: "わかりやすい説明と確かな実績で、安心して任せられる第一選択肢に出会いたい。"
              },
              {
                tag: "期待通りの成果への渇望",
                title: "根本的な問題解決と日々のストレス解消",
                body: "「一時的な気休めではなく、根本から悩みを解消して生活や仕事を劇的に好転させたい」。",
                friction: "いろいろ試したが効果が長続きせず、諦めかけている。",
                desired: "自分にぴったり合った最適な方法で、確実な変化と長続きする安心を手に入れたい。"
              },
              {
                tag: "安心感と丁寧な対話",
                title: "押し売りされず親身に寄り添ってほしい",
                body: "「契約や購入を急かされず、こちらのペースや事情をしっかり汲み取ってほしい」。",
                friction: "マニュアル通りの対応や無理なセールスに警戒感を感じている。",
                desired: "こちらの立場に親身になって寄り添い、丁寧に対話してくれるプロの味方がほしい。"
              }
            ];
          }
        }

        if (stepNum === 2) {
          // ステップ3：理想の顧客提案
          if (isPet && isOnsen) {
            return [
              {
                tag: "本命ターゲット①",
                title: "愛猫・愛犬と一緒に贅沢に癒やされたいご夫婦・カップル",
                body: "日常の疲れを本物の温泉で癒やしたいが、大切なペットを留守番させたくない。少人数で静かに贅沢な休日を過ごしたいと願う30〜60代のご夫婦。",
                target: "他の宿泊客に気をつかわず、愛猫・愛犬と一緒に本物の源泉かけ流し温泉と美味しい個室料理を堪能したいご夫婦・パートナー"
              },
              {
                tag: "本命ターゲット②",
                title: "ペットの誕生日や記念日を特別にお祝いしたい飼い主様",
                body: "ただ泊まるだけでなく、ペットの記念日を大切な家族行事として特別な空間で祝いたい、価格よりも安心感と特別感を重視する飼い主様。",
                target: "愛犬・愛猫の誕生日や家族の記念日を、ペットファーストの安心な完全個室空間で特別にお祝いしたい飼い主様"
              },
              {
                tag: "本命ターゲット③",
                title: "ペット同伴旅で一度失敗・後悔した経験がある慎重なお客様",
                body: "「以前泊まったペット宿が狭く汚れていてガッカリした」「他人の犬に吠えられて休まらなかった」経験から、本当に信頼できる上質な宿を探している方。",
                target: "過去のペット宿泊で気疲れした経験があり、本当に清潔で静かに過ごせるペット専用客室を求める上質志向の愛猫・愛犬家"
              }
            ];
          } else if (isB2B) {
            return [
              {
                tag: "本命ターゲット①",
                title: "ツールの導入だけでなく現場定着まで伴走してほしい中小企業経営者",
                body: "人手不足で業務が属人化しており、DXや効率化を進めたいが社内に専任IT担当がおらず、伴走サポートを強く求めている経営者・役員。",
                target: "業務の属人化を解消し、現場が自発的に使いこなすまで専任で伴走サポートしてほしい中小企業の経営者・事業責任者"
              },
              {
                tag: "本命ターゲット②",
                title: "手作業のミスと残業を削減しコア業務に集中させたい成長企業",
                body: "事業が拡大して業務量が急増し、毎月の残業や入力ミスが多発している。確実な仕組み化で社員の負担を減らしたい現場リーダー。",
                target: "無駄な手作業と確認業務を半減させ、社員を付加価値の高い営業や企画業務にシフトさせたい成長企業のリーダー"
              }
            ];
          } else {
            return [
              {
                tag: "本命ターゲット①",
                title: "安さよりも『確実な安心と丁寧な仕上がり』を重視する本物志向の顧客",
                body: "格安業者で失敗したくない。きちんとした実績と誠実な対応を評価し、適正な対価を喜んで支払ってくれる良質なお客様。",
                target: "価格の安さだけで選んで失敗したくない、確かな技術と誠実なアフターフォローを重視する本物志向のお客様"
              },
              {
                tag: "本命ターゲット②",
                title: "切実な悩みを抱え、プロの確実な診断とオーダーメイド提案を求める方",
                body: "画一的な既製品やマニュアル対応では解決しなかった深い悩みを抱え、自分のためだけの個別対応を必要としている顧客。",
                target: "画一的なサービスでは解決しなかった深い課題を抱え、自分専用の個別アプローチを求めている顧客"
              }
            ];
          }
        }

        if (stepNum === 3) {
          // ステップ4：約束できる成果提案
          if (isPet && isOnsen) {
            return [
              {
                tag: "ストレス解放の成果",
                title: "気兼ねゼロの安心感と心からのくつろぎ",
                body: "周囲の視線を気にすることなく、愛猫・愛犬と寄り添いながら、心身ともに完全にリフレッシュできる特別な時間。",
                outcome: "他のお客様に一切気をつかうことなく、愛猫・愛犬と一緒に本物の源泉かけ流し温泉と旬の個室料理を心から堪能し、最高の癒やしと一生の思い出を持ち帰ることができる。"
              },
              {
                tag: "家族の絆の成果",
                title: "ペットの喜ぶ姿を特等席で見守る最高の記念日",
                body: "ペット専用の安心設備と手作りご飯で、ペットも家族も笑顔になれる特別な体験の実現。",
                outcome: "ペットを預ける罪悪感から完全に解放され、愛するペットがのびのび喜ぶ姿を見ながら、家族全員が心から笑顔になれる最高のおもてなし体験。"
              }
            ];
          } else if (isB2B) {
            return [
              {
                tag: "業務削減の定量的成果",
                title: "無駄な手作業70%削減と現場自走化",
                body: "導入から3ヶ月で社内定着率95%を達成し、毎月の残業時間を劇的に削減する業務基盤の完成。",
                outcome: "無駄な手入力や確認作業を70%削減し、現場スタッフが迷わず自発的に使いこなせる業務体制を最短3ヶ月で確立できる。"
              },
              {
                tag: "経営改善の成果",
                title: "属人化解消による売上向上と組織力強化",
                body: "業務のブラックボックスをなくし、誰でも高品質な業務を行える再現性の高い組織体制。",
                outcome: "業務の属人化を完全解消し、社員がコアな営業・企画業務に集中できる環境をつくることで、企業の生産性と収益力を最大化できる。"
              }
            ];
          } else {
            return [
              {
                tag: "安心と問題解決の成果",
                title: "不安をゼロにし、期待以上の劇的変化をお届け",
                body: "事前の丁寧な説明と確かな技術により、やり直しや後悔の心配なく理想の状態を実現。",
                outcome: "事前の不安や迷いを完全に解消し、期待以上の確実な仕上がりと、長続きする安心を手に入れることができる。"
              },
              {
                tag: "時間と手間の短縮成果",
                title: "最短ルートで迷わず理想の成果に到達",
                body: "無駄な試行錯誤をなくし、プロの的確なサポートでスムーズに問題を解決。",
                outcome: "無駄な時間とコストを一切かけず、プロの伴走によって最短ルートで確実な成果を実感できる。"
              }
            ];
          }
        }

        if (stepNum === 4) {
          // ステップ5：17のテクニックからのビコーズ提案
          if (isPet && isOnsen) {
            return [
              {
                category: "systematic",
                catName: "体系的な根拠",
                techName: "独自のプロセス・配合・材料",
                body: "【体系的根拠】加水・加温一切なしの100%源泉かけ流し天然温泉と、ペット栄養管理士監修の無添加ペット専用料理があるから。",
                evidence: "加水・加温・循環一切なしの100%源泉かけ流し天然温泉を全客室に備え、ペット栄養管理士が監修した手作りの無添加ペット専用料理を提供しているから。"
              },
              {
                category: "perceived",
                catName: "知覚される根拠",
                techName: "ヘリテージ・クラフトマンシップ・社会的根拠",
                body: "【知覚される根拠】大手旅行サイトのペット同伴宿部門で口コミ総合4.9を獲得し、看板猫とおもてなしのプロが家族のように温かく迎えるから。",
                evidence: "大手旅行サイトのペット同伴部門で口コミ総合評価4.9を獲得し、全スタッフが動物看護士またはペット飼育歴10年以上の専門知識を持ち、看板猫とともに温かく迎えるから。"
              },
              {
                category: "created",
                catName: "生み出された根拠",
                techName: "差別化要因・カスタマイズ・保証",
                body: "【生み出された根拠】全室防音ペット専用フロア・完全個室でのお部屋食を提供し、万が一のペット体調不良時もキャンセル料免除の安心保証があるから。",
                evidence: "全客室が完全防音・滑りにくい特殊床材を採用したペット専用設計で、お食事も完全お部屋食のため他のお客様と接触がなく、万が一のペット体調不良時も当日までキャンセル料無料の安心保証があるから。"
              }
            ];
          } else if (isB2B) {
            return [
              {
                category: "systematic",
                catName: "体系的な根拠",
                techName: "独自のプロセス・システム",
                body: "【体系的根拠】過去500社以上の導入実績から体系化した『5段階定着ロードマップ』と、特許取得の自動化ワークフローがあるから。",
                evidence: "過去500社以上の支援データから体系化した『5段階定着ロードマップ』により、初期設定から実務定着までを最短3ヶ月でブレなく完了させる独自システムがあるから。"
              },
              {
                category: "perceived",
                catName: "知覚される根拠",
                techName: "社会的根拠・第三者裏づけ",
                body: "【知覚される根拠】業界導入シェアNo.1、継続率98.5%を誇り、東証プライム上場企業から中小企業まで多数の導入事例が公開されているから。",
                evidence: "継続利用率98.5%、累計導入企業1,000社以上の社会的実績があり、経済産業省のDX認定企業として公的にもその実効性が認められているから。"
              },
              {
                category: "created",
                catName: "生み出された根拠",
                techName: "独自の組織体制・保証・価格体系",
                body: "【生み出された根拠】1社ごとに専任の運用コンサルタントが常時つき、導入後3ヶ月で成果が出なければ全額返金する安心保証があるから。",
                evidence: "マニュアルを渡すだけでなく専任コンサルタントが週1回の定例で伴走し、万が一導入から90日以内に運用定着しなかった場合の『完全返金保証』をお約束しているから。"
              }
            ];
          } else {
            return [
              {
                category: "systematic",
                catName: "体系的な根拠",
                techName: "独自のプロセス・技術",
                body: "【体系的根拠】自社で開発した全7工程の精密診断メソッドと、国家資格保持者による特許技術があるから。",
                evidence: "国家資格を持つ専門スタッフが、独自開発した全7工程の精密診断メソッドに基づき、一切の妥協なく高品質な施工・サービスを実施するから。"
              },
              {
                category: "perceived",
                catName: "知覚される根拠",
                techName: "社会的根拠・歴史・職人技",
                body: "【知覚される根拠】地域密着で創業35年、累計1万件以上の施工実績と、お客様満足度97%の口コミ評価があるから。",
                evidence: "創業35年の歴史と累計1万件を超える実績があり、地域口コミ評価でも星4.8以上を維持し、テレビや新聞でも特集された信頼があるから。"
              },
              {
                category: "created",
                catName: "生み出された根拠",
                techName: "保証・付加価値・明朗会計",
                body: "【生み出された根拠】追加費用一切なしの完全明朗会計と、万が一の仕上がり不満に対する無償やり直し・長期保証があるから。",
                evidence: "見積もり後の追加料金が一切発生しない明朗会計を徹底し、購入後も最長10年の長期保証と無料アフター点検を無償で提供しているから。"
              }
            ];
          }
        }

        if (stepNum === 5) {
          // ステップ6：後半3つのアクション提案
          if (isPet && isOnsen) {
            return {
              innovation: "【アクション① イノベーション創出】『愛猫・愛犬専用の無添加会席料理』のオプション新設と、業界初の『ペット体調不良による当日キャンセル無料保証』を制度化し、強力な差別化ビコーズを創出する。",
              platform: "【アクション② ビコーズ・プラットフォーム構築】公式サイトのトップに『他人に気をつかわず愛猫と過ごせる温泉宿』のインフルエンスステートメントを掲げ、AI検索（ChatGPT/Perplexity）で『猫と泊まれる源泉かけ流し温泉』の一次情報として抽出される専用FAQ・客室防音スペックページを公開する。",
              touchpoint: "【アクション③ 全接点での実行】チェックイン時にウェルカムペットおやつを手渡し、お部屋食の配膳時はペットが驚かない丁寧な声かけを現場マニュアル化。宿泊後3日目に記念写真付きの絵葉書を送付し、感動の口コミを自然に集める。"
            };
          } else if (isB2B) {
            return {
              innovation: "【アクション① イノベーション創出】他社にない『90日間成果未達成時の全額返金保証』と『社内定着率95%保証パック』を正式リリースし、顧客の意思決定リスクを極限まで下げる新ビコーズを生み出す。",
              platform: "【アクション② ビコーズ・プラットフォーム構築】インフルエンスステートメントを導入事例集やサービスLPのファーストビューに配置し、AI検索や比較サイトに引用される『業務効率化ロードマップ』『導入前後の定量比較データ』を一次情報としてWeb公開する。",
              touchpoint: "【アクション③ 全接点での実行】営業担当の商談トークを『機能説明』から『成果とビコーズの約束』に統一。契約後7日以内にキックオフ定例を実施し、週次レポートで削減時間を可視化して顧客接点全体で約束を果たす。"
            };
          } else {
            return {
              innovation: "【アクション① イノベーション創出】競合が踏み込めない『完全無償やり直し保証＋最長10年長期サポート』を新設し、顧客が他社と比較した際に圧倒的に選ばれる強力な新ビコーズを確立する。",
              platform: "【アクション② ビコーズ・プラットフォーム構築】公式ホームページとSNS、Googleビジネスプロフィールの説明文をインフルエンスステートメントに完全統一し、AI検索やGoogleで検索された際に正確な一次情報が即座に表示されるFAQページを設置する。",
              touchpoint: "【アクション③ 全接点での実行】現場スタッフ全員に『選ばれる理由カード』を配布し、接客・施工・電話対応の全接点でビコーズを体現。完了後7日目のフォローコールとアンケートで顧客の声を継続収集する。"
            };
          }
        }

        return [];
      }

      // ==========================================
      // レンダリング関数群
      // ==========================================

      // ヒーロー内ステップバー
      function renderHeroSteps() {
        const container = document.getElementById("heroSteps");
        if (!container) return;
        container.innerHTML = STAGES.map((s, idx) => {
          const isActive = idx === state.currentStep;
          return \`
            <div class="hero-step-pill \${isActive ? 'active' : ''}" onclick="window.goToStep(\${idx})">
              <span class="hero-step-num">\${s.num}</span>
              <span class="hero-step-name">\${escapeHtml(s.shortName)}</span>
            </div>
          \`;
        }).join("");
      }

      // 左サイドバー：ステップリスト
      function renderStepNavList() {
        const container = document.getElementById("stepNavList");
        if (!container) return;

        container.innerHTML = STAGES.map((s, idx) => {
          const isActive = idx === state.currentStep;
          let isCompleted = false;
          if (idx === 0 && state.answers.industryFamily && (state.answers.business || state.answers.companyName)) isCompleted = true;
          if (idx === 1 && (state.answers.friction || state.answers.desired)) isCompleted = true;
          if (idx === 2 && state.answers.target) isCompleted = true;
          if (idx === 3 && state.answers.outcome) isCompleted = true;
          if (idx === 4 && state.answers.evidence) isCompleted = true;
          if (idx === 5 && (state.answers.innovationAction || state.answers.platformAction || state.answers.touchpointAction)) isCompleted = true;

          return \`
            <button type="button" class="step-nav-item \${isActive ? 'active' : ''} \${isCompleted ? 'completed' : ''}" onclick="window.goToStep(\${idx})">
              <div class="step-badge">\${isCompleted ? '✓' : s.num}</div>
              <div class="step-text">
                <span class="step-title">\${escapeHtml(s.title)}</span>
                <span class="step-sub">\${escapeHtml(s.desc)}</span>
              </div>
            </button>
          \`;
        }).join("");
      }

      // 中央パネル：現在のステップの設問＆AI提案
      function renderQuestionPanel() {
        const container = document.getElementById("questionPanel");
        if (!container) return;

        const currentStage = STAGES[state.currentStep];
        const stepNum = state.currentStep;

        let contentHtml = "";

        // ステップ1：業種・HP・会社情報
        if (stepNum === 0) {
          contentHtml = \`
            <div class="question-header">
              <span class="question-stage-tag">\${escapeHtml(currentStage.tag)}</span>
              <h2 class="question-title">\${escapeHtml(currentStage.title)}</h2>
              <p class="question-desc">\${escapeHtml(currentStage.desc)}</p>
            </div>

            <!-- 公式HP自動解析ボックス -->
            <div class="url-fetcher-box">
              <div class="url-fetcher-header">
                <div class="url-fetcher-title">
                  <span>🌐</span>
                  <span>公式ホームページから事業内容を自動反映</span>
                </div>
                <span style="font-size:0.75rem; color:var(--teal-dark); font-weight:700;">URLを入れるだけで自動解析！</span>
              </div>
              <div class="url-input-row">
                <input type="url" id="websiteUrlInput" class="form-input" placeholder="https://example.com （公式ホームページURL）" value="\${escapeHtml(state.answers.companyWebsiteUrl)}" />
                <button type="button" id="fetchUrlBtn" class="url-fetch-btn">
                  <span>⚡</span>
                  <span id="fetchBtnLabel">自動解析して反映</span>
                </button>
              </div>
              <div id="urlStatusMsg" class="url-status-msg"></div>
            </div>

            <!-- 業種選択 -->
            <div class="form-group">
              <label class="form-label" for="industrySelect">
                <span>あなたの事業の業種</span>
                <span class="req">必須</span>
              </label>
              <p class="form-helper">選んだ業種にあわせて、AIが顧客の悩みや選ばれるビコーズを最適に提案します。</p>
              <select id="industrySelect" class="form-select">
                \${INDUSTRY_OPTIONS.map(opt => \`
                  <option value="\${escapeHtml(opt)}" \${state.answers.industryFamily === opt ? "selected" : ""}>\${escapeHtml(opt)}</option>
                \`).join("")}
              </select>
            </div>

            <!-- 会社名・屋号 -->
            <div class="form-group">
              <label class="form-label" for="companyNameInput">
                <span>会社名・屋号・ブランド名</span>
              </label>
              <input type="text" id="companyNameInput" class="form-input" placeholder="例：月見の湯 翠水亭、株式会社グロースIT" value="\${escapeHtml(state.answers.companyName)}" />
            </div>

            <!-- 事業概要・商品サービスの特徴 -->
            <div class="form-group">
              <label class="form-label" for="businessInput">
                <span>商品・サービス・事業の特徴</span>
                <span class="req">必須</span>
              </label>
              <p class="form-helper">どんな商品やサービスを提供しているか、特徴やこだわりを簡単に書いてください（HPから自動反映も可能）。</p>
              <textarea id="businessInput" class="form-textarea" style="min-height:100px;" placeholder="例：静かな自然に囲まれた山あいで、全室ペット同伴対応の客室と、加水加温なしの100%源泉かけ流し温泉、個室会席料理を提供する小さな温泉宿です。">\${escapeHtml(state.answers.business)}</textarea>
              <div class="voice-bar">
                <button type="button" class="voice-btn" data-target="businessInput">🎙 話して入力</button>
                <span class="voice-hint">マイクを押して話すと文字入力できます</span>
              </div>
            </div>
          \`;
        }

        // ステップ2：顧客についての洞察
        else if (stepNum === 1) {
          const suggestions = getAISuggestions(1);
          contentHtml = \`
            <div class="question-header">
              <span class="question-stage-tag">\${escapeHtml(currentStage.tag)}</span>
              <h2 class="question-title">\${escapeHtml(currentStage.title)}</h2>
              <p class="question-desc">\${escapeHtml(currentStage.desc)}</p>
            </div>

            <!-- 顧客の悩み・避けたい摩擦 -->
            <div class="form-group">
              <label class="form-label" for="frictionInput">
                <span>顧客が避けたい不安・摩擦・失敗（ペイン）</span>
                <span class="req">必須</span>
              </label>
              <p class="form-helper">顧客が普段抱えている悩みや、他社で感じた不満、失敗したくないことを記入します。</p>
              <textarea id="frictionInput" class="form-textarea" placeholder="例：ペット可と書いてあっても、実際はケージ必須や他のお客さんの冷たい視線が気になり、心からくつろげない。">\${escapeHtml(state.answers.friction)}</textarea>
              <div class="voice-bar">
                <button type="button" class="voice-btn" data-target="frictionInput">🎙 話して入力</button>
              </div>
            </div>

            <!-- 顧客の望む状態 -->
            <div class="form-group">
              <label class="form-label" for="desiredInput">
                <span>顧客が本当に得たい理想の状態（ゲイン）</span>
                <span class="req">必須</span>
              </label>
              <p class="form-helper">その悩みが解決したとき、顧客が心から喜ぶ理想の状態や本音を記入します。</p>
              <textarea id="desiredInput" class="form-textarea" placeholder="例：誰にも気兼ねせず、愛するペットと同じ部屋で本物の源泉かけ流し温泉と美味しい料理を心ゆくまで堪能したい。">\${escapeHtml(state.answers.desired)}</textarea>
              <div class="voice-bar">
                <button type="button" class="voice-btn" data-target="desiredInput">🎙 話して入力</button>
              </div>
            </div>

            <!-- ★AIの洞察提案エリア -->
            <div class="ai-suggest-section">
              <div class="ai-suggest-header">
                <div class="ai-suggest-title">
                  <span class="ai-badge">AI洞察提案</span>
                  <span>AIが考えた「顧客の深層心理・洞察」</span>
                </div>
                <button type="button" class="ai-refresh-btn" onclick="window.refreshSuggestions()">🔄 別のアイデアを生成</button>
              </div>
              <p style="margin:0 0 10px; font-size:0.78rem; color:var(--muted);">業種と事業内容をもとにAIが導き出しました。クリックするだけで上の入力欄に反映できます。</p>
              <div class="ai-cards-grid">
                \${suggestions.map((item, i) => \`
                  <div class="ai-card">
                    <div>
                      <span class="ai-card-tag">\${escapeHtml(item.tag)}</span>
                      <h4 class="ai-card-title">\${escapeHtml(item.title)}</h4>
                      <p class="ai-card-body">\${escapeHtml(item.body)}</p>
                    </div>
                    <div class="ai-card-actions">
                      <button type="button" class="ai-adopt-btn" onclick="window.adoptInsight(\${i})">💡 この洞察を採用</button>
                    </div>
                  </div>
                \`).join("")}
              </div>
            </div>
          \`;
        }

        // ステップ3：理想的な顧客とは？
        else if (stepNum === 2) {
          const suggestions = getAISuggestions(2);
          contentHtml = \`
            <div class="question-header">
              <span class="question-stage-tag">\${escapeHtml(currentStage.tag)}</span>
              <h2 class="question-title">\${escapeHtml(currentStage.title)}</h2>
              <p class="question-desc">\${escapeHtml(currentStage.desc)}</p>
            </div>

            <!-- 理想的な顧客（ターゲット） -->
            <div class="form-group">
              <label class="form-label" for="targetInput">
                <span>あなたにとって、一番力になれる『理想的な顧客（本命1組）』</span>
                <span class="req">必須</span>
              </label>
              <p class="form-helper">『理想的な顧客をあぶり出す12の問い』より：自社の強みを最も喜び、高い価値を感じてくれる本命のお客様を1組に絞り込みます。</p>
              <textarea id="targetInput" class="form-textarea" placeholder="例：他の宿泊客に気をつかわず、愛猫・愛犬と一緒に本物の源泉かけ流し温泉と美味しい個室料理を堪能したいご夫婦・パートナー">\${escapeHtml(state.answers.target)}</textarea>
              <div class="voice-bar">
                <button type="button" class="voice-btn" data-target="targetInput">🎙 話して入力</button>
              </div>
            </div>

            <!-- ★AIの理想顧客提案エリア -->
            <div class="ai-suggest-section">
              <div class="ai-suggest-header">
                <div class="ai-suggest-title">
                  <span class="ai-badge">AI顧客提案</span>
                  <span>AIが考えた「選ばれる理想的な顧客像」</span>
                </div>
                <button type="button" class="ai-refresh-btn" onclick="window.refreshSuggestions()">🔄 別の顧客像を生成</button>
              </div>
              <p style="margin:0 0 10px; font-size:0.78rem; color:var(--muted);">自社が第一選択肢になりやすく、高単価でも喜ばれるターゲット候補です。</p>
              <div class="ai-cards-grid">
                \${suggestions.map((item, i) => \`
                  <div class="ai-card">
                    <div>
                      <span class="ai-card-tag">\${escapeHtml(item.tag)}</span>
                      <h4 class="ai-card-title">\${escapeHtml(item.title)}</h4>
                      <p class="ai-card-body">\${escapeHtml(item.body)}</p>
                    </div>
                    <div class="ai-card-actions">
                      <button type="button" class="ai-adopt-btn" onclick="window.adoptTarget(\${i})">🎯 この顧客をターゲットにする</button>
                    </div>
                  </div>
                \`).join("")}
              </div>
            </div>
          \`;
        }

        // ステップ4：約束できる成果は？
        else if (stepNum === 3) {
          const suggestions = getAISuggestions(3);
          contentHtml = \`
            <div class="question-header">
              <span class="question-stage-tag">\${escapeHtml(currentStage.tag)}</span>
              <h2 class="question-title">\${escapeHtml(currentStage.title)}</h2>
              <p class="question-desc">\${escapeHtml(currentStage.desc)}</p>
            </div>

            <!-- 約束できる成果 -->
            <div class="form-group">
              <label class="form-label" for="outcomeInput">
                <span>顧客に対して約束できる具体的な成果（ビフォーアフター）</span>
                <span class="req">必須</span>
              </label>
              <p class="form-helper">単なる機能ではなく、理想の顧客が手に入れる具体的な変化・嬉しい結果・ベネフィットを記入します。</p>
              <textarea id="outcomeInput" class="form-textarea" placeholder="例：他のお客様に一切気をつかうことなく、愛猫・愛犬と一緒に本物の源泉かけ流し温泉と旬の個室料理を心から堪能し、最高の癒やしと一生の思い出を持ち帰ることができる。">\${escapeHtml(state.answers.outcome)}</textarea>
              <div class="voice-bar">
                <button type="button" class="voice-btn" data-target="outcomeInput">🎙 話して入力</button>
              </div>
            </div>

            <!-- ★AIの成果提案エリア -->
            <div class="ai-suggest-section">
              <div class="ai-suggest-header">
                <div class="ai-suggest-title">
                  <span class="ai-badge">AI成果提案</span>
                  <span>AIが考えた「約束できる魅力的な成果」</span>
                </div>
                <button type="button" class="ai-refresh-btn" onclick="window.refreshSuggestions()">🔄 別の成果案を生成</button>
              </div>
              <p style="margin:0 0 10px; font-size:0.78rem; color:var(--muted);">顧客が喉から手が出るほど欲しい、競合と差別化された成果案です。</p>
              <div class="ai-cards-grid">
                \${suggestions.map((item, i) => \`
                  <div class="ai-card">
                    <div>
                      <span class="ai-card-tag">\${escapeHtml(item.tag)}</span>
                      <h4 class="ai-card-title">\${escapeHtml(item.title)}</h4>
                      <p class="ai-card-body">\${escapeHtml(item.body)}</p>
                    </div>
                    <div class="ai-card-actions">
                      <button type="button" class="ai-adopt-btn" onclick="window.adoptOutcome(\${i})">🎁 この成果を採用する</button>
                    </div>
                  </div>
                \`).join("")}
              </div>
            </div>
          \`;
        }

        // ステップ5：顧客の信頼に足るビコーズは？（17のテクニック）
        else if (stepNum === 4) {
          const suggestions = getAISuggestions(4);
          contentHtml = \`
            <div class="question-header">
              <span class="question-stage-tag">\${escapeHtml(currentStage.tag)}</span>
              <h2 class="question-title">\${escapeHtml(currentStage.title)}</h2>
              <p class="question-desc">\${escapeHtml(currentStage.desc)}</p>
            </div>

            <!-- ビコーズ入力欄 -->
            <div class="form-group">
              <label class="form-label" for="evidenceInput">
                <span>顧客の信頼に足るビコーズ（選ばれる理由・なぜなら）</span>
                <span class="req">必須</span>
              </label>
              <p class="form-helper">『成果』を顧客が信じるための決定的な根拠。下の17テクニックからAI提案を選んで追加・編集できます。</p>
              <textarea id="evidenceInput" class="form-textarea" style="min-height:110px;" placeholder="例：全客室が完全防音のペット専用設計で、お食事も完全個室食のため他のお客様と接触がなく、加水加温一切なしの100%源泉かけ流し天然温泉を提供しているから。">\${escapeHtml(state.answers.evidence)}</textarea>
              <div class="voice-bar">
                <button type="button" class="voice-btn" data-target="evidenceInput">🎙 話して入力</button>
              </div>
            </div>

            <!-- ★AIの17テクニック提案エリア -->
            <div class="ai-suggest-section">
              <div class="ai-suggest-header">
                <div class="ai-suggest-title">
                  <span class="ai-badge">17のテクニック提案</span>
                  <span>3大カテゴリーからAIが厳選したビコーズ候補</span>
                </div>
                <button type="button" class="ai-refresh-btn" onclick="window.refreshSuggestions()">🔄 別の根拠を生成</button>
              </div>
              <p style="margin:0 0 10px; font-size:0.78rem; color:var(--muted);">「体系的な根拠」「知覚される根拠」「生み出された根拠」のそれぞれから、最も説得力のあるビコーズを提案します。複数組み合わせて使えます。</p>

              <div class="ai-cards-grid">
                \${suggestions.map((item, i) => \`
                  <div class="ai-card technique-card \${item.category}">
                    <div>
                      <span class="ai-card-tag">\${escapeHtml(item.catName)}</span>
                      <h4 class="ai-card-title">\${escapeHtml(item.techName)}</h4>
                      <p class="ai-card-body">\${escapeHtml(item.body)}</p>
                    </div>
                    <div class="ai-card-actions">
                      <button type="button" class="ai-adopt-btn" onclick="window.adoptEvidence(\${i})">💡 このビコーズで決定</button>
                      <button type="button" class="ai-append-btn" onclick="window.appendEvidence(\${i})">＋ 追加・連結</button>
                    </div>
                  </div>
                \`).join("")}
              </div>

              <!-- 17のテクニック一覧（アコーディオン/参照） -->
              <details style="margin-top:14px; background:#ffffff; border:1px solid var(--line); border-radius:8px; padding:10px 14px;">
                <summary style="font-size:0.82rem; font-weight:700; color:var(--ink-soft); cursor:pointer;">
                  📚 書籍公式『ビコーズを創り出す17のテクニック』一覧を見る
                </summary>
                <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:10px; margin-top:10px;">
                  \${SEVENTEEN_TECHNIQUES.map(t => \`
                    <div style="font-size:0.75rem; border-left:3px solid \${t.category === 'systematic' ? '#0284c7' : (t.category === 'perceived' ? '#d97706' : '#16a34a')}; padding-left:8px;">
                      <strong>\${t.num}. \${escapeHtml(t.name)}</strong>
                      <span style="color:var(--muted); display:block;">\${escapeHtml(t.summary)}</span>
                    </div>
                  \`).join("")}
                </div>
              </details>
            </div>
          \`;
        }

        // ステップ6：ビコーズ・フレームワーク後半3つのアクション
        else if (stepNum === 5) {
          const actSug = getAISuggestions(5);
          contentHtml = \`
            <div class="question-header">
              <span class="question-stage-tag">\${escapeHtml(currentStage.tag)}</span>
              <h2 class="question-title">\${escapeHtml(currentStage.title)}</h2>
              <p class="question-desc">\${escapeHtml(currentStage.desc)}</p>
            </div>

            <p style="font-size:0.85rem; color:var(--ink-soft); margin:-6px 0 16px;">
              選ばれる理由は、広告のキャッチコピーだけでは終わりません。<strong>イノベーションで根拠を強化し、Web/AI検索へ一貫展開し、全接点で実行する</strong>ことで競合に絶対に負けないブランドが完成します。
            </p>

            <!-- アクション1：イノベーション -->
            <div class="action-step-card">
              <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:8px;">
                <div>
                  <span class="action-step-badge innovation">STEP 5: アクション①</span>
                  <h4 style="margin:4px 0 2px; font-size:0.95rem; font-weight:800;">イノベーションを起こす</h4>
                  <p style="margin:0; font-size:0.78rem; color:var(--muted);">強力なビコーズが不足している場合やさらに差別化するため、新保証・独自工程・付加価値を新開発する。</p>
                </div>
                <button type="button" class="ai-adopt-btn" style="white-space:nowrap; padding:4px 10px;" onclick="window.adoptAction('innovationAction')">💡 AI提案を採用</button>
              </div>
              <textarea id="innovationActionInput" class="form-textarea" placeholder="例：『ペット体調不良時の当日キャンセル無料保証』と『愛猫専用の無添加会席料理』を新設し、競合が真似できない新ビコーズを創出する。">\${escapeHtml(state.answers.innovationAction || actSug.innovation)}</textarea>
            </div>

            <!-- アクション2：プラットフォーム構築 -->
            <div class="action-step-card">
              <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:8px;">
                <div>
                  <span class="action-step-badge platform">STEP 6: アクション②</span>
                  <h4 style="margin:4px 0 2px; font-size:0.95rem; font-weight:800;">ビコーズ・プラットフォームを構築する</h4>
                  <p style="margin:0; font-size:0.78rem; color:var(--muted);">インフルエンスステートメントを軸に、公式HP・LP・AI検索（一次情報・FAQ）・営業資料へ体系展開する。</p>
                </div>
                <button type="button" class="ai-adopt-btn" style="white-space:nowrap; padding:4px 10px;" onclick="window.adoptAction('platformAction')">💡 AI提案を採用</button>
              </div>
              <textarea id="platformActionInput" class="form-textarea" placeholder="例：HPファーストビューに選ばれる理由を掲げ、ChatGPTやPerplexityに参照される公式FAQページを設置する。">\${escapeHtml(state.answers.platformAction || actSug.platform)}</textarea>
            </div>

            <!-- アクション3：全接点で実行 -->
            <div class="action-step-card">
              <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:8px;">
                <div>
                  <span class="action-step-badge touchpoint">STEP 7: アクション③</span>
                  <h4 style="margin:4px 0 2px; font-size:0.95rem; font-weight:800;">あらゆる顧客接点で取り組みを実行する</h4>
                  <p style="margin:0; font-size:0.78rem; color:var(--muted);">現場スタッフへの権限委譲、接客トーク、販売後フォロー、クチコミ収集でビコーズを証明し続ける。</p>
                </div>
                <button type="button" class="ai-adopt-btn" style="white-space:nowrap; padding:4px 10px;" onclick="window.adoptAction('touchpointAction')">💡 AI提案を採用</button>
              </div>
              <textarea id="touchpointActionInput" class="form-textarea" placeholder="例：チェックイン時の声かけをマニュアル化し、宿泊後3日目に記念写真カードを送付して感動の口コミを回収する。">\${escapeHtml(state.answers.touchpointAction || actSug.touchpoint)}</textarea>
            </div>
          \`;
        }

        // 下部ナビゲーションバー（前へ・次へ）
        const navBarHtml = \`
          <div class="step-actions">
            <button type="button" class="nav-btn prev" \${stepNum === 0 ? "disabled style='opacity:0.4; cursor:not-allowed;'" : ""} onclick="window.goToStep(\${stepNum - 1})">
              ← 前のステップへ
            </button>
            <div style="font-size:0.85rem; font-weight:700; color:var(--muted);">
              ステップ \${stepNum + 1} / \${STAGES.length}
            </div>
            \${stepNum < STAGES.length - 1 ? \`
              <button type="button" class="nav-btn next" onclick="window.goToStep(\${stepNum + 1})">
                次のステップへ →
              </button>
            \` : \`
              <button type="button" class="nav-btn next" style="background:var(--success); border-color:var(--success);" onclick="window.finishAndCopy()">
                🎉 選ばれる理由をコピーする
              </button>
            \`}
          </div>
        \`;

        container.innerHTML = contentHtml + navBarHtml;

        // イベントリスナーの再紐付け
        bindFormEvents();
      }

      // フォームイベントのバインド
      function bindFormEvents() {
        const stepNum = state.currentStep;

        if (stepNum === 0) {
          const indSelect = document.getElementById("industrySelect");
          const compInput = document.getElementById("companyNameInput");
          const bizInput = document.getElementById("businessInput");
          const fetchBtn = document.getElementById("fetchUrlBtn");

          if (indSelect) indSelect.addEventListener("change", (e) => {
            state.answers.industryFamily = e.target.value;
            saveState();
            renderStrategyBoard();
          });
          if (compInput) compInput.addEventListener("input", (e) => {
            state.answers.companyName = e.target.value;
            saveState();
            renderStrategyBoard();
          });
          if (bizInput) bizInput.addEventListener("input", (e) => {
            state.answers.business = e.target.value;
            saveState();
            renderStrategyBoard();
          });
          if (fetchBtn) fetchBtn.addEventListener("click", executeUrlFetch);
        } else if (stepNum === 1) {
          const fric = document.getElementById("frictionInput");
          const desi = document.getElementById("desiredInput");
          if (fric) fric.addEventListener("input", (e) => {
            state.answers.friction = e.target.value;
            saveState();
            renderStrategyBoard();
          });
          if (desi) desi.addEventListener("input", (e) => {
            state.answers.desired = e.target.value;
            saveState();
            renderStrategyBoard();
          });
        } else if (stepNum === 2) {
          const tgt = document.getElementById("targetInput");
          if (tgt) tgt.addEventListener("input", (e) => {
            state.answers.target = e.target.value;
            saveState();
            renderStrategyBoard();
          });
        } else if (stepNum === 3) {
          const out = document.getElementById("outcomeInput");
          if (out) out.addEventListener("input", (e) => {
            state.answers.outcome = e.target.value;
            saveState();
            renderStrategyBoard();
          });
        } else if (stepNum === 4) {
          const ev = document.getElementById("evidenceInput");
          if (ev) ev.addEventListener("input", (e) => {
            state.answers.evidence = e.target.value;
            saveState();
            renderStrategyBoard();
          });
        } else if (stepNum === 5) {
          const inn = document.getElementById("innovationActionInput");
          const pla = document.getElementById("platformActionInput");
          const tpa = document.getElementById("touchpointActionInput");
          if (inn) inn.addEventListener("input", (e) => {
            state.answers.innovationAction = e.target.value;
            saveState();
            renderStrategyBoard();
          });
          if (pla) pla.addEventListener("input", (e) => {
            state.answers.platformAction = e.target.value;
            saveState();
            renderStrategyBoard();
          });
          if (tpa) tpa.addEventListener("input", (e) => {
            state.answers.touchpointAction = e.target.value;
            saveState();
            renderStrategyBoard();
          });
        }

        // 音声入力ボタンのバインド
        document.querySelectorAll(".voice-btn").forEach(btn => {
          btn.addEventListener("click", () => {
            const targetId = btn.getAttribute("data-target");
            toggleVoiceInput(targetId, btn);
          });
        });
      }

      // 右カラム：戦略ボードのリアルタイム更新
      function renderStrategyBoard() {
        const ind = state.answers.industryFamily || "業種";
        const cName = state.answers.companyName || "【会社名】";
        const target = state.answers.target || "【本命のお客様】";
        const outcome = state.answers.outcome || "【約束できる最高の成果】";
        const evidence = state.answers.evidence || "【顧客の信頼に足るビコーズ（根拠）】";

        // ① インフルエンスステートメントの生成
        const statementHtml = \`
          【<strong>\${escapeHtml(ind)}</strong>】の<strong>\${escapeHtml(cName)}</strong>は、<br>
          <strong>\${escapeHtml(target)}</strong>に、<br>
          <strong>\${escapeHtml(outcome)}</strong>を提供します。<br>
          なぜなら、<strong>\${escapeHtml(evidence)}</strong>だからです。
        \`;
        const infEl = document.getElementById("influenceText");
        if (infEl) infEl.innerHTML = statementHtml;

        // ② ビコーズ・マトリクス
        const mTgt = document.getElementById("matrixTarget");
        const mOut = document.getElementById("matrixOutcome");
        const mEv = document.getElementById("matrixEvidence");
        if (mTgt) mTgt.textContent = state.answers.target || "（ステップ3で入力）";
        if (mOut) mOut.textContent = state.answers.outcome || "（ステップ4で入力）";
        if (mEv) mEv.textContent = state.answers.evidence || "（ステップ5で入力）";

        // ③ 後半3つのアクション
        const sInn = document.getElementById("summaryInnovation");
        const sPla = document.getElementById("summaryPlatform");
        const sTou = document.getElementById("summaryTouchpoint");
        if (sInn) sInn.textContent = state.answers.innovationAction ? (state.answers.innovationAction.substring(0, 48) + "…") : "未設定";
        if (sPla) sPla.textContent = state.answers.platformAction ? (state.answers.platformAction.substring(0, 48) + "…") : "未設定";
        if (sTou) sTou.textContent = state.answers.touchpointAction ? (state.answers.touchpointAction.substring(0, 48) + "…") : "未設定";
      }

      // ==========================================
      // URL自動解析機能（Netlify Functions + Jina API）
      // ==========================================
      async function executeUrlFetch() {
        const urlInput = document.getElementById("websiteUrlInput");
        const statusMsg = document.getElementById("urlStatusMsg");
        const fetchBtn = document.getElementById("fetchUrlBtn");
        const btnLabel = document.getElementById("fetchBtnLabel");

        if (!urlInput || !statusMsg) return;

        let rawUrl = urlInput.value.trim();
        if (!rawUrl) {
          statusMsg.className = "url-status-msg error";
          statusMsg.textContent = "ホームページのURLを入力してください（例：https://example.com）";
          return;
        }

        if (!rawUrl.startsWith("http://") && !rawUrl.startsWith("https://")) {
          rawUrl = "https://" + rawUrl;
          urlInput.value = rawUrl;
        }

        state.answers.companyWebsiteUrl = rawUrl;
        saveState();

        fetchBtn.disabled = true;
        btnLabel.textContent = "解析中…";
        statusMsg.className = "url-status-msg info";
        statusMsg.textContent = "ホームページにアクセスして事業内容を解析・要約しています…";

        try {
          let extractedData = null;

          // 1. Netlify Functions 試行
          if (window.location.protocol.startsWith("http")) {
            try {
              const controller = new AbortController();
              const tid = setTimeout(() => controller.abort(), 7500);
              const res = await fetch(\`/.netlify/functions/import-website?url=\${encodeURIComponent(rawUrl)}\`, {
                signal: controller.signal
              });
              clearTimeout(tid);
              if (res.ok) {
                const payload = await res.json();
                if (payload && payload.page && payload.page.businessDraft) {
                  extractedData = payload.page;
                }
              }
            } catch (_) {}
          }

          // 2. Jina Reader API フォールバック
          if (!extractedData) {
            const controller = new AbortController();
            const tid = setTimeout(() => controller.abort(), 9000);
            const jinaRes = await fetch(\`https://r.jina.ai/\${rawUrl}\`, {
              signal: controller.signal,
              headers: { Accept: "application/json" }
            });
            clearTimeout(tid);
            if (jinaRes.ok) {
              const jinaData = await jinaRes.json().catch(() => null);
              if (jinaData && jinaData.data) {
                const title = jinaData.data.title || "";
                const content = jinaData.data.content || "";
                const cleanContent = content.replace(/\\n+/g, " ").substring(0, 320);
                extractedData = {
                  title: title,
                  businessDraft: cleanContent
                };
              }
            }
          }

          if (extractedData) {
            // 会社名と事業概要の反映
            if (extractedData.title) {
              const cleanTitle = extractedData.title.split(/[-|_|｜|【|\[]/)[0].trim();
              if (cleanTitle) {
                state.answers.companyName = cleanTitle;
                const compInput = document.getElementById("companyNameInput");
                if (compInput) compInput.value = cleanTitle;
              }
            }

            if (extractedData.businessDraft) {
              state.answers.business = extractedData.businessDraft;
              const bizInput = document.getElementById("businessInput");
              if (bizInput) bizInput.value = extractedData.businessDraft;
            }

            // 業種自動判定
            const fullTxt = (extractedData.title || "") + " " + (extractedData.businessDraft || "");
            if (fullTxt.includes("温泉") || fullTxt.includes("旅館") || fullTxt.includes("ホテル")) {
              state.answers.industryFamily = "宿泊・観光・温泉旅館";
            } else if (fullTxt.includes("IT") || fullTxt.includes("システム") || fullTxt.includes("ソフト") || fullTxt.includes("コンサル")) {
              state.answers.industryFamily = "BtoB・IT・SaaS・受託開発";
            } else if (fullTxt.includes("飲食") || fullTxt.includes("レストラン") || fullTxt.includes("カフェ") || fullTxt.includes("料理")) {
              state.answers.industryFamily = "飲食・カフェ・レストラン";
            } else if (fullTxt.includes("サロン") || fullTxt.includes("エステ") || fullTxt.includes("整体") || fullTxt.includes("クリニック")) {
              state.answers.industryFamily = "美容・健康・サロン・治療院";
            }

            const indSelect = document.getElementById("industrySelect");
            if (indSelect) indSelect.value = state.answers.industryFamily;

            saveState();
            renderStrategyBoard();

            statusMsg.className = "url-status-msg success";
            statusMsg.innerHTML = "✅ ホームページの解析が完了しました！業種・会社名・事業内容を自動反映しました。";
            showToast("🌐 ホームページ情報を反映しました！");
          } else {
            throw new Error("十分なテキスト情報を取得できませんでした。");
          }
        } catch (err) {
          statusMsg.className = "url-status-msg error";
          statusMsg.textContent = "自動解析が一時的に利用できませんでした。下の欄に直接ご記入いただけます。";
        } finally {
          fetchBtn.disabled = false;
          btnLabel.textContent = "自動解析して反映";
        }
      }

      // ==========================================
      // 音声入力（Web Speech API）
      // ==========================================
      function toggleVoiceInput(targetId, btn) {
        const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRec) {
          alert("お使いのブラウザは音声入力に対応していません。Google ChromeまたはEdgeをお使いください。");
          return;
        }

        if (isRecording) {
          if (recognition) recognition.stop();
          isRecording = false;
          btn.classList.remove("recording");
          btn.textContent = "🎙 話して入力";
          return;
        }

        recognition = new SpeechRec();
        recognition.lang = "ja-JP";
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => {
          isRecording = true;
          btn.classList.add("recording");
          btn.textContent = "🔴 録音中（クリックで停止）";
          showToast("🎙 お話しください…");
        };

        recognition.onresult = (e) => {
          const transcript = e.results[0][0].transcript;
          const targetInput = document.getElementById(targetId);
          if (targetInput) {
            const current = targetInput.value.trim();
            targetInput.value = current ? current + " " + transcript : transcript;
            targetInput.dispatchEvent(new Event("input"));
          }
          showToast("文字起こしを反映しました！");
        };

        recognition.onerror = () => {
          isRecording = false;
          btn.classList.remove("recording");
          btn.textContent = "🎙 話して入力";
        };

        recognition.onend = () => {
          isRecording = false;
          btn.classList.remove("recording");
          btn.textContent = "🎙 話して入力";
        };

        recognition.start();
      }

      // ==========================================
      // グローバル操作関数（HTMLからonclickで呼ぶ）
      // ==========================================
      window.goToStep = (idx) => {
        if (idx < 0 || idx >= STAGES.length) return;
        state.currentStep = idx;
        saveState();
        renderHeroSteps();
        renderStepNavList();
        renderQuestionPanel();
        window.scrollTo({ top: 320, behavior: "smooth" });
      };

      window.refreshSuggestions = () => {
        renderQuestionPanel();
        showToast("🔄 AIの提案を更新しました！");
      };

      // 洞察の採用
      window.adoptInsight = (idx) => {
        const sug = getAISuggestions(1)[idx];
        if (sug) {
          state.answers.friction = sug.friction;
          state.answers.desired = sug.desired;
          saveState();
          renderQuestionPanel();
          renderStrategyBoard();
          showToast("💡 顧客の洞察を採用しました！");
        }
      };

      // ターゲットの採用
      window.adoptTarget = (idx) => {
        const sug = getAISuggestions(2)[idx];
        if (sug) {
          state.answers.target = sug.target;
          saveState();
          renderQuestionPanel();
          renderStrategyBoard();
          showToast("🎯 理想の顧客を採用しました！");
        }
      };

      // 成果の採用
      window.adoptOutcome = (idx) => {
        const sug = getAISuggestions(3)[idx];
        if (sug) {
          state.answers.outcome = sug.outcome;
          saveState();
          renderQuestionPanel();
          renderStrategyBoard();
          showToast("🎁 約束できる成果を採用しました！");
        }
      };

      // ビコーズの採用（上書き）
      window.adoptEvidence = (idx) => {
        const sug = getAISuggestions(4)[idx];
        if (sug) {
          state.answers.evidence = sug.evidence;
          saveState();
          renderQuestionPanel();
          renderStrategyBoard();
          showToast("🛡️ ビコーズを採用しました！");
        }
      };

      // ビコーズの追加（連結）
      window.appendEvidence = (idx) => {
        const sug = getAISuggestions(4)[idx];
        if (sug) {
          const current = (state.answers.evidence || "").trim();
          if (current) {
            state.answers.evidence = current + " また、" + sug.evidence;
          } else {
            state.answers.evidence = sug.evidence;
          }
          saveState();
          renderQuestionPanel();
          renderStrategyBoard();
          showToast("＋ ビコーズを追加連結しました！");
        }
      };

      // アクションの採用
      window.adoptAction = (fieldKey) => {
        const sug = getAISuggestions(5);
        if (fieldKey === "innovationAction") state.answers.innovationAction = sug.innovation;
        if (fieldKey === "platformAction") state.answers.platformAction = sug.platform;
        if (fieldKey === "touchpointAction") state.answers.touchpointAction = sug.touchpoint;
        saveState();
        renderQuestionPanel();
        renderStrategyBoard();
        showToast("🚀 AIのアクション提案を採用しました！");
      };

      // 完了＆コピー
      window.finishAndCopy = () => {
        copyInfluenceStatement();
      };

      // ==========================================
      // コピー機能＆プロンプト生成
      // ==========================================
      function copyInfluenceStatement() {
        const ind = state.answers.industryFamily || "業種";
        const cName = state.answers.companyName || "当社";
        const target = state.answers.target || "理想的な顧客";
        const outcome = state.answers.outcome || "約束できる成果";
        const evidence = state.answers.evidence || "信頼に足るビコーズ";

        const text = \`【\${ind}】の\${cName}は、\${target}に、\${outcome}を提供します。なぜなら、\${evidence}だからです。\`;
        navigator.clipboard.writeText(text).then(() => {
          showToast("📋 インフルエンスステートメントをコピーしました！");
        });
      }

      function copyMatrixMarkdown() {
        const ind = state.answers.industryFamily || "業種";
        const cName = state.answers.companyName || "当社";
        const target = state.answers.target || "未入力";
        const outcome = state.answers.outcome || "未入力";
        const evidence = state.answers.evidence || "未入力";
        const friction = state.answers.friction || "未入力";
        const desired = state.answers.desired || "未入力";

        const md = \`# ビコーズ・マトリクス（\${cName}）

| 項目 | 内容 |
|---|---|
| **事業・業種** | \${ind}（\${cName}） |
| **顧客の悩み（摩擦）** | \${friction} |
| **顧客の望む状態** | \${desired} |
| **① 理想的な顧客（誰に）** | \${target} |
| **② 約束できる成果（何を）** | \${outcome} |
| **③ 信頼に足るビコーズ（なぜなら）** | \${evidence} |

## 後半3つのアクション
1. **イノベーション創出**: \${state.answers.innovationAction || "未設定"}
2. **プラットフォーム構築**: \${state.answers.platformAction || "未設定"}
3. **全接点での実行**: \${state.answers.touchpointAction || "未設定"}
\`;
        navigator.clipboard.writeText(md).then(() => {
          showToast("📋 マトリクスMarkdownをコピーしました！");
        });
      }

      function copyHandoffPrompt() {
        const ind = state.answers.industryFamily || "業種";
        const cName = state.answers.companyName || "当社";
        const target = state.answers.target || "理想的な顧客";
        const outcome = state.answers.outcome || "約束できる成果";
        const evidence = state.answers.evidence || "信頼に足るビコーズ";

        const prompt = \`あなたは一流のマーケティングディレクター兼コピーライターです。
書籍『顧客を買う気にさせる ビコーズ・フレームワーク』に基づき策定した当社の「選ばれる理由」情報をもとに、顧客がどうしても欲しくなるLP（ランディングページ）の構成案とキャッチコピー、およびAI検索（Perplexity/ChatGPT等）に引用されるための公式FAQ（質問と回答）を作成してください。

【当社の選ばれる理由（インフルエンスステートメント）】
業種・企業名：【\${ind}】\${cName}
理想の顧客（ターゲット）：\${target}
約束できる成果：\${outcome}
なぜなら（ビコーズ・17のテクニック根拠）：\${evidence}

【後半3つのアクション計画】
1. イノベーション創出：\${state.answers.innovationAction || "特になし"}
2. ビコーズ・プラットフォーム展開：\${state.answers.platformAction || "特になし"}
3. 全接点での実行：\${state.answers.touchpointAction || "特になし"}

【作成依頼】
1. LPのファーストビュー見出し（メインコピー＋サブコピー）
2. 顧客の共感を呼ぶペインとゲインのストーリー導入文
3. なぜ提供できるのかを証明する「3大ビコーズ（根拠）」の詳細セクション
4. AI検索エンジンに一次情報として引用される「公式FAQ（5問）」
\`;
        navigator.clipboard.writeText(prompt).then(() => {
          showToast("📋 AI用プロンプトをコピーしました！");
        });
      }

      function copyBrief() {
        const ind = state.answers.industryFamily || "業種";
        const cName = state.answers.companyName || "当社";
        const brief = \`# 戦略ブリーフ：選ばれる理由（ビコーズ・フレームワーク）
企業・ブランド名: \${cName}
業種: \${ind}
公式URL: \${state.answers.companyWebsiteUrl || "未登録"}

## 1. ビコーズ公式宣言文（インフルエンスステートメント）
【\${ind}】の\${cName}は、\${state.answers.target || "（顧客）"}に、\${state.answers.outcome || "（成果）"}を提供します。なぜなら、\${state.answers.evidence || "（根拠）"}だからです。

## 2. 顧客についての洞察
- 避けたい不安・摩擦（ペイン）: \${state.answers.friction || "未入力"}
- 本当に得たい理想状態（ゲイン）: \${state.answers.desired || "未入力"}

## 3. 理想的な顧客
\${state.answers.target || "未入力"}

## 4. 約束できる成果
\${state.answers.outcome || "未入力"}

## 5. 顧客の信頼に足るビコーズ（17のテクニック根拠）
\${state.answers.evidence || "未入力"}

## 6. 後半3つのアクション
- アクション① イノベーション創出: \${state.answers.innovationAction || "未設定"}
- アクション② ビコーズ・プラットフォーム構築: \${state.answers.platformAction || "未設定"}
- アクション③ 全接点での実行: \${state.answers.touchpointAction || "未設定"}
\`;
        navigator.clipboard.writeText(brief).then(() => {
          showToast("📄 戦略ブリーフをコピーしました！");
        });
      }

      // ==========================================
      // サンプルデータ適用
      // ==========================================
      function applyRyokanSample() {
        state.answers = {
          industryFamily: "宿泊・観光・温泉旅館",
          companyWebsiteUrl: "https://example-ryokan.co.jp",
          companyName: "月見の湯 翠水亭",
          business: "静かな自然に囲まれた山あいに佇む、全室ペット同伴対応の客室と、100%源泉かけ流し天然温泉、地元の旬の素材を活かした個室会席料理を提供する小さな温泉宿。",
          friction: "ペット可の宿と書いてあっても、実際はケージ必須や他のお客さんの冷たい視線が気になり、結局心からくつろげない。",
          desired: "誰にも気兼ねせず、愛するペットと同じ部屋で本物の源泉かけ流し温泉と美味しい料理を心ゆくまで堪能したい。",
          target: "他の宿泊客に気をつかわず、愛猫・愛犬と一緒に本物の源泉かけ流し温泉と美味しい個室料理を堪能したいご夫婦・パートナー",
          outcome: "他のお客様に一切気をつかうことなく、愛猫・愛犬と一緒に本物の源泉かけ流し温泉と旬の個室料理を心から堪能し、最高の癒やしと一生の思い出を持ち帰ることができる。",
          evidence: "全客室が完全防音・滑りにくい特殊床材を採用したペット専用設計で、お食事も完全お部屋食のため他のお客様と接触がなく、加水加温一切なしの100%源泉かけ流し天然温泉を完備しているから。",
          innovationAction: "『ペット体調不良時の当日キャンセル無料保証』と『愛猫専用の無添加会席料理』を新設し、競合が真似できない新ビコーズを創出する。",
          platformAction: "公式サイトのトップに選ばれる理由を明記し、AI検索（Perplexity/ChatGPT等）で『猫と泊まれる源泉かけ流し温泉』の一次情報として抽出される専用FAQページを公開する。",
          touchpointAction: "チェックイン時にウェルカムペットおやつを手渡し、配膳時はペットが驚かない丁寧な声かけを徹底。宿泊後3日目に記念写真カードを送付して感動の口コミを回収する。"
        };
        saveState();
        renderHeroSteps();
        renderStepNavList();
        renderQuestionPanel();
        renderStrategyBoard();
        showToast("♨️ 旅館サンプルデータを読み込みました！");
      }

      function applyBtobSample() {
        state.answers = {
          industryFamily: "BtoB・IT・SaaS・受託開発",
          companyWebsiteUrl: "https://growth-workflow.sample.jp",
          companyName: "株式会社グロースワークス",
          business: "中小企業のバックオフィス業務・受発注管理を自動化し、専任コンサルタントが定着まで伴走するクラウド業務DX支援サービス。",
          friction: "高いツールを導入しても現場が使いこなせず形骸化し、費用倒れになって社内説明がつかない不安がある。",
          desired: "現場スタッフが迷わず自発的に使いこなし、最短3ヶ月で明確な業務効率化の成果を数字で示したい。",
          target: "業務の属人化を解消し、現場が自発的に使いこなすまで専任で伴走サポートしてほしい中小企業の経営者・事業責任者",
          outcome: "無駄な手入力や確認作業を70%削減し、現場スタッフが迷わず自発的に使いこなせる業務体制を最短3ヶ月で確立できる。",
          evidence: "過去500社以上の支援データから体系化した『5段階定着ロードマップ』により専任コンサルタントが週1回伴走し、90日以内に定着しなければ全額返金する安心保証があるから。",
          innovationAction: "他社にない『90日間成果未達成時の全額返金保証』と『社内定着率95%保証パック』を正式リリースし、顧客の意思決定リスクを極限まで下げる。",
          platformAction: "インフルエンスステートメントを導入事例集やサービスLPのファーストビューに配置し、AI検索や比較サイトに引用される『業務効率化ロードマップ』を公開する。",
          touchpointAction: "商談トークを『成果とビコーズの約束』に統一。契約後7日以内にキックオフ定例を実施し、週次レポートで削減時間を可視化して全接点で約束を果たす。"
        };
        saveState();
        renderHeroSteps();
        renderStepNavList();
        renderQuestionPanel();
        renderStrategyBoard();
        showToast("💼 BtoBサンプルデータを読み込みました！");
      }

      function resetAllData() {
        if (!confirm("すべての入力内容をリセットして最初からやり直しますか？")) return;
        state.currentStep = 0;
        state.answers = {
          industryFamily: "宿泊・観光・温泉旅館",
          companyWebsiteUrl: "",
          companyName: "",
          business: "",
          friction: "",
          desired: "",
          target: "",
          outcome: "",
          evidence: "",
          innovationAction: "",
          platformAction: "",
          touchpointAction: ""
        };
        saveState();
        renderHeroSteps();
        renderStepNavList();
        renderQuestionPanel();
        renderStrategyBoard();
        showToast("🗑 すべての回答をリセットしました");
      }

      // ==========================================
      // 初期化実行
      // ==========================================
      function init() {
        loadState();

        // ボタンイベント
        document.getElementById("sampleRyokanBtn")?.addEventListener("click", applyRyokanSample);
        document.getElementById("sampleBtobBtn")?.addEventListener("click", applyBtobSample);
        document.getElementById("resetAllBtn")?.addEventListener("click", resetAllData);
        document.getElementById("copyInfluenceBtn")?.addEventListener("click", copyInfluenceStatement);
        document.getElementById("copyMatrixBtn")?.addEventListener("click", copyMatrixMarkdown);
        document.getElementById("copyPromptBtn")?.addEventListener("click", copyHandoffPrompt);
        document.getElementById("copyBriefBtn")?.addEventListener("click", copyBrief);

        renderHeroSteps();
        renderStepNavList();
        renderQuestionPanel();
        renderStrategyBoard();
      }

      window.addEventListener("DOMContentLoaded", init);
    })();
  </script>
</body>
</html>
`;

fs.writeFileSync('dist/index.html', htmlContent, 'utf8');
console.log('Successfully generated dist/index.html with length:', htmlContent.length);

