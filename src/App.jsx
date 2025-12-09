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

  // --- Star Animation Logic ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Function to set canvas size dynamically
    const setCanvasSize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    setCanvasSize();

    let stars = Array.from({ length: 100 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.5,
      speed: Math.random() * 0.5 + 0.2
    }));

    let fallingStars = [];

    function spawnFallingStar() {
      fallingStars.push({
        x: Math.random() * canvas.width,
        y: -20,
        len: Math.random() * 80 + 40,
        speed: Math.random() * 4 + 2,
        trail: Math.random() * 2 + 1
      });
    }

    let lastFallingStar = Date.now();
    let animationFrameId;

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw Static Stars
      for (let star of stars) {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, 2 * Math.PI);
        ctx.fillStyle = 'white';
        ctx.globalAlpha = 0.7;
        ctx.fill();
        ctx.globalAlpha = 1;
        star.y -= star.speed;
        if (star.y < 0) {
          star.x = Math.random() * canvas.width;
          star.y = canvas.height;
        }
      }

      // Draw Falling Stars
      if (Date.now() - lastFallingStar > 2000) {
        spawnFallingStar();
        lastFallingStar = Date.now();
      }

      for (let i = fallingStars.length - 1; i >= 0; i--) {
        let fs = fallingStars[i];
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(fs.x, fs.y);
        ctx.lineTo(fs.x + fs.len, fs.y + fs.len / 2);
        ctx.strokeStyle = 'rgba(255,255,255,0.8)';
        ctx.lineWidth = fs.trail;
        ctx.shadowColor = '#fff';
        ctx.shadowBlur = 10;
        ctx.stroke();
        ctx.restore();
        fs.x += fs.speed;
        fs.y += fs.speed / 2;

        if (fs.x > canvas.width || fs.y > canvas.height) {
          fallingStars.splice(i, 1);
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      setCanvasSize();
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // --- Typing Effect Logic ---
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
    }, 80); // Slightly slower for better readability

    return () => clearInterval(typeInterval);
  }, [roleIndex]);

  useEffect(() => {
    if (!isTyping) {
      const delay = setTimeout(() => {
        setRoleIndex((prev) => (prev + 1) % animatedRoles.length);
      }, 1500);
      return () => clearTimeout(delay);
    }
  }, [isTyping]);

  return (
    <div className="portfolio-container">
      <canvas ref={canvasRef} className="star-canvas"></canvas>
      
      <div className="portfolio-content">
        <header className="portfolio-header">
          {/* Scrollable Nav for Mobile */}
          <nav className="glass-nav">
            <a href="#summary">Summary</a>
            <a href="#education">Education</a>
            <a href="#projects">Projects</a>
            <a href="#skills">Skills</a>
            <a href="#certifications">Certs</a>
            <a href="#achievements">Achievements</a>
          </nav>

          <div className="hero-section">
            <h1 className="portfolio-title-gradient">Sanket Mishra</h1>
            <div className="animated-roles">
              <span className="animated-role-text">{displayedText}</span>
              <span className="cursor">|</span>
            </div>
            
            <div className="header-details">
              <p className="highlight-blue">Data Science Undergraduate @ IIT Madras</p>
              <div className="contact-info">
                <span>+91-7236891123</span>
                <span className="separator">•</span>
                <a href="mailto:sanketmishra.real@gmail.com">sanketmishra.real@gmail.com</a>
              </div>
              <div className="social-links">
                <a href="https://www.linkedin.com/in/sankettmishra/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a href="https://github.com/SanketxMishra" target="_blank" rel="noopener noreferrer">GitHub</a>
              </div>
            </div>
            
            <a href="https://drive.google.com/file/d/1ckDaVqTMweDQ5XjQ3voLwKzohz0kDDD1/view?usp=sharing" className="resume-btn" download>Download Resume</a>
          </div>
        </header>

        <main className="main-content">
          <section id="summary" className="section-card glass-card fade-in">
            <h2>Summary</h2>
            <p>
              Data Science undergraduate at IIT Madras with strong expertise in Generative AI, Machine Learning, and Full-Stack deployment. Proven ability to architect RAG systems and predictive models that solve tangible business problems. Passionate about bridging the gap between statistical analysis and production-grade software engineering.
            </p>
          </section>

          <section id="education" className="section-card glass-card fade-in">
            <h2>Education</h2>
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-header">
                  <span className="timeline-title">Indian Institute of Technology Madras</span>
                  <span className="timeline-date">Sept. 2022 - Aug 2026</span>
                </div>
                <div className="timeline-body">
                  <span className="timeline-degree">BS in Data Science and Applications</span>
                  <span className="timeline-minor">Minor in Economics and Finance</span>
                </div>
              </div>
            </div>
          </section>

          <section id="projects" className="section-card fade-in">
            <h2>Projects</h2>
            <div className="projects-grid">
              
              <div className="project-card glass-card">
                <h3>AI-Powered Data Analysis</h3>
                <p className="project-desc">
                  Autonomous agent utilizing GPT-4.1 to generate/execute Python code. Delivers statistical insights in &lt;60s. Features self-healing error correction and FastAPI orchestration.
                </p>
                <div className="tech-stack">
                  <span>Python</span><span>FastAPI</span><span>GPT-4</span>
                </div>
                <a href="https://github.com/SanketxMishra/ai-data-analysis-automation-agent" className="project-link" target="_blank" rel="noopener noreferrer">View Code →</a>
              </div>

              <div className="project-card glass-card">
                <h3>Revenue Prediction (XGBoost)</h3>
                <p className="project-desc">
                  Regression pipeline on 116k+ records (R² 0.74). Outperformed KNN by 88% via XGBoost & histogram-based trees. Optimized feature engineering for production.
                </p>
                <div className="tech-stack">
                  <span>Scikit-Learn</span><span>Pandas</span><span>XGBoost</span>
                </div>
                <a href="https://github.com/SanketxMishra/Revenue-Prediction-Engine" className="project-link" target="_blank" rel="noopener noreferrer">View Code →</a>
              </div>

              <div className="project-card glass-card">
                <h3>GenAI Personal Stylist</h3>
                <p className="project-desc">
                  Stateful RAG agent using LangGraph & Groq. ChromaDB semantic search with 90% retrieval relevance. Includes session memory for complex context awareness.
                </p>
                <div className="tech-stack">
                  <span>React</span><span>LangChain</span><span>ChromaDB</span>
                </div>
                <a href="https://github.com/SanketxMishra/GenAI-Personal-Stylist" className="project-link" target="_blank" rel="noopener noreferrer">View Code →</a>
              </div>

            </div>
          </section>

          <section id="skills" className="section-card glass-card fade-in">
            <h2>Technical Skills</h2>
            <div className="skills-grid">
              <div className="skill-category">
                <strong>Languages</strong>
                <p>Python, SQL, JavaScript, C++</p>
              </div>
              <div className="skill-category">
                <strong>AI / ML</strong>
                <p>PyTorch, XGBoost, Scikit-Learn, Pandas</p>
              </div>
              <div className="skill-category">
                <strong>GenAI</strong>
                <p>LangChain, RAG, HuggingFace, OpenAI</p>
              </div>
              <div className="skill-category">
                <strong>DevOps/Web</strong>
                <p>React, FastAPI, Docker, GCP, Git</p>
              </div>
            </div>
          </section>

          <div className="two-column-layout">
            <section id="certifications" className="section-card glass-card fade-in">
              <h2>Certifications</h2>
              <ul className="simple-list">
                <li><strong>Dataiku:</strong> Core Designer Cert</li>
                <li><strong>Dataiku:</strong> Core Developer Cert</li>
              </ul>
            </section>

            <section id="achievements" className="section-card glass-card fade-in">
              <h2>Achievements</h2>
              <ul className="simple-list">
                <li>
                  <strong>Winner, Trade Quest (IITM):</strong> 1st Place in algorithmic trading simulation.
                </li>
              </ul>
            </section>
          </div>

        </main>
        
        <footer className="portfolio-footer">
          <p>© {new Date().getFullYear()} Sanket Mishra.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
