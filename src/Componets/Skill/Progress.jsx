  import { useEffect, useRef, useState } from 'react';

  /* ─────────────────────────────────────────
    DATA
  ───────────────────────────────────────── */
  const SERVICES = [
    {
      id: 1,
      title: 'Full-Stack Development',
      desc: 'End-to-end scalable web applications built with MERN and Spring Boot architecture — from schema design to cloud deployment.',
      icon: '🚀',
      accent: '#ff4f2e',
      num: '01',
      features: ['Custom Web Apps', 'Performance Optimisation', 'Cloud Deployment'],
    },
    {
      id: 2,
      title: 'Secure API Architecture',
      desc: 'Robust RESTful APIs with JWT authentication, role-based access control, and OWASP-compliant security practices.',
      icon: '🛡️',
      accent: '#1a1aff',
      num: '02',
      features: ['OAuth / JWT Security', 'Third-party Integration', 'Database Design'],
    },
    {
      id: 3,
      title: 'Real-time Dashboards',
      desc: 'Interactive monitoring systems with automated alerts, live data feeds, and real-time visualisation for critical operations.',
      icon: '📊',
      accent: '#00c9a7',
      num: '03',
      features: ['Health Monitoring', 'Live Data Feeds', 'Automated Alerting'],
    },
    {
      id: 4,
      title: 'B2B Digital Solutions',
      desc: 'Tailored platforms for industries — from chemical product catalogs to agricultural machinery e-commerce with dealer flows.',
      icon: '💼',
      accent: '#f59e0b',
      num: '04',
      features: ['Inventory Management', 'Client Portals', 'Advanced Filtering'],
    },
  ];

  /* ─────────────────────────────────────────
    STYLES
  ───────────────────────────────────────── */
  const css = `
    @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Cabinet+Grotesk:wght@300;400;500;700;800&family=JetBrains+Mono:wght@400;500&display=swap');

    :root {
      --sv-ink:    #0a0a0f;
      --sv-fog:    #f5f4f2;
      --sv-muted:  #7a7888;
      --sv-border: rgba(245,244,242,0.08);
      --sv-accent: #ff4f2e;
      --sv-fd: 'DM Serif Display', serif;
      --sv-fb: 'Cabinet Grotesk', sans-serif;
      --sv-fm: 'JetBrains Mono', monospace;
      --sv-out:    cubic-bezier(0.22,1,0.36,1);
      --sv-bounce: cubic-bezier(0.34,1.56,0.64,1);
    }

    *, *::before, *::after { box-sizing: border-box; }

    /* ── SECTION ── */
    .sv-section {
      position: relative;
      background: var(--sv-ink);
      color: var(--sv-fog);
      font-family: var(--sv-fb);
      overflow: hidden;
      -webkit-font-smoothing: antialiased;
      padding: 6rem 0 5rem;
    }

    /* noise */
    .sv-section::before {
      content: '';
      position: absolute; inset: 0;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
      opacity: 0.025; pointer-events: none; z-index: 0;
    }

    .sv-aura {
      position: absolute; inset: 0; pointer-events: none; z-index: 0;
      background:
        radial-gradient(ellipse 55% 55% at 90% 10%, rgba(255,79,46,0.07) 0%, transparent 60%),
        radial-gradient(ellipse 45% 40% at 5%  85%, rgba(26,26,255,0.06) 0%, transparent 55%),
        radial-gradient(ellipse 35% 35% at 50% 55%, rgba(0,201,167,0.04) 0%, transparent 60%);
    }

    .sv-grid-bg {
      position: absolute; inset: 0; pointer-events: none; z-index: 0;
      background-image:
        linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
      background-size: 40px 40px;
      mask-image: radial-gradient(ellipse 85% 85% at 50% 50%, black 20%, transparent 100%);
    }

    /* ── WRAP ── */
    .sv-wrap {
      position: relative; z-index: 2;
      max-width: 1100px; margin: 0 auto;
      padding: 0 1.4rem;
    }

    /* ── HEADER ── */
    .sv-header { margin-bottom: 4rem; }

    .sv-eyebrow {
      display: inline-flex; align-items: center; gap: 8px;
      font-family: var(--sv-fm); font-size: 0.65rem;
      letter-spacing: 0.16em; text-transform: uppercase;
      color: rgba(255,160,140,0.85);
      border: 1px solid rgba(255,79,46,0.28);
      background: rgba(255,79,46,0.08);
      padding: 5px 13px; border-radius: 100px;
      margin-bottom: 1.4rem;
    }
    .sv-eyebrow-dot {
      width: 6px; height: 6px; border-radius: 50%;
      background: var(--sv-accent);
      box-shadow: 0 0 8px var(--sv-accent);
      animation: svDot 2s ease-in-out infinite;
    }
    @keyframes svDot {
      0%,100% { box-shadow:0 0 4px var(--sv-accent); transform:scale(1); }
      50%     { box-shadow:0 0 14px var(--sv-accent); transform:scale(1.45); }
    }

    .sv-h2 {
      font-family: var(--sv-fd);
      font-size: clamp(2.5rem, 6vw, 4.8rem);
      line-height: 1.0; letter-spacing: -0.025em;
      color: var(--sv-fog); margin: 0 0 1rem;
    }
    .sv-h2 em {
      font-style: italic;
      background: linear-gradient(135deg,#ff6b47 0%,var(--sv-accent) 40%,#ff8a65 75%,#ffb347 100%);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    }

    .sv-sub {
      font-size: clamp(0.88rem,2vw,1rem);
      color: rgba(245,244,242,0.42); line-height: 1.7;
      max-width: 460px;
    }

    /* ── DIVIDER ── */
    .sv-divider {
      height: 1px;
      background: linear-gradient(90deg, var(--sv-accent), transparent);
      opacity: 0.18; margin: 0 0 4rem;
    }

    /* ─────────────────────────────────────────
      GRID
    ───────────────────────────────────────── */
    .sv-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1rem;
    }

    /* ── CARD ── */
    .sv-card {
      position: relative;
      background: rgba(245,244,242,0.025);
      border: 1px solid var(--sv-border);
      border-radius: 20px;
      padding: 2rem 1.8rem;
      overflow: hidden;
      transition:
        border-color 0.35s ease,
        background 0.35s ease,
        transform 0.35s var(--sv-bounce);

      /* reveal */
      opacity: 0;
      transform: translateY(32px);
    }
    .sv-card.sv-in {
      opacity: 1; transform: translateY(0);
    }
    .sv-card:hover {
      border-color: rgba(245,244,242,0.18);
      background: rgba(245,244,242,0.045);
      transform: translateY(-4px);
    }

    /* glow accent on hover */
    .sv-card::after {
      content: '';
      position: absolute; inset: 0; border-radius: 20px;
      background: radial-gradient(
        ellipse 60% 50% at 50% 100%,
        color-mix(in srgb, var(--card-accent, #ff4f2e) 12%, transparent),
        transparent 70%
      );
      opacity: 0; transition: opacity 0.5s ease;
      pointer-events: none; z-index: 0;
    }
    .sv-card:hover::after { opacity: 1; }

    /* top accent bar */
    .sv-card::before {
      content: '';
      position: absolute; top: 0; left: 0; right: 0;
      height: 2px;
      background: linear-gradient(90deg,
        var(--card-accent, var(--sv-accent)),
        transparent
      );
      transform: scaleX(0); transform-origin: left;
      transition: transform 0.45s var(--sv-out);
      border-radius: 20px 20px 0 0;
    }
    .sv-card:hover::before { transform: scaleX(1); }

    /* shimmer */
    .sv-shimmer {
      position: absolute; inset: 0; z-index: 0;
      background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.022) 50%, transparent 60%);
      animation: svShimmer 9s ease-in-out infinite;
      pointer-events: none;
    }
    @keyframes svShimmer {
      0%       { transform: translateX(-120%); }
      55%,100% { transform: translateX(220%); }
    }

    /* keep content above pseudo-elements */
    .sv-card > *:not(.sv-shimmer) { position: relative; z-index: 1; }

    /* ── ICON BOX ── */
    .sv-icon-wrap {
      display: flex; align-items: center; gap: 12px;
      margin-bottom: 1.2rem;
    }
    .sv-icon-box {
      width: 48px; height: 48px; border-radius: 14px;
      background: color-mix(in srgb, var(--card-accent, #ff4f2e) 12%, transparent);
      border: 1px solid color-mix(in srgb, var(--card-accent, #ff4f2e) 28%, transparent);
      display: flex; align-items: center; justify-content: center;
      font-size: 22px; flex-shrink: 0;
      transition: transform 0.35s var(--sv-bounce), box-shadow 0.35s ease;
    }
    .sv-card:hover .sv-icon-box {
      transform: scale(1.1) rotate(-6deg);
      box-shadow: 0 8px 24px color-mix(in srgb, var(--card-accent,#ff4f2e) 30%, transparent);
    }
    .sv-num {
      font-family: var(--sv-fm); font-size: 0.58rem;
      letter-spacing: 0.2em; text-transform: uppercase;
      color: var(--card-accent, var(--sv-accent));
      opacity: 0.65;
    }

    /* ── TITLE ── */
    .sv-title {
      font-family: var(--sv-fd);
      font-size: clamp(1.15rem, 2.5vw, 1.45rem);
      line-height: 1.15; color: var(--sv-fog);
      margin: 0 0 0.75rem; letter-spacing: -0.01em;
    }

    /* ── DESC ── */
    .sv-desc {
      font-size: 0.88rem; line-height: 1.8;
      color: rgba(245,244,242,0.44);
      margin: 0 0 1.3rem;
    }

    /* ── FEATURE LIST ── */
    .sv-features {
      list-style: none; margin: 0; padding: 0;
      display: flex; flex-direction: column; gap: 7px;
      border-top: 1px solid var(--sv-border);
      padding-top: 1.1rem;
    }
    .sv-feature {
      display: flex; align-items: center; gap: 9px;
      font-family: var(--sv-fm); font-size: 0.68rem;
      letter-spacing: 0.05em; text-transform: uppercase;
      color: var(--sv-muted);
      transition: color 0.25s;
    }
    .sv-card:hover .sv-feature { color: rgba(245,244,242,0.6); }
    .sv-feature-dot {
      width: 5px; height: 5px; border-radius: 50%;
      background: var(--card-accent, var(--sv-accent));
      opacity: 0.7; flex-shrink: 0;
      transition: opacity 0.25s, box-shadow 0.25s;
    }
    .sv-card:hover .sv-feature-dot {
      opacity: 1;
      box-shadow: 0 0 6px var(--card-accent, var(--sv-accent));
    }

    /* ─────────────────────────────────────────
      BOTTOM CTA STRIP
    ───────────────────────────────────────── */
    .sv-cta {
      margin-top: 3.5rem;
      padding: 2.2rem 2rem;
      border: 1px solid var(--sv-border);
      border-radius: 20px;
      background: rgba(245,244,242,0.02);
      display: flex;
      flex-direction: column;
      gap: 1.4rem;
      align-items: flex-start;
      position: relative; overflow: hidden;

      opacity: 0; transform: translateY(28px);
      transition: opacity 0.75s var(--sv-out), transform 0.75s var(--sv-out),
                  border-color 0.3s;
    }
    .sv-cta.sv-in { opacity: 1; transform: translateY(0); }
    .sv-cta:hover { border-color: rgba(245,244,242,0.16); }

    /* shimmer on cta */
    .sv-cta::after {
      content: '';
      position: absolute; inset: 0;
      background: linear-gradient(105deg,transparent 40%,rgba(255,255,255,0.025) 50%,transparent 60%);
      animation: svShimmer 7s ease-in-out infinite;
      pointer-events: none;
    }

    .sv-cta-text { position: relative; z-index: 1; }

    .sv-cta-h3 {
      font-family: var(--sv-fd);
      font-size: clamp(1.4rem,3vw,2rem);
      line-height: 1.1; color: var(--sv-fog);
      margin: 0 0 6px;
    }
    .sv-cta-h3 em {
      font-style: italic;
      background: linear-gradient(135deg,#ff6b47,var(--sv-accent),#ff8a65);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    }
    .sv-cta-sub {
      font-family: var(--sv-fm); font-size: 0.68rem;
      letter-spacing: 0.1em; text-transform: uppercase;
      color: var(--sv-muted);
    }

    .sv-cta-btn {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 0.88rem 1.8rem; border-radius: 10px;
      font-family: var(--sv-fb); font-size: 0.92rem; font-weight: 700;
      text-decoration: none; color: #fff;
      background: var(--sv-accent);
      box-shadow: 0 4px 22px rgba(255,79,46,0.32);
      border: none; cursor: pointer;
      transition: all 0.35s var(--sv-bounce);
      position: relative; z-index: 1;
    }
    .sv-cta-btn:hover {
      transform: translateY(-3px) scale(1.03);
      box-shadow: 0 8px 34px rgba(255,79,46,0.52);
    }
    .sv-cta-btn svg { width:14px; height:14px; transition:transform 0.3s var(--sv-bounce); }
    .sv-cta-btn:hover svg { transform:translateX(4px) translateY(-2px); }

    /* ─────────────────────────────────────────
      TABLET  ≥ 600px  — 2 cols
    ───────────────────────────────────────── */
    @media (min-width: 600px) {
      .sv-wrap { padding: 0 2rem; }
      .sv-grid { grid-template-columns: 1fr 1fr; gap: 1.1rem; }
      .sv-cta {
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
      }
    }

    /* ─────────────────────────────────────────
      DESKTOP  ≥ 960px  — 4 cols
    ───────────────────────────────────────── */
    @media (min-width: 960px) {
      .sv-grid { grid-template-columns: repeat(4, 1fr); gap: 1.2rem; }
      .sv-card { padding: 2.2rem 1.8rem; }
    }

    /* ─────────────────────────────────────────
      SMALL PHONE  ≤ 380px
    ───────────────────────────────────────── */
    @media (max-width: 380px) {
      .sv-section { padding: 4rem 0 3rem; }
      .sv-h2 { font-size: 2.3rem; }
      .sv-card { padding: 1.6rem 1.4rem; }
    }

    ::selection { background: rgba(255,79,46,0.3); color: var(--sv-fog); }
  `;

  /* ─────────────────────────────────────────
    REVEAL HOOK
  ───────────────────────────────────────── */
  function useReveal(threshold = 0.1) {
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

  /* ─────────────────────────────────────────
    COMPONENT
  ───────────────────────────────────────── */
  export default function Services() {
    return (
      <section className="sv-section" id="services" aria-label="Services section">
        <style>{css}</style>
        <div className="sv-aura"    aria-hidden="true" />
        <div className="sv-grid-bg" aria-hidden="true" />

        <div className="sv-wrap">

          {/* ── HEADER ── */}
          <RevealDiv className="sv-header" delay={0}>
            <div className="sv-eyebrow">
              <span className="sv-eyebrow-dot" />
              Expertise
            </div>
            <h2 className="sv-h2">Solutions I <em>Deliver</em></h2>
            <p className="sv-sub">
              From backend APIs to pixel-perfect frontends — shipped to production, not just to GitHub.
            </p>
          </RevealDiv>

          <div className="sv-divider" />

          {/* ── CARDS ── */}
          <div className="sv-grid">
            {SERVICES.map((s, i) => (
              <RevealCard
                key={s.id}
                delay={i * 0.08}
                style={{ '--card-accent': s.accent }}
              >
                <div className="sv-shimmer" aria-hidden="true" />

                <div className="sv-icon-wrap">
                  <div className="sv-icon-box" aria-hidden="true">{s.icon}</div>
                  <span className="sv-num">{s.num}</span>
                </div>

                <h3 className="sv-title">{s.title}</h3>
                <p className="sv-desc">{s.desc}</p>

                <ul className="sv-features" aria-label={`${s.title} features`}>
                  {s.features.map((f) => (
                    <li key={f} className="sv-feature">
                      <span className="sv-feature-dot" aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                </ul>
              </RevealCard>
            ))}
          </div>

          {/* ── CTA STRIP ── */}
          <RevealCTA delay={0.1} />

        </div>
      </section>
    );
  }

  /* ── SUB-COMPONENTS ── */
  function RevealDiv({ children, delay = 0, className = '' }) {
    const [ref, visible] = useReveal();
    return (
      <div
        ref={ref}
        className={className}
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(24px)',
          transition: `opacity 0.75s cubic-bezier(0.22,1,0.36,1) ${delay}s,
                      transform 0.75s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
        }}
      >
        {children}
      </div>
    );
  }

  function RevealCard({ children, delay = 0, style = {} }) {
    const [ref, visible] = useReveal();
    return (
      <div
        ref={ref}
        className={`sv-card${visible ? ' sv-in' : ''}`}
        style={{
          transitionDelay: `${delay}s`,
          transitionProperty: 'opacity, transform, border-color, background',
          transitionDuration: '0.7s, 0.7s, 0.35s, 0.35s',
          transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)',
          ...style,
        }}
      >
        {children}
      </div>
    );
  }

  function RevealCTA({ delay = 0 }) {
    const [ref, visible] = useReveal();
    return (
      <div
        ref={ref}
        className={`sv-cta${visible ? ' sv-in' : ''}`}
        style={{ transitionDelay: `${delay}s` }}
      >
        <div className="sv-cta-text">
          <h3 className="sv-cta-h3">
            Have a project in <em>mind?</em>
          </h3>
          <p className="sv-cta-sub">Let's turn your idea into a live product</p>
        </div>
        <a href="#contact" className="sv-cta-btn">
          Start a Project
          <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
          </svg>
        </a>
      </div>
    );
  }