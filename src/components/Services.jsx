import React, { useState, useEffect, useRef } from 'react';
import { SERVICES_DATA } from '../data/servicesData';

/**
 * Attractive illuminated SVG icons tailored to each of the 6 official services
 */
function ServiceIcon({ serviceKey }) {
  switch (serviceKey) {
    case 'website-design-dev':
      return (
        <svg viewBox="0 0 64 64" width="48" height="48" fill="none">
          {/* Outer Monitor Frame */}
          <rect x="6" y="8" width="52" height="36" rx="6" stroke="#00DF81" strokeWidth="2.2" fill="rgba(3, 98, 76, 0.18)" />
          {/* Browser Header Bar */}
          <line x1="6" y1="18" x2="58" y2="18" stroke="#2CC295" strokeWidth="1.5" strokeOpacity="0.5" />
          <circle cx="13" cy="13" r="2" fill="#F9BE4A" />
          <circle cx="19" cy="13" r="2" fill="#00DF81" />
          <circle cx="25" cy="13" r="2" fill="#2CC295" />
          {/* Webpage Layout Grid */}
          <rect x="12" y="24" width="16" height="14" rx="2" fill="rgba(249, 190, 74, 0.15)" stroke="#F9BE4A" strokeWidth="1.2" />
          <line x1="33" y1="25" x2="52" y2="25" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
          <line x1="33" y1="31" x2="48" y2="31" stroke="#A8CDC4" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="33" y1="36" x2="45" y2="36" stroke="#A8CDC4" strokeWidth="1.5" strokeLinecap="round" />
          {/* Monitor Stand */}
          <path d="M26 44 L24 54 M38 44 L40 54 M20 54 L44 54" stroke="#00DF81" strokeWidth="2.2" strokeLinecap="round" />
          {/* Glowing Cursor Accent */}
          <polygon points="46,38 46,47 49,44 53,48 55,46 51,42 55,42" fill="#F9BE4A" />
        </svg>
      );

    case 'full-stack-dev':
      return (
        <svg viewBox="0 0 64 64" width="48" height="48" fill="none">
          {/* Layer 1: Client UI */}
          <path d="M12 18 L32 8 L52 18 L32 28 Z" fill="rgba(0, 223, 129, 0.22)" stroke="#00DF81" strokeWidth="2.2" />
          <line x1="32" y1="14" x2="32" y2="22" stroke="#FFD477" strokeWidth="2" strokeLinecap="round" />
          {/* Layer 2: API & Logic Bridge */}
          <path d="M12 30 L32 40 L52 30" stroke="#F9BE4A" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M12 33 L32 43 L52 33" stroke="rgba(249, 190, 74, 0.4)" strokeWidth="1.5" strokeLinecap="round" />
          {/* Layer 3: Database & Engine */}
          <path d="M12 42 L32 52 L52 42" stroke="#2CC295" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M12 45 L32 55 L52 45" stroke="#00DF81" strokeWidth="2.2" strokeLinecap="round" />
          {/* Connecting Vertical Sync Data Beams */}
          <line x1="20" y1="22" x2="20" y2="46" stroke="#A8CDC4" strokeWidth="1.4" strokeDasharray="2 3" />
          <line x1="44" y1="22" x2="44" y2="46" stroke="#A8CDC4" strokeWidth="1.4" strokeDasharray="2 3" />
          <circle cx="32" cy="18" r="3" fill="#F9BE4A" />
          <circle cx="32" cy="35" r="2.5" fill="#00DF81" />
          <circle cx="32" cy="48" r="2.5" fill="#2CC295" />
        </svg>
      );

    case 'software-app-dev':
      return (
        <svg viewBox="0 0 64 64" width="48" height="48" fill="none">
          {/* App Window Frame */}
          <rect x="8" y="10" width="48" height="44" rx="6" stroke="#2CC295" strokeWidth="2.2" fill="rgba(3, 34, 33, 0.3)" />
          <line x1="8" y1="22" x2="56" y2="22" stroke="#2CC295" strokeWidth="1.5" strokeOpacity="0.6" />
          <circle cx="16" cy="16" r="2" fill="#00DF81" />
          <circle cx="22" cy="16" r="2" fill="#F9BE4A" />
          {/* Code Execution / Gears Mechanism */}
          <path d="M22 32 L16 38 L22 44" stroke="#F9BE4A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M42 32 L48 38 L42 44" stroke="#F9BE4A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="35" y1="30" x2="29" y2="46" stroke="#00DF81" strokeWidth="2" strokeLinecap="round" />
          {/* Software Verified Chip */}
          <circle cx="32" cy="38" r="5" stroke="#FFD477" strokeWidth="1.5" fill="rgba(249, 190, 74, 0.2)" />
        </svg>
      );

    case 'ai-ml-solutions':
      return (
        <svg viewBox="0 0 64 64" width="48" height="48" fill="none">
          {/* Neural Cortex / Brain Core */}
          <circle cx="32" cy="32" r="14" stroke="#00DF81" strokeWidth="1.8" strokeDasharray="3 3" fill="rgba(0, 223, 129, 0.12)" />
          {/* Synaptic Network Nodes */}
          <circle cx="32" cy="32" r="5" fill="#F9BE4A" />
          <circle cx="18" cy="20" r="3.5" fill="#00DF81" />
          <circle cx="46" cy="20" r="3.5" fill="#00DF81" />
          <circle cx="14" cy="38" r="3.5" fill="#2CC295" />
          <circle cx="50" cy="38" r="3.5" fill="#2CC295" />
          <circle cx="24" cy="50" r="3.5" fill="#FFD477" />
          <circle cx="40" cy="50" r="3.5" fill="#FFD477" />
          {/* Interconnected Synaptic Beams */}
          <line x1="18" y1="20" x2="32" y2="32" stroke="#A8CDC4" strokeWidth="1.4" />
          <line x1="46" y1="20" x2="32" y2="32" stroke="#A8CDC4" strokeWidth="1.4" />
          <line x1="14" y1="38" x2="32" y2="32" stroke="#A8CDC4" strokeWidth="1.4" />
          <line x1="50" y1="38" x2="32" y2="32" stroke="#A8CDC4" strokeWidth="1.4" />
          <line x1="24" y1="50" x2="32" y2="32" stroke="#A8CDC4" strokeWidth="1.4" />
          <line x1="40" y1="50" x2="32" y2="32" stroke="#A8CDC4" strokeWidth="1.4" />
          <line x1="18" y1="20" x2="46" y2="20" stroke="rgba(0, 223, 129, 0.4)" strokeWidth="1" strokeDasharray="2 2" />
        </svg>
      );

    case 'database-management':
      return (
        <svg viewBox="0 0 64 64" width="48" height="48" fill="none">
          {/* Top Cylinder Tier */}
          <ellipse cx="32" cy="16" rx="20" ry="7" fill="rgba(3, 98, 76, 0.35)" stroke="#00DF81" strokeWidth="2.2" />
          {/* Middle Cylinder Tier */}
          <path d="M12 16 V28 C12 32 20 35 32 35 C44 35 52 32 52 28 V16" stroke="#2CC295" strokeWidth="2.2" />
          {/* Bottom Cylinder Tier */}
          <path d="M12 28 V40 C12 44 20 47 32 47 C44 47 52 44 52 40 V28" stroke="#00DF81" strokeWidth="2.2" />
          <path d="M12 40 V50 C12 54 20 57 32 57 C44 57 52 54 52 50 V40" stroke="#F9BE4A" strokeWidth="2.2" />
          {/* Transaction Rings & Sub-millisecond Pulse */}
          <line x1="32" y1="16" x2="32" y2="57" stroke="#FFD477" strokeWidth="1.8" strokeDasharray="2 3" />
          <circle cx="32" cy="28" r="2.5" fill="#F9BE4A" />
          <circle cx="32" cy="40" r="2.5" fill="#00DF81" />
          <circle cx="32" cy="50" r="2.5" fill="#FFD477" />
        </svg>
      );

    case 'automation-smart-tech':
      return (
        <svg viewBox="0 0 64 64" width="48" height="48" fill="none">
          {/* Central Smart Chip */}
          <rect x="22" y="22" width="20" height="20" rx="4" fill="rgba(3, 98, 76, 0.4)" stroke="#F9BE4A" strokeWidth="2.2" />
          <circle cx="32" cy="32" r="4" fill="#00DF81" />
          {/* Chip Pins */}
          <line x1="27" y1="16" x2="27" y2="22" stroke="#2CC295" strokeWidth="2" />
          <line x1="37" y1="16" x2="37" y2="22" stroke="#2CC295" strokeWidth="2" />
          <line x1="27" y1="42" x2="27" y2="48" stroke="#2CC295" strokeWidth="2" />
          <line x1="37" y1="42" x2="37" y2="48" stroke="#2CC295" strokeWidth="2" />
          <line x1="16" y1="27" x2="22" y2="27" stroke="#2CC295" strokeWidth="2" />
          <line x1="16" y1="37" x2="22" y2="37" stroke="#2CC295" strokeWidth="2" />
          <line x1="42" y1="27" x2="48" y2="27" stroke="#2CC295" strokeWidth="2" />
          <line x1="42" y1="37" x2="48" y2="37" stroke="#2CC295" strokeWidth="2" />
          {/* Wireless Sensor Radiation Waves */}
          <path d="M12 18 C18 10 46 10 52 18" stroke="#00DF81" strokeWidth="1.8" strokeLinecap="round" strokeDasharray="3 3" />
          <path d="M8 12 C18 2 46 2 56 12" stroke="#F9BE4A" strokeWidth="1.6" strokeLinecap="round" strokeDasharray="3 3" />
          <circle cx="12" cy="18" r="2.5" fill="#00DF81" />
          <circle cx="52" cy="18" r="2.5" fill="#00DF81" />
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 64 64" width="48" height="48" fill="none">
          <circle cx="32" cy="32" r="20" stroke="#00DF81" strokeWidth="2" />
        </svg>
      );
  }
}

export default function Services({ onOpenServiceModal }) {
  const [scrolledIntoView, setScrolledIntoView] = useState({});
  const [expandedCard, setExpandedCard] = useState(null);
  const sectionRef = useRef(null);

  const servicesList = Object.values(SERVICES_DATA).sort((a, b) => a.order - b.order);

  // Scroll detection to gracefully reveal details as the user scrolls
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const key = entry.target.getAttribute('data-service-key');
            if (key) {
              setScrolledIntoView((prev) => ({ ...prev, [key]: true }));
            }
          }
        });
      },
      { threshold: 0.25 }
    );

    const cards = document.querySelectorAll('.service-card-item');
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const toggleDetails = (key) => {
    setExpandedCard(expandedCard === key ? null : key);
  };

  return (
    <section className="services-section" id="services" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <div className="section-label">
            <span className="label-bullet"></span>
            <span>Technology Capabilities</span>
          </div>
          <h2 className="section-title">
            Engineered for <span className="gold-gradient-text">Performance & Scale.</span>
          </h2>
          <p className="section-description">
            Explore our specialized digital capabilities. From high-converting web applications to enterprise database models and predictive intelligence, our engineering team delivers precision solutions.
          </p>
        </div>

        {/* 6 Services Grid */}
        <div className="services-grid" id="services-grid">
          {servicesList.map((service) => {
            const isRevealed = scrolledIntoView[service.key] || expandedCard === service.key;

            return (
              <article
                key={service.key}
                data-service-key={service.key}
                className={`service-card service-card-item interactive-target ${isRevealed ? 'details-visible' : ''}`}
                style={{
                  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative'
                }}
              >
                {/* Header Strip */}
                <div>
                  <div className="service-card-header" style={{ marginBottom: '1.2rem' }}>
                    <span className="service-badge-pill">{service.badge}</span>
                    <span className="service-order-number">0{service.order}</span>
                  </div>

                  {/* Attractive Modern Illuminated Icon */}
                  <div
                    className="service-icon-box"
                    style={{
                      width: '76px',
                      height: '76px',
                      borderRadius: '16px',
                      backgroundColor: 'rgba(3, 34, 33, 0.85)',
                      border: '1.5px solid rgba(44, 194, 149, 0.35)',
                      boxShadow: '0 8px 24px rgba(0, 15, 15, 0.6), 0 0 20px rgba(0, 223, 129, 0.12)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '1.4rem',
                      transition: 'transform 0.3s ease, border-color 0.3s ease'
                    }}
                  >
                    <ServiceIcon serviceKey={service.key} />
                  </div>

                  {/* Short Details */}
                  <h3 className="service-title" style={{ fontSize: '1.3rem', marginBottom: '0.4rem', color: '#F1F7F6' }}>
                    {service.title}
                  </h3>
                  <p className="service-tagline" style={{ color: '#F9BE4A', fontSize: '0.86rem', fontWeight: 600, marginBottom: '0.8rem', minHeight: '38px' }}>
                    {service.tagline}
                  </p>
                  <p className="service-desc" style={{ fontSize: '0.92rem', color: '#A8CDC4', lineHeight: 1.6, marginBottom: '1.2rem' }}>
                    {service.shortDesc || service.description}
                  </p>

                  {/* Scroll-Revealed Details (Visible on scroll into view or on toggle) */}
                  <div
                    className="service-scroll-details"
                    style={{
                      opacity: isRevealed ? 1 : 0.4,
                      transform: isRevealed ? 'translateY(0)' : 'translateY(8px)',
                      transition: 'opacity 0.5s ease, transform 0.5s ease',
                      marginTop: '0.8rem',
                      borderTop: '1px solid rgba(44, 194, 149, 0.2)',
                      paddingTop: '1rem'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                      <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#00DF81', fontWeight: 700 }}>
                        Core Capabilities:
                      </span>
                      <button
                        type="button"
                        onClick={() => toggleDetails(service.key)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#FFD477',
                          fontSize: '0.75rem',
                          cursor: 'pointer',
                          padding: 0
                        }}
                      >
                        {expandedCard === service.key ? 'Collapse ▲' : 'Show All ▼'}
                      </button>
                    </div>

                    <ul className="service-features-list" style={{ marginBottom: '1rem' }}>
                      {service.capabilities.slice(0, expandedCard === service.key ? 4 : 3).map((cap, i) => (
                        <li key={i} className="service-feature-item" style={{ fontSize: '0.84rem' }}>
                          <span className="feature-bullet" style={{ color: '#F9BE4A' }}>✦</span>
                          <span>{cap}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Technologies Pills */}
                    <div className="service-tech-tags" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1.2rem' }}>
                      {service.technologies.slice(0, 4).map((tech, i) => (
                        <span key={i} className="tech-pill" style={{ fontSize: '0.72rem', padding: '2px 8px' }}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Action Button */}
                <div className="service-card-footer" style={{ marginTop: '1rem' }}>
                  <button
                    type="button"
                    className="btn-service-learn"
                    onClick={() => onOpenServiceModal && onOpenServiceModal(service.key)}
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    <span>Explore Full Architecture</span>
                    <span className="arrow-icon">→</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
