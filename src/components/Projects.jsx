import React, { useState } from 'react';
import { PROJECTS_DATA } from '../data/projectsData';
import Section3DVisual from './Section3DVisual';

export default function Projects({ onOpenProjectModal }) {
  const [filter, setFilter] = useState('all');

  const categories = [
    'all',
    'VR & Education',
    'Assistive AI & IoT',
    'Machine Learning',
    'Full-Stack Web',
    'Generative AI',
    'Healthcare Systems'
  ];

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
          <h2 className="section-title">
            Innovation Beyond <span className="gold-gradient-text">Imagination.</span>
          </h2>
          <p className="section-description">
            Explore our real-world software architectures, research prototypes, and applied systems across AI, computer vision, smart embedded IoT, and enterprise full-stack solutions.
          </p>
        </div>

        {/* Filter Categories */}
        <div className="projects-filter-row" role="tablist" aria-label="Project Categories">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`project-filter-btn ${filter.toLowerCase() === cat.toLowerCase() ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat === 'all' ? 'All 6 Projects' : cat}
            </button>
          ))}
        </div>

        {/* 6 Projects Grid */}
        <div className="projects-grid" id="projects-grid">
          {filtered.map((project) => (
            <article key={project.id} className="project-card interactive-target">
              <div className="project-card-header">
                <div className="project-category-badge">{project.category}</div>
                <div className="project-order-badge">0{project.order}</div>
              </div>

              {/* Unique 3D Visual Engine for each Project */}
              <div className="project-card-visual" style={{ height: '190px', backgroundColor: '#000F0F', position: 'relative', overflow: 'hidden' }}>
                <Section3DVisual type={project.visualType} width={380} height={190} />
                <div className="visual-caption-badge" style={{
                  position: 'absolute',
                  bottom: '8px',
                  right: '10px',
                  backgroundColor: 'rgba(0, 15, 15, 0.75)',
                  border: '1px solid rgba(44, 194, 149, 0.3)',
                  borderRadius: '4px',
                  padding: '2px 6px',
                  fontSize: '0.7rem',
                  color: '#A8CDC4'
                }}>
                  {project.visualDesc}
                </div>
              </div>

              <div className="project-card-body">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-tagline" style={{ color: '#F9BE4A', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                  {project.tagline}
                </p>
                <p className="project-desc">{project.shortDescription}</p>

                <div className="project-tags">
                  {project.technologies.map((t, i) => (
                    <span key={i} className="project-tag-pill">
                      {t}
                    </span>
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
