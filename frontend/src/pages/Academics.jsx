import React from 'react';

export default function Academics() {
  return (
    <div className="fade-in-section">
      <div style={{ padding: '60px 0', background: 'var(--bg-card)', borderBottom: '1px solid var(--border-color)', marginBottom: '50px', textAlign: 'center', borderRadius: '16px' }}>
        <div className="container">
          <span className="section-tag">Learning Experience</span>
          <h2>Academic Policies & Regulations</h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>Read about our teaching methodologies, academic standards, attendance policies, and curriculum calendars.</p>
        </div>
      </div>

      <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '50px', marginBottom: '60px' }}>
        <div className="grid-2">
          {/* Section 1: Methodology */}
          <div className="card">
            <h3 style={{ color: 'var(--accent-indigo)' }}>🎓 Teaching Methodology</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '15px' }}>
              At COCSIT, we embrace modern learning paradigms aligned with the National Education Policy (NEP 2020). We emphasize hands-on programming labs, case studies, guest seminars from corporate leaders, and group projects to ensure learners develop problem-solving competencies.
            </p>
            <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '15px' }}>
              <li style={{ marginBottom: '8px' }}>NEP 2020 credit-based choice system framework.</li>
              <li style={{ marginBottom: '8px' }}>Practical computer lab exercises for every computing course.</li>
              <li style={{ marginBottom: '8px' }}>Regular internal evaluations and coding assignments.</li>
            </ul>
          </div>

          {/* Section 2: Attendance Policies */}
          <div className="card">
            <h3 style={{ color: 'var(--accent-rose)' }}>📢 Attendance & Exam Regulations</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '15px' }}>
              Academic success demands consistency. The college enforces strict regulations to ensure attendance during lectures and timely completion of academic reviews.
            </p>
            <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '15px' }}>
              <li style={{ marginBottom: '8px' }}><strong>Minimum 75% attendance</strong> is mandatory in all classes to be eligible to appear for terminal examinations.</li>
              <li style={{ marginBottom: '8px' }}>Medical leaves must be certified by registered officers and submitted within 3 days.</li>
              <li style={{ marginBottom: '8px' }}>Mid-term exams and project submissions are graded as internal credits.</li>
            </ul>
          </div>
        </div>

        {/* Section 3: Downloads */}
        <div className="card" style={{ textAlign: 'center' }}>
          <h3 style={{ marginBottom: '15px' }}>Academic Reference Documents</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '25px', maxWidth: '650px', margin: '0 auto 25px' }}>
            Get the official academic session calendars, regulations notebooks, and handbook folders directly in PDF formats.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
            <a href="/documents/2025-26/academic_calendar_2025_26.pdf" target="_blank" className="btn btn-primary">
              📅 Download Academic Calendar PDF
            </a>
            <a href="/autonomous/PROSPECTUS_2025-26.pdf" target="_blank" className="btn btn-secondary">
              📖 General College Prospectus PDF
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
