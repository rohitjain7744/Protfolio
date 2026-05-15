import { useState } from "react";

const LINKS = ["About", "Projects", "Skills", "Experience", "Contact"];

const CONTACTS = [
  { icon: "✉️", val: "jain74159@gmail.com",     href: "mailto:jain74159@gmail.com" },
  { icon: "📱", val: "+91 7744 919 256",         href: "tel:+917744919256" },
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
      <footer style={{
        background: "#04060f",
        borderTop: "1px solid rgba(255,255,255,0.07)",
        padding: "32px 48px 20px",
        fontFamily: "'DM Sans', sans-serif",
        color: "#f0ece4",
        position: "relative",
        overflow: "hidden",
      }}>

        {/* Top shimmer */}
        <div style={{ position:"absolute",top:0,left:"15%",right:"15%",height:1,background:"linear-gradient(90deg,transparent,rgba(245,166,35,.5),transparent)",pointerEvents:"none" }} />

        {/* Grid: Brand | Nav | Contacts */}
        <div style={{ display:"grid", gridTemplateColumns:"1.2fr 0.8fr 1fr", gap:"32px 40px", marginBottom:24 }}>

          {/* Brand */}
          <div>
            <div style={{
              fontFamily:"'Cormorant Garamond',serif",
              fontSize:36, fontWeight:700, lineHeight:1,
              letterSpacing:"-.02em", marginBottom:10,
            }}>
              Rohit <em style={{ fontStyle:"italic", color:"transparent", WebkitTextStroke:"1.5px rgba(245,166,35,.7)" }}>Jain</em>
            </div>
            <p style={{ fontSize:12, fontWeight:300, lineHeight:1.7, color:"rgba(240,236,228,.38)", marginBottom:12, maxWidth:220 }}>
              Full Stack Engineer — MERN &amp; Spring Boot. Building production-ready apps end-to-end.
            </p>
            <div style={{ display:"flex", alignItems:"center", gap:7 }}>
              <div style={{ width:6,height:6,borderRadius:"50%",background:"#22c55e",boxShadow:"0 0 6px #22c55e",animation:"glow 2s infinite" }} />
              <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9, color:"rgba(34,197,94,.8)", letterSpacing:"0.08em" }}>Available for work</span>
            </div>
          </div>

          {/* Nav */}
          <div>
            <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:8.5, letterSpacing:"0.12em", textTransform:"uppercase", color:"rgba(255,255,255,.2)", marginBottom:12 }}>Pages</div>
            <div style={{ display:"flex", flexDirection:"column", gap:0 }}>
              {LINKS.map(l => (
                <a key={l} href={`#${l.toLowerCase()}`}
                  onMouseEnter={() => setHov(l)}
                  onMouseLeave={() => setHov(null)}
                  style={{
                    display:"flex", justifyContent:"space-between", alignItems:"center",
                    padding:"6px 0",
                    borderBottom:"1px solid rgba(255,255,255,.05)",
                    textDecoration:"none",
                    fontSize:12.5,
                    color: hov === l ? "#f5a623" : "rgba(240,236,228,.45)",
                    paddingLeft: hov === l ? 5 : 0,
                    transition:"all .22s cubic-bezier(.16,1,.3,1)",
                  }}>
                  {l}
                  <span style={{ fontSize:9, color: hov === l ? "rgba(245,166,35,.6)" : "transparent", transition:"color .2s" }}>→</span>
                </a>
              ))}
            </div>
          </div>

          {/* Contacts */}
          <div>
            <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:8.5, letterSpacing:"0.12em", textTransform:"uppercase", color:"rgba(255,255,255,.2)", marginBottom:12 }}>Contact</div>
            <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
              {CONTACTS.map(c => (
                <a key={c.val} href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  onMouseEnter={() => setHov(c.val)}
                  onMouseLeave={() => setHov(null)}
                  style={{
                    display:"flex", alignItems:"center", gap:8,
                    padding:"6px 10px", borderRadius:5,
                    background: hov === c.val ? "rgba(245,166,35,.07)" : "rgba(255,255,255,.03)",
                    border:`1px solid ${hov === c.val ? "rgba(245,166,35,.2)" : "rgba(255,255,255,.06)"}`,
                    textDecoration:"none",
                    fontSize:11.5, color: hov === c.val ? "rgba(245,166,35,.85)" : "rgba(240,236,228,.45)",
                    transform: hov === c.val ? "translateX(3px)" : "translateX(0)",
                    transition:"all .22s cubic-bezier(.16,1,.3,1)",
                  }}>
                  <span style={{ fontSize:12 }}>{c.icon}</span>
                  {c.val}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Stack tags */}
        <div style={{ display:"flex", flexWrap:"wrap", gap:5, marginBottom:20, paddingBottom:20, borderBottom:"1px solid rgba(255,255,255,.06)" }}>
          {STACK.map(s => (
            <span key={s}
              onMouseEnter={e => { e.currentTarget.style.background="rgba(245,166,35,.08)"; e.currentTarget.style.borderColor="rgba(245,166,35,.2)"; e.currentTarget.style.color="rgba(245,166,35,.75)"; }}
              onMouseLeave={e => { e.currentTarget.style.background="rgba(255,255,255,.03)"; e.currentTarget.style.borderColor="rgba(255,255,255,.06)"; e.currentTarget.style.color="rgba(240,236,228,.3)"; }}
              style={{
                padding:"3px 10px", borderRadius:4,
                background:"rgba(255,255,255,.03)",
                border:"1px solid rgba(255,255,255,.06)",
                fontFamily:"'JetBrains Mono',monospace",
                fontSize:9, letterSpacing:"0.04em",
                color:"rgba(240,236,228,.3)",
                transition:"all .2s", cursor:"default",
              }}>
              {s}
            </span>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:10 }}>
          <div style={{ display:"flex", alignItems:"center", gap:14 }}>
            <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:17, fontWeight:700 }}>
              RJ<em style={{ color:"#f5a623", fontStyle:"italic" }}>.</em>
            </span>
            <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:8.5, color:"rgba(240,236,228,.18)", letterSpacing:"0.07em" }}>
              © 2026 Rohit Premchand Jain · Dhule, India
            </span>
          </div>

          <a href="mailto:jain74159@gmail.com"
            onMouseEnter={e => { e.currentTarget.style.filter="brightness(.88)"; e.currentTarget.style.transform="translateY(-1px)"; e.currentTarget.style.boxShadow="0 8px 24px rgba(245,166,35,.3)"; }}
            onMouseLeave={e => { e.currentTarget.style.filter="brightness(1)"; e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow="none"; }}
            style={{
              display:"inline-flex", alignItems:"center", gap:7,
              padding:"8px 18px", borderRadius:4,
              background:"#f5a623", color:"#04060f",
              fontFamily:"'DM Sans',sans-serif",
              fontSize:10.5, fontWeight:700, letterSpacing:"0.07em", textTransform:"uppercase",
              textDecoration:"none", transition:"all .25s cubic-bezier(.16,1,.3,1)",
            }}>
            Hire Me ↗
          </a>
        </div>
      </footer>
    </>
  );
}