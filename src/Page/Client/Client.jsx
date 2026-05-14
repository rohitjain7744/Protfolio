import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaBriefcase, FaCode } from 'react-icons/fa';

// Project images — update paths as needed
import MahavirImg from '../../assets/Logo2.png';
import MachineryImg from '../../assets/Logo1.png';
import cgi from "../../assets/Project/cgi.png";
import dhruv from "../../assets/Project/dhruv.png";
import om from "../../assets/Project/om.png";
import mahavir from "../../assets/Project/mahavir.png";
import hotel from "../../assets/Project/hotel.png";
/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const clientProjects = [
  {
    id: 'mahavir-chemical',
    name: 'Mahaveer Chemicals Group',
    category: 'Industrial Catalog & B2B',
    description:
      'A professional platform for managing 500+ specialty chemicals with smart filtering, advanced search, and technical documentation — built for procurement teams.',
    tags: ['React.js', 'Spring Boot', 'MySQL'],
    image: mahavir,
    accent: '#ff4f2e',
    num: '01',
  },
  {
    id: 'industrial-machinery',
    name: 'OM Motors & Vishal Harvesters',
    category: 'E-commerce & Machinery',
    description:
      'A high-performance sales platform for agricultural machinery featuring showroom-style galleries, detailed specs, and dealer inquiry flows.',
    tags: ['React.js', 'JavaScript', 'Css'],
    image: om,
    accent: '#1a1aff',
    num: '02',
  },
  {
    id: 'cgi-tech-solutions',
    name: 'CGI Tech Solutions',
    category: 'Enterprise Software',
    description:
      'Scalable digital infrastructure for a modern tech enterprise — microservices-backed, cloud-deployed, and optimised for high-traffic SaaS delivery.',
    tags: ['React.js', 'Spring Boot', 'AWS'],
    image: cgi,
    accent: '#00c9a7',
    num: '03',
  },
  {
    id: 'Dhruv-investments',
    name: 'Dhruv Investments',
    category: 'Financial Services',
    description:
      'A comprehensive financial planning platform designed to help users manage their investments and achieve long-term financial goals.',
    tags: ['React.js', 'JavaScript', 'Css'],
    image: dhruv,
    accent: '#ff6b47',
    num: '04',
  },
  {
    id:'Golden-Hotel',
    name: 'Golden Hotel and Resorts ',
    category: 'Hospitality & Booking',
    description:
      'A user-friendly hotel booking platform with real-time availability, secure payment processing, and personalised recommendations for travellers.',    

      tags: ['React.js', 'Node.js', 'MongoDB'],
      image: hotel,
      accent: '#ff8a65',  
      num: '05',

  }
];

/* ─────────────────────────────────────────
   STYLES (scoped via class prefix "cp-")
───────────────────────────────────────── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Cabinet+Grotesk:wght@300;400;500;700;800&family=JetBrains+Mono:wght@400;500&display=swap');

  :root {
    --cp-ink:   #0a0a0f;
    --cp-fog:   #f5f4f2;
    --cp-muted: #7a7888;
    --cp-border: rgba(245,244,242,0.08);
    --cp-accent: #ff4f2e;
    --cp-accent2: #1a1aff;
    --cp-accent3: #00c9a7;
    --cp-fd: 'DM Serif Display', serif;
    --cp-fb: 'Cabinet Grotesk', sans-serif;
    --cp-fm: 'JetBrains Mono', monospace;
    --cp-bounce: cubic-bezier(0.34,1.56,0.64,1);
    --cp-out:   cubic-bezier(0.22,1,0.36,1);
  }

  /* ── ROOT ── */
  .cp-root {
    background: var(--cp-ink);
    color: var(--cp-fog);
    font-family: var(--cp-fb);
    min-height: 100vh;
    position: relative;
    overflow: hidden;
    -webkit-font-smoothing: antialiased;
  }

  /* noise grain */
  .cp-root::before {
    content: '';
    position: fixed; inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
    opacity: 0.03; pointer-events: none; z-index: 9999;
  }

  /* ── BG LAYERS ── */
  .cp-aura {
    position: absolute; inset: 0; pointer-events: none;
    background:
      radial-gradient(ellipse 55% 55% at 80% 10%, rgba(255,79,46,0.07) 0%, transparent 60%),
      radial-gradient(ellipse 45% 40% at 10% 85%, rgba(26,26,255,0.06) 0%, transparent 55%),
      radial-gradient(ellipse 30% 30% at 50% 55%, rgba(0,201,167,0.04) 0%, transparent 60%);
    animation: cpAura 14s ease-in-out infinite alternate;
  }
  @keyframes cpAura {
    0%   { opacity: 0.8; }
    50%  { opacity: 1; }
    100% { opacity: 0.7; }
  }

  .cp-grid {
    position: absolute; inset: 0; pointer-events: none;
    background-image:
      linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px);
    background-size: 40px 40px;
    mask-image: radial-gradient(ellipse 85% 85% at 50% 40%, black 20%, transparent 100%);
  }

  /* ── CONTAINER ── */
  .cp-wrap {
    position: relative; z-index: 2;
    max-width: 1140px; margin: 0 auto;
    padding: 6rem 2.5rem 5rem;
  }

  /* ── SCROLL REVEAL ── */
  .cp-reveal {
    opacity: 0; transform: translateY(32px);
    transition: opacity 0.75s var(--cp-out), transform 0.75s var(--cp-out);
  }
  .cp-reveal.cp-in { opacity: 1; transform: translateY(0); }
  .cp-reveal-l {
    opacity: 0; transform: translateX(-36px);
    transition: opacity 0.75s var(--cp-out), transform 0.75s var(--cp-out);
  }
  .cp-reveal-l.cp-in { opacity: 1; transform: translateX(0); }
  .cp-reveal-r {
    opacity: 0; transform: translateX(36px);
    transition: opacity 0.75s var(--cp-out), transform 0.75s var(--cp-out);
  }
  .cp-reveal-r.cp-in { opacity: 1; transform: translateX(0); }

  /* ── HEADER ── */
  .cp-header { margin-bottom: 5rem; }

  .cp-eyebrow {
    display: inline-flex; align-items: center; gap: 10px;
    font-family: var(--cp-fm); font-size: 0.68rem;
    letter-spacing: 0.16em; text-transform: uppercase;
    color: rgba(255,160,140,0.85);
    border: 1px solid rgba(255,79,46,0.28);
    background: rgba(255,79,46,0.07);
    padding: 6px 14px; border-radius: 100px;
    margin-bottom: 2rem;
  }
  .cp-eyebrow svg { font-size: 11px; }
  .cp-eyebrow-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: var(--cp-accent);
    animation: cpDot 2s ease-in-out infinite;
    box-shadow: 0 0 6px var(--cp-accent);
  }
  @keyframes cpDot {
    0%,100% { box-shadow: 0 0 4px var(--cp-accent); transform: scale(1); }
    50%      { box-shadow: 0 0 14px var(--cp-accent); transform: scale(1.45); }
  }

  .cp-h1 {
    font-family: var(--cp-fd);
    font-size: clamp(2.8rem, 5.5vw, 5rem);
    line-height: 1.0; letter-spacing: -0.025em;
    color: var(--cp-fog); margin-bottom: 1.2rem;
  }
  .cp-h1 em {
    font-style: italic;
    background: linear-gradient(135deg,#ff6b47 0%,#ff4f2e 40%,#ff8a65 75%,#ffb347 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }

  .cp-header-sub {
    font-size: clamp(0.95rem,1.4vw,1.1rem);
    line-height: 1.8; color: rgba(245,244,242,0.45);
    max-width: 520px;
  }

  /* count pill */
  .cp-count {
    display: inline-flex; align-items: center; gap: 8px;
    font-family: var(--cp-fm); font-size: 0.62rem;
    letter-spacing: 0.12em; text-transform: uppercase;
    color: rgba(0,201,167,0.75);
    background: rgba(0,201,167,0.08);
    border: 1px solid rgba(0,201,167,0.2);
    padding: 5px 12px; border-radius: 100px;
    margin-top: 1.5rem;
  }
  .cp-count-dot {
    width: 5px; height: 5px; border-radius: 50%;
    background: var(--cp-accent3);
    animation: cpDot 2.4s ease-in-out infinite;
  }

  /* ── DIVIDER ── */
  .cp-divider {
    height: 1px;
    background: linear-gradient(90deg, var(--cp-accent), transparent);
    opacity: 0.2; margin: 0 0 4rem;
  }

  /* ── PROJECT CARDS ── */
  .cp-grid-cards { display: flex; flex-direction: column; gap: 2px; }

  .cp-card {
    display: grid;
    grid-template-columns: 1fr 1fr;
    border: 1px solid var(--cp-border);
    border-radius: 20px; overflow: hidden;
    background: rgba(245,244,242,0.025);
    transition: border-color 0.4s ease, background 0.4s ease;
    position: relative;
  }
  .cp-card:not(:last-child) { margin-bottom: 1.5rem; }
  .cp-card:hover {
    border-color: rgba(245,244,242,0.16);
    background: rgba(245,244,242,0.04);
  }
  /* accent line on hover */
  .cp-card::after {
    content: '';
    position: absolute; left: 0; top: 0; bottom: 0;
    width: 3px;
    background: var(--card-accent, var(--cp-accent));
    transform: scaleY(0); transform-origin: top;
    transition: transform 0.45s var(--cp-out);
    border-radius: 3px 0 0 3px;
  }
  .cp-card:hover::after { transform: scaleY(1); }

  /* flip layout for even cards */
  .cp-card--flip { direction: rtl; }
  .cp-card--flip > * { direction: ltr; }

  /* ── IMAGE SIDE ── */
  .cp-img-wrap {
    position: relative; overflow: hidden;
    min-height: 340px;
  }
  .cp-img {
    width: 100%; height: 100%;
    object-fit: cover; object-position: center;
    transition: transform 0.7s var(--cp-out), filter 0.5s ease;
    filter: brightness(0.75) saturate(0.85);
    display: block;
  }
  .cp-card:hover .cp-img {
    transform: scale(1.06);
    filter: brightness(0.85) saturate(1);
  }

  /* image overlay */
  .cp-img-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(10,10,15,0.5) 0%, transparent 60%);
    display: flex; align-items: flex-end;
    padding: 1.5rem;
    opacity: 0; transition: opacity 0.4s ease;
  }
  .cp-card:hover .cp-img-overlay { opacity: 1; }

  .cp-view-btn {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 0.7rem 1.4rem; border-radius: 10px;
    font-family: var(--cp-fb); font-size: 0.85rem; font-weight: 600;
    text-decoration: none; color: #fff;
    background: var(--card-accent, var(--cp-accent));
    box-shadow: 0 4px 20px rgba(0,0,0,0.4);
    transform: translateY(12px);
    transition: transform 0.4s var(--cp-bounce), box-shadow 0.3s;
  }
  .cp-card:hover .cp-view-btn {
    transform: translateY(0);
    box-shadow: 0 8px 30px rgba(0,0,0,0.5);
  }
  .cp-view-btn svg { font-size: 12px; transition: transform 0.3s var(--cp-bounce); }
  .cp-view-btn:hover svg { transform: translateX(4px); }

  /* ── INFO SIDE ── */
  .cp-info {
    padding: 2.8rem 2.8rem 2.5rem;
    display: flex; flex-direction: column; justify-content: center;
    gap: 0;
  }

  .cp-num {
    font-family: var(--cp-fm); font-size: 0.6rem;
    letter-spacing: 0.18em; text-transform: uppercase;
    color: var(--card-accent, var(--cp-accent));
    margin-bottom: 1rem; opacity: 0.7;
  }

  .cp-cat {
    display: inline-flex; align-items: center; gap: 8px;
    font-family: var(--cp-fm); font-size: 0.62rem;
    letter-spacing: 0.12em; text-transform: uppercase;
    color: var(--cp-muted); margin-bottom: 0.8rem;
  }
  .cp-cat-line {
    height: 1px; width: 22px;
    background: var(--card-accent, var(--cp-accent));
    opacity: 0.5;
  }

  .cp-name {
    font-family: var(--cp-fd);
    font-size: clamp(1.3rem,2.2vw,1.8rem);
    line-height: 1.15; color: var(--cp-fog);
    margin-bottom: 1rem;
  }

  .cp-desc {
    font-size: 0.92rem; line-height: 1.8;
    color: rgba(245,244,242,0.45);
    margin-bottom: 1.6rem;
    max-width: 420px;
  }

  .cp-tags {
    display: flex; align-items: center;
    flex-wrap: wrap; gap: 6px;
  }
  .cp-tag-icon {
    font-size: 11px;
    color: var(--card-accent, var(--cp-accent));
    margin-right: 2px; opacity: 0.8;
  }
  .cp-tag {
    font-family: var(--cp-fm); font-size: 0.6rem;
    letter-spacing: 0.06em; text-transform: uppercase;
    padding: 4px 10px; border-radius: 100px;
    border: 1px solid var(--cp-border);
    color: var(--cp-muted);
    transition: border-color 0.3s, color 0.3s;
  }
  .cp-card:hover .cp-tag {
    border-color: rgba(245,244,242,0.18);
    color: rgba(245,244,242,0.7);
  }

  /* ── CTA ── */
  .cp-cta {
    margin-top: 5rem;
    padding: 3.5rem;
    border: 1px solid var(--cp-border);
    border-radius: 22px;
    background: rgba(245,244,242,0.02);
    display: flex; align-items: center;
    justify-content: space-between; gap: 2.5rem;
    position: relative; overflow: hidden;
  }
  .cp-cta::before {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(130deg, rgba(255,79,46,0.05) 0%, transparent 45%, rgba(26,26,255,0.04) 100%);
    pointer-events: none;
  }
  /* shimmer sweep */
  .cp-cta::after {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.03) 50%, transparent 60%);
    animation: cpShimmer 6s ease-in-out infinite;
  }
  @keyframes cpShimmer {
    0%   { transform: translateX(-100%); }
    60%,100% { transform: translateX(200%); }
  }

  .cp-cta-text { position: relative; z-index: 1; }
  .cp-cta-h2 {
    font-family: var(--cp-fd);
    font-size: clamp(1.6rem, 3vw, 2.4rem);
    line-height: 1.1; color: var(--cp-fog);
  }
  .cp-cta-h2 em {
    font-style: italic;
    background: linear-gradient(135deg,#ff6b47,#ff4f2e,#ff8a65);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }
  .cp-cta-sub {
    font-family: var(--cp-fm); font-size: 0.7rem;
    letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--cp-muted); margin-top: 8px;
  }

  .cp-cta-btns {
    display: flex; gap: 12px; flex-shrink: 0;
    flex-wrap: wrap; position: relative; z-index: 1;
  }

  .cp-btn {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 0.9rem 1.8rem; border-radius: 10px;
    font-family: var(--cp-fb); font-size: 0.92rem; font-weight: 600;
    cursor: pointer; text-decoration: none;
    transition: all 0.35s var(--cp-bounce);
    border: 1px solid transparent;
  }
  .cp-btn-primary {
    background: var(--cp-accent); color: #fff;
    box-shadow: 0 4px 22px rgba(255,79,46,0.3);
  }
  .cp-btn-primary:hover {
    transform: translateY(-3px) scale(1.03);
    box-shadow: 0 8px 34px rgba(255,79,46,0.5);
  }
  .cp-btn-ghost {
    background: transparent; color: var(--cp-fog);
    border-color: rgba(245,244,242,0.15);
  }
  .cp-btn-ghost:hover {
    transform: translateY(-3px) scale(1.03);
    background: rgba(245,244,242,0.06);
    border-color: rgba(245,244,242,0.3);
  }

  /* ── RESPONSIVE ── */
  @media (max-width: 860px) {
    .cp-card { grid-template-columns: 1fr; direction: ltr !important; }
    .cp-card--flip > * { direction: ltr; }
    .cp-img-wrap { min-height: 240px; }
    .cp-info { padding: 2rem; }
    .cp-cta { flex-direction: column; text-align: center; }
    .cp-cta-btns { justify-content: center; }
    .cp-wrap { padding: 4rem 1.5rem 4rem; }
  }

  @media (max-width: 480px) {
    .cp-h1 { font-size: 2.5rem; }
    .cp-cta { padding: 2.2rem 1.5rem; }
    .cp-info { padding: 1.5rem; }
  }

  ::selection { background: rgba(255,79,46,0.3); color: var(--cp-fog); }
`;

/* ─────────────────────────────────────────
   INTERSECTION OBSERVER HOOK
───────────────────────────────────────── */
function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
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
    dir === 'left'  ? 'cp-reveal-l' :
    dir === 'right' ? 'cp-reveal-r' : 'cp-reveal';
  return (
    <div
      ref={ref}
      className={`${cls} ${visible ? 'cp-in' : ''}`}
      style={{ transitionDelay: `${delay}s`, ...style }}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────── */
export default function ClientPage() {
  return (
    <div className="cp-root">
      <style>{css}</style>
      <div className="cp-aura" />
      <div className="cp-grid" />

      <div className="cp-wrap">

        {/* ── HEADER ── */}
        <div className="cp-header">
          <Reveal>
            <div className="cp-eyebrow">
              <span className="cp-eyebrow-dot" />
              <FaBriefcase /> Professional Work
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="cp-h1">
              Client <em>Success</em><br />Stories.
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="cp-header-sub">
              Helping businesses transition into the digital era with robust,
              scalable full-stack applications — from ideation to deployment.
            </p>
            <div className="cp-count">
              <span className="cp-count-dot" />
              {clientProjects.length} live projects delivered
            </div>
          </Reveal>
        </div>

        <div className="cp-divider" />

        {/* ── CARDS ── */}
        <div className="cp-grid-cards">
          {clientProjects.map((project, index) => (
            <Reveal
              key={project.id}
              dir={index % 2 === 0 ? 'left' : 'right'}
              delay={index * 0.1}
            >
              <div
                className={`cp-card${index % 2 !== 0 ? ' cp-card--flip' : ''}`}
                style={{ '--card-accent': project.accent }}
              >
                {/* IMAGE */}
                <div className="cp-img-wrap">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="cp-img"
                    loading="lazy"
                  />
                  <div className="cp-img-overlay">
                    <Link to={`/client-details/${project.id}`} className="cp-view-btn">
                      See Case Study <FaArrowRight />
                    </Link>
                  </div>
                </div>

                {/* INFO */}
                <div className="cp-info">
                  <div className="cp-num">Project {project.num}</div>
                  <div className="cp-cat">
                    <span className="cp-cat-line" />
                    {project.category}
                  </div>
                  <h3 className="cp-name">{project.name}</h3>
                  <p className="cp-desc">{project.description}</p>
                 
                  <div className="cp-tags">
                    <FaCode className="cp-tag-icon" />
                    {project.tags.map(tag => (
                      <span key={tag} className="cp-tag">{tag}</span>

                    ))}
                    
                  </div>
                    <h3 ClassName="cp-name">Live and Deploy </h3>
                </div>
               
              </div>
            </Reveal>
          ))}
        </div>

        {/* ── CTA ── */}
        <Reveal delay={0.1}>
          <div className="cp-cta">
            <div className="cp-cta-text">
              <h2 className="cp-cta-h2">
                Ready to build something <em>great?</em>
              </h2>
              <p className="cp-cta-sub">Let's turn your idea into a live product</p>
            </div>
            <div className="cp-cta-btns">
              <Link to="/contact" className="cp-btn cp-btn-primary">
                Start a Project
              </Link>
              <Link to="/projects" className="cp-btn cp-btn-ghost">
                View All Work ↗
              </Link>
            </div>
          </div>
        </Reveal>

      </div>
    </div>
  );
}