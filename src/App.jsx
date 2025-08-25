:root { --white: #fff; --green:#22c55e; --red:#ef4444; }

* { box-sizing: border-box; }
body, html, #root { height: 100%; margin: 0; font-family: system-ui, Arial, sans-serif; }

/* Главная с фоном микрофона */
.hero {
  height: 100%;
  background: url("/background-mic.jpg") center/cover no-repeat;
  display: grid;
  place-items: center;
  position: relative;
}
.hero::after {
  content:""; position:absolute; inset:0; background:rgba(0,0,0,.45);
}
.overlay {
  position: relative; z-index: 1;
  background: rgba(0,0,0,.55);
  color: var(--white);
  padding: 28px; border-radius: 16px; width: min(720px, 92vw);
  text-align: center;
}
.overlay h1 { margin: 0 0 12px; }
.desc { opacity:.95; margin: 0 0 18px; }
.question { font-weight: 600; margin-bottom: 12px; }
.btns { display:flex; gap:12px; justify-content:center; flex-wrap:wrap; }
button { cursor:pointer; border:none; padding:10px 16px; border-radius:10px; color:#fff; font-weight:600; }
.yes { background: var(--green); }
.no { background: var(--red); }

/* Внутренние страницы */
.page { padding: 20px; max-width: 820px; margin: 0 auto; }
.row { display:flex; gap:8px; margin-top:8px; }
.row input { flex:1; padding:10px; border:1px solid #ddd; border-radius:8px; }

/* Чат */
.chatbox {
  border:1px solid #eee; border-radius:12px; padding:12px; min-height:260px; margin:12px 0;
  display:flex; flex-direction:column; gap:8px;
}
.bubble {
  max-width: 80%; padding:10px 12px; border-radius:12px; line-height:1.35;
}
.bubble.user { align-self:flex-end; background:#d1fae5; }
.bubble.bot  { align-self:flex-start; background:#f3f4f6; }
