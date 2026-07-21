import React, { useState } from 'react';

export default function Governance({ masterContent }) {
  const [tab, setTab] = useState('cdc');

  return (
    <div className="fade-in-section">
      <div style={{ padding: '60px 0', background: 'var(--bg-card)', borderBottom: '1px solid var(--border-color)', marginBottom: '50px', textAlign: 'center', borderRadius: '16px' }}>
        <div className="container">
          <span className="section-tag">Governance</span>
          <h2>Governing Councils & Regulatory Cells</h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>Explore the constitution of the College Development Committee (CDC) and autonomous cells.</p>
        </div>
      </div>

      <div className="container" style={{ marginBottom: '60px' }}>
        {/* Navigation tabs */}
        <div style={{ display: 'flex', gap: '15px', marginBottom: '35px', justifyContent: 'center' }}>
          <button className={`btn ${tab === 'cdc' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setTab('cdc')}>College Development Committee (CDC)</button>
          <button className={`btn ${tab === 'committees' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setTab('committees')}>Autonomous Committees</button>
        </div>

        {tab === 'cdc' && (
          <div className="card">
            <h3 style={{ marginBottom: '20px', color: 'var(--accent-indigo)' }}>CDC Council Members</h3>
            <div className="table-container">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Member Name</th>
                    <th>Designation / Board Role</th>
                  </tr>
                </thead>
                <tbody>
                  {masterContent && masterContent.cdc ? (
                    masterContent.cdc.members.map((m, idx) => (
                      <tr key={idx}>
                        <td><strong>{m.name}</strong></td>
                        <td><span className="badge badge-info">{m.designation}</span></td>
                      </tr>
                    ))
                  ) : (
                    <>
                      <tr>
                        <td><strong>Dr. M. R. Patil</strong></td>
                        <td><span className="badge badge-info">President</span></td>
                      </tr>
                      <tr>
                        <td><strong>Mr. L. M. Patil</strong></td>
                        <td><span className="badge badge-info">Member (Management Representative)</span></td>
                      </tr>
                      <tr>
                        <td><strong>Dr. R. S. Awasthi</strong></td>
                        <td><span className="badge badge-info">Member Secretary (Principal)</span></td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === 'committees' && (
          <div>
            <h3 style={{ marginBottom: '25px', textAlign: 'center' }}>Official Regulatory Bodies</h3>
            <div className="grid-2">
              {masterContent && masterContent.committees ? (
                masterContent.committees.list.map((c, idx) => (
                  <div key={idx} className="card" style={{ borderLeft: '4px solid var(--accent-indigo)' }}>
                    <h4 style={{ color: 'var(--accent-indigo)', marginBottom: '8px' }}>{c.name}</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>{c.scope}</p>
                  </div>
                ))
              ) : (
                <p style={{ color: 'var(--text-secondary)' }}>Loading regulatory cells...</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
