import React from 'react';

export default function AboutRes({ resInfo }) {
  return (
    <div className="fade-in-section">
      {/* Page Header Banner */}
      <div style={{ padding: '60px 0', background: 'var(--bg-card)', borderBottom: '1px solid var(--border-color)', marginBottom: '50px', textAlign: 'center', borderRadius: '16px' }}>
        <div className="container">
          <span className="section-tag">Governing Society</span>
          <h2>Royal Education Society, Latur</h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>Learn about the values, visionaries, and historical development of the Royal Education Society.</p>
        </div>
      </div>

      <div className="container card" style={{ padding: '50px', maxWidth: '900px', margin: '0 auto 60px' }}>
        <h3 style={{ marginBottom: '25px', color: 'var(--accent-indigo)' }}>Society Profile & History</h3>
        
        <div style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.8' }}>
          {resInfo ? (
            resInfo.paragraphs.map((p, idx) => (
              <p key={idx} style={{ marginBottom: '20px' }}>{p}</p>
            ))
          ) : (
            <p>Loading society history details...</p>
          )}
        </div>
      </div>
    </div>
  );
}
