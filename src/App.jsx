import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

// Components
import Nav from "./Componets/Navbar/Nav.jsx";
import Hero from "./Componets/Hero/Hero.jsx";
import Aboutsection from "./Componets/About/About.jsx";
import Skill from "./Componets/Skill/Skill.jsx";
import Progress from "./Componets/Skill/Progress.jsx";
import Adskill from "./Componets/Skill/Advskill.jsx";
import Project from "./Componets/Project/Project.jsx";
import Experience from "./Componets/Experience/Experience.jsx";
import Contact from "./Componets/Contact/Contact.jsx";
import Testimonials from "./Componets/Testimonials/Testimonials.jsx";
import Certifications from "./Componets/Testimonials/Certifications.jsx";
import Achievements from "./Componets/Testimonials/Achievements.jsx";
import Footer from "./Componets/Footer/Footer.jsx";

// Pages (Flowchart ke mutabiq)
import ProjectDetail from "./Page/Project/ProjectDetails.jsx";
import About from "./Page/About/About.jsx";
import ClientPage from "./Page/Client/Client.jsx"; // Naya page for Client Work
import ClientDetail from "./Page/Client/ClientDetail.jsx"; // Specific client details
import ContactPage from "./Page/Contact/Contact.jsx"; // Dedicated contact page
import ProjectPage from "./Page/Project/Project.jsx"


/* ── MAIN LANDING PAGE (SPA Layout) ───────────────────────── */
const Home = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          } else {
            entry.target.classList.remove("active");
          }
        });
      },
      { threshold: 0.15 }
    );

    const revealElements = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="home-wrapper">
      <Hero />
      <Aboutsection />
      <Skill id="skills" />
      <Progress />
      <Adskill />
      {/* Home page par certificates aur any extra achievements ka preview */}
      <Certifications /> 
      <Achievements />
      <Contact id="contact" />
    </div>
  );
};

/* ── APP ROUTER ───────────────────────────────────────────── */
const App = () => {
  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Nav />
      
      <Routes>
        {/* 1. Home Page Route */}
        <Route path="/" element={<Home />} />

        {/* 2. About Page Route (Detailed Information, Education, etc.) */}
        <Route path="/about" element={<About />} />

        {/* 3. Project Routes (Dropdown selection ke liye dynamic route) */}
        <Route path="/project/:id" element={<ProjectDetail />} />

        <Route path="/project" element={<ProjectPage/>}/>

        <Route path="/projectDetails/:slug" element={<ProjectDetail/>}/>

        {/* 4. Client Page Routes (Aapke flowchart ke 'clientWork' ke liye) */}
        <Route path="/clients" element={<ClientPage />} />
        <Route path="/client-details/:slug" element={<ClientDetail />} />

        {/* 5. Direct Contact Page (Agar navbar se alag open karna ho) */}
        

        <Route path="/contact" element={<ContactPage />} />
      </Routes>

      <Footer />
    </>
  );
};

export default App;