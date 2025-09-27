


import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const animatedRoles = [
  'Machine Learning Engineer',
  'AI Engineer',
  'Data Scientist',
  'Web Developer'
];

function App() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const canvasRef = useRef(null);

  useEffect(() => {
    // Starfield + falling star animation
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    let stars = Array.from({ length: 120 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.2 + 0.5,
      speed: Math.random() * 0.5 + 0.2
    }));
    let fallingStars = [];
    function spawnFallingStar() {
      fallingStars.push({
        x: Math.random() * width,
        y: -20,
        len: Math.random() * 100 + 60,
        speed: Math.random() * 3 + 2,
        trail: Math.random() * 2 + 1
      });
    }
    let lastFallingStar = Date.now();
    function animate() {
      ctx.clearRect(0, 0, width, height);
      // Normal stars
      for (let star of stars) {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, 2 * Math.PI);
        ctx.fillStyle = 'white';
        ctx.globalAlpha = 0.8;
        ctx.fill();
        ctx.globalAlpha = 1;
        star.y -= star.speed;
        if (star.y < 0) {
          star.x = Math.random() * width;
          star.y = height;
        }
      }
      // Falling stars
      if (Date.now() - lastFallingStar > 1800) {
        spawnFallingStar();
        lastFallingStar = Date.now();
      }
      for (let i = fallingStars.length - 1; i >= 0; i--) {
        let fs = fallingStars[i];
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(fs.x, fs.y);
        ctx.lineTo(fs.x + fs.len, fs.y + fs.len / 2);
  ctx.strokeStyle = 'rgba(255,255,255,1)';
  ctx.lineWidth = fs.trail;
  ctx.shadowColor = '#fff';
  ctx.shadowBlur = 24;
        ctx.stroke();
        ctx.restore();
        fs.x += fs.speed;
        fs.y += fs.speed / 2;
        if (fs.x > width || fs.y > height) {
          fallingStars.splice(i, 1);
        }
      }
      requestAnimationFrame(animate);
    }
    animate();
    // Resize handler
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setDisplayedText('');
    setIsTyping(true);
    let charIndex = 0;
    const currentRole = animatedRoles[roleIndex];
    const typeInterval = setInterval(() => {
      setDisplayedText(currentRole.slice(0, charIndex + 1));
      charIndex++;
      if (charIndex === currentRole.length) {
        clearInterval(typeInterval);
        setIsTyping(false);
      }
    }, 70);
    return () => clearInterval(typeInterval);
  }, [roleIndex]);

  useEffect(() => {
    if (!isTyping) {
      const delay = setTimeout(() => {
        setRoleIndex((prev) => (prev + 1) % animatedRoles.length);
      }, 1200); // 1200ms delay after typing
      return () => clearTimeout(delay);
    }
  }, [isTyping]);

  return (
    <div className="portfolio-advanced-bg" style={{position:'relative'}}>
      <canvas ref={canvasRef} className="star-canvas" style={{position:'fixed', top:0, left:0, width:'100vw', height:'100vh', zIndex:0}}></canvas>
      <div className="portfolio-glass" style={{position:'relative', zIndex:2}}>
        <header className="portfolio-header-advanced">
          <nav>
            <a href="#about">About</a>
            <a href="#timeline">Education</a>
            <a href="#projects">Projects</a>
            <a href="#skills">Skills</a>
            <a href="#testimonials">Testimonials</a>
            <a href="#contact">Contact</a>
          </nav>
          <div className="hero-section">
            <h1 className="portfolio-title-gradient">Sanket Mishra</h1>
            <div className="animated-roles">
              <span className="animated-role-text">{displayedText}</span>
            </div>
            {/* Add this in header */}
            <div className="header-extra">
              {/* Place your additional header content here */}
            </div>
            <a href="https://github.com/SanketxMishra" className="resume-btn" download>Github</a>
            <a href="/resume.pdf" className="resume-btn" download>Download Resume</a>
            {/* Social links moved to last section */}
          </div>
        </header>
        <main>
          <section id="about" className="portfolio-section-advanced fade-in">
            <h2>About Me</h2>
            <p>
              Hello! I'm Sanket Mishra, a driven and creative technologist with a strong foundation in Data Science and Artificial Intelligence from IIT Madras. My expertise spans machine learning, deep learning, and full-stack web development (MERN). I thrive on transforming complex problems into elegant solutions, whether it's building intelligent models, designing seamless user experiences, or architecting scalable web applications.
              <br /><br />
              I am passionate about continuous learning and collaboration, and I enjoy working on projects that make a real-world impact. My journey has equipped me with a unique blend of analytical thinking, coding skills, and a keen eye for design. Let's connect and create something extraordinary together!
            </p>
          </section>
          <section id="timeline" className="portfolio-section-advanced fade-in">
            <h2>Education</h2>
            <div className="timeline">
              <div className="timeline-item">
                <span className="timeline-date">2022 - 2026</span>
                <span className="timeline-title">Bachelor of Science, IIT Madras</span>
                <span className="timeline-desc">Data Science and Artificial Intelligence</span>
              </div>
            </div>
          </section>
          <section id="projects" className="portfolio-section-advanced fade-in">
            <h2>Projects</h2>
            <div className="projects-grid">
              <div className="project-card glass-card">
                <h3>Data Analyst Agent</h3>
                <div className="project-desc" style={{fontWeight:'500', fontSize:'1.05rem', marginBottom:'0.7rem', color:'#8ec6ff'}}>A full-stack, autonomous data analysis web application built with FastAPI, Python, and modern data science libraries. The dashboard enables users to upload diverse data formats (CSV, Excel, Parquet, databases, images, PDFs), automatically extract and preview datasets, and answer custom analytical questions using a Large Language Model (LLM) agent.</div>
                <ul className="project-features">
                  <li>Upload and process multiple data types: CSV, Excel, Parquet, SQLite/DuckDB, JSON, ZIP/TAR archives, images, and PDFs.</li>
                  <li>Automated data extraction from images and PDFs using Google Gemini and OCR.</li>
                  <li>Preview dataset metrics: row/column counts, column names, and sample data.</li>
                  <li>Ask custom questions via a text file; the LLM agent generates Python code to compute answers.</li>
                  <li>Calculates summary statistics (mean, median, min, max, standard deviation) and generates visualizations (bar, line, pie charts) as base64-encoded images.</li>
                  <li>Web scraping tool for extracting tabular data from URLs (HTML tables, JSON, CSV, Excel, Parquet, databases, archives).</li>
                  <li>Interactive API for data analysis, visualization, and export.</li>
                  <li>Robust error handling and support for large datasets.</li>
                </ul>
                <div className="tech-stack">FastAPI, Python, Data Science Libraries, LLM, Google Gemini, OCR</div>
                <a href="#" className="project-link">View Project</a>
              </div>
            </div>
          </section>
          <section id="skills" className="portfolio-section-advanced fade-in">
              <h2>Skills</h2>
              <div className="skills-bars">
                <div className="skill-bar"><span>React</span><div className="bar"><div className="fill" style={{width:'95%'}}></div></div></div>
                <div className="skill-bar"><span>JavaScript</span><div className="bar"><div className="fill" style={{width:'90%'}}></div></div></div>
                <div className="skill-bar"><span>CSS</span><div className="bar"><div className="fill" style={{width:'85%'}}></div></div></div>
                <div className="skill-bar"><span>Node.js</span><div className="bar"><div className="fill" style={{width:'80%'}}></div></div></div>
                <div className="skill-bar"><span>TypeScript</span><div className="bar"><div className="fill" style={{width:'75%'}}></div></div></div>
              </div>
          </section>
          <div className="social-links" style={{textAlign: 'center', margin: '2rem 0'}}>
            <a href="www.linkedin.com/in/sankettmishra" target="_blank" rel="noopener" aria-label="LinkedIn"><i className="fab fa-linkedin"></i>LinkedIn</a>
            <a href="https://x.com/Mishra25Sanket" target="_blank" rel="noopener" aria-label="Twitter"><i className="fab fa-twitter"></i>Twitter</a>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
