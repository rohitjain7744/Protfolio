import { useState } from 'react';

/* ─────────────────────────────────────────
   STYLES
───────────────────────────────────────── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Cabinet+Grotesk:wght@300;400;500;700;800&family=JetBrains+Mono:wght@400;500&display=swap');

  :root {
    --ct-ink:    #0a0a0f;
    --ct-fog:    #f5f4f2;
    --ct-muted:  #7a7888;
    --ct-border: rgba(245,244,242,0.08);
    --ct-accent: #ff4f2e;
    --ct-teal:   #00c9a7;
    --ct-blue:   #1a1aff;
    --ct-fd: 'DM Serif Display', serif;
    --ct-fb: 'Cabinet Grotesk', sans-serif;
    --ct-fm: 'JetBrains Mono', monospace;
    --ct-out:    cubic-bezier(0.22,1,0.36,1);
    --ct-bounce: cubic-bezier(0.34,1.56,0.64,1);
  }

  *, *::before, *::after { box-sizing: border-box; }

  /* ── SECTION ── */
  .ct-section {
    position: relative;
    background: var(--ct-ink);
    color: var(--ct-fog);
    font-family: var(--ct-fb);
    overflow: hidden;
    -webkit-font-smoothing: antialiased;
    padding: 6rem 0 5rem;
  }

  /* noise */
  .ct-section::before {
    content: '';
    position: absolute; inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
    opacity: 0.025; pointer-events: none; z-index: 0;
  }

  /* aura */
  .ct-aura {
    position: absolute; inset: 0; pointer-events: none; z-index: 0;
    background:
      radial-gradient(ellipse 55% 55% at 85% 15%, rgba(255,79,46,0.07) 0%, transparent 60%),
      radial-gradient(ellipse 45% 45% at 10% 85%, rgba(26,26,255,0.06) 0%, transparent 55%),
      radial-gradient(ellipse 35% 35% at 50% 50%, rgba(0,201,167,0.04) 0%, transparent 60%);
  }

  /* grid */
  .ct-grid {
    position: absolute; inset: 0; pointer-events: none; z-index: 0;
    background-image:
      linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
    background-size: 40px 40px;
    mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%);
  }

  /* ── CONTAINER ── */
  .ct-wrap {
    position: relative; z-index: 2;
    max-width: 1100px; margin: 0 auto;
    padding: 0 1.4rem;
  }

  /* ── HEADER ── */
  .ct-header { margin-bottom: 4rem; }

  .ct-eyebrow {
    display: inline-flex; align-items: center; gap: 8px;
    font-family: var(--ct-fm); font-size: 0.65rem;
    letter-spacing: 0.16em; text-transform: uppercase;
    color: rgba(255,160,140,0.85);
    border: 1px solid rgba(255,79,46,0.28);
    background: rgba(255,79,46,0.08);
    padding: 5px 13px; border-radius: 100px;
    margin-bottom: 1.4rem;
  }
  .ct-eyebrow-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: var(--ct-accent);
    box-shadow: 0 0 8px var(--ct-accent);
    animation: ctDot 2s ease-in-out infinite;
  }
  @keyframes ctDot {
    0%,100% { box-shadow:0 0 4px var(--ct-accent); transform:scale(1); }
    50%     { box-shadow:0 0 14px var(--ct-accent); transform:scale(1.45); }
  }

  .ct-h2 {
    font-family: var(--ct-fd);
    font-size: clamp(2.5rem, 6vw, 4.8rem);
    line-height: 1.0; letter-spacing: -0.025em;
    color: var(--ct-fog); margin: 0;
  }
  .ct-h2 em {
    font-style: italic;
    background: linear-gradient(135deg, #ff6b47 0%, var(--ct-accent) 40%, #ff8a65 75%, #ffb347 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }

  .ct-sub {
    font-size: clamp(0.9rem, 2vw, 1rem);
    color: rgba(245,244,242,0.42);
    line-height: 1.7; margin-top: 1rem;
    max-width: 460px;
  }

  /* ── MAIN GRID ── */
  .ct-grid-layout {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  /* ── FORM CARD ── */
  .ct-form-card {
    background: rgba(245,244,242,0.025);
    border: 1px solid var(--ct-border);
    border-radius: 20px;
    padding: 2rem 1.5rem;
    position: relative; overflow: hidden;
    transition: border-color 0.3s;
  }
  .ct-form-card:focus-within { border-color: rgba(255,79,46,0.3); }

  /* shimmer */
  .ct-form-card::after {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.025) 50%, transparent 60%);
    animation: ctShimmer 7s ease-in-out infinite;
    pointer-events: none;
  }
  @keyframes ctShimmer {
    0%      { transform: translateX(-120%); }
    60%,100%{ transform: translateX(220%); }
  }

  /* row of 2 inputs */
  .ct-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.9rem;
    margin-bottom: 0.9rem;
  }

  /* ── INPUTS ── */
  .ct-field {
    position: relative;
    margin-bottom: 0.9rem;
  }
  .ct-field:last-of-type { margin-bottom: 0; }

  .ct-label {
    display: block;
    font-family: var(--ct-fm); font-size: 0.6rem;
    letter-spacing: 0.14em; text-transform: uppercase;
    color: var(--ct-muted); margin-bottom: 6px;
    transition: color 0.2s;
  }
  .ct-field:focus-within .ct-label { color: rgba(255,160,140,0.8); }

  .ct-input,
  .ct-textarea {
    width: 100%;
    background: rgba(245,244,242,0.04);
    border: 1px solid var(--ct-border);
    border-radius: 10px;
    padding: 0.82rem 1rem;
    font-family: var(--ct-fb); font-size: 0.92rem;
    color: var(--ct-fog);
    outline: none;
    transition: border-color 0.25s, background 0.25s, box-shadow 0.25s;
    -webkit-appearance: none;
  }
  .ct-input::placeholder,
  .ct-textarea::placeholder {
    color: rgba(245,244,242,0.22);
  }
  .ct-input:focus,
  .ct-textarea:focus {
    border-color: rgba(255,79,46,0.45);
    background: rgba(245,244,242,0.06);
    box-shadow: 0 0 0 3px rgba(255,79,46,0.1);
  }
  .ct-textarea {
    resize: vertical; min-height: 130px;
    line-height: 1.6;
  }

  /* ── SUBMIT BUTTON ── */
  .ct-submit {
    display: flex; align-items: center; justify-content: center; gap: 9px;
    width: 100%; padding: 0.95rem 1.8rem;
    margin-top: 1.2rem;
    border-radius: 10px; border: none; cursor: pointer;
    font-family: var(--ct-fb); font-size: 0.95rem; font-weight: 700;
    color: #fff;
    background: var(--ct-accent);
    box-shadow: 0 4px 22px rgba(255,79,46,0.32);
    transition: all 0.35s var(--ct-bounce);
    position: relative; overflow: hidden;
  }
  .ct-submit::before {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 100%);
    opacity: 0; transition: opacity 0.3s;
  }
  .ct-submit:hover { transform: translateY(-3px) scale(1.02); box-shadow: 0 8px 34px rgba(255,79,46,0.52); }
  .ct-submit:hover::before { opacity: 1; }
  .ct-submit:active { transform: scale(0.98); }
  .ct-submit:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

  .ct-submit svg { flex-shrink: 0; transition: transform 0.3s var(--ct-bounce); }
  .ct-submit:hover svg { transform: translateX(4px) translateY(-2px); }

  /* status messages */
  .ct-status {
    margin-top: 0.9rem; padding: 0.75rem 1rem;
    border-radius: 10px; font-size: 0.85rem;
    font-family: var(--ct-fm); letter-spacing: 0.04em;
    text-align: center;
  }
  .ct-status--ok  { background: rgba(0,201,167,0.1); border:1px solid rgba(0,201,167,0.25); color:rgba(100,220,190,0.9); }
  .ct-status--err { background: rgba(255,79,46,0.1);  border:1px solid rgba(255,79,46,0.25);  color:rgba(255,160,140,0.9); }

  /* ── INFO CARD ── */
  .ct-info-card {
    background: rgba(245,244,242,0.025);
    border: 1px solid var(--ct-border);
    border-radius: 20px;
    padding: 2rem 1.5rem;
    display: flex; flex-direction: column; gap: 0;
  }

  .ct-info-title {
    font-family: var(--ct-fd); font-size: 1.25rem;
    color: var(--ct-fog); margin-bottom: 1.6rem;
  }
  .ct-info-title em { font-style: italic; color: var(--ct-accent); }

  /* info rows */
  .ct-info-item {
    display: flex; flex-direction: column; gap: 5px;
    padding: 1.1rem 0;
    border-bottom: 1px solid var(--ct-border);
  }
  .ct-info-item:last-child { border-bottom: none; padding-bottom: 0; }
  .ct-info-item:first-child { padding-top: 0; }

  .ct-info-label {
    font-family: var(--ct-fm); font-size: 0.58rem;
    letter-spacing: 0.16em; text-transform: uppercase;
    color: var(--ct-muted);
  }

  .ct-info-val {
    font-size: 0.92rem; color: var(--ct-fog);
    text-decoration: none; font-weight: 500;
    transition: color 0.2s;
    line-height: 1.4;
  }
  a.ct-info-val:hover { color: var(--ct-accent); }

  /* social links */
  .ct-socials { display: flex; flex-wrap: wrap; gap: 8px; }
  .ct-social-link {
    display: inline-flex; align-items: center; gap: 7px;
    padding: 6px 14px; border-radius: 100px;
    font-family: var(--ct-fm); font-size: 0.62rem;
    letter-spacing: 0.1em; text-transform: uppercase;
    text-decoration: none; color: var(--ct-muted);
    border: 1px solid var(--ct-border);
    transition: all 0.3s var(--ct-bounce);
  }
  .ct-social-link:hover {
    color: var(--ct-fog);
    border-color: rgba(245,244,242,0.28);
    background: rgba(245,244,242,0.06);
    transform: translateY(-2px);
  }
  .ct-social-link svg { width:12px; height:12px; }

  /* availability strip */
  .ct-avail {
    display: flex; align-items: center; gap: 10px;
    margin-top: 1.6rem;
    padding: 0.85rem 1.1rem;
    border-radius: 12px;
    background: rgba(0,201,167,0.07);
    border: 1px solid rgba(0,201,167,0.2);
    font-family: var(--ct-fm); font-size: 0.62rem;
    letter-spacing: 0.1em; text-transform: uppercase;
    color: rgba(100,220,190,0.85);
  }
  .ct-avail-dot {
    width: 7px; height: 7px; border-radius: 50%;
    background: var(--ct-teal); flex-shrink: 0;
    box-shadow: 0 0 8px var(--ct-teal);
    animation: ctDot 2.2s ease-in-out infinite;
  }

  /* ── DIVIDER ── */
  .ct-divider {
    height: 1px;
    background: linear-gradient(90deg, var(--ct-accent), transparent);
    opacity: 0.15; margin: 4rem 0 0;
  }

  /* ─────────────────────────────────────────
     TABLET  ≥ 640px
  ───────────────────────────────────────── */
  @media (min-width: 640px) {
    .ct-form-card { padding: 2.4rem 2rem; }
    .ct-info-card { padding: 2.4rem 2rem; }
    .ct-wrap { padding: 0 2rem; }
  }

  /* ─────────────────────────────────────────
     DESKTOP  ≥ 900px
  ───────────────────────────────────────── */
  @media (min-width: 900px) {
    .ct-grid-layout {
      grid-template-columns: 1.35fr 1fr;
      gap: 2.5rem;
      align-items: start;
    }
    .ct-form-card { padding: 2.8rem 2.5rem; }
    .ct-info-card { padding: 2.8rem 2.5rem; }
    .ct-header { margin-bottom: 4.5rem; }
  }

  /* ─────────────────────────────────────────
     SMALL PHONE  ≤ 380px
  ───────────────────────────────────────── */
  @media (max-width: 380px) {
    .ct-row { grid-template-columns: 1fr; }
    .ct-h2  { font-size: 2.2rem; }
    .ct-section { padding: 4rem 0 3rem; }
  }

  ::selection { background: rgba(255,79,46,0.3); color: var(--ct-fog); }
`;

/* ─────────────────────────────────────────
   COMPONENT
───────────────────────────────────────── */
export default function Contact() {
  const [status, setStatus] = useState(null); // null | 'ok' | 'err'
  const [sending, setSending] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setSending(true);
    setStatus(null);

    const form = e.target;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (json.success) {
        setStatus('ok');
        form.reset();
      } else {
        setStatus('err');
      }
    } catch {
      setStatus('err');
    } finally {
      setSending(false);
    }
  }

  return (
    <section className="ct-section" id="contact" aria-label="Contact section">
      <style>{css}</style>
      <div className="ct-aura" aria-hidden="true" />
      <div className="ct-grid" aria-hidden="true" />

      <div className="ct-wrap">

        {/* ── HEADER ── */}
        <div className="ct-header">
          <div className="ct-eyebrow">
            <span className="ct-eyebrow-dot" />
            Reach Out
          </div>
          <h2 className="ct-h2">
            Let's build <em>together.</em>
          </h2>
          <p className="ct-sub">
            Have a project in mind or just want to connect? Drop a message —
            I typically respond within 24 hours.
          </p>
        </div>

        {/* ── MAIN GRID ── */}
        <div className="ct-grid-layout">

          {/* FORM */}
          <div className="ct-form-card">
            <form onSubmit={handleSubmit} noValidate>
              <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE" />
              <input type="checkbox" name="botcheck" style={{ display: 'none' }} tabIndex="-1" aria-hidden="true" />

              {/* Name + Email row */}
              <div className="ct-row">
                <div className="ct-field">
                  <label className="ct-label" htmlFor="ct-name">Name</label>
                  <input
                    id="ct-name" type="text" name="name"
                    className="ct-input" placeholder="Rohit Jain"
                    required autoComplete="name"
                  />
                </div>
                <div className="ct-field">
                  <label className="ct-label" htmlFor="ct-email">Email</label>
                  <input
                    id="ct-email" type="email" name="email"
                    className="ct-input" placeholder="you@example.com"
                    required autoComplete="email"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="ct-field">
                <label className="ct-label" htmlFor="ct-subject">Subject</label>
                <input
                  id="ct-subject" type="text" name="subject"
                  className="ct-input" placeholder="Project Inquiry / Collaboration"
                  required
                />
              </div>

              {/* Message */}
              <div className="ct-field">
                <label className="ct-label" htmlFor="ct-message">Message</label>
                <textarea
                  id="ct-message" name="message"
                  className="ct-textarea" rows="5"
                  placeholder="Tell me about your project, timeline, and how I can help..."
                  required
                />
              </div>

              {/* Submit */}
              <button type="submit" className="ct-submit" disabled={sending}>
                {sending ? (
                  <>Sending…</>
                ) : (
                  <>
                    Send Message
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M1 7h12M7.5 1.5L13 7l-5.5 5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </>
                )}
              </button>

              {/* Status */}
              {status === 'ok'  && <p className="ct-status ct-status--ok">✓ Message sent! I'll get back to you soon.</p>}
              {status === 'err' && <p className="ct-status ct-status--err">✗ Something went wrong. Please try again or email directly.</p>}
            </form>
          </div>

          {/* INFO */}
          <div className="ct-info-card">
            <div className="ct-info-title">
              Get in <em>touch.</em>
            </div>

            <div className="ct-info-item">
              <span className="ct-info-label">Email</span>
              <a href="mailto:jain74159@gmail.com" className="ct-info-val">
                jain74159@gmail.com
              </a>
            </div>

            <div className="ct-info-item">
              <span className="ct-info-label">Location</span>
              <span className="ct-info-val">Dhule, Maharashtra, India</span>
            </div>

            <div className="ct-info-item">
              <span className="ct-info-label">Socials</span>
              <div className="ct-socials">
                <a
                  href="https://linkedin.com/in/rohitjain7744"
                  target="_blank" rel="noopener noreferrer"
                  className="ct-social-link"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                    <circle cx="4" cy="4" r="2"/>
                  </svg>
                  LinkedIn
                </a>
                <a
                  href="https://github.com/rohitjain7744"
                  target="_blank" rel="noopener noreferrer"
                  className="ct-social-link"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                  </svg>
                  GitHub
                </a>
              </div>
            </div>

            <div className="ct-info-item">
              <span className="ct-info-label">Portfolio</span>
              <a
                href="https://rohitjain.netlify.app"
                target="_blank" rel="noopener noreferrer"
                className="ct-info-val"
              >
                rohitjain.netlify.app ↗
              </a>
            </div>

            {/* Availability strip */}
            <div className="ct-avail">
              <span className="ct-avail-dot" />
              Available — Open to full-time &amp; freelance
            </div>
          </div>

        </div>

        <div className="ct-divider" />
      </div>
    </section>
  );
}