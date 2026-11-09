import React, { useState } from 'react';

const TECH_DATA = [
  { name: 'HTML5', category: 'frontend', role: 'Semantic Structure & SEO Architecture', badge: 'Standard' },
  { name: 'CSS3', category: 'frontend', role: 'Modern Layouts, Flexbox, Grid & Keyframes', badge: 'Style' },
  { name: 'JavaScript', category: 'frontend', role: 'ES6+ Asynchronous & Interactive Logic', badge: 'Language' },
  { name: 'React', category: 'frontend', role: 'Component-Driven Single Page Applications', badge: 'Framework' },
  { name: 'Python', category: 'backend', role: 'Core Logic, Scripting & Computational Engine', badge: 'Language' },
  { name: 'Flask', category: 'backend', role: 'Lightweight RESTful Microservices & APIs', badge: 'Framework' },
  { name: 'Node.js', category: 'backend', role: 'High-Concurrency Event-Driven Backend Runtime', badge: 'Runtime' },
  { name: 'MySQL', category: 'database', role: 'ACID-Compliant Relational Data Modeling', badge: 'Relational' },
  { name: 'MongoDB', category: 'database', role: 'Flexible JSON Document Storage for Rapid Scale', badge: 'NoSQL' },
  { name: 'SQLite', category: 'database', role: 'Embedded Zero-Config Local & Edge Database', badge: 'Embedded' },
  { name: 'Machine Learning', category: 'ai-ml', role: 'Predictive Modeling & Statistical Inference', badge: 'Domain' },
  { name: 'Scikit-learn', category: 'ai-ml', role: 'Supervised & Unsupervised Learning Pipelines', badge: 'Toolkit' },
  { name: 'Python (AI)', category: 'ai-ml', role: 'NumPy, Pandas & PyTorch Integration', badge: 'Core' },
  { name: 'GitHub', category: 'tools', role: 'Version Control, Code Review & CI/CD Actions', badge: 'DevOps' },
  { name: 'VS Code', category: 'tools', role: 'Primary Engineering & Debugging Environment', badge: 'Tool' },
  { name: 'Figma', category: 'tools', role: 'UI/UX Wireframing & Design System Tokens', badge: 'Design' },
  { name: 'Streamlit', category: 'tools', role: 'Rapid Data Science & Model Prototyping', badge: 'Prototyping' },
  { name: 'AWS', category: 'cloud', role: 'Scalable Cloud Compute, S3, ECS & CloudFront', badge: 'Cloud' },
  { name: 'Microsoft Azure', category: 'cloud', role: 'Enterprise Cloud Services & Hybrid Hosting', badge: 'Cloud' }
];

function TechIcon({ name }) {
  switch (name) {
    case 'HTML5':
      return (
        <svg viewBox="0 0 32 32" width="28" height="28">
          <path d="M5 3l2.5 24.5L16 30l8.5-2.5L27 3H5zm18.3 7H10.7l.4 4h11.8l-.8 8.8L16 24.5l-6-1.7-.3-3.8h3.4l.2 1.8 2.7.7 2.7-.7.4-4H9.9L9 6h14.5l-.2 4z" fill="#F9BE4A" />
        </svg>
      );
    case 'CSS3':
      return (
        <svg viewBox="0 0 32 32" width="28" height="28">
          <path d="M5 3l2.5 24.5L16 30l8.5-2.5L27 3H5zm18.1 7.2l-.3 3.8H11.5l.3 3.8h10.7l-.8 8.8L16 28.2l-5.7-1.6-.4-4.2h3.4l.2 2 2.5.7 2.5-.7.3-3.6H9.9L9 6h14.3l-.2 4.2z" fill="#FFD477" />
        </svg>
      );
    case 'JavaScript':
      return (
        <svg viewBox="0 0 32 32" width="28" height="28">
          <rect width="32" height="32" rx="4" fill="#F9BE4A" />
          <path d="M19.5 24.5c-1-.2-1.7-.8-2.2-1.6l2.3-1.4c.3.5.7.8 1.3.8.7 0 1.2-.3 1.2-1.1v-6.7h2.8v6.7c0 2.3-1.4 3.4-3.4 3.4-.7 0-1.4-.1-2-.1zm-8.8 0c-1.8 0-3.1-.9-3.7-2.3l2.4-1.4c.4.8.9 1.3 1.6 1.3.8 0 1.3-.4 1.3-1 0-.7-.5-1-1.6-1.5l-.8-.3c-1.8-.8-2.7-1.8-2.7-3.4 0-1.9 1.5-3.3 3.6-3.3 1.5 0 2.6.5 3.3 1.8l-2.2 1.4c-.3-.6-.6-.9-1.2-.9-.6 0-1 .4-1 .9 0 .6.4.8 1.4 1.3l.8.3c2.1.9 3 1.9 3 3.6-.1 2.2-1.7 3.5-3.8 3.5z" fill="#063B30" />
        </svg>
      );
    case 'React':
      return (
        <svg viewBox="0 0 32 32" width="28" height="28">
          <ellipse cx="16" cy="16" rx="13" ry="5" fill="none" stroke="#FFD477" strokeWidth="1.8" transform="rotate(30 16 16)" />
          <ellipse cx="16" cy="16" rx="13" ry="5" fill="none" stroke="#F9BE4A" strokeWidth="1.8" transform="rotate(90 16 16)" />
          <ellipse cx="16" cy="16" rx="13" ry="5" fill="none" stroke="#FFD477" strokeWidth="1.8" transform="rotate(150 16 16)" />
          <circle cx="16" cy="16" r="2.5" fill="#FFFFFF" />
        </svg>
      );
    case 'Python':
    case 'Python (AI)':
      return (
        <svg viewBox="0 0 32 32" width="28" height="28">
          <path d="M15.8 3c-4.2 0-3.9 1.8-3.9 1.8l.1 1.9h4v.6H9.2s-2.7.3-2.7 4c0 3.7 2.4 3.5 2.4 3.5h1.4v-2c0-2.3 2-2.2 2-2.2h3.9c1.9 0 1.8-1.8 1.8-1.8V5s.4-2-2.2-2zm-1.8 1.2a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8zm1.9 22.8c4.2 0 3.9-1.8 3.9-1.8l-.1-1.9h-4v-.6h6.8s2.7-.3 2.7-4c0-3.7-2.4-3.5-2.4-3.5h-1.4v2c0 2.3-2 2.2-2 2.2h-3.9c-1.9 0-1.8 1.8-1.8 1.8V25s-.4 2 2.2 2zm1.8-1.2a.9.9 0 1 1 0-1.8.9.9 0 0 1 0 1.8z" fill="#F9BE4A" />
        </svg>
      );
    case 'Flask':
      return (
        <svg viewBox="0 0 32 32" width="28" height="28">
          <path d="M14 4h4v3h-4zM15 7h2v6.5l4.8 10.5H10.2L15 13.5V7z" fill="none" stroke="#FFD477" strokeWidth="2" />
          <circle cx="16" cy="22" r="1.5" fill="#F9BE4A" />
        </svg>
      );
    case 'Node.js':
      return (
        <svg viewBox="0 0 32 32" width="28" height="28">
          <path d="M16 3l11 6.3v13.4L16 29 5 22.7V9.3L16 3z" fill="none" stroke="#F9BE4A" strokeWidth="2" />
          <path d="M16 11l6 3.5v7L16 25l-6-3.5v-7l6-3.5z" fill="#104638" stroke="#FFD477" strokeWidth="1.5" />
        </svg>
      );
    case 'MySQL':
      return (
        <svg viewBox="0 0 32 32" width="28" height="28">
          <ellipse cx="16" cy="8" rx="10" ry="4" fill="none" stroke="#F9BE4A" strokeWidth="2" />
          <path d="M6 8v16c0 2.2 4.5 4 10 4s10-1.8 10-4V8" fill="none" stroke="#F9BE4A" strokeWidth="2" />
          <path d="M6 16c0 2.2 4.5 4 10 4s10-1.8 10-4" fill="none" stroke="#FFD477" strokeWidth="1.8" />
        </svg>
      );
    case 'MongoDB':
      return (
        <svg viewBox="0 0 32 32" width="28" height="28">
          <path d="M16 3C16 3 9 10 9 18c0 5 3.5 9 7 11 3.5-2 7-6 7-11 0-8-7-15-7-15z" fill="none" stroke="#FFD477" strokeWidth="2" />
          <path d="M16 3v25" stroke="#F9BE4A" strokeWidth="1.8" />
        </svg>
      );
    case 'SQLite':
      return (
        <svg viewBox="0 0 32 32" width="28" height="28">
          <rect x="5" y="6" width="22" height="20" rx="3" fill="none" stroke="#F9BE4A" strokeWidth="2" />
          <path d="M10 12h12M10 16h12M10 20h8" stroke="#FFD477" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case 'Machine Learning':
      return (
        <svg viewBox="0 0 32 32" width="28" height="28">
          <circle cx="8" cy="8" r="3" fill="#F9BE4A" />
          <circle cx="24" cy="8" r="3" fill="#F9BE4A" />
          <circle cx="8" cy="24" r="3" fill="#F9BE4A" />
          <circle cx="24" cy="24" r="3" fill="#F9BE4A" />
          <circle cx="16" cy="16" r="4" fill="#FFD477" />
          <path d="M8 8l8 8 8-8M8 24l8-8 8 8M8 8v16M24 8v16" stroke="#FFD477" strokeWidth="1.4" />
        </svg>
      );
    case 'Scikit-learn':
      return (
        <svg viewBox="0 0 32 32" width="28" height="28">
          <circle cx="11" cy="16" r="6" fill="#F9BE4A" opacity="0.85" />
          <circle cx="21" cy="16" r="6" fill="#FFD477" opacity="0.85" />
          <path d="M16 11a6 6 0 0 1 0 10 6 6 0 0 1 0-10z" fill="#063B30" />
        </svg>
      );
    case 'GitHub':
      return (
        <svg viewBox="0 0 32 32" width="28" height="28">
          <path d="M16 3C8.8 3 3 8.8 3 16c0 5.7 3.7 10.6 8.9 12.3.7.1.9-.3.9-.6v-2.3c-3.6.8-4.4-1.7-4.4-1.7-.6-1.5-1.4-1.9-1.4-1.9-1.2-.8.1-.8.1-.8 1.3.1 2 1.3 2 1.3 1.1 2 3 1.4 3.7 1.1.1-.8.4-1.4.8-1.7-2.9-.3-5.9-1.4-5.9-6.4 0-1.4.5-2.6 1.3-3.5-.1-.3-.6-1.7.1-3.5 0 0 1.1-.4 3.6 1.3 1-.3 2.2-.4 3.3-.4 1.1 0 2.2.1 3.3.4 2.5-1.7 3.6-1.3 3.6-1.3.7 1.8.3 3.2.1 3.5.8.9 1.3 2.1 1.3 3.5 0 5-3 6.1-5.9 6.4.5.4.9 1.2.9 2.5v3.6c0 .4.3.8.9.6C25.3 26.6 29 21.7 29 16c0-7.2-5.8-13-13-13z" fill="#FFD477" />
        </svg>
      );
    case 'VS Code':
      return (
        <svg viewBox="0 0 32 32" width="28" height="28">
          <path d="M23 3l6 3v20l-6 3-13-10L4 23l-2-1V10l2-1 6 4 13-10zm-6 13l6-5v10l-6-5z" fill="none" stroke="#F9BE4A" strokeWidth="2" strokeLinejoin="round" />
        </svg>
      );
    case 'Figma':
      return (
        <svg viewBox="0 0 32 32" width="28" height="28">
          <circle cx="11" cy="7" r="4" fill="#FFD477" />
          <circle cx="19" cy="7" r="4" fill="#F9BE4A" />
          <circle cx="11" cy="15" r="4" fill="#F9BE4A" />
          <circle cx="19" cy="15" r="4" fill="#FFD477" />
          <circle cx="11" cy="23" r="4" fill="#FFD477" />
        </svg>
      );
    case 'Streamlit':
      return (
        <svg viewBox="0 0 32 32" width="28" height="28">
          <polygon points="16,5 26,23 6,23" fill="none" stroke="#FFD477" strokeWidth="2.5" />
          <polygon points="16,11 22,21 10,21" fill="#F9BE4A" />
        </svg>
      );
    case 'AWS':
      return (
        <svg viewBox="0 0 32 32" width="28" height="28">
          <path d="M8 17l4-9h2.5l4 9h-2.3l-.8-2h-4.3l-.8 2H8zm4-3.8h3l-1.5-3.8-1.5 3.8z" fill="#F9BE4A" />
          <path d="M6 21c7 4 13 4 20 0" fill="none" stroke="#FFD477" strokeWidth="2" strokeLinecap="round" />
          <polygon points="26,20 27,23 23,22" fill="#FFD477" />
        </svg>
      );
    case 'Microsoft Azure':
      return (
        <svg viewBox="0 0 32 32" width="28" height="28">
          <polygon points="6,25 15,6 20,16 11,25" fill="#F9BE4A" />
          <polygon points="14,25 22,12 26,25" fill="#FFD477" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 32 32" width="28" height="28">
          <circle cx="16" cy="16" r="10" fill="none" stroke="#F9BE4A" strokeWidth="2" />
          <text x="16" y="20" fontSize="12" textAnchor="middle" fill="#FFD477">✦</text>
        </svg>
      );
  }
}

export default function TechStack() {
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? TECH_DATA : TECH_DATA.filter((t) => t.category === filter);

  return (
    <section className="tech-section" id="tech-stack">
      <div className="container">
        <div className="section-header">
          <div className="section-label">
            <span className="label-bullet"></span>
            <span>Engineering Arsenal</span>
          </div>
          <h2 className="section-title">Our Technology Stack.</h2>
          <p className="section-description">
            Powering intelligent, scalable digital solutions with industry-standard frameworks, battle-tested runtimes, and premier developer tooling.
          </p>
        </div>

        <div className="tech-tabs-row" role="tablist" aria-label="Technology Stack Categories">
          {['all', 'frontend', 'backend', 'database', 'ai-ml', 'cloud', 'tools'].map((cat) => (
            <button
              key={cat}
              type="button"
              className={`tech-tab-btn ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
              role="tab"
              aria-selected={filter === cat}
            >
              {cat === 'all'
                ? 'All Technologies'
                : cat === 'ai-ml'
                ? 'AI & Machine Learning'
                : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        <div className="tech-grid" id="tech-stack-grid">
          {filtered.map((item, idx) => (
            <div key={idx} className="tech-card">
              <div className="tech-card-header">
                <div className="tech-icon-box">
                  <TechIcon name={item.name} />
                </div>
                <span className="tech-badge-tag">{item.badge}</span>
              </div>
              <h4 className="tech-name">{item.name}</h4>
              <p className="tech-role">{item.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
