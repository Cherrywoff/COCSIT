import React, { useState } from 'react';

export default function Facilities({ masterContent }) {
  const [tab, setTab] = useState('central');

  return (
    <div className="fade-in-section">
      <div style={{ padding: '60px 0', background: 'var(--bg-card)', borderBottom: '1px solid var(--border-color)', marginBottom: '50px', textAlign: 'center', borderRadius: '16px' }}>
        <div className="container">
          <span className="section-tag">Campus Amenities</span>
          <h2>Academic Infrastructure & Living Facilities</h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>Explore classroom technology, computing labs, reading libraries, and girls' hostel details.</p>
        </div>
      </div>

      <div className="container" style={{ marginBottom: '60px' }}>
        {/* Navigation tabs */}
        <div style={{ display: 'flex', gap: '15px', marginBottom: '35px', justifyContent: 'center' }}>
          <button className={`btn ${tab === 'central' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setTab('central')}>Central Facilities</button>
          <button className={`btn ${tab === 'hostel' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setTab('hostel')}>Girls' Hostel</button>
          <button className={`btn ${tab === 'physical' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setTab('physical')}>Architectural Assets</button>
        </div>

        {tab === 'central' && (
          <div>
            <h3 style={{ marginBottom: '25px', textAlign: 'center' }}>Central Learning Infrastructures</h3>
            <div className="grid-3">
              {masterContent && masterContent.central_facilities ? (
                masterContent.central_facilities.facilities.map((f, idx) => (
                  <div key={idx} className="card" style={{ borderTop: '4px solid var(--accent-indigo)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <h4 style={{ color: 'var(--text-primary)', margin: '0' }}>{f.name}</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.6' }}>{f.desc}</p>
                  </div>
                ))
              ) : (
                <p style={{ color: 'var(--text-secondary)', textAlign: 'center', gridColumn: '1/-1' }}>Loading central facilities...</p>
              )}
            </div>
          </div>
        )}

        {tab === 'hostel' && (
          <div className="grid-2" style={{ gridTemplateColumns: '2fr 1fr', alignItems: 'stretch' }}>
            {/* Description */}
            <div className="card">
              <span className="section-tag">Hostel Profile</span>
              <h3 style={{ marginBottom: '20px' }}>Residential Girls' Hostel Campus</h3>
              {masterContent && masterContent.girls_hostel ? (
                masterContent.girls_hostel.details.map((p, idx) => (
                  <p key={idx} style={{ marginBottom: '15px', color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.7' }}>{p}</p>
                ))
              ) : (
                <p style={{ color: 'var(--text-secondary)' }}>The girls' hostel is situated inside the secure campus grounds, providing accommodation for outstation students.</p>
              )}
            </div>

            {/* Rules list */}
            <div className="card" style={{ borderLeft: '4px solid var(--accent-rose)' }}>
              <h4 style={{ marginBottom: '20px', color: 'var(--accent-rose)' }}>Hostel Features</h4>
              <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.8' }}>
                {masterContent && masterContent.girls_hostel ? (
                  masterContent.girls_hostel.rules.map((r, idx) => (
                    <li key={idx} style={{ marginBottom: '8px' }}>{r}</li>
                  ))
                ) : (
                  <>
                    <li style={{ marginBottom: '8px' }}>24/7 security warden presence.</li>
                    <li style={{ marginBottom: '8px' }}>Wi-Fi network access.</li>
                    <li style={{ marginBottom: '8px' }}>Hot water solar panels installations.</li>
                  </>
                )}
              </ul>
            </div>
          </div>
        )}

        {tab === 'physical' && (
          <div>
            <h3 style={{ marginBottom: '25px', textAlign: 'center' }}>Campus Construction Details</h3>
            <div className="grid-2">
              {masterContent && masterContent.infrastructure ? (
                masterContent.infrastructure.details.map((d, idx) => (
                  <div key={idx} className="card" style={{ padding: '25px', background: 'rgba(0,0,0,0.01)' }}>
                    <p style={{ color: 'var(--text-primary)', fontWeight: '600', fontSize: '0.95rem' }}>✦ {d}</p>
                  </div>
                ))
              ) : (
                <p style={{ color: 'var(--text-secondary)', textAlign: 'center', gridColumn: '1/-1' }}>Loading physical assets list...</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
