import "./Experience.css";

const Experience = () => {
  return (
    <section className="experience" id="experience">
      <h2 className="experience-title reveal">Experience & Education</h2>
      <p className="experience-subtitle reveal">
        My learning journey, hands-on experience, and academic background
      </p>

      <div className="experience-container">

        {/* Internship */}
        <div className="experience-card reveal-left">
          <span className="experience-dot"></span>
          <h3>Internship / Freelance</h3>
          <p className="role">Web Development Intern</p>
          <p className="desc">
            Built responsive web pages and React components. Worked with HTML,
            CSS, JavaScript, Git, and gained real-world development experience.
          </p>
        </div>

        {/* Final Year Project */}
        <div className="experience-card reveal-right">
          <span className="experience-dot"></span>
          <h3>Final Year Project</h3>
          <p className="role">Student Management System</p>
          <p className="desc">
            Developed a full-stack application using React for frontend and
            Spring Boot with MySQL for backend to manage student records.
          </p>
        </div>

        {/* Education */}
        <div className="experience-card reveal-left">
          <span className="experience-dot"></span>
          <h3>Education & Certification</h3>
          <p className="role">Bachelor’s Degree</p>
          <p className="desc">
            Completed Bachelor’s degree in Engineering / Computer Science and
            earned certifications in Web Development and Java.
          </p>
        </div>

      </div>
    </section>
  );
};

export default Experience;
