import React from 'react';

export default function NAAC() {
  const criteria = [
    { num: "I", name: "Curricular Aspects", desc: "Syllabus mapping, Choice Based Credit System credit allocation, and feedback reports." },
    { num: "II", name: "Teaching-Learning and Evaluation", desc: "Student enrollment ratios, faculty qualifications, and examination logs." },
    { num: "III", name: "Research, Innovations and Extension", desc: "Doctoral advisory cell, journal publications, and intellectual patents." },
    { num: "IV", name: "Infrastructure and Learning Resources", desc: "Library textbooks count, science labs, computing terminals, and classrooms." }
  ];

  return (
    <div className="fade-in-section">
      <div style={{ padding: '60px 0', background: 'var(--bg-card)', borderBottom: '1px solid var(--border-color)', marginBottom: '50px', textAlign: 'center', borderRadius: '16px' }}>
        <div className="container">
          <span className="section-tag">Quality Assessment</span>
          <h2>NAAC Re-accreditation Hub</h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>View NAAC Cycle certificates, Self Study Reports (SSR), and criteria-wise indicators.</p>
        </div>
      </div>

      <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '50px', marginBottom: '60px' }}>
        
        {/* Status */}
        <div className="grid-2" style={{ alignItems: 'center' }}>
          <div>
            <span className="section-tag" style={{ color: 'var(--accent-teal)' }}>Sustaining Standards</span>
            <h3>NAAC Re-Accredited B+ Status</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.7', marginBottom: '20px' }}>
              The National Assessment and Accreditation Council (NAAC) has evaluated the academic quality, laboratory facilities, library textbooks repository, and organizational transparency of COCSIT, re-accrediting the institute with **B+ Grade**.
            </p>
            <div style={{ display: 'flex', gap: '15px' }}>
              <a href="/autonomous/HEI Public Self Disclosure.pdf" target="_blank" className="btn btn-primary">
                📂 View Self Disclosure PDF
              </a>
            </div>
          </div>

          <div className="card" style={{ padding: '30px' }}>
            <h4 style={{ marginBottom: '15px' }}>Accreditation Criteria Indicators</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {criteria.map((crit, idx) => (
                <div key={idx} style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  <strong>Criterion {crit.num}:</strong> {crit.name}
                  <p style={{ fontSize: '0.75rem', marginTop: '2px' }}>{crit.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Certificates */}
        <div>
          <h3 style={{ marginBottom: '25px', textAlign: 'center' }}>Official NAAC Certificates</h3>
          <div className="grid-2">
            <div className="card" style={{ padding: '20px', textAlign: 'center' }}>
              <h4 style={{ marginBottom: '15px' }}>NAAC Cycle-I Accreditation</h4>
              <div style={{ border: '1px solid var(--border-color)', borderRadius: '12px', overflow: 'hidden', height: '320px', background: '#ffffff' }}>
                <img src="/download/naac/NAAC%20Cycle-I%20Certificate.jpg" alt="NAAC Cycle I Certificate" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>
            </div>

            <div className="card" style={{ padding: '20px', textAlign: 'center' }}>
              <h4 style={{ marginBottom: '15px' }}>NAAC Cycle-II Accreditation</h4>
              <div style={{ border: '1px solid var(--border-color)', borderRadius: '12px', overflow: 'hidden', height: '320px', background: '#ffffff' }}>
                <img src="/download/naac/NAAC_Cycle_II_Certificate.jpeg" alt="NAAC Cycle II Certificate" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
