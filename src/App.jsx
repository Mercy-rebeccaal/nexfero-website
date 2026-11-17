import React, { useState, useEffect, useCallback, useMemo } from 'react';
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
import CustomCursor from './components/CustomCursor';

import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import NotFound from './pages/NotFound';

import { SERVICES_DATA } from './data/servicesData';
import { PROJECTS_DATA } from './data/projectsData';

import './styles/global.css';

/**
 * NexFero Innovations - Master Application Component
 * "Beyond Ideas. Beyond Limits."
 */
export default function App() {
  const [loading, setLoading] = useState(true);
  const [currentRoute, setCurrentRoute] = useState(window.location.pathname);
  const [activeModal, setActiveModal] = useState(null); // { type: 'service' | 'project' | 'success' | 'admin', data?: any, ... }
  const [inquiries, setInquiries] = useState([]);
  const [adminUser, setAdminUser] = useState(() => {
    try {
      const stored = localStorage.getItem('nexfero_admin_user') || sessionStorage.getItem('nexfero_admin_user');
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      return null;
    }
  });

  // 1. Initial Splash Screen Preloader
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // 2. Client-side Navigation Helper & Route Synchronization
  const navigate = useCallback((path) => {
    window.history.pushState({}, '', path);
    setCurrentRoute(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // 3. Inquiries Synchronization for Quick Modal
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

  // 4. Global Executive Key Shortcut (Ctrl+Shift+I or Alt+A)
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

  // 5. Modal Handlers
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

  const handleOpenAdminPortal = () => {
    if (adminUser) {
      navigate('/admin/dashboard');
    } else {
      navigate('/admin/login');
    }
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  // 6. Admin Authentication Callbacks
  const handleLoginSuccess = (user) => {
    setAdminUser(user);
    navigate('/admin/dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('nexfero_admin_token');
    localStorage.removeItem('nexfero_admin_user');
    sessionStorage.removeItem('nexfero_admin_token');
    sessionStorage.removeItem('nexfero_admin_user');
    setAdminUser(null);
    navigate('/admin/login');
  };

  // 7. CSV Export for Modal Inquiries
  const exportCSV = () => {
    if (inquiries.length === 0) {
      alert('No inquiries to export.');
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

  // 8. ROUTE RESOLUTION
  // Dedicated Admin Routes
  if (currentRoute === '/admin' || currentRoute === '/admin/' || currentRoute === '/admin/login') {
    if (adminUser) {
      return (
        <AdminDashboard
          user={adminUser}
          onLogout={handleLogout}
          onNavigateHome={() => navigate('/')}
        />
      );
    }
    return (
      <AdminLogin
        onLoginSuccess={handleLoginSuccess}
        onNavigateHome={() => navigate('/')}
      />
    );
  }

  if (
    currentRoute === '/admin/dashboard' ||
    currentRoute === '/admin/enquiries' ||
    currentRoute === '/admin/projects' ||
    currentRoute === '/admin/services' ||
    currentRoute === '/admin/settings'
  ) {
    if (!adminUser) {
      return (
        <AdminLogin
          onLoginSuccess={handleLoginSuccess}
          onNavigateHome={() => navigate('/')}
        />
      );
    }
    return (
      <AdminDashboard
        user={adminUser}
        onLogout={handleLogout}
        onNavigateHome={() => navigate('/')}
      />
    );
  }

  // Legal & Auxiliary Pages
  if (currentRoute === '/privacy' || currentRoute === '/privacy.html') {
    return <PrivacyPolicy onNavigateHome={() => navigate('/')} />;
  }
  if (currentRoute === '/terms' || currentRoute === '/terms.html') {
    return <Terms onNavigateHome={() => navigate('/')} />;
  }
  if (currentRoute === '/404' || currentRoute === '/404.html') {
    return <NotFound onNavigateHome={() => navigate('/')} />;
  }

  // MAIN HOMEPAGE EXPERIENCE
  return (
    <div className="nexfero-app">
      {/* Desktop Glowing Custom Cursor */}
      <CustomCursor />

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
      <Navbar onOpenAdmin={handleOpenAdminPortal} />

      {/* 3. Main Page Sections */}
      <main>
        {/* Cinematic Hero with Scroll-Triggered Zoom */}
        <Hero onOpenTalk={() => {
          const el = document.getElementById('contact');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }} />

        {/* Company Identity & Vision */}
        <About />

        {/* 7 Official Services */}
        <Services onOpenServiceModal={handleOpenService} />

        {/* Value Proposition */}
        <WhyChooseUs />

        {/* Technologies Grid */}
        <TechStack />

        {/* 7 Core Engineering Projects with 3D Models */}
        <Projects onOpenProjectModal={handleOpenProject} />

        {/* Development Methodology */}
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
                Your ambitious vision deserves engineering depth and modern architectural execution. Let's build something extraordinary together.
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

        {/* Inquiry Transmission Form */}
        <Contact onShowSuccess={handleShowSuccess} />
      </main>

      {/* 4. Footer with Executive Gateway */}
      <Footer onOpenAdmin={handleOpenAdminPortal} />

      {/* ============================================================
          5. MODAL SYSTEM (Service, Project, Success, Admin Quick View)
         ============================================================ */}

      {activeModal && (
        <div
          className="modal-backdrop-custom"
          onClick={closeModal}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 15, 15, 0.88)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
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
                background: '#032221',
                border: '1px solid #F9BE4A',
                borderRadius: '16px',
                padding: '2.8rem',
                maxWidth: '820px',
                width: '100%',
                maxHeight: '85vh',
                overflowY: 'auto',
                position: 'relative',
                boxShadow: '0 25px 80px rgba(0, 0, 0, 0.8), 0 0 40px rgba(0, 223, 129, 0.15)'
              }}
            >
              <button type="button" className="dialog-close-btn" onClick={closeModal} aria-label="Close modal">✕</button>
              <div className="modal-header-block">
                <span className="section-label" style={{ marginBottom: '0.6rem' }}>{activeModal.data.badge}</span>
                <h2 style={{ color: '#F1F7F6', marginBottom: '0.4rem' }}>{activeModal.data.title}</h2>
                <p className="modal-tagline" style={{ color: '#F9BE4A', fontWeight: 600 }}>{activeModal.data.tagline}</p>
              </div>

              <p style={{ fontSize: '1.05rem', lineHeight: 1.75, marginBottom: '1.8rem', color: '#A8CDC4' }}>
                {activeModal.data.description}
              </p>

              <h4 style={{ color: '#FFD477', textTransform: 'uppercase', fontSize: '0.92rem', marginBottom: '1rem', letterSpacing: '0.08em' }}>
                Core Capabilities
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '1.8rem' }}>
                {activeModal.data.capabilities.map((c, i) => (
                  <div key={i} className="modal-capability-item" style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                    <span style={{ color: '#00DF81' }}>✦</span>
                    <span style={{ color: '#F1F7F6', fontSize: '0.95rem' }}>{typeof c === 'string' ? c : c.title}</span>
                  </div>
                ))}
              </div>

              <div style={{ margin: '1.8rem 0' }}>
                <h4 style={{ color: '#FFD477', textTransform: 'uppercase', fontSize: '0.92rem', marginBottom: '0.8rem', letterSpacing: '0.08em' }}>
                  Technologies Leveraged
                </h4>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {activeModal.data.technologies.map((t, i) => (
                    <span key={i} className="tech-pill">{t}</span>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: '2.5rem' }}>
                <h4 style={{ color: '#FFD477', textTransform: 'uppercase', fontSize: '0.92rem', marginBottom: '0.8rem', letterSpacing: '0.08em' }}>
                  Deliverables Included
                </h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', padding: 0 }}>
                  {activeModal.data.deliverables.map((d, i) => (
                    <li key={i} style={{ color: '#A8CDC4', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <span style={{ color: '#00DF81', fontWeight: 800 }}>✓</span> {d}
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
                    const selectEl = document.getElementById('contact-service');
                    if (selectEl) {
                      selectEl.value = activeModal.data.title;
                    }
                  }
                }}
              >
                <span>Initiate Consultation For This Service</span>
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
                background: '#032221',
                border: '1px solid #F9BE4A',
                borderRadius: '16px',
                padding: '2.8rem',
                maxWidth: '820px',
                width: '100%',
                maxHeight: '85vh',
                overflowY: 'auto',
                position: 'relative',
                boxShadow: '0 25px 80px rgba(0, 0, 0, 0.8), 0 0 40px rgba(0, 223, 129, 0.15)'
              }}
            >
              <button type="button" className="dialog-close-btn" onClick={closeModal} aria-label="Close modal">✕</button>
              <div className="modal-header-block">
                <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '0.8rem', alignItems: 'center' }}>
                  <span className="section-label" style={{ marginBottom: 0 }}>Project 0{activeModal.data.order}</span>
                  <span className="tech-pill">{activeModal.data.category}</span>
                </div>
                <h2 style={{ color: '#F1F7F6', marginBottom: '0.4rem' }}>{activeModal.data.title}</h2>
                <p className="modal-tagline" style={{ color: '#F9BE4A', fontWeight: 600 }}>{activeModal.data.tagline}</p>
              </div>

              <div className="prototype-notice-box" style={{
                backgroundColor: 'rgba(3, 98, 76, 0.35)',
                border: '1px solid rgba(44, 194, 149, 0.35)',
                borderRadius: '8px',
                padding: '0.9rem 1.2rem',
                margin: '1.2rem 0 1.6rem 0',
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                color: '#A8CDC4',
                fontSize: '0.86rem'
              }}>
                <span style={{ fontSize: '1.2rem', color: '#00DF81' }}>ℹ</span>
                <span>
                  <strong>Engineering Implementation:</strong> Built by the NexFero Innovations engineering team with genuine modular code and deployment benchmarks.
                </span>
              </div>

              <p style={{ fontSize: '1.05rem', lineHeight: 1.75, marginBottom: '1.8rem', color: '#A8CDC4' }}>
                {activeModal.data.fullDescription || activeModal.data.shortDescription}
              </p>

              <div style={{ marginBottom: '2.2rem' }}>
                <h4 style={{ color: '#FFD477', textTransform: 'uppercase', fontSize: '0.92rem', marginBottom: '0.8rem', letterSpacing: '0.08em' }}>
                  Technologies Applied
                </h4>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {activeModal.data.technologies.map((t, i) => (
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
                    const msgEl = document.getElementById('contact-message');
                    if (msgEl) {
                      msgEl.value = `Hello NexFero team, I am interested in discussing your architecture for "${activeModal.data.title}" (${activeModal.data.category}) for an upcoming project.`;
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
                background: '#032221',
                border: '1px solid #00DF81',
                borderRadius: '16px',
                padding: '3rem',
                maxWidth: '600px',
                width: '100%',
                textAlign: 'center',
                boxShadow: '0 25px 80px rgba(0, 0, 0, 0.8), 0 0 50px rgba(0, 223, 129, 0.25)'
              }}
            >
              <button type="button" className="dialog-close-btn" onClick={closeModal} aria-label="Close modal">✕</button>
              <div style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                background: 'rgba(0, 223, 129, 0.15)',
                border: '2px solid #00DF81',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem auto',
                fontSize: '2rem',
                color: '#00DF81'
              }}>
                ✓
              </div>
              <h2 style={{ color: '#F1F7F6', marginBottom: '0.8rem' }}>Inquiry Transmitted!</h2>
              <div style={{
                padding: '0.5rem 1.4rem',
                background: '#000F0F',
                border: '1.5px dashed #F9BE4A',
                borderRadius: '8px',
                fontFamily: 'monospace',
                fontSize: '1.25rem',
                fontWeight: 700,
                color: '#FFD477',
                marginBottom: '1.5rem',
                display: 'inline-block'
              }}>
                REF: {activeModal.submission.trackingId}
              </div>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: '#A8CDC4', marginBottom: '1.5rem' }}>
                Thank you, <strong style={{ color: '#FFFFFF' }}>{activeModal.submission.name}</strong>. Your project inquiry for <strong style={{ color: '#F9BE4A' }}>{activeModal.submission.service}</strong> has been received by our engineering headquarters in Chennai. We will contact you at <strong style={{ color: '#FFFFFF' }}>{activeModal.submission.email}</strong> within 24 business hours.
              </p>
              <div style={{ fontSize: '0.88rem', color: '#707D7D', marginBottom: '2rem' }}>
                {activeModal.backendOk ? (
                  <span style={{ color: '#00DF81', fontWeight: 600 }}>● Live Node.js Storage Synchronized</span>
                ) : (
                  <span style={{ color: '#FFD477', fontWeight: 600 }}>● Secured via Client Storage Engine</span>
                )}
              </div>
              <button type="button" className="btn-gold" style={{ minWidth: '200px' }} onClick={closeModal}>
                <span>Done</span>
              </button>
            </div>
          )}

          {/* D. Quick Founder / Admin Inquiries Modal */}
          {activeModal.type === 'admin' && (
            <div
              className="modal-inner-container"
              onClick={(e) => e.stopPropagation()}
              style={{
                background: '#032221',
                border: '1px solid #F9BE4A',
                borderRadius: '16px',
                padding: '2.8rem',
                maxWidth: '1050px',
                width: '100%',
                maxHeight: '85vh',
                overflowY: 'auto',
                position: 'relative',
                boxShadow: '0 25px 80px rgba(0, 0, 0, 0.8), 0 0 40px rgba(249, 190, 74, 0.2)'
              }}
            >
              <button type="button" className="dialog-close-btn" onClick={closeModal} aria-label="Close modal">✕</button>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <span className="section-label" style={{ marginBottom: '0.4rem' }}>Executive Management</span>
                  <h2 style={{ fontSize: '1.8rem', margin: 0, color: '#FFFFFF' }}>Inquiries & Leads Vault</h2>
                </div>
                <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                  <span className="tech-pill">{inquiries.length} Inquiries</span>
                  <button type="button" className="btn-outline-gold" style={{ padding: '0.45rem 0.9rem', fontSize: '0.82rem' }} onClick={exportCSV}>
                    Export CSV
                  </button>
                  <button
                    type="button"
                    className="btn-gold"
                    style={{ padding: '0.45rem 1rem', fontSize: '0.82rem' }}
                    onClick={() => {
                      closeModal();
                      handleOpenAdminPortal();
                    }}
                  >
                    Open Full Admin Suite →
                  </button>
                </div>
              </div>

              <div className="admin-table-wrapper" style={{ overflowX: 'auto' }}>
                <table className="admin-table" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.86rem' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#063028', color: '#A8CDC4' }}>
                      <th style={{ padding: '0.8rem 1rem' }}>Tracking ID</th>
                      <th style={{ padding: '0.8rem 1rem' }}>Client Name</th>
                      <th style={{ padding: '0.8rem 1rem' }}>Email</th>
                      <th style={{ padding: '0.8rem 1rem' }}>Service</th>
                      <th style={{ padding: '0.8rem 1rem' }}>Budget</th>
                      <th style={{ padding: '0.8rem 1rem' }}>Message</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inquiries.length === 0 ? (
                      <tr>
                        <td colSpan={6} style={{ textAlign: 'center', padding: '2rem', color: '#A8CDC4' }}>
                          No inquiries recorded yet. Submit the contact form to generate live leads!
                        </td>
                      </tr>
                    ) : (
                      inquiries.map((item, idx) => (
                        <tr key={idx} style={{ borderBottom: '1px solid rgba(44, 194, 149, 0.15)' }}>
                          <td style={{ padding: '0.8rem 1rem', color: '#F9BE4A', fontFamily: 'monospace', fontWeight: 700 }}>
                            {item.trackingId || `NXF-${1000 + idx}`}
                          </td>
                          <td style={{ padding: '0.8rem 1rem', color: '#F1F7F6', fontWeight: 600 }}>{item.name}</td>
                          <td style={{ padding: '0.8rem 1rem' }}>
                            <a href={`mailto:${item.email}`} style={{ color: '#00DF81' }}>{item.email}</a>
                          </td>
                          <td style={{ padding: '0.8rem 1rem' }}><span className="tech-pill">{item.service || 'General'}</span></td>
                          <td style={{ padding: '0.8rem 1rem', color: '#FFD477' }}>{item.budget || 'Flexible'}</td>
                          <td style={{ padding: '0.8rem 1rem', maxWidth: '280px', color: '#A8CDC4' }}>{item.message}</td>
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
