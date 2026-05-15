import { useState } from "react";
import "./Contact.css";

export default function Contact() {
  const [status, setStatus] = useState(null); // null | 'ok' | 'err'
  const [sending, setSending] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setSending(true);
    setStatus(null);

    const formData = new FormData(e.target);

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });
      
      const json = await res.json();
      
      if (json.success) {
        setStatus('ok');
        e.target.reset(); 
      } else {
        setStatus('err');
      }
    } catch (err) {
      console.error("Submission Error:", err);
      setStatus('err');
    } finally {
      setSending(false);
    }
  }

  return (
    <section className="ct-section" id="contact" aria-label="Contact section">
      <div className="ct-aura" aria-hidden="true" />
      <div className="ct-grid" aria-hidden="true" />

      <div className="ct-wrap">
        {/* HEADER */}
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

        {/* MAIN GRID */}
        <div className="ct-grid-layout">
          {/* FORM */}
          <div className="ct-form-card">
            <form onSubmit={handleSubmit} noValidate>
              {/* Web3Forms Access Key */}
              <input type="hidden" name="access_key" value="3ad92f93-4515-48d8-8f11-24e9c554b51f" />
              
              {/* Anti-Spam (Honeypot) */}
              <input type="checkbox" name="botcheck" style={{ display: 'none' }} tabIndex="-1" aria-hidden="true" />
              
              {/* Customizations */}
              <input type="hidden" name="from_name" value="Rohit Jain Portfolio" />
              <input type="hidden" name="subject" value="New Inquiry from Portfolio" />

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

              <div className="ct-field">
                <label className="ct-label" htmlFor="ct-msg-subject">Subject</label>
                <input
                  id="ct-msg-subject" type="text" name="msg_subject"
                  className="ct-input" placeholder="Project Inquiry / Collaboration"
                  required
                />
              </div>

              <div className="ct-field">
                <label className="ct-label" htmlFor="ct-message">Message</label>
                <textarea
                  id="ct-message" name="message"
                  className="ct-textarea" rows="5"
                  placeholder="Tell me about your project, timeline, and how I can help..."
                  required
                />
              </div>

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

              {status === 'ok'  && <p className="ct-status ct-status--ok">✓ Message sent! I'll get back to you soon.</p>}
              {status === 'err' && <p className="ct-status ct-status--err">✗ Something went wrong. Please try again or email directly.</p>}
            </form>
          </div>

          {/* INFO CARD */}
          <div className="ct-info-card">
            <div className="ct-info-title">Get in <em>touch.</em></div>
            
            <div className="ct-info-item">
              <span className="ct-info-label">Email</span>
              <a href="mailto:jain74159@gmail.com" className="ct-info-val">jain74159@gmail.com</a>
            </div>

            <div className="ct-info-item">
              <span className="ct-info-label">Location</span>
              <span className="ct-info-val">Dhule, Maharashtra, India</span>
            </div>

            <div className="ct-info-item">
              <span className="ct-info-label">Socials</span>
              <div className="ct-socials">
                <a href="https://linkedin.com/in/rohitjain7744" target="_blank" rel="noopener noreferrer" className="ct-social-link">LinkedIn</a>
                <a href="https://github.com/rohitjain7744" target="_blank" rel="noopener noreferrer" className="ct-social-link">GitHub</a>
              </div>
            </div>

            <div className="ct-avail">
              <span className="ct-avail-dot" />
              Available — Open to full-time &amp; freelance
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}