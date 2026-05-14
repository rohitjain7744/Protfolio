import { useEffect, useRef, useState } from 'react';

/* ─────────────────────────────────────────
   STYLES
───────────────────────────────────────── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Cabinet+Grotesk:wght@300;400;500;700;800&family=JetBrains+Mono:wght@400;500&display=swap');

  :root {
    --ex-ink:    #0a0a0f;
    --ex-ink2:   #0f0e1a;
    --ex-fog:    #f5f4f2;
    --ex-muted:  #7a7888;
    --ex-border: rgba(245,244,242,0.08);
    --ex-accent: #ff4f2e;
    --ex-blue:   #1a1aff;
    --ex-teal:   #00c9a7;
    --ex-fd: 'DM Serif Display', serif;
    --ex-fb: 'Cabinet Grotesk', sans-serif;
    --ex-fm: 'JetBrains Mono', monospace;
    --ex-out:    cubic-bezier(0.22,1,0.36,1);
    --ex-bounce: cubic-bezier(0.34,1.56,0.64,1);
  }

  *, *::before, *::after { box-sizing: border-box; }

  /* ── SECTION ── */
  .ex-section {
    position: relative;
    background: var(--ex-ink);
    color: var(--ex-fog);
    font-family: var(--ex-fb);
    overflow: hidden;
    -webkit-font-smoothing: antialiased;
    padding: 6rem 0 5rem;
  }

  /* noise */
  .ex-section::before {
    content: '';
    position: absolute; inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
    opacity: 0.025; pointer-events: none; z-index: 0;
  }

  .ex-aura {
    position: absolute; inset: 0; pointer-events: none; z-index: 0;
    background:
      radial-gradient(ellipse 55% 55% at 90% 10%, rgba(255,79,46,0.07) 0%, transparent 60%),
      radial-gradient(ellipse 45% 40% at 5%  85%, rgba(26,26,255,0.06) 0%, transparent 55%),
      radial-gradient(ellipse 35% 35% at 50% 55%, rgba(0,201,167,0.04) 0%, transparent 60%);
  }

  .ex-grid-bg {
    position: absolute; inset: 0; pointer-events: none; z-index: 0;
    background-image:
      linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
    background-size: 40px 40px;
    mask-image: radial-gradient(ellipse 85% 85% at 50% 50%, black 20%, transparent 100%);
  }

  /* ── WRAP ── */
  .ex-wrap {
    position: relative; z-index: 2;
    max-width: 1100px; margin: 0 auto;
    padding: 0 1.4rem;
  }

  /* ── HEADER ── */
  .ex-header {
    text-align: center;
    margin-bottom: 4rem;
  }

  .ex-eyebrow {
    display: inline-flex; align-items: center; gap: 8px;
    font-family: var(--ex-fm); font-size: 0.65rem;
    letter-spacing: 0.16em; text-transform: uppercase;
    color: rgba(255,160,140,0.85);
    border: 1px solid rgba(255,79,46,0.28);
    background: rgba(255,79,46,0.08);
    padding: 5px 13px; border-radius: 100px;
    margin-bottom: 1.4rem;
  }
  .ex-eyebrow-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: var(--ex-accent);
    box-shadow: 0 0 8px var(--ex-accent);
    animation: exDot 2s ease-in-out infinite;
  }
  @keyframes exDot {
    0%,100% { box-shadow:0 0 4px var(--ex-accent); transform:scale(1); }
    50%     { box-shadow:0 0 14px var(--ex-accent); transform:scale(1.45); }
  }

  .ex-h2 {
    font-family: var(--ex-fd);
    font-size: clamp(2.5rem, 6vw, 4.8rem);
    line-height: 1.0; letter-spacing: -0.025em;
    color: var(--ex-fog); margin: 0 0 1rem;
  }
  .ex-h2 em {
    font-style: italic;
    background: linear-gradient(135deg, #ff6b47 0%, var(--ex-accent) 40%, #ff8a65 75%, #ffb347 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }

  .ex-subtitle {
    font-size: clamp(0.9rem, 2vw, 1rem);
    color: rgba(245,244,242,0.42); line-height: 1.7;
    max-width: 460px; margin: 0 auto;
  }

  /* ── DIVIDER ── */
  .ex-divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--ex-accent), transparent);
    opacity: 0.18; margin: 0 0 4rem;
  }

  /* ─────────────────────────────────────────
     BENTO GRID
  ───────────────────────────────────────── */
  .ex-bento {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  /* ── BASE CARD ── */
  .ex-card {
    position: relative;
    background: rgba(245,244,242,0.025);
    border: 1px solid var(--ex-border);
    border-radius: 20px;
    padding: 2rem 1.8rem;
    overflow: hidden;
    transition: border-color 0.35s ease, background 0.35s ease;
    cursor: default;

    /* scroll reveal */
    opacity: 0;
    transform: translateY(28px);
    transition:
      opacity 0.7s var(--ex-out),
      transform 0.7s var(--ex-out),
      border-color 0.35s ease,
      background 0.35s ease;
  }
  .ex-card.ex-visible {
    opacity: 1;
    transform: translateY(0);
  }
  .ex-card:hover {
    border-color: rgba(245,244,242,0.16);
    background: rgba(245,244,242,0.04);
  }

  /* accent left border sweep on hover */
  .ex-card::after {
    content: '';
    position: absolute; left: 0; top: 0; bottom: 0;
    width: 3px;
    background: var(--card-accent, var(--ex-accent));
    transform: scaleY(0); transform-origin: top;
    transition: transform 0.45s var(--ex-out);
    border-radius: 3px 0 0 3px;
  }
  .ex-card:hover::after { transform: scaleY(1); }

  /* shimmer */
  .ex-card::before {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.025) 50%, transparent 60%);
    animation: exShimmer 8s ease-in-out infinite;
    pointer-events: none; z-index: 0;
  }
  @keyframes exShimmer {
    0%       { transform: translateX(-120%); }
    55%,100% { transform: translateX(220%); }
  }

  /* card inner z-index */
  .ex-card > * { position: relative; z-index: 1; }

  /* ── NUMBER ── */
  .ex-num {
    display: block;
    font-family: var(--ex-fm); font-size: 0.58rem;
    letter-spacing: 0.2em; text-transform: uppercase;
    color: var(--card-accent, var(--ex-accent));
    opacity: 0.7; margin-bottom: 1rem;
  }

  /* ── CARD HEADING ── */
  .ex-card h3 {
    font-family: var(--ex-fd);
    font-size: clamp(1.2rem, 2.5vw, 1.55rem);
    line-height: 1.1; color: var(--ex-fog);
    margin: 0 0 0.8rem; letter-spacing: -0.01em;
  }

  /* ── CARD BODY TEXT ── */
  .ex-card p {
    font-size: 0.9rem; line-height: 1.8;
    color: rgba(245,244,242,0.46);
    margin: 0;
  }
  .ex-card p strong { color: var(--ex-fog); font-weight: 700; }

  /* ── PILL TAG ── */
  .ex-pill {
    display: inline-flex; align-items: center; gap: 6px;
    font-family: var(--ex-fm); font-size: 0.6rem;
    letter-spacing: 0.1em; text-transform: uppercase;
    padding: 5px 12px; border-radius: 100px;
    border: 1px solid var(--ex-border);
    color: var(--ex-muted);
    margin-top: 1.2rem;
    transition: border-color 0.3s, color 0.3s;
  }
  .ex-card:hover .ex-pill {
    border-color: rgba(245,244,242,0.2);
    color: rgba(245,244,242,0.7);
  }
  .ex-pill::before {
    content: '';
    width: 5px; height: 5px; border-radius: 50%;
    background: var(--card-accent, var(--ex-accent));
    opacity: 0.7;
  }

  /* ─────────────────────────────────────────
     CARD VARIANTS
  ───────────────────────────────────────── */

  /* CARD 1 — wide with abstract visual */
  .ex-card--wide {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .ex-abstract {
    width: 100%; height: 100px;
    border-radius: 14px;
    background: linear-gradient(135deg,
      rgba(255,79,46,0.12) 0%,
      rgba(26,26,255,0.08) 50%,
      rgba(0,201,167,0.06) 100%
    );
    border: 1px solid var(--ex-border);
    display: flex; align-items: center; justify-content: center;
    overflow: hidden; position: relative;
    flex-shrink: 0;
  }
  /* animated lines inside abstract */
  .ex-abstract::before {
    content: '';
    position: absolute; inset: 0;
    background:
      repeating-linear-gradient(
        90deg,
        transparent,
        transparent 38px,
        rgba(255,79,46,0.08) 38px,
        rgba(255,79,46,0.08) 40px
      );
    animation: exLineScroll 6s linear infinite;
  }
  .ex-abstract::after {
    content: '</>';
    font-family: var(--ex-fm); font-size: 1.3rem;
    color: rgba(255,79,46,0.5);
    letter-spacing: 0.05em;
    position: relative; z-index: 1;
    text-shadow: 0 0 20px rgba(255,79,46,0.4);
    animation: exGlow 3s ease-in-out infinite alternate;
  }
  @keyframes exLineScroll { from{background-position:0 0} to{background-position:40px 0} }
  @keyframes exGlow {
    0%   { text-shadow:0 0 10px rgba(255,79,46,0.3); opacity:0.6; }
    100% { text-shadow:0 0 28px rgba(255,79,46,0.7); opacity:1; }
  }

  /* CARD 4 — impact / accent card */
  .ex-card--impact {
    background: linear-gradient(135deg,
      rgba(255,79,46,0.07) 0%,
      rgba(245,244,242,0.025) 50%,
      rgba(26,26,255,0.05) 100%
    );
  }

  .ex-avail-strip {
    display: inline-flex; align-items: center; gap: 8px;
    font-family: var(--ex-fm); font-size: 0.62rem;
    letter-spacing: 0.1em; text-transform: uppercase;
    color: rgba(100,220,190,0.85);
    background: rgba(0,201,167,0.08);
    border: 1px solid rgba(0,201,167,0.22);
    padding: 7px 14px; border-radius: 100px;
    margin-top: 1.4rem;
  }
  .ex-avail-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: var(--ex-teal);
    box-shadow: 0 0 8px var(--ex-teal);
    animation: exDot 2.2s ease-in-out infinite;
  }

  /* SECURITY CARD — shield icon */
  .ex-shield {
    width: 44px; height: 44px; border-radius: 12px;
    background: rgba(26,26,255,0.12);
    border: 1px solid rgba(26,26,255,0.25);
    display: flex; align-items: center; justify-content: center;
    font-size: 20px; margin-bottom: 1rem;
    transition: transform 0.3s var(--ex-bounce);
  }
  .ex-card:hover .ex-shield { transform: scale(1.1) rotate(-4deg); }

  /* LEARNING CARD — orbit icon */
  .ex-orbit {
    width: 44px; height: 44px; border-radius: 12px;
    background: rgba(0,201,167,0.1);
    border: 1px solid rgba(0,201,167,0.22);
    display: flex; align-items: center; justify-content: center;
    font-size: 20px; margin-bottom: 1rem;
    transition: transform 0.3s var(--ex-bounce);
  }
  .ex-card:hover .ex-orbit { transform: scale(1.1) rotate(8deg); }

  /* ── STATS ROW (bottom) ── */
  .ex-stats-row {
    display: flex; flex-wrap: wrap; gap: 1px;
    margin-top: 1rem;
    border: 1px solid var(--ex-border);
    border-radius: 16px; overflow: hidden;
  }

  .ex-stat-box {
    flex: 1 1 120px;
    background: rgba(245,244,242,0.02);
    padding: 1.4rem 1.2rem;
    text-align: center;
    transition: background 0.3s;

    opacity: 0; transform: translateY(20px);
    transition:
      opacity 0.6s var(--ex-out),
      transform 0.6s var(--ex-out),
      background 0.3s;
  }
  .ex-stat-box.ex-visible {
    opacity: 1; transform: translateY(0);
  }
  .ex-stat-box:hover { background: rgba(245,244,242,0.05); }

  .ex-stat-num {
    font-family: var(--ex-fd); font-size: 2rem;
    color: var(--ex-fog); line-height: 1;
    margin-bottom: 4px; letter-spacing: -0.02em;
  }
  .ex-stat-num em { font-style: italic; color: var(--ex-accent); }

  .ex-stat-label {
    font-family: var(--ex-fm); font-size: 0.58rem;
    letter-spacing: 0.14em; text-transform: uppercase;
    color: var(--ex-muted);
  }

  /* ─────────────────────────────────────────
     TABLET  ≥ 640px
  ───────────────────────────────────────── */
  @media (min-width: 640px) {
    .ex-wrap { padding: 0 2rem; }
    .ex-bento {
      grid-template-columns: 1fr 1fr;
    }
    .ex-card--wide    { grid-column: span 2; }
    .ex-card--impact  { grid-column: span 2; }
    .ex-abstract      { height: 120px; }
  }

  /* ─────────────────────────────────────────
     DESKTOP  ≥ 960px
  ───────────────────────────────────────── */
  @media (min-width: 960px) {
    .ex-bento {
      grid-template-columns: 1.6fr 1fr 1fr;
      grid-template-rows: auto auto;
      gap: 1.2rem;
    }
    /* card 1 — tall left column */
    .ex-card--mindset {
      grid-column: 1;
      grid-row: 1 / 3;
      display: flex; flex-direction: column;
    }
    /* card 2 — top middle */
    .ex-card--security  { grid-column: 2; grid-row: 1; }
    /* card 3 — top right */
    .ex-card--learning  { grid-column: 3; grid-row: 1; }
    /* card 4 — bottom right 2 cols */
    .ex-card--impact    { grid-column: 2 / 4; grid-row: 2; }

    /* taller abstract in tall card */
    .ex-card--mindset .ex-abstract { flex: 1; max-height: 180px; }

    /* reset span from tablet */
    .ex-card--wide   { grid-column: unset; }
  }

  /* ─────────────────────────────────────────
     SMALL PHONE  ≤ 380px
  ───────────────────────────────────────── */
  @media (max-width: 380px) {
    .ex-section  { padding: 4rem 0 3rem; }
    .ex-h2       { font-size: 2.3rem; }
    .ex-card     { padding: 1.6rem 1.4rem; }
    .ex-stat-num { font-size: 1.6rem; }
  }

  ::selection { background: rgba(255,79,46,0.3); color: var(--ex-fog); }
`;

/* ─────────────────────────────────────────
   REVEAL HOOK
───────────────────────────────────────── */
function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function Reveal({ children, delay = 0, className = '', style = {} }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`${className} ${visible ? 'ex-visible' : ''}`}
      style={{ transitionDelay: `${delay}s`, ...style }}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────
   COMPONENT
───────────────────────────────────────── */
export default function Mindset() {
  return (
    <section className="ex-section" id="philosophy" aria-label="Philosophy section">
      <style>{css}</style>
      <div className="ex-aura"    aria-hidden="true" />
      <div className="ex-grid-bg" aria-hidden="true" />

      <div className="ex-wrap">

        {/* ── HEADER ── */}
        <Reveal className="ex-header">
          <div className="ex-eyebrow">
            <span className="ex-eyebrow-dot" />
            Philosophy
          </div>
          <h2 className="ex-h2">
            The Professional <em>Edge</em>
          </h2>
          <p className="ex-subtitle">
            Beyond syntax and semicolons — it's about building solutions that last.
          </p>
        </Reveal>

        <div className="ex-divider" />

        {/* ── BENTO GRID ── */}
        <div className="ex-bento">

          {/* CARD 1 — Mindset (tall / wide) */}
          <Reveal
            className="ex-card ex-card--mindset ex-card--wide"
            delay={0}
            style={{ '--card-accent': '#ff4f2e' }}
          >
            <div>
              <span className="ex-num">01</span>
              <h3>Mindset Over Metadata</h3>
              <p>
                Tech stacks evolve, but the logic remains. I approach every project with a{' '}
                <strong>"Problem-First"</strong> attitude — ensuring the architecture solves
                the core business need before a single line of code is written.
              </p>
              <div className="ex-pill">Architecture thinking</div>
            </div>
            <div className="ex-abstract" aria-hidden="true" />
          </Reveal>

          {/* CARD 2 — Security */}
          <Reveal
            className="ex-card ex-card--security"
            delay={0.08}
            style={{ '--card-accent': '#1a1aff' }}
          >
            <div className="ex-shield" aria-hidden="true">🔐</div>
            <span className="ex-num">02</span>
            <h3>Security by Default</h3>
            <p>
              From <strong>JWT</strong> in NovaHire to secure API design, I
              prioritise data integrity following OWASP standards at every layer.
            </p>
            <div className="ex-pill">Enterprise standards</div>
          </Reveal>

          {/* CARD 3 — Learning */}
          <Reveal
            className="ex-card ex-card--learning"
            delay={0.14}
            style={{ '--card-accent': '#00c9a7' }}
          >
            <div className="ex-orbit" aria-hidden="true">🚀</div>
            <span className="ex-num">03</span>
            <h3>Continuous Evolution</h3>
            <p>
              I don't just learn languages — I master ecosystems. Staying ahead in{' '}
              <strong>MERN</strong> and <strong>Java Cloud Native</strong> development.
            </p>
            <div className="ex-pill">Growth mindset</div>
          </Reveal>

          {/* CARD 4 — Impact */}
          <Reveal
            className="ex-card ex-card--impact"
            delay={0.2}
            style={{ '--card-accent': '#ff4f2e' }}
          >
            <span className="ex-num">04</span>
            <h3>Engineering for Impact</h3>
            <p>
              Whether it's a B2B chemical catalog or a recruitment platform serving
              real users, I build products that create <strong>tangible value</strong> for
              users and stakeholders alike — shipped to production, not just to GitHub.
            </p>
            <div className="ex-avail-strip">
              <span className="ex-avail-dot" />
              Available for global opportunities
            </div>
          </Reveal>

        </div>

        {/* ── STATS ROW ── */}
        <div className="ex-stats-row" role="list" aria-label="Key stats">
          {[
            { num: '30', suffix: '+', label: 'Projects Built' },
            { num: '3',  suffix: '+', label: 'Years Experience' },
            { num: '15', suffix: '+', label: 'Clients Served' },
            { num: '4',  suffix: '',  label: 'Tech Stacks' },
          ].map((s, i) => (
            <Reveal
              key={s.label}
              className="ex-stat-box"
              delay={i * 0.07}
              style={{ transitionDelay: `${i * 0.07}s` }}
            >
              <div className="ex-stat-num">
                {s.num}<em>{s.suffix}</em>
              </div>
              <div className="ex-stat-label">{s.label}</div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}