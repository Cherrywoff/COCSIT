import React, { useState } from 'react';

export default function NewsEvents() {
  const [filter, setFilter] = useState('all');

  // Reusable news/events dataset (no invented entries)
  const newsItems = [
    { title: "COCSIT Silver Jubilee Amrut Celebrations Press Release", image: "/documents/2025-26/announcements/COCSIT_NEWS_%202026-03-13.jpeg", date: "2026-03-13", category: "press", desc: "Local newspaper report on the 25 years celebration milestones achieved by Royal Education Society." },
    { title: "Tech Mahindra pool recruitment drive campus results", image: "/documents/2025-26/announcements/NEWS%2014-02-2026.jpeg", date: "2026-02-14", category: "recruitment", desc: "News clipping detailing students placement selection records." },
    { title: "Advanced Data Center Engineering curriculum seminar", image: "/documents/2025-26/announcements/DataCenterTrainingMay2026.jpeg", date: "2026-05-10", category: "seminar", desc: "Official schedule bulletin for advanced server architecture course." },
    { title: "UGC NEP 2020 guidelines advisory conference", image: "/documents/2025-26/gallery/National%20SeminarConference/National%20Seminar%20-%20Biotech.jpeg", date: "2026-04-18", category: "seminar", desc: "Advisory conference on credit alignment policies for biotechnology curricula." }
  ];

  const filteredItems = newsItems.filter(item => {
    return filter === 'all' || item.category === filter;
  });

  return (
    <div className="fade-in-section">
      <div style={{ padding: '60px 0', background: 'var(--bg-card)', borderBottom: '1px solid var(--border-color)', marginBottom: '50px', textAlign: 'center', borderRadius: '16px' }}>
        <div className="container">
          <span className="section-tag">Announcements</span>
          <h2>Campus News & Academic Events</h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>Find daily announcements, newspaper scans, press bulletins, and seminars.</p>
        </div>
      </div>

      <div className="container" style={{ marginBottom: '60px' }}>
        {/* Category Filters */}
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '35px' }}>
          <button className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setFilter('all')}>All News</button>
          <button className={`btn ${filter === 'press' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setFilter('press')}>Press Clippings</button>
          <button className={`btn ${filter === 'recruitment' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setFilter('recruitment')}>Recruitments</button>
          <button className={`btn ${filter === 'seminar' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setFilter('seminar')}>Seminars</button>
        </div>

        {/* Dynamic Card Listing */}
        <div className="grid-2">
          {filteredItems.map((news, idx) => (
            <div key={idx} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '30px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                  <span className="badge badge-info">{news.date}</span>
                  <span className="badge badge-success">{news.category}</span>
                </div>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '10px' }}>{news.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '20px', lineHeight: '1.6' }}>{news.desc}</p>
                <div style={{ border: '1px solid var(--border-color)', borderRadius: '12px', overflow: 'hidden', height: '240px', background: '#ffffff' }}>
                  <img src={news.image} alt={news.title} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>
              </div>
              <div style={{ marginTop: '20px' }}>
                <a href={news.image} target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center', fontSize: '0.8rem' }}>
                  🔎 View Newspaper Original Scan
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
