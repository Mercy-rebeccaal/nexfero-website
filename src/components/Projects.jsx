import React, { useState } from 'react';

const PROJECTS = [
  {
    id: 'cogniflow-ai',
    title: 'CogniFlow AI',
    category: 'Artificial Intelligence',
    badge: 'AI Prototype',
    description: 'An enterprise-grade cognitive orchestrator that coordinates specialized AI sub-agents to analyze unstructured documentation, synthesize action plans, and automate multi-step business decisions.',
    tags: ['Python', 'PyTorch', 'FastAPI', 'React', 'Vector DB'],
    metrics: [
      { label: 'Latency', value: '< 240ms' },
      { label: 'Architecture', value: 'Event-Driven' }
    ]
  },
  {
    id: 'novacloud-erp',
    title: 'NovaCloud ERP',
    category: 'Web Applications',
    badge: 'Full-Stack System',
    description: 'A modern, modular enterprise platform unifying real-time inventory telemetry, multi-entity financial ledgers, and team coordination in a single responsive dashboard.',
    tags: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Docker'],
    metrics: [
      { label: 'Throughput', value: '10k+ req/s' },
      { label: 'UI Response', value: 'Instant' }
    ]
  },
  {
    id: 'sentinx-security',
    title: 'SentinX Zero-Trust',
    category: 'Security Solutions',
    badge: 'Cybersecurity Architecture',
    description: 'An adaptive security framework providing behavioral anomaly detection, micro-segmentation enforcement, and continuous identity verification across distributed environments.',
    tags: ['Python', 'Machine Learning', 'WebSockets', 'Flask', 'SQLite'],
    metrics: [
      { label: 'Detection Speed', value: 'Real-Time' },
      { label: 'Security Level', value: 'Zero-Trust' }
    ]
  },
  {
    id: 'predictr-ml',
    title: 'Predictr ML',
    category: 'Machine Learning',
    badge: 'ML Pipeline',
    description: 'A machine learning pipeline designed to forecast inventory swings, customer demand spikes, and macroeconomic trends with statistical confidence intervals.',
    tags: ['Python', 'Scikit-learn', 'Pandas', 'Streamlit', 'NumPy'],
    metrics: [
      { label: 'Horizon', value: '90 Days' },
      { label: 'Confidence', value: '95% Interval' }
    ]
  },
  {
    id: 'nexpulse-health',
    title: 'NexPulse Platform',
    category: 'Digital Platforms',
    badge: 'Platform Engineering',
    description: 'A resilient digital health platform featuring smart preliminary triage, secure WebRTC audio/video consultations, and encrypted health records management.',
    tags: ['WebRTC', 'React', 'Node.js', 'MongoDB', 'Socket.io'],
    metrics: [
      { label: 'Video Latency', value: '< 120ms' },
      { label: 'Encryption', value: 'End-to-End' }
    ]
  },
  {
    id: 'auracommerce-3d',
    title: 'AuraCommerce 3D',
    category: 'Web Applications',
    badge: 'Interactive 3D Web',
    description: 'An ultra-performant headless retail experience showcasing real-time 3D product customization, spatial lighting, and lightning-fast checkout transitions.',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'WebGL', 'Node.js'],
    metrics: [
      { label: 'LCP Score', value: '1.1s' },
      { label: 'Frame Rate', value: '60 FPS' }
    ]
  }
];

export default function Projects({ onOpenProjectModal }) {
  const [filter, setFilter] = useState('all');

  const filtered =
    filter === 'all'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category.toLowerCase() === filter.toLowerCase());

  return (
    <section className="projects-section" id="projects">
      <div className="container">
        <div className="section-header">
          <div className="section-label">
            <span className="label-bullet"></span>
            <span>Engineering Showcase</span>
          </div>
          <h2 className="section-title">Innovation Beyond Imagination.</h2>
          <p className="section-description">
            Explore our architectural prototypes and proof-of-concept builds, demonstrating real-world technical depth across artificial intelligence, enterprise platforms, and cloud infrastructure.
          </p>
        </div>

        <div className="projects-filter-row" role="tablist" aria-label="Project Categories">
          {['all', 'Artificial Intelligence', 'Web Applications', 'Security Solutions', 'Machine Learning', 'Digital Platforms'].map((cat) => (
            <button
              key={cat}
              type="button"
              className={`project-filter-btn ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat === 'all' ? 'All Projects' : cat}
            </button>
          ))}
        </div>

        <div className="projects-grid" id="projects-grid">
          {filtered.map((project, idx) => (
            <article key={project.id} className="project-card">
              <div className="project-card-header">
                <div className="project-category-badge">{project.category}</div>
                <div className="project-badge-pill">{project.badge}</div>
              </div>

              <div className="project-card-visual">
                <div className="project-visual-pattern">
                  <div className="visual-center-emblem">
                    <span className="project-emblem-icon">✦</span>
                    <span className="project-emblem-text">{project.title.substring(0, 4)}</span>
                  </div>
                </div>
              </div>

              <div className="project-card-body">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.description}</p>

                <div className="project-tags">
                  {project.tags.map((t, i) => (
                    <span key={i} className="project-tag-pill">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="project-metrics-row">
                  {project.metrics.map((m, i) => (
                    <div key={i} className="card-metric-col">
                      <span className="metric-value-text">{m.value}</span>
                      <span className="metric-label-text">{m.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="project-card-footer">
                <button
                  type="button"
                  className="btn-project-view"
                  onClick={() => onOpenProjectModal && onOpenProjectModal(project.id)}
                >
                  <span>Explore Architecture</span>
                  <span className="arrow-icon">→</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

