import React, { useState } from 'react';

export default function Downloads() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  // Reusable structured download files dataset (no fake entries)
  const filesDataset = [
    { title: "Official Academic Session Calendar 2025-26", category: "calendar", size: "324 KB", path: "/documents/2025-26/academic_calendar_2025_26.pdf", date: "2025-04-15" },
    { title: "BCA & BBA Program Course Fees Structure Proposal", category: "fees", size: "210 KB", path: "/download/BCA%20FY%20&%20BBA%20FY%20Fees%20Structure%202025-26.pdf", date: "2025-04-12" },
    { title: "Extension of Approval (EoA) Report 2025-26", category: "regulatory", size: "1.2 MB", path: "/autonomous/LoA_EoA_BCA_BBA/BCA BBA EoA Report 2025-26.PDF", date: "2025-04-10" },
    { title: "Institutional Financial Audit Report 2024-25", category: "report", size: "850 KB", path: "/autonomous/Audit/Audit Report 2024-2025.pdf", date: "2025-04-05" },
    { title: "General College Admission Prospectus Handbook 2025-26", category: "prospectus", size: "4.5 MB", path: "/autonomous/PROSPECTUS_2025-26.pdf", date: "2025-03-10" },
    { title: "NAAC Cycle-I Institutional Accreditation Certificate", category: "naac", size: "380 KB", path: "/download/naac/NAAC%20Cycle-I%20Certificate.jpg", date: "2015-09-12" },
    { title: "NAAC Cycle-II Institutional Accreditation Certificate", category: "naac", size: "520 KB", path: "/download/naac/NAAC_Cycle_II_Certificate.jpeg", date: "2021-12-28" },
    { title: "Institutional Development Plan Consolidated Report", category: "iqac", size: "1.4 MB", path: "/autonomous/IDP_Consolated.pdf", date: "2025-05-18" },
    { title: "HEI Public Self Disclosure Regulatory Guidelines", category: "regulatory", size: "410 KB", path: "/autonomous/HEI Public Self Disclosure.pdf", date: "2025-05-20" },
    { title: "Fire Safety Audit Compliance Certificate", category: "regulatory", size: "280 KB", path: "/autonomous/Fire Safety Certificate.pdf", date: "2025-06-11" },
    { title: "Undertaking by HEI on Self Disclosure Compliance", category: "regulatory", size: "145 KB", path: "/documents/2025-26/Undertaking.pdf", date: "2025-05-22" }
  ];

  const filteredFiles = filesDataset.filter(f => {
    const matchesSearch = f.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || f.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="fade-in-section">
      <div style={{ padding: '60px 0', background: 'var(--bg-card)', borderBottom: '1px solid var(--border-color)', marginBottom: '50px', textAlign: 'center', borderRadius: '16px' }}>
        <div className="container">
          <span className="section-tag">Document Center</span>
          <h2>Prospectus, Syllabus & Circular Downloads</h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>Find and download official PDF handbooks, audits, calendars, and accreditation certificates.</p>
        </div>
      </div>

      <div className="container" style={{ marginBottom: '60px' }}>
        {/* Search and Category Filters */}
        <div className="card" style={{ padding: '30px', marginBottom: '40px' }}>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ flex: '1', minWidth: '280px' }}>
              <input type="text" className="form-input" placeholder="🔍 Search documents by keyword..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button className={`btn ${filterCategory === 'all' ? 'btn-primary' : 'btn-secondary'}`} style={{ padding: '6px 12px', fontSize: '0.8rem' }} onClick={() => setFilterCategory('all')}>All Docs</button>
              <button className={`btn ${filterCategory === 'calendar' ? 'btn-primary' : 'btn-secondary'}`} style={{ padding: '6px 12px', fontSize: '0.8rem' }} onClick={() => setFilterCategory('calendar')}>Calendar</button>
              <button className={`btn ${filterCategory === 'fees' ? 'btn-primary' : 'btn-secondary'}`} style={{ padding: '6px 12px', fontSize: '0.8rem' }} onClick={() => setFilterCategory('fees')}>Fees</button>
              <button className={`btn ${filterCategory === 'prospectus' ? 'btn-primary' : 'btn-secondary'}`} style={{ padding: '6px 12px', fontSize: '0.8rem' }} onClick={() => setFilterCategory('prospectus')}>Prospectus</button>
              <button className={`btn ${filterCategory === 'naac' ? 'btn-primary' : 'btn-secondary'}`} style={{ padding: '6px 12px', fontSize: '0.8rem' }} onClick={() => setFilterCategory('naac')}>NAAC</button>
              <button className={`btn ${filterCategory === 'iqac' ? 'btn-primary' : 'btn-secondary'}`} style={{ padding: '6px 12px', fontSize: '0.8rem' }} onClick={() => setFilterCategory('iqac')}>IQAC</button>
              <button className={`btn ${filterCategory === 'regulatory' ? 'btn-primary' : 'btn-secondary'}`} style={{ padding: '6px 12px', fontSize: '0.8rem' }} onClick={() => setFilterCategory('regulatory')}>Regulatory</button>
            </div>
          </div>
        </div>

        {/* Download Cards - Reusable data-driven list */}
        <div className="grid-3">
          {filteredFiles.map((file, idx) => (
            <div key={idx} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '30px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                  <span className="badge badge-info">{file.category}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{file.date}</span>
                </div>
                <h4 style={{ fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '8px' }}>{file.title}</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Size: {file.size} | PDF Document</p>
              </div>
              <div style={{ marginTop: '25px' }}>
                <a href={file.path} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: '0.8rem' }}>
                  📥 Download PDF
                </a>
              </div>
            </div>
          ))}
          {filteredFiles.length === 0 && <p style={{ color: 'var(--text-secondary)', textAlign: 'center', gridColumn: '1/-1' }}>No matching documents found.</p>}
        </div>
      </div>
    </div>
  );
}
