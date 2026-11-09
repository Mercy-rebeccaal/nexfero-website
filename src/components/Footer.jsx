import React, { useEffect, useState } from 'react';

export default function Footer({ onOpenAdmin }) {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setShowScrollTop(scrollY > 400);
      if (docHeight > 0) {
        setScrollPercent(Math.min(100, Math.max(0, (scrollY / docHeight) * 100)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const circumference = 2 * Math.PI * 18;
  const strokeDashoffset = circumference - (scrollPercent / 100) * circumference;

  return (
    <>
      <footer className="footer-wrapper">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col brand-col">
              <a href="#home" aria-label="NexFero Innovations Home">
                <img src="/public/logo.svg" alt="NexFero Innovations" className="footer-brand-logo" width="180" height="48" />
              </a>
              <div className="footer-tagline">"Beyond Ideas. Beyond Limits."</div>
              <p className="footer-about-text">
                NexFero Innovations is a technology startup focused on building intelligent digital solutions, modern web applications, AI-powered systems and innovative technology experiences.
              </p>
              <p style={{ fontSize: '0.85rem', color: 'var(--light-gold)' }}>
                📍 Chennai, Tamil Nadu, India
              </p>
            </div>

            <div className="footer-col">
              <h4>Navigation</h4>
              <ul className="footer-links-list">
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About Us</a></li>
                <li><a href="#services">Our Services</a></li>
                <li><a href="#projects">Engineering Projects</a></li>
                <li><a href="#why-us">Why Choose NexFero</a></li>
                <li><a href="#process">Development Process</a></li>
                <li><a href="#contact">Contact Us</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Core Offerings</h4>
              <ul className="footer-links-list">
                <li><a href="#services">AI & Machine Learning</a></li>
                <li><a href="#services">Web Application Engineering</a></li>
                <li><a href="#services">Mobile App Development</a></li>
                <li><a href="#services">UI/UX & Design Systems</a></li>
                <li><a href="#services">Cloud & DevOps Solutions</a></li>
                <li><a href="#services">Digital Marketing & SEO</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Direct Contact</h4>
              <ul className="footer-links-list">
                <li><a href="mailto:nexferoinnovations@gmail.com">nexferoinnovations@gmail.com</a></li>
                <li><a href="https://www.linkedin.com/company/nexfero-innovation/" target="_blank" rel="noopener noreferrer">LinkedIn Official</a></li>
                <li><a href="https://www.instagram.com/nexfero_innovation/" target="_blank" rel="noopener noreferrer">Instagram Official</a></li>
                <li><a href="https://x.com/NexFero_14" target="_blank" rel="noopener noreferrer">X (@NexFero_14)</a></li>
                <li style={{ marginTop: '1rem' }}>
                  <button
                    type="button"
                    className="btn-outline-gold"
                    style={{ padding: '0.4rem 0.9rem', fontSize: '0.78rem' }}
                    onClick={onOpenAdmin}
                    title="View submitted inquiries (Founder access)"
                  >
                    <span>Founder Portal</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom-strip">
            <div className="footer-copy">
              © 2026 NexFero Innovations. All Rights Reserved.
            </div>

            <div className="footer-legal-links">
              <a href="/privacy.html">Privacy Policy</a>
              <span style={{ color: 'rgba(249, 190, 74, 0.3)' }}>•</span>
              <a href="/terms.html">Terms & Conditions</a>
              <span style={{ color: 'rgba(249, 190, 74, 0.3)' }}>•</span>
              <a href="/404.html">System Health</a>
            </div>
          </div>
        </div>
      </footer>

      <button
        type="button"
        id="back-to-top"
        className={`back-to-top-btn ${showScrollTop ? 'visible' : ''}`}
        aria-label="Scroll back to top"
        onClick={scrollToTop}
      >
        <svg className="btt-svg" viewBox="0 0 40 40">
          <circle className="btt-circle-bg" cx="20" cy="20" r="18" />
          <circle
            className="btt-circle-progress"
            cx="20"
            cy="20"
            r="18"
            style={{ strokeDashoffset }}
          />
        </svg>
        <span className="btt-arrow">↑</span>
      </button>
    </>
  );
}

