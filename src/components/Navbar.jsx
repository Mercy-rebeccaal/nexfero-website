import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    setIsMobileOpen(false);
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      const headerOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className={`navbar-wrapper ${isScrolled ? 'scrolled' : ''}`} id="main-navbar">
      <div className="container navbar-container">
        <a href="#home" onClick={(e) => scrollToSection(e, 'home')} className="nav-brand" aria-label="NexFero Innovations Home">
          <img src="/public/logo.svg" alt="NexFero Innovations Logo" className="nav-brand-logo" width="180" height="48" />
        </a>

        <nav aria-label="Main Navigation">
          <ul className={`navbar-menu ${isMobileOpen ? 'menu-open' : ''}`} id="navbar-menu">
            <li>
              <a href="#home" onClick={(e) => scrollToSection(e, 'home')} className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}>
                Home
              </a>
            </li>
            <li>
              <a href="#about" onClick={(e) => scrollToSection(e, 'about')} className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}>
                About Us
              </a>
            </li>
            <li>
              <a href="#services" onClick={(e) => scrollToSection(e, 'services')} className={`nav-link ${activeSection === 'services' ? 'active' : ''}`}>
                Services
              </a>
            </li>
            <li>
              <a href="#projects" onClick={(e) => scrollToSection(e, 'projects')} className={`nav-link ${activeSection === 'projects' ? 'active' : ''}`}>
                Our Projects
              </a>
            </li>
            <li>
              <a href="#why-us" onClick={(e) => scrollToSection(e, 'why-us')} className={`nav-link ${activeSection === 'why-us' ? 'active' : ''}`}>
                Why Choose Us
              </a>
            </li>
            <li>
              <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}>
                Contact Us
              </a>
            </li>
            <li className="mobile-cta-item">
              <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="btn-gold">
                <span>Get Started</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </a>
            </li>
          </ul>
        </nav>

        <div className="nav-action-wrapper">
          <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="btn-gold nav-desktop-btn">
            <span>Get Started</span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </a>

          <button
            type="button"
            className={`mobile-toggle ${isMobileOpen ? 'is-active' : ''}`}
            id="mobile-menu-toggle"
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileOpen}
            onClick={() => setIsMobileOpen(!isMobileOpen)}
          >
            <span className="mobile-toggle-bar"></span>
            <span className="mobile-toggle-bar"></span>
            <span className="mobile-toggle-bar"></span>
          </button>
        </div>
      </div>
    </header>
  );
}

