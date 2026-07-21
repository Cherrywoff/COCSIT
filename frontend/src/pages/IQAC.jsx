import React from 'react';

export default function IQAC() {
  const committee = [
    { name: "Dr. R. S. Awasthi", role: "Chairman (Principal)" },
    { name: "Dr. N. S. Zulpe", role: "IQAC Coordinator" },
    { name: "Mr. L. M. Patil", role: "Management Representative" },
    { name: "Dr. V. V. Bhosle", role: "Teacher Member" },
    { name: "Prof. Rajesh Patil", role: "Teacher Member" }
  ];

  return (
    <div className="fade-in-section">
      <div style={{ padding: '60px 0', background: 'var(--bg-card)', borderBottom: '1px solid var(--border-color)', marginBottom: '50px', textAlign: 'center', borderRadius: '16px' }}>
        <div className="container">
          <span className="section-tag">Quality Assurance</span>
          <h2>Internal Quality Assurance Cell (IQAC)</h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>Learn about academic benchmarks, audit records, cell meetings, and committee lists.</p>
        </div>
      </div>

      <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '50px', marginBottom: '60px' }}>
        {/* IQAC Objectives */}
        <div className="grid-2">
          <div className="card">
            <h3 style={{ color: 'var(--accent-indigo)' }}>🎯 IQAC Objectives</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '15px', lineHeight: '1.7' }}>
              The prime objective of the IQAC is to develop a system for conscious, consistent, and catalytic improvements in the overall academic and administrative performance of the institution. We audit curriculum programs and collect feedback questionnaires from students.
            </p>
          </div>

          <div className="card">
            <h3 style={{ color: 'var(--accent-teal)' }}>📋 Key Cell Functions</h3>
            <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '15px' }}>
              <li style={{ marginBottom: '8px' }}>Development of quality benchmarks for academic activities.</li>
              <li style={{ marginBottom: '8px' }}>Facilitating a learner-centric environment conducive to quality training.</li>
              <li style={{ marginBottom: '8px' }}>Collection and analysis of feedback from students and parents.</li>
              <li style={{ marginBottom: '8px' }}>Preparation of the Annual Quality Assurance Report (AQAR).</li>
            </ul>
          </div>
        </div>

        {/* Committee list - Cards, no tables */}
        <div>
          <h3 style={{ marginBottom: '25px', textAlign: 'center' }}>IQAC Cell Committee (A.Y. 2025-26)</h3>
          <div className="grid-3">
            {committee.map((mem, idx) => (
              <div key={idx} className="card" style={{ padding: '20px', textAlign: 'center' }}>
                <h4>{mem.name}</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--accent-amber)', fontWeight: '700', marginTop: '5px' }}>{mem.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Minutes of meetings */}
        <div className="card" style={{ padding: '40px', textAlign: 'center' }}>
          <h3 style={{ marginBottom: '15px' }}>IQAC Reports & Minutes Downloads</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '25px', maxWidth: '650px', margin: '0 auto 25px' }}>
            Check consolidated institutional development plan blueprints and self disclosures compiled by the quality assurance cell.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
            <a href="/autonomous/IDP_Consolated.pdf" target="_blank" className="btn btn-primary">
              📂 Consolidated IDP Report PDF
            </a>
            <a href="/autonomous/HEI Public Self Disclosure.pdf" target="_blank" className="btn btn-secondary">
              📂 Public Self Disclosure PDF
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
