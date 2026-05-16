import { useEffect, useRef, useState } from "react";
import "./About.css";

/* ── Animated counter hook ─────────────────────────────── */
function useCounter(target, duration = 1200, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return value;
}

/* ── Stats data ────────────────────────────────────────── */
const STATS = [
  { number: 4,  suffix: "+",  label: "Full-Stack Apps" },
  { number: 10, suffix: "+",  label: "Bugs Squashed" },
  { number: 1,  suffix: "+ yr", label: "Experience" },
];

/* ── Skills ────────────────────────────────────────────── */
const SKILLS = [
  "React.js", "Node.js", "Spring Boot",
  "MongoDB", "MySQL", "Express.js",
  "Java", "JavaScript", "REST APIs",
  "JWT Auth", "System Design", "DSA",
];

/* ── Badge data ────────────────────────────────────────── */
const BADGES = [
  { icon: "🎓", label: "Degree",   value: "B.E. Computer Engg."  },
  { icon: "📍", label: "Location", value: "Dhule, Maharashtra"    },
  { icon: "💼", label: "Status",   value: "Open to SWE Roles" },
];

/* ── StatCell ──────────────────────────────────────────── */
function StatCell({ target, suffix, label, animate }) {
  const value = useCounter(target, 1200, animate);
  return (
    <div className="stat-cell">
      <span className="stat-number">
        {animate ? value : 0}{suffix}
      </span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

/* ── About Component ───────────────────────────────────── */
function About() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.25 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="about" id="about" ref={sectionRef}>
      <div className="about-container">

        {/* ── LEFT VISUAL ─────────────────────────────── */}
        <div className="about-visual reveal-left">
          <div className="about-avatar-wrap">
            <div className="about-avatar-ring" aria-hidden="true" />
            <div className="about-avatar">
              <span>RJ</span>
            </div>
          </div>

          <div className="about-badges">
            {BADGES.map((b, i) => (
              <div
                className="badge reveal-up"
                key={b.label}
                style={{ animationDelay: `${0.5 + i * 0.12}s` }}
              >
                <div className="badge-icon" aria-hidden="true">{b.icon}</div>
                <div className="badge-text">
                  <span className="badge-label">{b.label}</span>
                  <span className="badge-value">{b.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT CONTENT ───────────────────────────── */}
        <div className="about-card reveal-right">

          <div className="section-tag reveal-up delay-1">About Me</div>

          <h2 className="reveal-up delay-2">
            Crafting <em>scalable</em><br />digital solutions
          </h2>

          <p className="about-bio reveal-up delay-3">
            I'm <strong>Rohit Jain</strong>, a Full-Stack Engineer from Maharashtra, currently pursuing my B.E. in Computer Engineering.
            I specialize in building robust applications using the <strong>MERN stack</strong> and <strong>Spring Boot</strong>.
            I focus on clean architecture, secure RESTful APIs, and deploying production-ready platforms — from auth flows to full cloud deployment.
          </p>

          <hr className="about-divider reveal-up delay-4" />

          {/* Stats */}
          <div className="about-stats">
            {STATS.map((s) => (
              <StatCell
                key={s.label}
                target={s.number}
                suffix={s.suffix}
                label={s.label}
                animate={visible}
              />
            ))}
          </div>

          {/* Skills */}
          <div className="skill-tags reveal-up delay-5">
            {SKILLS.map((s, i) => (
              <span
                className="skill-tag"
                key={s}
                style={{ animationDelay: `${0.9 + i * 0.04}s` }}
              >
                {s}
              </span>
            ))}
          </div>

          {/* CTA */}


          <div className="h-btns">
            <a href="/about" className="h-btn h-btn-primary">
              More About
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M1 7h12M7.5 1.5L13 7l-5.5 5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="/contact" className="h-btn h-btn-ghost">
              Contact Me
            </a>
          </div>
         

        </div>
      </div>
    </section>
  );
}

export default About;