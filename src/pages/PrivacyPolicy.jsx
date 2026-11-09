import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function PrivacyPolicy() {
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
            <span>Compliance & Data Governance</span>
          </div>
          <h1>Privacy Policy</h1>
          <p style={{ color: 'var(--light-gold)', fontSize: '1rem', marginTop: '0.5rem' }}>
            Effective Date: January 1, 2026 | NexFero Innovations
          </p>
        </div>
      </header>

      <div className="legal-content-container" style={{ maxWidth: '860px', margin: '0 auto', padding: '4rem 1.5rem' }}>
        <article className="legal-article">
          <h2>1. Information We Collect</h2>
          <p>
            When you interact with our website or submit an inquiry, we collect your full name, email address, phone number, requested services, project budget, and project description.
          </p>
          <h2>2. How We Utilize Your Data</h2>
          <p>
            Data is strictly used to communicate regarding digital engineering proposals, formulated architectural estimates, and provide support. We never sell or share client data.
          </p>
          <h2>3. Governing Law</h2>
          <p>
            Governed in accordance with the laws of India, under the jurisdiction of Chennai, Tamil Nadu.
          </p>
        </article>
      </div>
      <Footer />
    </div>
  );
}

