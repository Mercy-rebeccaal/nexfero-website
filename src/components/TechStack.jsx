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
                  <span style={{ color: 'var(--accent-gold)', fontSize: '1.2rem' }}>✦</span>
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

