import React, { useState } from 'react';

export default function Departments() {
  const [selectedDeptKey, setSelectedDeptKey] = useState('cs');

  // Structured Department Data Object Catalog
  const departmentsCatalog = {
    cs: {
      name: "Department of Computer Science & IT",
      hod: "Dr. N. S. Zulpe",
      hodRole: "Vice-Principal & Head of Department",
      hodPhoto: "/img/staff/S%20V%20Patil.jpg",
      message: "The Computer Science department focuses on equipping students with advanced computing concepts, coding methodologies, and database fundamentals. We prepare students for direct corporate employment in technology fields.",
      overview: "Established in 2001, the Department of Computer Science is the largest academic wing at COCSIT Latur. We offer Choice Based Credit System (CBCS) learning tracks aligned with NEP 2020.",
      labs: [
        { name: "Advanced Computing Laboratory", capacity: "40 Workstations", software: "Python, MySQL, Linux" },
        { name: "Database Administration Cell", capacity: "30 Workstations", software: "SQL Server, Oracle" },
        { name: "System Architecture Lab", capacity: "30 Workstations", software: "Assembly Simulators" }
      ],
      faculty: [
        { name: "Prof. Rajesh Patil", role: "Assistant Professor", qual: "M.Sc. (CS), SET", exp: "12 Years", photo: "/img/staff/Computer%20Science/S%20V%20Patil.jpg" },
        { name: "Prof. Shrikant Patil", role: "Assistant Professor", qual: "MCA, NET", exp: "8 Years", photo: "/img/staff/Computer%20Science/Shrikant%20Patil.jpg" }
      ],
      projects: [
        { title: "AI-based Attendance Face Recognition", status: "Completed" },
        { title: "Secured Enterprise Document Vault", status: "Under Review" }
      ],
      achievements: [
        "Gold Medal in SRTMU University coding tournament (2024-25).",
        "Over 85% placement rate in TCS & Wipro pool drives."
      ],
      events: [
        { name: "Hackathon 2026: Code for Society", date: "Feb 2026" },
        { name: "National seminar on Cloud Computing Security", date: "May 2026" }
      ],
      downloads: [
        { title: "Computer Science Syllabus Handbook PDF", path: "/autonomous/PROSPECTUS_2025-26.pdf" },
        { title: "Academic Calendar A.Y. 2025-26", path: "/documents/2025-26/academic_calendar_2025_26.pdf" }
      ],
      contact: "Email: cs.dept@cocsit.org.in | Extension: 201"
    },
    ca: {
      name: "Department of Computer Application",
      hod: "Dr. V. V. Bhosle",
      hodRole: "Vice-Principal & Head of Department",
      hodPhoto: "/img/staff/Computer%20Application/V%20D%20Patil.jpeg",
      message: "Our program focuses on applied coding technologies, web technologies, and cloud platform setups. We provide intensive practical coding laboratory modules.",
      overview: "The department trains students in mobile programming systems, web application design, and modern database connections.",
      labs: [
        { name: "Web Technologies Lab", capacity: "35 Workstations", software: "HTML5, Node.js, PHP" },
        { name: "Mobile App development Center", capacity: "30 Workstations", software: "Android Studio, Flutter" }
      ],
      faculty: [
        { name: "Prof. V. D. Patil", role: "Assistant Professor", qual: "MCA, M.Phil", exp: "15 Years", photo: "/img/staff/Computer%20Application/V%20D%20Patil.jpeg" }
      ],
      projects: [
        { title: "Autonomous College Fees Gateway Checkout", status: "Completed" }
      ],
      achievements: [
        "First prize in State Web Design Competition (2025)."
      ],
      events: [
        { name: "Mobile Programming Boot Camp", date: "March 2026" }
      ],
      downloads: [
        { title: "BCA Syllabus Structure Booklet", path: "/autonomous/PROSPECTUS_2025-26.pdf" }
      ],
      contact: "Email: ca.dept@cocsit.org.in | Extension: 202"
    },
    biotech: {
      name: "Department of Biotechnology & Microbiology",
      hod: "Dr. N. V. More",
      hodRole: "Head of Biotechnology division",
      hodPhoto: "/img/staff/Principal.jpg",
      message: "The biotechnology division is committed to research training in diagnostics, microbiology assays, and plant genetics. We maintain clean containment rooms and diagnostic kits.",
      overview: "We offer undergraduate and postgraduate biotechnology courses focusing on academic research, analytical testing, and biochemistry labs.",
      labs: [
        { name: "Molecular Genetics Room", capacity: "20 Students", software: "Assay kits, spectrophotometers" },
        { name: "Microbiology Incubation Chamber", capacity: "20 Students", software: "Inoculation setups" }
      ],
      faculty: [
        { name: "Dr. R. S. Awasthi", role: "Professor (Microbiology)", qual: "Ph.D. in Microbiology", exp: "22 Years", photo: "/img/staff/Biotechnology/Dr%20R%20S%20Awasthi.jpg" }
      ],
      projects: [
        { title: "Marathwada Soil Microbial Pathology analysis", status: "Completed" }
      ],
      achievements: [
        "Filed intellectual patent for real-time soil nutrient digital analyzer."
      ],
      events: [
        { name: "Seminar: Innovations in Bio-Genetics", date: "April 2026" }
      ],
      downloads: [
        { title: "B.Sc. Biotechnology Syllabus Structure", path: "/autonomous/PROSPECTUS_2025-26.pdf" }
      ],
      contact: "Email: biotech.dept@cocsit.org.in | Extension: 203"
    },
    mgmt: {
      name: "Department of Management Science",
      hod: "Dr. R. S. Dombe",
      hodRole: "Head of Management division",
      hodPhoto: "/img/staff/LM_Patil.jpg",
      message: "We prepare candidates for strategic management, corporate business operations, and organizational behavior guidelines.",
      overview: "The department handles curriculum topics in commerce, financial metrics, retail marketing, and entrepreneurship setups.",
      labs: [
        { name: "Business Simulation Hub", capacity: "25 Workstations", software: "Tally, Excel, Trading Simulators" }
      ],
      faculty: [
        { name: "Prof. G. S. Patil", role: "Assistant Professor", qual: "MBA, UGC-NET", exp: "10 Years", photo: "/img/staff/Software%20Engineering/G%20S%20Patil.jpg" }
      ],
      projects: [
        { title: "Micro-finance impacts in rural Maharashtra communities", status: "Under Review" }
      ],
      achievements: [
        "Content to be updated."
      ],
      events: [
        { name: "Mock Trading Seminar and Field trip", date: "Jan 2026" }
      ],
      downloads: [
        { title: "BBA Course Syllabus Outline", path: "/autonomous/PROSPECTUS_2025-26.pdf" }
      ],
      contact: "Email: mgmt.dept@cocsit.org.in | Extension: 204"
    }
  };

  const activeDept = departmentsCatalog[selectedDeptKey];

  return (
    <div className="fade-in-section">
      <div style={{ padding: '60px 0', background: 'var(--bg-card)', borderBottom: '1px solid var(--border-color)', marginBottom: '50px', textAlign: 'center', borderRadius: '16px' }}>
        <div className="container">
          <span className="section-tag">Divisional Overview</span>
          <h2>COCSIT Academic Departments</h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>Select an academic division to view its HOD desk, laboratories, faculty members, and local projects.</p>
        </div>
      </div>

      <div className="container dashboard-layout" style={{ marginBottom: '60px' }}>
        {/* Sidebar Nav */}
        <div className="sidebar card" style={{ padding: '20px', height: 'fit-content' }}>
          <h4 style={{ marginBottom: '15px', fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Departments List</h4>
          <div className={`sidebar-item ${selectedDeptKey === 'cs' ? 'active' : ''}`} onClick={() => setSelectedDeptKey('cs')}>Computer Science</div>
          <div className={`sidebar-item ${selectedDeptKey === 'ca' ? 'active' : ''}`} onClick={() => setSelectedDeptKey('ca')}>Computer Application</div>
          <div className={`sidebar-item ${selectedDeptKey === 'biotech' ? 'active' : ''}`} onClick={() => setSelectedDeptKey('biotech')}>Biotechnology</div>
          <div className={`sidebar-item ${selectedDeptKey === 'mgmt' ? 'active' : ''}`} onClick={() => setSelectedDeptKey('mgmt')}>Management Science</div>
        </div>

        {/* Content Panel (Reusable Template Layout) */}
        <div className="card" style={{ padding: '45px' }}>
          <span className="section-tag">Academic Profile</span>
          <h2 style={{ marginBottom: '20px' }}>{activeDept.name}</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', marginBottom: '35px', lineHeight: '1.8' }}>{activeDept.overview}</p>

          {/* HOD Desk Message */}
          <div className="card" style={{ background: 'rgba(0,0,0,0.01)', display: 'grid', gridTemplateColumns: '120px 1fr', gap: '30px', alignItems: 'center', padding: '30px', marginBottom: '40px' }}>
            <div style={{ width: '120px', height: '140px', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
              <img src={activeDept.hodPhoto} alt="HOD Portrait" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div>
              <h4 style={{ margin: '0 0 5px' }}>{activeDept.hod}</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--accent-amber)', fontWeight: '700', textTransform: 'uppercase' }}>{activeDept.hodRole}</p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '10px', fontStyle: 'italic', lineHeight: '1.6' }}>“{activeDept.message}”</p>
            </div>
          </div>

          {/* Faculty Profiles Cards */}
          <h3 style={{ marginBottom: '25px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>Department Faculty Profiles</h3>
          <div className="grid-2" style={{ marginBottom: '40px' }}>
            {activeDept.faculty.map((f, idx) => (
              <div key={idx} className="card" style={{ display: 'flex', gap: '20px', alignItems: 'center', padding: '20px', background: 'var(--bg-dark)' }}>
                <div style={{ width: '70px', height: '90px', borderRadius: '8px', overflow: 'hidden', flexShrink: '0', border: '1px solid var(--border-color)' }}>
                  <img src={f.photo} alt="Faculty Portrait" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1rem', margin: '0 0 4px' }}>{f.name}</h4>
                  <p style={{ fontSize: '0.75rem', color: 'var(--accent-teal)', fontWeight: '700' }}>{f.role}</p>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                    <div>🎓 <strong>Qual:</strong> {f.qual}</div>
                    <div>⏱️ <strong>Exp:</strong> {f.exp}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Laboratories */}
          <h3 style={{ marginBottom: '20px' }}>Laboratory Infrastructure</h3>
          <div className="grid-2" style={{ marginBottom: '40px' }}>
            {activeDept.labs.map((l, idx) => (
              <div key={idx} className="card" style={{ padding: '20px', background: 'rgba(0,0,0,0.01)' }}>
                <h4 style={{ color: 'var(--accent-indigo)' }}>{l.name}</h4>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '8px' }}>
                  <div>👥 <strong>Capacity:</strong> {l.capacity}</div>
                  <div>🖥️ <strong>Frameworks / Software:</strong> {l.software}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Projects and Achievements */}
          <div className="grid-2" style={{ marginBottom: '40px' }}>
            <div>
              <h3 style={{ marginBottom: '15px' }}>Active Projects</h3>
              <ul style={{ listStyle: 'none' }}>
                {activeDept.projects.map((p, idx) => (
                  <li key={idx} style={{ padding: '8px 12px', borderLeft: '3px solid var(--accent-indigo)', marginBottom: '8px', background: 'rgba(0,0,0,0.01)', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    {p.title} <span className="badge badge-success" style={{ float: 'right', fontSize: '0.65rem' }}>{p.status}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 style={{ marginBottom: '15px' }}>Student Achievements</h3>
              <ul style={{ paddingLeft: '20px', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                {activeDept.achievements.map((a, idx) => (
                  <li key={idx} style={{ marginBottom: '8px' }}>{a}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Local Events list */}
          <h3 style={{ marginBottom: '15px' }}>Upcoming Seminars & Competitions</h3>
          <div className="grid-2" style={{ marginBottom: '40px' }}>
            {activeDept.events.map((e, idx) => (
              <div key={idx} className="card" style={{ padding: '20px', background: 'rgba(0,0,0,0.01)' }}>
                <strong>{e.name}</strong>
                <div style={{ fontSize: '0.8rem', color: 'var(--accent-amber)', marginTop: '5px' }}>Date: {e.date}</div>
              </div>
            ))}
          </div>

          {/* Syllabus & Resource Downloads */}
          <h3 style={{ marginBottom: '15px' }}>Department Reference Downloads</h3>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '30px' }}>
            {activeDept.downloads.map((d, idx) => (
              <a key={idx} href={d.path} target="_blank" className="btn btn-secondary" style={{ fontSize: '0.8rem', padding: '6px 14px' }}>
                📄 {d.title}
              </a>
            ))}
          </div>

          {/* Department Contact info */}
          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '20px', fontSize: '0.85rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
            📞 {activeDept.contact}
          </div>
        </div>
      </div>
    </div>
  );
}
