import { useEffect, useRef, useState } from "react";
import profile from "../../assets/logo11.png";

/* ─────────────────────────────────────────
   STYLES — mobile-first
───────────────────────────────────────── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Cabinet+Grotesk:wght@300;400;500;700;800&family=JetBrains+Mono:wght@400;500&display=swap');

  :root {
    --h-ink:    #0a0a0f;
    --h-fog:    #f5f4f2;
    --h-muted:  #7a7888;
    --h-border: rgba(245,244,242,0.08);
    --h-accent: #ff4f2e;
    --h-blue:   #1a1aff;
    --h-teal:   #00c9a7;
    --h-fd: 'DM Serif Display', serif;
    --h-fb: 'Cabinet Grotesk', sans-serif;
    --h-fm: 'JetBrains Mono', monospace;
    --h-out:    cubic-bezier(0.22,1,0.36,1);
    --h-bounce: cubic-bezier(0.34,1.56,0.64,1);
  }

  *, *::before, *::after { box-sizing: border-box; }

  /* ── SECTION ── */
  .h-section {
    position: relative;
    min-height: 100svh;
    background: var(--h-ink);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    font-family: var(--h-fb);
    -webkit-font-smoothing: antialiased;
  }

  /* noise grain */
  .h-section::before {
    content: '';
    position: absolute; inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
    opacity: 0.025; pointer-events: none; z-index: 0;
  }

  /* ── BG AURA ── */
  .h-aura {
    position: absolute; inset: 0; pointer-events: none; z-index: 0;
    background:
      radial-gradient(ellipse 55% 60% at 35% 50%, rgba(255,79,46,0.08) 0%, transparent 65%),
      radial-gradient(ellipse 45% 50% at 85% 70%, rgba(26,26,255,0.06) 0%, transparent 55%),
      radial-gradient(ellipse 35% 35% at 20% 90%, rgba(0,201,167,0.05) 0%, transparent 55%);
    animation: hAura 16s ease-in-out infinite alternate;
  }
  @keyframes hAura { 0%{opacity:.8} 50%{opacity:1} 100%{opacity:.75} }

  .h-grid {
    position: absolute; inset: 0; pointer-events: none; z-index: 0;
    background-image:
      linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px);
    background-size: 44px 44px;
    animation: hGrid 22s linear infinite;
  }
  @keyframes hGrid { to { background-position: 44px 44px; } }

  .h-particles { position: absolute; inset: 0; pointer-events: none; z-index: 0; overflow: hidden; }
  .h-p { position: absolute; border-radius: 50%; animation: hParticle linear infinite; }
  .h-p:nth-child(1){width:3px;height:3px;background:var(--h-accent);left:10%;top:25%;animation-duration:17s;animation-delay:-3s;opacity:.5}
  .h-p:nth-child(2){width:2px;height:2px;background:var(--h-blue);left:80%;top:18%;animation-duration:21s;animation-delay:-8s;opacity:.4}
  .h-p:nth-child(3){width:4px;height:4px;background:var(--h-teal);left:55%;top:78%;animation-duration:13s;animation-delay:-1s;opacity:.3}
  .h-p:nth-child(4){width:2px;height:2px;background:var(--h-accent);left:38%;top:88%;animation-duration:19s;animation-delay:-12s;opacity:.35}
  .h-p:nth-child(5){width:3px;height:3px;background:var(--h-fog);left:90%;top:58%;animation-duration:15s;animation-delay:-7s;opacity:.15}
  .h-p:nth-child(6){width:2px;height:2px;background:var(--h-blue);left:22%;top:48%;animation-duration:24s;animation-delay:-14s;opacity:.25}
  @keyframes hParticle {
    0%  { transform:translateY(0) translateX(0); opacity:0; }
    10% { opacity:1; }
    90% { opacity:.5; }
    100%{ transform:translateY(-130px) translateX(25px); opacity:0; }
  }

  @keyframes hFadeUp    { from{opacity:0;transform:translateY(28px)}  to{opacity:1;transform:translateY(0)} }
  @keyframes hSlideLeft { from{opacity:0;transform:translateX(-44px)} to{opacity:1;transform:translateX(0)} }
  @keyframes hSlideRight{ from{opacity:0;transform:translateX(44px)}  to{opacity:1;transform:translateX(0)} }

  /* ══════════════════════════════════════
     CONTAINER — mobile (stacked, centered)
  ══════════════════════════════════════ */
  .h-container {
    position: relative; z-index: 2;
    width: 100%;
    max-width: 1160px;
    margin: 0 auto;
    padding: 5.5rem 1.5rem 4.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2.6rem;
  }

  /* ══════════════════════════════════════
     IMAGE SIDE
  ══════════════════════════════════════ */
  .h-image-side {
    display: flex;
    justify-content: center;
    align-items: center;
    animation: hFadeUp 0.85s var(--h-out) 0.1s both;
  }

  .h-frame {
    position: relative;
    width: 230px;
    height: 285px;
    flex-shrink: 0;
  }

  .h-shape-red {
    position: absolute;
    width: 172px; height: 172px;
    background: linear-gradient(135deg, #c83010 0%, #ff4f2e 55%, #c0300e 100%);
    border-radius: 22px;
    top: 8px; left: 0;
    transform: rotate(15deg);
    z-index: 1;
    box-shadow: 0 16px 48px rgba(255,79,46,0.35), inset 0 1px 0 rgba(255,255,255,0.1);
    animation: hBreath1 8s ease-in-out infinite alternate;
  }
  @keyframes hBreath1 {
    0%   { transform:rotate(15deg) scale(1); }
    100% { transform:rotate(17deg) scale(1.025); }
  }

  .h-shape-teal {
    position: absolute;
    width: 148px; height: 148px;
    background: linear-gradient(135deg, #009e85 0%, #00c9a7 55%, #007a68 100%);
    border-radius: 20px;
    bottom: 14px; right: 0;
    transform: rotate(-12deg);
    z-index: 1;
    box-shadow: 0 16px 48px rgba(0,201,167,0.3), inset 0 1px 0 rgba(255,255,255,0.1);
    animation: hBreath2 9s ease-in-out infinite alternate;
  }
  @keyframes hBreath2 {
    0%   { transform:rotate(-12deg) scale(1); }
    100% { transform:rotate(-14.5deg) scale(1.03); }
  }

  .h-shape-overlay {
    position: absolute; inset: 0; z-index: 2;
    background: radial-gradient(ellipse 70% 80% at 55% 50%, transparent 35%, rgba(10,10,15,0.45) 100%);
    pointer-events: none;
  }

  .h-img {
    position: absolute;
    bottom: 0; left: 50%;
    transform: translateX(-50%);
    width: 90%; height: 98%;
    object-fit: cover;
    object-position: top center;
    z-index: 3;
    filter: drop-shadow(0 16px 32px rgba(0,0,0,0.65));
    transition: filter 0.4s ease;
    border-radius: 0;
    display: block;
  }
  .h-frame:hover .h-img {
    filter: drop-shadow(0 20px 44px rgba(0,0,0,0.8));
  }

  /* ── chips — hidden on mobile, visible from 420px ── */
  .h-chip {
    position: absolute; z-index: 10;
    background: rgba(10,10,15,0.88);
    border: 1px solid rgba(245,244,242,0.13);
    border-radius: 12px;
    padding: 8px 11px;
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    display: none;
    align-items: center; gap: 8px;
    white-space: nowrap;
  }
  .h-chip--1 { bottom: 22px; left: -16px; animation: hChip1 5.5s ease-in-out infinite alternate; }
  .h-chip--2 { top: 16px;   right: -16px; animation: hChip2 6.5s ease-in-out infinite alternate; animation-delay:-2.5s; }

  @keyframes hChip1 {
    0%   { transform:translateY(0)    rotate(-1deg);   box-shadow:0 4px 14px rgba(255,79,46,.1); }
    40%  { transform:translateY(-9px)  rotate(.5deg);  box-shadow:0 12px 24px rgba(255,79,46,.22); }
    100% { transform:translateY(-17px) rotate(-.5deg); box-shadow:0 16px 32px rgba(255,79,46,.28); }
  }
  @keyframes hChip2 {
    0%   { transform:translateY(0)     rotate(1deg);   box-shadow:0 4px 14px rgba(26,26,255,.1); }
    40%  { transform:translateY(-11px) rotate(-.8deg); box-shadow:0 14px 26px rgba(26,26,255,.22); }
    100% { transform:translateY(-19px) rotate(0deg);   box-shadow:0 18px 36px rgba(26,26,255,.3); }
  }

  .h-chip-icon {
    width: 28px; height: 28px; border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    font-size: 12px; flex-shrink: 0;
  }
  .h-chip-icon--red  { background: rgba(255,79,46,0.18); }
  .h-chip-icon--blue { background: rgba(26,26,255,0.2); }
  .h-chip-strong {
    display: block; font-family: var(--h-fb);
    font-size: 0.72rem; font-weight: 700;
    color: var(--h-fog); line-height: 1.2;
  }
  .h-chip-sub {
    display: block; font-family: var(--h-fm);
    font-size: 0.57rem; color: var(--h-muted); letter-spacing: 0.04em;
  }

  /* ══════════════════════════════════════
     TEXT CONTENT — centered on mobile
  ══════════════════════════════════════ */
  .h-content {
    width: 100%;
    display: flex; flex-direction: column;
    align-items: center;
    text-align: center;
    animation: hFadeUp 0.85s var(--h-out) 0.25s both;
  }

  .h-eyebrow {
    display: inline-flex; align-items: center; gap: 8px;
    font-family: var(--h-fm); font-size: 0.62rem;
    letter-spacing: 0.16em; text-transform: uppercase;
    color: rgba(255,160,140,0.9);
    border: 1px solid rgba(255,79,46,0.28);
    background: rgba(255,79,46,0.08);
    padding: 5px 13px; border-radius: 100px;
    margin-bottom: 1.2rem;
  }
  .h-eyebrow-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: var(--h-accent);
    box-shadow: 0 0 8px var(--h-accent);
    animation: hDot 2s ease-in-out infinite;
  }
  @keyframes hDot {
    0%,100% { box-shadow:0 0 4px var(--h-accent); transform:scale(1); }
    50%     { box-shadow:0 0 14px var(--h-accent); transform:scale(1.45); }
  }

  .h-heading {
    font-family: var(--h-fd);
    font-size: clamp(2.7rem, 10vw, 5.6rem);
    line-height: 1.02; letter-spacing: -0.025em;
    color: var(--h-fog);
    margin-bottom: 0.6rem;
  }
  .h-heading em {
    font-style: italic;
    background: linear-gradient(135deg, #ff6b47 0%, var(--h-accent) 40%, #ff8a65 75%, #ffb347 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }

  .h-role-row {
    display: flex; align-items: center; justify-content: center; gap: 10px;
    margin-bottom: 1.2rem;
  }
  .h-role-dash {
    width: 20px; height: 1.5px;
    background: linear-gradient(90deg, var(--h-accent), transparent);
    border-radius: 2px; flex-shrink: 0;
  }
  .h-role-text {
    font-family: var(--h-fm);
    font-size: clamp(0.72rem, 3.2vw, 0.92rem);
    color: rgba(245,244,242,0.55); letter-spacing: 0.04em;
    min-height: 1.4em;
  }
  .h-cursor {
    display: inline-block; width: 2px; height: 1em;
    background: var(--h-accent); margin-left: 3px;
    vertical-align: text-bottom; border-radius: 1px;
    animation: hBlink 0.9s step-end infinite;
  }
  @keyframes hBlink { 0%,100%{opacity:1} 50%{opacity:0} }

  .h-desc {
    font-size: clamp(0.86rem, 3.5vw, 1.02rem);
    line-height: 1.85; color: rgba(245,244,242,0.45);
    max-width: 420px; margin-bottom: 1.8rem;
    padding: 0 0.25rem;
  }

  /* ── buttons — stack on phone, row on wider ── */
  .h-btns {
    display: flex; gap: 0.7rem;
    flex-direction: column;
    align-items: stretch;
    width: 100%; max-width: 300px;
    margin-bottom: 2rem;
  }
  .h-btn {
    display: inline-flex; align-items: center; justify-content: center; gap: 8px;
    padding: 0.82rem 1.55rem; border-radius: 10px;
    font-family: var(--h-fb); font-size: 0.9rem; font-weight: 600;
    text-decoration: none; cursor: pointer;
    transition: all 0.35s var(--h-bounce);
    border: 1px solid transparent;
    white-space: nowrap;
  }
  .h-btn-primary {
    background: var(--h-accent); color: #fff;
    box-shadow: 0 4px 20px rgba(255,79,46,0.32);
  }
  .h-btn-primary:hover {
    transform: translateY(-3px) scale(1.03);
    box-shadow: 0 8px 32px rgba(255,79,46,0.52);
  }
  .h-btn-primary svg { transition: transform 0.3s var(--h-bounce); flex-shrink: 0; }
  .h-btn-primary:hover svg { transform: translateX(4px); }
  .h-btn-ghost {
    background: transparent; color: var(--h-fog);
    border-color: rgba(245,244,242,0.18);
  }
  .h-btn-ghost:hover {
    transform: translateY(-3px) scale(1.03);
    background: rgba(245,244,242,0.06);
    border-color: rgba(245,244,242,0.32);
  }

  /* stats */
  .h-stats {
    display: flex; gap: 1.6rem; justify-content: center;
    padding-top: 1.6rem;
    border-top: 1px solid var(--h-border);
    width: 100%;
  }
  .h-stat-num {
    font-family: var(--h-fd); font-size: 1.75rem;
    line-height: 1; color: var(--h-fog); letter-spacing: -0.02em;
    margin-bottom: 4px;
  }
  .h-stat-num em { font-style: italic; color: var(--h-accent); }
  .h-stat-label {
    font-family: var(--h-fm); font-size: 0.55rem;
    letter-spacing: 0.14em; text-transform: uppercase;
    color: var(--h-muted);
  }

  /* scroll cue */
  .h-scroll {
    position: absolute; bottom: 1.4rem; left: 50%;
    transform: translateX(-50%);
    display: flex; flex-direction: column; align-items: center; gap: 6px;
    z-index: 5; animation: hFadeUp 0.7s var(--h-out) 1.2s both;
  }
  .h-scroll-mouse {
    width: 18px; height: 28px;
    border: 1.5px solid rgba(245,244,242,0.18);
    border-radius: 10px;
    display: flex; justify-content: center; padding-top: 4px;
  }
  .h-scroll-wheel {
    width: 2px; height: 6px;
    background: rgba(245,244,242,0.35); border-radius: 2px;
    animation: hWheel 2s ease-in-out infinite;
  }
  @keyframes hWheel {
    0%  { opacity:1; transform:translateY(0); }
    75% { opacity:0; transform:translateY(6px); }
    100%{ opacity:0; transform:translateY(0); }
  }
  .h-scroll-text {
    font-family: var(--h-fm); font-size: 0.52rem;
    letter-spacing: 0.16em; text-transform: uppercase;
    color: rgba(245,244,242,0.18);
  }

  /* ══════════════════════════════════════
     420px — show chips, row buttons
  ══════════════════════════════════════ */
  @media (min-width: 420px) {
    .h-chip { display: flex; }
    .h-btns {
      flex-direction: row;
      align-items: center;
      width: auto; max-width: none;
    }
    .h-btn { flex: 0 0 auto; }
    .h-frame { width: 260px; height: 320px; }
    .h-shape-red  { width: 195px; height: 195px; }
    .h-shape-teal { width: 165px; height: 165px; }
  }

  /* ══════════════════════════════════════
     600px — tablet
  ══════════════════════════════════════ */
  @media (min-width: 600px) {
    .h-frame { width: 300px; height: 370px; }
    .h-shape-red  { width: 225px; height: 225px; }
    .h-shape-teal { width: 190px; height: 190px; }
  }

  /* ══════════════════════════════════════
     900px — DESKTOP: side by side
     image LEFT  |  text RIGHT
  ══════════════════════════════════════ */
  @media (min-width: 900px) {
    .h-container {
      flex-direction: row;
      align-items: center;
      justify-content: center;
      gap: 5rem;
      padding: 6rem 3rem 5rem;
    }

    /* image on the LEFT */
    .h-image-side {
      flex: 0 0 auto;
      animation: hSlideLeft 0.85s var(--h-out) 0.1s both;
    }

    .h-frame { width: 370px; height: 460px; }
    .h-shape-red  { width: 270px; height: 270px; top: 10px; left: -6px; }
    .h-shape-teal { width: 225px; height: 225px; bottom: 20px; right: -10px; }
    .h-chip--1 { display: flex; left: -34px; bottom: 36px; padding: 10px 14px; }
    .h-chip--2 { display: flex; right: -34px; top:  28px; padding: 10px 14px; }
    .h-chip-icon  { width: 32px; height: 32px; font-size: 15px; }
    .h-chip-strong{ font-size: 0.78rem; }
    .h-chip-sub   { font-size: 0.62rem; }

    /* text on the RIGHT */
    .h-content {
      flex: 1;
      min-width: 0;
      align-items: flex-start;
      text-align: left;
      animation: hSlideRight 0.85s var(--h-out) 0.2s both;
    }
    .h-role-row { justify-content: flex-start; }
    .h-btns     { justify-content: flex-start; }
    .h-stats    { justify-content: flex-start; }
    .h-desc     { max-width: 480px; padding: 0; }
  }

  /* ══════════════════════════════════════
     1100px — wide desktop
  ══════════════════════════════════════ */
  @media (min-width: 1100px) {
    .h-container { gap: 7rem; padding: 6rem 4rem 5rem; }
    .h-frame { width: 410px; height: 500px; }
    .h-shape-red  { width: 295px; height: 295px; }
    .h-shape-teal { width: 248px; height: 248px; }
    .h-desc { max-width: 520px; }
  }

  /* ══════════════════════════════════════
     ≤ 380px — small phones
  ══════════════════════════════════════ */
  @media (max-width: 380px) {
    .h-container { padding: 5rem 1.1rem 4rem; gap: 2rem; }
    .h-heading   { font-size: 2.4rem; }
    .h-frame     { width: 200px; height: 250px; }
    .h-shape-red  { width: 150px; height: 150px; }
    .h-shape-teal { width: 128px; height: 128px; }
    .h-chip      { display: none !important; }
    .h-stats     { gap: 1.2rem; }
    .h-stat-num  { font-size: 1.5rem; }
  }

  ::selection { background: rgba(255,79,46,0.3); color: var(--h-fog); }
`;

/* ─────────────────────────────────────────
   HOOKS
───────────────────────────────────────── */
const ROLES = [
  "Full-Stack Engineer",
  "React Specialist",
  "Spring Boot Dev",
  "UI/UX Enthusiast",
  "API Architect",
];

function useTyping(words, typeSpeed = 75, deleteSpeed = 42, pause = 1800) {
  const [text, setText]   = useState("");
  const [wIdx, setWIdx]   = useState(0);
  const [phase, setPhase] = useState("typing");

  useEffect(() => {
    const word = words[wIdx];
    let t;
    if (phase === "typing") {
      if (text.length < word.length) {
        t = setTimeout(
          () => setText(word.slice(0, text.length + 1)),
          typeSpeed + Math.random() * 28
        );
      } else {
        t = setTimeout(() => setPhase("pause"), pause);
      }
    } else if (phase === "pause") {
      t = setTimeout(() => setPhase("deleting"), 180);
    } else {
      if (text.length > 0) {
        t = setTimeout(() => setText(text.slice(0, -1)), deleteSpeed);
      } else {
        setWIdx((i) => (i + 1) % words.length);
        setPhase("typing");
      }
    }
    return () => clearTimeout(t);
  }, [text, wIdx, phase, words, typeSpeed, deleteSpeed, pause]);

  return text;
}

function useCounter(target, duration = 1600, delay = 700) {
  const [val, setVal] = useState(0);
  const startRef      = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => {
      const tick = (ts) => {
        if (!startRef.current) startRef.current = ts;
        const prog  = Math.min((ts - startRef.current) / duration, 1);
        const eased = 1 - Math.pow(1 - prog, 3);
        setVal(Math.round(eased * target));
        if (prog < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay);
    return () => clearTimeout(t);
  }, [target, duration, delay]);

  return val;
}

/* ─────────────────────────────────────────
   COMPONENT
───────────────────────────────────────── */
export default function Hero() {
  const role     = useTyping(ROLES);
  const projects = useCounter(4,  1400, 800);
  const exp      = useCounter(1,  1200, 950);
  const clients  = useCounter(5,  1400, 1100);

  return (
    <section className="h-section" id="home" aria-label="Hero section">
      <style>{css}</style>

      {/* BG layers */}
      <div className="h-aura"      aria-hidden="true" />
      <div className="h-grid"      aria-hidden="true" />
      <div className="h-particles" aria-hidden="true">
        {[0,1,2,3,4,5].map(i => <div key={i} className="h-p" />)}
      </div>

      <div className="h-container">

        {/* ── IMAGE — left on desktop ── */}
        <div className="h-image-side">
          <div className="h-frame">
            <div className="h-shape-red"     aria-hidden="true" />
            <div className="h-shape-teal"    aria-hidden="true" />
            <div className="h-shape-overlay" aria-hidden="true" />

            <img
              src={profile}
              alt="Rohit Jain — Full-Stack Engineer"
              className="h-img"
              loading="eager"
            />

            <div className="h-chip h-chip--1" aria-hidden="true">
              <div className="h-chip-icon h-chip-icon--red">✦</div>
              <div>
                <strong className="h-chip-strong">Open to Work</strong>
                <span className="h-chip-sub">Full-time / Freelance</span>
              </div>
            </div>

            <div className="h-chip h-chip--2" aria-hidden="true">
              <div className="h-chip-icon h-chip-icon--blue">⚡</div>
              <div>
                <strong className="h-chip-strong">React + Spring Boot</strong>
                <span className="h-chip-sub">1+ Years</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── TEXT — right on desktop ── */}
        <div className="h-content">

          <div className="h-eyebrow">
            <span className="h-eyebrow-dot" />
            Available for hire
          </div>

          <h1 className="h-heading">
            Hi, I'm<br /><em>Rohit Jain</em>
          </h1>

          <div className="h-role-row">
            <div className="h-role-dash" aria-hidden="true" />
            <p className="h-role-text" aria-live="polite">
              {role}<span className="h-cursor" aria-hidden="true" />
            </p>
          </div>

          <p className="h-desc">
            I craft modern, responsive, and high-performance web apps using{' '}
            <strong style={{ color: 'var(--h-fog)' }}>React</strong> &amp;{' '}
            <strong style={{ color: 'var(--h-fog)' }}>Spring Boot</strong> —
            built for speed, designed to impress, shipped to production.
          </p>

          <div className="h-btns">
            <a href="#projects" className="h-btn h-btn-primary">
              View Projects
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M1 7h12M7.5 1.5L13 7l-5.5 5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="#contact" className="h-btn h-btn-ghost">
              Contact Me
            </a>
          </div>

          <div className="h-stats" aria-label="Quick stats">
            <div>
              <div className="h-stat-num">{projects}<em>+</em></div>
              <div className="h-stat-label">Projects</div>
            </div>
            <div>
              <div className="h-stat-num">{exp}<em>+</em></div>
              <div className="h-stat-label">Years Exp.</div>
            </div>
            <div>
              <div className="h-stat-num">{clients}<em>+</em></div>
              <div className="h-stat-label">Clients</div>
            </div>
          </div>

        </div>
      </div>

      <div className="h-scroll" aria-hidden="true">
        <div className="h-scroll-mouse"><div className="h-scroll-wheel" /></div>
        <span className="h-scroll-text">Scroll</span>
      </div>

    </section>
  );
}