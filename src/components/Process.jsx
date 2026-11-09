import React, { useState } from 'react';

const STEPS = [
  {
    num: '01',
    title: 'Discover',
    tagline: 'Deep Exploration of Ideas & Technical Boundaries',
    desc: 'We initiate every collaboration by conducting in-depth stakeholder sessions. We deconstruct your product vision, define operational constraints, map end-user personas, and establish quantifiable technical benchmarks.',
    deliverables: [
      'Product Requirement Document (PRD)',
      'Technical Feasibility Analysis',
      'User Persona & Journey Maps',
      'Security & Compliance Scope'
    ]
  },
  {
    num: '02',
    title: 'Plan',
    tagline: 'Strategic Architecture & Systems Blueprinting',
    desc: 'Our engineering leadership designs an extensible system blueprint. We evaluate database models, API communication protocols, AI model integrations, and cloud infrastructure requirements before development begins.',
    deliverables: [
      'System Architecture Diagram',
      'Data Schema & Entity Modeling',
      'Milestone-Based Sprint Roadmap',
      'Cloud Infrastructure Cost Projections'
    ]
  },
  {
    num: '03',
    title: 'Design',
    tagline: 'High-Fidelity UI/UX & Interactive Prototyping',
    desc: 'Transforming specifications into captivating, accessible visual experiences. We produce high-fidelity wireframes and clickable prototypes in Figma, rigorously adhering to WCAG 2.1 AA accessibility guidelines.',
    deliverables: [
      'Figma Design System & Token Library',
      'Clickable High-Fidelity Prototype',
      'Responsive Breakpoint Layouts',
      'Design Audit & Accessibility Certification'
    ]
  },
  {
    num: '04',
    title: 'Develop',
    tagline: 'Agile Codebase Engineering & Model Integration',
    desc: 'Writing clean, modular, and maintainable code. We implement test-driven practices, integrate intelligent APIs, and set up continuous automated build pipelines with strict code reviews at every pull request.',
    deliverables: [
      'Production-Grade Source Codebase',
      'REST & GraphQL API Endpoints',
      'Containerized Microservices (Docker)',
      'Automated CI/CD Integration Pipelines'
    ]
  },
  {
    num: '05',
    title: 'Test',
    tagline: 'Rigorous Verification, Security & Load Audits',
    desc: 'Exhaustive quality assurance across multiple devices and environments. We run automated unit tests, end-to-end integration flows, penetration tests, and simulated high-concurrency load spikes to ensure zero failures.',
    deliverables: [
      'Unit & Integration Test Coverage (>90%)',
      'Penetration & Vulnerability Assessment',
      'Lighthouse 95+ Performance Audit',
      'Cross-Browser Compatibility Report'
    ]
  },
  {
    num: '06',
    title: 'Launch',
    tagline: 'Zero-Downtime Deployment & Continuous Evolution',
    desc: 'Flawless production deployment to AWS, Azure, or modern edge networks. We establish automated monitoring, real-time error telemetry, comprehensive operational playbooks, and structured post-launch support.',
    deliverables: [
      'Zero-Downtime Production Rollout',
      'DNS & Custom Domain SSL Configuration',
      'Real-time Telemetry & Health Alerts',
      'Complete Operational Documentation'
    ]
  }
];

export default function Process() {
  const [currentStep, setCurrentStep] = useState(0);
  const active = STEPS[currentStep];

  return (
    <section className="process-section" id="process">
      <div className="container">
        <div className="section-header">
          <div className="section-label">
            <span className="label-bullet"></span>
            <span>Iterative Rigor</span>
          </div>
          <h2 className="section-title">From First Idea to Final Innovation.</h2>
          <p className="section-description">
            Our systematic 6-phase engineering lifecycle ensures transparent communication, rapid iteration cycles, and flawless production delivery.
          </p>
        </div>

        <div className="timeline-tracker-container">
          <div className="timeline-track-line"></div>
          <div
            className="timeline-track-progress"
            style={{ width: `${(currentStep / (STEPS.length - 1)) * 100}%` }}
          ></div>

          <div className="timeline-steps-list" role="tablist" aria-label="Development Process Steps">
            {STEPS.map((s, idx) => (
              <button
                key={s.num}
                type="button"
                className={`process-step-btn ${currentStep === idx ? 'active' : ''}`}
                onClick={() => setCurrentStep(idx)}
                role="tab"
                aria-selected={currentStep === idx}
              >
                <span className="step-node-circle">{s.num}</span>
                <span className="step-node-label">{s.title}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="process-detail-card" role="tabpanel">
          <div className="process-detail-header">
            <h3>{active.num} – {active.title}</h3>
            <p id="process-detail-tagline">{active.tagline}</p>
          </div>

          <p id="process-detail-desc">{active.desc}</p>

          <div className="process-deliverables-box">
            <h4>Key Phase Deliverables</h4>
            <ul className="deliverables-grid">
              {active.deliverables.map((d, i) => (
                <li key={i}>
                  <span className="gold-check">✓</span> {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

