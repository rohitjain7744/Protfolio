import "../Testimonials/Extra.css";

const Testimonial = () => {
  return (
    <section className="extras" id="testimonials">
      <h2 className="extras-title reveal">Testimonials</h2>
      <p className="extras-subtitle reveal">
        What mentors and clients say about my work
      </p>

      <div className="extras-grid">

        <div className="extras-card reveal-left">
          <p className="quote">
            “Rohit is a quick learner with strong React fundamentals and a
            positive approach towards problem solving.”
          </p>
          <span className="author">— Mentor</span>
        </div>

        <div className="extras-card reveal-right">
          <p className="quote">
            “Delivered the project on time with a clean UI and clear code
            structure. Communication was smooth throughout.”
          </p>
          <span className="author">— Client</span>
        </div>

      </div>
    </section>
  );
};

export default Testimonial;
