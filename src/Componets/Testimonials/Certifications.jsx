import React, { useState } from 'react';
import './Certifications.css';
import gallery1 from "../../assets/gallery1.jpeg";
import gallery2 from "../../assets/gallery2.jpeg";
import gallery3 from "../../assets/gallery3.jpeg";  
import gallery4 from "../../assets/gallery4.jpg";
import gallery5 from "../../assets/gallery5.jpg";
import gallery6 from "../../assets/gallery6.jpg";   
import gallery7 from "../../assets/gallery7.jpg";
import gallery8 from "../../assets/gallery8.png";


const CERTIFICATES = [
  {
    id: 1,
    title: "Software Engineering Intern",
    issuer: "Softcrowd Technologies",
    date: "2025",
    image: gallery3,
    category: "Experience",
    accent: "#00c9a7" // Teal for Experience
  },
  {
    id: 2,
    title: "Java Development Intern",
    issuer: "Codveda Technologies",
    date: "2026",
    image: gallery5,
    category: "Technical",
    accent: "#ff6b47" // Orange for Frontend/MERN
  },
  {
    id: 3,
    title: "Offer letter",
    issuer: "Backend Mastery",
    date: "2025",
    image: gallery2,
    category: "Experience",
    accent: "#6c47ff" // Purple for Backend
  },
  {
    id: 4,
    title: "Certificate of Completion",
    issuer: "Experince",
    date: "2025",
    image: gallery4,
    category: "Experience",
    accent: "#6c47ff" // Purple for Backend
  },

  {
    id: 5,
    title: "Certificate of Project Competition",
    issuer: "Backend Mastery",
    date: "2025",
    image: gallery1,
    category: "Experience",
    accent: "#6c47ff" // Purple for Backend
  },
  {
    id: 6,
    title: "Introduction to generative SAi ",
    issuer: "Microsoft",
    date: "April2026",
    image: gallery6,
    category: "Certification",
    accent: "#6c47ff" // Purple for Backend
  },

  {
    id: 7,
    title: "Automate development tasks by using GitHub Actions",
    issuer: "Microsoft",
    date: "2026",
    image: gallery7,
    category: "Certification",
    accent: "#6c47ff" // Purple for Backend
  },

  {
    id: 8,
    title: "Nova hire System Design",
    issuer: "Techinical",
    date: "2026",
    image: gallery8,
    category: "Experience",
    accent: "#6c47ff" // Purple for Backend
  },
];  
export default function CertGallery() {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Experience', 'Technical', 'Backend'];

  const filteredCerts = filter === 'All' 
    ? CERTIFICATES 
    : CERTIFICATES.filter(c => c.category === filter);

  return (
    <section className="cert-section" id="certifications">
      <div className="cert-container">
        <div className="section-header">
          <span className="section-tag">Recognition</span>
          <h2>Certificates & <em>Achievements</em></h2>
        </div>

        {/* Filter Tabs */}
        <div className="cert-filters">
          {categories.map(cat => (
            <button 
              key={cat}
              className={`filter-btn ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Cinematic Grid */}
        <div className="cert-grid">
          {filteredCerts.map((cert) => (
            <div className="cert-card" key={cert.id} style={{ '--cert-accent': cert.accent }}>
              <div className="cert-img-wrapper">
                <img src={cert.image} alt={cert.title} />
                <div className="cert-overlay">
                  <span className="cert-view-text">View Certificate</span>
                </div>
              </div>
              <div className="cert-info">
                <div className="cert-meta">
                  <span className="cert-cat">{cert.category}</span>
                  <span className="cert-date">{cert.date}</span>
                </div>
                <h3 className="cert-title">{cert.title}</h3>
                <p className="cert-issuer">{cert.issuer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}