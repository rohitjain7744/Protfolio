import "../Testimonials/Extra.css";

const Certifications = () => {
  return (
    <section className="extras" id="certifications">
      <h2 className="extras-title reveal">Certifications</h2>
      <p className="extras-subtitle reveal">
        Verified learning and skill development credentials
      </p>

      <div className="extras-grid">

        <div className="extras-card reveal-left">
          <span className="cert-tag">Udemy</span>
          <h3 className="cert-title">Web Development</h3>
          <p className="cert-desc">
            Completed hands-on training covering HTML, CSS, JavaScript, and
            modern frontend practices.
          </p>
        </div>

        <div className="extras-card reveal">
          <span className="cert-tag">Coursera</span>
          <h3 className="cert-title">Java Programming</h3>
          <p className="cert-desc">
            Learned core Java concepts, OOP principles, and problem-solving
            techniques.
          </p>
        </div>

        <div className="extras-card reveal-right">
          <span className="cert-tag">Internshala</span>
          <h3 className="cert-title">React JS</h3>
          <p className="cert-desc">
            Built React components, managed state, and developed real-world
            frontend projects.
          </p>
        </div>

      </div>
    </section>
  );
};

export default Certifications;
