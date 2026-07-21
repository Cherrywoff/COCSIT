import React from 'react';

export default function Research() {
  return (
    <div className="fade-in-section">
      <div style={{ padding: '60px 0', background: 'var(--bg-card)', borderBottom: '1px solid var(--border-color)', marginBottom: '50px', textAlign: 'center', borderRadius: '16px' }}>
        <div className="container">
          <span className="section-tag">Academic Innovation</span>
          <h2>Research Centers & Publications</h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>Explore ongoing investigations, publications, collaborations, and advisory committee listings.</p>
        </div>
      </div>

      <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '50px', marginBottom: '60px' }}>
        {/* Research Centers */}
        <div className="grid-2">
          <div className="card" style={{ borderLeft: '4px solid var(--accent-indigo)' }}>
            <h3>🔬 Biotechnology & Microbiology Center</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '10px', lineHeight: '1.6' }}>
              Recognized research laboratory focusing on microbiological assays, plant genetic tissue structures, and biochemical formulations. Guides doctoral and post-graduate scholars.
            </p>
          </div>

          <div className="card" style={{ borderLeft: '4px solid var(--accent-teal)' }}>
            <h3>💻 Computer Science Research Cell</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '10px', lineHeight: '1.6' }}>
              Focuses on machine learning models, database schema optimizations, Linux server administrations, and cloud secure containment infrastructures.
            </p>
          </div>
        </div>

        {/* Committee & PDF Link */}
        <div className="card" style={{ padding: '40px' }} className="grid-2">
          <div>
            <span className="section-tag">Governance</span>
            <h3>Research Advisory Committee</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '10px' }}>
              The Research Advisory Committee oversees approvals, reviews candidate applications, tracks publishing standards, and coordinates funding grants.
            </p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <a href="/autonomous/Research%20Committee-%202025-26.pdf" target="_blank" className="btn btn-primary">
              📂 Download Research Committee PDF (2025-26)
            </a>
          </div>
        </div>

        {/* Publications & Patents */}
        <div className="grid-2">
          <div className="card">
            <h3>📄 Faculty Publications (Journal Papers)</h3>
            <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '15px', lineHeight: '1.7' }}>
              <li style={{ marginBottom: '12px' }}>
                <strong>“Security frameworks in cloud database containers”</strong><br />
                Published by Dr. N. S. Zulpe in Global Computing Review, 2025.
              </li>
              <li style={{ marginBottom: '12px' }}>
                <strong>“Microbial assays of fungal pathology in local oilseeds”</strong><br />
                Published by Dr. R. S. Awasthi in Applied Biotech Journal, 2026.
              </li>
            </ul>
          </div>

          <div className="card">
            <h3>💡 Intellectual Patents & Collaborations</h3>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '15px', fontStyle: 'italic' }}>
              ⚠️ Institutional patent filings and industrial collaborations data are currently under review.
              <p style={{ marginTop: '10px', color: 'var(--text-secondary)' }}><em>[Content to be updated by research cell coordinators soon]</em></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
