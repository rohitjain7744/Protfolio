import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const FEATURED_PROJECTS = [
  {
    id: 'novahire',
    name: 'NovaHire System',
    category: 'Enterprise Solution',
    tags: ['Spring Boot', 'React', 'JWT'],
    desc: 'Production-ready recruitment platform with secure role-based access control and full cloud infrastructure.',
    image: '/assets/Project/nova-hero.png',
    accent: '#6c47ff',
    accentRgb: '108,71,255',
    num: '01',
    live: 'https://hire-nova.netlify.app',
    year: '2024',
  },
  {
    id: 'ecommerce',
    name: 'MERN E-Commerce',
    category: 'Full-Stack Retail',
    tags: ['MongoDB', 'Node.js', 'Redux'],
    desc: 'Scalable platform with real-time cart updates, complex product filtering, and order management.',
    image: '/assets/Project/ecom-hero.png',
    accent: '#ff6b47',
    accentRgb: '255,107,71',
    num: '02',
    live: null,
    year: '2024',
  },
  {
    id: 'health-sync',
    name: 'Health Sync',
    category: 'Real-time Monitoring',
    tags: ['Spring Boot', 'Twilio', 'Vitals'],
    desc: 'Emergency alert system triggering automated SMS & Email on critical health vitals in real time.',
    image: '/assets/Project/health-hero.png',
    accent: '#00c9a7',
    accentRgb: '0,201,167',
    num: '03',
    live: null,
    year: '2024',
  },
];

/* ─────────────────────────────────────────
   STYLES
───────────────────────────────────────── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Cabinet+Grotesk:wght@300;400;500;700;800&family=JetBrains+Mono:wght@400;500&display=swap');

  :root {
    --fp-ink:    #0a0a0f;
    --fp-ink2:   #0e0d18;
    --fp-fog:    #f5f4f2;
    --fp-fog2:   rgba(245,244,242,0.55);
    --fp-muted:  #6b6878;
    --fp-border: rgba(245,244,242,0.07);
    --fp-border2:rgba(245,244,242,0.13);
    --fp-accent: #ff4f2e;
    --fp-fd: 'DM Serif Display', serif;
    --fp-fb: 'Cabinet Grotesk', sans-serif;
    --fp-fm: 'JetBrains Mono', monospace;
    --fp-out:    cubic-bezier(0.22,1,0.36,1);
    --fp-bounce: cubic-bezier(0.34,1.56,0.64,1);
  }

  *, *::before, *::after { box-sizing: border-box; }

  /* ─── SECTION ─── */
  .fp-section {
    position: relative;
    background: var(--fp-ink);
    color: var(--fp-fog);
    font-family: var(--fp-fb);
    overflow: hidden;
    -webkit-font-smoothing: antialiased;
    padding: 7rem 0 6rem;
  }

  /* grain noise */
  .fp-section::before {
    content: '';
    position: absolute; inset: 0; pointer-events: none; z-index: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
    opacity: 0.032;
  }

  /* ambient aura */
  .fp-aura {
    position: absolute; inset: 0; pointer-events: none; z-index: 0;
    background:
      radial-gradient(ellipse 60% 70% at 85% 15%,  rgba(108,71,255,0.08) 0%, transparent 60%),
      radial-gradient(ellipse 50% 50% at 8%  80%,  rgba(255,107,71,0.07) 0%, transparent 55%),
      radial-gradient(ellipse 40% 40% at 50% 55%, rgba(0,201,167,0.05)   0%, transparent 60%);
    animation: fpAura 18s ease-in-out infinite alternate;
  }
  @keyframes fpAura {
    0%   { opacity:.75; }
    50%  { opacity:1; }
    100% { opacity:.7; }
  }

  /* dot grid */
  .fp-dots {
    position: absolute; inset: 0; pointer-events: none; z-index: 0;
    background-image: radial-gradient(circle, rgba(245,244,242,0.08) 1px, transparent 1px);
    background-size: 28px 28px;
    mask-image: radial-gradient(ellipse 80% 70% at 50% 40%, black 20%, transparent 100%);
  }

  /* ─── WRAP ─── */
  .fp-wrap {
    position: relative; z-index: 2;
    max-width: 1120px; margin: 0 auto;
    padding: 0 1.5rem;
  }

  /* ─── HEADER ─── */
  .fp-header {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    margin-bottom: 4rem;
  }

  /* eyebrow */
  .fp-eyebrow {
    display: inline-flex; align-items: center; gap: 9px;
    font-family: var(--fp-fm); font-size: 0.63rem;
    letter-spacing: 0.18em; text-transform: uppercase;
    color: rgba(255,160,130,0.9);
    border: 1px solid rgba(255,79,46,0.25);
    background: rgba(255,79,46,0.07);
    padding: 5px 14px; border-radius: 100px;
    width: fit-content;
  }
  .fp-eyebrow-dot {
    width: 5px; height: 5px; border-radius: 50%;
    background: var(--fp-accent);
    box-shadow: 0 0 7px var(--fp-accent);
    animation: fpPulse 2s ease-in-out infinite;
  }
  @keyframes fpPulse {
    0%,100% { transform:scale(1);   box-shadow:0 0 4px var(--fp-accent); }
    50%     { transform:scale(1.5); box-shadow:0 0 12px var(--fp-accent); }
  }

  /* heading */
  .fp-h2 {
    font-family: var(--fp-fd);
    font-size: clamp(2.6rem, 6.5vw, 5.2rem);
    line-height: .95; letter-spacing: -0.03em;
    color: var(--fp-fog); margin: 0;
  }
  .fp-h2 em {
    font-style: italic;
    background: linear-gradient(135deg, #ff8060 0%, #ff4f2e 45%, #ff9a6c 80%, #ffc87a 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }

  /* sub + count row */
  .fp-header-meta {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: flex-end;
  }
  .fp-sub {
    font-size: clamp(0.87rem, 1.8vw, 1rem);
    line-height: 1.75; color: var(--fp-fog2);
    max-width: 380px;
  }
  .fp-count-pill {
    display: inline-flex; align-items: center; gap: 7px;
    font-family: var(--fp-fm); font-size: 0.6rem;
    letter-spacing: 0.12em; text-transform: uppercase;
    color: rgba(100,220,190,.8);
    background: rgba(0,201,167,.07);
    border: 1px solid rgba(0,201,167,.2);
    padding: 5px 12px; border-radius: 100px;
    width: fit-content;
  }
  .fp-count-dot {
    width: 5px; height: 5px; border-radius: 50%;
    background: #00c9a7; box-shadow: 0 0 6px #00c9a7;
    animation: fpPulse 2.4s ease-in-out infinite;
  }

  /* ─── RULE ─── */
  .fp-rule {
    height: 1px; margin: 0 0 4rem;
    background: linear-gradient(90deg,
      var(--fp-accent) 0%,
      rgba(108,71,255,.4) 40%,
      transparent 100%
    );
    opacity: .22;
  }

  /* ─────────────────────────────────────────
     CARD LIST
  ───────────────────────────────────────── */
  .fp-list {
    display: flex;
    flex-direction: column;
    gap: 0;                       /* borderless — cards share borders */
  }

  /* ─── CARD ─── */
  .fp-card {
    position: relative;
    display: grid;
    grid-template-columns: 1fr;   /* mobile: stacked */
    border-top: 1px solid var(--fp-border);
    background: transparent;
    transition:
      background 0.4s ease,
      opacity 0.75s var(--fp-out),
      transform 0.75s var(--fp-out);
    cursor: pointer;
    overflow: hidden;

    /* reveal */
    opacity: 0;
    transform: translateY(36px);
  }
  .fp-list .fp-card:last-child { border-bottom: 1px solid var(--fp-border); }

  .fp-card.fp-in { opacity: 1; transform: translateY(0); }

  .fp-card:hover { background: rgba(245,244,242,.028); }

  /* accent sweep on left edge */
  .fp-card::before {
    content: '';
    position: absolute; left: 0; top: 0; bottom: 0; width: 2px;
    background: var(--card-accent, var(--fp-accent));
    transform: scaleY(0); transform-origin: bottom;
    transition: transform .5s var(--fp-out);
    z-index: 3;
  }
  .fp-card:hover::before { transform: scaleY(1); }

  /* ─── IMAGE SIDE ─── */
  .fp-img-wrap {
    position: relative;
    overflow: hidden;
    aspect-ratio: 16/9;
    background: var(--fp-ink2);
  }

  /* placeholder shimmer when no image */
  .fp-img-wrap::before {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(
      135deg,
      rgba(var(--card-rgb, 108,71,255), .12) 0%,
      rgba(var(--card-rgb, 108,71,255), .04) 50%,
      rgba(245,244,242,.02) 100%
    );
    z-index: 0;
  }

  .fp-img {
    position: relative; z-index: 1;
    width: 100%; height: 100%;
    object-fit: cover; object-position: center top; display: block;
    filter: brightness(.68) saturate(.8);
    transition: transform .8s var(--fp-out), filter .5s ease;
  }
  .fp-card:hover .fp-img {
    transform: scale(1.06);
    filter: brightness(.85) saturate(1.05);
  }

  /* overlay gradient */
  .fp-overlay {
    position: absolute; inset: 0; z-index: 2;
    background: linear-gradient(
      to right,
      rgba(10,10,15,.6) 0%,
      transparent 60%
    );
    display: flex; align-items: flex-end; justify-content: flex-start;
    padding: 1.4rem;
    opacity: 0;
    transition: opacity .4s ease;
  }
  .fp-card:hover .fp-overlay { opacity: 1; }

  /* CTA inside overlay */
  .fp-cta-btn {
    display: inline-flex; align-items: center; gap: 7px;
    padding: .65rem 1.25rem; border-radius: 9px;
    font-family: var(--fp-fb); font-size: .8rem; font-weight: 700;
    text-decoration: none; color: #fff;
    background: var(--card-accent, var(--fp-accent));
    box-shadow: 0 6px 24px rgba(0,0,0,.5);
    transform: translateY(14px);
    transition: transform .45s var(--fp-bounce);
    white-space: nowrap;
  }
  .fp-card:hover .fp-cta-btn { transform: translateY(0); }
  .fp-cta-btn svg { width:12px; height:12px; flex-shrink:0; transition:transform .3s var(--fp-bounce); }
  .fp-cta-btn:hover svg { transform: translateX(3px); }

  /* corner badges */
  .fp-num-badge {
    position: absolute; top: 12px; left: 14px; z-index: 3;
    font-family: var(--fp-fm); font-size: .58rem;
    letter-spacing: .2em; text-transform: uppercase;
    color: rgba(245,244,242,.35);
  }
  .fp-live-badge {
    position: absolute; top: 12px; right: 14px; z-index: 3;
    display: flex; align-items: center; gap: 5px;
    font-family: var(--fp-fm); font-size: .56rem;
    letter-spacing: .1em; text-transform: uppercase;
    color: rgba(100,220,190,.85);
    background: rgba(0,201,167,.09);
    border: 1px solid rgba(0,201,167,.22);
    padding: 4px 9px; border-radius: 100px;
  }
  .fp-live-dot {
    width: 5px; height: 5px; border-radius: 50%;
    background: #00c9a7; box-shadow: 0 0 7px #00c9a7;
    animation: fpPulse 2.2s ease-in-out infinite;
  }

  /* ─── INFO SIDE ─── */
  .fp-info {
    padding: 1.8rem 1.6rem;
    display: flex; flex-direction: column;
    gap: 0;
  }

  /* top meta row */
  .fp-meta {
    display: flex; align-items: center; gap: 10px;
    margin-bottom: .7rem;
  }
  .fp-cat {
    font-family: var(--fp-fm); font-size: .58rem;
    letter-spacing: .15em; text-transform: uppercase;
    color: var(--fp-muted);
  }
  .fp-meta-line {
    flex: 1; height: 1px;
    background: linear-gradient(90deg, var(--card-accent, var(--fp-accent)), transparent);
    opacity: .3;
  }
  .fp-year {
    font-family: var(--fp-fm); font-size: .56rem;
    letter-spacing: .1em; color: var(--fp-muted);
    opacity: .6;
  }

  /* project name */
  .fp-title {
    font-family: var(--fp-fd);
    font-size: clamp(1.35rem, 3.5vw, 1.9rem);
    line-height: 1.05; letter-spacing: -.02em;
    color: var(--fp-fog); margin: 0 0 .75rem;
    transition: color .25s;
  }
  .fp-card:hover .fp-title { color: #fff; }

  /* desc */
  .fp-desc {
    font-size: .875rem; line-height: 1.8;
    color: rgba(245,244,242,.42);
    margin: 0 0 1.2rem; flex: 1;
  }

  /* tags + arrow row */
  .fp-bottom {
    display: flex; align-items: center;
    justify-content: space-between; gap: 1rem;
    flex-wrap: wrap;
  }
  .fp-tags { display: flex; flex-wrap: wrap; gap: 5px; }
  .fp-tag {
    font-family: var(--fp-fm); font-size: .58rem;
    letter-spacing: .06em; text-transform: uppercase;
    padding: 3px 9px; border-radius: 100px;
    border: 1px solid var(--fp-border);
    color: var(--fp-muted);
    transition: border-color .3s, color .3s, background .3s;
  }
  .fp-card:hover .fp-tag {
    border-color: rgba(var(--card-rgb,108,71,255),.35);
    color: rgba(245,244,242,.75);
    background: rgba(var(--card-rgb,108,71,255),.06);
  }

  /* inline arrow link */
  .fp-arrow-link {
    display: inline-flex; align-items: center; gap: 6px;
    font-family: var(--fp-fm); font-size: .6rem;
    letter-spacing: .12em; text-transform: uppercase;
    color: var(--card-accent, var(--fp-accent));
    text-decoration: none; opacity: .7;
    transition: opacity .25s, gap .3s var(--fp-bounce);
    flex-shrink: 0;
  }
  .fp-arrow-link:hover { opacity: 1; gap: 10px; }
  .fp-arrow-link svg { width: 12px; height: 12px; }

  /* ─── FOOTER ─── */
  .fp-footer {
    display: flex; justify-content: center;
    margin-top: 4rem;
  }

  .fp-all-btn {
    display: inline-flex; align-items: center; gap: 10px;
    padding: .9rem 2.2rem; border-radius: 12px;
    font-family: var(--fp-fb); font-size: .92rem; font-weight: 600;
    text-decoration: none; color: var(--fp-fog);
    border: 1px solid rgba(245,244,242,.13);
    background: rgba(245,244,242,.03);
    transition: all .35s var(--fp-bounce);
    position: relative; overflow: hidden;
  }
  .fp-all-btn::after {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,.06) 0%, transparent 100%);
    opacity: 0; transition: opacity .3s;
  }
  .fp-all-btn:hover {
    transform: translateY(-4px) scale(1.03);
    border-color: rgba(245,244,242,.28);
    background: rgba(245,244,242,.06);
    box-shadow: 0 12px 36px rgba(0,0,0,.35);
  }
  .fp-all-btn:hover::after { opacity: 1; }
  .fp-all-btn svg { width:14px; height:14px; transition:transform .3s var(--fp-bounce); }
  .fp-all-btn:hover svg { transform: translateX(5px); }

  /* ─────────────────────────────────────────
     TABLET  ≥ 640px
  ───────────────────────────────────────── */
  @media (min-width: 640px) {
    .fp-wrap { padding: 0 2rem; }

    .fp-header {
      grid-template-columns: 1fr 1fr;
      align-items: end;
    }
    .fp-header-meta { align-items: flex-end; }

    /* split card: image left, info right */
    .fp-card { grid-template-columns: 1fr 1fr; }
    .fp-img-wrap { aspect-ratio: unset; min-height: 280px; }
    .fp-info { padding: 2.2rem 2rem; justify-content: center; }

    /* alternate: even cards flip */
    .fp-card:nth-child(even) { direction: rtl; }
    .fp-card:nth-child(even) > * { direction: ltr; }

    /* overlay gradient flips for flipped cards */
    .fp-card:nth-child(even) .fp-overlay {
      background: linear-gradient(to left, rgba(10,10,15,.6) 0%, transparent 60%);
      justify-content: flex-end;
    }
  }

  /* ─────────────────────────────────────────
     DESKTOP  ≥ 1000px
  ───────────────────────────────────────── */
  @media (min-width: 1000px) {
    .fp-card { grid-template-columns: 1.2fr 1fr; }
    .fp-info { padding: 2.8rem 2.6rem; }
    .fp-title { font-size: 1.9rem; }
    .fp-desc { font-size: .92rem; }
  }

  /* ─────────────────────────────────────────
     SMALL PHONE  ≤ 390px
  ───────────────────────────────────────── */
  @media (max-width: 390px) {
    .fp-section { padding: 5rem 0 4rem; }
    .fp-h2 { font-size: 2.4rem; }
    .fp-info { padding: 1.4rem 1.2rem; }
    .fp-bottom { flex-direction: column; align-items: flex-start; }
  }

  ::selection { background: rgba(255,79,46,.3); color: var(--fp-fog); }
`;

/* ─────────────────────────────────────────
   REVEAL HOOK
───────────────────────────────────────── */
function useReveal(threshold = 0.08) {
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

function RevealCard({ children, delay = 0, style = {} }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`fp-card${visible ? ' fp-in' : ''}`}
      style={{ transitionDelay: `${delay}s`, ...style }}
    >
      {children}
    </div>
  );
}

function RevealUp({ children, delay = 0, className = '' }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(22px)',
        transition: `opacity .75s cubic-bezier(.22,1,.36,1) ${delay}s,
                     transform .75s cubic-bezier(.22,1,.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────
   COMPONENT
───────────────────────────────────────── */
export default function FeaturedProjects() {
  return (
    <section className="fp-section" id="projects" aria-label="Featured projects">
      <style>{css}</style>

      <div className="fp-aura" aria-hidden="true" />
      <div className="fp-dots" aria-hidden="true" />

      <div className="fp-wrap">

        {/* ── HEADER ── */}
        <RevealUp className="fp-header" delay={0}>
          {/* left: eyebrow + h2 */}
          <div>
            <div className="fp-eyebrow">
              <span className="fp-eyebrow-dot" />
              Portfolio
            </div>
            <h2 className="fp-h2">
              Featured<br /><em>Case Studies</em>
            </h2>
          </div>

          {/* right: sub + count */}
          <div className="fp-header-meta">
            <p className="fp-sub">
              End-to-end products — from schema design to cloud deployment.
            </p>
            <div className="fp-count-pill">
              <span className="fp-count-dot" />
              {FEATURED_PROJECTS.length} live projects
            </div>
          </div>
        </RevealUp>

        <div className="fp-rule" />

        {/* ── CARDS ── */}
        <div className="fp-list">
          {FEATURED_PROJECTS.map((p, i) => (
            <RevealCard
              key={p.id}
              delay={i * 0.1}
              style={{
                '--card-accent': p.accent,
                '--card-rgb':    p.accentRgb,
              }}
            >
              {/* IMAGE */}
              <div className="fp-img-wrap">
                <span className="fp-num-badge">{p.num}</span>

                {p.live && (
                  <div className="fp-live-badge">
                    <span className="fp-live-dot" />
                    Live
                  </div>
                )}

                <img src={p.image} alt={p.name} className="fp-img" loading="lazy" />

                <div className="fp-overlay">
                  <Link to={`/project/${p.id}`} className="fp-cta-btn">
                    View Case Study
                    <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                    </svg>
                  </Link>
                </div>
              </div>

              {/* INFO */}
              <div className="fp-info">
                <div className="fp-meta">
                  <span className="fp-cat">{p.category}</span>
                  <span className="fp-meta-line" />
                  <span className="fp-year">{p.year}</span>
                </div>

                <h3 className="fp-title">{p.name}</h3>
                <p className="fp-desc">{p.desc}</p>

                <div className="fp-bottom">
                  <div className="fp-tags">
                    {p.tags.map(tag => (
                      <span key={tag} className="fp-tag">{tag}</span>
                    ))}
                  </div>

                  <Link to={`/project/${p.id}`} className="fp-arrow-link" aria-label={`View ${p.name}`}>
                    Explore
                    <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                    </svg>
                  </Link>
                </div>
              </div>
            </RevealCard>
          ))}
        </div>

        {/* ── FOOTER ── */}
        <RevealUp delay={0.15} className="fp-footer">
          <Link to="/project" className="fp-all-btn">
            View All Projects
            <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </Link>
        </RevealUp>

      </div>
    </section>
  );
}