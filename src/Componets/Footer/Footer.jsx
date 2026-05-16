import { useState } from "react";
import "./Footer.css";
const LINKS = ["About", "Project", , "Clients", "Contact"];

const CONTACTS = [
  { icon: "✉️", val: "jain74159@gmail.com",     href: "mailto:jain74159@gmail.com" },
  { icon: "📱", val: "+917744919256",         href: "tel:+917744919256" },
  { icon: "🌐", val: "rohitjain.netlify.app",    href: "https://rohitjain.netlify.app" },
  { icon: "⚙️", val: "github.com/rohitjain7744", href: "https://github.com/rohitjain7744" },
];

const STACK = ["React.js","Spring Boot","Node.js","MongoDB","MySQL","JWT","REST API","Netlify","Railway","Git"];

const KF = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,700;1,700&family=DM+Sans:wght@300;400;500&family=JetBrains+Mono:wght@400&display=swap');
  @keyframes glow { 0%,100%{opacity:1} 50%{opacity:.3} }
`;

export default function Footer() {
  const [hov, setHov] = useState(null);

  return (
    <>
      <style>{KF}</style>
      <footer className="footer">

  <div className="footer-shimmer"></div>

  <div className="footer-container">

    {/* Brand */}
    <div className="footer-brand">
      <h3>
        Rohit <span>Jain</span>
      </h3>

      <p>
        Full Stack Engineer — MERN & Spring Boot.
        Building scalable production-ready applications
        with modern UI/UX and cloud-native architecture.
      </p>

      <div className="footer-status">
        <div className="status-dot"></div>
        <span>Available for work</span>
      </div>
    </div>

    {/* Navigation */}
    <div className="footer-links">
      <h4>Pages</h4>

      <ul>
        {LINKS.map((l) => (
          <li key={l}>
            <a href={`/${l.toLowerCase()}`}>
              {l}
            </a>
          </li>
        ))}
      </ul>
    </div>

    {/* Contact */}
    <div className="footer-social">
      <h4>Contact</h4>

      <div className="social-links">
        {CONTACTS.map((c) => (
          <a
            key={c.val}
            href={c.href}
            target={c.href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
          >
            <span>{c.icon}</span>
            {c.val}
          </a>
        ))}
      </div>
    </div>
  </div>

  {/* Stack */}
  <div className="footer-stack">
    {STACK.map((s) => (
      <span key={s}>{s}</span>
    ))}
  </div>

  {/* Bottom */}
  <div className="footer-bottom">
    <div className="footer-copy">
      <span className="footer-logo">
        RJ<span>.</span>
      </span>

      <p>
        © 2026 Rohit Premchand Jain · Dhule, India
      </p>
    </div>

    <a
      href="mailto:jain74159@gmail.com"
      className="footer-btn"
    >
      Hire Me ↗
    </a>
  </div>

</footer>
    </>
  );
}