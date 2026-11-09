import React, { useState } from 'react';
import { PROJECTS_DATA } from '../data/projectsData';

export default function Projects({ onOpenProjectModal }) {
  const [filter, setFilter] = useState('all');

  const filtered =
    filter === 'all'
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((p) => p.category.toLowerCase() === filter.toLowerCase());

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
          {filtered.map((project) => (
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
                  {project.metrics && project.metrics.map((m, i) => (
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
