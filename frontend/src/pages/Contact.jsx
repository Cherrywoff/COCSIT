import React, { useState } from 'react';

export default function Contact() {
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formMsg, setFormMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMsg("Thank you! Your academic inquiry has been logged by the admissions desk.");
    setFormName('');
    setFormEmail('');
    setFormMsg('');
  };

  return (
    <div className="fade-in-section">
      <div style={{ padding: '60px 0', background: 'var(--bg-card)', borderBottom: '1px solid var(--border-color)', marginBottom: '50px', textAlign: 'center', borderRadius: '16px' }}>
        <div className="container">
          <span className="section-tag">Reach Us</span>
          <h2>Campus Directory & Inquiry Desk</h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>Contact our admissions officer, find department telephone extensions, or submit a request.</p>
        </div>
      </div>

      <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '50px', marginBottom: '60px' }}>
        <div className="grid-2">
          {/* Directories */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            <div className="card">
              <h3>📍 Main Campus Location</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '10px', lineHeight: '1.7' }}>
                Royal Education Society's<br />
                <strong>College of Computer Science & Information Technology</strong><br />
                Ambajogai Road, Latur - 413531,<br />
                Maharashtra, India.
              </p>
            </div>

            <div className="card">
              <h3>📞 Directory Hotline Contacts</h3>
              <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '10px', lineHeight: '1.8' }}>
                <li><strong>Admissions Office:</strong> +91 (02382) 229191</li>
                <li><strong>Principal Office Secretariat:</strong> +91 (02382) 229192</li>
                <li><strong>Training & Placements Cell (TPO):</strong> +91 (02382) 229193</li>
                <li><strong>Central Library desk:</strong> +91 (02382) 229194</li>
              </ul>
            </div>

            <div className="card">
              <h3>⏱️ Office Working Hours</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '10px' }}>
                • Monday to Saturday: <strong>09:30 AM to 05:30 PM</strong><br />
                • Sunday: Closed (Holiday)
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="card">
            <h3 style={{ marginBottom: '20px' }}>Send Academic Inquiry</h3>
            {successMsg && <div style={{ color: 'var(--accent-teal)', background: 'rgba(13,148,136,0.05)', border: '1px solid rgba(13,148,136,0.1)', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '0.9rem' }}>{successMsg}</div>}
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input type="text" className="form-input" value={formName} onChange={e => setFormName(e.target.value)} placeholder="e.g. Ramesh Deshpande" required />
              </div>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input type="email" className="form-input" value={formEmail} onChange={e => setFormEmail(e.target.value)} placeholder="e.g. ramesh@gmail.com" required />
              </div>
              <div className="form-group">
                <label className="form-label">Inquiry Description</label>
                <textarea className="form-input" style={{ minHeight: '120px', resize: 'vertical' }} value={formMsg} onChange={e => setFormMsg(e.target.value)} placeholder="Specify details regarding CET registrations or course criteria..." required></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Submit Inquiry Form</button>
            </form>
          </div>
        </div>

        {/* Map */}
        <div className="card" style={{ padding: '20px', height: '350px', overflow: 'hidden' }}>
          <iframe 
            title="COCSIT Campus Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3785.1235!2d76.5432!3d18.4123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDI0JzQ0LjQiTiA3NuwzMiczNS41IkU!5e0!3m2!1sen!2sin!4v1620000000000" 
            width="100%" 
            height="100%" 
            style={{ border: 'none', borderRadius: '12px' }} 
            allowFullScreen="" 
            loading="lazy">
          </iframe>
        </div>
      </div>
    </div>
  );
}
