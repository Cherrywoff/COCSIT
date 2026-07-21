import React from 'react';

export default function Footer({ setCurrentPage }) {
  return (
    <footer>
      <div className="container footer-grid">
        {/* Column 1: About College */}
        <div className="footer-column">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <img src="/img/logo/25yearsLOGOnew.png" alt="COCSIT Logo" style={{ height: '36px' }} />
            <h3 style={{ margin: '0', fontSize: '1.2rem', color: 'var(--text-primary)' }}>COCSIT Latur</h3>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            College of Computer Science and Information Technology (COCSIT), Latur, is a pioneering educational institute re-accredited NAAC B+ Grade. We run professional courses aligned with NEP 2020.
          </p>
        </div>

        {/* Column 2: Academics */}
        <div className="footer-column">
          <h4>Academics</h4>
          <ul className="footer-links">
            <li><a href="#academics" onClick={() => setCurrentPage('academics')}>Overview</a></li>
            <li><a href="#departments" onClick={() => setCurrentPage('departments')}>Departments</a></li>
            <li><a href="#courses" onClick={() => setCurrentPage('courses')}>Degrees Offered</a></li>
            <li><a href="#governance" onClick={() => setCurrentPage('governance')}>Governing Councils</a></li>
          </ul>
        </div>

        {/* Column 3: Student Links */}
        <div className="footer-column">
          <h4>Student Corner</h4>
          <ul className="footer-links">
            <li><a href="#studentcorner" onClick={() => setCurrentPage('studentcorner')}>Portal logins</a></li>
            <li><a href="#examinations" onClick={() => setCurrentPage('examinations')}>Examinations</a></li>
            <li><a href="#downloads" onClick={() => setCurrentPage('downloads')}>Syllabus & Downloads</a></li>
            <li><a href="#gallery" onClick={() => setCurrentPage('gallery')}>Media Gallery</a></li>
          </ul>
        </div>

        {/* Column 4: Contacts */}
        <div className="footer-column">
          <h4>Contact & Location</h4>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
            📍 Ambajogai Road, Latur - 413531,<br />
            Maharashtra, India.
          </p>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            📞 +91 (02382) 229191<br />
            ✉️ info@cocsit.org.in
          </p>
          <div style={{ marginTop: '15px' }}>
            <a href="https://maps.google.com/?q=COCSIT+Latur" target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ padding: '6px 14px', fontSize: '0.75rem' }}>
              📍 Open Google Maps
            </a>
          </div>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>© 2026 COCSIT College Portal Rebuild. NAAC B+ Grade | AISHE: C-7398. All Rights Reserved.</p>
        <div style={{ display: 'flex', gap: '20px', fontSize: '0.8rem' }}>
          <a href="#terms" onClick={() => setCurrentPage('home')}>Terms of Service</a>
          <a href="#privacy" onClick={() => setCurrentPage('home')}>Privacy Policy</a>
          <a href="#sitemap" onClick={() => setCurrentPage('downloads')}>Sitemap</a>
        </div>
      </div>
    </footer>
  );
}
