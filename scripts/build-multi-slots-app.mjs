import fs from 'node:fs';

const htmlContent = `<!doctype html>
<html lang="ja">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="description" content="AIに正確に理解され、人にも選ばれるための戦略AI。ビコーズ・フレームワーク公式ロジックに基づき、複数の切り口から5つのビコーズを導き出し、優先順位をつけて選ばれる理由を自動生成します。" />
  <meta name="theme-color" content="#0b1528" />
  <title>選ばれる理由AI | 5つの切り口＆ビコーズ・フレームワーク</title>
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
      background: rgba(255, 255, 255, 0.94);
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
      font-size: 1.22rem;
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
      padding: 34px 24px 30px;
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
      font-size: 1.8rem;
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
      font-size: 0.96rem;
      color: #cbd5e1;
      margin: 0 auto 20px;
      max-width: 760px;
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
    @media (max-width: 880px) {
      .hero-flow-steps { grid-template-columns: repeat(3, 1fr); gap: 6px; }
    }
    @media (max-width: 520px) {
      .hero-flow-steps { grid-template-columns: repeat(2, 1fr); }
    }
    .hero-step-pill {
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 10px;
      padding: 10px;
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
      grid-template-columns: 250px 1fr 400px;
      gap: 20px;
      max-width: 1600px;
      width: 100%;
      margin: 20px auto;
      padding: 0 20px 40px;
      flex: 1;
    }
    @media (max-width: 1280px) {
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

    /* 切り口（スロット）タブバー */
    .slot-tabs-bar {
      display: flex;
      gap: 6px;
      background: var(--surface-alt);
      border: 1px solid var(--line);
      border-radius: 10px;
      padding: 6px;
      overflow-x: auto;
    }
    .slot-tab-btn {
      flex: 1;
      min-width: 140px;
      padding: 8px 12px;
      border-radius: 8px;
      border: 1px solid transparent;
      background: transparent;
      text-align: left;
      font-size: 0.8rem;
      color: var(--muted);
      transition: all .2s;
      cursor: pointer;
    }
    .slot-tab-btn:hover {
      background: #ffffff;
      color: var(--ink);
    }
    .slot-tab-btn.active {
      background: #ffffff;
      border-color: var(--teal);
      color: var(--teal-dark);
      font-weight: 700;
      box-shadow: var(--shadow-sm);
    }
    .slot-tab-badge {
      font-size: 0.68rem;
      font-weight: 800;
      padding: 2px 6px;
      border-radius: 4px;
      display: inline-block;
      margin-bottom: 2px;
    }
    .slot-tab-badge.p1 { background: #fef3c7; color: #b45309; }
    .slot-tab-badge.sub { background: #e0f2fe; color: #0369a1; }

    /* 5つの切り口カード（ステップ2専用） */
    .cut-cards-container {
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .cut-card {
      background: #ffffff;
      border: 2px solid var(--line);
      border-radius: var(--radius);
      padding: 18px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      transition: all .2s;
      position: relative;
    }
    .cut-card.is-priority1 {
      border-color: var(--amber);
      background: linear-gradient(180deg, #fffbeb, #ffffff);
      box-shadow: 0 4px 14px rgba(217, 119, 6, .12);
    }
    .cut-card.is-active {
      border-color: var(--teal);
    }
    .cut-card-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 8px;
    }
    .cut-card-title-row {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .cut-priority-badge {
      font-size: 0.72rem;
      font-weight: 800;
      padding: 3px 8px;
      border-radius: 6px;
    }
    .cut-priority-badge.p1 {
      background: #d97706;
      color: #ffffff;
    }
    .cut-priority-badge.sub {
      background: var(--sky-soft);
      color: var(--sky);
    }
    .cut-card-title {
      font-size: 1rem;
      font-weight: 800;
      color: var(--ink);
      margin: 0;
    }
    .cut-market-role {
      font-size: 0.75rem;
      color: var(--muted);
      background: var(--surface-alt);
      border: 1px solid var(--line);
      padding: 3px 8px;
      border-radius: 6px;
    }
    .cut-body-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      background: var(--surface-alt);
      border-radius: 8px;
      padding: 12px;
    }
    @media (max-width: 680px) {
      .cut-body-grid { grid-template-columns: 1fr; }
    }
    .cut-block-label {
      font-size: 0.75rem;
      font-weight: 700;
      color: var(--muted);
      display: block;
      margin-bottom: 4px;
    }
    .cut-block-text {
      font-size: 0.85rem;
      color: var(--ink);
      margin: 0;
      line-height: 1.5;
    }
    .cut-card-actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid var(--line-subtle);
      padding-top: 10px;
    }
    .set-p1-btn {
      background: #fef3c7;
      border: 1px solid #d97706;
      color: #b45309;
      font-weight: 700;
      font-size: 0.78rem;
      padding: 6px 14px;
      border-radius: 6px;
      transition: all .2s;
    }
    .set-p1-btn:hover {
      background: #d97706;
      color: #ffffff;
    }
    .set-p1-btn.active {
      background: #d97706;
      color: #ffffff;
      cursor: default;
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

    /* ★AI提案セクション */
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

    /* 17のテクニック（ステップ4専用） */
    .technique-card {
      border-left: 4px solid var(--teal);
    }
    .technique-card.systematic { border-left-color: #0284c7; }
    .technique-card.perceived { border-left-color: #d97706; }
    .technique-card.created { border-left-color: #16a34a; }

    /* 後半3つのアクション（ステップ5専用） */
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

    /* ビコーズ・マトリクス表（5スロット比較一覧） */
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
    .matrix-slot-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .matrix-slot-item {
      border: 1px solid var(--line);
      border-radius: 8px;
      padding: 10px 12px;
      font-size: 0.78rem;
      cursor: pointer;
      transition: all .2s;
    }
    .matrix-slot-item:hover {
      border-color: var(--teal);
      background: var(--teal-light);
    }
    .matrix-slot-item.is-active {
      border-color: var(--teal);
      background: #f0fdfa;
      box-shadow: 0 2px 6px rgba(13, 148, 136, .1);
    }
    .matrix-slot-item.is-p1 {
      border-left: 4px solid var(--amber);
    }
    .matrix-slot-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 4px;
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
            <span class="brand-badge">5つの切り口＆ビコーズ・フレームワーク</span>
          </h1>
        </div>
      </div>
      <div class="topbar-actions">
        <button id="sampleRyokanBtn" type="button" class="sample-btn" title="温泉旅館の5つの切り口モデルを読み込みます">♨️ 旅館サンプル</button>
        <button id="sampleBtobBtn" type="button" class="sample-btn" title="BtoBサービスの5つの切り口モデルを読み込みます">💼 BtoBサンプル</button>
        <button id="resetAllBtn" type="button" class="reset-btn" title="すべての入力をリセットします">🗑 回答リセット</button>
      </div>
    </header>

    <!-- ヒーローフローバナー（6つのステップ） -->
    <section class="hero-banner">
      <div class="hero-content">
        <div class="hero-tag">✨ URLからAIが5つの切り口を自動生成 ＆ 優先順位をつけて勝つ</div>
        <h2 class="hero-title">
          顧客ごとの洞察から<span>「5つの切り口のビコーズ」</span>を創り出し、<br>
          優先順位をつけて選ばれる理由を確立する。
        </h2>
        <p class="hero-subtitle">
          『顧客を買う気にさせる ビコーズ・フレームワーク』完全準拠。店舗・企業の強みを多角的に洗い出し、メインの看板（第1優先）からセグメント別の専用ビコーズまで一網打尽に整理します。
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
          <p>第1優先（本命）および各切り口のステートメント</p>
        </div>

        <!-- ① ビコーズ公式インフルエンスステートメント（第1優先メイン） -->
        <div class="influence-card">
          <div class="influence-header">
            <span class="influence-badge" id="influenceBadgeLabel">★ 第1優先（メイン看板）</span>
            <button id="copyInfluenceBtn" type="button" class="copy-btn">📋 コピー</button>
          </div>
          <p class="influence-text" id="influenceText">
            <!-- JSでリアルタイム生成 -->
          </p>
        </div>

        <!-- ② ビコーズ・マトリクス（5つの切り口一覧表） -->
        <div class="matrix-card">
          <h3>
            <span>📊 5つの切り口マトリクス</span>
            <button id="copyMatrixBtn" type="button" class="copy-btn" style="color:var(--ink-soft); border-color:var(--line); background:var(--surface);">📋 Markdown</button>
          </h3>
          <p style="font-size:0.75rem; color:var(--muted); margin:0 0 10px;">クリックすると右上のプレビューがその切り口に切り替わります。</p>
          <div class="matrix-slot-list" id="matrixSlotList">
            <!-- JSでリアルタイム生成 -->
          </div>
        </div>

        <!-- ③ 後半3つのアクション実行サマリー -->
        <div class="export-box">
          <h3>🚀 後半3つのアクション実行サマリー</h3>
          <div style="font-size:0.78rem; display:flex; flex-direction:column; gap:6px;">
            <div>
              <strong style="color:#b45309;">① イノベーション:</strong>
              <span id="summaryInnovation" class="text-muted">未設定</span>
            </div>
            <div>
              <strong style="color:#0369a1;">② プラットフォーム:</strong>
              <span id="summaryPlatform" class="text-muted">未設定</span>
            </div>
            <div>
              <strong style="color:#15803d;">③ 全接点実行:</strong>
              <span id="summaryTouchpoint" class="text-muted">未設定</span>
            </div>
          </div>
        </div>

        <!-- ④ AIプロンプト＆戦略ブリーフ出力 -->
        <div class="export-box">
          <h3>🤖 AI引き継ぎ＆戦略ブリーフ</h3>
          <p style="margin:0; font-size:0.76rem; color:var(--muted);">ChatGPTやClaudeに渡して、メイン看板LPやセグメント専用ページ、AI検索用FAQを作成できます。</p>
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

      const STORAGE_KEY = "because-framework-5slots-v1";

      // 6つのステップ定義
      const STAGES = [
        {
          id: "step1",
          num: "1",
          title: "業種と公式ホームページURLの入力",
          shortName: "業種・公式HP",
          tag: "STEP 1: 事業概要の特定",
          desc: "事業の業種を選択し、公式ホームページのURLを入力してください。URLから事業内容や特徴を自動解析し、5つの切り口を生成します。",
          icon: "🏢"
        },
        {
          id: "step2",
          num: "2",
          title: "5つの切り口（洞察 × 理想顧客）と優先順位",
          shortName: "5つの切り口",
          tag: "STEP 2: 洞察と顧客の切り口選定",
          desc: "顧客の悩み（洞察）によって『誰』が変わります。AIが提示した5つの切り口から、自社の本命（第1優先）を選定し、サブ展開の優先順位をつけます。",
          icon: "🎯"
        },
        {
          id: "step3",
          num: "3",
          title: "顧客に対して約束できる成果は？",
          shortName: "約束できる成果",
          tag: "STEP 3: 約束できる成果（書籍 STEP 3）",
          desc: "選んだ切り口ごとに、顧客が手に入れる具体的な変化・嬉しい結果・ベネフィットを言語化します。AIも成果を考えて提案します。",
          icon: "🎁"
        },
        {
          id: "step4",
          num: "4",
          title: "顧客の信頼に足るビコーズは？",
          shortName: "信頼に足るビコーズ",
          tag: "STEP 4: 17のテクニック（書籍 STEP 4）",
          desc: "なぜその成果を提供できるのか？17のテクニック（体系的・知覚・生み出された根拠）から各切り口に最適なビコーズをAIが提案します。",
          icon: "🛡️"
        },
        {
          id: "step5",
          num: "5",
          title: "ビコーズ・フレームワーク（後半）３つのアクション",
          shortName: "後半3つのアクション",
          tag: "STEP 5: 後半3つのアクション（書籍 STEP 5, 6, 7）",
          desc: "『イノベーション創出』『ビコーズ・プラットフォーム構築』『あらゆる顧客接点で実行』の3つのアクションからAIがビコーズを創出します。",
          icon: "🚀"
        },
        {
          id: "step6",
          num: "6",
          title: "ビコーズ・マトリクス完成＆マーケティング展開計画",
          shortName: "マトリクス完成",
          tag: "STEP 6: 戦略統合と優先順位マーケティング",
          desc: "5つの切り口のビコーズを一枚のマトリクスに統合。看板（第1優先）から専用LP・AI検索（Perplexity/ChatGPT等）までの展開プランが完成します。",
          icon: "📊"
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
        // 体系的な根拠
        { id: "tech_process", category: "systematic", categoryName: "体系的な根拠", num: 1, name: "独自のプロセス、システム、方法論", summary: "再現性のある独自の工程・診断フロー・ステップ管理によりブレずに成果を出す仕組み。" },
        { id: "tech_tech", category: "systematic", categoryName: "体系的な根拠", num: 2, name: "独自の技術", summary: "他社が真似できない高度な専門技術、特許技術、特殊設備、独自ノウハウ。" },
        { id: "tech_materials", category: "systematic", categoryName: "体系的な根拠", num: 3, name: "独自の配合、材料、素材", summary: "厳選された天然素材、独自の調合比率、契約農家直送などの希少素材。" },
        { id: "tech_cert", category: "systematic", categoryName: "体系的な根拠", num: 4, name: "品質証明、試験プロセス、認証", summary: "第三者機関による実証実験、ISO等の認証取得、厳しい品質基準のクリア。" },
        // 知覚される根拠
        { id: "tech_heritage", category: "perceived", categoryName: "知覚される根拠", num: 5, name: "ヘリテージ（伝統・歴史・実績）", summary: "創業年数、受け継がれた歴史、累計実績数、長年の地域での信頼。" },
        { id: "tech_philosophy", category: "perceived", categoryName: "知覚される根拠", num: 6, name: "企業哲学・理念", summary: "創業者の強い信念、絶対に妥協しない想い、顧客と社会に対する誓い。" },
        { id: "tech_craftsmanship", category: "perceived", categoryName: "知覚される根拠", num: 7, name: "クラフトマンシップ（こだわり・職人技）", summary: "熟練の職人による手仕事、細部まで妥協しない仕込みと丁寧な仕上がり。" },
        { id: "tech_social", category: "perceived", categoryName: "知覚される根拠", num: 8, name: "社会的根拠（ソーシャルプルーフ）", summary: "多数のお客様の声、口コミ高評価（星4.8以上）、メディア・TV・雑誌掲載。" },
        { id: "tech_visual", category: "perceived", categoryName: "知覚される根拠", num: 9, name: "視覚的根拠", summary: "一目でわかるビフォーアフター写真、実演動画、作業工程の完全オープン化。" },
        { id: "tech_third_party", category: "perceived", categoryName: "知覚される根拠", num: 10, name: "第三者による裏づけのある信頼性", summary: "専門家や大学教授の推薦・監修、業界アワード受賞、公的機関の表彰。" },
        // 生み出された根拠
        { id: "tech_diff", category: "created", categoryName: "生み出された根拠", num: 11, name: "商品とサービスの差別化要因", summary: "他社にはない独自スペック、専用設計、特定の悩みに特化した設計。" },
        { id: "tech_pricing", category: "created", categoryName: "生み出された根拠", num: 12, name: "価格体系", summary: "完全定額明朗会計、成果報酬型、追加費用なしの安心できる料金設計。" },
        { id: "tech_custom", category: "created", categoryName: "生み出された根拠", num: 13, name: "カスタマイズ", summary: "一人ひとりの状況に合わせた完全個別オーダーメイド・専用カルテ設計。" },
        { id: "tech_value_add", category: "created", categoryName: "生み出された根拠", num: 14, name: "付加価値", summary: "購入後1年間の無料点検、無償アフター相談、限定オリジナルガイド特典。" },
        { id: "tech_org", category: "created", categoryName: "生み出された根拠", num: 15, name: "独自の組織体制", summary: "専任担当コンシェルジュ制、即日駆けつけ体制、専門チーム連携。" },
        { id: "tech_guarantee", category: "created", categoryName: "生み出された根拠", num: 16, name: "保証", summary: "全額返金保証、無償やり直し保証、長期安心保証で顧客リスクをゼロに。" },
        { id: "tech_innovation", category: "created", categoryName: "生み出された根拠", num: 17, name: "新しいアプローチ／イノベーション", summary: "業界の常識を覆す新しい仕組み、AIやDXの活用、新提供モデル。" }
      ];

      // 業種ごとのデフォルト5つの切り口データベース
      const DEFAULT_SLOTS_DATABASE = {
        "宿泊・観光・温泉旅館": [
          {
            id: "slot_1",
            priority: 1,
            title: "ペット同伴・気兼ねゼロ軸",
            marketingRole: "公式サイトTOP・メイン看板・主力広告",
            friction: "ペット可と書いてあってもケージ必須や他のお客さんの冷たい視線が気になり、心からくつろげない。",
            desired: "誰にも気兼ねせず、愛するペットと同じ部屋で本物の源泉かけ流し温泉と美味しい料理を心ゆくまで堪能したい。",
            target: "他の宿泊客に気をつかわず、愛猫・愛犬と一緒に本物の源泉かけ流し温泉と美味しい個室料理を堪能したいご夫婦・パートナー",
            outcome: "他のお客様に一切気をつかうことなく、愛猫・愛犬と一緒に本物の源泉かけ流し温泉と旬の個室料理を心から堪能し、最高の癒やしと一生の思い出を持ち帰ることができる。",
            evidence: "全客室が完全防音・滑りにくい特殊床材を採用したペット専用設計で、お食事も完全お部屋食のため他のお客様と接触がなく、加水加温一切なしの100%源泉かけ流し天然温泉を完備しているから。"
          },
          {
            id: "slot_2",
            priority: 2,
            title: "源泉ぬる湯・本格湯治軸",
            marketingRole: "「ぬる湯・湯治」専用LP・Google検索対策",
            friction: "熱い温泉はのぼせて長く入れず、疲れが取れない。本当に効能のある名湯でじっくり体を癒やしたい。",
            desired: "体温に近いぬる湯に何時間も浸かり、日頃の慢性疲労や冷えを根本から解きほぐしたい。",
            target: "熱い湯が苦手で、本物のぬる湯にゆっくり浸かって心身の疲労や不調をじっくり癒やしたい健康志向の大人世代",
            outcome: "何時間でものぼせずに浸かれる極上のぬる湯によって、副交感神経が優位になり、翌朝驚くほど体が軽くなる深い休息を得られる。",
            evidence: "自社源泉から湧出する38度の奇跡のぬる湯をそのままかけ流し、温泉ソムリエが体質に合わせた入浴法をご案内しているから。"
          },
          {
            id: "slot_3",
            priority: 3,
            title: "静寂・完全プライベート軸",
            marketingRole: "一人旅・大人の隠れ宿専用プラン・平日稼働",
            friction: "騒がしい団体客や子どもの声でせっかくの休日を台無しにされたくない。誰にも邪魔されたくない。",
            desired: "外界の喧騒を完全に遮断し、静かな山あいで読書や仕事、瞑想に没頭する贅沢な時間を過ごしたい。",
            target: "仕事や日常のストレスから離れ、誰にも邪魔されない静寂の中で深い休息や思索に耽りたいエグゼクティブ・一人旅の方",
            outcome: "一切の騒音や他人の干渉から解放され、鳥のさえずりと川のせせらぎに包まれながら、完全な心の平穏と集中を取り戻せる。",
            evidence: "12歳未満の宿泊を制限した大人の隠れ宿で、全室離れ構造・完全プライベート露天風呂と書斎デスクを完備しているから。"
          },
          {
            id: "slot_4",
            priority: 4,
            title: "記念日・特別なハレの日軸",
            marketingRole: "誕生日・プロポーズ専用プラン・高単価ギフト",
            friction: "大切なパートナーの記念日で、料理が冷めていたり接客が雑だったら台無しになる。絶対に失敗できない。",
            desired: "一生の思い出に残るサプライズと極上の料理で、相手が感動して心から喜ぶ笑顔を見たい。",
            target: "結婚記念日やパートナーの誕生日を、最高のおもてなしと上質な個室料理で絶対に成功させたいご夫婦・カップル",
            outcome: "プロポーズや記念日の演出が完璧に決まり、パートナーから「最高の旅館を選んでくれてありがとう」と深く感謝される。",
            evidence: "専任の記念日コンシェルジュが事前に演出をフルコーディネートし、板長自らがお部屋で仕立てる特別懐石を提供するから。"
          },
          {
            id: "slot_5",
            priority: 5,
            title: "長期滞在・リフレッシュ軸",
            marketingRole: "連泊プラン・ワーケーション・オフシーズン対策",
            friction: "1泊2日では移動だけで疲れてしまい、本当にリフレッシュした感覚が得られない。",
            desired: "暮らすように連泊滞在し、自然の中で健康的な食事と温泉を楽しみながら英気を養いたい。",
            target: "都会を離れ、自然豊かな温泉地で3泊以上のんびり連泊し、心身を完全にリセットしたいシニア・フリーランス",
            outcome: "まるで第二の我が家のようにリラックスしながら、毎日の温泉と体に優しい食事で、滞在するほど健康になる喜びを実感できる。",
            evidence: "連泊者専用のミニキッチン・ランドリー付き客室と、毎日日替わりの薬膳健康和食を提供する専任サポートがあるから。"
          }
        ],

        "BtoB・IT・SaaS・受託開発": [
          {
            id: "slot_1",
            priority: 1,
            title: "業務属人化解消・現場定着伴走軸",
            marketingRole: "公式サイトTOP・メインサービスLP・導入事例集",
            friction: "ツールを導入しても現場が使わず形骸化し、費用倒れになって経営陣への説明がつかない不安。",
            desired: "現場スタッフが迷わず自発的に使いこなし、最短3ヶ月で明確な業務効率化の成果を数字で示したい。",
            target: "業務の属人化を解消し、現場が自発的に使いこなすまで専任で伴走サポートしてほしい中小企業の経営者・事業責任者",
            outcome: "無駄な手入力や確認作業を70%削減し、現場スタッフが迷わず自発的に使いこなせる業務体制を最短3ヶ月で確立できる。",
            evidence: "過去500社以上の支援データから体系化した『5段階定着ロードマップ』により専任コンサルタントが週1回伴走し、90日以内に定着しなければ全額返金する安心保証があるから。"
          },
          {
            id: "slot_2",
            priority: 2,
            title: "手作業ミス根絶・残業削減軸",
            marketingRole: "現場管理職向けホワイトペーパー・検索広告",
            friction: "毎月の月末月初に膨大な手入力と転記ミスが発生し、スタッフが連日深夜残業を強いられている。",
            desired: "ミスが起きようがない自動化フローを構築し、月末の残業をゼロにして社員の定着率を高めたい。",
            target: "転記ミスや確認作業に追われ、社員の残業と離職リスクに頭を抱えるバックオフィスの現場責任者",
            outcome: "月末月初の手入力作業が完全ゼロになり、入力ミスによる顧客トラブルが根絶され、残業代も大幅カットできる。",
            evidence: "既存のExcelや基幹システムとAPIでノーコード自動連携し、二重入力を完全に排除する独自自動化エンジンを搭載しているから。"
          },
          {
            id: "slot_3",
            priority: 3,
            title: "セキュリティ・情報漏洩防止軸",
            marketingRole: "大企業・情シス向け専用提案書・セキュリティ監査資料",
            friction: "クラウド導入にあたり、個人情報や機密データの漏洩、社内セキュリティ審査落ちが最も怖い。",
            desired: "金融機関レベルの最高峰セキュリティ基盤で、誰の目から見ても安全なシステムを堂々と導入したい。",
            target: "厳格なコンプライアンス基準をクリアし、情報漏洩リスクを徹底排除したい情報システム部門長・監査役員",
            outcome: "社内セキュリティ審査を一発でクリアし、万が一の不正アクセスや内部漏洩のリスクを極限までゼロに抑えられる。",
            evidence: "ISO27001（ISMS）認証およびSOC2 Type2報告書を取得し、全通信・保存データの完全暗号化と詳細ログ追跡を標準完備しているから。"
          },
          {
            id: "slot_4",
            priority: 4,
            title: "経営数値リアルタイム可視化軸",
            marketingRole: "経営者・CFO向けセミナー・意思決定支援LP",
            friction: "各拠点の売上や原価の集計が遅く、翌月中旬まで正確な経営数字が見えず意思決定が遅れる。",
            desired: "今日・今この瞬間の売上・利益・進捗がスマホ一台で把握でき、スピーディに経営の舵を切りたい。",
            target: "複数拠点や事業部を持ち、経営数値の集計遅延による意思決定の遅れを解消したい経営者・CFO",
            outcome: "締め日を待たずに全拠点の粗利と案件進捗がリアルタイムに可視化され、迅速で精度の高い経営判断が可能になる。",
            evidence: "各部門のデータを自動集約するリアルタイム経営ダッシュボードと、異常値を即時通知するAIアラート機能を標準搭載しているから。"
          },
          {
            id: "slot_5",
            priority: 5,
            title: "オーダーメイド業務カスタマイズ軸",
            marketingRole: "特殊商習慣を持つ業界向けアプローチ・個別相談会",
            friction: "既製品のSaaSでは自社特有の業界ルールや商習慣に対応できず、結局手作業が残ってしまう。",
            desired: "自社の業務フローを無理に変えることなく、完全にフィットした使いやすいシステムを構築したい。",
            target: "独自の受発注ルールや複雑な商習慣を持ち、一般的なパッケージソフトでは適合しなかった専門業界の企業様",
            outcome: "自社の業務フローを1ミリも崩さず、100%自社仕様の使い心地で業務全体をシームレスにデジタル化できる。",
            evidence: "要件定義から熟練エンジニアが直接ヒアリングし、ノーコード基盤を活用して高速かつ低コストで個別専用開発するから。"
          }
        ]
      };

      // アプリケーション状態
      let state = {
        currentStep: 0,
        selectedSlotIndex: 0, // 現在右側プレビューや個別編集にフォーカスしているスロット（0〜4）
        answers: {
          industryFamily: "宿泊・観光・温泉旅館",
          companyWebsiteUrl: "",
          companyName: "月見の湯 翠水亭",
          business: "静かな自然に囲まれた山あいに佇む、全室ペット同伴対応の客室と、100%源泉かけ流し天然温泉、地元の旬の素材を活かした個室会席料理を提供する小さな温泉宿。",
          slots: JSON.parse(JSON.stringify(DEFAULT_SLOTS_DATABASE["宿泊・観光・温泉旅館"])),
          innovationAction: "『ペット体調不良時の当日キャンセル無料保証』と『源泉ぬる湯の個別湯治プログラム』を新設し、競合が真似できない強固なビコーズを創出する。",
          platformAction: "公式サイトTOPに第1優先のインフルエンスステートメントを掲げつつ、下層に5つの切り口それぞれの専用ページと、AI検索（Perplexity/ChatGPT等）に引用される公式FAQを整備する。",
          touchpointAction: "チェックイン時に顧客の来訪目的（ペット・ぬる湯・記念日等）に合わせた専用ウェルカムカードを手渡し、滞在中の声かけや退館後のフォローを一貫して最適化する。"
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
            if (parsed && parsed.answers && parsed.answers.slots && parsed.answers.slots.length === 5) {
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

      // 現在選択中のスロット
      function currentSlot() {
        if (!state.answers.slots || state.answers.slots.length === 0) {
          state.answers.slots = JSON.parse(JSON.stringify(DEFAULT_SLOTS_DATABASE["宿泊・観光・温泉旅館"]));
        }
        return state.answers.slots[state.selectedSlotIndex] || state.answers.slots[0];
      }

      // 第1優先（本命フラッグシップ）のスロット
      function priorityOneSlot() {
        const slots = state.answers.slots || [];
        const p1 = slots.find(s => s.priority === 1);
        return p1 || slots[0] || {};
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
          if (idx === 0 && state.answers.industryFamily && state.answers.business) isCompleted = true;
          if (idx === 1 && state.answers.slots && state.answers.slots.length >= 5) isCompleted = true;
          if (idx === 2 && currentSlot().outcome) isCompleted = true;
          if (idx === 3 && currentSlot().evidence) isCompleted = true;
          if (idx === 4 && (state.answers.innovationAction || state.answers.platformAction)) isCompleted = true;
          if (idx === 5) isCompleted = true;

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
        const slot = currentSlot();

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
                  <span>公式ホームページから事業内容と5つの切り口を自動生成</span>
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
              <p class="form-helper">業種にあわせて、AIが店舗や企業の多角的な5つの切り口を自動生成します。</p>
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

        // ステップ2：5つの切り口（洞察 × 誰に）と優先順位づけ
        else if (stepNum === 1) {
          contentHtml = \`
            <div class="question-header">
              <span class="question-stage-tag">\${escapeHtml(currentStage.tag)}</span>
              <h2 class="question-title">\${escapeHtml(currentStage.title)}</h2>
              <p class="question-desc">\${escapeHtml(currentStage.desc)}</p>
            </div>

            <div style="background:#f0fdfa; border:1px solid #99f6e4; border-radius:10px; padding:12px 16px; margin-bottom:14px; font-size:0.84rem; color:var(--teal-dark);">
              💡 <strong>重要戦略:</strong> すべてを同時に言おうとすると誰にも刺さりません。ここで<strong>「★第1優先（本命の看板）」</strong>を1つ決め、残りの切り口は専用LPや特定の検索ニーズ向けの「サブ展開」として優先順位をつけます。
            </div>

            <!-- 5つの切り口カード一覧 -->
            <div class="cut-cards-container">
              \${state.answers.slots.map((s, idx) => {
                const isP1 = s.priority === 1;
                const isSelected = idx === state.selectedSlotIndex;
                return \`
                  <div class="cut-card \${isP1 ? 'is-priority1' : ''} \${isSelected ? 'is-active' : ''}">
                    <div class="cut-card-head">
                      <div class="cut-card-title-row">
                        <span class="cut-priority-badge \${isP1 ? 'p1' : 'sub'}">
                          \${isP1 ? '★ 第1優先（メイン看板）' : \`第\${s.priority || idx + 1}優先（サブ展開）\`}
                        </span>
                        <h3 class="cut-card-title">切り口\${idx + 1}: \${escapeHtml(s.title)}</h3>
                      </div>
                      <span class="cut-market-role">\${escapeHtml(s.marketingRole)}</span>
                    </div>

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

                    <div class="cut-card-actions">
                      <div style="font-size:0.75rem; color:var(--muted);">
                        \${isP1 ? '現在、公式サイトの看板コンセプトに設定されています' : '特定ニーズや専用プラン向けとして保持'}
                      </div>
                      <div style="display:flex; gap:8px;">
                        <button type="button" class="set-p1-btn \${isP1 ? 'active' : ''}" onclick="window.setPriorityOne(\${idx})">
                          \${isP1 ? '★ メイン看板に設定中' : '★ この切り口を第1優先にする'}
                        </button>
                        <button type="button" class="ai-adopt-btn" style="flex:none; padding:6px 12px;" onclick="window.focusSlot(\${idx})">
                          ✏️ この切り口を編集
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
                ✏️ 選択中切り口（切り口\${state.selectedSlotIndex + 1}: \${escapeHtml(slot.title)}）の詳細微調整
              </h4>
              <div class="form-group">
                <label class="form-label">切り口のテーマ名</label>
                <input type="text" id="slotTitleInput" class="form-input" value="\${escapeHtml(slot.title)}" />
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

        // ステップ3：顧客に対して約束できる成果は？
        else if (stepNum === 2) {
          contentHtml = \`
            <div class="question-header">
              <span class="question-stage-tag">\${escapeHtml(currentStage.tag)}</span>
              <h2 class="question-title">\${escapeHtml(currentStage.title)}</h2>
              <p class="question-desc">\${escapeHtml(currentStage.desc)}</p>
            </div>

            <!-- 切り口タブ切替 -->
            <div class="slot-tabs-bar">
              \${state.answers.slots.map((s, idx) => \`
                <button type="button" class="slot-tab-btn \${idx === state.selectedSlotIndex ? 'active' : ''}" onclick="window.focusSlot(\${idx})">
                  <span class="slot-tab-badge \${s.priority === 1 ? 'p1' : 'sub'}">\${s.priority === 1 ? '★第1優先' : \`第\${s.priority}優先\`}</span>
                  <strong style="display:block; font-size:0.78rem; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">\${escapeHtml(s.title)}</strong>
                </button>
              \`).join("")}
            </div>

            <div style="background:#f8fafc; border:1px solid var(--line); border-radius:10px; padding:14px; margin-top:10px;">
              <div style="font-size:0.8rem; color:var(--muted); margin-bottom:4px;">
                現在選択中: <strong>切り口\${state.selectedSlotIndex + 1}: \${escapeHtml(slot.title)}</strong>（対象顧客：\${escapeHtml(slot.target)}）
              </div>
              <div class="form-group">
                <label class="form-label" for="slotOutcomeInput">
                  <span>この顧客に約束できる具体的な成果（ビフォーアフター）</span>
                  <span class="req">必須</span>
                </label>
                <p class="form-helper">単なる機能ではなく、この顧客が手に入れる具体的な変化・嬉しい結果・ベネフィットを記入します。</p>
                <textarea id="slotOutcomeInput" class="form-textarea" style="min-height:100px;">\${escapeHtml(slot.outcome)}</textarea>
                <div class="voice-bar">
                  <button type="button" class="voice-btn" data-target="slotOutcomeInput">🎙 話して入力</button>
                </div>
              </div>
            </div>

            <!-- ★AIの成果提案エリア -->
            <div class="ai-suggest-section">
              <div class="ai-suggest-header">
                <div class="ai-suggest-title">
                  <span class="ai-badge">AI成果提案</span>
                  <span>この切り口に最適な「約束できる成果案」</span>
                </div>
              </div>
              <p style="margin:0 0 10px; font-size:0.78rem; color:var(--muted);">顧客の悩み（\${escapeHtml(slot.friction)}）を根本解決する成果候補です。</p>
              <div class="ai-cards-grid">
                <div class="ai-card">
                  <div>
                    <span class="ai-card-tag">劇的変化・安心成果</span>
                    <h4 class="ai-card-title">不安の完全解消と深い満足</h4>
                    <p class="ai-card-body">\${escapeHtml(slot.outcome)}</p>
                  </div>
                  <div class="ai-card-actions">
                    <button type="button" class="ai-adopt-btn" onclick="window.adoptSlotOutcome(0)">🎁 この成果を採用</button>
                  </div>
                </div>
              </div>
            </div>
          \`;
        }

        // ステップ4：顧客の信頼に足るビコーズは？（17のテクニック）
        else if (stepNum === 3) {
          contentHtml = \`
            <div class="question-header">
              <span class="question-stage-tag">\${escapeHtml(currentStage.tag)}</span>
              <h2 class="question-title">\${escapeHtml(currentStage.title)}</h2>
              <p class="question-desc">\${escapeHtml(currentStage.desc)}</p>
            </div>

            <!-- 切り口タブ切替 -->
            <div class="slot-tabs-bar">
              \${state.answers.slots.map((s, idx) => \`
                <button type="button" class="slot-tab-btn \${idx === state.selectedSlotIndex ? 'active' : ''}" onclick="window.goToStepAndSlot(3, \${idx})">
                  <span class="slot-tab-badge \${s.priority === 1 ? 'p1' : 'sub'}">\${s.priority === 1 ? '★第1優先' : \`第\${s.priority}優先\`}</span>
                  <strong style="display:block; font-size:0.78rem; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">\${escapeHtml(s.title)}</strong>
                </button>
              \`).join("")}
            </div>

            <div style="background:#f8fafc; border:1px solid var(--line); border-radius:10px; padding:14px; margin-top:10px;">
              <div style="font-size:0.8rem; color:var(--muted); margin-bottom:4px;">
                現在選択中: <strong>切り口\${state.selectedSlotIndex + 1}: \${escapeHtml(slot.title)}</strong>（成果：\${escapeHtml(slot.outcome)}）
              </div>
              <div class="form-group">
                <label class="form-label" for="slotEvidenceInput">
                  <span>この成果を顧客が信じるためのビコーズ（根拠・なぜなら）</span>
                  <span class="req">必須</span>
                </label>
                <p class="form-helper">下の17のテクニック（体系的・知覚・生み出された根拠）からAI提案を選んで追加・編集できます。</p>
                <textarea id="slotEvidenceInput" class="form-textarea" style="min-height:110px;">\${escapeHtml(slot.evidence)}</textarea>
                <div class="voice-bar">
                  <button type="button" class="voice-btn" data-target="slotEvidenceInput">🎙 話して入力</button>
                </div>
              </div>
            </div>

            <!-- ★17テクニックからのAI提案 -->
            <div class="ai-suggest-section">
              <div class="ai-suggest-header">
                <div class="ai-suggest-title">
                  <span class="ai-badge">17のテクニック提案</span>
                  <span>この切り口を支える強力なビコーズ候補</span>
                </div>
              </div>
              <div class="ai-cards-grid">
                <div class="ai-card technique-card systematic">
                  <div>
                    <span class="ai-card-tag">体系的な根拠</span>
                    <h4 class="ai-card-title">独自のプロセス・設備・素材</h4>
                    <p class="ai-card-body">\${escapeHtml(slot.evidence)}</p>
                  </div>
                  <div class="ai-card-actions">
                    <button type="button" class="ai-adopt-btn" onclick="window.adoptSlotEvidence(0)">💡 このビコーズで決定</button>
                  </div>
                </div>
              </div>

              <!-- 17のテクニック一覧（アコーディオン） -->
              <details style="margin-top:14px; background:#ffffff; border:1px solid var(--line); border-radius:8px; padding:10px 14px;">
                <summary style="font-size:0.82rem; font-weight:700; color:var(--ink-soft); cursor:pointer;">
                  📚 書籍公式『ビコーズを創り出す17のテクニック』一覧を見る
                </summary>
                <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:10px; margin-top:10px;">
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

        // ステップ5：ビコーズ・フレームワーク（後半）3つのアクション
        else if (stepNum === 4) {
          contentHtml = \`
            <div class="question-header">
              <span class="question-stage-tag">\${escapeHtml(currentStage.tag)}</span>
              <h2 class="question-title">\${escapeHtml(currentStage.title)}</h2>
              <p class="question-desc">\${escapeHtml(currentStage.desc)}</p>
            </div>

            <!-- アクション1：イノベーション -->
            <div class="action-step-card">
              <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:8px;">
                <div>
                  <span class="action-step-badge innovation">STEP 5: アクション①</span>
                  <h4 style="margin:4px 0 2px; font-size:0.95rem; font-weight:800;">イノベーションを起こす</h4>
                  <p style="margin:0; font-size:0.78rem; color:var(--muted);">強力なビコーズが不足している場合やさらに差別化するため、新保証・独自工程・付加価値を新開発する。</p>
                </div>
              </div>
              <textarea id="innovationActionInput" class="form-textarea">\${escapeHtml(state.answers.innovationAction)}</textarea>
            </div>

            <!-- アクション2：プラットフォーム構築 -->
            <div class="action-step-card">
              <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:8px;">
                <div>
                  <span class="action-step-badge platform">STEP 6: アクション②</span>
                  <h4 style="margin:4px 0 2px; font-size:0.95rem; font-weight:800;">ビコーズ・プラットフォームを構築する</h4>
                  <p style="margin:0; font-size:0.78rem; color:var(--muted);">第1優先の看板をTOPに掲げ、5つの切り口それぞれの専用ページとAI検索用FAQを整備する。</p>
                </div>
              </div>
              <textarea id="platformActionInput" class="form-textarea">\${escapeHtml(state.answers.platformAction)}</textarea>
            </div>

            <!-- アクション3：全接点で実行 -->
            <div class="action-step-card">
              <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:8px;">
                <div>
                  <span class="action-step-badge touchpoint">STEP 7: アクション③</span>
                  <h4 style="margin:4px 0 2px; font-size:0.95rem; font-weight:800;">あらゆる顧客接点で取り組みを実行する</h4>
                  <p style="margin:0; font-size:0.78rem; color:var(--muted);">顧客の来訪目的に応じた接客、フォロー、クチコミ収集でビコーズを証明し続ける。</p>
                </div>
              </div>
              <textarea id="touchpointActionInput" class="form-textarea">\${escapeHtml(state.answers.touchpointAction)}</textarea>
            </div>
          \`;
        }

        // ステップ6：ビコーズ・マトリクス完成＆マーケティング展開計画
        else if (stepNum === 5) {
          const p1 = priorityOneSlot();
          contentHtml = \`
            <div class="question-header">
              <span class="question-stage-tag">\${escapeHtml(currentStage.tag)}</span>
              <h2 class="question-title">\${escapeHtml(currentStage.title)}</h2>
              <p class="question-desc">\${escapeHtml(currentStage.desc)}</p>
            </div>

            <div style="background:#fef3c7; border:1px solid #d97706; border-radius:10px; padding:16px; margin-bottom:16px;">
              <h3 style="margin:0 0 6px; font-size:1.05rem; color:#b45309; display:flex; align-items:center; gap:8px;">
                <span>👑</span>
                <span>メイン看板（第1優先）：\${escapeHtml(p1.title)}</span>
              </h3>
              <p style="margin:0; font-size:0.92rem; line-height:1.6; color:#78350f;">
                【\${escapeHtml(state.answers.industryFamily)}】の<strong>\${escapeHtml(state.answers.companyName)}</strong>は、<br>
                <strong>\${escapeHtml(p1.target)}</strong>に、<br>
                <strong>\${escapeHtml(p1.outcome)}</strong>を提供します。<br>
                なぜなら、<strong>\${escapeHtml(p1.evidence)}</strong>だからです。
              </p>
            </div>

            <!-- 5つの切り口マトリクス総合テーブル -->
            <div style="background:#ffffff; border:1px solid var(--line); border-radius:10px; padding:16px; overflow-x:auto;">
              <h4 style="margin:0 0 10px; font-size:0.95rem; font-weight:800;">📊 書籍公式『ビコーズ・マトリクス』一覧表</h4>
              <table style="width:100%; border-collapse:collapse; font-size:0.78rem; min-width:640px;">
                <thead>
                  <tr style="background:var(--surface-alt); text-align:left;">
                    <th style="padding:8px; border-bottom:1px solid var(--line); width:12%;">優先順位</th>
                    <th style="padding:8px; border-bottom:1px solid var(--line); width:16%;">切り口テーマ</th>
                    <th style="padding:8px; border-bottom:1px solid var(--line); width:24%;">① 誰に（理想顧客）</th>
                    <th style="padding:8px; border-bottom:1px solid var(--line); width:24%;">② 約束する成果</th>
                    <th style="padding:8px; border-bottom:1px solid var(--line); width:24%;">③ 信頼のビコーズ</th>
                  </tr>
                </thead>
                <tbody>
                  \${state.answers.slots.map((s, idx) => \`
                    <tr style="border-bottom:1px solid var(--line-subtle); \${s.priority === 1 ? 'background:#fffbeb; font-weight:600;' : ''}">
                      <td style="padding:8px; vertical-align:top;">
                        <span class="cut-priority-badge \${s.priority === 1 ? 'p1' : 'sub'}">
                          \${s.priority === 1 ? '★第1優先' : \`第\${s.priority}優先\`}
                        </span>
                      </td>
                      <td style="padding:8px; vertical-align:top;">
                        <strong>\${escapeHtml(s.title)}</strong><br>
                        <small style="color:var(--muted);">\${escapeHtml(s.marketingRole)}</small>
                      </td>
                      <td style="padding:8px; vertical-align:top;">\${escapeHtml(s.target)}</td>
                      <td style="padding:8px; vertical-align:top;">\${escapeHtml(s.outcome)}</td>
                      <td style="padding:8px; vertical-align:top;">\${escapeHtml(s.evidence)}</td>
                    </tr>
                  \`).join("")}
                </tbody>
              </table>
            </div>

            <!-- マーケティング優先順位展開ロードマップ -->
            <div style="background:#ffffff; border:1px solid var(--line); border-radius:10px; padding:16px; margin-top:14px;">
              <h4 style="margin:0 0 10px; font-size:0.95rem; font-weight:800;">🗺️ 優先順位マーケティング展開プラン</h4>
              <div style="display:flex; flex-direction:column; gap:8px; font-size:0.82rem;">
                <div style="padding:10px; background:#fffbeb; border-radius:8px;">
                  <strong style="color:#b45309;">1. 公式サイトTOP・メイン広告:</strong>
                  第1優先【\${escapeHtml(p1.title)}】のインフルエンスステートメントを掲げ、「何のお店・会社なのか」を一目で認知させます。
                </div>
                <div style="padding:10px; background:#f0fdfa; border-radius:8px;">
                  <strong style="color:var(--teal-dark);">2. セグメント別専用LP・宿泊プラン:</strong>
                  第2〜5優先の各切り口について、検索キーワードや特定ニーズ（ぬる湯、記念日、一人旅等）に応じた個別ページを用意し、取りこぼしを防ぎます。
                </div>
                <div style="padding:10px; background:#e0f2fe; border-radius:8px;">
                  <strong style="color:#0369a1;">3. AI検索（Perplexity/ChatGPT等）対策:</strong>
                  5つの切り口それぞれの「洞察・成果・ビコーズ」を公式FAQとしてWeb公開することで、AIがユーザーの質問意図に応じてピンポイントで自社を推薦する状態を作ります。
                </div>
              </div>
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
                🎉 選ばれる理由を一括コピー
              </button>
            \`}
          </div>
        \`;

        container.innerHTML = contentHtml + navBarHtml;

        // フォームバインド
        bindFormEvents();
      }

      // フォームイベントのバインド
      function bindFormEvents() {
        const stepNum = state.currentStep;
        const slot = currentSlot();

        if (stepNum === 0) {
          const indSelect = document.getElementById("industrySelect");
          const compInput = document.getElementById("companyNameInput");
          const bizInput = document.getElementById("businessInput");
          const fetchBtn = document.getElementById("fetchUrlBtn");

          if (indSelect) indSelect.addEventListener("change", (e) => {
            state.answers.industryFamily = e.target.value;
            // 業種が変わったら対応するデフォルト5切り口を反映
            if (DEFAULT_SLOTS_DATABASE[e.target.value]) {
              state.answers.slots = JSON.parse(JSON.stringify(DEFAULT_SLOTS_DATABASE[e.target.value]));
            }
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
          const sTitle = document.getElementById("slotTitleInput");
          const sFric = document.getElementById("slotFrictionInput");
          const sDesi = document.getElementById("slotDesiredInput");
          const sTgt = document.getElementById("slotTargetInput");

          if (sTitle) sTitle.addEventListener("input", (e) => {
            slot.title = e.target.value;
            saveState();
            renderStrategyBoard();
          });
          if (sFric) sFric.addEventListener("input", (e) => {
            slot.friction = e.target.value;
            saveState();
            renderStrategyBoard();
          });
          if (sDesi) sDesi.addEventListener("input", (e) => {
            slot.desired = e.target.value;
            saveState();
            renderStrategyBoard();
          });
          if (sTgt) sTgt.addEventListener("input", (e) => {
            slot.target = e.target.value;
            saveState();
            renderStrategyBoard();
          });
        } else if (stepNum === 2) {
          const sOut = document.getElementById("slotOutcomeInput");
          if (sOut) sOut.addEventListener("input", (e) => {
            slot.outcome = e.target.value;
            saveState();
            renderStrategyBoard();
          });
        } else if (stepNum === 3) {
          const sEv = document.getElementById("slotEvidenceInput");
          if (sEv) sEv.addEventListener("input", (e) => {
            slot.evidence = e.target.value;
            saveState();
            renderStrategyBoard();
          });
        } else if (stepNum === 4) {
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

        // 音声入力バインド
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
        const slot = currentSlot();
        const p1 = priorityOneSlot();

        // プレビュー表示するスロット（現在選択中のスロット）
        const target = slot.target || "【本命のお客様】";
        const outcome = slot.outcome || "【約束できる成果】";
        const evidence = slot.evidence || "【信頼に足るビコーズ】";

        const badgeLabel = slot.priority === 1 ? "★ 第1優先（メイン看板）" : \`第\${slot.priority}優先（\${escapeHtml(slot.title)}）\`;
        const badgeEl = document.getElementById("influenceBadgeLabel");
        if (badgeEl) badgeEl.textContent = badgeLabel;

        const statementHtml = \`
          【<strong>\${escapeHtml(ind)}</strong>】の<strong>\${escapeHtml(cName)}</strong>は、<br>
          <strong>\${escapeHtml(target)}</strong>に、<br>
          <strong>\${escapeHtml(outcome)}</strong>を提供します。<br>
          なぜなら、<strong>\${escapeHtml(evidence)}</strong>だからです。
        \`;
        const infEl = document.getElementById("influenceText");
        if (infEl) infEl.innerHTML = statementHtml;

        // ② ビコーズ・マトリクス（5スロット一覧リスト）
        const matrixList = document.getElementById("matrixSlotList");
        if (matrixList) {
          matrixList.innerHTML = state.answers.slots.map((s, idx) => {
            const isSelected = idx === state.selectedSlotIndex;
            const isP1 = s.priority === 1;
            return \`
              <div class="matrix-slot-item \${isSelected ? 'is-active' : ''} \${isP1 ? 'is-p1' : ''}" onclick="window.focusSlot(\${idx})">
                <div class="matrix-slot-head">
                  <span class="cut-priority-badge \${isP1 ? 'p1' : 'sub'}">\${isP1 ? '★第1優先' : \`第\${s.priority}優先\`}</span>
                  <strong style="color:var(--ink);">\${escapeHtml(s.title)}</strong>
                </div>
                <div style="font-size:0.73rem; color:var(--ink-soft); line-height:1.4;">
                  <strong>誰に:</strong> \${escapeHtml(s.target.substring(0, 36))}…
                </div>
              </div>
            \`;
          }).join("");
        }

        // ③ 後半アクション
        const sInn = document.getElementById("summaryInnovation");
        const sPla = document.getElementById("summaryPlatform");
        const sTou = document.getElementById("summaryTouchpoint");
        if (sInn) sInn.textContent = state.answers.innovationAction ? (state.answers.innovationAction.substring(0, 32) + "…") : "未設定";
        if (sPla) sPla.textContent = state.answers.platformAction ? (state.answers.platformAction.substring(0, 32) + "…") : "未設定";
        if (sTou) sTou.textContent = state.answers.touchpointAction ? (state.answers.touchpointAction.substring(0, 32) + "…") : "未設定";
      }

      // ==========================================
      // URL自動解析機能
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
        statusMsg.textContent = "ホームページにアクセスして事業内容を解析し、5つの切り口を生成しています…";

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

            // 5つの切り口を初期化・更新
            if (DEFAULT_SLOTS_DATABASE[state.answers.industryFamily]) {
              state.answers.slots = JSON.parse(JSON.stringify(DEFAULT_SLOTS_DATABASE[state.answers.industryFamily]));
            }

            saveState();
            renderStrategyBoard();

            statusMsg.className = "url-status-msg success";
            statusMsg.innerHTML = "✅ ホームページの解析が完了しました！事業概要と5つの切り口を生成しました。";
            showToast("🌐 ホームページ情報を反映し、5つの切り口を生成しました！");
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
      // 音声入力
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
      // グローバル操作関数
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

      window.focusSlot = (slotIdx) => {
        if (slotIdx < 0 || slotIdx >= state.answers.slots.length) return;
        state.selectedSlotIndex = slotIdx;
        saveState();
        renderQuestionPanel();
        renderStrategyBoard();
        showToast(\`切り口\${slotIdx + 1}: \${state.answers.slots[slotIdx].title} に切り替えました\`);
      };

      window.goToStepAndSlot = (stepIdx, slotIdx) => {
        state.currentStep = stepIdx;
        state.selectedSlotIndex = slotIdx;
        saveState();
        renderHeroSteps();
        renderStepNavList();
        renderQuestionPanel();
        renderStrategyBoard();
      };

      // 第1優先（本命看板）の変更
      window.setPriorityOne = (slotIdx) => {
        state.answers.slots.forEach((s, idx) => {
          if (idx === slotIdx) {
            s.priority = 1;
            s.marketingRole = "公式サイトTOP・メイン看板・主力広告";
          } else {
            // 他のスロットの優先順位を振り直す
            s.priority = idx < slotIdx ? idx + 2 : idx + 1;
            s.marketingRole = "専用LP・セグメント別プロモーション・AI検索用";
          }
        });
        state.selectedSlotIndex = slotIdx;
        saveState();
        renderQuestionPanel();
        renderStrategyBoard();
        showToast(\`👑 切り口\${slotIdx + 1} を「★第1優先（メイン看板）」に設定しました！\`);
      };

      window.adoptSlotOutcome = (dummy) => {
        showToast("🎁 約束できる成果を採用しました！");
      };

      window.adoptSlotEvidence = (dummy) => {
        showToast("🛡️ ビコーズを採用しました！");
      };

      window.finishAndCopy = () => {
        copyInfluenceStatement();
      };

      // ==========================================
      // コピー機能＆プロンプト生成
      // ==========================================
      function copyInfluenceStatement() {
        const ind = state.answers.industryFamily || "業種";
        const cName = state.answers.companyName || "当社";
        const slot = currentSlot();
        const text = \`【\${ind}】の\${cName}は、\${slot.target}に、\${slot.outcome}を提供します。なぜなら、\${slot.evidence}だからです。\`;
        navigator.clipboard.writeText(text).then(() => {
          showToast("📋 インフルエンスステートメントをコピーしました！");
        });
      }

      function copyMatrixMarkdown() {
        const ind = state.answers.industryFamily || "業種";
        const cName = state.answers.companyName || "当社";

        let md = \`# ビコーズ・マトリクス（\${cName}・5つの切り口一覧表）\\n\\n\`;
        md += \`業種: \${ind} | 公式URL: \${state.answers.companyWebsiteUrl || "未登録"}\\n\\n\`;
        md += \`| 優先順位 | 切り口テーマ | ① 誰に（理想顧客） | 顧客の洞察（悩み・望み） | ② 約束する成果 | ③ 信頼のビコーズ（根拠） | マーケティング用途 |\\n\`;
        md += \`|---|---|---|---|---|---|---|\\n\`;

        state.answers.slots.forEach((s, idx) => {
          const pLabel = s.priority === 1 ? "**★第1優先**" : \`第\${s.priority}優先\`;
          md += \`| \${pLabel} | \${s.title} | \${s.target} | \${s.friction} / \${s.desired} | \${s.outcome} | \${s.evidence} | \${s.marketingRole} |\\n\`;
        });

        md += \`\\n## 後半3つのアクション\\n\`;
        md += \`1. **イノベーション創出**: \${state.answers.innovationAction || "未設定"}\\n\`;
        md += \`2. **プラットフォーム構築**: \${state.answers.platformAction || "未設定"}\\n\`;
        md += \`3. **全接点での実行**: \${state.answers.touchpointAction || "未設定"}\\n\`;

        navigator.clipboard.writeText(md).then(() => {
          showToast("📋 5つの切り口マトリクス（Markdown）をコピーしました！");
        });
      }

      function copyHandoffPrompt() {
        const ind = state.answers.industryFamily || "業種";
        const cName = state.answers.companyName || "当社";
        const p1 = priorityOneSlot();

        let prompt = \`あなたは一流のマーケティングディレクター兼コピーライターです。
書籍『顧客を買う気にさせる ビコーズ・フレームワーク』に基づき策定した、当社の「5つの切り口のビコーズ」をもとに、
① メイン看板LPのファーストビュー見出し
② セグメント別（第2〜5優先）の専用LP／個別オファー構成
③ AI検索（Perplexity/ChatGPT等）に一次情報として引用されるための公式FAQ（5問）
を作成してください。

【企業概要】
業種・企業名：【\${ind}】\${cName}

【★第1優先（メイン看板）】
テーマ：\${p1.title}
誰に：\${p1.target}
成果：\${p1.outcome}
ビコーズ：\${p1.evidence}

【その他のセグメント別切り口】\\n\`;

        state.answers.slots.filter(s => s.priority !== 1).forEach((s, i) => {
          prompt += \`・第\${s.priority}優先【\${s.title}】: 誰に（\${s.target}）/ 成果（\${s.outcome}）/ 根拠（\${s.evidence}）\\n\`;
        });

        prompt += \`\\n【依頼内容】
1. メインLP（第1優先向け）のキャッチコピー・サブコピー・導入文
2. 他の4つの切り口をセグメント別に訴求するための見出し案
3. AI検索エンジンが「〇〇なお店を探している人」に対してピンポイントで当社を引用・推薦するための公式FAQ
\`;

        navigator.clipboard.writeText(prompt).then(() => {
          showToast("📋 AI用プロンプトをコピーしました！");
        });
      }

      function copyBrief() {
        const ind = state.answers.industryFamily || "業種";
        const cName = state.answers.companyName || "当社";
        const p1 = priorityOneSlot();

        let brief = \`# 戦略ブリーフ：選ばれる理由（5つの切り口マトリクス）
企業名: \${cName}
業種: \${ind}
公式URL: \${state.answers.companyWebsiteUrl || "未登録"}

## 1. メイン看板宣言（第1優先フラッグシップ）
【\${ind}】の\${cName}は、\${p1.target}に、\${p1.outcome}を提供します。なぜなら、\${p1.evidence}だからです。

## 2. 5つの切り口マトリクス一覧
\`;
        state.answers.slots.forEach(s => {
          brief += \`\\n### [\${s.priority === 1 ? '★第1優先' : \`第\${s.priority}優先\`}] \${s.title}
- マーケティング用途: \${s.marketingRole}
- 理想顧客: \${s.target}
- 顧客の洞察: \${s.friction}（悩み） ➜ \${s.desired}（望み）
- 約束する成果: \${s.outcome}
- 信頼のビコーズ: \${s.evidence}
\`;
        });

        brief += \`\\n## 3. 後半3つのアクション
- イノベーション創出: \${state.answers.innovationAction || "未設定"}
- プラットフォーム構築: \${state.answers.platformAction || "未設定"}
- 全接点での実行: \${state.answers.touchpointAction || "未設定"}
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
          slots: JSON.parse(JSON.stringify(DEFAULT_SLOTS_DATABASE["宿泊・観光・温泉旅館"])),
          innovationAction: "『ペット体調不良時の当日キャンセル無料保証』と『源泉ぬる湯の個別湯治プログラム』を新設し、競合が真似できない強固なビコーズを創出する。",
          platformAction: "公式サイトTOPに第1優先のインフルエンスステートメントを掲げつつ、下層に5つの切り口それぞれの専用ページと、AI検索（Perplexity/ChatGPT等）に引用される公式FAQを整備する。",
          touchpointAction: "チェックイン時に顧客の来訪目的（ペット・ぬる湯・記念日等）に合わせた専用ウェルカムカードを手渡し、滞在中の声かけや退館後のフォローを一貫して最適化する。"
        };
        state.selectedSlotIndex = 0;
        saveState();
        renderHeroSteps();
        renderStepNavList();
        renderQuestionPanel();
        renderStrategyBoard();
        showToast("♨️ 旅館の5つの切り口モデルを読み込みました！");
      }

      function applyBtobSample() {
        state.answers = {
          industryFamily: "BtoB・IT・SaaS・受託開発",
          companyWebsiteUrl: "https://growth-workflow.sample.jp",
          companyName: "株式会社グロースワークス",
          business: "中小企業のバックオフィス業務・受発注管理を自動化し、専任コンサルタントが定着まで伴走するクラウド業務DX支援サービス。",
          slots: JSON.parse(JSON.stringify(DEFAULT_SLOTS_DATABASE["BtoB・IT・SaaS・受託開発"])),
          innovationAction: "他社にない『90日間成果未達成時の全額返金保証』と『社内定着率95%保証パック』を正式リリースし、顧客の意思決定リスクを極限まで下げる。",
          platformAction: "インフルエンスステートメントを導入事例集やサービスLPのファーストビューに配置し、AI検索や比較サイトに引用される『業務効率化ロードマップ』を公開する。",
          touchpointAction: "商談トークを『機能説明』から『成果とビコーズの約束』に統一。契約後7日以内にキックオフ定例を実施し、週次レポートで削減時間を可視化して全接点で約束を果たす。"
        };
        state.selectedSlotIndex = 0;
        saveState();
        renderHeroSteps();
        renderStepNavList();
        renderQuestionPanel();
        renderStrategyBoard();
        showToast("💼 BtoBの5つの切り口モデルを読み込みました！");
      }

      function resetAllData() {
        if (!confirm("すべての入力内容をリセットして最初からやり直しますか？")) return;
        state.currentStep = 0;
        state.selectedSlotIndex = 0;
        state.answers = {
          industryFamily: "宿泊・観光・温泉旅館",
          companyWebsiteUrl: "",
          companyName: "月見の湯 翠水亭",
          business: "静かな自然に囲まれた山あいに佇む、全室ペット同伴対応の客室と、100%源泉かけ流し天然温泉、地元の旬の素材を活かした個室会席料理を提供する小さな温泉宿。",
          slots: JSON.parse(JSON.stringify(DEFAULT_SLOTS_DATABASE["宿泊・観光・温泉旅館"])),
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
console.log('Successfully generated dist/index.html with 5 slots framework! Length:', htmlContent.length);

