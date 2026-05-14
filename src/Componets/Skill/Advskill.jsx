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
    desc: 'Production-ready recruitment platform with secure role-based access control.',
    accent: '#6c47ff',
    num: '01',
    year: '2024',
  },
  {
    id: 'ecommerce',
    name: 'MERN E-Commerce',
    category: 'Full-Stack Retail',
    tags: ['MongoDB', 'Node.js', 'Redux'],
    desc: 'Scalable platform with real-time cart updates and complex filtering.',
    accent: '#ff6b47',
    num: '02',
    year: '2024',
  },
  {
    id: 'health-sync',
    name: 'Health Sync',
    category: 'Real-time Monitoring',
    tags: ['Spring Boot', 'Twilio', 'Vitals'],
    desc: 'Emergency alert system triggering automated SMS & Email on health vitals.',
    accent: '#00c9a7',
    num: '03',
    year: '2024',
  },
];

/* ─────────────────────────────────────────
   STYLES
───────────────────────────────────────── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Cabinet+Grotesk:wght@300;400;700&family=JetBrains+Mono&display=swap');

  :root {
    --fp-ink:    #0a0a0f;
    --fp-fog:    #f5f4f2;
    --fp-muted:  #6b6878;
    --fp-border: rgba(245,244,242,0.08);
    --fp-accent: #ff4f2e;
    --fp-fd: 'DM Serif Display', serif;
    --fp-fb: 'Cabinet Grotesk', sans-serif;
    --fp-fm: 'JetBrains Mono', monospace;
    --fp-out: cubic-bezier(0.22,1,0.36,1);
  }

  .fp-section {
    background: var(--fp-ink);
    color: var(--fp-fog);
    font-family: var(--fp-fb);
    padding: 6rem 0;
    min-height: 100vh;
  }

  .fp-wrap {
    max-width: 1200px; /* Widened for row layout */
    margin: 0 auto;
    padding: 0 1.5rem;
  }

  .fp-text-header {
    margin-bottom: 4rem;
  }

  .fp-main-h1 {
    font-family: var(--fp-fd);
    font-size: clamp(2.5rem, 6vw, 4rem);
    margin: 0 0 1rem;
  }

  .fp-main-sub {
    color: var(--fp-muted);
    max-width: 500px;
    font-size: 1.1rem;
  }

  /* ─── GRID LAYOUT ─── */
  .fp-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr); /* THREE CARDS IN ONE ROW */
    gap: 2rem;
    border-top: 1px solid var(--fp-border);
  }

  .fp-card {
    text-decoration: none;
    color: inherit;
    display: flex;
    flex-direction: column;
    padding: 2rem 0;
    transition: transform 0.4s var(--fp-out), opacity 0.6s ease;
    opacity: 0;
    transform: translateY(20px);
  }

  .fp-card.fp-in {
    opacity: 1;
    transform: translateY(0);
  }

  .fp-card:hover {
    transform: translateY(-10px);
  }

  /* ─── CARD CONTENT ─── */
  .fp-top-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }

  .fp-num {
    font-family: var(--fp-fm);
    font-size: 0.75rem;
    color: var(--card-accent);
  }

  .fp-year {
    font-family: var(--fp-fm);
    font-size: 0.7rem;
    color: var(--fp-muted);
  }

  .fp-title {
    font-family: var(--fp-fd);
    font-size: 1.75rem;
    margin: 0 0 1rem;
    line-height: 1.2;
  }

  .fp-desc {
    font-size: 0.95rem;
    line-height: 1.6;
    color: rgba(245,244,242,0.5);
    margin-bottom: 2rem;
    flex: 1; /* Pushes meta to bottom */
  }

  .fp-meta-bottom {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding-top: 1.5rem;
    border-top: 1px solid var(--fp-border);
  }

  .fp-cat {
    font-family: var(--fp-fm);
    font-size: 0.6rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--card-accent);
  }

  .fp-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;
  }

  .fp-tag {
    font-family: var(--fp-fm);
    font-size: 0.6rem;
    color: var(--fp-muted);
  }

  .fp-footer {
    margin-top: 5rem;
    border-top: 1px solid var(--fp-border);
    padding-top: 2rem;
  }

  /* ─── RESPONSIVE ─── */
  @media (max-width: 1024px) {
    .fp-list { grid-template-columns: repeat(2, 1fr); }
  }

  @media (max-width: 640px) {
    .fp-list { grid-template-columns: 1fr; }
    .fp-section { padding: 4rem 0; }
  }
`;

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

export default function SingleRowProjects() {
  return (
    <section className="fp-section" id="projects">
      <style>{css}</style>
      <div className="fp-wrap">
        
        <header className="fp-text-header">
          <h1 className="fp-main-h1">Selected Works</h1>
          <p className="fp-main-sub">
            End-to-end full-stack applications and architectural case studies.
          </p>
        </header>

        <div className="fp-list">
          {FEATURED_PROJECTS.map((p, i) => {
            const [ref, visible] = useReveal();
            return (
              <Link 
                to={`/project/${p.id}`} 
                key={p.id}
                ref={ref}
                className={`fp-card ${visible ? 'fp-in' : ''}`}
                style={{ 
                  '--card-accent': p.accent,
                  transitionDelay: `${i * 0.15}s` 
                }}
              >
                <div className="fp-top-row">
                  <span className="fp-num">{p.num}</span>
                  <span className="fp-year">{p.year}</span>
                </div>

                <h3 className="fp-title">{p.name}</h3>
                <p className="fp-desc">{p.desc}</p>

                <div className="fp-meta-bottom">
                  <span className="fp-cat">{p.category}</span>
                  <div className="fp-tags">
                    {p.tags.map(tag => (
                      <span key={tag} className="fp-tag">#{tag}</span>
                    ))}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <footer className="fp-footer">
          <Link to="/project" className="fp-all-link" style={{ 
            fontFamily: 'var(--fp-fm)', 
            fontSize: '0.75rem', 
            textDecoration: 'none', 
            color: 'var(--fp-accent)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em'
          }}>
            Browse Full Archive &rarr;
          </Link>
        </footer>
      </div>
    </section>
  );
}