import React from 'react';

export default function About() {
  return (
    <section className="about-section" id="about">
      <div className="container">
        <div className="section-header">
          <div className="section-label">
            <span className="label-bullet"></span>
            <span>Who We Are</span>
          </div>
          <h2 className="section-title">Where Innovation Meets Possibility.</h2>
          <p className="section-description">
            At NexFero Innovations, we believe every great solution begins with an idea. We combine creativity, engineering and emerging technologies to develop digital experiences that solve real-world problems.
          </p>
        </div>

        <div className="about-grid">
          <div className="about-narrative">
            <blockquote className="about-statement">
              "Transforming Ideas into Digital Reality — Empowering businesses to move fearlessly towards a smarter, more resilient future."
            </blockquote>

            <p style={{ marginBottom: '1.5rem' }}>
              NexFero Innovations was founded with a single uncompromising premise: modern enterprises require digital architectures that are not only aesthetically captivating, but structurally unassailable and powered by deterministic intelligence.
            </p>

            <div className="about-cards-row">
              <div className="about-card">
                <div className="about-card-icon">👁</div>
                <h3>Our Vision</h3>
                <p>To pioneer intelligent digital systems that dissolve operational bottlenecks and set unprecedented benchmarks for speed, security, and human-centric design.</p>
              </div>

              <div className="about-card">
                <div className="about-card-icon">🚀</div>
                <h3>Our Mission</h3>
                <p>To translate creative startup visions and enterprise requirements into practical digital products through ethical AI, rigorous software engineering, and relentless craftsmanship.</p>
              </div>
            </div>
          </div>

          <div className="pillars-container">
            <div className="pillar-item">
              <span className="pillar-number">01</span>
              <div className="pillar-content">
                <h4>Intelligent AI Orchestration</h4>
                <p>We harness machine learning models and deterministic automation pipelines to transform unstructured operational chaos into actionable decisions.</p>
              </div>
            </div>

            <div className="pillar-item">
              <span className="pillar-number">02</span>
              <div className="pillar-content">
                <h4>Engineered for High Concurrency</h4>
                <p>Every web service, API layer, and database schema we build is structured from day one with cloud-native principles to handle rapid user scaling.</p>
              </div>
            </div>

            <div className="pillar-item">
              <span className="pillar-number">03</span>
              <div className="pillar-content">
                <h4>Human-Centered Interface Precision</h4>
                <p>Zero-latency interactions, WCAG AA accessibility compliance, and bespoke design systems that make complex technological tools feel effortless.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

