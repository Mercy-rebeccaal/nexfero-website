import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import Process from './components/Process';
import Contact from './components/Contact';
import Footer from './components/Footer';

import { SERVICES_DATA } from './data/servicesData';
import { PROJECTS_DATA } from './data/projectsData';

import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import NotFound from './pages/NotFound';

import './styles/global.css';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [currentRoute, setCurrentRoute] = useState(window.location.pathname);
  const [activeModal, setActiveModal] = useState(null); // { type: 'service'|'project'|'success'|'admin', data: any }
  const [inquiries, setInquiries] = useState([]);

  // Preloader timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  // Client-side route synchronization
  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Fetch inquiries for admin modal
  const loadInquiries = useCallback(async () => {
    let list = [];
    try {
      const res = await fetch('/api/contacts');
      if (res.ok) {
        const json = await res.json();
        if (Array.isArray(json.contacts)) {
          list = json.contacts;
        }
      }
    } catch (e) {
      // Backend offline, fallback to local storage
    }

    if (list.length === 0) {
      try {
        list = JSON.parse(localStorage.getItem('nexfero_inquiries') || '[]');
      } catch (e) {}
    }

    setInquiries(list);
  }, []);

  // Global founder shortcut (Ctrl+Shift+I or Alt+A)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'i') || (e.altKey && e.key.toLowerCase() === 'a')) {
        e.preventDefault();
        loadInquiries();
        setActiveModal({ type: 'admin' });
      } else if (e.key === 'Escape') {
        setActiveModal(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [loadInquiries]);

  // Modal Handlers
  const handleOpenService = (key) => {
    const data = SERVICES_DATA[key];
    if (data) {
      setActiveModal({ type: 'service', data, key });
    }
  };

  const handleOpenProject = (id) => {
    const data = PROJECTS_DATA.find((p) => p.id === id);
    if (data) {
      setActiveModal({ type: 'project', data });
    }
  };

  const handleShowSuccess = (submission, backendOk) => {
    setActiveModal({ type: 'success', submission, backendOk });
  };

  const handleOpenAdmin = () => {
    loadInquiries();
    setActiveModal({ type: 'admin' });
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  // CSV Export for Founder Inquiries
  const exportCSV = () => {
    if (inquiries.length === 0) {
      alert('No inquiries to export yet.');
      return;
    }
    let csv = 'Tracking ID,Name,Email,Phone,Service,Budget,Timestamp,Message\n';
    inquiries.forEach((i) => {
      csv += `"${i.trackingId || ''}","${(i.name || '').replace(/"/g, '""')}","${i.email || ''}","${i.phone || ''}","${i.service || ''}","${i.budget || ''}","${i.timestamp || ''}","${(i.message || '').replace(/"/g, '""')}"\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `nexfero_inquiries_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Clear Inquiries
  const clearInquiries = () => {
    if (window.confirm('Are you sure you want to clear locally stored inquiries?')) {
      localStorage.removeItem('nexfero_inquiries');
      setInquiries([]);
    }
  };

  // Route Views
  if (currentRoute === '/privacy' || currentRoute === '/privacy.html') {
    return <PrivacyPolicy />;
  }
  if (currentRoute === '/terms' || currentRoute === '/terms.html') {
    return <Terms />;
  }
  if (currentRoute === '/404' || currentRoute === '/404.html') {
    return <NotFound />;
  }

  return (
    <div className="nexfero-app">
      {/* 1. Animated Preloader */}
      {loading && (
        <div id="preloader" className="preloader" aria-hidden="true">
          <div className="preloader-emblem">
            <div className="preloader-ring"></div>
            <div className="preloader-shield">
              <svg viewBox="0 0 40 40" width="28" height="28">
                <polygon points="20,2 36,11 36,29 20,38 4,29 4,11" fill="none" stroke="#F9BE4A" strokeWidth="2" />
                <path d="M13,12 L13,28 M13,14 L27,26 M27,14 L27,28 M27,14 L33,14 M27,20 L31,20" stroke="#FFD477" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>
          </div>
          <div className="preloader-text">NEXFERO INNOVATIONS</div>
        </div>
      )}

      {/* 2. Navigation Header */}
      <Navbar />

      {/* 3. Main Page Sections */}
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

        {/* Call to Action Banner */}
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

      {/* 4. Footer */}
      <Footer onOpenAdmin={handleOpenAdmin} />

      {/* ============================================================
          5. MODAL SYSTEM (Services, Projects, Success, Admin)
         ============================================================ */}

      {/* Modal Backdrop */}
      {activeModal && (
        <div
          className="modal-backdrop-custom"
          onClick={closeModal}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(3, 31, 25, 0.88)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            zIndex: 3000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
            overflowY: 'auto'
          }}
        >
          {/* A. Service Detail Modal */}
          {activeModal.type === 'service' && (
            <div
              className="modal-inner-container"
              onClick={(e) => e.stopPropagation()}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--accent-gold)',
                borderRadius: 'var(--radius-xl)',
                padding: '2.8rem',
                maxWidth: '820px',
                width: '100%',
                maxHeight: '85vh',
                overflowY: 'auto',
                position: 'relative',
                boxShadow: '0 25px 80px rgba(0, 0, 0, 0.7), 0 8px 32px rgba(249, 190, 74, 0.22)'
              }}
            >
              <button type="button" className="dialog-close-btn" onClick={closeModal} aria-label="Close modal">✕</button>
              <div className="modal-header-block">
                <span className="section-label" style={{ marginBottom: '0.6rem' }}>{activeModal.data.badge}</span>
                <h2 style={{ color: 'var(--text-primary)', marginBottom: '0.4rem' }}>{activeModal.data.title}</h2>
                <p className="modal-tagline">{activeModal.data.tagline}</p>
              </div>

              <p style={{ fontSize: '1.05rem', lineHeight: 1.75, marginBottom: '1.8rem', color: 'var(--text-secondary)' }}>
                {activeModal.data.description}
              </p>

              <h4 style={{ color: 'var(--light-gold)', textTransform: 'uppercase', fontSize: '0.92rem', marginBottom: '1rem', letterSpacing: '0.08em' }}>
                Core Capabilities
              </h4>
              <div>
                {activeModal.data.capabilities.map((c, i) => (
                  <div key={i} className="modal-capability-item">
                    <div className="modal-cap-icon">✦</div>
                    <div>
                      <h4 style={{ color: '#FFFFFF', marginBottom: '0.3rem' }}>{c.title}</h4>
                      <p style={{ margin: 0, fontSize: '0.92rem' }}>{c.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ margin: '2rem 0' }}>
                <h4 style={{ color: 'var(--light-gold)', textTransform: 'uppercase', fontSize: '0.92rem', marginBottom: '0.8rem', letterSpacing: '0.08em' }}>
                  Technologies Leveraged
                </h4>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {activeModal.data.technologies.map((t, i) => (
                    <span key={i} className="tech-pill">{t}</span>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: '2.5rem' }}>
                <h4 style={{ color: 'var(--light-gold)', textTransform: 'uppercase', fontSize: '0.92rem', marginBottom: '0.8rem', letterSpacing: '0.08em' }}>
                  Deliverables Included
                </h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', padding: 0 }}>
                  {activeModal.data.deliverables.map((d, i) => (
                    <li key={i} style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center' }}>
                      <span className="gold-check">✓</span> {d}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                className="btn-gold"
                style={{ width: '100%' }}
                onClick={() => {
                  closeModal();
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                    const selectEl = document.getElementById('service-select-r') || document.getElementById('service-select');
                    if (selectEl) {
                      const serviceMap = {
                        'ai-ml': 'AI & Machine Learning',
                        'web-dev': 'Web Development',
                        'mobile-dev': 'Mobile App Development',
                        'ui-ux': 'UI/UX Design',
                        'cloud': 'Cloud Solutions',
                        'digital-marketing': 'Digital Marketing'
                      };
                      selectEl.value = serviceMap[activeModal.key] || 'Other';
                    }
                  }
                }}
              >
                <span>Discuss This Service With Us</span>
                <span>→</span>
              </button>
            </div>
          )}

          {/* B. Project Detail Modal */}
          {activeModal.type === 'project' && (
            <div
              className="modal-inner-container"
              onClick={(e) => e.stopPropagation()}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--accent-gold)',
                borderRadius: 'var(--radius-xl)',
                padding: '2.8rem',
                maxWidth: '820px',
                width: '100%',
                maxHeight: '85vh',
                overflowY: 'auto',
                position: 'relative',
                boxShadow: '0 25px 80px rgba(0, 0, 0, 0.7), 0 8px 32px rgba(249, 190, 74, 0.22)'
              }}
            >
              <button type="button" className="dialog-close-btn" onClick={closeModal} aria-label="Close modal">✕</button>
              <div className="modal-header-block">
                <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '0.8rem', alignItems: 'center' }}>
                  <span className="section-label" style={{ marginBottom: 0 }}>{activeModal.data.badge}</span>
                  <span className="tech-pill">{activeModal.data.category}</span>
                </div>
                <h2 style={{ color: 'var(--text-primary)', marginBottom: '0.4rem' }}>{activeModal.data.title}</h2>
                <p className="modal-tagline">{activeModal.data.tagline}</p>
              </div>

              <div className="prototype-notice-box">
                <span style={{ fontSize: '1.2rem', marginRight: '0.5rem' }}>ℹ</span>
                <span>
                  <strong>Engineering Showcase:</strong> This project represents a proprietary architecture and research prototype created by the NexFero Innovations team to demonstrate real-world system capability.
                </span>
              </div>

              <p style={{ fontSize: '1.05rem', lineHeight: 1.75, marginBottom: '1.8rem', color: 'var(--text-secondary)' }}>
                {activeModal.data.fullDescription || activeModal.data.description}
              </p>

              <div className="modal-metrics-grid">
                {activeModal.data.metrics && activeModal.data.metrics.map((m, i) => (
                  <div key={i} className="modal-metric-card">
                    <span style={{ display: 'block', fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-gold)', marginBottom: '0.2rem' }}>
                      {m.value}
                    </span>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      {m.label}
                    </span>
                  </div>
                ))}
              </div>

              {activeModal.data.features && (
                <div style={{ margin: '1.8rem 0' }}>
                  <h4 style={{ color: 'var(--light-gold)', textTransform: 'uppercase', fontSize: '0.92rem', marginBottom: '0.8rem', letterSpacing: '0.08em' }}>
                    Architectural Features
                  </h4>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', padding: 0 }}>
                    {activeModal.data.features.map((f, i) => (
                      <li key={i} style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center' }}>
                        <span className="gold-check">✦</span> {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div style={{ marginBottom: '2.5rem' }}>
                <h4 style={{ color: 'var(--light-gold)', textTransform: 'uppercase', fontSize: '0.92rem', marginBottom: '0.8rem', letterSpacing: '0.08em' }}>
                  Technologies Applied
                </h4>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {activeModal.data.tags.map((t, i) => (
                    <span key={i} className="tech-pill">{t}</span>
                  ))}
                </div>
              </div>

              <button
                type="button"
                className="btn-gold"
                style={{ width: '100%' }}
                onClick={() => {
                  closeModal();
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                    const msgEl = document.getElementById('contact-message-r') || document.getElementById('contact-message');
                    if (msgEl) {
                      msgEl.value = `Hello NexFero team, I am interested in discussing your work on ${activeModal.data.title} (${activeModal.data.category}) for our upcoming project.`;
                    }
                  }
                }}
              >
                <span>Initiate Architecture Discussion</span>
                <span>→</span>
              </button>
            </div>
          )}

          {/* C. Submission Success Modal */}
          {activeModal.type === 'success' && (
            <div
              className="modal-inner-container"
              onClick={(e) => e.stopPropagation()}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--accent-gold)',
                borderRadius: 'var(--radius-xl)',
                padding: '3rem',
                maxWidth: '600px',
                width: '100%',
                textAlign: 'center',
                boxShadow: '0 25px 80px rgba(0, 0, 0, 0.7), 0 8px 32px rgba(249, 190, 74, 0.22)'
              }}
            >
              <button type="button" className="dialog-close-btn" onClick={closeModal} aria-label="Close modal">✕</button>
              <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'rgba(16, 70, 56, 0.9)', border: '2px solid var(--accent-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto', fontSize: '2rem', color: 'var(--light-gold)' }}>
                ✓
              </div>
              <h2 style={{ color: 'var(--text-primary)', marginBottom: '0.8rem' }}>Inquiry Transmitted!</h2>
              <div style={{ padding: '0.5rem 1.4rem', background: 'rgba(6, 59, 48, 0.9)', border: '1.5px dashed var(--accent-gold)', borderRadius: 'var(--radius-md)', fontFamily: 'JetBrains Mono, monospace', fontSize: '1.25rem', fontWeight: 700, color: 'var(--light-gold)', marginBottom: '1.5rem', display: 'inline-block' }}>
                REF: {activeModal.submission.trackingId}
              </div>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                Thank you, <strong style={{ color: '#FFFFFF' }}>{activeModal.submission.name}</strong>. Your inquiry for <strong style={{ color: 'var(--light-gold)' }}>{activeModal.submission.service}</strong> has been secured. Our engineering leadership in Chennai will contact you at <strong style={{ color: '#FFFFFF' }}>{activeModal.submission.email}</strong> within 24 business hours.
              </p>
              <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
                {activeModal.backendOk ? (
                  <span className="badge-success-live">● Live Database Synchronized</span>
                ) : (
                  <span className="badge-success-local">● Inquiries Engine Active</span>
                )}
              </div>
              <button type="button" className="btn-gold" style={{ minWidth: '200px' }} onClick={closeModal}>
                <span>Done</span>
              </button>
            </div>
          )}

          {/* D. Founder Inquiries Portal Modal */}
          {activeModal.type === 'admin' && (
            <div
              className="modal-inner-container"
              onClick={(e) => e.stopPropagation()}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--accent-gold)',
                borderRadius: 'var(--radius-xl)',
                padding: '2.8rem',
                maxWidth: '1050px',
                width: '100%',
                maxHeight: '85vh',
                overflowY: 'auto',
                position: 'relative',
                boxShadow: '0 25px 80px rgba(0, 0, 0, 0.7), 0 8px 32px rgba(249, 190, 74, 0.22)'
              }}
            >
              <button type="button" className="dialog-close-btn" onClick={closeModal} aria-label="Close modal">✕</button>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <span className="section-label" style={{ marginBottom: '0.4rem' }}>Internal Management</span>
                  <h2 style={{ fontSize: '1.8rem', margin: 0, color: '#FFFFFF' }}>Founder Inquiries Portal</h2>
                </div>
                <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                  <span className="tech-pill">{inquiries.length} Inquiries</span>
                  <button type="button" className="btn-outline-gold" style={{ padding: '0.4rem 0.9rem', fontSize: '0.82rem' }} onClick={exportCSV}>
                    Export CSV
                  </button>
                  <button type="button" className="btn-outline-gold" style={{ padding: '0.4rem 0.9rem', fontSize: '0.82rem', borderColor: '#FF6B6B', color: '#FFA8A8' }} onClick={clearInquiries}>
                    Clear
                  </button>
                </div>
              </div>

              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', marginBottom: '1.2rem' }}>
                Displays inquiries captured in the backend database and local browser storage. Press <kbd style={{ background: 'rgba(6, 59, 48, 0.9)', padding: '2px 6px', borderRadius: '4px', border: '1px solid var(--gold-border)' }}>Ctrl+Shift+I</kbd> anytime to access this panel.
              </p>

              <div className="admin-table-wrapper">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Tracking ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Service</th>
                      <th>Budget</th>
                      <th>Message</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inquiries.length === 0 ? (
                      <tr>
                        <td colSpan={6} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                          No inquiries received yet. Submit the contact form on the homepage to test!
                        </td>
                      </tr>
                    ) : (
                      inquiries.map((item, idx) => (
                        <tr key={idx}>
                          <td>
                            <strong style={{ color: 'var(--accent-gold)', fontFamily: 'JetBrains Mono, monospace' }}>
                              {item.trackingId || item.id || `NXF-${1000 + idx}`}
                            </strong>
                          </td>
                          <td>{item.name || 'Anonymous'}</td>
                          <td>
                            <a href={`mailto:${item.email}`} style={{ color: 'var(--light-gold)' }}>
                              {item.email}
                            </a>
                          </td>
                          <td><span className="tech-pill">{item.service || 'General'}</span></td>
                          <td><span style={{ color: 'var(--light-gold)', fontSize: '0.85rem' }}>{item.budget || 'Flexible'}</span></td>
                          <td style={{ maxWidth: '280px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                            {item.message || ''}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
