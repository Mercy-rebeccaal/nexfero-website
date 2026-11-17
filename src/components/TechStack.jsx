import React, { useState } from 'react';

const TECH_DATA = [
  { name: 'Java', category: 'backend', role: 'Enterprise Systems, Concurrency & Microservices', badge: 'Core' },
  { name: 'Spring Boot', category: 'backend', role: 'Robust REST APIs & Database Transactions', badge: 'Framework' },
  { name: 'Python', category: 'backend', role: 'Scientific Computing, Data Pipelines & Scripting', badge: 'Core' },
  { name: 'JavaScript', category: 'frontend', role: 'Asynchronous Full-Stack Web Runtime & ES6+', badge: 'Core' },
  { name: 'React', category: 'frontend', role: 'Component Architecture & Interactive UI/UX', badge: 'Frontend' },
  { name: 'HTML5', category: 'frontend', role: 'Semantic Layouts, Accessibility & SEO Foundation', badge: 'Standard' },
  { name: 'CSS3', category: 'frontend', role: 'Modern Responsive Design, Flexbox, Grid & Glassmorphism', badge: 'Style' },
  { name: 'AI & Machine Learning', category: 'ai-ml', role: 'Predictive Modeling, NLP & Generative AI', badge: 'Intelligence' },
  { name: 'Streamlit', category: 'ai-ml', role: 'Rapid Data Science & Interactive Model Interfaces', badge: 'Prototyping' },
  { name: 'Unity', category: 'emerging', role: '3D Simulation, Spatial Computing & VR/XR Labs', badge: 'Engine' },
  { name: 'C#', category: 'emerging', role: 'Unity Scripting, Desktop Solutions & Game Logic', badge: 'Language' },
  { name: 'MySQL', category: 'database', role: 'ACID Relational Modeling & High-Throughput Queries', badge: 'Relational' },
  { name: 'MongoDB', category: 'database', role: 'Scalable NoSQL Document Store for Flexible Data', badge: 'NoSQL' }
];

function TechIcon({ name }) {
  switch (name) {
    case 'Java':
      return (
        <svg viewBox="0 0 32 32" width="28" height="28">
          <path d="M11 26c6 0 10-1.5 10-1.5s-2 1.5-8 1.5c-4 0-5-.5-5-.5s.5.5 3 .5zm-2-4s7 .5 13-1c0 0-4 2-11 2-5 0-6-.5-6-.5s1.5-.2 4-.5zm3-8s-3 3 2 4c5 1 8-2 6-5-2-3-8 1-8 1zm3-7s2 2 1 4c0 0 2-2 1-3.5 0 0-1-1-2-.5z" fill="#F9BE4A" />
        </svg>
      );
    case 'Spring Boot':
      return (
        <svg viewBox="0 0 32 32" width="28" height="28">
          <path d="M16 2l12 7v14l-12 7L4 23V9l12-7zm-1 8c-3 1-5 4-4 7 1 3 4 5 7 4 3-1 5-4 4-7-1-3-4-5-7-4z" fill="none" stroke="#00DF81" strokeWidth="2" />
          <circle cx="16" cy="16" r="3" fill="#00DF81" />
        </svg>
      );
    case 'Python':
      return (
        <svg viewBox="0 0 32 32" width="28" height="28">
          <path d="M15.8 3c-4.2 0-3.9 1.8-3.9 1.8l.1 1.9h4v.6H9.2s-2.7.3-2.7 4c0 3.7 2.4 3.5 2.4 3.5h1.4v-2c0-2.3 2-2.2 2-2.2h3.9c1.9 0 1.8-1.8 1.8-1.8V5s.4-2-2.2-2zm-1.8 1.2a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8zm1.9 22.8c4.2 0 3.9-1.8 3.9-1.8l-.1-1.9h-4v-.6h6.8s2.7-.3 2.7-4c0-3.7-2.4-3.5-2.4-3.5h-1.4v2c0 2.3-2 2.2-2 2.2h-3.9c-1.9 0-1.8 1.8-1.8 1.8V25s-.4 2 2.2 2zm1.8-1.2a.9.9 0 1 1 0-1.8.9.9 0 0 1 0 1.8z" fill="#F9BE4A" />
        </svg>
      );
    case 'JavaScript':
      return (
        <svg viewBox="0 0 32 32" width="28" height="28">
          <rect width="32" height="32" rx="4" fill="#F9BE4A" />
          <path d="M19.5 24.5c-1-.2-1.7-.8-2.2-1.6l2.3-1.4c.3.5.7.8 1.3.8.7 0 1.2-.3 1.2-1.1v-6.7h2.8v6.7c0 2.3-1.4 3.4-3.4 3.4-.7 0-1.4-.1-2-.1zm-8.8 0c-1.8 0-3.1-.9-3.7-2.3l2.4-1.4c.4.8.9 1.3 1.6 1.3.8 0 1.3-.4 1.3-1 0-.7-.5-1-1.6-1.5l-.8-.3c-1.8-.8-2.7-1.8-2.7-3.4 0-1.9 1.5-3.3 3.6-3.3 1.5 0 2.6.5 3.3 1.8l-2.2 1.4c-.3-.6-.6-.9-1.2-.9-.6 0-1 .4-1 .9 0 .6.4.8 1.4 1.3l.8.3c2.1.9 3 1.9 3 3.6-.1 2.2-1.7 3.5-3.8 3.5z" fill="#000F0F" />
        </svg>
      );
    case 'React':
      return (
        <svg viewBox="0 0 32 32" width="28" height="28">
          <ellipse cx="16" cy="16" rx="13" ry="5" fill="none" stroke="#2CC295" strokeWidth="1.8" transform="rotate(30 16 16)" />
          <ellipse cx="16" cy="16" rx="13" ry="5" fill="none" stroke="#F9BE4A" strokeWidth="1.8" transform="rotate(90 16 16)" />
          <ellipse cx="16" cy="16" rx="13" ry="5" fill="none" stroke="#2CC295" strokeWidth="1.8" transform="rotate(150 16 16)" />
          <circle cx="16" cy="16" r="2.5" fill="#FFFFFF" />
        </svg>
      );
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
    case 'AI & Machine Learning':
      return (
        <svg viewBox="0 0 32 32" width="28" height="28">
          <circle cx="16" cy="16" r="4" fill="#00DF81" />
          <circle cx="8" cy="8" r="3" fill="#2CC295" />
          <circle cx="24" cy="8" r="3" fill="#2CC295" />
          <circle cx="8" cy="24" r="3" fill="#F9BE4A" />
          <circle cx="24" cy="24" r="3" fill="#F9BE4A" />
          <line x1="8" y1="8" x2="16" y2="16" stroke="#A8CDC4" strokeWidth="1.5" />
          <line x1="24" y1="8" x2="16" y2="16" stroke="#A8CDC4" strokeWidth="1.5" />
          <line x1="8" y1="24" x2="16" y2="16" stroke="#A8CDC4" strokeWidth="1.5" />
          <line x1="24" y1="24" x2="16" y2="16" stroke="#A8CDC4" strokeWidth="1.5" />
        </svg>
      );
    case 'Streamlit':
      return (
        <svg viewBox="0 0 32 32" width="28" height="28">
          <polygon points="16,4 28,26 4,26" fill="none" stroke="#FFD477" strokeWidth="2.5" />
          <line x1="16" y1="12" x2="16" y2="26" stroke="#00DF81" strokeWidth="2" />
        </svg>
      );
    case 'Unity':
      return (
        <svg viewBox="0 0 32 32" width="28" height="28">
          <path d="M16 4l10 6v12l-10 6L6 22V10l10-6z" fill="none" stroke="#FFFFFF" strokeWidth="2" />
          <path d="M16 10v12M10 13l12 6M22 13l-12 6" stroke="#00DF81" strokeWidth="2" />
        </svg>
      );
    case 'C#':
      return (
        <svg viewBox="0 0 32 32" width="28" height="28">
          <path d="M18 10c-5 0-8 3-8 6s3 6 8 6" fill="none" stroke="#2CC295" strokeWidth="2.5" />
          <text x="21" y="16" fill="#F9BE4A" fontSize="12" fontWeight="bold">#</text>
        </svg>
      );
    case 'MySQL':
      return (
        <svg viewBox="0 0 32 32" width="28" height="28">
          <ellipse cx="16" cy="8" rx="10" ry="4" fill="none" stroke="#00DF81" strokeWidth="2" />
          <path d="M6 8v8c0 2.2 4.5 4 10 4s10-1.8 10-4V8" fill="none" stroke="#00DF81" strokeWidth="2" />
          <path d="M6 16v8c0 2.2 4.5 4 10 4s10-1.8 10-4v-8" fill="none" stroke="#00DF81" strokeWidth="2" />
        </svg>
      );
    case 'MongoDB':
      return (
        <svg viewBox="0 0 32 32" width="28" height="28">
          <path d="M16 3S8 11 8 18c0 5 3.5 9 8 11 4.5-2 8-6 8-11 0-7-8-15-8-15z" fill="none" stroke="#00DF81" strokeWidth="2" />
          <line x1="16" y1="5" x2="16" y2="28" stroke="#F9BE4A" strokeWidth="1.5" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 32 32" width="28" height="28">
          <circle cx="16" cy="16" r="12" fill="none" stroke="#2CC295" strokeWidth="2" />
        </svg>
      );
  }
}

export default function TechStack() {
  const [activeTab, setActiveTab] = useState('all');

  const tabs = [
    { id: 'all', label: 'All Technologies' },
    { id: 'backend', label: 'Backend & Enterprise' },
    { id: 'frontend', label: 'Frontend & UI' },
    { id: 'ai-ml', label: 'AI & Data Science' },
    { id: 'emerging', label: 'Engines & Spatial' },
    { id: 'database', label: 'Databases' }
  ];

  const filteredTech =
    activeTab === 'all'
      ? TECH_DATA
      : TECH_DATA.filter((item) => item.category === activeTab);

  return (
    <section className="tech-stack-section" id="tech-stack">
      <div className="container">
        <div className="section-header">
          <div className="section-label">
            <span className="label-bullet"></span>
            <span>Technology Ecosystem</span>
          </div>
          <h2 className="section-title">
            Engineered with Modern, <span className="gold-gradient-text">Battle-Tested Tools.</span>
          </h2>
          <p className="section-description">
            We build resilient platforms utilizing industry-standard languages, enterprise frameworks, high-throughput databases, and emerging spatial computing engines.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="tech-tabs-row" role="tablist">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`tech-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tech Grid */}
        <div className="tech-grid" id="tech-grid">
          {filteredTech.map((item, index) => (
            <div key={index} className="tech-card interactive-target">
              <div className="tech-card-header">
                <div className="tech-icon-container">
                  <TechIcon name={item.name} />
                </div>
                <span className="tech-badge">{item.badge}</span>
              </div>
              <div className="tech-card-body">
                <h3 className="tech-name">{item.name}</h3>
                <p className="tech-role">{item.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
