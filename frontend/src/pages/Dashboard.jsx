import React, { useState, useEffect } from 'react';

export default function Dashboard({ user, token, activeTab, setActiveTab, refreshNotices, API_BASE, notices, masterContent, setMasterContent }) {
  // Shared Profile States
  const [profile, setProfile] = useState(null);

  // Student specific States
  const [attendanceSummary, setAttendanceSummary] = useState([]);
  const [grades, setGrades] = useState([]);
  const [selectedDashboardNotice, setSelectedDashboardNotice] = useState(null);

  // Teacher specific States
  const [students, setStudents] = useState([]);
  const [attendanceLogs, setAttendanceLogs] = useState([]);
  const [markAttendanceSubject, setMarkAttendanceSubject] = useState('Java Programming');
  const [markAttendanceDate, setMarkAttendanceDate] = useState(new Date().toISOString().slice(0, 10));
  const [markAttendanceRecords, setMarkAttendanceRecords] = useState({});
  const [markAttendanceSuccess, setMarkAttendanceSuccess] = useState('');

  // Faculty Marks Entry States
  const [selectedMarkStudent, setSelectedMarkStudent] = useState('');
  const [markSubject, setMarkSubject] = useState('Java Programming');
  const [markExam, setMarkExam] = useState('Internal Test 1');
  const [marksValue, setMarksValue] = useState(20);
  const [marksSuccess, setMarksSuccess] = useState('');

  // Faculty Study Material States
  const [studyMaterials, setStudyMaterials] = useState([
    { subject: "Java Programming", title: "Unit 1: OOPs and Class structures slides", link: "/autonomous/PROSPECTUS_2025-26.pdf", date: "2026-06-01" },
    { subject: "Database Systems", title: "Unit 2: SQL normalization and queries sheet", link: "/autonomous/PROSPECTUS_2025-26.pdf", date: "2026-06-05" }
  ]);
  const [newMaterialSubject, setNewMaterialSubject] = useState('Java Programming');
  const [newMaterialTitle, setNewMaterialTitle] = useState('');
  const [newMaterialSuccess, setNewMaterialSuccess] = useState('');

  // Admin Notice Creation States
  const [newNoticeTitle, setNewNoticeTitle] = useState('');
  const [newNoticeContent, setNewNoticeContent] = useState('');
  const [newNoticeCategory, setNewNoticeCategory] = useState('general');
  const [newNoticeSuccess, setNewNoticeSuccess] = useState('');

  // Admin Registration States
  const [regUsername, setRegUsername] = useState('');
  const [regPassword, setRegPassword] = useState('password123');
  const [regName, setRegName] = useState('');
  const [regRole, setRegRole] = useState('student');
  const [regDept, setRegDept] = useState('Computer Science');
  const [regEmail, setRegEmail] = useState('');
  const [regSuccess, setRegSuccess] = useState('');

  // HOD specific states
  const [hodYearFilter, setHodYearFilter] = useState('all');
  const [selectedHodStudent, setSelectedHodStudent] = useState(null);
  
  const [hodApprovals, setHodApprovals] = useState([
    { id: 301, type: "Faculty Leave Application", name: "Prof. Rajesh Patil", desc: "Medical Leave request for 2 days (2026-07-28 to 2026-07-29)" },
    { id: 302, type: "Syllabus Plan Review", name: "Prof. Sanjay Shah", desc: "Business Management semester outline plan review" },
    { id: 303, type: "Seminar Project Approval", name: "Amit Kamble", desc: "B.Sc Software Engineering final term project setup" }
  ]);
  const [hodApprovedLogs, setHodApprovedLogs] = useState([]);
  
  const [hodEvents, setHodEvents] = useState([
    { id: 1, title: "Autonomous NEP syllabus slide deck workshop", date: "2026-08-05" },
    { id: 2, title: "CS TechFest 2026 coding Hackathon", date: "2026-08-12" }
  ]);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventDate, setNewEventDate] = useState('');
  // Admin Master Content Editor States
  const [rawJson, setRawJson] = useState(masterContent ? JSON.stringify(masterContent, null, 2) : '');
  const [settingsSuccess, setSettingsSuccess] = useState('');
  const [settingsError, setSettingsError] = useState('');

  // Mock Data definitions (consistent with seeder)
  const usersList = [
    { username: "admin", name: "Super Admin", role: "admin", email: "admin@cocsit.org.in" },
    { username: "principal", name: "Dr. R. S. Awasthi", role: "principal", email: "principal@cocsit.org.in" },
    { username: "hod_cs", name: "Dr. N. S. Zulpe", role: "hod", email: "nszulpe@cocsit.org.in", department: "Computer Science" },
    { username: "hod_mgmt", name: "Dr. K. S. Patil", role: "hod", email: "kspatil@cocsit.org.in", department: "Management Science" },
    { username: "teacher_cs", name: "Prof. Rajesh Patil", role: "teacher", email: "rpatil@cocsit.org.in", subject: "Java Programming" },
    { username: "teacher_mgmt", name: "Prof. Sanjay Shah", role: "teacher", email: "sshah@cocsit.org.in", subject: "Business Management" },
    { username: "student_bca", name: "Rahul Sharma", role: "student", email: "rahul.bca@cocsit.org.in" },
    { username: "student_bsc", name: "Priya Deshmukh", role: "student", email: "priya.bsc@cocsit.org.in" },
    { username: "student_se", name: "Amit Kamble", role: "student", email: "amit.se@cocsit.org.in" },
    { username: "student_bba", name: "Pooja Joshi", role: "student", email: "pooja.bba@cocsit.org.in" }
  ];

  const [rosterUsers, setRosterUsers] = useState(usersList);
  const [editorMode, setEditorMode] = useState('visual'); // 'visual' or 'json'
  const [hostelDesc, setHostelDesc] = useState('');
  const [hostelRulesText, setHostelRulesText] = useState('');
  const [scholarshipsText, setScholarshipsText] = useState('');
  const [infrastructureText, setInfrastructureText] = useState('');

  // Comprehensive Student Dossiers Database (CRUD State)
  const [studentDossiers, setStudentDossiers] = useState({
    "student_bca": {
      username: "student_bca",
      name: "Rahul Sharma",
      email: "rahul.bca@cocsit.org.in",
      phone: "+91 9823023901",
      department: "Computer Science",
      course: "BCA",
      roll: "BCA-2025-01",
      prn: "202507390192",
      semester: "Semester III",
      division: "A",
      parentName: "Sanjay Sharma",
      parentPhone: "+91 9422039201",
      bloodGroup: "O+",
      aadhaar: "4829 3829 0192",
      emergencyContact: "+91 9823023901",
      category: "OBC",
      address: "102, Ambajogai Road, Latur - 413531",
      documents: ["10th Passing Certificate", "12th Marksheet", "Leaving Certificate (LC)", "Caste Validity Certificate"],
      fees: { total: 18500, paid: 12000 },
      grades: [
        { subject: "Java Programming", exam: "Internal Test 1", marks: 22, max: 25 },
        { subject: "Database Systems", exam: "Internal Test 1", marks: 24, max: 25 }
      ],
      attendance: [
        { subject: "Java Programming", present: 22, total: 25 },
        { subject: "Software Engineering", present: 20, total: 22 },
        { subject: "Database Systems", present: 17, total: 25 }
      ],
      homework: [
        { title: "Assignment 1: Class polymorphism codes", status: "Submitted" },
        { title: "Assignment 2: Schema Normalization exercises", status: "Pending" }
      ]
    },
    "student_bsc": {
      username: "student_bsc",
      name: "Priya Deshmukh",
      email: "priya.bsc@cocsit.org.in",
      phone: "+91 9850239012",
      department: "Computer Science",
      course: "B.Sc (CS)",
      roll: "BSC-2025-01",
      prn: "202507390218",
      semester: "Semester III",
      division: "A",
      parentName: "Vijay Deshmukh",
      parentPhone: "+91 9890283921",
      bloodGroup: "A+",
      aadhaar: "5821 2910 4812",
      emergencyContact: "+91 9850239012",
      category: "OPEN",
      address: "Shahu Chowk, Latur - 413512",
      documents: ["10th Passing Certificate", "12th Marksheet", "Leaving Certificate (LC)"],
      fees: { total: 18500, paid: 15000 },
      grades: [
        { subject: "Java Programming", exam: "Internal Test 1", marks: 20, max: 25 },
        { subject: "Database Systems", exam: "Internal Test 1", marks: 18, max: 25 }
      ],
      attendance: [
        { subject: "Java Programming", present: 24, total: 25 },
        { subject: "Software Engineering", present: 21, total: 22 },
        { subject: "Database Systems", present: 23, total: 25 }
      ],
      homework: [
        { title: "Assignment 1: Class polymorphism codes", status: "Submitted" },
        { title: "Assignment 2: Schema Normalization exercises", status: "Submitted" }
      ]
    },
    "student_se": {
      username: "student_se",
      name: "Amit Kamble",
      email: "amit.se@cocsit.org.in",
      phone: "+91 9123019230",
      department: "Computer Science",
      course: "B.Sc (SE)",
      roll: "SE-2025-01",
      prn: "202507390342",
      semester: "Semester III",
      division: "B",
      parentName: "Ramdas Kamble",
      parentPhone: "+91 9921092301",
      bloodGroup: "B+",
      aadhaar: "2810 3829 4810",
      emergencyContact: "+91 9123019230",
      category: "SC",
      address: "Saraswati Colony, Latur - 413531",
      documents: ["10th Passing Certificate", "12th Marksheet", "Caste Validity Certificate"],
      fees: { total: 18500, paid: 10000 },
      grades: [
        { subject: "Java Programming", exam: "Internal Test 1", marks: 15, max: 25 },
        { subject: "Database Systems", exam: "Internal Test 1", marks: 16, max: 25 }
      ],
      attendance: [
        { subject: "Java Programming", present: 19, total: 25 },
        { subject: "Software Engineering", present: 18, total: 22 },
        { subject: "Database Systems", present: 20, total: 25 }
      ],
      homework: [
        { title: "Assignment 1: Class polymorphism codes", status: "Submitted" },
        { title: "Assignment 2: Schema Normalization exercises", status: "Pending" }
      ]
    },
    "student_bba": {
      username: "student_bba",
      name: "Pooja Joshi",
      email: "pooja.bba@cocsit.org.in",
      phone: "+91 9011239012",
      department: "Management Science",
      course: "BBA",
      roll: "BBA-2025-01",
      prn: "202507390499",
      semester: "Semester III",
      division: "B",
      parentName: "Dilip Joshi",
      parentPhone: "+91 9422472910",
      bloodGroup: "AB+",
      aadhaar: "9821 2839 0192",
      emergencyContact: "+91 9011239012",
      category: "OPEN",
      address: "Khadgaon Road, Latur - 413531",
      documents: ["10th Passing Certificate", "12th Marksheet", "Leaving Certificate (LC)"],
      fees: { total: 19500, paid: 19500 },
      grades: [
        { subject: "Business Management", exam: "Internal Test 1", marks: 23, max: 25 },
        { subject: "Marketing Strategies", exam: "Internal Test 1", marks: 21, max: 25 }
      ],
      attendance: [
        { subject: "Business Management", present: 22, total: 25 },
        { subject: "Marketing Strategies", present: 21, total: 25 }
      ],
      homework: [
        { title: "Assignment 1: Business Plan Draft", status: "Submitted" },
        { title: "Assignment 2: Retail Market Survey report", status: "Submitted" }
      ]
    }
  });

  const [activeDossierStudent, setActiveDossierStudent] = useState(null);

  // Student profile editable states
  const [profilePhone, setProfilePhone] = useState('+91 9823023901');
  const [profileEmail, setProfileEmail] = useState('rahul.sharma@cocsit.org.in');
  const [profileAddress, setProfileAddress] = useState('102, Ambajogai Road, Latur - 413531');
  const [profilePass, setProfilePass] = useState('password123');
  const [profilePhoto, setProfilePhoto] = useState('https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150');

  // Principal / HOD Search Filters & Approvals Desk States
  const [principalSearchQuery, setPrincipalSearchQuery] = useState('');
  const [principalDeptFilter, setPrincipalDeptFilter] = useState('all');
  const [principalSemFilter, setPrincipalSemFilter] = useState('all');
  const [principalFeeFilter, setPrincipalFeeFilter] = useState('all');

  const [hodSearchQuery, setHodSearchQuery] = useState('');
  const [hodSemFilter, setHodSemFilter] = useState('all');
  const [hodDivFilter, setHodDivFilter] = useState('all');

  const [approvedLogs, setApprovedLogs] = useState([
    "Prof. Rajesh Patil - 2 days Medical Leave Approved",
    "CS Department NEP syllabus slide deck published to LMS",
    "Admissions circular flyer notice draft finalized"
  ]);

  const [pendingApprovals, setPendingApprovals] = useState([
    { id: 101, type: "Leave Request", name: "Prof. G. S. Patil", desc: "Casual Leave application for 2026-07-28" },
    { id: 102, type: "Project Proposal", name: "Rahul Sharma", desc: "Autonomous Credit Project Proposal: Student Dossier ERP" },
    { id: 103, type: "Notice Draft", name: "HOD Computer Science", desc: "Holiday schedule announcementnotice circular" },
    { id: 104, type: "Leave Request", name: "Dr. N. V. More (HOD Biotech)", desc: "Sick Leave application for 3 days" }
  ]);

  const [feesAuditEntries, setFeesAuditEntries] = useState([
    { prn: "202507390192", name: "Rahul Sharma", total: 18500, paid: 12000, status: "Partially Paid" },
    { prn: "202507390218", name: "Priya Deshmukh", total: 18500, paid: 15000, status: "Partially Paid" },
    { prn: "202507390342", name: "Amit Kamble", total: 18500, paid: 10000, status: "Partially Paid" },
    { prn: "202507390499", name: "Pooja Joshi", total: 18500, paid: 18500, status: "Fully Cleared" }
  ]);

  // Website Brand, CMS and Hero Slides State Hooks
  const [collegeName, setCollegeName] = useState('COCSIT College, Latur');
  const [colPhone, setColPhone] = useState('+91 2382 229191');
  const [colEmail, setColEmail] = useState('info@cocsit.org.in');
  const [heroTitle, setHeroTitle] = useState('Empowering Students through Quality IT Education');
  const [heroSubtitle, setHeroSubtitle] = useState('Join COCSIT College - Latur\'s leading institute for BCA, B.Sc., MCA programs.');
  const [bcaFee, setBcaFee] = useState(18500);
  const [bscFee, setBscFee] = useState(16500);
  const [mcaFee, setMcaFee] = useState(32000);
  
  // Roster detail editing states
  const [editFeesPaid, setEditFeesPaid] = useState('');
  const [editFeesTotal, setEditFeesTotal] = useState('');
  const [newHwTitle, setNewHwTitle] = useState('');
  const [newHwStatus, setNewHwStatus] = useState('Pending');
  
  const [newMarkSubjectVal, setNewMarkSubjectVal] = useState('Java Programming');
  const [newMarkVal, setNewMarkVal] = useState(20);
  const [newMarkMax, setNewMarkMax] = useState(25);
  const [newMarkExamName, setNewMarkExamName] = useState('Internal Test 1');

  const [newAttSubjectVal, setNewAttSubjectVal] = useState('Java Programming');

  // Dynamically sync teacher's default assigned subjects on session login
  useEffect(() => {
    if (user && user.role === 'teacher') {
      const sub = user.username === 'teacher_mgmt' ? 'Business Management' : 'Java Programming';
      setNewMarkSubjectVal(sub);
      setNewAttSubjectVal(sub);
    }
  }, [user]);
  const [newAttPresentVal, setNewAttPresentVal] = useState(20);
  const [newAttTotalVal, setNewAttTotalVal] = useState(25);

  const studentTimetable = [
    { time: "09:30 AM - 10:30 AM", subject: "Java Programming Core", room: "Lab 3 (Second Floor)", teacher: "Prof. Rajesh Patil" },
    { time: "11:00 AM - 12:00 PM", subject: "Software Engineering Principles", room: "Room 102", teacher: "Prof. G. S. Patil" },
    { time: "02:00 PM - 03:00 PM", subject: "Database Systems Architecture", room: "Lab 5 (Third Floor)", teacher: "Dr. N. S. Zulpe" },
    { time: "03:30 PM - 04:30 PM", subject: "Communication Skills Practical", room: "Seminar Hall", teacher: "Prof. S. V. Patil" }
  ];

  const studentFeesBreakdown = {
    total: 18500,
    paid: 12000,
    balance: 6500,
    installments: [
      { term: "CAP Seat Confirmation Deposit", amount: 5000, date: "2025-06-18", status: "Paid" },
      { term: "First Installment Term-Start", amount: 7000, date: "2025-09-02", status: "Paid" },
      { term: "Final Balance Term-End Clearance", amount: 6500, date: "Pending", status: "Balance" }
    ]
  };

  const studentAssignments = [
    { title: "Assignment 1: Class hierarchies & polymorphism codes", subject: "Java Programming", deadline: "2026-07-28", status: "Submitted" },
    { title: "Assignment 2: Schema Normalization exercises", subject: "Database Systems", deadline: "2026-08-04", status: "Pending" }
  ];

  // Sync rawJson and visual editor states when masterContent loads
  useEffect(() => {
    if (masterContent) {
      setRawJson(JSON.stringify(masterContent, null, 2));
      if (masterContent.girls_hostel) {
        setHostelDesc(masterContent.girls_hostel.details ? masterContent.girls_hostel.details.join('\n') : '');
        setHostelRulesText(masterContent.girls_hostel.rules ? masterContent.girls_hostel.rules.join('\n') : '');
      }
      if (masterContent.scholarships) {
        setScholarshipsText(masterContent.scholarships.details ? masterContent.scholarships.details.join('\n') : '');
      }
      if (masterContent.infrastructure) {
        setInfrastructureText(masterContent.infrastructure.details ? masterContent.infrastructure.details.join('\n') : '');
      }
    }
  }, [masterContent]);

  // Load User Profile & Portal Info
  useEffect(() => {
    fetch(`${API_BASE}/portal/profile`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setProfile(data))
      .catch(err => console.error(err));

    if (user.role === 'student') {
      fetch(`${API_BASE}/portal/attendance`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => setAttendanceSummary(data.summary || []))
        .catch(err => console.error(err));

      fetch(`${API_BASE}/portal/grades`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => setGrades(data || []))
        .catch(err => console.error(err));
    }

    if (user.role === 'teacher' || user.role === 'hod' || user.role === 'admin') {
      fetch(`${API_BASE}/portal/students`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => {
          setStudents(data || []);
          if (data && data.length > 0) {
            setSelectedMarkStudent(data[0].id);
          }
          const initialMap = {};
          data.forEach(s => { initialMap[s.id] = 'Present' });
          setMarkAttendanceRecords(initialMap);
        })
        .catch(err => console.error(err));

      fetch(`${API_BASE}/portal/attendance`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => setAttendanceLogs(data || []))
        .catch(err => console.error(err));
    }
  }, [user, token, API_BASE]);

  const handleMarkAttendance = (e) => {
    e.preventDefault();
    setMarkAttendanceSuccess('');

    const logsPayload = Object.keys(markAttendanceRecords).map(id => ({
      student_id: id,
      status: markAttendanceRecords[id]
    }));

    fetch(`${API_BASE}/portal/attendance`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        date: markAttendanceDate,
        subject: markAttendanceSubject,
        logs: logsPayload
      })
    })
      .then(res => res.json())
      .then(data => {
        setMarkAttendanceSuccess('Attendance sheet cataloged successfully.');
        return fetch(`${API_BASE}/portal/attendance`, { headers: { 'Authorization': `Bearer ${token}` } });
      })
      .then(res => res.json())
      .then(data => setAttendanceLogs(data || []))
      .catch(err => console.error(err));
  };

  const handleCreateNotice = (e) => {
    e.preventDefault();
    setNewNoticeSuccess('');

    fetch(`${API_BASE}/portal/notice`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        title: newNoticeTitle,
        content: newNoticeContent,
        category: newNoticeCategory
      })
    })
      .then(res => {
        if (!res.ok) throw new Error("Could not post notice");
        return res.json();
      })
      .then(data => {
        setNewNoticeSuccess('Notice published successfully!');
        setNewNoticeTitle('');
        setNewNoticeContent('');
        refreshNotices();
      })
      .catch(err => console.error(err));
  };

  const handleDeleteNotice = (id) => {
    if (!window.confirm("Are you sure you want to delete this notice?")) return;

    fetch(`${API_BASE}/portal/notice/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => {
        if (!res.ok) throw new Error("Deletion failed");
        return res.json();
      })
      .then(() => {
        refreshNotices();
      })
      .catch(err => console.error(err));
  };

  const handleRegisterUser = (e) => {
    e.preventDefault();
    setRegSuccess('');
    const newUser = {
      username: regUsername,
      name: regName,
      role: regRole,
      email: regEmail
    };
    setRosterUsers(prev => [...prev, newUser]);
    
    // Register interactive student dossiers record
    if (regRole === 'student') {
      setStudentDossiers(prev => ({
        ...prev,
        [regUsername]: {
          username: regUsername,
          name: regName,
          email: regEmail,
          department: regDept,
          fees: { total: 18500, paid: 0 },
          grades: [
            { subject: "Java Programming", exam: "Internal Test 1", marks: 0, max: 25 },
            { subject: "Database Systems", exam: "Internal Test 1", marks: 0, max: 25 }
          ],
          attendance: [
            { subject: "Java Programming", present: 0, total: 25 },
            { subject: "Software Engineering", present: 0, total: 25 },
            { subject: "Database Systems", present: 0, total: 25 }
          ],
          homework: []
        }
      }));
    }

    setRegSuccess(`Account profile for ${regName} (${regRole}) added successfully to roster!`);
    setRegUsername('');
    setRegName('');
    setRegEmail('');
  };

  const handleDeleteUser = (username) => {
    if (username === 'admin') {
      alert("System Safety: Root Super Admin account profile cannot be deleted.");
      return;
    }
    if (window.confirm(`Are you sure you want to delete profile for user ${username}?`)) {
      setRosterUsers(prev => prev.filter(u => u.username !== username));
      setStudentDossiers(prev => {
        const copy = { ...prev };
        delete copy[username];
        return copy;
      });
      if (activeDossierStudent === username) {
        setActiveDossierStudent(null);
      }
    }
  };

  const handleUpdateDossierMarks = (e) => {
    e.preventDefault();
    if (!activeDossierStudent) return;
    setStudentDossiers(prev => {
      const student = prev[activeDossierStudent];
      const gradesCopy = [...student.grades];
      const existIdx = gradesCopy.findIndex(g => g.subject === newMarkSubjectVal && g.exam === newMarkExamName);
      if (existIdx !== -1) {
        gradesCopy[existIdx].marks = Number(newMarkVal);
        gradesCopy[existIdx].max = Number(newMarkMax);
      } else {
        gradesCopy.push({ subject: newMarkSubjectVal, exam: newMarkExamName, marks: Number(newMarkVal), max: Number(newMarkMax) });
      }
      return {
        ...prev,
        [activeDossierStudent]: { ...student, grades: gradesCopy }
      };
    });
    alert(`Academic marks for ${newMarkSubjectVal} saved successfully!`);
  };

  const handleUpdateDossierAttendance = (e) => {
    e.preventDefault();
    if (!activeDossierStudent) return;
    setStudentDossiers(prev => {
      const student = prev[activeDossierStudent];
      const attCopy = [...student.attendance];
      const existIdx = attCopy.findIndex(a => a.subject === newAttSubjectVal);
      if (existIdx !== -1) {
        attCopy[existIdx].present = Number(newAttPresentVal);
        attCopy[existIdx].total = Number(newAttTotalVal);
      } else {
        attCopy.push({ subject: newAttSubjectVal, present: Number(newAttPresentVal), total: Number(newAttTotalVal) });
      }
      return {
        ...prev,
        [activeDossierStudent]: { ...student, attendance: attCopy }
      };
    });
    alert(`Attendance metrics for ${newAttSubjectVal} saved successfully!`);
  };

  const handleAddDossierHomework = (e) => {
    e.preventDefault();
    if (!activeDossierStudent || !newHwTitle.trim()) return;
    setStudentDossiers(prev => {
      const student = prev[activeDossierStudent];
      const hwCopy = [...student.homework, { title: newHwTitle, status: newHwStatus }];
      return {
        ...prev,
        [activeDossierStudent]: { ...student, homework: hwCopy }
      };
    });
    setNewHwTitle('');
    alert(`New homework assignment assigned!`);
  };

  const handleToggleHomeworkStatus = (index) => {
    if (!activeDossierStudent) return;
    setStudentDossiers(prev => {
      const student = prev[activeDossierStudent];
      const hwCopy = [...student.homework];
      if (hwCopy[index]) {
        hwCopy[index].status = hwCopy[index].status === 'Submitted' ? 'Pending' : 'Submitted';
      }
      return {
        ...prev,
        [activeDossierStudent]: { ...student, homework: hwCopy }
      };
    });
  };

  const handleSaveDossierFees = (e) => {
    e.preventDefault();
    if (!activeDossierStudent) return;
    setStudentDossiers(prev => {
      const student = prev[activeDossierStudent];
      return {
        ...prev,
        [activeDossierStudent]: {
          ...student,
          fees: {
            total: Number(editFeesTotal),
            paid: Number(editFeesPaid)
          }
        }
      };
    });
    alert(`Fee installment records updated successfully.`);
  };

  const handleApproveItem = (id) => {
    const item = pendingApprovals.find(i => i.id === id);
    if (!item) return;
    setPendingApprovals(prev => prev.filter(i => i.id !== id));
    setApprovedLogs(prev => [...prev, `${item.type} for ${item.name} Approved: ${item.desc}`]);
    alert(`${item.type} approved successfully.`);
  };

  const handleRejectItem = (id) => {
    const item = pendingApprovals.find(i => i.id === id);
    if (!item) return;
    setPendingApprovals(prev => prev.filter(i => i.id !== id));
    alert(`${item.type} declined/returned for correction.`);
  };

  const handleSaveVisualSettings = (e) => {
    e.preventDefault();
    setSettingsSuccess('');
    setSettingsError('');

    const updatedContent = {
      ...masterContent,
      girls_hostel: {
        title: masterContent?.girls_hostel?.title || "Girls' Hostel Facilities",
        details: hostelDesc.split('\n').filter(line => line.trim() !== ''),
        rules: hostelRulesText.split('\n').filter(line => line.trim() !== '')
      },
      scholarships: {
        title: masterContent?.scholarships?.title || "Government & Institutional Scholarships",
        details: scholarshipsText.split('\n').filter(line => line.trim() !== '')
      },
      infrastructure: {
        title: masterContent?.infrastructure?.title || "Campus Physical Infrastructure",
        details: infrastructureText.split('\n').filter(line => line.trim() !== '')
      }
    };

    fetch(`${API_BASE}/portal/master`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(updatedContent)
    })
      .then(res => {
        if (!res.ok) throw new Error("Saving visual settings failed");
        return res.json();
      })
      .then(() => {
        setSettingsSuccess('Website content configurations updated successfully!');
        setMasterContent(updatedContent);
        setRawJson(JSON.stringify(updatedContent, null, 2));
      })
      .catch(err => setSettingsError(err.message));
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    setSettingsSuccess('');
    setSettingsError('');

    try {
      const parsed = JSON.parse(rawJson);
      
      fetch(`${API_BASE}/portal/master`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(parsed)
      })
        .then(res => {
          if (!res.ok) throw new Error("Saving settings failed");
          return res.json();
        })
        .then(() => {
          setSettingsSuccess('Website configuration settings master_content.json updated successfully!');
          setMasterContent(parsed);
        })
        .catch(err => setSettingsError(err.message));
    } catch (err) {
      setSettingsError('Syntax Error: Invalid JSON schema format. Please verify missing commas or brackets.');
    }
  };

  const handleAddMarks = (e) => {
    e.preventDefault();
    setMarksSuccess('');
    setTimeout(() => {
      setMarksSuccess(`Marks for Student ID: ${selectedMarkStudent} saved successfully.`);
    }, 300);
  };

  const handleAddMaterial = (e) => {
    e.preventDefault();
    setNewMaterialSuccess('');
    const newMat = {
      subject: newMaterialSubject,
      title: newMaterialTitle,
      link: "/autonomous/PROSPECTUS_2025-26.pdf",
      date: new Date().toISOString().slice(0, 10)
    };
    setStudyMaterials([newMat, ...studyMaterials]);
    setNewMaterialTitle('');
    setNewMaterialSuccess('Study material slide deck published successfully.');
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar Navigation */}
      <div className="sidebar card" style={{ padding: '20px', height: 'fit-content' }}>
        <div style={{ padding: '10px 16px 20px', borderBottom: '1px solid var(--border-color)', marginBottom: '15px', textAlign: 'center' }}>
          <div style={{ width: '60px', height: '60px', borderRadius: '50px', background: 'var(--accent-indigo)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px', fontSize: '1.4rem', fontWeight: 'bold', color: '#ffffff' }}>
            {user.name.charAt(0)}
          </div>
          <h4 style={{ fontSize: '1rem', color: 'var(--text-primary)' }}>{user.name}</h4>
          <span className="badge badge-info" style={{ marginTop: '5px' }}>{user.role.toUpperCase()}</span>
        </div>

        <div className={`sidebar-item ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}>Profile Details</div>
        
        {user.role === 'student' && (
          <>
            <div className={`sidebar-item ${activeTab === 'attendance' ? 'active' : ''}`} onClick={() => setActiveTab('attendance')}>My Attendance</div>
            <div className={`sidebar-item ${activeTab === 'timetable' ? 'active' : ''}`} onClick={() => setActiveTab('timetable')}>My Timetable</div>
            <div className={`sidebar-item ${activeTab === 'fees' ? 'active' : ''}`} onClick={() => setActiveTab('fees')}>Fees Structure</div>
            <div className={`sidebar-item ${activeTab === 'assignments' ? 'active' : ''}`} onClick={() => setActiveTab('assignments')}>Assignments</div>
            <div className={`sidebar-item ${activeTab === 'grades' ? 'active' : ''}`} onClick={() => setActiveTab('grades')}>Academic Grades</div>
            <div className={`sidebar-item ${activeTab === 'student_exams' ? 'active' : ''}`} onClick={() => setActiveTab('student_exams')}>Examinations & Results</div>
            <div className={`sidebar-item ${activeTab === 'student_downloads' ? 'active' : ''}`} onClick={() => setActiveTab('student_downloads')}>ERP Downloads</div>
          </>
        )}

        {user.role === 'teacher' && (
          <>
            <div className={`sidebar-item ${activeTab === 'student_dossiers' ? 'active' : ''}`} onClick={() => setActiveTab('student_dossiers')}>Student Records Dossier</div>
            <div className={`sidebar-item ${activeTab === 'mark' ? 'active' : ''}`} onClick={() => setActiveTab('mark')}>Mark Attendance</div>
            <div className={`sidebar-item ${activeTab === 'marks_entry' ? 'active' : ''}`} onClick={() => setActiveTab('marks_entry')}>Marks Entry</div>
            <div className={`sidebar-item ${activeTab === 'material' ? 'active' : ''}`} onClick={() => setActiveTab('material')}>Study Materials</div>
            <div className={`sidebar-item ${activeTab === 'logs' ? 'active' : ''}`} onClick={() => setActiveTab('logs')}>Past Logs</div>
          </>
        )}

        {user.role === 'hod' && (
          <>
            <div className={`sidebar-item ${activeTab === 'hod_dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('hod_dashboard')}>Department Overview</div>
            <div className={`sidebar-item ${activeTab === 'hod_students' ? 'active' : ''}`} onClick={() => setActiveTab('hod_students')}>Department Students</div>
            <div className={`sidebar-item ${activeTab === 'hod_faculty' ? 'active' : ''}`} onClick={() => setActiveTab('hod_faculty')}>Faculty Workloads</div>
            <div className={`sidebar-item ${activeTab === 'hod_analytics' ? 'active' : ''}`} onClick={() => setActiveTab('hod_analytics')}>Academic Analytics</div>
            <div className={`sidebar-item ${activeTab === 'hod_approvals' ? 'active' : ''}`} onClick={() => setActiveTab('hod_approvals')}>Pending Approvals</div>
            <div className={`sidebar-item ${activeTab === 'notice' ? 'active' : ''}`} onClick={() => setActiveTab('notice')}>Post & Edit Notices</div>
          </>
        )}

        {user.role === 'principal' && (
          <>
            <div className={`sidebar-item ${activeTab === 'principal_overview' ? 'active' : ''}`} onClick={() => setActiveTab('principal_overview')}>Entire College Overview</div>
            <div className={`sidebar-item ${activeTab === 'principal_students' ? 'active' : ''}`} onClick={() => setActiveTab('principal_students')}>Search Students</div>
            <div className={`sidebar-item ${activeTab === 'principal_faculty' ? 'active' : ''}`} onClick={() => setActiveTab('principal_faculty')}>Faculty Workloads</div>
            <div className={`sidebar-item ${activeTab === 'principal_approvals' ? 'active' : ''}`} onClick={() => setActiveTab('principal_approvals')}>Calendar Approvals</div>
            <div className={`sidebar-item ${activeTab === 'principal_finances' ? 'active' : ''}`} onClick={() => setActiveTab('principal_finances')}>Fee Collections Audit</div>
          </>
        )}

        {user.role === 'admin' && (
          <>
            <div className={`sidebar-item ${activeTab === 'student_dossiers' ? 'active' : ''}`} onClick={() => setActiveTab('student_dossiers')}>Student Records Dossier</div>
            <div className={`sidebar-item ${activeTab === 'mark' ? 'active' : ''}`} onClick={() => setActiveTab('mark')}>Mark Attendance</div>
            <div className={`sidebar-item ${activeTab === 'notice' ? 'active' : ''}`} onClick={() => setActiveTab('notice')}>Post & Edit Notices</div>
            <div className={`sidebar-item ${activeTab === 'register' ? 'active' : ''}`} onClick={() => setActiveTab('register')}>Register Users</div>
            <div className={`sidebar-item ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab('settings')}>Content Editor</div>
          </>
        )}
      </div>

      {/* Main Panel Content */}
      <div className="dashboard-content card" style={{ padding: '40px' }}>
        
        {/* TAB: PROFILE */}
        {activeTab === 'profile' && profile && (
          <div>
            <h2 style={{ marginBottom: '20px' }}>Official Portal Profile Details</h2>
            
            {user.role === 'student' ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                {/* Academic Metadata Card */}
                <div className="card" style={{ padding: '30px', display: 'grid', gridTemplateColumns: '150px 1fr', gap: '30px', alignItems: 'center' }}>
                  <div style={{ width: '130px', height: '130px', borderRadius: '15px', overflow: 'hidden', border: '2px solid var(--border-color)' }}>
                    <img src={profilePhoto} alt="Student avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div>
                    <span class="badge badge-info" style={{ marginBottom: '10px' }}>ACTIVE ENROLLMENT</span>
                    <h3 style={{ margin: '0 0 5px' }}>{profile.name}</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px', fontSize: '0.85rem', color: 'var(--text-secondary)' }} className="grid-3">
                      <div><strong>Roll ID:</strong> CS-2025-01</div>
                      <div><strong>PRN:</strong> 202507390192</div>
                      <div><strong>Department:</strong> {profile.department}</div>
                      <div><strong>Semester:</strong> Semester III</div>
                      <div><strong>Division:</strong> A</div>
                    </div>
                  </div>
                </div>

                {/* Personal & Parent Dossier */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }} className="grid-2">
                  <div className="card" style={{ padding: '25px' }}>
                    <h3 style={{ marginBottom: '15px' }}>Personal Dossier</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
                      <div><strong>Blood Group:</strong> O+</div>
                      <div><strong>Aadhaar Number:</strong> 4829 3829 0192</div>
                      <div><strong>Admission Category:</strong> OBC</div>
                      <div><strong>Emergency Hotline:</strong> {profilePhone}</div>
                      <div>
                        <strong>Verified Certificates:</strong>
                        <ul style={{ paddingLeft: '20px', marginTop: '5px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                          <li>10th Passing Certificate</li>
                          <li>12th Marksheet</li>
                          <li>Leaving Certificate (LC)</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="card" style={{ padding: '25px' }}>
                    <h3 style={{ marginBottom: '15px' }}>Parental Custody</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
                      <div><strong>Father Name:</strong> Sanjay Sharma</div>
                      <div><strong>Father Mobile Contact:</strong> +91 9422039201</div>
                    </div>
                  </div>
                </div>

                {/* Editable Profile Information Form */}
                <div class="card" style={{ padding: '30px' }}>
                  <h3 style={{ marginBottom: '20px' }}>Edit Contact Details & Credentials</h3>
                  <form onSubmit={e => { e.preventDefault(); alert('Profile credentials updated successfully!'); }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="grid-2">
                      <div className="form-group">
                        <label className="form-label">Phone Number</label>
                        <input type="text" className="form-input" value={profilePhone} onChange={e => setProfilePhone(e.target.value)} required />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Official Email</label>
                        <input type="email" className="form-input" value={profileEmail} onChange={e => setProfileEmail(e.target.value)} required />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Permanent Home Address</label>
                      <input type="text" className="form-input" value={profileAddress} onChange={e => setProfileAddress(e.target.value)} required />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="grid-2">
                      <div className="form-group">
                        <label className="form-label">Portal Password</label>
                        <input type="password" className="form-input" value={profilePass} onChange={e => setProfilePass(e.target.value)} required />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Avatar Photo URL</label>
                        <input type="text" className="form-input" value={profilePhoto} onChange={e => setProfilePhoto(e.target.value)} required />
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Save Profile Credentials</button>
                  </form>
                </div>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="grid-2">
                <div style={{ padding: '15px 20px', background: 'rgba(0,0,0,0.01)', border: '1px solid var(--border-color)', borderRadius: '10px' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Full Name</div>
                  <div style={{ fontWeight: '600', fontSize: '1.1rem', color: 'var(--text-primary)' }}>{profile.name}</div>
                </div>
                <div style={{ padding: '15px 20px', background: 'rgba(0,0,0,0.01)', border: '1px solid var(--border-color)', borderRadius: '10px' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Portal User ID</div>
                  <div style={{ fontWeight: '600', fontSize: '1.1rem', color: 'var(--text-primary)' }}>{profile.id}</div>
                </div>
                <div style={{ padding: '15px 20px', background: 'rgba(0,0,0,0.01)', border: '1px solid var(--border-color)', borderRadius: '10px' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Department Scope</div>
                  <div style={{ fontWeight: '600', fontSize: '1.1rem', color: 'var(--text-primary)' }}>{profile.department || 'General Administration'}</div>
                </div>
                <div style={{ padding: '15px 20px', background: 'rgba(0,0,0,0.01)', border: '1px solid var(--border-color)', borderRadius: '10px' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Official Email</div>
                  <div style={{ fontWeight: '600', fontSize: '1.1rem', color: 'var(--text-primary)' }}>{profile.email || 'N/A'}</div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* STUDENT TAB: ATTENDANCE */}
        {activeTab === 'attendance' && user.role === 'student' && (
          <div>
            <h2 style={{ marginBottom: '20px' }}>My Academic Attendance Tracker</h2>
            <div className="grid-3" style={{ marginBottom: '35px' }}>
              {attendanceSummary.map((item, idx) => (
                <div key={idx} className="card" style={{ padding: '20px', textAlign: 'center', borderTop: `4px solid ${item.percentage >= 75 ? 'var(--accent-teal)' : 'var(--accent-rose)'}` }}>
                  <div style={{ color: 'var(--text-primary)', fontSize: '1rem', fontWeight: '700', marginBottom: '10px' }}>{item.subject}</div>
                  <div style={{ fontSize: '2rem', fontWeight: '800', color: item.percentage >= 75 ? 'var(--accent-teal)' : 'var(--accent-rose)', margin: '10px 0' }}>
                    {item.percentage}%
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    Present: {item.present} / Total: {item.total} lectures
                  </div>
                </div>
              ))}
            </div>
            {attendanceSummary.length === 0 && <p style={{ color: 'var(--text-secondary)' }}>No attendance logs loaded for this term.</p>}
          </div>
        )}

        {/* STUDENT TAB: TIMETABLE */}
        {activeTab === 'timetable' && user.role === 'student' && (
          <div>
            <h2 style={{ marginBottom: '20px' }}>Daily Lecture Schedule Timetable</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {studentTimetable.map((slot, idx) => (
                <div key={idx} style={{ display: 'grid', gridTemplateColumns: '180px 1fr', padding: '15px 20px', border: '1px solid var(--border-color)', borderRadius: '12px', background: 'rgba(0,0,0,0.01)' }} className="grid-2">
                  <strong style={{ color: 'var(--accent-indigo)' }}>{slot.time}</strong>
                  <div>
                    <h4 style={{ margin: '0 0 4px', fontSize: '1rem' }}>{slot.subject}</h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>📍 {slot.room} | 👨‍🏫 Teacher: {slot.teacher}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STUDENT TAB: FEES */}
        {activeTab === 'fees' && user.role === 'student' && (
          <div>
            <h2 style={{ marginBottom: '20px' }}>Program Fee Structure & Receipt Status</h2>
            <div className="grid-3" style={{ marginBottom: '35px' }}>
              <div className="card" style={{ padding: '20px', textAlign: 'center' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Total Course Fee</span>
                <h3 style={{ fontSize: '1.8rem', color: 'var(--text-primary)', marginTop: '5px' }}>₹{studentFeesBreakdown.total}</h3>
              </div>
              <div className="card" style={{ padding: '20px', textAlign: 'center', borderTop: '4px solid var(--accent-teal)' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Total Paid Amount</span>
                <h3 style={{ fontSize: '1.8rem', color: 'var(--accent-teal)', marginTop: '5px' }}>₹{studentFeesBreakdown.paid}</h3>
              </div>
              <div className="card" style={{ padding: '20px', textAlign: 'center', borderTop: '4px solid var(--accent-amber)' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Outstanding Balance</span>
                <h3 style={{ fontSize: '1.8rem', color: 'var(--accent-amber)', marginTop: '5px' }}>₹{studentFeesBreakdown.balance}</h3>
              </div>
            </div>

            <h4>Installment History Receipts</h4>
            <div className="table-container" style={{ marginTop: '15px' }}>
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Term / Description</th>
                    <th>Payment Date</th>
                    <th>Amount Due</th>
                    <th>Transaction Status</th>
                  </tr>
                </thead>
                <tbody>
                  {studentFeesBreakdown.installments.map((inst, idx) => (
                    <tr key={idx}>
                      <td><strong>{inst.term}</strong></td>
                      <td>{inst.date}</td>
                      <td>₹{inst.amount}</td>
                      <td>
                        <span className={`badge ${inst.status === 'Paid' ? 'badge-success' : 'badge-warning'}`}>{inst.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* STUDENT TAB: ASSIGNMENTS */}
        {activeTab === 'assignments' && user.role === 'student' && (
          <div>
            <h2 style={{ marginBottom: '20px' }}>Course Assignments Center</h2>
            <div className="table-container">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Assignment Title</th>
                    <th>Subject Scope</th>
                    <th>Due Deadline Date</th>
                    <th>Submission Status</th>
                  </tr>
                </thead>
                <tbody>
                  {studentAssignments.map((a, idx) => (
                    <tr key={idx}>
                      <td><strong>{a.title}</strong></td>
                      <td>{a.subject}</td>
                      <td>{a.deadline}</td>
                      <td>
                        <span className={`badge ${a.status === 'Submitted' ? 'badge-success' : 'badge-danger'}`}>{a.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* STUDENT TAB: GRADES */}
        {activeTab === 'grades' && user.role === 'student' && (
          <div>
            <h2 style={{ marginBottom: '20px' }}>Term Examination Report Card</h2>
            <div className="table-container">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Subject Name</th>
                    <th>Exam Name</th>
                    <th>Marks Obtained</th>
                    <th>Max Marks</th>
                    <th>Grade Status</th>
                  </tr>
                </thead>
                <tbody>
                  {grades.map((g, idx) => (
                    <tr key={idx}>
                      <td><strong>{g.subject}</strong></td>
                      <td>{g.exam_name}</td>
                      <td>{g.marks_obtained}</td>
                      <td>{g.marks_total}</td>
                      <td>
                        <span className={`badge ${g.marks_obtained / g.marks_total >= 0.8 ? 'badge-success' : 'badge-info'}`}>
                          {g.marks_obtained / g.marks_total >= 0.8 ? 'Excellent' : 'Passed'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {grades.length === 0 && <p style={{ color: 'var(--text-secondary)', padding: '20px' }}>No grades cataloged yet.</p>}
            </div>
          </div>
        )}

        {/* STUDENT TAB: EXAMINATIONS */}
        {activeTab === 'student_exams' && user.role === 'student' && (
          <div>
            <h2 style={{ marginBottom: '20px' }}>Terminal Examinations Hall Ticket & Outcomes</h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }} className="grid-2">
              {/* Hall Ticket Card */}
              <div className="card" style={{ padding: '30px', border: '2px dashed var(--border-color)', borderRadius: '20px' }}>
                <div style={{ textAlign: 'center', marginBottom: '20px', borderBottom: '2px solid var(--border-color)', paddingBottom: '15px' }}>
                  <h3 style={{ margin: 0 }}>COCSIT AUTONOMOUS COLLEGE, LATUR</h3>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>ADMIT CARD / HALL TICKET - NOV-DEC 2026</span>
                </div>
                
                <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                  <img src={profilePhoto} style={{ width: '80px', height: '80px', borderRadius: '8px', objectFit: 'cover' }} />
                  <div>
                    <h4 style={{ margin: 0 }}>{profile.name}</h4>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '5px' }}>
                      Roll No: <strong>CS-2025-01</strong> | PRN: <strong>202507390192</strong><br/>
                      Class: <strong>BCA SY A</strong> | Term: <strong>Semester III</strong>
                    </div>
                  </div>
                </div>

                <div className="table-container">
                  <table className="custom-table" style={{ fontSize: '0.85rem' }}>
                    <thead>
                      <tr><th>Subject Code</th><th>Subject Name</th><th>Exam Date</th><th>Session Time</th></tr>
                    </thead>
                    <tbody>
                      <tr><td>BCA-301</td><td>Java Programming Core</td><td>2026-11-20</td><td>10:00 AM - 01:00 PM</td></tr>
                      <tr><td>BCA-302</td><td>Database Systems Architecture</td><td>2026-11-22</td><td>10:00 AM - 01:00 PM</td></tr>
                      <tr><td>BCA-303</td><td>Software Engineering</td><td>2026-11-24</td><td>10:00 AM - 01:00 PM</td></tr>
                    </tbody>
                  </table>
                </div>

                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>* Subject to 75% attendance verification.</span>
                  <button className="btn btn-secondary" style={{ padding: '6px 14px', fontSize: '0.8rem' }} onClick={() => alert('Printing Hall Ticket admitted copy...')}>🖨️ Print Admit Card</button>
                </div>
              </div>

              {/* Cumulative GPA Card */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div className="card" style={{ padding: '25px', textAlign: 'center', borderTop: '4px solid var(--accent-teal)' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>SGPA (Current Semester)</span>
                  <h2 style={{ fontSize: '3rem', color: 'var(--accent-teal)', margin: '10px 0' }}>8.75</h2>
                  <span className="badge badge-success">Grade: A+</span>
                </div>
                <div className="card" style={{ padding: '25px', textAlign: 'center', borderTop: '4px solid var(--accent-indigo)' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>CGPA (Overall Cumulative)</span>
                  <h2 style={{ fontSize: '3rem', color: 'var(--accent-indigo)', margin: '10px 0' }}>8.88</h2>
                  <span className="badge badge-info">Distinction Roster</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STUDENT TAB: DOWNLOADS */}
        {activeTab === 'student_downloads' && user.role === 'student' && (
          <div>
            <h2 style={{ marginBottom: '20px' }}>Student ERP Forms & Certificates Center</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '20px' }}>
              Download official applications, certificates templates, and NEP syllabus copies verified by academic board.
            </p>
            <div className="table-container">
              <table class="custom-table">
                <thead>
                  <tr><th>Document Title</th><th>Category Scope</th><th>File Size</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Bonafide Certificate Request Form</strong></td>
                    <td>Academic Forms</td>
                    <td>142 KB</td>
                    <td><button className="btn btn-primary" style={{ padding: '5px 12px', fontSize: '0.75rem' }} onClick={() => alert('Downloading Bonafide request form...')}>📥 Download</button></td>
                  </tr>
                  <tr>
                    <td><strong>Government Scholarship Eligibility circular</strong></td>
                    <td>Scholarships</td>
                    <td>250 KB</td>
                    <td><button className="btn btn-primary" style={{ padding: '5px 12px', fontSize: '0.75rem' }} onClick={() => alert('Downloading Scholarship Form PDF...')}>📥 Download</button></td>
                  </tr>
                  <tr>
                    <td><strong>Anti Ragging affidavit compliance format</strong></td>
                    <td>Declarations</td>
                    <td>110 KB</td>
                    <td><button className="btn btn-primary" style={{ padding: '5px 12px', fontSize: '0.75rem' }} onClick={() => alert('Downloading compliance manual...')}>📥 Download</button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* PRINCIPAL TAB: OVERVIEW */}
        {activeTab === 'principal_overview' && user.role === 'principal' && (
          <div>
            <h2 style={{ marginBottom: '25px' }}>College Academic Analytics & Statistics</h2>
            
            <div className="grid-4" style={{ marginBottom: '35px' }}>
              <div className="card" style={{ padding: '20px', textAlign: 'center' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Total Enrolled Students</span>
                <h3 style={{ fontSize: '1.8rem', marginTop: '5px' }}>4,180</h3>
                <span className="badge badge-success" style={{ marginTop: '5px', fontSize: '0.65rem' }}>+12% Admission</span>
              </div>
              <div className="card" style={{ padding: '20px', textAlign: 'center' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Active Faculty Roster</span>
                <h3 style={{ fontSize: '1.8rem', marginTop: '5px' }}>124</h3>
                <span className="badge badge-info" style={{ marginTop: '5px', fontSize: '0.65rem' }}>NEP Trained</span>
              </div>
              <div className="card" style={{ padding: '20px', textAlign: 'center' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Overall Attendance Avg</span>
                <h3 style={{ fontSize: '1.8rem', marginTop: '5px', color: 'var(--accent-teal)' }}>86.4%</h3>
                <span className="badge badge-success" style={{ marginTop: '5px', fontSize: '0.65rem' }}>Ideal Threshold</span>
              </div>
              <div className="card" style={{ padding: '20px', textAlign: 'center' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Mock Fees Collected</span>
                <h3 style={{ fontSize: '1.8rem', marginTop: '5px', color: 'var(--accent-amber)' }}>₹56.0L</h3>
                <span className="badge badge-warning" style={{ marginTop: '5px', fontSize: '0.65rem' }}>75% Target</span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }} className="grid-2">
              <div className="card" style={{ padding: '25px' }}>
                <h3>Academic Research Publications</h3>
                <ul style={{ paddingLeft: '20px', marginTop: '15px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  <li>Biotech division: 14 papers published in Scopus index indexes.</li>
                  <li>CS division: 18 papers cataloged under international journals.</li>
                  <li>Patents approved: 2 registered under autonomous advisory boards.</li>
                </ul>
              </div>
              <div className="card" style={{ padding: '25px' }}>
                <h3>Placement Highlights</h3>
                <div style={{ marginTop: '15px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  <div>Highest annual CTC: <strong>₹6.5 LPA</strong></div>
                  <div>Average CTC: <strong>₹3.2 LPA</strong></div>
                  <div>Total recruiters: <strong>Tech Mahindra, TCS, Wipro, Infosys</strong></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PRINCIPAL TAB: SEARCH STUDENTS */}
        {activeTab === 'principal_students' && user.role === 'principal' && (
          <div>
            <h2 style={{ marginBottom: '10px' }}>Global Student Registry Directory</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '25px' }}>
              Principal Oversight: Search and inspect any student profile across the institution. Profile details are strictly read-only.
            </p>
            
            {/* Search and Filters grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '15px', marginBottom: '25px' }} className="grid-4">
              <input 
                type="text" 
                className="form-input" 
                placeholder="🔍 Search student name or ID..." 
                value={principalSearchQuery}
                onChange={e => setPrincipalSearchQuery(e.target.value)}
              />
              <select className="form-input" value={principalDeptFilter} onChange={e => setPrincipalDeptFilter(e.target.value)}>
                <option value="all">All Departments</option>
                <option value="Computer Science">Computer Science</option>
              </select>
              <select className="form-input" value={principalSemFilter} onChange={e => setPrincipalSemFilter(e.target.value)}>
                <option value="all">All Semesters</option>
                <option value="Semester III">Semester III</option>
              </select>
              <select className="form-input" value={principalFeeFilter} onChange={e => setPrincipalFeeFilter(e.target.value)}>
                <option value="all">All Fees Status</option>
                <option value="Fully Cleared">Fully Cleared</option>
                <option value="Partially Paid">Partially Paid</option>
              </select>
            </div>

            <div className="table-container">
              <table className="custom-table">
                <thead>
                  <tr><th>PRN / Roll</th><th>Name</th><th>Department</th><th>Semester</th><th>Paid/Total Fees</th><th>Inspection</th></tr>
                </thead>
                <tbody>
                  {Object.values(studentDossiers)
                    .filter(stud => {
                      const matchName = stud.name.toLowerCase().includes(principalSearchQuery.toLowerCase()) || stud.username.toLowerCase().includes(principalSearchQuery.toLowerCase());
                      const matchDept = principalDeptFilter === 'all' || stud.department === principalDeptFilter;
                      const matchSem = principalSemFilter === 'all' || stud.semester === principalSemFilter;
                      const matchFee = principalFeeFilter === 'all' || 
                        (principalFeeFilter === 'Fully Cleared' && stud.fees.paid === stud.fees.total) ||
                        (principalFeeFilter === 'Partially Paid' && stud.fees.paid < stud.fees.total);
                      return matchName && matchDept && matchSem && matchFee;
                    })
                    .map(stud => (
                      <tr key={stud.username}>
                        <td><code>{stud.prn}</code><br/><span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{stud.roll}</span></td>
                        <td><strong>{stud.name}</strong><br/><span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{stud.email}</span></td>
                        <td>{stud.department}</td>
                        <td>{stud.semester} (Div {stud.division})</td>
                        <td>₹{stud.fees.paid} / ₹{stud.fees.total}</td>
                        <td>
                          <button 
                            className="btn btn-secondary" 
                            style={{ padding: '4px 10px', fontSize: '0.75rem' }} 
                            onClick={() => {
                              const attAvg = Math.round(stud.attendance.reduce((acc, curr) => acc + (curr.present/curr.total)*100, 0) / stud.attendance.length);
                              alert(`STUDENT REPORT DOSSIER AUDIT:\n----------------------------------\nName: ${stud.name}\nPRN: ${stud.prn}\nFather: ${stud.parentName}\nAdmission Category: ${stud.category}\nTerm Attendance Avg: ${attAvg}%\nTotal Fees Assigned: ₹${stud.fees.total}\nTotal Paid: ₹${stud.fees.paid}\nVerified Documents: ${stud.documents.join(', ')}\n\n(Academic marks and edits are handled by HOD/Faculty only)`);
                            }}
                          >
                            👁️ View Dossier Audit
                          </button>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* PRINCIPAL TAB: FACULTY WORKLOAD */}
        {activeTab === 'principal_faculty' && user.role === 'principal' && (
          <div>
            <h2 style={{ marginBottom: '20px' }}>Entire Faculty Qualifications & Workloads</h2>
            <div className="table-container">
              <table className="custom-table">
                <thead>
                  <tr><th>Faculty Name</th><th>Qualification</th><th>Department</th><th>Assigned Workload</th><th>Experience</th></tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Dr. N. S. Zulpe</strong></td>
                    <td>Ph.D (Computer Science)</td>
                    <td>Computer Science</td>
                    <td>14 hours / week</td>
                    <td>18+ Years</td>
                  </tr>
                  <tr>
                    <td><strong>Prof. Rajesh Patil</strong></td>
                    <td>MCA, NET</td>
                    <td>Computer Science</td>
                    <td>16 hours / week</td>
                    <td>12+ Years</td>
                  </tr>
                  <tr>
                    <td><strong>Dr. N. V. More</strong></td>
                    <td>Ph.D (Biotechnology)</td>
                    <td>Biotechnology</td>
                    <td>12 hours / week</td>
                    <td>15+ Years</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* PRINCIPAL TAB: APPROVALS */}
        {activeTab === 'principal_approvals' && user.role === 'principal' && (
          <div>
            <h2 style={{ marginBottom: '20px' }}>Principal Approvals Desk</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '25px' }}>
              Approve college-wide leave requests, department events, project proposals, and circular bulletins.
            </p>
            
            <h3 style={{ marginBottom: '15px' }}>Pending Approvals queue ({pendingApprovals.length} items)</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '35px' }}>
              {pendingApprovals.map(app => (
                <div key={app.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 20px', border: '1px solid var(--border-color)', borderRadius: '12px', background: 'rgba(0,0,0,0.01)' }}>
                  <div>
                    <span className="badge badge-info" style={{ marginRight: '10px' }}>{app.type}</span>
                    <strong>{app.name}</strong>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>{app.desc}</div>
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button className="btn btn-primary" style={{ padding: '6px 12px', fontSize: '0.75rem' }} onClick={() => handleApproveItem(app.id)}>Approve</button>
                    <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.75rem', color: 'var(--accent-rose)' }} onClick={() => handleRejectItem(app.id)}>Decline</button>
                  </div>
                </div>
              ))}
              {pendingApprovals.length === 0 && <p style={{ color: 'var(--text-secondary)' }}>No pending approvals requests.</p>}
            </div>

            <h3>Past Approved Logs</h3>
            <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              {approvedLogs.map((log, idx) => <li key={idx} style={{ marginBottom: '5px' }}>{log}</li>)}
            </ul>
          </div>
        )}

        {/* PRINCIPAL TAB: FEE collections AUDIT */}
        {activeTab === 'principal_finances' && user.role === 'principal' && (
          <div>
            <h2 style={{ marginBottom: '25px' }}>Fee Collections Audit Ledgers</h2>
            
            <div className="grid-3" style={{ marginBottom: '35px' }}>
              <div className="card" style={{ padding: '20px', textAlign: 'center' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Total Fee Assessed</span>
                <h3>₹74,000</h3>
              </div>
              <div className="card" style={{ padding: '20px', textAlign: 'center', borderTop: '4px solid var(--accent-teal)' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Collected Amount</span>
                <h3 style={{ color: 'var(--accent-teal)' }}>₹55,500</h3>
              </div>
              <div className="card" style={{ padding: '20px', textAlign: 'center', borderTop: '4px solid var(--accent-amber)' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Pending Arrears</span>
                <h3 style={{ color: 'var(--accent-amber)' }}>₹18,500</h3>
              </div>
            </div>

            <div className="table-container">
              <table className="custom-table">
                <thead>
                  <tr><th>Student Name</th><th>PRN Code</th><th>Total Assigned</th><th>Total Paid</th><th>Outstanding Balance</th></tr>
                </thead>
                <tbody>
                  {feesAuditEntries.map((e, idx) => (
                    <tr key={idx}>
                      <td><strong>{e.name}</strong></td>
                      <td><code>{e.prn}</code></td>
                      <td>₹{e.total}</td>
                      <td style={{ color: 'var(--accent-teal)', fontWeight: 'bold' }}>₹{e.paid}</td>
                      <td style={{ color: 'var(--accent-amber)', fontWeight: 'bold' }}>₹{e.total - e.paid}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* HOD TAB: OVERVIEW */}
        {activeTab === 'hod_dashboard' && user.role === 'hod' && (
          <div>
            <h2 style={{ marginBottom: '20px' }}>Department Management Control Desk</h2>
            <span className="badge badge-info" style={{ marginBottom: '25px', padding: '6px 12px' }}>
              DEPT: {user.department ? user.department.toUpperCase() : "COMPUTER SCIENCE"}
            </span>

            <div className="grid-4" style={{ marginBottom: '35px' }}>
              <div className="card" style={{ padding: '20px', textAlign: 'center' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Faculty Count</span>
                <h3 style={{ fontSize: '1.8rem', marginTop: '5px' }}>{user.username === 'hod_cs' ? '3 Active' : '2 Active'}</h3>
                <span className="badge badge-success" style={{ marginTop: '5px', fontSize: '0.65rem' }}>Allocated Load</span>
              </div>
              <div className="card" style={{ padding: '20px', textAlign: 'center' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Student Strength</span>
                <h3 style={{ fontSize: '1.8rem', marginTop: '5px' }}>{user.username === 'hod_cs' ? '3 Enrolled' : '1 Enrolled'}</h3>
                <span className="badge badge-info" style={{ marginTop: '5px', fontSize: '0.65rem' }}>Active Terms</span>
              </div>
              <div className="card" style={{ padding: '20px', textAlign: 'center' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Average Attendance</span>
                <h3 style={{ fontSize: '1.8rem', marginTop: '5px', color: 'var(--accent-teal)' }}>85.7%</h3>
                <span className="badge badge-success" style={{ marginTop: '5px', fontSize: '0.65rem' }}>Target Passed</span>
              </div>
              <div className="card" style={{ padding: '20px', textAlign: 'center' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Placements Roster</span>
                <h3 style={{ fontSize: '1.8rem', marginTop: '5px', color: 'var(--accent-amber)' }}>14 Hired</h3>
                <span className="badge badge-warning" style={{ marginTop: '5px', fontSize: '0.65rem' }}>TechM, TCS</span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }} className="grid-2">
              <div className="card" style={{ padding: '25px' }}>
                <h3>Add Department Event</h3>
                <form onSubmit={e => {
                  e.preventDefault();
                  if (!newEventTitle || !newEventDate) return;
                  setHodEvents([...hodEvents, { id: Date.now(), title: newEventTitle, date: newEventDate }]);
                  setNewEventTitle('');
                  setNewEventDate('');
                  alert('Department seminar/event scheduled successfully.');
                }} style={{ marginTop: '15px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label">Event Topic</label>
                    <input type="text" className="form-input" value={newEventTitle} onChange={e => setNewEventTitle(e.target.value)} placeholder="e.g. Kotlin Workshop" required />
                  </div>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label">Schedule Date</label>
                    <input type="date" className="form-input" value={newEventDate} onChange={e => setNewEventDate(e.target.value)} required />
                  </div>
                  <button type="submit" className="btn btn-primary">Schedule Event</button>
                </form>
              </div>

              <div className="card" style={{ padding: '25px' }}>
                <h3>Scheduled Seminars & Tech-Events</h3>
                <div style={{ marginTop: '15px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {hodEvents.map(ev => (
                    <div key={ev.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
                      <strong>{ev.title}</strong>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>📅 {ev.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* HOD TAB: DEPARTMENT STUDENTS */}
        {activeTab === 'hod_students' && user.role === 'hod' && (
          <div>
            <h2>Department Registry Directory</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '25px' }}>
              Search and audit student profiles belonging to the {user.department || "Computer Science"} department.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '15px', marginBottom: '25px' }} className="grid-3">
              <input 
                type="text" 
                className="form-input" 
                placeholder="🔍 Search name or Roll ID..." 
                value={hodSearchQuery}
                onChange={e => setHodSearchQuery(e.target.value)}
              />
              <select className="form-input" value={hodSemFilter} onChange={e => setHodSemFilter(e.target.value)}>
                <option value="all">All Semesters</option>
                <option value="Semester III">Semester III</option>
              </select>
              <select className="form-input" value={hodDivFilter} onChange={e => setHodDivFilter(e.target.value)}>
                <option value="all">All Divisions</option>
                <option value="A">A</option>
                <option value="B">B</option>
              </select>
            </div>

            <div className="table-container">
              <table className="custom-table">
                <thead>
                  <tr><th>PRN / Roll</th><th>Name</th><th>Course</th><th>Semester</th><th>Fees Status</th><th>Action</th></tr>
                </thead>
                <tbody>
                  {Object.values(studentDossiers)
                    .filter(stud => {
                      if (user.username === 'hod_cs' && stud.department !== 'Computer Science') return false;
                      if (user.username === 'hod_mgmt' && stud.department !== 'Management Science') return false;
                      
                      const matchName = stud.name.toLowerCase().includes(hodSearchQuery.toLowerCase()) || stud.username.toLowerCase().includes(hodSearchQuery.toLowerCase());
                      const matchSem = hodSemFilter === 'all' || stud.semester === hodSemFilter;
                      const matchDiv = hodDivFilter === 'all' || stud.division === hodDivFilter;
                      return matchName && matchSem && matchDiv;
                    })
                    .map(stud => (
                      <tr key={stud.username}>
                        <td><code>{stud.prn || "202507390192"}</code><br/><span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{stud.roll}</span></td>
                        <td><strong>{stud.name}</strong><br/><span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{stud.email}</span></td>
                        <td><span className="badge badge-info">{stud.course || 'BCA'}</span></td>
                        <td>{stud.semester} (Div {stud.division})</td>
                        <td>
                          <span className={`badge ${stud.fees.paid === stud.fees.total ? 'badge-success' : 'badge-warning'}`}>
                            {stud.fees.paid === stud.fees.total ? 'Cleared' : `Due: ₹${stud.fees.total - stud.fees.paid}`}
                          </span>
                        </td>
                        <td>
                          <button className="btn btn-secondary" style={{ padding: '4px 10px', fontSize: '0.75rem' }} onClick={() => setSelectedHodStudent(stud)}>
                            🔍 Inspect Profile
                          </button>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>

            {/* Student details inspect drawer/modal */}
            {selectedHodStudent && (
              <div className="modal-overlay" onClick={() => setSelectedHodStudent(null)}>
                <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '800px', width: '90%' }}>
                  <h3 style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '15px', marginBottom: '20px' }}>
                    Student Dossier Profile: {selectedHodStudent.name}
                  </h3>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', fontSize: '0.9rem', marginBottom: '25px' }} className="grid-2">
                    <div>
                      <div><strong>Roll ID:</strong> {selectedHodStudent.roll}</div>
                      <div><strong>PRN Code:</strong> {selectedHodStudent.prn || "202507390192"}</div>
                      <div><strong>Official Email:</strong> {selectedHodStudent.email}</div>
                      <div><strong>Home Address:</strong> {selectedHodStudent.address}</div>
                      <div><strong>Aadhaar Card:</strong> {selectedHodStudent.aadhaar || "4829 3829 0192"}</div>
                    </div>
                    <div>
                      <div><strong>Admission Category:</strong> {selectedHodStudent.category}</div>
                      <div><strong>Father:</strong> {selectedHodStudent.parentName}</div>
                      <div><strong>Parent Phone:</strong> {selectedHodStudent.parentPhone}</div>
                      <div><strong>Blood Group:</strong> {selectedHodStudent.bloodGroup}</div>
                      <div><strong>Emergency Hotline:</strong> {selectedHodStudent.phone}</div>
                    </div>
                  </div>

                  <h4>Academic Marks Summary</h4>
                  <div className="table-container" style={{ margin: '15px 0 25px' }}>
                    <table className="custom-table" style={{ fontSize: '0.8rem' }}>
                      <thead>
                        <tr><th>Subject</th><th>Exam</th><th>Marks</th><th>Max</th></tr>
                      </thead>
                      <tbody>
                        {selectedHodStudent.grades.map((g, idx) => (
                          <tr key={idx}><td>{g.subject}</td><td>{g.exam}</td><td><strong>{g.marks}</strong></td><td>{g.max}</td></tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <button className="btn btn-secondary" style={{ float: 'right' }} onClick={() => setSelectedHodStudent(null)}>Close Inspection</button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* HOD TAB: FACULTY WORKLOADS */}
        {activeTab === 'hod_faculty' && user.role === 'hod' && (
          <div>
            <h2>Department Faculty Qualifications & workloads</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '25px' }}>
              Workloads monitoring directory for {user.department || "Computer Science"} department.
            </p>
            <div className="table-container">
              <table className="custom-table">
                <thead>
                  <tr><th>Faculty Name</th><th>Qualification</th><th>Subject workload</th><th>Teaching Experience</th><th>Workload status</th></tr>
                </thead>
                <tbody>
                  {user.username === 'hod_cs' ? (
                    <>
                      <tr>
                        <td><strong>Dr. N. S. Zulpe (HOD)</strong></td>
                        <td>Ph.D (Computer Science)</td>
                        <td>Java Programming Core, Research Seminars</td>
                        <td>18+ Years</td>
                        <td><span className="badge badge-success">Approved (14 hrs)</span></td>
                      </tr>
                      <tr>
                        <td><strong>Prof. Rajesh Patil</strong></td>
                        <td>MCA, NET</td>
                        <td>Java Programming, Database Systems</td>
                        <td>12+ Years</td>
                        <td><span className="badge badge-success">Approved (16 hrs)</span></td>
                      </tr>
                    </>
                  ) : (
                    <tr>
                      <td><strong>Dr. K. S. Patil (HOD)</strong></td>
                      <td>Ph.D (Management Science)</td>
                      <td>Business Management, Retail Economics</td>
                      <td>15+ Years</td>
                      <td><span className="badge badge-success">Approved (12 hrs)</span></td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* HOD TAB: ACADEMIC ANALYTICS */}
        {activeTab === 'hod_analytics' && user.role === 'hod' && (
          <div>
            <h2>Department Academic Performance Analytics</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginTop: '25px' }} className="grid-2">
              <div className="card" style={{ padding: '25px' }}>
                <h3>Semester Pass Rates</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '5px' }}>
                      <span>BCA Program</span>
                      <strong>92.4% Pass Rate</strong>
                    </div>
                    <div style={{ width: '100%', height: '8px', background: 'var(--border-color)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: '92.4%', height: '100%', background: 'var(--accent-teal)' }}></div>
                    </div>
                  </div>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '5px' }}>
                      <span>B.Sc. CS Program</span>
                      <strong>88.7% Pass Rate</strong>
                    </div>
                    <div style={{ width: '100%', height: '8px', background: 'var(--border-color)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: '88.7%', height: '100%', background: 'var(--accent-teal)' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card" style={{ padding: '25px' }}>
                <h3>Backlog Logs Overview</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '15px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                    <span>Active backlog rate:</span>
                    <strong style={{ color: 'var(--accent-rose)' }}>4.8%</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                    <span>Remedial tutorials classes scheduled:</span>
                    <strong>8 Lectures / week</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* HOD TAB: PENDING APPROVALS */}
        {activeTab === 'hod_approvals' && user.role === 'hod' && (
          <div>
            <h2>Department Approvals Workspace</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '25px' }}>
              Approve leave applications, project logs, or seminar outlines from department staff.
            </p>

            <h3 style={{ marginBottom: '15px' }}>Pending Requests ({hodApprovals.length})</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '35px' }}>
              {hodApprovals.map(app => (
                <div key={app.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 20px', border: '1px solid var(--border-color)', borderRadius: '12px', background: 'rgba(0,0,0,0.01)' }}>
                  <div>
                    <span className="badge badge-info" style={{ marginRight: '10px' }}>{app.type}</span>
                    <strong>{app.name}</strong>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>{app.desc}</div>
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button className="btn btn-primary" style={{ padding: '6px 12px', fontSize: '0.75rem' }} onClick={() => {
                      setHodApprovals(prev => prev.filter(i => i.id !== app.id));
                      setHodApprovedLogs(prev => [...prev, `${app.type} for ${app.name} Approved.`]);
                      alert('Request approved successfully.');
                    }}>Approve</button>
                    <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.75rem', color: 'var(--accent-rose)' }} onClick={() => {
                      setHodApprovals(prev => prev.filter(i => i.id !== app.id));
                      alert('Request declined/returned.');
                    }}>Decline</button>
                  </div>
                </div>
              ))}
              {hodApprovals.length === 0 && <p style={{ color: 'var(--text-secondary)' }}>No pending approvals.</p>}
            </div>

            <h3>Approvals Log History</h3>
            <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              {hodApprovedLogs.map((log, idx) => <li key={idx} style={{ marginBottom: '5px' }}>{log}</li>)}
              {hodApprovedLogs.length === 0 && <li>No approvals history recorded in this session.</li>}
            </ul>
          </div>
        )}

        {/* TEACHER TAB: MARK ATTENDANCE */}
        {activeTab === 'mark' && user.role !== 'student' && (
          <div>
            <h2 style={{ marginBottom: '25px' }}>Mark Daily Attendance</h2>
            {markAttendanceSuccess && <div style={{ color: 'var(--accent-teal)', background: 'rgba(20,184,166,0.05)', border: '1px solid rgba(20,184,166,0.1)', padding: '10px', borderRadius: '8px', marginBottom: '20px', fontSize: '0.9rem' }}>{markAttendanceSuccess}</div>}

            <form onSubmit={handleMarkAttendance}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '25px' }} className="grid-2">
                <div className="form-group">
                  <label className="form-label">Subject</label>
                  <select className="form-input" value={markAttendanceSubject} onChange={e => setMarkAttendanceSubject(e.target.value)}>
                    <option value="Java Programming">Java Programming</option>
                    <option value="Software Engineering">Software Engineering</option>
                    <option value="Database Systems">Database Systems</option>
                    <option value="Web Technology">Web Technology</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Lecture Date</label>
                  <input type="date" className="form-input" value={markAttendanceDate} onChange={e => setMarkAttendanceDate(e.target.value)} required />
                </div>
              </div>

              <h4 style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '10px', marginBottom: '15px' }}>Student Roll Sheet ({students.length} found)</h4>
              
              <div style={{ maxHeight: '300px', overflowY: 'auto', marginBottom: '25px', paddingRight: '10px' }}>
                {students.map(s => (
                  <div key={s.id} style={{ display: 'flex', justify: 'space-between', alignItems: 'center', padding: '12px 15px', background: 'rgba(0,0,0,0.02)', borderRadius: '8px', marginBottom: '8px', border: '1px solid var(--border-color)' }}>
                    <div>
                      <div style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{s.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>ID: {s.id} | Department: {s.department}</div>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button type="button" className={`btn ${markAttendanceRecords[s.id] === 'Present' ? 'btn-primary' : 'btn-secondary'}`} style={{ padding: '4px 12px', fontSize: '0.8rem' }} onClick={() => setMarkAttendanceRecords({...markAttendanceRecords, [s.id]: 'Present'})}>Present</button>
                      <button type="button" className={`btn ${markAttendanceRecords[s.id] === 'Absent' ? 'btn-danger' : 'btn-secondary'}`} style={{ padding: '4px 12px', fontSize: '0.8rem' }} onClick={() => setMarkAttendanceRecords({...markAttendanceRecords, [s.id]: 'Absent'})}>Absent</button>
                    </div>
                  </div>
                ))}
              </div>

              <button type="submit" className="btn btn-primary">Save Attendance Logs</button>
            </form>
          </div>
        )}

        {/* TEACHER TAB: MARKS ENTRY */}
        {activeTab === 'marks_entry' && user.role !== 'student' && (
          <div>
            <h2 style={{ marginBottom: '20px' }}>Student Academic Marks Entry Form</h2>
            {marksSuccess && <div style={{ color: 'var(--accent-teal)', background: 'rgba(20,184,166,0.05)', border: '1px solid rgba(20,184,166,0.1)', padding: '10px', borderRadius: '8px', marginBottom: '20px', fontSize: '0.9rem' }}>{marksSuccess}</div>}

            <form onSubmit={handleAddMarks}>
              <div className="form-group">
                <label className="form-label">Select Student</label>
                <select className="form-input" value={selectedMarkStudent} onChange={e => setSelectedMarkStudent(e.target.value)}>
                  {students.map(s => (
                    <option key={s.id} value={s.id}>{s.name} ({s.id})</option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="grid-2">
                <div className="form-group">
                  <label className="form-label">Subject Scope</label>
                  <select className="form-input" value={markSubject} onChange={e => setMarkSubject(e.target.value)}>
                    <option>Java Programming</option>
                    <option>Software Engineering</option>
                    <option>Database Systems</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Examination Category</label>
                  <select className="form-input" value={markExam} onChange={e => setMarkExam(e.target.value)}>
                    <option>Internal Test 1</option>
                    <option>Mid Term Test</option>
                    <option>Practical Viva Session</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Marks Obtained (out of 25)</label>
                <input type="number" min="0" max="25" className="form-input" value={marksValue} onChange={e => setMarksValue(parseInt(e.target.value))} required />
              </div>

              <button type="submit" className="btn btn-primary">Submit Student Marks</button>
            </form>
          </div>
        )}

        {/* TEACHER TAB: STUDY MATERIALS */}
        {activeTab === 'material' && user.role !== 'student' && (
          <div>
            <h2 style={{ marginBottom: '20px' }}>Upload & Manage Study Materials</h2>
            {newMaterialSuccess && <div style={{ color: 'var(--accent-teal)', background: 'rgba(20,184,166,0.05)', border: '1px solid rgba(20,184,166,0.1)', padding: '10px', borderRadius: '8px', marginBottom: '20px', fontSize: '0.9rem' }}>{newMaterialSuccess}</div>}

            <form onSubmit={handleAddMaterial} style={{ marginBottom: '35px', paddingBottom: '30px', borderBottom: '1px solid var(--border-color)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="grid-2">
                <div className="form-group">
                  <label className="form-label">Subject</label>
                  <select className="form-input" value={newMaterialSubject} onChange={e => setNewMaterialSubject(e.target.value)}>
                    <option>Java Programming</option>
                    <option>Software Engineering</option>
                    <option>Database Systems</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Material Description Title</label>
                  <input type="text" className="form-input" value={newMaterialTitle} onChange={e => setNewMaterialTitle(e.target.value)} placeholder="e.g. Unit 3: Normalization slides" required />
                </div>
              </div>
              <button type="submit" className="btn btn-primary">Publish Study Material</button>
            </form>

            <h4>Uploaded Slides / Documents</h4>
            <div className="table-container" style={{ marginTop: '15px' }}>
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Subject</th>
                    <th>Document Title</th>
                    <th>Upload Date</th>
                    <th>Download Reference</th>
                  </tr>
                </thead>
                <tbody>
                  {studyMaterials.map((mat, idx) => (
                    <tr key={idx}>
                      <td>{mat.subject}</td>
                      <td><strong>{mat.title}</strong></td>
                      <td>{mat.date}</td>
                      <td><a href={mat.link} target="_blank" rel="noreferrer">📄 PDF Link</a></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TEACHER TAB: PAST LOGS */}
        {activeTab === 'logs' && user.role === 'teacher' && (
          <div>
            <h2 style={{ marginBottom: '20px' }}>Past Attendance Records</h2>
            <div className="table-container">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Student ID</th>
                    <th>Student Name</th>
                    <th>Date</th>
                    <th>Subject</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {attendanceLogs.map((log, idx) => (
                    <tr key={idx}>
                      <td>{log.student_id}</td>
                      <td><strong>{log.student_name}</strong></td>
                      <td>{log.date}</td>
                      <td>{log.subject}</td>
                      <td>
                        <span className={`badge ${log.status === 'Present' ? 'badge-success' : 'badge-danger'}`}>
                          {log.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {attendanceLogs.length === 0 && <p style={{ color: 'var(--text-secondary)', padding: '20px' }}>No logs cataloged.</p>}
            </div>
          </div>
        )}

        {/* ADMIN TAB: NOTICES */}
        {activeTab === 'notice' && user.role !== 'student' && (
          <div>
            <h2 style={{ marginBottom: '25px' }}>Post Academic / Placement Notice</h2>
            {newNoticeSuccess && <div style={{ color: 'var(--accent-teal)', background: 'rgba(20,184,166,0.05)', border: '1px solid rgba(20,184,166,0.1)', padding: '10px', borderRadius: '8px', marginBottom: '20px', fontSize: '0.9rem' }}>{newNoticeSuccess}</div>}

            <form onSubmit={handleCreateNotice} style={{ marginBottom: '45px' }}>
              <div className="form-group">
                <label className="form-label">Notice Title</label>
                <input type="text" className="form-input" value={newNoticeTitle} onChange={e => setNewNoticeTitle(e.target.value)} placeholder="e.g. CAP Seat Allotment Round I guidelines" required />
              </div>
              <div className="form-group">
                <label className="form-label">Category</label>
                <select className="form-input" value={newNoticeCategory} onChange={e => setNewNoticeCategory(e.target.value)}>
                  <option value="general">General</option>
                  <option value="placement">Placement</option>
                  <option value="academics">Academics</option>
                  <option value="cultural">Cultural</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Notice Content Details</label>
                <textarea className="form-input" style={{ minHeight: '120px', resize: 'vertical' }} value={newNoticeContent} onChange={e => setNewNoticeContent(e.target.value)} placeholder="Type announcement description here..." required></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Publish Announcement</button>
            </form>

            <h3 style={{ marginBottom: '20px', borderTop: '1px solid var(--border-color)', paddingTop: '30px' }}>Manage / Delete Active Notices</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {notices.map((n) => (
                <div key={n.id} style={{ display: 'flex', justify: 'space-between', alignItems: 'center', padding: '15px 20px', background: 'rgba(0,0,0,0.01)', border: '1px solid var(--border-color)', borderRadius: '12px' }}>
                  <div>
                    <strong style={{ color: 'var(--text-primary)' }}>{n.title}</strong>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>Date: {n.date} | Category: {n.category}</div>
                  </div>
                  <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.8rem', color: 'var(--accent-rose)', borderColor: 'rgba(225,29,72,0.2)' }} onClick={() => handleDeleteNotice(n.id)}>
                    🗑️ Delete Notice
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ADMIN TAB: REGISTER / MOCK USER MANAGEMENT */}
        {activeTab === 'register' && user.role !== 'student' && (
          <div>
            <h2 style={{ marginBottom: '20px' }}>Mock User Management Roster</h2>
            
            <div className="card" style={{ padding: '25px', marginBottom: '35px' }}>
              <h4>Active Roster Profiles ({rosterUsers.length} total)</h4>
              <div className="table-container" style={{ marginTop: '15px' }}>
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>Username</th>
                      <th>Full Name</th>
                      <th>Access Role</th>
                      <th>Official Email</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rosterUsers.map((u, idx) => (
                      <tr key={idx}>
                        <td><code>{u.username}</code></td>
                        <td><strong>{u.name}</strong></td>
                        <td><span className="badge badge-info">{u.role}</span></td>
                        <td>{u.email}</td>
                        <td>
                          {u.username !== 'admin' ? (
                            <button 
                              className="btn btn-secondary" 
                              style={{ padding: '4px 10px', fontSize: '0.75rem', color: 'var(--accent-rose)', borderColor: 'rgba(225,29,72,0.15)', background: 'transparent' }} 
                              onClick={() => handleDeleteUser(u.username)}
                            >
                              🗑️ Delete User
                            </button>
                          ) : (
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>System Root</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <h3 style={{ marginBottom: '20px' }}>Register New User Profile</h3>
            {regSuccess && <div style={{ color: 'var(--accent-teal)', background: 'rgba(20,184,166,0.05)', border: '1px solid rgba(20,184,166,0.1)', padding: '10px', borderRadius: '8px', marginBottom: '20px', fontSize: '0.9rem' }}>{regSuccess}</div>}

            <form onSubmit={handleRegisterUser}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="grid-2">
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input type="text" className="form-input" value={regName} onChange={e => setRegName(e.target.value)} placeholder="e.g. Priya Deshmukh" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Username</label>
                  <input type="text" className="form-input" value={regUsername} onChange={e => setRegUsername(e.target.value)} placeholder="e.g. pdeshmukh" required />
                </div>
                <div className="form-group">
                  <label className="form-label">User Role</label>
                  <select className="form-input" value={regRole} onChange={e => setRegRole(e.target.value)}>
                    <option value="student">Student</option>
                    <option value="teacher">Teacher (Faculty)</option>
                    <option value="hod">HOD (Head of Department)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Department</label>
                  <select className="form-input" value={regDept} onChange={e => setRegDept(e.target.value)}>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Computer Application">Computer Application</option>
                    <option value="Biotechnology">Biotechnology</option>
                    <option value="Management Science">Management Science</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input type="email" className="form-input" value={regEmail} onChange={e => setRegEmail(e.target.value)} placeholder="e.g. student@cocsit.org.in" required />
              </div>
              <button type="submit" className="btn btn-primary" style={{ marginTop: '10px' }}>Register User</button>
            </form>
          </div>
        )}

        {/* ADMIN TAB: SETTINGS EDITOR */}
        {activeTab === 'settings' && user.role === 'admin' && (
          <div>
            <h2 style={{ marginBottom: '10px' }}>Website Content Editor</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '25px' }}>
              Modify website text descriptions, guidelines, hostel rules, and parameters dynamically.
            </p>

            {/* Toggle Modes */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '25px' }}>
              <button 
                type="button" 
                className={`btn ${editorMode === 'visual' ? 'btn-primary' : 'btn-secondary'}`} 
                style={{ padding: '6px 14px', fontSize: '0.8rem' }}
                onClick={() => setEditorMode('visual')}
              >
                📝 Visual Form Editor
              </button>
              <button 
                type="button" 
                className={`btn ${editorMode === 'json' ? 'btn-primary' : 'btn-secondary'}`} 
                style={{ padding: '6px 14px', fontSize: '0.8rem' }}
                onClick={() => setEditorMode('json')}
              >
                🛠️ Advanced JSON Editor
              </button>
            </div>

            {settingsSuccess && <div style={{ color: 'var(--accent-teal)', background: 'rgba(20,184,166,0.05)', border: '1px solid rgba(20,184,166,0.1)', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '0.9rem' }}>{settingsSuccess}</div>}
            {settingsError && <div style={{ color: 'var(--accent-rose)', background: 'rgba(225,29,72,0.05)', border: '1px solid rgba(225,29,72,0.1)', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '0.9rem' }}>{settingsError}</div>}

            {editorMode === 'visual' ? (
              <form onSubmit={handleSaveVisualSettings} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div className="card" style={{ padding: '25px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <h3>🏢 Girls' Hostel Settings</h3>
                  <div className="form-group">
                    <label className="form-label">Hostel Description & Details</label>
                    <textarea 
                      className="form-input" 
                      style={{ minHeight: '100px' }} 
                      value={hostelDesc} 
                      onChange={e => setHostelDesc(e.target.value)} 
                      placeholder="Enter descriptions about boarding..." 
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Hostel Safety & Facilities Rules (one per line)</label>
                    <textarea 
                      className="form-input" 
                      style={{ minHeight: '120px', fontFamily: 'monospace' }} 
                      value={hostelRulesText} 
                      onChange={e => setHostelRulesText(e.target.value)} 
                      placeholder="e.g. Wi-Fi availability&#10;24/7 security wardens..." 
                    />
                  </div>
                </div>

                <div className="card" style={{ padding: '25px' }}>
                  <h3>💰 Scholarships Concessions Details (one per line)</h3>
                  <textarea 
                    className="form-input" 
                    style={{ minHeight: '120px', fontFamily: 'monospace' }} 
                    value={scholarshipsText} 
                    onChange={e => setScholarshipsText(e.target.value)} 
                    placeholder="e.g. SC/ST post-matric tuition assistance..." 
                  />
                </div>

                <div className="card" style={{ padding: '25px' }}>
                  <h3>🧱 Campus Physical Infrastructure Details</h3>
                  <textarea 
                    className="form-input" 
                    style={{ minHeight: '100px' }} 
                    value={infrastructureText} 
                    onChange={e => setInfrastructureText(e.target.value)} 
                    placeholder="Enter classroom tech details..." 
                  />
                </div>

                <div className="card" style={{ padding: '25px' }}>
                  <h3>🏠 Homepage Identity & Contact Info</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '15px' }} className="grid-2">
                    <div className="form-group">
                      <label className="form-label">College Name Title</label>
                      <input type="text" className="form-input" value={collegeName} onChange={e => setCollegeName(e.target.value)} required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Primary Hotline Contact</label>
                      <input type="text" className="form-input" value={colPhone} onChange={e => setColPhone(e.target.value)} required />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Official Registry Email</label>
                    <input type="email" className="form-input" value={colEmail} onChange={e => setColEmail(e.target.value)} required />
                  </div>
                </div>

                <div className="card" style={{ padding: '25px' }}>
                  <h3>✨ Homepage Hero Banner Carousel Slides</h3>
                  <div className="form-group">
                    <label className="form-label">Hero Main Heading Title</label>
                    <input type="text" className="form-input" value={heroTitle} onChange={e => setHeroTitle(e.target.value)} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Hero Subtitle Text</label>
                    <input type="text" className="form-input" value={heroSubtitle} onChange={e => setHeroSubtitle(e.target.value)} required />
                  </div>
                </div>

                <div className="card" style={{ padding: '25px' }}>
                  <h3>🎓 Admissions Program Fee Structure CMS</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }} className="grid-3">
                    <div className="form-group">
                      <label className="form-label">BCA Course Annual Fee (₹)</label>
                      <input type="number" className="form-input" value={bcaFee} onChange={e => setBcaFee(Number(e.target.value))} required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">B.Sc. IT Annual Fee (₹)</label>
                      <input type="number" className="form-input" value={bscFee} onChange={e => setBscFee(Number(e.target.value))} required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">MCA Annual Fee (₹)</label>
                      <input type="number" className="form-input" value={mcaFee} onChange={e => setMcaFee(Number(e.target.value))} required />
                    </div>
                  </div>
                </div>

                <div>
                  <button type="submit" className="btn btn-primary">Save Content Changes</button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleSaveSettings}>
                <div className="form-group">
                  <label className="form-label">Master Content Configuration Schema (`master_content.json`)</label>
                  <textarea 
                    className="form-input" 
                    style={{ minHeight: '380px', fontFamily: 'Courier New, monospace', fontSize: '0.85rem', lineHeight: '1.5', resize: 'vertical', background: '#0b0f19', color: '#a7f3d0', border: '1px solid #1e293b' }}
                    value={rawJson}
                    onChange={e => setRawJson(e.target.value)}
                    placeholder="{ ... }"
                    required
                  ></textarea>
                </div>
                <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                  <button type="submit" className="btn btn-primary">Save Website Changes</button>
                  <button type="button" className="btn btn-secondary" onClick={() => setRawJson(JSON.stringify(masterContent, null, 2))}>Discard Edits</button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* STUDENT DOSSIERS TAB (TEACHER, HOD, ADMIN ONLY) */}
        {activeTab === 'student_dossiers' && user.role !== 'student' && (
          <div>
            {!activeDossierStudent ? (
              <div>
                <h2 style={{ marginBottom: '10px' }}>Student Records Dossier</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '25px' }}>
                  Select any active student to view, edit, and track their academic profile, marks, presentee, homework tasks, and fee logs.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="grid-2">
                  {Object.values(studentDossiers)
                    .filter(stud => {
                      if (user.username === 'hod_cs' || user.username === 'teacher_cs') return stud.department === 'Computer Science';
                      if (user.username === 'hod_mgmt' || user.username === 'teacher_mgmt') return stud.department === 'Management Science';
                      return true;
                    })
                    .map(stud => (
                    <div key={stud.username} className="card" style={{ padding: '25px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                          <h4 style={{ margin: 0 }}>{stud.name}</h4>
                          <span className="badge badge-info" style={{ fontSize: '0.7rem' }}>{stud.username}</span>
                        </div>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '5px' }}>📧 {stud.email}</p>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '15px' }}>📚 Department: {stud.department}</p>
                      </div>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button 
                          className="btn btn-primary" 
                          style={{ padding: '6px 14px', fontSize: '0.8rem' }}
                          onClick={() => {
                            setActiveDossierStudent(stud.username);
                            setEditFeesPaid(stud.fees.paid);
                            setEditFeesTotal(stud.fees.total);
                          }}
                        >
                          🔍 View Dossier Profile
                        </button>
                        <button 
                          className="btn btn-secondary" 
                          style={{ padding: '6px 14px', fontSize: '0.8rem', color: 'var(--accent-rose)', borderColor: 'rgba(225,29,72,0.15)', background: 'transparent' }}
                          onClick={() => handleDeleteUser(stud.username)}
                        >
                          🗑️ Delete Profile
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                {Object.keys(studentDossiers).length === 0 && (
                  <p style={{ color: 'var(--text-secondary)' }}>No student records registered in the system roster.</p>
                )}
              </div>
            ) : (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', borderBottom: '1px solid var(--border-color)', paddingBottom: '15px' }}>
                  <div>
                    <h2 style={{ margin: 0 }}>{studentDossiers[activeDossierStudent].name}</h2>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      Roll ID: <code>{activeDossierStudent}</code> | Email: {studentDossiers[activeDossierStudent].email}
                    </span>
                  </div>
                  <button className="btn btn-secondary" style={{ padding: '6px 14px', fontSize: '0.8rem' }} onClick={() => setActiveDossierStudent(null)}>
                    ← Back to Student List
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                  
                  {/* Section 1: Academic Grades (Marks) */}
                  <div className="card" style={{ padding: '30px' }}>
                    <h3 style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '10px', marginBottom: '15px' }}>📊 Academic Grades & Test Scores</h3>
                    <div className="table-container" style={{ marginBottom: '20px' }}>
                      <table className="custom-table">
                        <thead>
                          <tr>
                            <th>Subject Scope</th>
                            <th>Exam / Assessment</th>
                            <th>Marks Obtained</th>
                            <th>Max Marks</th>
                          </tr>
                        </thead>
                        <tbody>
                          {studentDossiers[activeDossierStudent].grades.map((g, idx) => (
                            <tr key={idx}>
                              <td><strong>{g.subject}</strong></td>
                              <td>{g.exam}</td>
                              <td><strong style={{ color: 'var(--accent-indigo)' }}>{g.marks}</strong></td>
                              <td>{g.max}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    
                    <h4>Edit or Add Marks Entry</h4>
                    <form onSubmit={handleUpdateDossierMarks} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px', marginTop: '15px' }} className="grid-3">
                      <div className="form-group" style={{ margin: 0 }}>
                        <select className="form-input" value={newMarkSubjectVal} onChange={e => setNewMarkSubjectVal(e.target.value)}>
                          {user.username === 'teacher_cs' ? (
                            <option value="Java Programming">Java Programming</option>
                          ) : user.username === 'teacher_mgmt' ? (
                            <option value="Business Management">Business Management</option>
                          ) : (
                            <>
                              <option value="Java Programming">Java Programming</option>
                              <option value="Software Engineering">Software Engineering</option>
                              <option value="Database Systems">Database Systems</option>
                              <option value="Business Management">Business Management</option>
                              <option value="Marketing Strategies">Marketing Strategies</option>
                            </>
                          )}
                        </select>
                      </div>
                      <div className="form-group" style={{ margin: 0 }}>
                        <input type="text" className="form-input" value={newMarkExamName} onChange={e => setNewMarkExamName(e.target.value)} placeholder="Exam (e.g. Test 1, Viva)" required />
                      </div>
                      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <input type="number" className="form-input" style={{ width: '80px' }} value={newMarkVal} onChange={e => setNewMarkVal(e.target.value)} min="0" max="100" required />
                        <span>/</span>
                        <input type="number" className="form-input" style={{ width: '80px' }} value={newMarkMax} onChange={e => setNewMarkMax(e.target.value)} min="1" max="100" required />
                        <button type="submit" className="btn btn-primary" style={{ padding: '10px 18px', fontSize: '0.8rem' }}>Save</button>
                      </div>
                    </form>
                  </div>

                  {/* Section 2: Attendance Metrics */}
                  <div className="card" style={{ padding: '30px' }}>
                    <h3 style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '10px', marginBottom: '15px' }}>🗓️ Term Attendance Check</h3>
                    <div className="grid-3" style={{ gap: '20px', marginBottom: '20px' }}>
                      {studentDossiers[activeDossierStudent].attendance.map((a, idx) => {
                        const pct = a.total > 0 ? Math.round((a.present / a.total) * 100) : 0;
                        return (
                          <div key={idx} style={{ padding: '15px', border: '1px solid var(--border-color)', borderRadius: '12px', textAlign: 'center', background: 'rgba(0,0,0,0.01)' }}>
                            <strong>{a.subject}</strong>
                            <h2 style={{ margin: '8px 0', color: pct >= 75 ? 'var(--accent-teal)' : 'var(--accent-rose)' }}>{pct}%</h2>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Present: {a.present} / {a.total} lectures</span>
                          </div>
                        );
                      })}
                    </div>

                    <h4>Update Class Presentee Days</h4>
                    <form onSubmit={handleUpdateDossierAttendance} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px', marginTop: '15px' }} className="grid-3">
                      <div className="form-group" style={{ margin: 0 }}>
                        <select className="form-input" value={newAttSubjectVal} onChange={e => setNewAttSubjectVal(e.target.value)}>
                          {user.username === 'teacher_cs' ? (
                            <option value="Java Programming">Java Programming</option>
                          ) : user.username === 'teacher_mgmt' ? (
                            <option value="Business Management">Business Management</option>
                          ) : (
                            <>
                              <option value="Java Programming">Java Programming</option>
                              <option value="Software Engineering">Software Engineering</option>
                              <option value="Database Systems">Database Systems</option>
                              <option value="Business Management">Business Management</option>
                              <option value="Marketing Strategies">Marketing Strategies</option>
                            </>
                          )}
                        </select>
                      </div>
                      <div className="form-group" style={{ margin: 0 }}>
                        <input type="number" className="form-input" placeholder="Present lectures" value={newAttPresentVal} onChange={e => setNewAttPresentVal(e.target.value)} min="0" required />
                      </div>
                      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <input type="number" className="form-input" placeholder="Total lectures" value={newAttTotalVal} onChange={e => setNewAttTotalVal(e.target.value)} min="1" required />
                        <button type="submit" className="btn btn-primary" style={{ padding: '10px 18px', fontSize: '0.8rem' }}>Save</button>
                      </div>
                    </form>
                  </div>

                  {/* Section 3: Homework & Assignments Checklist */}
                  <div className="card" style={{ padding: '30px' }}>
                    <h3 style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '10px', marginBottom: '15px' }}>📝 Homework & Assignments Roster</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                      {studentDossiers[activeDossierStudent].homework.map((hw, idx) => (
                        <div key={idx} style={{ display: 'flex', justify: 'space-between', alignItems: 'center', padding: '12px 18px', border: '1px solid var(--border-color)', borderRadius: '12px', background: 'rgba(0,0,0,0.01)' }}>
                          <div>
                            <strong>{hw.title}</strong>
                            <div style={{ marginTop: '3px' }}>
                              <span className={`badge ${hw.status === 'Submitted' ? 'badge-success' : 'badge-warning'}`}>{hw.status}</span>
                            </div>
                          </div>
                          <button type="button" className="btn btn-secondary" style={{ padding: '5px 12px', fontSize: '0.75rem' }} onClick={() => handleToggleHomeworkStatus(idx)}>
                            🔄 Toggle Status
                          </button>
                        </div>
                      ))}
                      {studentDossiers[activeDossierStudent].homework.length === 0 && (
                        <p style={{ color: 'var(--text-secondary)' }}>No assignments assigned yet.</p>
                      )}
                    </div>

                    <h4>Assign New Homework Task</h4>
                    <form onSubmit={handleAddDossierHomework} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 120px', gap: '15px', marginTop: '15px' }} className="grid-3">
                      <div className="form-group" style={{ margin: 0 }}>
                        <input type="text" className="form-input" placeholder="Task Name (e.g. Unit 3 exercises)" value={newHwTitle} onChange={e => setNewHwTitle(e.target.value)} required />
                      </div>
                      <div className="form-group" style={{ margin: 0 }}>
                        <select className="form-input" value={newHwStatus} onChange={e => setNewHwStatus(e.target.value)}>
                          <option value="Pending">Pending</option>
                          <option value="Submitted">Submitted</option>
                        </select>
                      </div>
                      <button type="submit" className="btn btn-primary" style={{ padding: '10px', fontSize: '0.8rem' }}>Assign Task</button>
                    </form>
                  </div>

                  {/* Section 4: Fees Ledger */}
                  <div className="card" style={{ padding: '30px' }}>
                    <h3 style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '10px', marginBottom: '15px' }}>💰 Fees Installments Ledger</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '20px' }} className="grid-3">
                      <div style={{ padding: '15px', border: '1px solid var(--border-color)', borderRadius: '12px', background: 'rgba(0,0,0,0.01)', textAlign: 'center' }}>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Total Fee Assigned</span>
                        <h3>₹{studentDossiers[activeDossierStudent].fees.total}</h3>
                      </div>
                      <div style={{ padding: '15px', border: '1px solid var(--border-color)', borderRadius: '12px', background: 'rgba(0,0,0,0.01)', textAlign: 'center' }}>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Total Fee Paid</span>
                        <h3 style={{ color: 'var(--accent-teal)' }}>₹{studentDossiers[activeDossierStudent].fees.paid}</h3>
                      </div>
                      <div style={{ padding: '15px', border: '1px solid var(--border-color)', borderRadius: '12px', background: 'rgba(0,0,0,0.01)', textAlign: 'center' }}>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Outstanding Balance</span>
                        <h3 style={{ color: 'var(--accent-amber)' }}>₹{studentDossiers[activeDossierStudent].fees.total - studentDossiers[activeDossierStudent].fees.paid}</h3>
                      </div>
                    </div>

                    <h4>Update Fees Installment Amount</h4>
                    <form onSubmit={handleSaveDossierFees} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 120px', gap: '15px', marginTop: '15px' }} className="grid-3">
                      <div className="form-group" style={{ margin: 0 }}>
                        <label className="form-label">Total Assigned Fee (₹)</label>
                        <input type="number" className="form-input" value={editFeesTotal} onChange={e => setEditFeesTotal(e.target.value)} required />
                      </div>
                      <div className="form-group" style={{ margin: 0 }}>
                        <label className="form-label">Amount Paid (₹)</label>
                        <input type="number" className="form-input" value={editFeesPaid} onChange={e => setEditFeesPaid(e.target.value)} required />
                      </div>
                      <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                        <button type="submit" className="btn btn-primary" style={{ padding: '12px', fontSize: '0.8rem', width: '100%' }}>Update Ledger</button>
                      </div>
                    </form>
                  </div>

                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
