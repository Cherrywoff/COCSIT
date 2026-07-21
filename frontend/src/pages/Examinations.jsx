import React from 'react';

export default function Examinations() {
  return (
    <div className="fade-in-section">
      <div style={{ padding: '60px 0', background: 'var(--bg-card)', borderBottom: '1px solid var(--border-color)', marginBottom: '50px', textAlign: 'center', borderRadius: '16px' }}>
        <div className="container">
          <span className="section-tag">Academic Office</span>
          <h2>Examinations & Timetables</h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>Find daily lecture timetables, terminal exam seatings, and official results updates.</p>
        </div>
      </div>

      <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '50px', marginBottom: '60px' }}>
        {/* Timetables & seating list */}
        <div className="grid-2">
          {/* Seating schedules */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <h3>🪑 Hall Seating Plans</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '10px', marginBottom: '20px' }}>
                Inspect classroom hall allocations and roll number seating charts for the current semester exams.
              </p>
            </div>
            <div>
              <a href="/download/timetable-2025-26/Hall Wise Seating Arrangement Summer 2025-2026.pdf" target="_blank" className="btn btn-primary" style={{ fontSize: '0.85rem' }}>
                📂 Download Seating Arrangement PDF
              </a>
            </div>
          </div>

          {/* Exam Schedules */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <h3>📅 Exam Timetables</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '10px', marginBottom: '20px' }}>
                Daily schedules, session timings, and course codes details are published in the official prospectus and calendar logs.
              </p>
            </div>
            <div>
              <a href="/autonomous/PROSPECTUS_2025-26.pdf" target="_blank" className="btn btn-secondary" style={{ fontSize: '0.85rem' }}>
                📖 View Prospectus & Curricular Calendar
              </a>
            </div>
          </div>
        </div>

        {/* Regulations cards */}
        <div className="card">
          <h3>✍️ Rules & Conduct in Exam Halls</h3>
          <div className="grid-3" style={{ marginTop: '20px' }}>
            <div className="card" style={{ padding: '20px', background: 'var(--bg-dark)' }}>
              <strong>1. Timing Rule</strong>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '5px' }}>Students must enter exam hall 20 minutes before the scheduled time.</p>
            </div>
            <div className="card" style={{ padding: '20px', background: 'var(--bg-dark)' }}>
              <strong>2. Hall Tickets</strong>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '5px' }}>Carrying official printed hall tickets and college ID card is mandatory.</p>
            </div>
            <div className="card" style={{ padding: '20px', background: 'var(--bg-dark)' }}>
              <strong>3. Electronics Prohibited</strong>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '5px' }}>Mobile phones, smartwatches, and digital gadgets are strictly banned inside exam rooms.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
