import React from 'react';
import './Skill.css'; // Custom CSS for styling
const TECH_STACK = [
  {
    category: "Backend & Systems",
    skills: [
      { name: "Spring Boot", level: "Advanced" },
      { name: "Java / Hibernate", level: "Expert" },
      { name: "Node.js / Express", level: "Intermediate" },
      { name: "JWT / Security", level: "Advanced" }
    ],
    accent: "var(--h-blue)"
  },
  {
    category: "Frontend & UI",
    skills: [
      { name: "React.js / Redux", level: "Advanced" },
      { name: "Tailwind CSS", level: "Expert" },
      { name: "JavaScript (ES6+)", level: "Advanced" },
      { name: "Responsive UI", level: "Expert" }
    ],
    accent: "var(--h-accent)"
  },
  {
    category: "Database & Cloud",
    skills: [
      { name: "MySQL / MongoDB", level: "Advanced" },
      { name: "AWS / Railway", level: "Intermediate" },
      { name: "Git / GitHub", level: "Advanced" },
      { name: "Postman API", level: "Expert" }
    ],
    accent: "var(--h-teal)"
  }
];
export default function TechStack() {
  return (
    <section className="tech-section" id="tech">
      <div className="tech-container">
        <div className="section-header">
          <span className="section-tag">Stack</span>
          <h2>Technical <em>Arsenal</em></h2>
        </div>

        <div className="tech-grid">
          {TECH_STACK.map((group, i) => (
            <div className="tech-card" key={i} style={{ '--card-accent': group.accent }}>
              <h3 className="category-title">{group.category}</h3>
              <div className="skills-list">
                {group.skills.map((skill, j) => (
                  <div className="skill-item" key={j}>
                    <div className="skill-info">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-level">{skill.level}</span>
                    </div>
                    <div className="skill-bar-bg">
                      <div 
                        className="skill-bar-fill" 
                        style={{ width: skill.level === 'Expert' ? '95%' : skill.level === 'Advanced' ? '80%' : '65%' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}