import React, { useState } from 'react';
import { SERVICES_DATA } from '../data/servicesData';

export default function Contact({ onShowSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
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
      errs.service = 'Please select a primary service offering.';
    }
    if (!formData.message.trim() || formData.message.trim().length < 15) {
      errs.message = 'Please provide at least 15 characters describing your project requirements.';
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
      setStatusMsg({ type: 'error', text: 'Please resolve the highlighted fields before submitting.' });
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
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim() || 'Not specified',
      company: formData.company.trim() || 'Individual Client',
      service: formData.service,
      budget: formData.budget,
      message: formData.message.trim(),
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
      console.info('Backend server currently in standalone mode. Saving locally.');
    }

    // Save locally to browser persistence
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

    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      service: '',
      budget: 'Flexible / Consultation',
      message: ''
    });
  };

  return (
    <section className="contact-section" id="contact">
      <div className="container">
        <div className="contact-grid">
          {/* Left Details Column */}
          <div className="contact-info-col">
            <div className="section-label">
              <span className="label-bullet"></span>
              <span>Direct Engagement</span>
            </div>
            <h2 className="section-title">
              Let's Build Something <span className="gold-gradient-text">Exceptional.</span>
            </h2>
            <p className="section-description">
              Whether you need a custom web application, enterprise software architecture, an assistive hardware device, or an AI predictive model, our engineering team in Chennai is ready to collaborate.
            </p>

            <div className="contact-details-list">
              <div className="contact-detail-item">
                <div className="contact-detail-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                </div>
                <div>
                  <span className="contact-detail-label">Headquarters</span>
                  <p className="contact-detail-value">Chennai, Tamil Nadu, India</p>
                </div>
              </div>

              <div className="contact-detail-item">
                <div className="contact-detail-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </div>
                <div>
                  <span className="contact-detail-label">Official Correspondence</span>
                  <a href="mailto:nexferoinnovations@gmail.com" className="contact-detail-value contact-link">
                    nexferoinnovations@gmail.com
                  </a>
                </div>
              </div>

              <div className="contact-detail-item">
                <div className="contact-detail-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                </div>
                <div>
                  <span className="contact-detail-label">Response Commitment</span>
                  <p className="contact-detail-value">Guaranteed response within 24 business hours</p>
                </div>
              </div>
            </div>

            <div className="contact-social-strip">
              <span className="social-strip-label">Official Channels:</span>
              <div className="social-links-row">
                <a href="https://www.linkedin.com/company/nexfero-innovation/" target="_blank" rel="noopener noreferrer" className="social-pill" aria-label="LinkedIn">
                  LinkedIn
                </a>
                <a href="https://www.instagram.com/nexfero_innovation/" target="_blank" rel="noopener noreferrer" className="social-pill" aria-label="Instagram">
                  Instagram
                </a>
                <a href="https://x.com/NexFero_14" target="_blank" rel="noopener noreferrer" className="social-pill" aria-label="X (Twitter)">
                  X / Twitter
                </a>
              </div>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="contact-form-col">
            <div className="contact-form-card">
              <h3 className="form-heading">Initiate Project Discussion</h3>
              <p className="form-subheading">Fill out the parameters below to receive technical evaluation and project scope.</p>

              {statusMsg && (
                <div className={`form-alert form-alert-${statusMsg.type}`} role="alert">
                  {statusMsg.type === 'error' ? '⚠ ' : '✓ '}
                  {statusMsg.text}
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>
                <div className="form-group">
                  <label htmlFor="contact-name" className="form-label">
                    Full Name <span className="required-star">*</span>
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`form-input ${errors.name ? 'input-error' : ''}`}
                    placeholder="e.g. Anand Kumar"
                    required
                  />
                  {errors.name && <span className="field-error-msg">{errors.name}</span>}
                </div>

                <div className="form-row-2col">
                  <div className="form-group">
                    <label htmlFor="contact-email" className="form-label">
                      Email Address <span className="required-star">*</span>
                    </label>
                    <input
                      type="email"
                      id="contact-email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`form-input ${errors.email ? 'input-error' : ''}`}
                      placeholder="name@company.com"
                      required
                    />
                    {errors.email && <span className="field-error-msg">{errors.email}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-phone" className="form-label">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="contact-phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>

                <div className="form-row-2col">
                  <div className="form-group">
                    <label htmlFor="contact-company" className="form-label">
                      Company / Organization (Optional)
                    </label>
                    <input
                      type="text"
                      id="contact-company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Your Enterprise / Startup"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-service" className="form-label">
                      Service Required <span className="required-star">*</span>
                    </label>
                    <select
                      id="contact-service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className={`form-input form-select ${errors.service ? 'input-error' : ''}`}
                      required
                    >
                      <option value="">Select Primary Service...</option>
                      {Object.values(SERVICES_DATA).map((s) => (
                        <option key={s.key} value={s.title}>
                          {s.title}
                        </option>
                      ))}
                    </select>
                    {errors.service && <span className="field-error-msg">{errors.service}</span>}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="contact-budget" className="form-label">
                    Estimated Timeline / Budget
                  </label>
                  <select
                    id="contact-budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="form-input form-select"
                  >
                    <option value="Flexible / Consultation">Flexible / Need Architecture Consultation</option>
                    <option value="Under ₹50,000 / MVP Prototype">Under ₹50,000 / Quick Prototype</option>
                    <option value="₹50,000 – ₹1,50,000 / Full Solution">₹50,000 – ₹1,50,000 / Full Production Build</option>
                    <option value="₹1,50,000+ / Enterprise System">₹1,50,000+ / Multi-Module Enterprise Platform</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="contact-message" className="form-label">
                    Project Description & Requirements <span className="required-star">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    className={`form-input form-textarea ${errors.message ? 'input-error' : ''}`}
                    placeholder="Describe your technical vision, desired deliverables, target users, or key constraints..."
                    required
                  ></textarea>
                  {errors.message && <span className="field-error-msg">{errors.message}</span>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-gold form-submit-btn"
                  id="contact-submit-btn"
                >
                  {isSubmitting ? (
                    <span>Transmitting Inquiry...</span>
                  ) : (
                    <>
                      <span>Transmit Project Inquiry</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
