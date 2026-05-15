import { useState, useRef } from "react";

/* ─────────────────────────────────────────
   STYLES
───────────────────────────────────────── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Cabinet+Grotesk:wght@300;400;500;700;800&family=JetBrains+Mono:wght@400;500&display=swap');

  :root {
    --c-ink:     #0a0a0f;
    --c-surface: #0f1118;
    --c-card:    #13151f;
    --c-fog:     #f5f4f2;
    --c-muted:   #7a7888;
    --c-border:  rgba(245,244,242,0.07);
    --c-border2: rgba(245,244,242,0.13);
    --c-accent:  #ff4f2e;
    --c-teal:    #00c9a7;
    --c-blue:    #1a1aff;
    --c-fd: 'DM Serif Display', serif;
    --c-fb: 'Cabinet Grotesk', sans-serif;
    --c-fm: 'JetBrains Mono', monospace;
    --c-out:    cubic-bezier(0.22,1,0.36,1);
    --c-bounce: cubic-bezier(0.34,1.56,0.64,1);
  }

  *, *::before, *::after { box-sizing: border-box; }

  /* ── SECTION ── */
  .c-section {
    position: relative;
    min-height: 100svh;
    background: var(--c-ink);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    font-family: var(--c-fb);
    -webkit-font-smoothing: antialiased;
    padding: 5rem 1.5rem 4rem;
  }

  /* grain overlay */
  .c-section::before {
    content: '';
    position: absolute; inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
    opacity: 0.022; pointer-events: none; z-index: 0;
  }

  /* ambient aura */
  .c-aura {
    position: absolute; inset: 0; pointer-events: none; z-index: 0;
    background:
      radial-gradient(ellipse 50% 60% at 15% 30%, rgba(255,79,46,0.07) 0%, transparent 65%),
      radial-gradient(ellipse 40% 50% at 90% 70%, rgba(0,201,167,0.05) 0%, transparent 60%),
      radial-gradient(ellipse 30% 40% at 50% 95%, rgba(26,26,255,0.04) 0%, transparent 55%);
    animation: cAura 18s ease-in-out infinite alternate;
  }
  @keyframes cAura { 0%{opacity:.7} 50%{opacity:1} 100%{opacity:.75} }

  /* grid */
  .c-grid {
    position: absolute; inset: 0; pointer-events: none; z-index: 0;
    background-image:
      linear-gradient(rgba(255,255,255,0.016) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.016) 1px, transparent 1px);
    background-size: 44px 44px;
    animation: cGrid 24s linear infinite;
  }
  @keyframes cGrid { to { background-position: 44px 44px; } }

  /* ── ANIMATIONS ── */
  @keyframes cFadeUp    { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
  @keyframes cSlideLeft { from{opacity:0;transform:translateX(-40px)} to{opacity:1;transform:translateX(0)} }
  @keyframes cSlideRight{ from{opacity:0;transform:translateX(40px)}  to{opacity:1;transform:translateX(0)} }
  @keyframes cPulse     { 0%,100%{box-shadow:0 0 0 0 rgba(255,79,46,.4)} 50%{box-shadow:0 0 0 8px rgba(255,79,46,0)} }

  /* ── WRAPPER ── */
  .c-wrapper {
    position: relative; z-index: 2;
    width: 100%; max-width: 1100px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 3.5rem;
  }

  /* ── HEADER ── */
  .c-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 1rem;
    animation: cFadeUp .8s var(--c-out) .1s both;
  }

  .c-eyebrow {
    display: inline-flex; align-items: center; gap: 8px;
    font-family: var(--c-fm); font-size: .6rem;
    letter-spacing: .16em; text-transform: uppercase;
    color: rgba(255,160,140,.9);
    border: 1px solid rgba(255,79,46,.28);
    background: rgba(255,79,46,.08);
    padding: 5px 13px; border-radius: 100px;
  }
  .c-eyebrow-dot {
    width: 5px; height: 5px; border-radius: 50%;
    background: var(--c-accent);
    animation: cPulse 2.2s ease-in-out infinite;
  }

  .c-heading {
    font-family: var(--c-fd);
    font-size: clamp(2.8rem, 9vw, 5.8rem);
    line-height: 1.02; letter-spacing: -.03em;
    color: var(--c-fog);
    margin: 0;
  }
  .c-heading em {
    font-style: italic;
    background: linear-gradient(135deg, #ff6b47 0%, var(--c-accent) 45%, #ff8a65 80%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }

  .c-subhead {
    font-size: clamp(.88rem, 2.8vw, 1rem);
    line-height: 1.75; color: rgba(245,244,242,.42);
    max-width: 480px; margin: 0;
  }

  /* ── BODY GRID ── */
  .c-body {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  /* ── INFO PANEL ── */
  .c-info {
    display: flex;
    flex-direction: column;
    gap: 1.4rem;
    animation: cSlideLeft .85s var(--c-out) .25s both;
  }

  /* contact method cards */
  .c-method {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem 1.25rem;
    background: var(--c-card);
    border: 1px solid var(--c-border);
    border-radius: 16px;
    text-decoration: none;
    transition: border-color .3s ease, transform .3s var(--c-bounce), background .3s ease;
    cursor: pointer;
  }
  .c-method:hover {
    border-color: var(--c-border2);
    background: #181a24;
    transform: translateX(6px);
  }

  .c-method-icon {
    width: 44px; height: 44px; border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    font-size: 18px; flex-shrink: 0;
  }
  .c-method-icon--red  { background: rgba(255,79,46,.14); }
  .c-method-icon--teal { background: rgba(0,201,167,.12); }
  .c-method-icon--blue { background: rgba(26,26,255,.14); }
  .c-method-icon--fog  { background: rgba(245,244,242,.07); }

  .c-method-body { flex: 1; min-width: 0; }
  .c-method-label {
    font-family: var(--c-fm); font-size: .58rem;
    letter-spacing: .12em; text-transform: uppercase;
    color: var(--c-muted); margin-bottom: 3px;
  }
  .c-method-value {
    font-size: .9rem; font-weight: 500;
    color: var(--c-fog);
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }
  .c-method-arrow {
    font-size: 1rem; color: var(--c-muted);
    transition: color .3s, transform .3s var(--c-bounce);
    flex-shrink: 0;
  }
  .c-method:hover .c-method-arrow {
    color: var(--c-accent);
    transform: translateX(4px);
  }

  /* availability badge */
  .c-avail {
    display: flex; align-items: center; gap: 12px;
    padding: 1rem 1.25rem;
    background: rgba(0,201,167,.06);
    border: 1px solid rgba(0,201,167,.2);
    border-radius: 16px;
  }
  .c-avail-dot {
    width: 10px; height: 10px; border-radius: 50%;
    background: var(--c-teal); flex-shrink: 0;
    box-shadow: 0 0 0 3px rgba(0,201,167,.2);
    animation: cPulse 2s ease-in-out infinite;
  }
  .c-avail-text {
    font-size: .85rem; color: rgba(245,244,242,.65);
    line-height: 1.4;
  }
  .c-avail-text strong { color: var(--c-teal); font-weight: 600; }

  /* social row */
  .c-socials {
    display: flex; gap: .75rem; flex-wrap: wrap;
  }
  .c-social {
    display: inline-flex; align-items: center; gap: 7px;
    padding: 8px 14px;
    background: var(--c-card);
    border: 1px solid var(--c-border);
    border-radius: 10px;
    text-decoration: none;
    font-size: .8rem; font-weight: 500;
    color: var(--c-muted);
    transition: all .3s var(--c-bounce);
  }
  .c-social:hover {
    border-color: var(--c-border2);
    color: var(--c-fog);
    transform: translateY(-3px);
    background: #181a24;
  }
  .c-social svg { flex-shrink: 0; }

  /* ── FORM ── */
  .c-form-wrap {
    animation: cSlideRight .85s var(--c-out) .35s both;
  }

  .c-form {
    background: var(--c-card);
    border: 1px solid var(--c-border);
    border-radius: 22px;
    padding: 2rem 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  }

  .c-form-title {
    font-family: var(--c-fd);
    font-size: 1.45rem; font-weight: 400;
    color: var(--c-fog); margin: 0 0 .25rem;
    letter-spacing: -.02em;
  }
  .c-form-title em { font-style: italic; color: var(--c-accent); }

  .c-field {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .c-field-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
  .c-label {
    font-family: var(--c-fm); font-size: .58rem;
    letter-spacing: .12em; text-transform: uppercase;
    color: var(--c-muted);
  }
  .c-input, .c-textarea, .c-select {
    background: rgba(245,244,242,.04);
    border: 1px solid var(--c-border);
    border-radius: 10px;
    padding: .75rem 1rem;
    font-family: var(--c-fb); font-size: .9rem;
    color: var(--c-fog);
    outline: none;
    transition: border-color .25s ease, background .25s ease;
    width: 100%;
    appearance: none;
    -webkit-appearance: none;
  }
  .c-input::placeholder, .c-textarea::placeholder { color: rgba(245,244,242,.22); }
  .c-input:focus, .c-textarea:focus, .c-select:focus {
    border-color: rgba(255,79,46,.5);
    background: rgba(255,79,46,.04);
  }
  .c-textarea { resize: vertical; min-height: 120px; line-height: 1.6; }
  .c-select { cursor: pointer; color: rgba(245,244,242,.55); }
  .c-select.filled { color: var(--c-fog); }

  .c-submit {
    display: flex; align-items: center; justify-content: center; gap: 9px;
    padding: .9rem 1.6rem;
    background: var(--c-accent); color: #fff;
    border: none; border-radius: 10px;
    font-family: var(--c-fb); font-size: .92rem; font-weight: 700;
    cursor: pointer;
    transition: all .35s var(--c-bounce);
    box-shadow: 0 4px 20px rgba(255,79,46,.3);
    width: 100%;
    position: relative; overflow: hidden;
  }
  .c-submit::before {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,.1), transparent);
    transform: translateX(-100%);
    transition: transform .5s ease;
  }
  .c-submit:hover::before { transform: translateX(100%); }
  .c-submit:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(255,79,46,.5);
  }
  .c-submit:active { transform: scale(.98); }
  .c-submit:disabled { opacity: .6; cursor: not-allowed; transform: none; }

  /* sent state */
  .c-sent {
    display: flex; flex-direction: column; align-items: center;
    gap: 1rem; padding: 2rem;
    text-align: center;
  }
  .c-sent-icon {
    width: 56px; height: 56px; border-radius: 50%;
    background: rgba(0,201,167,.12);
    border: 1px solid rgba(0,201,167,.3);
    display: flex; align-items: center; justify-content: center;
    font-size: 24px;
    animation: cFadeUp .5s var(--c-out) both;
  }
  .c-sent-title {
    font-family: var(--c-fd); font-size: 1.4rem;
    color: var(--c-fog); letter-spacing: -.02em;
  }
  .c-sent-sub { font-size: .88rem; color: var(--c-muted); }
  .c-sent-back {
    margin-top: .5rem;
    font-family: var(--c-fb); font-size: .85rem;
    color: var(--c-accent); background: none; border: none;
    cursor: pointer; text-decoration: underline;
    text-underline-offset: 3px;
  }

  /* error */
  .c-error { font-size: .75rem; color: #ff6b47; margin-top: 2px; }

  /* ── RESPONSIVE ── */
  @media (min-width: 640px) {
    .c-form { padding: 2.2rem 2rem; }
  }

  @media (min-width: 900px) {
    .c-section { padding: 6rem 2.5rem 5rem; }
    .c-header  { align-items: flex-start; text-align: left; }
    .c-subhead { max-width: 560px; }
    .c-body    { grid-template-columns: 1fr 1.2fr; gap: 3rem; align-items: start; }
  }

  @media (max-width: 480px) {
    .c-field-row { grid-template-columns: 1fr; }
  }

  ::selection { background: rgba(255,79,46,.3); color: var(--c-fog); }
`;

/* ── Social icons ── */
const GithubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const TwitterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const SUBJECTS = [
  "Full-time Opportunity",
  "Freelance Project",
  "Collaboration",
  "Internship",
  "Just saying hi 👋",
];

/* ─────────────────────────────────────────
   COMPONENT
───────────────────────────────────────── */
export default function Contact() {
  const [form, setForm]   = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [sent, setSent]   = useState(false);
  const formRef = useRef(null);


  const [result, setResult] = useState("");
  const [status, setStatus] = useState("idle"); // idle, sending, success, error

  const onSubmit = async (event) => {
    event.preventDefault();
    setStatus("sending");
    setResult("Sending....");

    const formData = new FormData(event.target);
    
    // Web3Forms Access Key
    formData.append("access_key", "3ad92f93-4515-48d8-8f11-24e9c554b51f"); 

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setStatus("success");
        setResult("Message Sent Successfully! ✓");
        event.target.reset();
      } else {
        console.log("Error", data);
        setStatus("error");
        setResult(data.message);
      }
    } catch (error) {
      setStatus("error");
      setResult("Something went wrong. Please try again.");
    }
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name    = "Name is required";
    if (!form.email.trim())   e.email   = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (!form.subject)        e.subject = "Please select a subject";
    if (!form.message.trim()) e.message = "Message is required";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (errors[name]) setErrors(er => ({ ...er, [name]: "" }));
    if (name === "subject") e.target.classList.add("filled");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSending(true);
    await new Promise(r => setTimeout(r, 1600)); // simulate send
    setSending(false);
    setSent(true);
  };

  return (
    <section className="c-section" id="contact" aria-label="Contact section">
      <style>{css}</style>

      <div className="c-aura" aria-hidden="true" />
      <div className="c-grid" aria-hidden="true" />

      <div className="c-wrapper">

        {/* ── HEADER ── */}
        <div className="c-header">
          <div className="c-eyebrow">
            <span className="c-eyebrow-dot" />
            Get in touch
          </div>
          <h2 className="c-heading">
            Let's <em>work</em><br />together
          </h2>
          <p className="c-subhead">
            Open to full-time roles, freelance projects, and interesting collaborations.
            Drop a message — I usually reply within 24 hours.
          </p>
        </div>

        {/* ── BODY ── */}
        <div className="c-body">

          {/* LEFT — info */}
          <div className="c-info">

            {/* availability */}
            <div className="c-avail">
              <span className="c-avail-dot" />
              <p className="c-avail-text">
                <strong>Currently available</strong> — open to full-time &amp; freelance roles starting immediately.
              </p>
            </div>

            {/* contact methods */}
            <a
              href="mailto:jain74159@gmail.com"
              className="c-method"
            >
              <div className="c-method-icon c-method-icon--red">📧</div>
              <div className="c-method-body">
                <div className="c-method-label">Email</div>
                <div className="c-method-value">jain74159@gmail.com</div>
              </div>
              <span className="c-method-arrow">→</span>
            </a>

            <a
              href="tel:+917744919256"
              className="c-method"
            >
              <div className="c-method-icon c-method-icon--teal">📞</div>
              <div className="c-method-body">
                <div className="c-method-label">Phone</div>
                <div className="c-method-value">+91 77449 19256</div>
              </div>
              <span className="c-method-arrow">→</span>
            </a>

            <a
              href="https://rohitjain.netlify.app"
              target="_blank"
              rel="noopener noreferrer"
              className="c-method"
            >
              <div className="c-method-icon c-method-icon--blue">🌐</div>
              <div className="c-method-body">
                <div className="c-method-label">Portfolio</div>
                <div className="c-method-value">rohitjain.netlify.app</div>
              </div>
              <span className="c-method-arrow">→</span>
            </a>

            <a
              href="https://maps.google.com/?q=Dhule+Maharashtra+India"
              target="_blank"
              rel="noopener noreferrer"
              className="c-method"
            >
              <div className="c-method-icon c-method-icon--fog">📍</div>
              <div className="c-method-body">
                <div className="c-method-label">Location</div>
                <div className="c-method-value">Dhule, Maharashtra, India</div>
              </div>
              <span className="c-method-arrow">→</span>
            </a>

            {/* socials */}
            <div className="c-socials">
              <a
                href="https://github.com/rohitjain7744"
                target="_blank" rel="noopener noreferrer"
                className="c-social"
              >
                <GithubIcon /> GitHub
              </a>
              <a
                href="https://linkedin.com"
                target="_blank" rel="noopener noreferrer"
                className="c-social"
              >
                <LinkedinIcon /> LinkedIn
              </a>
              <a
                href="https://twitter.com"
                target="_blank" rel="noopener noreferrer"
                className="c-social"
              >
                <TwitterIcon /> Twitter
              </a>
            </div>
          </div>

        {/* RIGHT — form */}
<div className="c-form-wrap">
  <div className="c-form">
    {sent ? (
      <div className="c-sent">
        <div className="c-sent-icon">✓</div>
        <div className="c-sent-title">Message sent!</div>
        <div className="c-sent-sub">
          Thanks for reaching out, I'll get back to you soon.
        </div>
        <button
          className="c-sent-back"
          onClick={() => { setSent(false); setForm({ name:"", email:"", subject:"", message:"" }); }}
        >
          Send another message
        </button>
      </div>
    ) : (
      <>
        <p className="c-form-title">Send a <em>message</em></p>

        {/* Form handling starts here */}
        <form onSubmit={async (e) => {
          e.preventDefault();
          const errs = validate();
          if (Object.keys(errs).length) { setErrors(errs); return; }
          
          setSending(true);

          // Web3Forms logic
          const formData = new FormData(e.target);
          formData.append("access_key", "3ad92f93-4515-48d8-8f11-24e9c554b51f"); // 👈 Yahan apni Key paste karein

          try {
            const response = await fetch("https://api.web3forms.com/submit", {
              method: "POST",
              body: formData
            });
            const data = await response.json();

            if (data.success) {
              setSent(true);
              setForm({ name: "", email: "", subject: "", message: "" });
            } else {
              setErrors({ form: "Something went wrong. Please try again." });
            }
          } catch (error) {
            setErrors({ form: "Network error. Please check your connection." });
          } finally {
            setSending(false);
          }
        }} noValidate>
          
          {/* Honeypot for Spam Protection (Hidden from users) */}
          <input type="checkbox" name="botcheck" style={{ display: "none" }} />

          <div style={{ display:"flex", flexDirection:"column", gap:"1.1rem" }}>

            <div className="c-field-row">
              <div className="c-field">
                <label className="c-label" htmlFor="cf-name">Full Name</label>
                <input
                  className="c-input"
                  id="cf-name" name="name" type="text"
                  placeholder="Rohit Jain"
                  value={form.name} onChange={handleChange}
                  autoComplete="name"
                  required
                />
                {errors.name && <span className="c-error">{errors.name}</span>}
              </div>
              <div className="c-field">
                <label className="c-label" htmlFor="cf-email">Email</label>
                <input
                  className="c-input"
                  id="cf-email" name="email" type="email"
                  placeholder="you@example.com"
                  value={form.email} onChange={handleChange}
                  autoComplete="email"
                  required
                />
                {errors.email && <span className="c-error">{errors.email}</span>}
              </div>
            </div>

            <div className="c-field">
              <label className="c-label" htmlFor="cf-subject">Subject</label>
              <select
                className="c-select"
                id="cf-subject" name="subject"
                value={form.subject} onChange={handleChange}
                required
              >
                <option value="" disabled>Select a subject…</option>
                {SUBJECTS.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              {errors.subject && <span className="c-error">{errors.subject}</span>}
            </div>

            <div className="c-field">
              <label className="c-label" htmlFor="cf-message">Message</label>
              <textarea
                className="c-textarea"
                id="cf-message" name="message"
                placeholder="Tell me about your project or opportunity…"
                value={form.message} onChange={handleChange}
                rows={5}
                required
              />
              {errors.message && <span className="c-error">{errors.message}</span>}
            </div>

            {/* General Form Error Message */}
            {errors.form && <span className="c-error" style={{ textAlign: 'center' }}>{errors.form}</span>}

            <button
              type="submit"
              className="c-submit"
              disabled={sending}
            >
              {sending ? (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{animation:"spin 1s linear infinite"}}>
                    <path d="M21 12a9 9 0 11-6.219-8.56"/>
                  </svg>
                  Sending…
                </>
              ) : (
                <>
                  Send Message
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/>
                  </svg>
                </>
              )}
            </button>

          </div>
        </form>
      </>
    )}
  </div>
</div>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </section>
  );
}