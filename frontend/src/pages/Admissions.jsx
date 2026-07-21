import React, { useState } from 'react';

export default function Admissions({ masterContent }) {
  const [activeAdmissionsTab, setActiveAdmissionsTab] = useState('process');

  const importantDates = [
    { event: "MAH-BCA/BBA/B.Sc CET Online Registrations", dates: "March 21 - April 30, 2026", status: "Ongoing" },
    { event: "Merit Cap Round I Seat Selection", dates: "June 15 - June 20, 2026", status: "Upcoming" },
    { event: "Reporting & Verification at Counters", dates: "June 22 - June 28, 2026", status: "Upcoming" }
  ];

  const faqs = [
    { q: "What degrees are run under autonomous status?", a: "All UG computing programs (BCA, B.Sc CS, B.Sc SE, B.Sc DS, BBA) and Master programs (MCA, MBA, M.Sc CS) run under autonomous choice-based credit patterns affiliated with SRTMU Nanded." },
    { q: "Is there any age limit for admission?", a: "No, admissions are strictly merit-driven, governed by eligibility percentages and entrance test scores." }
  ];

  return (
    <div className="fade-in-section">
      <div style={{ padding: '60px 0', background: 'var(--bg-card)', borderBottom: '1px solid var(--border-color)', marginBottom: '50px', textAlign: 'center', borderRadius: '16px' }}>
        <div className="container">
          <span className="section-tag">Admissions Center</span>
          <h2>Enrollment Guidelines & Reservations</h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>Check academic criteria, session timelines, scholarship assistance schemes, and reservations.</p>
        </div>
      </div>

      <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '50px', marginBottom: '60px' }}>
        
        {/* Tab Selectors */}
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className={`btn ${activeAdmissionsTab === 'process' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveAdmissionsTab('process')}>Admissions Process</button>
          <button className={`btn ${activeAdmissionsTab === 'dates' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveAdmissionsTab('dates')}>Timelines & Dates</button>
          <button className={`btn ${activeAdmissionsTab === 'scholarships' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveAdmissionsTab('scholarships')}>Scholarships & Reservations</button>
          <button className={`btn ${activeAdmissionsTab === 'faqs' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveAdmissionsTab('faqs')}>Admissions FAQs</button>
        </div>

        {/* TAB: PROCESS */}
        {activeAdmissionsTab === 'process' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            <div className="grid-2">
              <div className="card">
                <h3>📁 Required Certificates Checklist</h3>
                <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '15px', lineHeight: '1.8' }}>
                  <li>SSC Original Marksheet + 3 Xerox Copies.</li>
                  <li>HSC Original Marksheet + 3 Xerox Copies.</li>
                  <li>School Leaving Certificate / Transfer Certificate (TC) Original.</li>
                  <li>Income Certificate issued by Tahsildar (for scholarships eligibility).</li>
                  <li>Caste certificate & Caste Validity (wherever applicable).</li>
                  <li>Recent Passport size photographs (4 copies).</li>
                </ul>
              </div>

              <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3>💵 Program Fees Structure 2026-27</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '10px', lineHeight: '1.6' }}>
                    Tuition fee details are categorized by degree program. We provide flexible installation terms and accept online transaction checkouts.
                  </p>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '10px' }}>
                    <div>• UG Programs (BCA/BBA/B.Sc): Approx ₹18,000 - ₹24,000 per annum.</div>
                    <div>• PG Programs (M.Sc/MCA): Approx ₹30,000 - ₹45,000 per annum.</div>
                  </div>
                </div>
                <div style={{ marginTop: '20px' }}>
                  <a href="/download/BCA%20FY%20&%20BBA%20FY%20Fees%20Structure%202025-26.pdf" target="_blank" className="btn btn-secondary" style={{ padding: '8px 20px', fontSize: '0.85rem' }}>
                    📂 Download Fee structure PDF
                  </a>
                </div>
              </div>
            </div>

            {/* Registration Steps */}
            <div className="card" style={{ padding: '40px', textAlign: 'center' }}>
              <h3 style={{ marginBottom: '25px' }}>Online Admission Steps</h3>
              <div className="grid-4" style={{ textAlign: 'left' }}>
                <div className="card" style={{ padding: '20px', background: 'var(--bg-dark)' }}>
                  <strong>1. Form Submission</strong>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '5px' }}>Register user profile on Maharashtra CET portal or college site.</p>
                </div>
                <div className="card" style={{ padding: '20px', background: 'var(--bg-dark)' }}>
                  <strong>2. Uploading PDFs</strong>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '5px' }}>Upload digital copy of SSC/HSC marks card and Transfer Certificate.</p>
                </div>
                <div className="card" style={{ padding: '20px', background: 'var(--bg-dark)' }}>
                  <strong>3. Fee Payment</strong>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '5px' }}>Pay application processing fee online using credit card / UPI.</p>
                </div>
                <div className="card" style={{ padding: '20px', background: 'var(--bg-dark)' }}>
                  <strong>4. Seat Confirmation</strong>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '5px' }}>Present hardcopies at college office counter to finalize enrollment.</p>
                </div>
              </div>
              <div style={{ marginTop: '30px' }}>
                <a href="/documents/2026-27/CET-Registration-Notice_-BBA_BCA_BBM_BMS_-CET-2026.pdf" target="_blank" className="btn btn-primary">
                  📝 Fill Online MAH-CET Entrance Form
                </a>
              </div>
            </div>
          </div>
        )}

        {/* TAB: TIMELINES & DATES */}
        {activeAdmissionsTab === 'dates' && (
          <div className="card">
            <h3>Important Admissions Timelines</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '20px' }}>Keep track of deadlines to ensure seats allocation.</p>
            <div className="table-container">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Academic Admission Event</th>
                    <th>Timeline Dates</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {importantDates.map((d, idx) => (
                    <tr key={idx}>
                      <td><strong>{d.event}</strong></td>
                      <td>{d.dates}</td>
                      <td><span className={`badge ${d.status === 'Ongoing' ? 'badge-success' : 'badge-info'}`}>{d.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB: SCHOLARSHIPS & RESERVATIONS */}
        {activeAdmissionsTab === 'scholarships' && (
          <div className="grid-2">
            <div className="card">
              <h3>💰 Government Scholarship Assistance</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '10px', lineHeight: '1.7' }}>
                We assist candidates in registration processing for Government of India Post-Matric Scholarships, Rajarshi Chhatrapati Shahu Maharaj tuition fee concessions, and EBC fee reductions.
              </p>
              <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '15px' }}>
                {masterContent && masterContent.scholarships ? (
                  masterContent.scholarships.details.map((s, idx) => (
                    <li key={idx} style={{ marginBottom: '8px' }}>{s}</li>
                  ))
                ) : (
                  <li>Government welfare concessions for eligible communities.</li>
                )}
              </ul>
            </div>

            <div className="card">
              <h3>📊 Reservation Percentages</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '10px', lineHeight: '1.7' }}>
                Seat allocation reservation guidelines are strictly based on regulations declared by the Higher Education Board, Government of Maharashtra:
              </p>
              <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '15px' }}>
                <li style={{ marginBottom: '6px' }}>SC / ST categories reservation.</li>
                <li style={{ marginBottom: '6px' }}>OBC & VJNT categories reservation.</li>
                <li style={{ marginBottom: '6px' }}>EWS (Economically Weaker Section) reservations.</li>
              </ul>
            </div>
          </div>
        )}

        {/* TAB: FAQS */}
        {activeAdmissionsTab === 'faqs' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {faqs.map((f, idx) => (
              <div key={idx} className="card" style={{ padding: '25px' }}>
                <strong>Q: {f.q}</strong>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '8px' }}>A: {f.a}</p>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
