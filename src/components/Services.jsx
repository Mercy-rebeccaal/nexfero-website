import React from 'react';
import { SERVICES_DATA } from '../data/servicesData';
import Section3DVisual from './Section3DVisual';

export default function Services({ onOpenServiceModal }) {
  const servicesList = Object.values(SERVICES_DATA).sort((a, b) => a.order - b.order);

  return (
    <section className="services-section" id="services">
      <div className="container">
        <div className="section-header">
          <div className="section-label">
            <span className="label-bullet"></span>
            <span>Comprehensive Offerings</span>
          </div>
          <h2 className="section-title">
            Technology Solutions for a <span className="gold-gradient-text">Smarter Tomorrow.</span>
          </h2>
          <p className="section-description">
            From modern responsive interfaces and enterprise full-stack platforms to specialized AI architectures and immersive XR experiences, we build technology designed to scale seamlessly.
          </p>
        </div>

        <div className="services-grid" id="services-grid">
          {servicesList.map((service) => (
            <article key={service.key} className="service-card interactive-target">
              <div className="service-card-header">
                <span className="service-badge-pill">{service.badge}</span>
                <span className="service-order-number">0{service.order}</span>
              </div>

              <div className="service-visual-preview" style={{ height: '140px', backgroundColor: '#000F0F', borderRadius: '8px', overflow: 'hidden', margin: '0.8rem 0 1.2rem 0' }}>
                <Section3DVisual type={service.visualType || 'ai-brain'} width={320} height={140} />
              </div>

              <div className="service-card-body">
                <h3 className="service-title">{service.title}</h3>
                <p className="service-tagline" style={{ color: '#F9BE4A', fontSize: '0.86rem', fontWeight: 600, marginBottom: '0.6rem' }}>
                  {service.tagline}
                </p>
                <p className="service-desc">{service.description}</p>

                <ul className="service-features-list">
                  {service.capabilities.slice(0, 4).map((cap, i) => (
                    <li key={i} className="service-feature-item">
                      <span className="feature-bullet">✦</span>
                      <span>{cap}</span>
                    </li>
                  ))}
                </ul>

                <div className="service-tech-tags" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '1.2rem' }}>
                  {service.technologies.slice(0, 4).map((tech, i) => (
                    <span key={i} className="tech-pill" style={{ fontSize: '0.75rem' }}>{tech}</span>
                  ))}
                </div>
              </div>

              <div className="service-card-footer">
                <button
                  type="button"
                  className="btn-service-learn"
                  onClick={() => onOpenServiceModal && onOpenServiceModal(service.key)}
                >
                  <span>Explore Capabilities</span>
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
