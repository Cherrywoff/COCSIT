import React from 'react';

export default function StudentCorner({ setCurrentPage }) {
  return (
    <div className="fade-in-section">
      <div style={{ padding: '60px 0', background: 'var(--bg-card)', borderBottom: '1px solid var(--border-color)', marginBottom: '50px', textAlign: 'center', borderRadius: '16px' }}>
        <div className="container">
          <span className="section-tag">Student Hub</span>
          <h2>Quick Portal Actions & Regulations</h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>Log into your dashboard, check hostel features, study room codes, or read safety policies.</p>
        </div>
      </div>

      <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '50px', marginBottom: '60px' }}>
        {/* Core Portals */}
        <div className="grid-3">
          {/* LMS */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>🖥️</div>
              <h4>E-Learning LMS</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '5px' }}>
                Log into the digital classroom portal to access syllabus lessons, slide decks, and submit assignments.
              </p>
            </div>
            <div style={{ marginTop: '20px' }}>
              <a href="http://lms.cocsit.org.in" target="_blank" rel="noreferrer" className="btn btn-primary" style={{ padding: '6px 14px', fontSize: '0.8rem' }}>
                🔗 Open LMS Portal
              </a>
            </div>
          </div>

          {/* Eduera */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>📊</div>
              <h4>Eduera Staff Portal</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '5px' }}>
                Staff and faculty members can log in to upload marks sheet records and log lecture topics.
              </p>
            </div>
            <div style={{ marginTop: '20px' }}>
              <a href="http://school.eduera.org.in" target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ padding: '6px 14px', fontSize: '0.8rem' }}>
                🔗 Staff Login Link
              </a>
            </div>
          </div>

          {/* Internal Dashboard */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>🔒</div>
              <h4>Grades & Attendance</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '5px' }}>
                Log into your student portal account to check daily lecture attendance percentages, report cards, and fees.
              </p>
            </div>
            <div style={{ marginTop: '20px' }}>
              <button className="btn btn-accent" onClick={() => setCurrentPage('login')} style={{ padding: '6px 14px', fontSize: '0.8rem' }}>
                🔑 Sign In Portal
              </button>
            </div>
          </div>
        </div>

        {/* Safety & Anti-Ragging guidelines */}
        <div className="grid-2">
          <div className="card" style={{ borderLeft: '4px solid var(--accent-rose)' }}>
            <h3>📢 Safety & Anti-Ragging Guidelines</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '12px', lineHeight: '1.7' }}>
              COCSIT Campus maintains a strictly zero-tolerance policy against any form of ragging or harassment. Offenders are subject to suspension and legal actions under state police guidelines.
            </p>
            <div style={{ marginTop: '15px', display: 'flex', gap: '15px' }}>
              <a href="/documents/2025-26/Undertaking.pdf" target="_blank" style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--accent-rose)' }}>
                📄 Read Anti-Ragging Handbook PDF →
              </a>
            </div>
          </div>

          <div className="card" style={{ borderLeft: '4px solid var(--accent-teal)' }}>
            <h3>📞 Student Grievance & Complaint Cell</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '12px', lineHeight: '1.7' }}>
              Students can report academic grievances, hostel issues, or facilities complaints to the cell coordinators. All complaints remain confidential.
            </p>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '10px' }}>
              ✉️ Complaint Coordinator: <strong>grievance@cocsit.org.in</strong>
            </p>
          </div>
        </div>

        {/* Student Clubs and Hostels */}
        <div className="grid-2">
          <div className="card">
            <h3>🏢 Residential Hostel Guide</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '10px', lineHeight: '1.6' }}>
              Lodging facilities are available for girls inside the secure campus perimeters. Read rules, fees, and registration steps under the Facilities tab.
            </p>
            <button className="btn btn-secondary" style={{ marginTop: '15px', padding: '6px 14px', fontSize: '0.8rem' }} onClick={() => setCurrentPage('facilities')}>
              View Hostel Rules
            </button>
          </div>

          <div className="card">
            <h3>🎭 Student Clubs & Associations</h3>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '10px', fontStyle: 'italic' }}>
              ⚠️ Roster of cultural clubs, NSS activities, and coding clubs is currently under preparation.
              <p style={{ marginTop: '10px', color: 'var(--text-secondary)' }}><em>[Content to be updated by student councils soon]</em></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
