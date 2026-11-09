import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function NotFound() {
  return (
    <div className="nexfero-app">
      <Navbar />
      <div className="container" style={{
        minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '6rem 1.5rem'
      }}>
        <div className="section-label" style={{ marginBottom: '1rem' }}>
          <span className="label-bullet"></span>
          <span>Status 404: Node Disconnected</span>
        </div>
        <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', color: 'var(--light-gold)', marginBottom: '1rem' }}>
          404 Not Found
        </h1>
        <p style={{ maxWidth: '560px', color: 'var(--text-secondary)', marginBottom: '2.5rem' }}>
          The requested coordinate could not be resolved within our neural network. Please return to the homepage or explore our offerings.
        </p>
        <a href="/" className="btn-gold">
          <span>Return to Headquarters</span>
        </a>
      </div>
      <Footer />
    </div>
  );
}

