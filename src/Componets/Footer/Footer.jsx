import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer reveal">
      <div className="footer-container">

        {/* LEFT */}
        <div className="footer-brand">
          <h3>Rohit Jain</h3>
          <p>
            Web Developer passionate about building modern, responsive and
            user-friendly web applications.
          </p>
        </div>

        {/* CENTER */}
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
           <li><a href="#home" onClick={() => setOpen(false)}>Home</a></li>
            <li><a href="#about" onClick={() => setOpen(false)}>About</a></li>
            <li><a href="#projects" onClick={() => setOpen(false)}>Projects</a></li>
            <li><a href="#skills" onClick={() => setOpen(false)}>Skills</a></li>
            <li><a href="#contact" onClick={() => setOpen(false)}>Contact</a></li>
          </ul>
        </div>

        {/* RIGHT */}
        <div className="footer-social">
          <h4>Connect</h4>
          <div className="social-links">
            <a href="https://github.com/rohitjain7744" target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/rohitjain05/" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href="mailto:Jain74159@email.com">
              Email
            </a>
          </div>
        </div>

      </div>

      {/* BOTTOM */}
      <div className="footer-bottom">
        © {new Date().getFullYear()} Rohit Jain. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
