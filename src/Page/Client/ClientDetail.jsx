import { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  FaGlobe, FaCode, FaQuoteLeft, FaTools,
  FaChevronLeft, FaLayerGroup, FaExternalLinkAlt, FaArrowRight
} from 'react-icons/fa';

import dhruv1 from "../../assets/Project/dhruv1.png";
import dhruv2 from "../../assets/Project/dhruv2.png";
import  dhruv3 from "../../assets/Project/dhruv3.png";
import dhruv4 from "../../assets/Project/dhruv4.png";

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const clientData = {
  'mahavir-chemical': {
    name: 'Mahaveer Chemicals Group',
    heroTag: 'Industrial Catalog & B2B',
    num: '01',
    accent: '#ff4f2e',
    description: 'A comprehensive digital solution for one of the leading chemical distributors — focusing on catalog precision, technical documentation, and B2B lead generation.',
    challenge: 'The client needed to showcase 500+ industrial chemicals with complex technical specifications, while maintaining a clean, vintage-modern aesthetic that conveyed trust and authority.',
    solution: 'Engineered a high-performance filtering system using React and Spring Boot. Integrated a custom CMS allowing the client to update product TDS sheets and safety documents effortlessly — reducing update cycles from days to minutes.',
    tech: ['React.js', 'Spring Boot', 'MySQL', 'REST API', 'Tailwind'],
    results: ['70% faster catalog management', '500+ products catalogued', 'Mobile-first responsive'],
    photos: [
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070',
      'https://images.unsplash.com/photo-1532187863486-abf51ad95699?q=80&w=2070',
    ],
    feedback: 'Rohit delivered a platform that perfectly balances industrial needs with a modern interface. Our catalog management is now 70% faster.',
    client: 'Management Team, Mahaveer Chemicals',
    link: 'https://mahavirchemicalindia.com',
  },
  'industrial-machinery': {
    name: 'OM Motors & Vishal Harvesters',
    heroTag: 'Automotive & Machinery Sales',
    num: '02',
    accent: '#1a1aff',
    description: 'A professional machine-selling platform designed to showcase heavy agricultural harvesters and motors with a premium showroom-style experience.',
    challenge: 'Building a visually-rich site that loads fast and delivers a premium "showroom" experience for high-value agricultural machinery — with dealer inquiry flows and spec comparisons.',
    solution: 'Component-based React architecture with high-quality Cloudinary-optimised image galleries, lazy loading, and detailed specification tables. Framer Motion added fluid transitions that elevated the luxury feel.',
    tech: ['React.js', 'Firebase', 'Framer Motion', 'Cloudinary'],
    results: ['Premium showroom UX', 'Optimised image delivery', 'Dealer inquiry integration'],
    photos: [
      'https://images.unsplash.com/photo-1592939091403-2396603a787b?q=80&w=2070',
      'https://images.unsplash.com/photo-1530041539828-114de669390e?q=80&w=1974',
    ],
    feedback: 'The professional look of our new website has directly helped us close bigger deals in the agricultural sector.',
    client: 'Sales Director, OM Motors',
    link: 'https://ommotors.com',
  },
  'cgi-tech-solutions': {
    name: 'CGI Tech Solutions',
    heroTag: 'Enterprise Software',
    num: '03',
    accent: '#00c9a7',
    description: 'Scalable digital infrastructure and microservices-backed software for a modern tech enterprise — built for high concurrency and real-time operations.',
    challenge: 'Architecting a scalable system that handles high-concurrency requests while maintaining sub-second latency — with a real-time admin dashboard for internal ops teams.',
    solution: 'Spring Boot microservices on AWS with a React admin dashboard featuring live data visualisation. Docker containers for reproducible deployments, and PostgreSQL for reliable relational data management.',
    tech: ['React.js', 'Spring Boot', 'PostgreSQL', 'Docker', 'AWS'],
    results: ['Sub-second API latency', 'Microservices architecture', 'AWS cloud deployed'],
    photos: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2026',
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070',
    ],
    feedback: 'The technical depth and implementation quality provided by Rohit helped us scale our operations effectively.',
    client: 'CTO, CGI Tech Solutions',
    link: 'https://cgitech.com',
  },

  'Dhruv-investments': {
    name: 'Dhruv Investments',
    heroTag: 'Financial Services',
    num: '04',
    accent: '#ff6b47',
    description: 'A comprehensive financial planning platform designed to help users manage their investments and achieve long-term financial goals.',
    challenge: 'Creating a user-friendly interface for complex financial calculations while ensuring data security and compliance.',
    solution: 'A responsive React.js application with a clean, modern design and robust state management. Integrated with a secure backend for data handling and compliance.',
    tech: ['React.js', 'JavaScript', 'Css'],
    results: ['Intuitive financial planning tools', 'Enhanced user experience', 'Compliance assurance'],
    photos: [
     dhruv1,dhruv2,dhruv3,dhruv4
    ],
    feedback: 'The platform has significantly improved our ability to provide personalised financial advice to our clients.',
    client: 'Financial Advisor, Dhruv Investments',
    link: 'https://dhruvinvestments.in',
  },
};

/* ─────────────────────────────────────────
   STYLES
───────────────────────────────────────── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Cabinet+Grotesk:wght@300;400;500;700;800&family=JetBrains+Mono:wght@400;500&display=swap');

  :root {
    --cd-ink:    #0a0a0f;
    --cd-ink2:   #111118;
    --cd-fog:    #f5f4f2;
    --cd-muted:  #7a7888;
    --cd-border: rgba(245,244,242,0.08);
    --cd-accent: #ff4f2e;
    --cd-fd: 'DM Serif Display', serif;
    --cd-fb: 'Cabinet Grotesk', sans-serif;
    --cd-fm: 'JetBrains Mono', monospace;
    --cd-out: cubic-bezier(0.22,1,0.36,1);
    --cd-bounce: cubic-bezier(0.34,1.56,0.64,1);
  }

  /* ── ROOT ── */
  .cd-root {
    background: var(--cd-ink);
    color: var(--cd-fog);
    font-family: var(--cd-fb);
    min-height: 100vh;
    position: relative;
    overflow: hidden;
    -webkit-font-smoothing: antialiased;
  }
  .cd-root::before {
    content: '';
    position: fixed; inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
    opacity: 0.03; pointer-events: none; z-index: 9999;
  }

  /* BG layers */
  .cd-aura {
    position: absolute; inset: 0; pointer-events: none;
    background:
      radial-gradient(ellipse 60% 55% at 80% 5%, color-mix(in srgb, var(--cd-accent) 10%, transparent) 0%, transparent 60%),
      radial-gradient(ellipse 40% 40% at 5% 90%, rgba(26,26,255,0.06) 0%, transparent 55%);
    transition: background 0.6s ease;
  }
  .cd-grid {
    position: absolute; inset: 0; pointer-events: none;
    background-image:
      linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px);
    background-size: 40px 40px;
    mask-image: radial-gradient(ellipse 80% 80% at 50% 30%, black 20%, transparent 100%);
  }

  /* ── REVEAL ── */
  .cd-reveal { opacity: 0; transform: translateY(28px); transition: opacity 0.75s var(--cd-out), transform 0.75s var(--cd-out); }
  .cd-reveal.cd-in { opacity: 1; transform: translateY(0); }
  .cd-reveal-l { opacity: 0; transform: translateX(-32px); transition: opacity 0.75s var(--cd-out), transform 0.75s var(--cd-out); }
  .cd-reveal-l.cd-in { opacity: 1; transform: translateX(0); }
  .cd-reveal-r { opacity: 0; transform: translateX(32px); transition: opacity 0.75s var(--cd-out), transform 0.75s var(--cd-out); }
  .cd-reveal-r.cd-in { opacity: 1; transform: translateX(0); }

  /* ── WRAP ── */
  .cd-wrap {
    position: relative; z-index: 2;
    max-width: 1100px; margin: 0 auto;
    padding: 0 2.5rem 6rem;
  }

  /* ── NAV ── */
  .cd-nav {
    display: flex; align-items: center;
    justify-content: space-between;
    padding: 2rem 0 3rem;
    border-bottom: 1px solid var(--cd-border);
    margin-bottom: 4rem;
  }
  .cd-back {
    display: inline-flex; align-items: center; gap: 8px;
    font-family: var(--cd-fm); font-size: 0.68rem;
    letter-spacing: 0.12em; text-transform: uppercase;
    color: var(--cd-muted); text-decoration: none;
    padding: 8px 14px; border-radius: 100px;
    border: 1px solid var(--cd-border);
    transition: all 0.3s var(--cd-out);
  }
  .cd-back:hover {
    color: var(--cd-fog);
    border-color: rgba(245,244,242,0.25);
    background: rgba(245,244,242,0.05);
  }
  .cd-nav-name {
    font-family: var(--cd-fm); font-size: 0.65rem;
    letter-spacing: 0.14em; text-transform: uppercase;
    color: var(--cd-muted);
  }

  /* ── HERO BLOCK ── */
  .cd-hero { margin-bottom: 5rem; }

  .cd-hero-tag {
    display: inline-flex; align-items: center; gap: 10px;
    font-family: var(--cd-fm); font-size: 0.68rem;
    letter-spacing: 0.16em; text-transform: uppercase;
    color: rgba(255,160,140,0.85);
    border: 1px solid color-mix(in srgb, var(--cd-accent) 35%, transparent);
    background: color-mix(in srgb, var(--cd-accent) 8%, transparent);
    padding: 6px 14px; border-radius: 100px;
    margin-bottom: 1.8rem;
  }
  .cd-hero-tag-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: var(--cd-accent);
    box-shadow: 0 0 8px var(--cd-accent);
    animation: cdDot 2s ease-in-out infinite;
  }
  @keyframes cdDot {
    0%,100% { box-shadow: 0 0 4px var(--cd-accent); transform: scale(1); }
    50%      { box-shadow: 0 0 14px var(--cd-accent); transform: scale(1.45); }
  }

  .cd-hero-num {
    font-family: var(--cd-fm); font-size: 0.6rem;
    letter-spacing: 0.2em; text-transform: uppercase;
    color: var(--cd-accent); opacity: 0.6;
    margin-bottom: 0.8rem;
  }

  .cd-hero-title {
    font-family: var(--cd-fd);
    font-size: clamp(2.8rem, 5.5vw, 5.2rem);
    line-height: 1.0; letter-spacing: -0.025em;
    color: var(--cd-fog); margin-bottom: 1.4rem;
  }
  .cd-hero-title em {
    font-style: italic;
    background: linear-gradient(135deg, #ff6b47 0%, var(--cd-accent) 40%, #ff8a65 75%, #ffb347 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }

  .cd-hero-desc {
    font-size: clamp(0.95rem,1.4vw,1.08rem);
    line-height: 1.85; color: rgba(245,244,242,0.45);
    max-width: 620px;
  }

  /* result pills */
  .cd-results {
    display: flex; flex-wrap: wrap; gap: 8px;
    margin-top: 2rem;
  }
  .cd-result-pill {
    display: inline-flex; align-items: center; gap: 7px;
    font-family: var(--cd-fm); font-size: 0.62rem;
    letter-spacing: 0.08em; text-transform: uppercase;
    padding: 6px 14px; border-radius: 100px;
    background: rgba(0,201,167,0.08);
    border: 1px solid rgba(0,201,167,0.22);
    color: rgba(100,220,190,0.85);
  }
  .cd-result-pill::before {
    content: '✓';
    font-size: 10px; color: #00c9a7;
  }

  /* ── DIVIDER ── */
  .cd-divider {
    height: 1px;
    background: linear-gradient(90deg, var(--cd-accent), transparent);
    opacity: 0.18; margin: 0 0 4rem;
  }

  /* ── MAIN GRID ── */
  .cd-main-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    margin-bottom: 5rem;
    align-items: start;
  }

  /* ── INFO PANE ── */
  .cd-info-pane { display: flex; flex-direction: column; gap: 1.5rem; }

  .cd-info-card {
    background: rgba(245,244,242,0.025);
    border: 1px solid var(--cd-border);
    border-radius: 16px; padding: 1.8rem;
    transition: border-color 0.35s, background 0.35s;
    position: relative; overflow: hidden;
  }
  .cd-info-card::after {
    content: '';
    position: absolute; left: 0; top: 0; bottom: 0;
    width: 2.5px;
    background: var(--cd-accent);
    transform: scaleY(0); transform-origin: top;
    transition: transform 0.4s var(--cd-out);
    border-radius: 3px 0 0 3px;
  }
  .cd-info-card:hover { border-color: rgba(245,244,242,0.15); background: rgba(245,244,242,0.04); }
  .cd-info-card:hover::after { transform: scaleY(1); }

  .cd-card-icon {
    width: 36px; height: 36px; border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-size: 14px;
    background: color-mix(in srgb, var(--cd-accent) 12%, transparent);
    border: 1px solid color-mix(in srgb, var(--cd-accent) 25%, transparent);
    color: var(--cd-accent);
    margin-bottom: 1rem;
  }

  .cd-info-card h3 {
    font-family: var(--cd-fd); font-size: 1.1rem;
    color: var(--cd-fog); margin-bottom: 0.7rem;
  }
  .cd-info-card p {
    font-size: 0.9rem; line-height: 1.8;
    color: rgba(245,244,242,0.45);
  }

  /* tech stack */
  .cd-tech-box {
    background: rgba(245,244,242,0.025);
    border: 1px solid var(--cd-border);
    border-radius: 16px; padding: 1.5rem;
  }
  .cd-tech-box h4 {
    font-family: var(--cd-fm); font-size: 0.62rem;
    letter-spacing: 0.14em; text-transform: uppercase;
    color: var(--cd-muted); margin-bottom: 1rem;
  }
  .cd-tech-pills { display: flex; flex-wrap: wrap; gap: 7px; }
  .cd-tech-pill {
    font-family: var(--cd-fm); font-size: 0.62rem;
    letter-spacing: 0.06em; text-transform: uppercase;
    padding: 5px 12px; border-radius: 100px;
    border: 1px solid var(--cd-border);
    color: var(--cd-muted);
    transition: border-color 0.3s, color 0.3s, background 0.3s;
    cursor: default;
  }
  .cd-tech-pill:hover {
    border-color: color-mix(in srgb, var(--cd-accent) 40%, transparent);
    color: rgba(245,244,242,0.8);
    background: color-mix(in srgb, var(--cd-accent) 7%, transparent);
  }

  /* ── GALLERY PANE ── */
  .cd-gallery-pane { display: flex; flex-direction: column; gap: 0; }

  .cd-gallery-label {
    display: flex; align-items: center; gap: 8px;
    font-family: var(--cd-fm); font-size: 0.62rem;
    letter-spacing: 0.14em; text-transform: uppercase;
    color: var(--cd-muted); margin-bottom: 1rem;
  }
  .cd-gallery-label svg { font-size: 11px; color: var(--cd-accent); }

  .cd-gallery { display: flex; flex-direction: column; gap: 12px; }

  .cd-gallery-frame {
    border-radius: 14px; overflow: hidden;
    border: 1px solid var(--cd-border);
    position: relative;
    transform: translateZ(0);
  }
  .cd-gallery-frame img {
    width: 100%; display: block;
    aspect-ratio: 16/9; object-fit: cover;
    filter: brightness(0.75) saturate(0.85);
    transition: transform 0.7s var(--cd-out), filter 0.5s ease;
  }
  .cd-gallery-frame:hover img {
    transform: scale(1.04);
    filter: brightness(0.9) saturate(1);
  }
  .cd-gallery-frame::after {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(to top, rgba(10,10,15,0.5) 0%, transparent 50%);
    pointer-events: none;
  }
  /* index label */
  .cd-gallery-frame-num {
    position: absolute; top: 12px; right: 14px;
    font-family: var(--cd-fm); font-size: 0.6rem;
    letter-spacing: 0.12em; text-transform: uppercase;
    color: rgba(245,244,242,0.4);
    z-index: 2;
  }

  /* ── FEEDBACK BLOCK ── */
  .cd-feedback {
    border: 1px solid var(--cd-border);
    border-radius: 20px;
    padding: 3rem;
    background: rgba(245,244,242,0.025);
    position: relative; overflow: hidden;
    margin-bottom: 2rem;
  }
  .cd-feedback::before {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(130deg, color-mix(in srgb, var(--cd-accent) 6%, transparent) 0%, transparent 50%);
    pointer-events: none;
  }
  /* shimmer */
  .cd-feedback::after {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.025) 50%, transparent 60%);
    animation: cdShimmer 7s ease-in-out infinite;
  }
  @keyframes cdShimmer {
    0% { transform: translateX(-120%); }
    60%,100% { transform: translateX(220%); }
  }

  .cd-quote-icon {
    font-size: 2rem;
    color: var(--cd-accent);
    opacity: 0.4; margin-bottom: 1.2rem;
    display: block;
  }

  .cd-blockquote {
    font-family: var(--cd-fd);
    font-size: clamp(1.1rem, 2vw, 1.45rem);
    font-style: italic; line-height: 1.55;
    color: rgba(245,244,242,0.8);
    margin-bottom: 1.4rem;
    position: relative; z-index: 1;
  }

  .cd-client-credit {
    font-family: var(--cd-fm); font-size: 0.68rem;
    letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--cd-muted); position: relative; z-index: 1;
  }
  .cd-client-credit span { color: var(--cd-accent); }

  /* ── FOOTER ACTIONS ── */
  .cd-footer-actions {
    display: flex; align-items: center;
    justify-content: space-between; gap: 1.5rem;
    flex-wrap: wrap;
    padding-top: 1rem;
  }

  .cd-live-btn {
    display: inline-flex; align-items: center; gap: 9px;
    padding: 0.9rem 1.8rem; border-radius: 10px;
    font-family: var(--cd-fb); font-size: 0.92rem; font-weight: 600;
    text-decoration: none; color: #fff;
    background: var(--cd-accent);
    box-shadow: 0 4px 22px color-mix(in srgb, var(--cd-accent) 40%, transparent);
    transition: all 0.35s var(--cd-bounce);
    border: 1px solid transparent;
  }
  .cd-live-btn:hover {
    transform: translateY(-3px) scale(1.03);
    box-shadow: 0 8px 36px color-mix(in srgb, var(--cd-accent) 55%, transparent);
  }
  .cd-live-btn svg { font-size: 12px; transition: transform 0.3s var(--cd-bounce); }
  .cd-live-btn:hover svg { transform: translateX(3px) translateY(-2px); }

  .cd-next-btn {
    display: inline-flex; align-items: center; gap: 8px;
    font-family: var(--cd-fm); font-size: 0.68rem;
    letter-spacing: 0.12em; text-transform: uppercase;
    color: var(--cd-muted); text-decoration: none;
    padding: 8px 16px; border-radius: 100px;
    border: 1px solid var(--cd-border);
    transition: all 0.3s var(--cd-out);
  }
  .cd-next-btn:hover {
    color: var(--cd-fog); border-color: rgba(245,244,242,0.25);
    background: rgba(245,244,242,0.05);
  }

  /* ── NOT FOUND ── */
  .cd-not-found {
    min-height: 100vh; display: flex;
    flex-direction: column; align-items: center; justify-content: center;
    gap: 1.5rem; text-align: center;
    background: var(--cd-ink); color: var(--cd-fog);
    font-family: var(--cd-fb);
  }
  .cd-not-found h2 {
    font-family: var(--cd-fd); font-size: 3rem;
    color: var(--cd-fog);
  }

  /* ── RESPONSIVE ── */
  @media (max-width: 860px) {
    .cd-main-grid { grid-template-columns: 1fr; }
    .cd-wrap { padding: 0 1.5rem 4rem; }
    .cd-feedback { padding: 2rem 1.5rem; }
    .cd-hero-title { font-size: 2.6rem; }
  }
  @media (max-width: 480px) {
    .cd-footer-actions { flex-direction: column; align-items: flex-start; }
    .cd-hero-title { font-size: 2.2rem; }
  }

  ::selection { background: rgba(255,79,46,0.3); color: var(--cd-fog); }
`;

/* ─────────────────────────────────────────
   HOOK
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

function Reveal({ children, dir = 'up', delay = 0, style = {} }) {
  const [ref, visible] = useReveal();
  const cls =
    dir === 'left'  ? 'cd-reveal-l' :
    dir === 'right' ? 'cd-reveal-r' : 'cd-reveal';
  return (
    <div
      ref={ref}
      className={`${cls} ${visible ? 'cd-in' : ''}`}
      style={{ transitionDelay: `${delay}s`, ...style }}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────
   COMPONENT
───────────────────────────────────────── */
export default function ClientDetail() {
  const { slug } = useParams();
  const project = clientData[slug];

  // get prev / next slugs for navigation
  const slugs = Object.keys(clientData);
  const currentIdx = slugs.indexOf(slug);
  const nextSlug = slugs[(currentIdx + 1) % slugs.length];
  const nextProject = clientData[nextSlug];

  if (!project) {
    return (
      <div className="cd-not-found">
        <style>{css}</style>
        <h2>Project Not Found</h2>
        <Link to="/clients" className="cd-back">
          <FaChevronLeft /> Back to Clients
        </Link>
      </div>
    );
  }

  return (
    <div className="cd-root" style={{ '--cd-accent': project.accent }}>
      <style>{css}</style>
      <div className="cd-aura" />
      <div className="cd-grid" />

      <div className="cd-wrap">

        {/* ── NAV ── */}
        <Reveal>
          <nav className="cd-nav">
            <Link to="/clients" className="cd-back">
              <FaChevronLeft /> All Projects
            </Link>
            <span className="cd-nav-name">{project.heroTag}</span>
          </nav>
        </Reveal>

        {/* ── HERO ── */}
        <div className="cd-hero">
          <Reveal delay={0.05}>
            <div className="cd-hero-num">Project {project.num}</div>
            <div className="cd-hero-tag">
              <span className="cd-hero-tag-dot" />
              {project.heroTag}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="cd-hero-title">
              {project.name.split(' ').slice(0, -1).join(' ')}{' '}
              <em>{project.name.split(' ').slice(-1)}</em>
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="cd-hero-desc">{project.description}</p>
            <div className="cd-results">
              {project.results.map(r => (
                <span key={r} className="cd-result-pill">{r}</span>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="cd-divider" />

        {/* ── MAIN GRID ── */}
        <div className="cd-main-grid">

          {/* INFO */}
          <div className="cd-info-pane">
            <Reveal dir="left" delay={0.05}>
              <div className="cd-info-card">
                <div className="cd-card-icon"><FaTools /></div>
                <h3>The Challenge</h3>
                <p>{project.challenge}</p>
              </div>
            </Reveal>

            <Reveal dir="left" delay={0.12}>
              <div className="cd-info-card">
                <div className="cd-card-icon"><FaLayerGroup /></div>
                <h3>Our Solution</h3>
                <p>{project.solution}</p>
              </div>
            </Reveal>

            <Reveal dir="left" delay={0.18}>
              <div className="cd-tech-box">
                <h4>Technologies Used</h4>
                <div className="cd-tech-pills">
                  {project.tech.map(t => (
                    <span key={t} className="cd-tech-pill">{t}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* GALLERY */}
          <div className="cd-gallery-pane">
            <Reveal dir="right" delay={0.05}>
              <div className="cd-gallery-label">
                <FaCode /> Runtime screenshots
              </div>
              <div className="cd-gallery">
                {project.photos.map((pic, i) => (
                  <div className="cd-gallery-frame" key={i}>
                    <span className="cd-gallery-frame-num">
                      {String(i + 1).padStart(2, '0')} / {String(project.photos.length).padStart(2, '0')}
                    </span>
                    <img
                      src={pic}
                      alt={`${project.name} preview ${i + 1}`}
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

        </div>

        {/* ── FEEDBACK ── */}
        <Reveal delay={0.08}>
          <div className="cd-feedback">
            <FaQuoteLeft className="cd-quote-icon" />
            <blockquote className="cd-blockquote">
              "{project.feedback}"
            </blockquote>
            <p className="cd-client-credit">
              — <span>{project.client}</span>
            </p>
          </div>
        </Reveal>

        {/* ── FOOTER ACTIONS ── */}
        <Reveal delay={0.1}>
          <div className="cd-footer-actions">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="cd-live-btn"
            >
              <FaGlobe /> Visit Live Site <FaExternalLinkAlt />
            </a>
            <Link
              to={`/client-details/${nextSlug}`}
              className="cd-next-btn"
            >
              Next: {nextProject.name} <FaArrowRight />
            </Link>
          </div>
        </Reveal>

      </div>
    </div>
  );
}