import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Terms() {
  return (
    <div className="nexfero-app">
      <Navbar />
      <header className="legal-page-header" style={{
        padding: 'calc(var(--header-height) + 4rem) 0 3rem 0',
        background: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--gold-border)',
        textAlign: 'center'
      }}>
        <div className="container">
          <div className="section-label">
            <span className="label-bullet"></span>
            <span>Terms of Engagement</span>
          </div>
          <h1>Terms and Conditions</h1>
          <p style={{ color: 'var(--light-gold)', fontSize: '1rem', marginTop: '0.5rem' }}>
            Effective Date: January 1, 2026 | NexFero Innovations
          </p>
        </div>
      </header>

      <div className="legal-content-container" style={{ maxWidth: '860px', margin: '0 auto', padding: '4rem 1.5rem' }}>
        <article className="legal-article">
          <h2>1. Scope of Technology Services</h2>
          <p>
            NexFero Innovations provides software engineering, AI architecture, web and cloud development services. Detailed specifications and payments are governed by dedicated Master Services Agreements (MSAs).
          </p>
          <h2>2. Intellectual Property</h2>
          <p>
            Client owns bespoke code and deliverables upon final payment settlement. NexFero retains rights to pre-existing foundational frameworks and boilerplates.
          </p>
          <h2>3. Jurisdiction</h2>
          <p>
            Governed by the laws of India, with exclusive jurisdiction in Chennai, Tamil Nadu, India.
          </p>
        </article>
      </div>
      <Footer />
    </div>
  );
}

