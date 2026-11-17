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
                <img
                  src="/logo.png"
                  onError={(e) => { e.currentTarget.src = '/public/logo.png'; }}
                  alt="NexFero Innovations"
                  className="footer-brand-logo"
                  style={{ height: '46px', width: 'auto', objectFit: 'contain' }}
                />
              </a>
              <div className="footer-tagline">"Beyond Ideas. Beyond Limits."</div>
              <p className="footer-about-text">
                NexFero Innovations is a technology startup focused on building intelligent digital solutions, modern web applications, AI-powered systems and innovative technology experiences.
              </p>
              <p style={{ fontSize: '0.85rem', color: '#F9BE4A', margin: '0.4rem 0 0 0' }}>
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
              <h4>Core Services</h4>
              <ul className="footer-links-list">
                <li><a href="#services">Website Design & UI/UX</a></li>
                <li><a href="#services">Full Stack Web Development</a></li>
                <li><a href="#services">Software & App Development</a></li>
                <li><a href="#services">AI & Machine Learning</a></li>
                <li><a href="#services">Database Architecture</a></li>
                <li><a href="#services">Automation & Smart Tech</a></li>
                <li><a href="#services">Custom Digital Projects</a></li>
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
                    style={{ padding: '0.45rem 1rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                    onClick={onOpenAdmin}
                    title="Executive Management Portal (Ctrl+Shift+I)"
                  >
                    <span>🔒</span>
                    <span>Executive Portal</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom-strip">
            <div className="footer-copy">
              © 2026 NexFero Innovations. All Rights Reserved. Transforming Ideas into Digital Reality.
            </div>

            <div className="footer-legal-links">
              <a href="/privacy">Privacy Policy</a>
              <span style={{ color: 'rgba(249, 190, 74, 0.3)' }}>•</span>
              <a href="/terms">Terms of Service</a>
              <span style={{ color: 'rgba(249, 190, 74, 0.3)' }}>•</span>
              <a href="/admin/login" onClick={(e) => { e.preventDefault(); if (onOpenAdmin) onOpenAdmin(); }}>
                Admin Gateway
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Scroll-to-Top Button with circular progress */}
      {showScrollTop && (
        <button
          type="button"
          className="scroll-top-btn visible"
          id="scroll-top-btn"
          onClick={scrollToTop}
          aria-label="Scroll to top of page"
        >
          <svg className="scroll-progress-ring" viewBox="0 0 40 40">
            <circle
              className="scroll-progress-bg"
              cx="20"
              cy="20"
              r="18"
            />
            <circle
              className="scroll-progress-fill"
              cx="20"
              cy="20"
              r="18"
              style={{
                strokeDasharray: circumference,
                strokeDashoffset: strokeDashoffset
              }}
            />
          </svg>
          <svg className="scroll-arrow-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
        </button>
      )}
    </>
  );
}
