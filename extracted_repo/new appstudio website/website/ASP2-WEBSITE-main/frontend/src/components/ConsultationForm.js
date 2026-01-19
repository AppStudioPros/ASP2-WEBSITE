import React, { useState } from 'react';
import './ConsultationForm.css';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || '';

function ConsultationForm({ url }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch(`${BACKEND_URL}/api/consultation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, url }),
      });

      if (!response.ok) throw new Error('Failed to submit');

      setSubmitted(true);
    } catch (err) {
      setError('Failed to submit. Please try again.');
    }
  };

  if (submitted) {
    return (
      <div className="consultation-section card" data-testid="consultation-form">
        <div className="success-message">
          <h3>Thank You!</h3>
          <p>We've received your consultation request. Our team will contact you within 24 hours to discuss how we can help transform your website.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="consultation-section card" data-testid="consultation-form">
      <h3>Get Your Free Consultation</h3>
      <p className="consultation-description">
        Ready to transform your website? Let's discuss how App Studio Pro can help you achieve these improvements.
        No hard sales, just real talk with our expert team.
      </p>
      <form onSubmit={handleSubmit} className="consultation-form">
        <div className="form-row">
          <div className="form-field">
            <label>Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              data-testid="input-name"
            />
          </div>
          <div className="form-field">
            <label>Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              data-testid="input-email"
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-field">
            <label>Phone *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              data-testid="input-phone"
            />
          </div>
          <div className="form-field">
            <label>Company *</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
              data-testid="input-company"
            />
          </div>
        </div>
        <div className="form-field">
          <label>Message (Optional)</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            placeholder="Tell us about your goals..."
            data-testid="input-message"
          />
        </div>
        {error && <p className="error-text">{error}</p>}
        <button type="submit" className="submit-button" data-testid="submit-button">
          Request Free Consultation
        </button>
        <p className="form-note">MOCKED: Email notifications not configured yet</p>
      </form>
    </div>
  );
}

export default ConsultationForm;
