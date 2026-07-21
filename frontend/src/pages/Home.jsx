import React, { useState, useEffect } from 'react';

export default function Home({ branding, notices, setCurrentPage, setSelectedNotice, user, onDeleteNotice }) {
  const banners = [
    { image: "/img/banner.jpg", title: "COCSIT Autonomous Latur", desc: "A premier NAAC Re-accredited B+ grade higher educational institution run by the Royal Education Society." },
    { image: "/img/about_college_banner.jpg", title: "Future Ready IT Education", desc: "Equipping learners with professional skills in Computer Science, Software Engineering, AI & ML, and Management." },
    { image: "/img/about_principals_desk_banner.jpg", title: "Academic Excellence", desc: "Experience state of the art laboratory settings and personalized mentoring under top faculties." },
    { image: "/img/about_charimans_desk_banner.jpg", title: "Celebrating 25 Years (Amrut Mahotsav)", desc: "Commemorating a historical legacy of educational dedication in Maharashtra." }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeNoticeTab, setActiveNoticeTab] = useState('all');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const filteredNotices = notices.filter(n => {
    if (activeNoticeTab === 'all') return true;
    return n.category === activeNoticeTab;
  });

  return (
    <div className="fade-in-section">
      
      {/* 1. HERO BANNER */}
      <div className="hero" style={{
        position: 'relative',
        height: '460px',
        borderRadius: '24px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: `linear-gradient(to bottom, rgba(15, 23, 42, 0.75), rgba(15, 23, 42, 0.9)), url(${banners[currentSlide].image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transition: 'background-image 0.8s ease-in-out',
        marginBottom: '40px',
        textAlign: 'center'
      }}>
        <div className="container" style={{ zIndex: '2', position: 'relative' }}>
          <span className="section-tag" style={{ color: 'var(--accent-amber)' }}>Amrut Mahotsav 2001-2026</span>
          <h1 style={{ fontSize: '3rem', color: '#ffffff', marginBottom: '15px', fontWeight: '800' }}>{banners[currentSlide].title}</h1>
          <p style={{ fontSize: '1.25rem', color: '#cbd5e1', maxWidth: '800px', margin: '0 auto 30px', lineHeight: '1.5' }}>{banners[currentSlide].desc}</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
            <button className="btn btn-accent" onClick={() => setCurrentPage('admissions')}>Admissions Open 2026-27</button>
            <button className="btn btn-secondary" style={{ color: '#ffffff', borderColor: '#ffffff' }} onClick={() => setCurrentPage('courses')}>Explore Degrees</button>
          </div>
        </div>

        {/* Slide Indicators */}
        <div style={{ position: 'absolute', bottom: '20px', display: 'flex', gap: '10px', zIndex: '5' }}>
          {banners.map((_, idx) => (
            <div key={idx} onClick={() => setCurrentSlide(idx)} style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: idx === currentSlide ? 'var(--accent-amber)' : 'rgba(255, 255, 255, 0.4)',
              cursor: 'pointer',
              transition: 'background-color 0.3s'
            }}></div>
          ))}
        </div>
      </div>

      {/* 2. QUICK STATISTICS */}
      <section style={{ padding: '30px 0' }}>
        <div className="grid-4" style={{ textAlign: 'center' }}>
          <div className="card" style={{ padding: '20px' }}>
            <h2 style={{ fontSize: '2.5rem', color: 'var(--accent-amber)', marginBottom: '5px' }}>25+</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Years of Excellence</p>
          </div>
          <div className="card" style={{ padding: '20px' }}>
            <h2 style={{ fontSize: '2.5rem', color: 'var(--accent-amber)', marginBottom: '5px' }}>4,000+</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Students Enrolled</p>
          </div>
          <div className="card" style={{ padding: '20px' }}>
            <h2 style={{ fontSize: '2.5rem', color: 'var(--accent-amber)', marginBottom: '5px' }}>120+</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Expert Faculty Roster</p>
          </div>
          <div className="card" style={{ padding: '20px' }}>
            <h2 style={{ fontSize: '2.5rem', color: 'var(--accent-amber)', marginBottom: '5px' }}>90%</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Campus Placements</p>
          </div>
        </div>
      </section>

      {/* 3. ABOUT COCSIT */}
      <section>
        <div className="grid-2" style={{ alignItems: 'center' }}>
          <div>
            <span className="section-tag">Institute Profile</span>
            <h2>Royal Education Society's Pioneer College</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '20px', fontSize: '1.05rem', lineHeight: '1.7' }}>
              The College of Computer Science and Information Technology (COCSIT), Latur, was established in the year 2001 by Dr. M. R. Patil. The college is run by the Royal Education Society with a noble dream to spread professional job-oriented IT education in the Marathwada region. It features accredited NAAC B+ Grade credentials and is affiliated to Swami Ramanand Teerth Marathwada University (SRTMU), Nanded.
            </p>
            <button className="btn btn-primary" onClick={() => setCurrentPage('about')}>Read Leadership Message</button>
          </div>
          <div style={{ borderRadius: '20px', overflow: 'hidden', height: '280px' }}>
            <img src="/img/other/cocsit_building.jpg" alt="COCSIT campus front" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>
      </section>

      {/* 4. PROGRAMS OFFERED */}
      <section style={{ textAlign: 'center' }}>
        <span className="section-tag">Degrees Catalog</span>
        <h2 style={{ marginBottom: '15px' }}>Academic Programs</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '30px', maxWidth: '600px', margin: '0 auto 30px' }}>We offer undergraduate and postgraduate curriculums in computer systems and life sciences.</p>
        <div className="grid-3" style={{ textAlign: 'left' }}>
          <div className="card">
            <h4>BCA Program</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '8px', marginBottom: '15px' }}>Choice Based Credit System (CBCS) aligned curriculum focusing on Java, python programming, and systems design.</p>
            <button className="btn btn-secondary" style={{ padding: '6px 14px', fontSize: '0.75rem' }} onClick={() => setCurrentPage('courses')}>Syllabus Details</button>
          </div>
          <div className="card">
            <h4>B.Sc. Computer Science</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '8px', marginBottom: '15px' }}>Theoretical computer science structures, Linux server administrations, database architectures and network protocols.</p>
            <button className="btn btn-secondary" style={{ padding: '6px 14px', fontSize: '0.75rem' }} onClick={() => setCurrentPage('courses')}>Syllabus Details</button>
          </div>
          <div className="card">
            <h4>M.Sc. Computer Science</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '8px', marginBottom: '15px' }}>Postgraduate advanced computing algorithms, artificial intelligence models, cloud security, and research thesis work.</p>
            <button className="btn btn-secondary" style={{ padding: '6px 14px', fontSize: '0.75rem' }} onClick={() => setCurrentPage('courses')}>Syllabus Details</button>
          </div>
        </div>
      </section>

      {/* 5. DEPARTMENTS */}
      <section style={{ textAlign: 'center' }}>
        <span className="section-tag">Academic Divisions</span>
        <h2 style={{ marginBottom: '30px' }}>Academic Departments</h2>
        <div className="grid-4" style={{ textAlign: 'left' }}>
          <div className="card" style={{ padding: '25px', cursor: 'pointer' }} onClick={() => setCurrentPage('departments')}>
            <strong>💻 Computer CS</strong>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '5px' }}>Dr. N. S. Zulpe (HOD)</p>
          </div>
          <div className="card" style={{ padding: '25px', cursor: 'pointer' }} onClick={() => setCurrentPage('departments')}>
            <strong>📱 Computer Applications</strong>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '5px' }}>Dr. V. V. Bhosle (HOD)</p>
          </div>
          <div className="card" style={{ padding: '25px', cursor: 'pointer' }} onClick={() => setCurrentPage('departments')}>
            <strong>🔬 Biotechnology</strong>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '5px' }}>Dr. N. V. More (HOD)</p>
          </div>
          <div className="card" style={{ padding: '25px', cursor: 'pointer' }} onClick={() => setCurrentPage('departments')}>
            <strong>📊 Management Science</strong>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '5px' }}>Dr. R. S. Dombe (HOD)</p>
          </div>
        </div>
      </section>

      {/* 6. ADMISSION OPEN SECTION */}
      <section className="card" style={{ background: 'var(--bg-card)', padding: '50px', display: 'grid', gridTemplateColumns: '3fr 1fr', gap: '30px', alignItems: 'center' }}>
        <div>
          <span className="section-tag" style={{ color: 'var(--accent-indigo)' }}>Enrollment 2026-27</span>
          <h2>Online Admissions Open for BCA, BBA & B.Sc CS</h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: '10px', fontSize: '0.95rem' }}>Secure your seat by filling out the online CET registration form or presenting marksheets directly at admissions desks.</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <button className="btn btn-primary" onClick={() => setCurrentPage('admissions')}>Apply Now Online</button>
        </div>
      </section>

      {/* 7. WHY CHOOSE COCSIT */}
      <section style={{ textAlign: 'center' }}>
        <span className="section-tag">Institutional Highlights</span>
        <h2 style={{ marginBottom: '45px' }}>Why Choose COCSIT?</h2>
        <div className="grid-3" style={{ textAlign: 'left' }}>
          <div className="card">
            <h4>✔️ NAAC B+ Accredited</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '8px' }}>Rigorous evaluation of academic guidelines, computing laboratories, and student welfare support.</p>
          </div>
          <div className="card">
            <h4>✔️ 25-Year Service History</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '8px' }}>Over two decades of education service in Latur, fostering thousands of software developers.</p>
          </div>
          <div className="card">
            <h4>✔️ Autonomous Learning Credit</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '8px' }}>Flexible Choice Based Credit System (CBCS) aligned with national credit bank criteria (NEP 2020).</p>
          </div>
        </div>
      </section>

      {/* 8. CAMPUS FACILITIES */}
      <section style={{ textAlign: 'center' }}>
        <span className="section-tag">Amenities</span>
        <h2 style={{ marginBottom: '35px' }}>Central Campus Facilities</h2>
        <div className="grid-3" style={{ textAlign: 'left' }}>
          <div className="card">
            <h4>🔬 Science & Biotech Labs</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '5px' }}>Analytical diagnostic apparatus, laminar air flows, spectrophotometers, and incubator setups.</p>
          </div>
          <div className="card">
            <h4>📖 Central Library</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '5px' }}>Over 15,000 text volumes, textbooks, newspapers index, and spacious reading hall study rooms.</p>
          </div>
          <div className="card">
            <h4>🏢 Girls' Residential Hostel</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '5px' }}>Safe lodging facilities situated inside secure campus perimeters for outstation students.</p>
          </div>
        </div>
        <div style={{ marginTop: '30px' }}>
          <button className="btn btn-secondary" onClick={() => setCurrentPage('facilities')}>View Facilities Details</button>
        </div>
      </section>

      {/* 9. RESEARCH & INNOVATION */}
      <section>
        <div className="grid-2" style={{ alignItems: 'center' }}>
          <div>
            <span className="section-tag">Research Cell</span>
            <h2>Research Cell & Committee</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.7', marginBottom: '20px' }}>
              We encourage doctoral research scholars, PG students, and faculty members to write research papers for Scopus-indexed libraries. The institutional advisory cell handles committee guidelines.
            </p>
            <button className="btn btn-primary" onClick={() => setCurrentPage('research')}>View Research Committee Details</button>
          </div>
          <div className="card" style={{ padding: '25px', background: 'rgba(0,0,0,0.01)' }}>
            <h4>Advisory Highlights</h4>
            <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '10px' }}>
              <li style={{ marginBottom: '8px' }}>UGC guidelines compliant Research Advisory Committee (2025-26).</li>
              <li style={{ marginBottom: '8px' }}>Annual Quality Assurance Reports AQAR listings tracking.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 10. PLACEMENT HIGHLIGHTS */}
      <section style={{ textAlign: 'center' }}>
        <span className="section-tag">Hiring Records</span>
        <h2>Training & Placements Highlights</h2>
        <p style={{ color: 'var(--text-secondary)', marginTop: '8px', marginBottom: '35px' }}>Our placement cell prepares students for technical selection tests and logical programming rounds.</p>
        <div className="grid-3" style={{ textAlign: 'left' }}>
          <div className="card">
            <h4>300+</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Placed Student records annually in IT and bioscience wings.</p>
          </div>
          <div className="card">
            <h4>TPO Coordinator</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Coordinated under TPO officer Mr. K. R. Jadhav (placement@cocsit.org.in).</p>
          </div>
          <div className="card">
            <h4>Mock Preparation</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Logical coding tests, soft skills webinars, and campus interviews schedules.</p>
          </div>
        </div>
      </section>

      {/* 11. TOP RECRUITERS */}
      <section style={{ textAlign: 'center' }}>
        <span className="section-tag">Partners</span>
        <h2 style={{ marginBottom: '35px' }}>Our Top Corporate Recruiters</h2>
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '20px', alignItems: 'center' }}>
          {['TCS_Logo.jpg', 'wipro_logo.jpg', 'techm.png', 'infosys.jpg', 'hcl_tech.png', 'HDFC.png'].map((logo, idx) => (
            <div key={idx} style={{ padding: '10px 20px', background: '#ffffff', border: '1px solid var(--border-color)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '65px', width: '150px', boxShadow: '0 2px 10px rgba(0,0,0,0.01)' }}>
              <img src={`/img/logo/company_logo/${logo}`} alt="Recruiter Logo" style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
            </div>
          ))}
        </div>
      </section>

      {/* 12. STUDENT ACHIEVEMENTS */}
      <section style={{ textAlign: 'center' }}>
        <span className="section-tag">Success Stories</span>
        <h2>Student Achievements & Selected Roster</h2>
        <div className="grid-3" style={{ textAlign: 'left', marginTop: '30px' }}>
          <div className="card" style={{ padding: '25px' }}>
            <span style={{ fontSize: '2rem' }}>🎓</span>
            <h4 style={{ marginTop: '10px' }}>Selected at TCS</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '5px' }}>“The coding labs and resume reviews helped me clear the TCS technical pool rounds easily.”</p>
            <div style={{ marginTop: '15px', fontSize: '0.8rem', fontWeight: 'bold' }}>— BCA Graduate</div>
          </div>
          <div className="card" style={{ padding: '25px' }}>
            <span style={{ fontSize: '2rem' }}>🎓</span>
            <h4 style={{ marginTop: '10px' }}>Selected at Tech Mahindra</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '5px' }}>“Mock tests and logical interview checks conducted by TPO cell gave me high confidence.”</p>
            <div style={{ marginTop: '15px', fontSize: '0.8rem', fontWeight: 'bold' }}>— B.Sc (CS) Graduate</div>
          </div>
          <div className="card" style={{ padding: '25px' }}>
            <span style={{ fontSize: '2rem' }}>🎓</span>
            <h4 style={{ marginTop: '10px' }}>Selected at Capgemini</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '5px' }}>“Our practical curriculum aligned with corporate coding structures made the entry rounds easy.”</p>
            <div style={{ marginTop: '15px', fontSize: '0.8rem', fontWeight: 'bold' }}>— M.Sc (CS) Graduate</div>
          </div>
        </div>
      </section>

      {/* 13. CAMPUS GALLERY PREVIEW */}
      <section style={{ textAlign: 'center' }}>
        <span className="section-tag">Photos</span>
        <h2>Gallery Preview</h2>
        <div className="grid-3" style={{ marginTop: '30px' }}>
          <div style={{ borderRadius: '12px', overflow: 'hidden', height: '180px' }}><img src="/autonomous/library/library_at_a-glace.png" alt="Library preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
          <div style={{ borderRadius: '12px', overflow: 'hidden', height: '180px' }}><img src="/autonomous/internal_examination_flow.jpg" alt="Lab preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
          <div style={{ borderRadius: '12px', overflow: 'hidden', height: '180px' }}><img src="/documents/2025-26/gallery/Day%20Celebration/Republic%20Day%202026%20(2).jpeg" alt="Events preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
        </div>
        <div style={{ marginTop: '30px' }}>
          <button className="btn btn-secondary" onClick={() => setCurrentPage('gallery')}>View Media Gallery</button>
        </div>
      </section>

      {/* 14. LATEST NOTICES */}
      <section>
        <div style={{ textAlign: 'center', marginBottom: '35px' }}>
          <span className="section-tag">Updates</span>
          <h2>Latest Notices & Circulars</h2>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '30px' }}>
          <button className={`btn ${activeNoticeTab === 'all' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveNoticeTab('all')}>All Notices</button>
          <button className={`btn ${activeNoticeTab === 'academics' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveNoticeTab('academics')}>Academics</button>
          <button className={`btn ${activeNoticeTab === 'placement' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveNoticeTab('placement')}>Placements</button>
        </div>
        <div className="grid-3">
          {filteredNotices.slice(0, 3).map((n) => (
            <div key={n.id} className="card" onClick={() => setSelectedNotice(n)} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '30px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                  <span className={`badge ${n.category === 'placement' ? 'badge-warning' : n.category === 'academics' ? 'badge-success' : 'badge-info'}`}>{n.category}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{n.date}</span>
                    {user && user.role === 'admin' && (
                      <button 
                        className="btn btn-secondary" 
                        style={{ padding: '2px 8px', fontSize: '0.65rem', color: 'var(--accent-rose)', borderColor: 'rgba(225,29,72,0.15)', background: 'transparent' }} 
                        onClick={(e) => { e.stopPropagation(); onDeleteNotice(n.id); }}
                      >
                        🗑️ Delete
                      </button>
                    )}
                  </div>
                </div>
                <h4 style={{ color: 'var(--text-primary)', marginBottom: '10px' }}>{n.title}</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: '3', WebkitBoxOrient: 'vertical' }}>{n.content}</p>
              </div>
              <div style={{ marginTop: '20px', color: 'var(--accent-amber)', fontWeight: '600', fontSize: '0.85rem' }}>Read Notice →</div>
            </div>
          ))}
        </div>
      </section>

      {/* 15. UPCOMING EVENTS */}
      <section style={{ textAlign: 'center' }}>
        <span className="section-tag">Activities</span>
        <h2>Upcoming Campus Events</h2>
        <div className="grid-2" style={{ textAlign: 'left', marginTop: '30px' }}>
          <div className="card">
            <span className="badge badge-info">Feb 14, 2026</span>
            <h4 style={{ marginTop: '10px' }}>Annual Computing Hackathon Round</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '5px' }}>Students compete in software building and coding algorithm solutions.</p>
          </div>
          <div className="card">
            <span className="badge badge-success">May 12, 2026</span>
            <h4 style={{ marginTop: '10px' }}>National seminar on Biotechnology Research</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '5px' }}>Invited guest speakers present lectures on biochemical assays and tissue structures.</p>
          </div>
        </div>
      </section>

      {/* 16. TESTIMONIALS */}
      <section style={{ textAlign: 'center' }}>
        <span className="section-tag">Feedback</span>
        <h2>Testimonials from Alumni & Parents</h2>
        <div className="grid-3" style={{ textAlign: 'left', marginTop: '30px' }}>
          <div className="card" style={{ padding: '25px' }}>
            <p style={{ fontStyle: 'italic', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>“COCSIT provided excellent support during my degree, allowing me to build programming skills and join TCS.”</p>
            <div style={{ fontWeight: '700', fontSize: '0.8rem', marginTop: '12px' }}>— Alumni Batch 2024</div>
          </div>
          <div className="card" style={{ padding: '25px' }}>
            <p style={{ fontStyle: 'italic', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>“The college's autonomous curriculum and discipline help students develop industry readiness.”</p>
            <div style={{ fontWeight: '700', fontSize: '0.8rem', marginTop: '12px' }}>— Parent Testimony</div>
          </div>
          <div className="card" style={{ padding: '25px' }}>
            <p style={{ fontStyle: 'italic', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>“Expert biotech lab facilities and research incubation rooms give students good practical scope.”</p>
            <div style={{ fontWeight: '700', fontSize: '0.8rem', marginTop: '12px' }}>— Research Scholar</div>
          </div>
        </div>
      </section>

      {/* 17. QUICK LINKS PREVIEW */}
      <section style={{ textAlign: 'center' }}>
        <span className="section-tag">Directories</span>
        <h2>Quick Reference Shortcuts</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '20px', flexWrap: 'wrap' }}>
          <button className="btn btn-secondary" onClick={() => setCurrentPage('academics')}>Academic Calendar</button>
          <button className="btn btn-secondary" onClick={() => setCurrentPage('downloads')}>Syllabus Handbook</button>
          <button className="btn btn-secondary" onClick={() => setCurrentPage('governance')}>CDC Committee Roster</button>
        </div>
      </section>

      {/* 18. LOCATION & CONTACT PREVIEW */}
      <section>
        <div className="grid-2" style={{ alignItems: 'center' }}>
          <div>
            <span className="section-tag">Visit Campus</span>
            <h2>Office Contact & Location Details</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.7', marginBottom: '20px' }}>
              📍 Ambajogai Road, Latur - 413531, Maharashtra, India.<br />
              📞 Hotline: +91 (02382) 229191<br />
              ✉️ Email: info@cocsit.org.in
            </p>
            <button className="btn btn-primary" onClick={() => setCurrentPage('contact')}>Directories Directory →</button>
          </div>
          <div className="card" style={{ padding: '15px', height: '240px', overflow: 'hidden' }}>
            <iframe 
              title="COCSIT Campus Location map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3785.1235!2d76.5432!3d18.4123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDI0JzQ0LjQiTiA3NuwzMiczNS41IkU!5e0!3m2!1sen!2sin!4v1620000000000" 
              width="100%" 
              height="100%" 
              style={{ border: 'none', borderRadius: '12px' }} 
              allowFullScreen="" 
              loading="lazy">
            </iframe>
          </div>
        </div>
      </section>
    </div>
  );
}
