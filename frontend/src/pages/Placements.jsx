import React from 'react';

export default function Placements() {
  const tpoContact = {
    officer: "Mr. K. R. Jadhav",
    role: "Training & Placement Officer (TPO)",
    email: "placement@cocsit.org.in",
    hotline: "+91 (02382) 229193"
  };

  const trainingActivities = [
    { title: "Technical Coding Classes", desc: "Python, C++, Java core training, database query writing and algorithms solving tests." },
    { title: "Soft Skills & Mock Interviews", desc: "Seminars on communication, group discussions preparation, body language, and resume writing." }
  ];

  return (
    <div className="fade-in-section">
      <div style={{ padding: '60px 0', background: 'var(--bg-card)', borderBottom: '1px solid var(--border-color)', marginBottom: '50px', textAlign: 'center', borderRadius: '16px' }}>
        <div className="container">
          <span className="section-tag">Career Center</span>
          <h2>Training & Placement Cell</h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>Learn about corporate hiring records, recruiter grids, placement statistics, and training seminars.</p>
        </div>
      </div>

      <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '50px', marginBottom: '60px' }}>
        
        {/* Statistics & Officer Contact */}
        <div className="grid-2" style={{ alignItems: 'stretch' }}>
          {/* TPO Message Card */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <span className="section-tag">Officer Desk</span>
              <h3>Placement Coordinator Desk</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.7', margin: '15px 0' }}>
                “Our placement cell coordinates regular campus interview rounds, coding preparation sessions, and soft-skills seminars to align learners with contemporary technology roles. We maintain collaborations with top hiring agencies.”
              </p>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-primary)', borderTop: '1px solid var(--border-color)', paddingTop: '15px' }}>
                <strong>{tpoContact.officer}</strong><br />
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{tpoContact.role}</span><br />
                <span style={{ fontSize: '0.8rem', color: 'var(--accent-indigo)' }}>✉️ {tpoContact.email} | 📞 {tpoContact.hotline}</span>
              </div>
            </div>
            <div style={{ marginTop: '20px' }}>
              <a href="/documents/2025-26/TPC/placed_students/Placed%20Student%20List%202026%20Passout%20With%20Photo.pdf" target="_blank" className="btn btn-primary" style={{ fontSize: '0.85rem' }}>
                📂 Download Placed Students List PDF
              </a>
            </div>
          </div>

          {/* Placement stats */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <h3>Annual Campus Placements Records</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '20px' }}>
                Year-on-year recruitment counts are on a continuous rise, placing over 300 students annually in software development roles.
              </p>
              <div style={{ height: '140px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', padding: '10px 0', borderBottom: '1px solid var(--border-color)', marginBottom: '15px' }}>
                <div style={{ textAlign: 'center', width: '45px' }}><div style={{ height: '40px', background: 'var(--accent-indigo)', borderRadius: '4px' }}></div><span style={{ fontSize: '0.75rem', marginTop: '5px', display: 'block' }}>2023</span></div>
                <div style={{ textAlign: 'center', width: '45px' }}><div style={{ height: '70px', background: 'var(--accent-blue)', borderRadius: '4px' }}></div><span style={{ fontSize: '0.75rem', marginTop: '5px', display: 'block' }}>2024</span></div>
                <div style={{ textAlign: 'center', width: '45px' }}><div style={{ height: '90px', background: 'var(--accent-teal)', borderRadius: '4px' }}></div><span style={{ fontSize: '0.75rem', marginTop: '5px', display: 'block' }}>2025</span></div>
                <div style={{ textAlign: 'center', width: '45px' }}><div style={{ height: '110px', background: 'var(--accent-amber)', borderRadius: '4px' }}></div><span style={{ fontSize: '0.75rem', marginTop: '5px', display: 'block' }}>2026</span></div>
              </div>
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
              Highest package offered: <strong>₹6.5 LPA</strong> | Average package: <strong>₹3.2 LPA</strong>
            </div>
          </div>
        </div>

        {/* Training cell activities */}
        <div className="card">
          <h3>Placements Preparation Training Activities</h3>
          <div className="grid-2" style={{ marginTop: '20px' }}>
            {trainingActivities.map((act, idx) => (
              <div key={idx} className="card" style={{ background: 'var(--bg-dark)', padding: '25px' }}>
                <h4 style={{ color: 'var(--accent-indigo)' }}>{act.title}</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '8px', lineHeight: '1.6' }}>{act.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recruiting Partners */}
        <div className="card" style={{ textAlign: 'center' }}>
          <h3 style={{ marginBottom: '30px' }}>Our Elite Recruitment Panel</h3>
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '20px', alignItems: 'center' }}>
            {['TCS_Logo.jpg', 'wipro_logo.jpg', 'techm.png', 'infosys.jpg', 'hcl_tech.png', 'HDFC.png'].map((logo, idx) => (
              <div key={idx} style={{ padding: '10px 20px', background: '#ffffff', border: '1px solid var(--border-color)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '65px', width: '150px', boxShadow: '0 2px 10px rgba(0,0,0,0.01)' }}>
                <img src={`/img/logo/company_logo/${logo}`} alt="Recruiter Logo" style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
              </div>
            ))}
          </div>
        </div>

        {/* Success Stories */}
        <div>
          <h3 style={{ marginBottom: '25px', textAlign: 'center' }}>Selected Student Highlights</h3>
          <div className="grid-3">
            <div className="card" style={{ padding: '25px' }}>
              <div style={{ fontSize: '2rem', marginBottom: '10px' }}>👩‍💻</div>
              <h4>Selected at TCS</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '5px' }}>
                “COCSIT coding labs and resume workshops helped me clear technical selection rounds at Tata Consultancy Services during the campus pool drive.”
              </p>
              <div style={{ marginTop: '15px', fontSize: '0.8rem', fontWeight: 'bold' }}>— BCA Graduate</div>
            </div>

            <div className="card" style={{ padding: '25px' }}>
              <div style={{ fontSize: '2rem', marginBottom: '10px' }}>👨‍💻</div>
              <h4>Hired at Capgemini</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '5px' }}>
                “Personalized guidance from the TPO cell coordinator gave me the confidence to crack logical reasoning and programming exams easily.”
              </p>
              <div style={{ marginTop: '15px', fontSize: '0.8rem', fontWeight: 'bold' }}>— B.Sc. CS Graduate</div>
            </div>

            <div className="card" style={{ padding: '25px' }}>
              <div style={{ fontSize: '2rem', marginBottom: '10px' }}>👩‍🔬</div>
              <h4>Biotech Placement</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '5px' }}>
                “Our laboratory training in microbiological cultures and assay development enabled my selection as Research Assistant at a diagnostic agency.”
              </p>
              <div style={{ marginTop: '15px', fontSize: '0.8rem', fontWeight: 'bold' }}>— M.Sc. Biotech</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
