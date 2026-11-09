import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import WhyChooseUs from '../components/WhyChooseUs';
import TechStack from '../components/TechStack';
import Projects from '../components/Projects';
import Process from '../components/Process';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function Home() {
  const [activeModal, setActiveModal] = useState(null); // { type: 'service'|'project'|'success'|'admin', data: ... }

  const handleOpenService = (key) => {
    setActiveModal({ type: 'service', key });
  };

  const handleOpenProject = (id) => {
    setActiveModal({ type: 'project', id });
  };

  const handleShowSuccess = (submission, backendOk) => {
    setActiveModal({ type: 'success', submission, backendOk });
  };

  const handleOpenAdmin = () => {
    setActiveModal({ type: 'admin' });
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <div className="nexfero-app">
      <Navbar />
      <main>
        <Hero onOpenTalk={() => {
          const el = document.getElementById('contact');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }} />
        <About />
        <Services onOpenServiceModal={handleOpenService} />
        <WhyChooseUs />
        <TechStack />
        <Projects onOpenProjectModal={handleOpenProject} />
        <Process />

        {/* CTA Section */}
        <section className="cta-section">
          <div className="container">
            <div className="cta-banner">
              <div className="section-label" style={{ marginBottom: '1rem' }}>
                <span className="label-bullet"></span>
                <span>Ready To Build?</span>
              </div>
              <h2 className="cta-title">
                Have an Idea? <span className="gold-gradient-text">Let's Make It Happen.</span>
              </h2>
              <p className="cta-desc">
                Your next big idea deserves the right technology partner. Let's build something extraordinary together.
              </p>
              <div className="cta-buttons">
                <a href="#contact" className="btn-gold">
                  <span>Start Your Project</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </a>
                <a href="mailto:nexferoinnovations@gmail.com" className="btn-outline-gold">
                  <span>Contact NexFero</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </a>
              </div>
            </div>
          </div>
        </section>

        <Contact onShowSuccess={handleShowSuccess} />
      </main>

      <Footer onOpenAdmin={handleOpenAdmin} />

      {/* React Modal Viewers */}
      {activeModal && activeModal.type === 'success' && (
        <div className="modal-backdrop-custom" onClick={closeModal} style={{
          position: 'fixed', inset: 0, background: 'rgba(3, 31, 25, 0.85)', backdropFilter: 'blur(8px)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div className="modal-inner-container" onClick={(e) => e.stopPropagation()} style={{
            background: 'var(--bg-card)', border: '1px solid var(--accent-gold)', borderRadius: 'var(--radius-xl)', padding: '3rem', maxWidth: '600px', width: '90%', textAlign: 'center'
          }}>
            <button type="button" className="dialog-close-btn" onClick={closeModal}>✕</button>
            <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: 'rgba(16, 70, 56, 0.9)', border: '2px solid var(--accent-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto', fontSize: '2rem', color: 'var(--light-gold)' }}>✓</div>
            <h2 style={{ color: 'var(--text-primary)', marginBottom: '0.8rem' }}>Inquiry Transmitted!</h2>
            <div style={{ padding: '0.5rem 1.4rem', background: 'rgba(6, 59, 48, 0.9)', border: '1.5px dashed var(--accent-gold)', borderRadius: 'var(--radius-md)', fontFamily: 'monospace', fontSize: '1.25rem', color: 'var(--light-gold)', marginBottom: '1.5rem', display: 'inline-block' }}>
              REF: {activeModal.submission.trackingId}
            </div>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1.8rem' }}>
              Thank you, <strong style={{ color: '#fff' }}>{activeModal.submission.name}</strong>. Our engineering leadership in Chennai will review your inquiry for <strong style={{ color: 'var(--light-gold)' }}>{activeModal.submission.service}</strong> and respond within 24 hours.
            </p>
            <button type="button" className="btn-gold" onClick={closeModal} style={{ minWidth: '180px' }}>
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

