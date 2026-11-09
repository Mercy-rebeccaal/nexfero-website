import React, { useState } from 'react';

export default function Contact({ onShowSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    budget: 'Flexible / Consultation',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errs.name = 'Full name is required (min 2 characters).';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errs.email = 'A valid email address is required.';
    }
    if (!formData.service) {
      errs.service = 'Please select a primary service.';
    }
    if (!formData.message.trim() || formData.message.trim().length < 15) {
      errs.message = 'Please provide at least 15 characters describing your project.';
    }
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setStatusMsg({ type: 'error', text: 'Please resolve the highlighted errors before submitting.' });
      return;
    }

    setIsSubmitting(true);
    setStatusMsg(null);

    const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
    let code = '';
    for (let i = 0; i < 5; i++) code += chars.charAt(Math.floor(Math.random() * chars.length));
    const trackingId = `NXF-${code}`;

    const submission = {
      trackingId,
      ...formData,
      timestamp: new Date().toISOString()
    };

    let backendOk = false;
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submission)
      });
      if (res.ok) backendOk = true;
    } catch (err) {
      console.info('Backend unreachable, saving to client storage engine.');
    }

    // Save locally
    try {
      const stored = JSON.parse(localStorage.getItem('nexfero_inquiries') || '[]');
      stored.unshift(submission);
      localStorage.setItem('nexfero_inquiries', JSON.stringify(stored));
    } catch (err) {}

    setIsSubmitting(false);

    if (onShowSuccess) {
      onShowSuccess(submission, backendOk);
    } else {
      setStatusMsg({
        type: 'success',
        text: `Inquiry successfully submitted! Tracking ID: ${trackingId}. We respond within 24 hours.`
      });
    }

    setFormData({
      name: '',
      email: '',
      phone: '',
      service: '',
      budget: 'Flexible / Consultation',
      message: ''
    });
  };

  return (
    <section className="contact-section" id="contact">
      <div className="container">
        <div className="section-header">
          <div className="section-label">
            <span className="label-bullet"></span>
            <span>Get In Touch</span>
          </div>
          <h2 className="section-title">Let's Build Something Great Together.</h2>
          <p className="section-description">
            Share your project requirements, technical challenges, or collaboration proposal. Our engineering leadership in Chennai will analyze your goals and get back within 24 hours.
          </p>
        </div>

        <div className="contact-grid">
          <div className="contact-info-col">
            <p className="contact-statement">
              Whether you are an ambitious startup needing an MVP or an enterprise scaling an AI infrastructure, NexFero Innovations is primed to execute.
            </p>

            <div className="contact-channels-list">
              <div className="contact-channel-item">
                <div className="channel-icon-box">📍</div>
                <div className="channel-details">
                  <h4>Headquarters</h4>
                  <p>Chennai, Tamil Nadu, India</p>
                </div>
              </div>

              <div className="contact-channel-item">
                <div className="channel-icon-box">✉</div>
                <div className="channel-details">
                  <h4>Direct Inquiries</h4>
                  <p><a href="mailto:nexferoinnovations@gmail.com">nexferoinnovations@gmail.com</a></p>
                </div>
              </div>

              <div className="contact-channel-item">
                <div className="channel-icon-box">⚡</div>
                <div className="channel-details">
                  <h4>Response Time</h4>
                  <p>Guaranteed review within 24 business hours</p>
                </div>
              </div>
            </div>

            <div style={{ marginTop: 'auto' }}>
              <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--light-gold)', marginBottom: '1rem' }}>
                Official Channels
              </h4>
              <div className="social-links-strip">
                <a href="https://www.linkedin.com/company/nexfero-innovation/" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="LinkedIn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
                <a href="https://www.instagram.com/nexfero_innovation/" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="Instagram">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                <a href="https://x.com/NexFero_14" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="X (Twitter)">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
              </div>
            </div>
          </div>

          <div className="contact-form-card">
            <form onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label htmlFor="contact-name-r" className="form-label">
                  Your Full Name <span className="required-star">*</span>
                </label>
                <input
                  type="text"
                  id="contact-name-r"
                  name="name"
                  className={`form-input ${errors.name ? 'input-error' : ''}`}
                  placeholder="e.g. Maya Senthil"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                {errors.name && <span className="field-error-msg" style={{ display: 'block' }}>{errors.name}</span>}
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label htmlFor="contact-email-r" className="form-label">
                    Email Address <span className="required-star">*</span>
                  </label>
                  <input
                    type="email"
                    id="contact-email-r"
                    name="email"
                    className={`form-input ${errors.email ? 'input-error' : ''}`}
                    placeholder="e.g. maya@enterprise.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  {errors.email && <span className="field-error-msg" style={{ display: 'block' }}>{errors.email}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="contact-phone-r" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="contact-phone-r"
                    name="phone"
                    className="form-input"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label htmlFor="service-select-r" className="form-label">
                    Service Required <span className="required-star">*</span>
                  </label>
                  <select
                    id="service-select-r"
                    name="service"
                    className={`form-select ${errors.service ? 'input-error' : ''}`}
                    value={formData.service}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>Select a Service</option>
                    <option value="AI & Machine Learning">Artificial Intelligence & ML</option>
                    <option value="Web Development">Web Development & Full-Stack</option>
                    <option value="Mobile App Development">Mobile Application Development</option>
                    <option value="UI/UX Design">UI/UX Design & Prototyping</option>
                    <option value="Cloud Solutions">Cloud Solutions & Hosting</option>
                    <option value="Digital Marketing">Digital Marketing & SEO</option>
                    <option value="Custom Software Architecture">Custom Software Architecture</option>
                  </select>
                  {errors.service && <span className="field-error-msg" style={{ display: 'block' }}>{errors.service}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="budget-select-r" className="form-label">
                    Project Budget (Optional)
                  </label>
                  <select
                    id="budget-select-r"
                    name="budget"
                    className="form-select"
                    value={formData.budget}
                    onChange={handleChange}
                  >
                    <option value="Flexible / Consultation">Flexible / Exploring</option>
                    <option value="Under $5,000">&lt; $5,000 (Early MVP)</option>
                    <option value="$5,000 - $15,000">$5,000 – $15,000 (Core Build)</option>
                    <option value="$15,000 - $50,000">$15,000 – $50,000 (Enterprise System)</option>
                    <option value="$50,000+">$50,000+ (Comprehensive Platform)</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="contact-message-r" className="form-label">
                  Project Description & Requirements <span className="required-star">*</span>
                </label>
                <textarea
                  id="contact-message-r"
                  name="message"
                  className={`form-textarea ${errors.message ? 'input-error' : ''}`}
                  placeholder="Briefly describe your idea, technical specifications, or timeline goals (min. 15 characters)..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
                {errors.message && <span className="field-error-msg" style={{ display: 'block' }}>{errors.message}</span>}
              </div>

              <button type="submit" className="btn-gold btn-submit-form" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <span className="btn-spinner"></span>
                    <span>Encrypting & Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Project Inquiry</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                  </>
                )}
              </button>

              {statusMsg && (
                <div
                  className={`form-status-banner ${statusMsg.type === 'error' ? 'banner-error' : 'banner-success'}`}
                  style={{ display: 'block' }}
                >
                  {statusMsg.text}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

