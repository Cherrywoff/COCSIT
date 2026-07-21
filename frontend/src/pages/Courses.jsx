import React, { useState } from 'react';

export default function Courses({ courses }) {
  const [tab, setTab] = useState('ug');
  const [activeCourse, setActiveCourse] = useState(null); // When set, renders the Course Template layout

  // Structured Course Data Catalog
  const courseDetailsCatalog = {
    "BCA": {
      eligibility: "Passed 10+2 (HSC) in Science or Commerce streams with Mathematics, or equivalent diploma from recognized state board.",
      duration: "3 Years (6 Semesters)",
      intake: "80 Seats",
      fees: "₹18,500 per annum (State FRA Approved)",
      admissionProcess: "Admission via MAH-CET merit listing and physical counseling rounds at college counters.",
      semesters: [
        { name: "Semester I", subjects: ["C Programming Fundamentals", "Mathematical Foundations", "Office Automation Lab", "Communication Skills"] },
        { name: "Semester II", subjects: ["OOPs with C++", "System Architecture & assembly", "Web UI Basics (HTML/CSS)", "Advanced Math"] },
        { name: "Semester III", subjects: ["Java Core Programming", "Relational Database Systems (RDBMS)", "Data Structures", "Linux OS Basics"] },
        { name: "Semester IV", subjects: ["Python Scripting", "Software Engineering Principles", "Operating Systems", "Networking Labs"] },
        { name: "Semester V", subjects: ["Enterprise Web Tech (PHP/JSP)", "Mobile Application Design", "Information Security", "Elective I"] },
        { name: "Semester VI", subjects: ["Major Capstone Software Project", "Cloud Computing Architectures", "Professional Ethics", "Elective II"] }
      ],
      career: ["Junior Software Developer", "Database Associate", "Web Designer", "System Support Engineer"],
      higherEducation: ["MCA (Master of Computer Applications)", "M.Sc. Computer Science", "MBA (Information Technology)"],
      faqs: [
        { q: "Is mathematics mandatory in HSC for BCA admission?", a: "Yes, candidates should have cleared mathematics as one of the subjects at the 10+2 level." },
        { q: "Does the BCA program offer internship support?", a: "Yes, Semester VI includes a mandatory industrial software project where students collaborate with hiring cell partners." }
      ]
    },
    "B.Sc. (CS)": {
      eligibility: "Passed 10+2 (HSC) in Science stream with Mathematics from recognized boards.",
      duration: "3 Years (6 Semesters)",
      intake: "80 Seats",
      fees: "₹19,000 per annum (State FRA Approved)",
      admissionProcess: "Direct merit listing enrollment based on HSC marks card submission.",
      semesters: [
        { name: "Semester I", subjects: ["Computer Fundamentals", "Introduction to C Language", "Discrete Mathematics", "Physics / Electronics I"] },
        { name: "Semester II", subjects: ["Data Structures using C", "Digital Electronics", "Numerical Analysis", "Physics / Electronics II"] },
        { name: "Semester III", subjects: ["Database Management Systems", "Object Oriented Programming (Java)", "Software Engineering", "Mathematics III"] },
        { name: "Semester IV", subjects: ["Operating System Algorithms", "Computer Networks", "Web Development using Python", "Microprocessors"] },
        { name: "Semester V", subjects: ["Linux Administration", "Artificial Intelligence Basics", "Computer Graphics", "Elective I"] },
        { name: "Semester VI", subjects: ["Cyber Security foundations", "System Software", "Academic Project", "Elective II"] }
      ],
      career: ["Software Programmer", "System Administrator", "Data Entry Analyst", "Network Executive"],
      higherEducation: ["M.Sc. Computer Science", "MCA (Master of Computer Applications)", "M.Sc. Information Technology"],
      faqs: [
        { q: "What is the difference between B.Sc (CS) and BCA?", a: "B.Sc (CS) focuses more on computer science theory, algorithms, and logic systems, while BCA is geared towards applied applications and software development." }
      ]
    },
    "MCA": {
      eligibility: "Completed BCA or B.Sc in Computer Science with minimum 50% marks (45% for reserved category) and valid scores in MAH-MCA-CET entrance test.",
      duration: "2 Years (4 Semesters)",
      intake: "40 Seats",
      fees: "₹38,000 per annum (FRA Approved)",
      admissionProcess: "Centralized Admission Process (CAP) rounds conducted by DTE Maharashtra.",
      semesters: [
        { name: "Semester I", subjects: ["Advanced Data Structures", "Design & Analysis of Algorithms", "Advanced DBMS", "Web Frameworks (NodeJS/React)"] },
        { name: "Semester II", subjects: ["Machine Learning Models", "Cloud Infrastructure Services", "Object Oriented Analysis", "Enterprise Mobile Apps"] },
        { name: "Semester III", subjects: ["Big Data Analytics", "Cyber Forensics & Security", "Software Quality Metrics", "Elective I"] },
        { name: "Semester IV", subjects: ["6-Month Mandatory Industrial Internship Project", "Research Seminars & Publications"] }
      ],
      career: ["Software Architect", "Systems Engineer", "AI/ML Analyst", "Senior Web Developer", "Database Administrator"],
      higherEducation: ["Ph.D. in Computer Science", "M.Phil", "Research Fellowships"],
      faqs: [
        { q: "Is the MCA course recognized by AICTE?", a: "Yes, the MCA course is fully approved by AICTE, New Delhi and affiliated to SRTMU Nanded." }
      ]
    }
  };

  // Render Course Template view if a course is selected
  if (activeCourse) {
    const details = courseDetailsCatalog[activeCourse.abbreviation] || {
      eligibility: "Academic eligibility parameters are subject to autonomous guidelines.",
      duration: "Standard duration",
      intake: "Intake capacity details to be updated.",
      fees: "Institutional fees to be updated by FRA board.",
      admissionProcess: "General counseling rounds at college admission desk.",
      semesters: [{ name: "Semester I & II", subjects: ["Core syllabus contents to be updated soon."] }],
      career: ["Academic pathways, software jobs, and research fields."],
      higherEducation: ["Postgraduate master degrees"],
      faqs: [{ q: "Where can I find the official syllabus handbook?", a: "The syllabus PDF is available in the downloads section of the website." }]
    };

    return (
      <div className="fade-in-section">
        {/* Course Hero */}
        <div style={{ padding: '60px 0', background: 'var(--bg-card)', borderBottom: '1px solid var(--border-color)', marginBottom: '40px', borderRadius: '16px' }}>
          <div className="container">
            <button className="btn btn-secondary" style={{ marginBottom: '20px', padding: '6px 14px', fontSize: '0.8rem' }} onClick={() => setActiveCourse(null)}>
              ← Back to All Courses
            </button>
            <span className="section-tag">{activeCourse.abbreviation} Program</span>
            <h2>{activeCourse.name}</h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '700px', marginTop: '10px' }}>{activeCourse.focus}</p>
          </div>
        </div>

        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '40px', marginBottom: '60px' }}>
          {/* Overview Grid */}
          <div className="grid-3">
            <div className="card" style={{ padding: '25px' }}>
              <strong>⏱️ Course Duration</strong>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '8px' }}>{details.duration}</p>
            </div>
            <div className="card" style={{ padding: '25px' }}>
              <strong>👥 Student Intake Capacity</strong>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '8px' }}>{details.intake}</p>
            </div>
            <div className="card" style={{ padding: '25px' }}>
              <strong>💵 Annual Fee Structure</strong>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '8px' }}>{details.fees}</p>
            </div>
          </div>

          {/* Admission & Eligibility */}
          <div className="grid-2">
            <div className="card">
              <h3>Admission Eligibility</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '12px', lineHeight: '1.7' }}>{details.eligibility}</p>
            </div>
            <div className="card">
              <h3>Admission Process</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '12px', lineHeight: '1.7' }}>{details.admissionProcess}</p>
            </div>
          </div>

          {/* Semester-wise Subject structure */}
          <div className="card">
            <h3>Curriculum Semester Structure</h3>
            <div className="grid-3" style={{ marginTop: '25px' }}>
              {details.semesters.map((sem, sIdx) => (
                <div key={sIdx} className="card" style={{ background: 'var(--bg-dark)', padding: '20px' }}>
                  <h4 style={{ color: 'var(--accent-indigo)', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px', marginBottom: '10px' }}>{sem.name}</h4>
                  <ul style={{ paddingLeft: '15px', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                    {sem.subjects.map((sub, subIdx) => (
                      <li key={subIdx}>{sub}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Career and Higher Education */}
          <div className="grid-2">
            <div className="card">
              <h3>Career Opportunities</h3>
              <ul style={{ paddingLeft: '20px', fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '12px' }}>
                {details.career.map((c, idx) => (
                  <li key={idx} style={{ marginBottom: '8px' }}>{c}</li>
                ))}
              </ul>
            </div>
            <div className="card">
              <h3>Higher Education Paths</h3>
              <ul style={{ paddingLeft: '20px', fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '12px' }}>
                {details.higherEducation.map((h, idx) => (
                  <li key={idx} style={{ marginBottom: '8px' }}>{h}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* FAQs */}
          <div>
            <h3 style={{ marginBottom: '20px', textAlign: 'center' }}>Frequently Asked Questions</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {details.faqs.map((f, idx) => (
                <div key={idx} className="card" style={{ padding: '25px' }}>
                  <strong>Q: {f.q}</strong>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '8px' }}>A: {f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Fallback default UG/PG course listing view
  return (
    <div className="fade-in-section">
      <div style={{ padding: '60px 0', background: 'var(--bg-card)', borderBottom: '1px solid var(--border-color)', marginBottom: '50px', textAlign: 'center', borderRadius: '16px' }}>
        <div className="container">
          <span className="section-tag">Academic Programs</span>
          <h2>COCSIT Course Catalogue</h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>Explore under-graduate and post-graduate options aligned with the National Education Policy (NEP 2020).</p>
        </div>
      </div>

      <div className="container" style={{ marginBottom: '60px' }}>
        <div style={{ display: 'flex', gap: '15px', marginBottom: '35px', justifyContent: 'center' }}>
          <button className={`btn ${tab === 'ug' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setTab('ug')}>Undergraduate Programs</button>
          <button className={`btn ${tab === 'pg' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setTab('pg')}>Postgraduate Programs</button>
        </div>

        {tab === 'ug' && courses && (
          <div>
            <p style={{ color: 'var(--accent-teal)', fontWeight: '700', marginBottom: '25px', textAlign: 'center' }}>{courses.undergraduate_programs.description}</p>
            <div className="grid-2">
              {courses.undergraduate_programs.courses.map((c, i) => (
                <div key={i} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ color: 'var(--accent-indigo)' }}>{c.name} ({c.abbreviation})</h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '10px' }}>
                      {c.focus}
                    </p>
                  </div>
                  <div style={{ marginTop: '20px' }}>
                    <button className="btn btn-primary" style={{ padding: '6px 16px', fontSize: '0.8rem' }} onClick={() => setActiveCourse(c)}>
                      View Details & Subjects →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'pg' && courses && (
          <div>
            <p style={{ color: 'var(--accent-teal)', fontWeight: '700', marginBottom: '25px', textAlign: 'center' }}>{courses.postgraduate_programs.description}</p>
            <div className="grid-2">
              {courses.postgraduate_programs.courses.map((c, i) => (
                <div key={i} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ color: 'var(--accent-indigo)' }}>{c.name} ({c.abbreviation})</h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '10px' }}>
                      {c.focus}
                    </p>
                  </div>
                  <div style={{ marginTop: '20px' }}>
                    <button className="btn btn-primary" style={{ padding: '6px 16px', fontSize: '0.8rem' }} onClick={() => setActiveCourse(c)}>
                      View Details & Subjects →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
