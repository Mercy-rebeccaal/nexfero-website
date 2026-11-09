import React from 'react';

const REASONS = [
  {
    idx: '01 / ARCHITECTURE',
    title: 'Innovation-Driven Approach',
    desc: 'We actively incorporate emerging AI models, modern micro-frontends, and reactive streams into our architectures, ensuring your software stays years ahead of industry obsolescence.'
  },
  {
    idx: '02 / PARTNERSHIP',
    title: 'Client-Focused Solutions',
    desc: 'Every business challenge possesses unique nuances. We tailor custom technical solutions specifically aligned with your unit economics, user expectations, and strategic milestones.'
  },
  {
    idx: '03 / CAPABILITY',
    title: 'Modern Technology Stack',
    desc: 'We build with battle-tested languages, high-throughput backend runtimes, and premier cloud platforms: React, Node.js, Python, Flask, AWS, and secure relational/NoSQL databases.'
  },
  {
    idx: '04 / CREATIVITY',
    title: 'Creative Problem Solving',
    desc: 'Where off-the-shelf software encounters rigid limitations, our team engineers custom algorithms, bespoke data pipelines, and elegant workflows that turn obstacles into competitive advantages.'
  },
  {
    idx: '05 / RESILIENCE',
    title: 'Scalable Digital Products',
    desc: 'From initial prototype to enterprise traffic surges, our products are engineered with modular boundaries, clean API contracts, and stateless horizontal scaling capability.'
  },
  {
    idx: '06 / PRECISION',
    title: 'Quality-Focused Development',
    desc: 'Zero shortcuts. Strict code reviews, comprehensive test suites, sub-second performance budgets, and strict security posture safeguards protect your digital assets at every stage.'
  }
];

export default function WhyChooseUs() {
  return (
    <section className="why-us-section" id="why-us">
      <div className="container">
        <div className="section-header">
          <div className="section-label">
            <span className="label-bullet"></span>
            <span>The NexFero Advantage</span>
          </div>
          <h2 className="section-title">Why Businesses Choose NexFero.</h2>
          <p className="section-description">
            We operate as dedicated engineering partners rather than passive vendors. Here is how our engineering discipline and startup agility deliver superior digital outcomes.
          </p>
        </div>

        <div className="why-grid">
          {REASONS.map((r, i) => (
            <div key={i} className="why-card">
              <span className="why-badge-index">{r.idx}</span>
              <h3>{r.title}</h3>
              <p>{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

