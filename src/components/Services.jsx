import React from 'react';

const SERVICES = [
  {
    key: 'ai-ml',
    title: 'Artificial Intelligence & Machine Learning',
    desc: 'Transforming raw data streams into self-optimizing business intelligence and automated cognitive workflows.',
    features: [
      'AI-powered applications',
      'Machine learning solutions',
      'Intelligent automation',
      'Predictive analytics'
    ],
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a4 4 0 0 1 4 4c0 1.95-1.4 3.58-3.25 3.93L15 15h3a3 3 0 0 1 3 3v4H3v-4a3 3 0 0 1 3-3h3l2.25-5.07A3.99 3.99 0 0 1 8 6a4 4 0 0 1 4-4z"/>
        <circle cx="12" cy="6" r="1"/>
      </svg>
    )
  },
  {
    key: 'web-dev',
    title: 'Web Development',
    desc: 'Ultra-fast, responsive web applications engineered with modern JavaScript, scalable APIs, and clean architecture.',
    features: [
      'Business websites',
      'Custom web applications',
      'Full-stack development',
      'Responsive interfaces'
    ],
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
        <line x1="8" y1="21" x2="16" y2="21"/>
        <line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    )
  },
  {
    key: 'mobile-dev',
    title: 'Mobile Application Development',
    desc: 'High-performance native and hybrid mobile apps delivering fluid 60FPS experiences into users\' hands.',
    features: [
      'Android applications',
      'iOS application development',
      'Cross-platform solutions',
      'Offline-first sync architectures'
    ],
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
        <line x1="12" y1="18" x2="12.01" y2="18"/>
      </svg>
    )
  },
  {
    key: 'ui-ux',
    title: 'UI/UX Design',
    desc: 'Bespoke design systems, interactive prototypes, and frictionless user journeys grounded in human ergonomics.',
    features: [
      'User interface design',
      'User experience research',
      'Interactive prototyping',
      'Figma-based design tokens'
    ],
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19l7-7 3 3-7 7-3-3z"/>
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/>
        <path d="M2 2l7.586 7.586"/>
        <circle cx="11" cy="11" r="2"/>
      </svg>
    )
  },
  {
    key: 'cloud',
    title: 'Cloud Solutions',
    desc: 'Zero-downtime deployment pipelines, resilient multi-region infrastructure, and scalable container orchestration.',
    features: [
      'Cloud deployment',
      'Cloud infrastructure',
      'Application hosting',
      'Scalable architecture'
    ],
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
      </svg>
    )
  },
  {
    key: 'digital-marketing',
    title: 'Digital Marketing',
    desc: 'Technical search optimization, authority branding, and growth roadmaps that connect innovations to target audiences.',
    features: [
      'Digital branding',
      'Social media presence',
      'Search engine optimization',
      'Online growth strategies'
    ],
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
      </svg>
    )
  }
];

export default function Services({ onOpenServiceModal }) {
  return (
    <section className="services-section" id="services">
      <div className="container">
        <div className="section-header">
          <div className="section-label">
            <span className="label-bullet"></span>
            <span>Comprehensive Solutions</span>
          </div>
          <h2 className="section-title">Technology Solutions for a Smarter Tomorrow.</h2>
          <p className="section-description">
            Tailored engineering capabilities built to accelerate your digital transformation, from intelligent algorithmic engines to production-ready enterprise platforms.
          </p>
        </div>

        <div className="services-grid">
          {SERVICES.map((srv) => (
            <article key={srv.key} className="service-card">
              <div className="service-icon-box">{srv.icon}</div>
              <h3 className="service-title">{srv.title}</h3>
              <p className="service-desc">{srv.desc}</p>
              <ul className="service-features-list">
                {srv.features.map((feat, i) => (
                  <li key={i}>
                    <span className="gold-check">✓</span> {feat}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className="btn-service-learn"
                onClick={() => onOpenServiceModal && onOpenServiceModal(srv.key)}
                aria-label={`Learn more about ${srv.title}`}
              >
                <span>Learn More</span>
                <span>→</span>
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

