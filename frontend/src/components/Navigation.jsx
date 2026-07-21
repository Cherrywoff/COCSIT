import React, { useState } from 'react';

export default function Navigation({ currentPage, setCurrentPage, branding, user, handleLogout, theme, toggleTheme }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navTo = (page) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top bar above navigation */}
      <div className="top-bar">
        <div className="container top-bar-content">
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <span>📞 Admissions Support: +91 (02382) 229191</span>
            <span>✉️ Email: info@cocsit.org.in</span>
            <span style={{ color: 'var(--accent-amber)', fontWeight: '700' }}>⭐ NAAC Grade: B+ Re-Accredited</span>
          </div>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <span>Affiliation: SRTMU Nanded</span>
            <ul className="top-bar-links">
              <li><a href="http://school.eduera.org.in" target="_blank" rel="noreferrer">Eduera Portal</a></li>
              <li><a href="http://lms.cocsit.org.in" target="_blank" rel="noreferrer">LMS LMS</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Sticky Main Navigation */}
      <header className="navbar">
        <div className="container navbar-container">
          {/* Logo brand */}
          <div className="brand" onClick={() => navTo('home')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img src="/img/logo/25yearsLOGOnew.png" alt="COCSIT Anniversary Logo" style={{ height: '42px', width: 'auto', borderRadius: '4px' }} />
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.1' }}>
              <span style={{ fontSize: '1.25rem', fontWeight: '800', tracking: '-0.03em' }}>{branding ? branding.college_abbreviation : 'COCSIT'}</span>
              <span style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', fontWeight: '600' }}>Latur, MH</span>
            </div>
          </div>

          {/* Nav links links list */}
          <nav>
            <ul className={`nav-links ${mobileMenuOpen ? 'mobile-active' : ''}`} style={{
              display: mobileMenuOpen ? 'flex' : undefined,
              flexDirection: mobileMenuOpen ? 'column' : undefined,
              position: mobileMenuOpen ? 'absolute' : undefined,
              top: mobileMenuOpen ? '100%' : undefined,
              left: mobileMenuOpen ? '0' : undefined,
              width: mobileMenuOpen ? '100%' : undefined,
              background: mobileMenuOpen ? 'var(--bg-dark)' : undefined,
              padding: mobileMenuOpen ? '20px' : undefined,
              borderBottom: mobileMenuOpen ? '1px solid var(--border-color)' : undefined,
              zIndex: '999'
            }}>
              <li className={`nav-item ${currentPage === 'home' ? 'active' : ''}`} onClick={() => navTo('home')}>Home</li>
              
              {/* About dropdown */}
              <li className="nav-item nav-dropdown">
                About Us ▾
                <ul className="dropdown-menu">
                  <li className="dropdown-item" onClick={() => navTo('about')}>College Profile</li>
                  <li className="dropdown-item" onClick={() => navTo('about_res')}>Royal Education Society</li>
                </ul>
              </li>

              {/* Academics dropdown */}
              <li className="nav-item nav-dropdown">
                Academics ▾
                <ul className="dropdown-menu">
                  <li className="dropdown-item" onClick={() => navTo('academics')}>Academics Portal</li>
                  <li className="dropdown-item" onClick={() => navTo('departments')}>Departments</li>
                  <li className="dropdown-item" onClick={() => navTo('courses')}>Degrees offered</li>
                  <li className="dropdown-item" onClick={() => navTo('governance')}>Governing Councils</li>
                </ul>
              </li>

              <li className={`nav-item ${currentPage === 'placements' ? 'active' : ''}`} onClick={() => navTo('placements')}>Placements</li>
              
              {/* Amenities dropdown */}
              <li className="nav-item nav-dropdown">
                Campus Life ▾
                <ul className="dropdown-menu">
                  <li className="dropdown-item" onClick={() => navTo('facilities')}>Facilities</li>
                  <li className="dropdown-item" onClick={() => navTo('gallery')}>Media Gallery</li>
                  <li className="dropdown-item" onClick={() => navTo('newsevents')}>News & Events</li>
                </ul>
              </li>

              {/* Student corner dropdown */}
              <li className="nav-item nav-dropdown">
                Student Corner ▾
                <ul className="dropdown-menu">
                  <li className="dropdown-item" onClick={() => navTo('studentcorner')}>Portal Access</li>
                  <li className="dropdown-item" onClick={() => navTo('examinations')}>Examinations</li>
                  <li className="dropdown-item" onClick={() => navTo('downloads')}>Syllabus & Forms</li>
                </ul>
              </li>

              {/* NAAC & IQAC dropdown */}
              <li className="nav-item nav-dropdown">
                Accreditations ▾
                <ul className="dropdown-menu">
                  <li className="dropdown-item" onClick={() => navTo('naac')}>NAAC Hub</li>
                  <li className="dropdown-item" onClick={() => navTo('iqac')}>IQAC Cell</li>
                  <li className="dropdown-item" onClick={() => navTo('research')}>Research Center</li>
                </ul>
              </li>

              <li className={`nav-item ${currentPage === 'contact' ? 'active' : ''}`} onClick={() => navTo('contact')}>Contact</li>

              {user ? (
                <>
                  <li className={`nav-item ${currentPage === 'dashboard' ? 'active' : ''}`} onClick={() => navTo('dashboard')}>Dashboard</li>
                  <li>
                    <button className="btn btn-secondary" onClick={handleLogout} style={{ padding: '6px 14px', fontSize: '0.85rem' }}>Logout</button>
                  </li>
                </>
              ) : (
                <li onClick={() => navTo('login')}>
                  <button className="btn btn-primary" style={{ padding: '8px 20px', fontSize: '0.85rem' }}>Portal Login</button>
                </li>
              )}

              {/* Light/Dark Toggle */}
              <li>
                <button className="theme-toggle-btn" onClick={toggleTheme} title="Switch Visual Theme" style={{ marginLeft: '10px' }}>
                  {theme === 'dark' ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                  )}
                </button>
              </li>
            </ul>
          </nav>

          {/* Hamburger Menu Icon */}
          <button className="theme-toggle-btn" style={{ display: 'none' }} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          </button>
        </div>
      </header>

      {/* CSS style overrides for mobile menus */}
      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 1024px) {
          .navbar button.theme-toggle-btn[style*="display: none"] {
            display: flex !important;
          }
          .nav-links {
            display: none;
          }
        }
      `}} />
    </>
  );
}
