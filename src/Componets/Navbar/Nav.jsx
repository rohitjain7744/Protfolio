import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes, FaDownload, FaChevronDown, FaCode } from "react-icons/fa";

import CV from "../../assets/Cv_Rohit_jain_comp.pdf";

/* ─────────────────────────────────────────
   STYLES
───────────────────────────────────────── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Cabinet+Grotesk:wght@400;500;700&family=JetBrains+Mono:wght@400;500&display=swap');

  :root {
    --nv-ink:    #0a0a0f;
    --nv-fog:    #f5f4f2;
    --nv-muted:  #7a7888;
    --nv-border: rgba(245,244,242,0.08);
    --nv-accent: #ff4f2e;
    --nv-glass:  rgba(10,10,15,0.75);
    --nv-fd: 'DM Serif Display', serif;
    --nv-fb: 'Cabinet Grotesk', sans-serif;
    --nv-fm: 'JetBrains Mono', monospace;
    --nv-out: cubic-bezier(0.22,1,0.36,1);
    --nv-bounce: cubic-bezier(0.34,1.56,0.64,1);
    --nv-h: 68px;
  }

  /* ── HEADER ── */
  .nv-header {
    position: fixed; top: 0; left: 0; right: 0;
    z-index: 1000;
    height: var(--nv-h);
    transition: background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease;
    border-bottom: 1px solid transparent;
  }
  .nv-header.scrolled {
    background: var(--nv-glass);
    border-bottom-color: var(--nv-border);
    box-shadow: 0 8px 40px rgba(0,0,0,0.4);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
  }

  /* ── INNER ── */
  .nv-inner {
    max-width: 1160px; margin: 0 auto;
    height: 100%;
    display: flex; align-items: center;
    justify-content: space-between;
    padding: 0 2rem;
    gap: 1rem;
  }

  /* ── LOGO ── */
  .nv-logo {
    text-decoration: none;
    display: flex; align-items: center; gap: 10px;
    flex-shrink: 0;
  }
  .nv-logo-mark {
    width: 34px; height: 34px; border-radius: 10px;
    background: var(--nv-accent);
    display: flex; align-items: center; justify-content: center;
    font-family: var(--nv-fd); font-size: 1.1rem;
    font-style: italic; color: #fff;
    box-shadow: 0 4px 14px rgba(255,79,46,0.4);
    transition: transform 0.3s var(--nv-bounce), box-shadow 0.3s ease;
  }
  .nv-logo:hover .nv-logo-mark {
    transform: rotate(-6deg) scale(1.08);
    box-shadow: 0 6px 20px rgba(255,79,46,0.55);
  }
  .nv-logo-text {
    font-family: var(--nv-fd); font-size: 1.15rem;
    color: var(--nv-fog); letter-spacing: -0.01em;
    font-style: italic;
  }
  .nv-logo-text em { color: var(--nv-accent); font-style: normal; }

  /* ── DESKTOP NAV ── */
  .nv-links {
    display: flex; align-items: center;
    list-style: none; gap: 0.15rem;
    margin: 0; padding: 0;
  }

  /* regular link */
  .nv-links > li > a,
  .nv-links > li > span.nv-trigger {
    display: flex; align-items: center; gap: 5px;
    padding: 7px 13px; border-radius: 8px;
    font-family: var(--nv-fb); font-size: 0.88rem; font-weight: 500;
    color: var(--nv-muted); text-decoration: none;
    transition: color 0.25s ease, background 0.25s ease;
    cursor: pointer; white-space: nowrap;
    position: relative;
  }
  .nv-links > li > a:hover,
  .nv-links > li > span.nv-trigger:hover,
  .nv-links > li > a.active {
    color: var(--nv-fog);
    background: rgba(245,244,242,0.06);
  }
  /* active underline dot */
  .nv-links > li > a.active::after {
    content: '';
    position: absolute; bottom: 2px; left: 50%;
    transform: translateX(-50%);
    width: 4px; height: 4px; border-radius: 50%;
    background: var(--nv-accent);
  }

  /* ── DROPDOWN ── */
  .nv-dropdown { position: relative; }

  .nv-chevron {
    font-size: 9px;
    transition: transform 0.3s var(--nv-out);
  }
  .nv-chevron.open { transform: rotate(180deg); }

  .nv-dropdown-menu {
    position: absolute; top: calc(100% + 10px); left: 50%;
    transform: translateX(-50%) translateY(-6px);
    min-width: 220px;
    background: rgba(16,14,24,0.95);
    border: 1px solid var(--nv-border);
    border-radius: 14px; padding: 0.6rem;
    backdrop-filter: blur(20px);
    opacity: 0; pointer-events: none;
    transition: opacity 0.25s var(--nv-out), transform 0.25s var(--nv-out);
    box-shadow: 0 20px 60px rgba(0,0,0,0.5);
  }
  .nv-dropdown-menu.open {
    opacity: 1; pointer-events: auto;
    transform: translateX(-50%) translateY(0);
  }

  .nv-drop-label {
    font-family: var(--nv-fm); font-size: 0.58rem;
    letter-spacing: 0.14em; text-transform: uppercase;
    color: var(--nv-muted); padding: 6px 10px 4px;
    display: flex; align-items: center; gap: 6px;
  }
  .nv-drop-label svg { font-size: 10px; color: var(--nv-accent); }

  .nv-dropdown-menu a {
    display: flex; align-items: center; gap: 10px;
    padding: 9px 12px; border-radius: 8px;
    font-family: var(--nv-fb); font-size: 0.85rem;
    color: rgba(245,244,242,0.55); text-decoration: none;
    transition: color 0.2s, background 0.2s;
  }
  .nv-dropdown-menu a::before {
    content: '';
    width: 5px; height: 5px; border-radius: 50%;
    background: var(--nv-accent); opacity: 0;
    flex-shrink: 0;
    transition: opacity 0.2s;
  }
  .nv-dropdown-menu a:hover {
    color: var(--nv-fog);
    background: rgba(245,244,242,0.06);
  }
  .nv-dropdown-menu a:hover::before { opacity: 1; }

  /* ── CV BUTTON ── */
  .nv-cv-btn {
    display: inline-flex; align-items: center; gap: 7px;
    padding: 0.6rem 1.2rem; border-radius: 9px;
    font-family: var(--nv-fb); font-size: 0.85rem; font-weight: 600;
    text-decoration: none; color: #fff;
    background: var(--nv-accent);
    box-shadow: 0 3px 14px rgba(255,79,46,0.35);
    transition: all 0.3s var(--nv-bounce);
    flex-shrink: 0;
  }
  .nv-cv-btn:hover {
    transform: translateY(-2px) scale(1.04);
    box-shadow: 0 6px 22px rgba(255,79,46,0.5);
  }
  .nv-cv-btn svg { font-size: 11px; }

  /* ── HAMBURGER ── */
  .nv-hamburger {
    display: none;
    width: 38px; height: 38px; border-radius: 9px;
    border: 1px solid var(--nv-border);
    background: rgba(245,244,242,0.05);
    color: var(--nv-fog); font-size: 1rem;
    cursor: pointer; align-items: center; justify-content: center;
    transition: background 0.2s, border-color 0.2s;
    flex-shrink: 0;
  }
  .nv-hamburger:hover {
    background: rgba(245,244,242,0.1);
    border-color: rgba(245,244,242,0.2);
  }

  /* ── MOBILE DRAWER ── */
  .nv-drawer {
    display: none;
    position: fixed; inset: 0; top: var(--nv-h);
    background: rgba(8,7,14,0.97);
    backdrop-filter: blur(24px);
    z-index: 999;
    padding: 1.5rem 1.5rem 3rem;
    overflow-y: auto;
    transform: translateX(100%);
    transition: transform 0.4s var(--nv-out);
  }
  .nv-drawer.open {
    transform: translateX(0);
  }

  .nv-drawer-links {
    list-style: none; margin: 0; padding: 0;
    display: flex; flex-direction: column; gap: 2px;
  }

  .nv-drawer-links > li > a,
  .nv-drawer-links > li > button.nv-mob-trigger {
    display: flex; align-items: center; justify-content: space-between;
    width: 100%; padding: 13px 14px; border-radius: 10px;
    font-family: var(--nv-fb); font-size: 1rem; font-weight: 500;
    color: rgba(245,244,242,0.6); text-decoration: none;
    background: transparent; border: none; cursor: pointer;
    text-align: left;
    transition: color 0.2s, background 0.2s;
  }
  .nv-drawer-links > li > a:hover,
  .nv-drawer-links > li > a.active,
  .nv-drawer-links > li > button.nv-mob-trigger:hover {
    color: var(--nv-fog);
    background: rgba(245,244,242,0.05);
  }
  .nv-drawer-links > li > a.active {
    color: var(--nv-accent);
  }

  /* mobile dropdown */
  .nv-mob-chevron {
    font-size: 11px; color: var(--nv-muted);
    transition: transform 0.3s var(--nv-out);
  }
  .nv-mob-chevron.open { transform: rotate(180deg); }

  .nv-mob-submenu {
    max-height: 0; overflow: hidden;
    transition: max-height 0.4s var(--nv-out);
    padding-left: 0.75rem;
  }
  .nv-mob-submenu.open { max-height: 300px; }

  .nv-mob-submenu a {
    display: flex; align-items: center; gap: 10px;
    padding: 10px 14px; border-radius: 8px;
    font-family: var(--nv-fb); font-size: 0.9rem;
    color: rgba(245,244,242,0.45); text-decoration: none;
    transition: color 0.2s, background 0.2s;
  }
  .nv-mob-submenu a::before {
    content: '→';
    font-size: 0.7rem; color: var(--nv-accent); opacity: 0.6;
  }
  .nv-mob-submenu a:hover {
    color: var(--nv-fog);
    background: rgba(245,244,242,0.05);
  }

  /* divider in drawer */
  .nv-mob-divider {
    height: 1px; background: var(--nv-border);
    margin: 0.75rem 0;
  }

  /* mobile CV button */
  .nv-mob-cv {
    display: flex; align-items: center; justify-content: center; gap: 8px;
    width: 100%; padding: 0.9rem;
    margin-top: 1rem; border-radius: 12px;
    font-family: var(--nv-fb); font-size: 0.95rem; font-weight: 600;
    text-decoration: none; color: #fff;
    background: var(--nv-accent);
    box-shadow: 0 4px 20px rgba(255,79,46,0.3);
    transition: all 0.3s var(--nv-bounce);
  }
  .nv-mob-cv:hover {
    box-shadow: 0 6px 28px rgba(255,79,46,0.5);
    transform: scale(1.02);
  }

  /* ── RESPONSIVE ── */
  @media (max-width: 860px) {
    .nv-links,
    .nv-cv-btn { display: none; }
    .nv-hamburger { display: flex; }
    .nv-drawer { display: block; }
  }

  @media (max-width: 480px) {
    .nv-inner { padding: 0 1.2rem; }
    .nv-logo-text { display: none; }
  }
`;

/* ─────────────────────────────────────────
   NAV ITEMS CONFIG
───────────────────────────────────────── */
const navLinks = [
  { label: 'Home',     to: '/' },
  { label: 'About',    to: '/about' },
  
  { label: 'All Projects', to: '/project' },
  { label: 'Clients',      to: '/clients' },
 
  { label: 'Contact',      to: '/contact' },
];

/* ─────────────────────────────────────────
   COMPONENT
───────────────────────────────────────── */
export default function Nav() {
  const [open, setOpen]               = useState(false);
  const [scrolled, setScrolled]       = useState(false);
  const [dropOpen, setDropOpen]       = useState(false);
  const [mobDropOpen, setMobDropOpen] = useState(false);
  const location = useLocation();
  const dropRef  = useRef(null);

  /* scroll listener */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* close on route change */
  useEffect(() => {
    setOpen(false);
    setDropOpen(false);
    setMobDropOpen(false);
  }, [location]);

  /* lock body scroll when drawer open */
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  /* close desktop dropdown on outside click */
  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) setDropOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const isActive = (to) =>
    to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);

  return (
    <>
      <style>{css}</style>

      <header className={`nv-header${scrolled ? ' scrolled' : ''}`}>
        <div className="nv-inner">

          {/* LOGO */}
          <Link to="/" className="nv-logo">
            <div className="nv-logo-mark">R</div>
            <span className="nv-logo-text">Rohit Jain <em>.</em></span>
          </Link>

          {/* DESKTOP LINKS */}
          <ul className="nv-links">
            {navLinks.map((item) =>
              item.dropdown ? (
                <li
                  key={item.label}
                  className="nv-dropdown"
                  ref={dropRef}
                  onMouseEnter={() => setDropOpen(true)}
                  onMouseLeave={() => setDropOpen(false)}
                >
                  <span
                    className="nv-trigger"
                    onClick={() => setDropOpen(!dropOpen)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && setDropOpen(!dropOpen)}
                  >
                    {item.label}
                    <FaChevronDown className={`nv-chevron${dropOpen ? ' open' : ''}`} />
                  </span>

                  <div className={`nv-dropdown-menu${dropOpen ? ' open' : ''}`}>
                    <div className="nv-drop-label">
                      <FaCode /> Personal Apps
                    </div>
                    {item.dropdown.map((sub) => (
                      <Link key={sub.to} to={sub.to}>{sub.label}</Link>
                    ))}
                  </div>
                </li>
              ) : (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className={isActive(item.to) ? 'active' : ''}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            )}
          </ul>

          {/* RIGHT */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <a href={CV} download className="nv-cv-btn">
              Resume <FaDownload />
            </a>
            <button
              className="nv-hamburger"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen(!open)}
            >
              {open ? <FaTimes /> : <FaBars />}
            </button>
          </div>

        </div>
      </header>

      {/* MOBILE DRAWER */}
      
      <nav className={`nv-drawer${open ? ' open' : ''}`} aria-hidden={!open}>
        <ul className="nv-drawer-links">
          
          {navLinks.map((item) =>
            item.dropdown ? (
              <li key={item.label}>
                <button
                  className="nv-mob-trigger"
                  onClick={() => setMobDropOpen(!mobDropOpen)}
                  aria-expanded={mobDropOpen}
                >
                  {item.label}
                  <FaChevronDown className={`nv-mob-chevron${mobDropOpen ? ' open' : ''}`} />
                </button>
                <div className={`nv-mob-submenu${mobDropOpen ? ' open' : ''}`}>
                  {item.dropdown.map((sub) => (
                    <Link key={sub.to} to={sub.to}>{sub.label}</Link>
                  ))}
                </div>
              </li>
            ) : (
              <li key={item.label}>
                <Link
                  to={item.to}
                  className={isActive(item.to) ? 'active' : ''}
                >
                  {item.label}
                </Link>
              </li>
            )
          )}
        </ul>

        <div className="nv-mob-divider" />

        <a href={CV} download className="nv-mob-cv">
          <FaDownload /> Download CV
        </a>
      </nav>
    </>
  );
}