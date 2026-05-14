import { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────
   STYLES — matches Hero design system
───────────────────────────────────────── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Cabinet+Grotesk:wght@300;400;500;700;800&family=JetBrains+Mono:wght@400;500&display=swap');

  :root {
    --a-ink:    #0a0a0f;
    --a-fog:    #f5f4f2;
    --a-muted:  #7a7888;
    --a-border: rgba(245,244,242,0.08);
    --a-bh:     rgba(245,244,242,0.14);
    --a-card:   rgba(255,255,255,0.028);
    --a-cardh:  rgba(255,255,255,0.052);
    --a-accent: #ff4f2e;
    --a-blue:   #1a1aff;
    --a-teal:   #00c9a7;
    --a-fd: 'DM Serif Display', serif;
    --a-fb: 'Cabinet Grotesk', sans-serif;
    --a-fm: 'JetBrains Mono', monospace;
    --a-out:    cubic-bezier(0.22,1,0.36,1);
    --a-bounce: cubic-bezier(0.34,1.56,0.64,1);
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  /* ── SECTION ── */
  .ab-section {
    position: relative;
    background: var(--a-ink);
    color: var(--a-fog);
    font-family: var(--a-fb);
    -webkit-font-smoothing: antialiased;
    overflow: hidden;
    padding: 7rem 0 6rem;
  }

  /* noise grain */
  .ab-section::before {
    content: '';
    position: absolute; inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
    opacity: 0.022; pointer-events: none; z-index: 0;
  }

  /* ambient glows */
  .ab-glow {
    position: absolute; pointer-events: none; z-index: 0; border-radius: 50%;
    filter: blur(90px);
  }
  .ab-glow--1 {
    width: 720px; height: 520px;
    background: radial-gradient(ellipse, rgba(255,79,46,0.09) 0%, transparent 65%);
    top: -160px; left: -220px;
    animation: abGlow 14s ease-in-out infinite alternate;
  }
  .ab-glow--2 {
    width: 540px; height: 420px;
    background: radial-gradient(ellipse, rgba(26,26,255,0.07) 0%, transparent 65%);
    bottom: -80px; right: -120px;
    animation: abGlow 18s ease-in-out infinite alternate-reverse;
  }
  .ab-glow--3 {
    width: 350px; height: 300px;
    background: radial-gradient(ellipse, rgba(0,201,167,0.06) 0%, transparent 65%);
    top: 40%; left: 55%;
    animation: abGlow 10s ease-in-out infinite alternate;
  }
  @keyframes abGlow {
    0%   { opacity: 0.7; transform: scale(1); }
    100% { opacity: 1;   transform: scale(1.08); }
  }

  /* ── CONTAINER ── */
  .ab-container {
    position: relative; z-index: 1;
    max-width: 1160px;
    margin: 0 auto;
    padding: 0 2.5rem;
  }

  /* ── SECTION LABEL ── */
  .ab-label {
    display: inline-flex; align-items: center; gap: 10px;
    font-family: var(--a-fm);
    font-size: 0.62rem; letter-spacing: 0.18em; text-transform: uppercase;
    color: rgba(255,160,140,0.9);
    border: 1px solid rgba(255,79,46,0.25);
    background: rgba(255,79,46,0.07);
    padding: 5px 14px; border-radius: 100px;
    margin-bottom: 1.1rem;
  }
  .ab-label-dot {
    width: 5px; height: 5px; border-radius: 50%;
    background: var(--a-accent);
    box-shadow: 0 0 8px var(--a-accent);
    animation: abDot 2s ease-in-out infinite;
  }
  @keyframes abDot {
    0%,100% { box-shadow:0 0 4px var(--a-accent); transform:scale(1); }
    50%     { box-shadow:0 0 14px var(--a-accent); transform:scale(1.5); }
  }

  /* ── HEADING ── */
  .ab-heading {
    font-family: var(--a-fd);
    font-size: clamp(2.4rem, 5vw, 3.8rem);
    font-weight: 400;
    letter-spacing: -0.025em;
    line-height: 1.08;
    color: var(--a-fog);
    margin-bottom: 3.5rem;
  }
  .ab-heading em {
    font-style: italic;
    background: linear-gradient(135deg, #ff6b47 0%, var(--a-accent) 40%, #ff8a65 75%, #ffb347 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }

  /* ── REVEAL ANIMATION ── */
  .ab-reveal {
    opacity: 0;
    transform: translateY(36px);
    transition: opacity 0.75s var(--a-out), transform 0.75s var(--a-out);
  }
  .ab-reveal.ab-visible {
    opacity: 1;
    transform: translateY(0);
  }

  /* ─────────────────────────────────────────
     TOP — INTRO SPLIT
  ───────────────────────────────────────── */
  .ab-top {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5rem;
    align-items: start;
    margin-bottom: 6rem;
  }

  .ab-intro-text {
    font-size: 1.05rem;
    line-height: 1.9;
    color: rgba(245,244,242,0.52);
  }
  .ab-intro-text p + p { margin-top: 1.25rem; }
  .ab-intro-text strong { color: var(--a-fog); font-weight: 700; }
  .ab-intro-text .ab-accent-word {
    color: var(--a-accent); font-weight: 600;
  }

  /* QUICK FACTS card */
  .ab-facts {
    border: 1px solid var(--a-border);
    border-radius: 22px;
    overflow: hidden;
    background: var(--a-card);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
  }

  .ab-facts-header {
    padding: 1rem 1.5rem 0.85rem;
    border-bottom: 1px solid var(--a-border);
    font-family: var(--a-fm);
    font-size: 0.6rem; letter-spacing: 0.14em; text-transform: uppercase;
    color: var(--a-muted);
  }

  .ab-fact {
    display: flex; align-items: center; gap: 13px;
    padding: 0.9rem 1.5rem;
    border-bottom: 1px solid var(--a-border);
    transition: background 0.25s ease;
    cursor: default;
  }
  .ab-fact:last-child { border-bottom: none; }
  .ab-fact:hover { background: var(--a-cardh); }

  .ab-fact-icon {
    width: 34px; height: 34px; border-radius: 9px;
    display: flex; align-items: center; justify-content: center;
    font-size: 14px; flex-shrink: 0;
  }
  .afi-red    { background: rgba(255,79,46,0.14); }
  .afi-blue   { background: rgba(26,26,255,0.16); }
  .afi-teal   { background: rgba(0,201,167,0.13); }
  .afi-amber  { background: rgba(250,180,75,0.13); }
  .afi-purple { background: rgba(160,90,255,0.14); }

  .ab-fact-body { display: flex; flex-direction: column; gap: 2px; }
  .ab-fact-label {
    font-family: var(--a-fm);
    font-size: 0.58rem; letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--a-muted);
  }
  .ab-fact-value {
    font-size: 0.88rem; font-weight: 600;
    color: var(--a-fog);
  }
  .ab-fact-value a {
    color: rgba(255,160,140,0.9); text-decoration: none;
    transition: color 0.2s;
  }
  .ab-fact-value a:hover { color: var(--a-accent); }

  /* ─────────────────────────────────────────
     SKILLS
  ───────────────────────────────────────── */
  .ab-skills { margin-bottom: 6rem; }

  .ab-skills-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.2rem;
  }

  .ab-skill-cat {
    background: var(--a-card);
    border: 1px solid var(--a-border);
    border-radius: 20px;
    padding: 1.5rem 1.6rem;
    transition: border-color 0.3s, background 0.3s, transform 0.35s var(--a-bounce);
    cursor: default;
    position: relative;
    overflow: hidden;
  }
  .ab-skill-cat::before {
    content: '';
    position: absolute; inset: 0; border-radius: 20px;
    background: var(--ab-cat-glow, transparent);
    opacity: 0;
    transition: opacity 0.3s;
    pointer-events: none;
  }
  .ab-skill-cat:hover { border-color: var(--a-bh); background: var(--a-cardh); transform: translateY(-5px); }
  .ab-skill-cat:hover::before { opacity: 1; }

  .ab-skill-cat-hdr {
    display: flex; align-items: center; gap: 10px;
    margin-bottom: 1.1rem;
  }
  .ab-skill-cat-ico {
    width: 36px; height: 36px; border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-size: 16px; flex-shrink: 0;
  }
  .ab-skill-cat-name {
    font-family: var(--a-fd);
    font-size: 1rem; font-weight: 400;
    color: var(--a-fog); letter-spacing: -0.01em;
    font-style: italic;
  }

  .ab-tags {
    display: flex; flex-wrap: wrap; gap: 6px;
  }
  .ab-tag {
    font-family: var(--a-fm);
    font-size: 0.68rem; font-weight: 400;
    padding: 4px 10px; border-radius: 100px;
    background: rgba(255,255,255,0.04);
    border: 1px solid var(--a-border);
    color: rgba(245,244,242,0.55);
    transition: all 0.25s ease;
    cursor: default;
    letter-spacing: 0.02em;
  }
  .ab-tag:hover {
    background: rgba(255,79,46,0.1);
    border-color: rgba(255,79,46,0.3);
    color: rgba(255,160,140,0.9);
  }

  /* ─────────────────────────────────────────
     EXPERIENCE — timeline
  ───────────────────────────────────────── */
  .ab-experience { margin-bottom: 6rem; }

  .ab-timeline {
    position: relative;
    padding-left: 2.4rem;
  }
  .ab-timeline::before {
    content: '';
    position: absolute; left: 0; top: 10px; bottom: 0;
    width: 1.5px;
    background: linear-gradient(to bottom, var(--a-accent) 0%, rgba(255,79,46,0.08) 100%);
    border-radius: 1px;
  }

  .ab-titem {
    position: relative;
    margin-bottom: 2.4rem;
  }
  .ab-titem:last-child { margin-bottom: 0; }

  .ab-tdot {
    position: absolute;
    left: -2.4rem; top: 6px;
    width: 10px; height: 10px; border-radius: 50%;
    background: var(--a-accent);
    box-shadow: 0 0 0 3px rgba(255,79,46,0.18), 0 0 12px rgba(255,79,46,0.35);
    margin-left: -3.5px;
  }
  .ab-tdot--pulse {
    animation: abTDot 2.2s ease-in-out infinite;
  }
  @keyframes abTDot {
    0%,100% { box-shadow:0 0 0 3px rgba(255,79,46,0.18), 0 0 10px rgba(255,79,46,0.35); }
    50%     { box-shadow:0 0 0 6px rgba(255,79,46,0.1),  0 0 22px rgba(255,79,46,0.55); }
  }

  .ab-tcard {
    background: var(--a-card);
    border: 1px solid var(--a-border);
    border-radius: 18px;
    padding: 1.5rem 1.7rem;
    transition: border-color 0.3s, background 0.3s, transform 0.35s var(--a-bounce);
  }
  .ab-tcard:hover {
    border-color: var(--a-bh); background: var(--a-cardh);
    transform: translateX(6px);
  }

  .ab-tcard-top {
    display: flex; justify-content: space-between; align-items: flex-start;
    gap: 1rem; margin-bottom: 0.9rem; flex-wrap: wrap;
  }
  .ab-trole {
    font-family: var(--a-fd); font-size: 1.15rem; font-style: italic;
    color: var(--a-fog); letter-spacing: -0.01em;
    margin-bottom: 4px;
  }
  .ab-tcompany {
    font-family: var(--a-fm); font-size: 0.72rem;
    color: rgba(255,160,140,0.9); letter-spacing: 0.04em;
  }
  .ab-tperiod {
    font-family: var(--a-fm); font-size: 0.65rem;
    letter-spacing: 0.08em; white-space: nowrap;
    color: var(--a-muted);
    background: rgba(255,255,255,0.05);
    border: 1px solid var(--a-border);
    padding: 3px 10px; border-radius: 100px;
    flex-shrink: 0; align-self: flex-start;
  }

  .ab-tpoints {
    list-style: none;
    display: flex; flex-direction: column; gap: 0.55rem;
  }
  .ab-tpoints li {
    font-size: 0.9rem; color: rgba(245,244,242,0.5);
    line-height: 1.65; padding-left: 1.1rem; position: relative;
  }
  .ab-tpoints li::before {
    content: '';
    position: absolute; left: 0; top: 10px;
    width: 4px; height: 1.5px;
    background: var(--a-accent); border-radius: 1px;
  }

  .ab-cert {
    display: inline-flex; align-items: center; gap: 7px;
    margin-top: 1rem;
    font-family: var(--a-fm); font-size: 0.65rem;
    letter-spacing: 0.07em; text-transform: uppercase;
    color: var(--a-teal);
    background: rgba(0,201,167,0.08);
    border: 1px solid rgba(0,201,167,0.2);
    padding: 4px 12px; border-radius: 100px;
  }
  .ab-cert::before {
    content: '✓'; font-size: 0.7rem; font-weight: 700;
  }

  /* ─────────────────────────────────────────
     EDUCATION
  ───────────────────────────────────────── */
  .ab-education { margin-bottom: 6rem; }

  .ab-edu-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.2rem;
  }

  .ab-edu-card {
    background: var(--a-card);
    border: 1px solid var(--a-border);
    border-radius: 20px;
    padding: 1.6rem 1.7rem;
    display: flex; flex-direction: column; gap: 0.6rem;
    transition: border-color 0.3s, background 0.3s, transform 0.35s var(--a-bounce);
    cursor: default;
  }
  .ab-edu-card:hover { border-color: var(--a-bh); background: var(--a-cardh); transform: translateY(-6px); }
  .ab-edu-card--primary {
    border-color: rgba(255,79,46,0.2);
    background: rgba(255,79,46,0.035);
  }

  .ab-edu-badge {
    font-family: var(--a-fm);
    font-size: 0.6rem; letter-spacing: 0.12em; text-transform: uppercase;
    color: rgba(255,160,140,0.9);
    background: rgba(255,79,46,0.1);
    border: 1px solid rgba(255,79,46,0.22);
    padding: 3px 10px; border-radius: 100px;
    align-self: flex-start;
  }
  .ab-edu-degree {
    font-family: var(--a-fd); font-size: 1rem; font-style: italic;
    color: var(--a-fog); line-height: 1.3;
  }
  .ab-edu-school {
    font-size: 0.84rem; color: rgba(245,244,242,0.45); line-height: 1.4;
  }
  .ab-edu-meta {
    display: flex; align-items: center; gap: 8px; margin-top: 4px;
    flex-wrap: wrap;
  }
  .ab-edu-year {
    font-family: var(--a-fm); font-size: 0.67rem;
    color: var(--a-muted);
    background: rgba(255,255,255,0.05); border: 1px solid var(--a-border);
    padding: 2px 9px; border-radius: 100px;
  }
  .ab-edu-score {
    font-family: var(--a-fm); font-size: 0.7rem;
    color: var(--a-teal); font-weight: 500;
  }

  /* ─────────────────────────────────────────
     INTERESTS
  ───────────────────────────────────────── */
  .ab-interests { margin-bottom: 6rem; }

  .ab-interests-strip {
    display: flex; flex-wrap: wrap; gap: 0.75rem;
  }
  .ab-chip {
    display: flex; align-items: center; gap: 9px;
    font-size: 0.88rem; font-weight: 500;
    color: rgba(245,244,242,0.55);
    padding: 10px 20px; border-radius: 100px;
    border: 1px solid var(--a-border);
    background: var(--a-card);
    transition: all 0.3s var(--a-bounce);
    cursor: default;
  }
  .ab-chip:hover {
    color: var(--a-fog);
    border-color: var(--a-bh);
    background: var(--a-cardh);
    transform: scale(1.05) translateY(-2px);
  }
  .ab-chip-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: var(--a-accent); flex-shrink: 0;
    box-shadow: 0 0 6px rgba(255,79,46,0.5);
  }
  .ab-lang .ab-chip-dot { background: var(--a-teal); box-shadow: 0 0 6px rgba(0,201,167,0.5); }

  /* ─────────────────────────────────────────
     CTA BANNER
  ───────────────────────────────────────── */
  .ab-cta {
    position: relative; overflow: hidden;
    background: linear-gradient(135deg, rgba(255,79,46,0.1) 0%, rgba(26,26,255,0.06) 50%, rgba(0,201,167,0.05) 100%);
    border: 1px solid rgba(255,79,46,0.18);
    border-radius: 26px;
    padding: 3.2rem 3rem;
    display: flex; align-items: center; justify-content: space-between;
    gap: 2.5rem; flex-wrap: wrap;
  }
  .ab-cta::before {
    content: '';
    position: absolute; right: -80px; top: -80px;
    width: 300px; height: 300px; border-radius: 50%;
    background: radial-gradient(circle, rgba(255,79,46,0.12) 0%, transparent 70%);
    pointer-events: none;
    animation: abCTAOrb 6s ease-in-out infinite alternate;
  }
  .ab-cta::after {
    content: '';
    position: absolute; left: -50px; bottom: -60px;
    width: 220px; height: 220px; border-radius: 50%;
    background: radial-gradient(circle, rgba(26,26,255,0.08) 0%, transparent 70%);
    pointer-events: none;
  }
  @keyframes abCTAOrb {
    0%   { transform: scale(1) translate(0,0); }
    100% { transform: scale(1.12) translate(-10px, 10px); }
  }

  .ab-cta-left { position: relative; z-index: 1; }
  .ab-cta-title {
    font-family: var(--a-fd); font-size: clamp(1.5rem, 3vw, 2.2rem);
    font-style: italic; color: var(--a-fog);
    letter-spacing: -0.025em; margin-bottom: 0.5rem;
  }
  .ab-cta-sub {
    font-size: 0.95rem; color: rgba(245,244,242,0.5);
    max-width: 400px; line-height: 1.7;
  }

  .ab-cta-btns {
    display: flex; gap: 1rem; flex-shrink: 0;
    position: relative; z-index: 1; flex-wrap: wrap;
  }

  .ab-btn {
    display: inline-flex; align-items: center; justify-content: center; gap: 8px;
    padding: 0.85rem 1.7rem; border-radius: 11px;
    font-family: var(--a-fb); font-size: 0.9rem; font-weight: 700;
    text-decoration: none; cursor: pointer;
    transition: all 0.35s var(--a-bounce);
    border: 1px solid transparent; outline: none;
  }
  .ab-btn-primary {
    background: var(--a-accent); color: #fff;
    box-shadow: 0 4px 22px rgba(255,79,46,0.32);
  }
  .ab-btn-primary:hover {
    transform: translateY(-3px) scale(1.03);
    box-shadow: 0 8px 34px rgba(255,79,46,0.52);
  }
  .ab-btn-primary svg { transition: transform 0.3s var(--a-bounce); flex-shrink: 0; }
  .ab-btn-primary:hover svg { transform: translateX(4px); }
  .ab-btn-ghost {
    background: transparent; color: var(--a-fog);
    border-color: rgba(245,244,242,0.14);
  }
  .ab-btn-ghost:hover {
    transform: translateY(-3px) scale(1.03);
    background: rgba(245,244,242,0.06);
    border-color: rgba(245,244,242,0.28);
  }

  /* ─────────────────────────────────────────
     RESPONSIVE — tablet
  ───────────────────────────────────────── */
  @media (max-width: 1000px) {
    .ab-skills-grid { grid-template-columns: repeat(2, 1fr); }
    .ab-edu-grid    { grid-template-columns: repeat(2, 1fr); }
  }

  @media (max-width: 860px) {
    .ab-top { grid-template-columns: 1fr; gap: 2.5rem; }
    .ab-cta {
      flex-direction: column; text-align: center;
      padding: 2.5rem 2rem;
      align-items: center;
    }
    .ab-cta-sub { margin: 0 auto; }
    .ab-cta-btns { justify-content: center; }
  }

  @media (max-width: 600px) {
    .ab-section { padding: 5rem 0 4.5rem; }
    .ab-container { padding: 0 1.4rem; }
    .ab-skills-grid { grid-template-columns: 1fr; }
    .ab-edu-grid    { grid-template-columns: 1fr; }
    .ab-timeline { padding-left: 1.8rem; }
    .ab-tdot { left: -1.8rem; margin-left: -3px; }
    .ab-tcard-top { flex-direction: column; gap: 0.5rem; }
  }

  ::selection { background: rgba(255,79,46,0.28); color: var(--a-fog); }
`;

/* ─────────────────────────────────────────
   SCROLL REVEAL HOOK
───────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".ab-reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            // stagger children if data-stagger
            const delay = e.target.dataset.delay || 0;
            setTimeout(() => e.target.classList.add("ab-visible"), Number(delay));
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const SKILLS = [
  {
    icon: "🌐", label: "Languages",
    bg: "rgba(255,79,46,0.13)", glow: "rgba(255,79,46,0.04)",
    tags: ["JavaScript ES6+", "C", "C++", "Core Java", "HTML5", "CSS3"],
  },
  {
    icon: "⚛️", label: "Frameworks",
    bg: "rgba(26,26,255,0.15)", glow: "rgba(26,26,255,0.04)",
    tags: ["React.js", "Node.js", "Express.js", "Spring Boot", "Hibernate"],
  },
  {
    icon: "🗄️", label: "Databases",
    bg: "rgba(0,201,167,0.13)", glow: "rgba(0,201,167,0.04)",
    tags: ["MongoDB", "MySQL", "Relational Schema Design"],
  },
  {
    icon: "🛠️", label: "Tools & Platforms",
    bg: "rgba(250,180,75,0.13)", glow: "rgba(250,180,75,0.04)",
    tags: ["Git", "GitHub", "Postman", "VS Code", "Netlify", "Railway", "Chrome DevTools"],
  },
  {
    icon: "🧠", label: "Concepts",
    bg: "rgba(160,90,255,0.14)", glow: "rgba(160,90,255,0.04)",
    tags: ["DSA", "OOP", "REST APIs", "JWT", "RBAC", "BCrypt", "MVC", "CI/CD", "System Design"],
  },
  {
    icon: "☁️", label: "Architecture",
    bg: "rgba(255,79,46,0.10)", glow: "rgba(255,79,46,0.03)",
    tags: ["Layered Architecture", "Horizontal Scalability", "Controller → Service → Repository"],
  },
];

const FACTS = [
  { icon: "📍", bg: "afi-red",    label: "Location",   value: "Dhule, Maharashtra, India" },
  { icon: "📧", bg: "afi-blue",   label: "Email",      value: <a href="mailto:jain74159@gmail.com">jain74159@gmail.com</a> },
  { icon: "📱", bg: "afi-teal",   label: "Phone",      value: "+91-7744919256" },
  { icon: "🌐", bg: "afi-amber",  label: "Portfolio",  value: <a href="https://rohitjain.netlify.app" target="_blank" rel="noreferrer">rohitjain.netlify.app</a> },
  { icon: "💻", bg: "afi-purple", label: "GitHub",     value: <a href="https://github.com/rohitjain" target="_blank" rel="noreferrer">github.com/rohitjain</a> },
  { icon: "🎓", bg: "afi-teal",   label: "Degree",     value: "B.E. Computer Engg. (Expected May 2026)" },
];

const INTERESTS = [
  "Open Source", "Competitive Programming", "Web3 Technologies",
  "Cloud Computing", "System Design", "UI / UX",
];

const LANGUAGES = ["English", "Hindi", "Marathi"];

/* ─────────────────────────────────────────
   COMPONENT
───────────────────────────────────────── */
export default function About() {
  useReveal();

  return (
    <section className="ab-section" id="about" aria-label="About section">
      <style>{css}</style>

      {/* BG glows */}
      <div className="ab-glow ab-glow--1" aria-hidden="true" />
      <div className="ab-glow ab-glow--2" aria-hidden="true" />
      <div className="ab-glow ab-glow--3" aria-hidden="true" />

      <div className="ab-container">

        {/* ── HEADER ── */}
        <div className="ab-reveal" data-delay="0">
          <div className="ab-label">
            <span className="ab-label-dot" />
            About Me
          </div>
          <h2 className="ab-heading">
            The developer <em>behind the code</em>
          </h2>
        </div>

        {/* ── TOP: INTRO + FACTS ── */}
        <div className="ab-top">

          {/* Intro text */}
          <div className="ab-reveal" data-delay="80">
            <div className="ab-intro-text">
              <p>
                I'm <strong>Rohit Premchand Jain</strong>, a final-year Computer Engineering
                student at <strong>SNJB's K.B. Jain College of Engineering, Chandwad</strong>,
                expecting to graduate in <span className="ab-accent-word">May 2026</span>.
              </p>
              <p>
                My journey started with curiosity about how things work on the web —
                and quickly evolved into a passion for building <strong>production-ready,
                full-stack applications</strong>. I've shipped 4+ MERN-stack apps from
                ideation to cloud deployment, covering auth, DB design, and CI/CD pipelines.
              </p>
              <p>
                During my internship at <strong>Softcrowd Technologies, Nashik</strong>,
                I resolved 10+ frontend bugs, improved cross-browser compatibility, and
                delivered client projects on time in agile sprints. I care deeply about
                clean architecture, performance, and the <span className="ab-accent-word">
                user experience</span> at every layer.
              </p>
              <p>
                When I'm not shipping features, I'm grinding DSA, exploring system design,
                and contributing to open source — always levelling up for top-tier
                software engineering roles.
              </p>
            </div>
          </div>

          {/* Quick facts */}
          <div className="ab-reveal" data-delay="160">
            <div className="ab-facts">
              <div className="ab-facts-header">Quick Facts</div>
              {FACTS.map((f, i) => (
                <div className="ab-fact" key={i}>
                  <div className={`ab-fact-icon ${f.bg}`}>{f.icon}</div>
                  <div className="ab-fact-body">
                    <span className="ab-fact-label">{f.label}</span>
                    <span className="ab-fact-value">{f.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ── SKILLS ── */}
        <div className="ab-skills">
          <div className="ab-reveal" data-delay="0">
            <div className="ab-label"><span className="ab-label-dot" />Technical Skills</div>
            <h3 className="ab-heading" style={{ fontSize: "clamp(1.8rem,3.5vw,2.6rem)", marginBottom: "2rem" }}>
              My <em>toolkit</em>
            </h3>
          </div>
          <div className="ab-skills-grid">
            {SKILLS.map((cat, i) => (
              <div
                className="ab-skill-cat ab-reveal"
                key={i}
                data-delay={i * 70}
                style={{ "--ab-cat-glow": `radial-gradient(ellipse 80% 60% at 50% 0%, ${cat.glow} 0%, transparent 100%)` }}
              >
                <div className="ab-skill-cat-hdr">
                  <div className="ab-skill-cat-ico" style={{ background: cat.bg }}>
                    {cat.icon}
                  </div>
                  <span className="ab-skill-cat-name">{cat.label}</span>
                </div>
                <div className="ab-tags">
                  {cat.tags.map((t, j) => (
                    <span className="ab-tag" key={j}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── EXPERIENCE ── */}
        <div className="ab-experience">
          <div className="ab-reveal" data-delay="0">
            <div className="ab-label"><span className="ab-label-dot" />Experience</div>
            <h3 className="ab-heading" style={{ fontSize: "clamp(1.8rem,3.5vw,2.6rem)", marginBottom: "2rem" }}>
              Where I've <em>worked</em>
            </h3>
          </div>
          <div className="ab-timeline">

            {/* Internship */}
            <div className="ab-titem ab-reveal" data-delay="80">
              <div className="ab-tdot ab-tdot--pulse" />
              <div className="ab-tcard">
                <div className="ab-tcard-top">
                  <div>
                    <div className="ab-trole">Web Developer Intern</div>
                    <div className="ab-tcompany">Softcrowd Technologies · Nashik, Maharashtra</div>
                  </div>
                  <span className="ab-tperiod">Jan 2024</span>
                </div>
                <ul className="ab-tpoints">
                  <li>Built and optimised responsive UIs using HTML5, CSS3 and JavaScript, improving cross-browser compatibility and mobile responsiveness for client-facing applications.</li>
                  <li>Identified and resolved 10+ frontend bugs in collaboration with cross-functional teams, significantly reducing the UI defect backlog.</li>
                  <li>Gained hands-on experience in agile development workflows and on-time client project delivery.</li>
                </ul>
                <span className="ab-cert">Web Development Internship — Certified</span>
              </div>
            </div>

            {/* Freelance */}
            <div className="ab-titem ab-reveal" data-delay="160">
              <div className="ab-tdot" />
              <div className="ab-tcard">
                <div className="ab-tcard-top">
                  <div>
                    <div className="ab-trole">Freelance Web Developer</div>
                    <div className="ab-tcompany">Independent · Remote</div>
                  </div>
                  <span className="ab-tperiod">Ongoing</span>
                </div>
                <ul className="ab-tpoints">
                  <li>Delivered mobile-responsive landing pages for multiple clients, including <strong style={{color:"rgba(255,160,140,0.9)"}}>mahavirchemicalindia.com</strong>.</li>
                  <li>Integrated Web3 inquiry forms and applied lazy loading techniques, improving page load performance.</li>
                  <li>Managed full client lifecycle — requirements gathering, delivery, and iteration.</li>
                </ul>
              </div>
            </div>

          </div>
        </div>

        {/* ── EDUCATION ── */}
        <div className="ab-education">
          <div className="ab-reveal" data-delay="0">
            <div className="ab-label"><span className="ab-label-dot" />Education</div>
            <h3 className="ab-heading" style={{ fontSize: "clamp(1.8rem,3.5vw,2.6rem)", marginBottom: "2rem" }}>
              Academic <em>journey</em>
            </h3>
          </div>
          <div className="ab-edu-grid">

            <div className="ab-edu-card ab-edu-card--primary ab-reveal" data-delay="0">
              <span className="ab-edu-badge">Current</span>
              <div className="ab-edu-degree">B.E. in Computer Engineering</div>
              <div className="ab-edu-school">SNJB's K.B. Jain College of Engineering, Chandwad</div>
              <div className="ab-edu-meta">
                <span className="ab-edu-year">Expected May 2026</span>
                <span className="ab-edu-score">Pursuing</span>
              </div>
            </div>

            <div className="ab-edu-card ab-reveal" data-delay="80">
              <span className="ab-edu-badge">HSC — 12th</span>
              <div className="ab-edu-degree">Higher Secondary Certificate</div>
              <div className="ab-edu-school">Jahind Junior College, Dhule</div>
              <div className="ab-edu-meta">
                <span className="ab-edu-year">2022</span>
                <span className="ab-edu-score">71.67%</span>
              </div>
            </div>

            <div className="ab-edu-card ab-reveal" data-delay="160">
              <span className="ab-edu-badge">SSC — 10th</span>
              <div className="ab-edu-degree">Secondary School Certificate</div>
              <div className="ab-edu-school">Ekveera Vidyalaya, Dhule</div>
              <div className="ab-edu-meta">
                <span className="ab-edu-year">2020</span>
                <span className="ab-edu-score">76%</span>
              </div>
            </div>

          </div>
        </div>

        {/* ── INTERESTS ── */}
        <div className="ab-interests">
          <div className="ab-reveal" data-delay="0">
            <div className="ab-label"><span className="ab-label-dot" />Interests & Languages</div>
            <h3 className="ab-heading" style={{ fontSize: "clamp(1.8rem,3.5vw,2.6rem)", marginBottom: "1.8rem" }}>
              Beyond the <em>terminal</em>
            </h3>
          </div>
          <div className="ab-reveal ab-interests-strip" data-delay="80">
            {INTERESTS.map((item, i) => (
              <div className="ab-chip" key={i}>
                <div className="ab-chip-dot" />
                {item}
              </div>
            ))}
            {LANGUAGES.map((lang, i) => (
              <div className="ab-chip ab-lang" key={`l${i}`}>
                <div className="ab-chip-dot" />
                {lang}
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA ── */}
        <div className="ab-reveal" data-delay="0">
          <div className="ab-cta">
            <div className="ab-cta-left">
              <div className="ab-cta-title">Let's build something great</div>
              <p className="ab-cta-sub">
                I'm open to full-time roles, freelance projects, and collaborations.
                Drop me a message — I respond within 24 hours.
              </p>
            </div>
            <div className="ab-cta-btns">
              <a href="contact" className="ab-btn ab-btn-primary">
                Contact Me
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M1 7h12M7.5 1.5L13 7l-5.5 5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a
                href="https://rohitjain.netlify.app"
                target="_blank"
                rel="noreferrer"
                className="ab-btn ab-btn-ghost"
              >
                View Portfolio
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}