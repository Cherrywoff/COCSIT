import React, { useState } from 'react';

export default function About({ principalMessage, chairmanMessage, viceChairmanMessage }) {
  const [activeTab, setActiveTab] = useState('desk');

  const milestones = [
    { year: "2001", event: "Establishment of COCSIT College in Latur with basic BCA courses." },
    { year: "2007", event: "Launch of Microbiology and Biosciences biotechnology wings." },
    { year: "2015", event: "Accredited Cycle-I NAAC review with modern computing laboratory setups." },
    { year: "2021", event: "Re-Accredited Cycle-II NAAC B+ status grade certification." },
    { year: "2024", event: "Autonomous status and Silver Jubilee (25 years) commemoration." }
  ];

  const adminStaff = [
    { name: "Dr. R. S. Awasthi", role: "Principal" },
    { name: "Dr. N. S. Zulpe", role: "Vice-Principal (Computer Science)" },
    { name: "Dr. V. V. Bhosale", role: "Vice-Principal (Computer Application)" },
    { name: "Dr. E. U. Masumdar", role: "Officer on Special Duty (OSD)" },
    { name: "Mr. N. D. Jagtap", role: "Consultant Director" },
    { name: "Mr. P. R. Kawale", role: "Office Superintendent" },
    { name: "Mr. L. K. Dhotre", role: "Librarian" }
  ];

  return (
    <div className="fade-in-section">
      <div style={{ padding: '60px 0', background: 'var(--bg-card)', borderBottom: '1px solid var(--border-color)', marginBottom: '50px', textAlign: 'center', borderRadius: '16px' }}>
        <div className="container">
          <span className="section-tag">Governing Society</span>
          <h2>About COCSIT Latur</h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>Explore college history milestones, leadership board messages, and affiliations.</p>
        </div>
      </div>

      <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '50px', marginBottom: '60px' }}>
        
        {/* Navigation Tabs */}
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className={`btn ${activeTab === 'desk' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveTab('desk')}>Leadership Messages</button>
          <button className={`btn ${activeTab === 'values' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveTab('values')}>Vision, Mission & Values</button>
          <button className={`btn ${activeTab === 'admin' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveTab('admin')}>Administration Staff</button>
          <button className={`btn ${activeTab === 'history' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveTab('history')}>Timeline & Milestones</button>
        </div>

        {/* TAB CONTENT: LEADERSHIP MESSAGES */}
        {activeTab === 'desk' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            {/* Principal Desk */}
            {principalMessage && (
              <div className="grid-2" style={{ gridTemplateColumns: '1fr 3fr', gap: '40px', alignItems: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ width: '160px', height: '200px', border: '1px solid var(--border-color)', borderRadius: '16px', margin: '0 auto 15px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                    <img src="/img/staff/Principal.jpg" alt="Dr. R. S. Awasthi Portrait" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <h4 style={{ color: 'var(--text-primary)' }}>{principalMessage.author}</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--accent-amber)', fontWeight: '700' }}>Principal, COCSIT</p>
                </div>
                <div>
                  <h3 style={{ marginBottom: '15px', color: 'var(--accent-indigo)' }}>{principalMessage.title}</h3>
                  {principalMessage.paragraphs.slice(0, 3).map((p, idx) => (
                    <p key={idx} style={{ marginBottom: '15px', color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.7' }}>{p}</p>
                  ))}
                </div>
              </div>
            )}

            {/* Chairman Message */}
            {chairmanMessage && (
              <div className="grid-2" style={{ gridTemplateColumns: '1fr 3fr', gap: '40px', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '40px' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ width: '160px', height: '200px', border: '1px solid var(--border-color)', borderRadius: '16px', margin: '0 auto 15px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                    <img src="/images/slides/Dr MR Patil Sir Event Photo/Dr MR Patil Sir Event 2026 1.jpeg" alt="Dr. M. R. Patil Portrait" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <h4 style={{ color: 'var(--text-primary)' }}>{chairmanMessage.author}</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--accent-amber)', fontWeight: '700' }}>Chairman, RES</p>
                </div>
                <div>
                  <h3 style={{ marginBottom: '15px', color: 'var(--accent-indigo)' }}>{chairmanMessage.title}</h3>
                  {chairmanMessage.paragraphs.slice(0, 3).map((p, idx) => (
                    <p key={idx} style={{ marginBottom: '15px', color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.7' }}>{p}</p>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB CONTENT: VISION, MISSION */}
        {activeTab === 'values' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            <div className="grid-3">
              <div className="card" style={{ borderTop: '4px solid var(--accent-indigo)' }}>
                <h3>🔭 Vision</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '10px' }}>
                  “To Impart Quality Education and Job Oriented Trainings in the Field of Computer Science, Information Technology, Biotechnology and Management Science.”
                </p>
              </div>
              <div className="card" style={{ borderTop: '4px solid var(--accent-teal)' }}>
                <h3>🎯 Mission</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '10px' }}>
                  To provide the best possible education by fostering innovation, critical thinking, and lifelong learning, with a strong focus on developing highly skilled and industry-employable human resources.
                </p>
              </div>
              <div className="card" style={{ borderTop: '4px solid var(--accent-amber)' }}>
                <h3>📜 Motto</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '10px' }}>
                  “Knowledge is liberation of mankind” (ऋते ज्ञानान्न मुक्ति: | श्रेष्ठ ज्ञानाशिवाय सुटका नाही.), inspiring our students to achieve academic excellence and contribute meaningfully to societal progress.
                </p>
              </div>
            </div>

            <div className="card" style={{ marginTop: '20px' }}>
              <h4>Affiliations & Recognition</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '10px', lineHeight: '1.7' }}>
                COCSIT Latur is re-accredited by NAAC with **B+ Grade** and is affiliated with **Swami Ramanand Teerth Marathwada University (SRTMU), Nanded**. We are recognized by the Department of Higher and Technical Education, Government of Maharashtra.
              </p>
            </div>
          </div>
        )}

        {/* TAB CONTENT: ADMINISTRATION */}
        {activeTab === 'admin' && (
          <div className="card">
            <h3>Governing Administration Staff</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '20px' }}>Active management and operations directors team list.</p>
            <div className="table-container">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Official Name</th>
                    <th>Board Designation / Department</th>
                  </tr>
                </thead>
                <tbody>
                  {adminStaff.map((staff, idx) => (
                    <tr key={idx}>
                      <td><strong>{staff.name}</strong></td>
                      <td><span className="badge badge-info">{staff.role}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB CONTENT: HISTORY TIMELINE */}
        {activeTab === 'history' && (
          <div className="card" style={{ padding: '40px' }}>
            <h3>College History Timeline</h3>
            <div className="timeline" style={{ marginTop: '30px' }}>
              {milestones.map((mile, idx) => (
                <div key={idx} className="timeline-item">
                  <h4 style={{ color: 'var(--accent-amber)', marginBottom: '5px' }}>{mile.year}</h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{mile.event}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
