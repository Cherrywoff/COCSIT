import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

// Layouts & Protected Route
import ProtectedRoute from './components/ProtectedRoute';
import StudentLayout from './layouts/StudentLayout';
import TeacherLayout from './layouts/TeacherLayout';
import HODLayout from './layouts/HODLayout';
import PrincipalLayout from './layouts/PrincipalLayout';
import AdminLayout from './layouts/AdminLayout';
import NewsEditor from './pages/admin/NewsEditor';
import SettingsEditor from './pages/admin/SettingsEditor';
import MediaLibrary from './pages/admin/MediaLibrary';
import PageEditor from './pages/admin/PageEditor';
import Attendance from './pages/student/Attendance';
import Results from './pages/student/Results';
import Assignments from './pages/student/Assignments';
import Fees from './pages/student/Fees';
import Classes from './pages/teacher/Classes';
import MarkAttendance from './pages/teacher/MarkAttendance';
import InputMarks from './pages/teacher/InputMarks';
import StudyMaterial from './pages/teacher/StudyMaterial';

// Components
import Navigation from './components/Navigation';
import Footer from './components/Footer';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import AboutRes from './pages/AboutRes';
import Academics from './pages/Academics';
import Courses from './pages/Courses';
import Departments from './pages/Departments';
import Governance from './pages/Governance';
import Facilities from './pages/Facilities';
import Placements from './pages/Placements';
import Admissions from './pages/Admissions';
import Research from './pages/Research';
import Examinations from './pages/Examinations';
import StudentCorner from './pages/StudentCorner';
import Downloads from './pages/Downloads';
import IQAC from './pages/IQAC';
import NAAC from './pages/NAAC';
import Gallery from './pages/Gallery';
import NewsEvents from './pages/NewsEvents';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

const API_BASE = 'http://localhost:5000/api';

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [user, setUser] = useState(null);
  
  // Theme state: default 'light'
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  // Public data states
  const [branding, setBranding] = useState(null);
  const [notices, setNotices] = useState([]);
  const [courses, setCourses] = useState(null);
  const [selectedNotice, setSelectedNotice] = useState(null);

  // Scraped Detailed info states
  const [resInfo, setResInfo] = useState(null);
  const [principalMessage, setPrincipalMessage] = useState(null);
  const [chairmanMessage, setChairmanMessage] = useState(null);
  const [viceChairmanMessage, setViceChairmanMessage] = useState(null);
  const [masterContent, setMasterContent] = useState(null);

  // Authentication Input States
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Welcome popup overlay
  const [showWelcomePopup, setShowWelcomePopup] = useState(true);

  // Check if current path is a portal route
  const isPortalRoute = location.pathname.startsWith('/student') ||
                        location.pathname.startsWith('/teacher') ||
                        location.pathname.startsWith('/hod') ||
                        location.pathname.startsWith('/principal') ||
                        location.pathname.startsWith('/admin');

  // Apply Theme on change
  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Fetch Public Information
  useEffect(() => {
    fetch(`${API_BASE}/public/branding`).then(res => res.json()).then(data => setBranding(data)).catch(err => console.error(err));
    fetch(`${API_BASE}/public/notices`).then(res => res.json()).then(data => setNotices(data)).catch(err => console.error(err));
    fetch(`${API_BASE}/public/courses`).then(res => res.json()).then(data => setCourses(data)).catch(err => console.error(err));
    fetch(`${API_BASE}/public/about/res`).then(res => res.json()).then(data => setResInfo(data)).catch(err => console.error(err));
    fetch(`${API_BASE}/public/about/principal`).then(res => res.json()).then(data => setPrincipalMessage(data)).catch(err => console.error(err));
    fetch(`${API_BASE}/public/about/chairman`).then(res => res.json()).then(data => setChairmanMessage(data)).catch(err => console.error(err));
    fetch(`${API_BASE}/public/about/vicechairman`).then(res => res.json()).then(data => setViceChairmanMessage(data)).catch(err => console.error(err));
    fetch(`${API_BASE}/public/master`).then(res => res.json()).then(data => setMasterContent(data)).catch(err => console.error(err));
  }, []);

  // Validate Token on Mount
  useEffect(() => {
    if (token) {
      fetch(`${API_BASE}/auth/validate`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
        .then(res => {
          if (!res.ok) throw new Error("Invalid token");
          return res.json();
        })
        .then(data => {
          setUser(data.user);
        })
        .catch(() => {
          handleLogout();
        });
    }
  }, [token]);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);

    fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: usernameInput, password: passwordInput })
    })
      .then(res => {
        if (!res.ok) return res.json().then(d => { throw new Error(d.error || "Login failed") });
        return res.json();
      })
      .then(data => {
        localStorage.setItem('token', data.token);
        setToken(data.token);
        setUser(data.user);
        setUsernameInput('');
        setPasswordInput('');
        
        // Redirect to appropriate portal based on role
        if (data.user.role) {
           navigate(`/${data.user.role}/dashboard`);
        } else {
           navigate('/');
        }
      })
      .catch(err => {
        setLoginError(err.message);
      })
      .finally(() => {
        setLoginLoading(false);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
    setUser(null);
    navigate('/');
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
      .then(() => refreshNotices())
      .catch(err => console.error(err));
  };

  const refreshNotices = () => {
    fetch(`${API_BASE}/public/notices`).then(res => res.json()).then(data => setNotices(data)).catch(err => console.error(err));
  };

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  // Dummy setCurrentPage function for backwards compatibility with child components that haven't been migrated yet
  const dummySetCurrentPage = (page) => {
     navigate(`/${page === 'home' ? '' : page}`);
  };

  return (
    <div className={isPortalRoute ? "app-portal-mode" : "app-public-mode"}>
      {/* Active Session Sticky Strip for Public Site */}
      {user && !isPortalRoute && (
        <div style={{
          backgroundColor: 'var(--accent-indigo)', color: '#ffffff', padding: '10px 30px', fontSize: '0.85rem', fontWeight: '600',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px',
          borderBottom: '1px solid var(--border-color)', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', position: 'sticky', top: '0', zIndex: '1001'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>🎓 Active Session: Logged in as <strong>{user.name}</strong> ({user.role.toUpperCase()})</span>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button className="btn btn-secondary" style={{ padding: '4px 12px', fontSize: '0.75rem', color: '#ffffff', borderColor: '#ffffff', background: 'transparent' }} onClick={() => navigate(`/${user.role}/dashboard`)}>
              Go to Portal
            </button>
            <button className="btn btn-secondary" style={{ padding: '4px 12px', fontSize: '0.75rem', color: 'var(--accent-rose)', borderColor: 'var(--accent-rose)', background: 'transparent' }} onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      )}

      {/* Main Navigation - Hide on Portal Routes */}
      {!isPortalRoute && (
        <Navigation 
          currentPage={location.pathname === '/' ? 'home' : location.pathname.substring(1)}
          setCurrentPage={dummySetCurrentPage}
          branding={branding}
          user={user}
          handleLogout={handleLogout}
          theme={theme}
          toggleTheme={toggleTheme}
        />
      )}

      {/* Main Content Area */}
      <div className={isPortalRoute ? "" : "container"} style={isPortalRoute ? {} : { minHeight: '60vh', padding: '40px 0' }}>
        <Routes>
          {/* Public Website Routes */}
          <Route path="/" element={<Home branding={branding} notices={notices} setCurrentPage={dummySetCurrentPage} setSelectedNotice={setSelectedNotice} user={user} onDeleteNotice={handleDeleteNotice} />} />
          <Route path="/about" element={<About principalMessage={principalMessage} chairmanMessage={chairmanMessage} viceChairmanMessage={viceChairmanMessage} />} />
          <Route path="/about_res" element={<AboutRes resInfo={resInfo} />} />
          <Route path="/academics" element={<Academics />} />
          <Route path="/courses" element={<Courses courses={courses} />} />
          <Route path="/departments" element={<Departments />} />
          <Route path="/governance" element={<Governance masterContent={masterContent} />} />
          <Route path="/facilities" element={<Facilities masterContent={masterContent} />} />
          <Route path="/placements" element={<Placements />} />
          <Route path="/admissions" element={<Admissions masterContent={masterContent} />} />
          <Route path="/research" element={<Research />} />
          <Route path="/examinations" element={<Examinations />} />
          <Route path="/studentcorner" element={<StudentCorner setCurrentPage={dummySetCurrentPage} />} />
          <Route path="/downloads" element={<Downloads />} />
          <Route path="/iqac" element={<IQAC />} />
          <Route path="/naac" element={<NAAC />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/newsevents" element={<NewsEvents />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={
            <Login usernameInput={usernameInput} setUsernameInput={setUsernameInput} passwordInput={passwordInput} setPasswordInput={setPasswordInput} loginError={loginError} loginLoading={loginLoading} handleLogin={handleLogin} />
          } />
          
          {/* Dashboard Route (Old compatibility) */}
          <Route path="/dashboard" element={<Navigate to={user ? `/${user.role}/dashboard` : "/login"} replace />} />

          {/* Student Portal Routes */}
          <Route element={<ProtectedRoute user={user} allowedRoles={['student']} />}>
            <Route path="/student" element={<StudentLayout user={user} handleLogout={handleLogout} />}>
              <Route path="dashboard" element={<Dashboard user={user} token={token} activeTab="profile" setActiveTab={() => {}} refreshNotices={refreshNotices} API_BASE={API_BASE} notices={notices} masterContent={masterContent} setMasterContent={setMasterContent} />} />
              <Route path="attendance" element={<Attendance />} />
              <Route path="assignments" element={<Assignments />} />
              <Route path="results" element={<Results />} />
              <Route path="fees" element={<Fees />} />
            </Route>
          </Route>

          {/* Teacher Portal Routes */}
          <Route element={<ProtectedRoute user={user} allowedRoles={['teacher']} />}>
            <Route path="/teacher" element={<TeacherLayout user={user} handleLogout={handleLogout} />}>
              <Route path="dashboard" element={<Dashboard user={user} token={token} activeTab="profile" setActiveTab={() => {}} refreshNotices={refreshNotices} API_BASE={API_BASE} notices={notices} masterContent={masterContent} setMasterContent={setMasterContent} />} />
              <Route path="classes" element={<Classes />} />
              <Route path="attendance" element={<MarkAttendance />} />
              <Route path="marks" element={<InputMarks />} />
              <Route path="materials" element={<StudyMaterial />} />
            </Route>
          </Route>

          {/* HOD Portal Routes */}
          <Route element={<ProtectedRoute user={user} allowedRoles={['hod']} />}>
            <Route path="/hod" element={<HODLayout user={user} handleLogout={handleLogout} />}>
              <Route path="dashboard" element={<Dashboard user={user} token={token} activeTab="hod_dashboard" setActiveTab={() => {}} refreshNotices={refreshNotices} API_BASE={API_BASE} notices={notices} masterContent={masterContent} setMasterContent={setMasterContent} />} />
              <Route path="faculty" element={<h2>Faculty Workload (Coming Soon)</h2>} />
              <Route path="approvals" element={<h2>Approvals (Coming Soon)</h2>} />
              <Route path="reports" element={<h2>Reports (Coming Soon)</h2>} />
            </Route>
          </Route>

          {/* Principal Portal Routes */}
          <Route element={<ProtectedRoute user={user} allowedRoles={['principal']} />}>
            <Route path="/principal" element={<PrincipalLayout user={user} handleLogout={handleLogout} />}>
              <Route path="dashboard" element={<Dashboard user={user} token={token} activeTab="principal_overview" setActiveTab={() => {}} refreshNotices={refreshNotices} API_BASE={API_BASE} notices={notices} masterContent={masterContent} setMasterContent={setMasterContent} />} />
              <Route path="analytics" element={<h2>Analytics (Coming Soon)</h2>} />
              <Route path="reports" element={<h2>Reports (Coming Soon)</h2>} />
              <Route path="directory" element={<h2>Directory (Coming Soon)</h2>} />
            </Route>
          </Route>

          {/* Website Admin CMS Routes */}
          <Route element={<ProtectedRoute user={user} allowedRoles={['admin']} />}>
            <Route path="/admin" element={<AdminLayout user={user} handleLogout={handleLogout} />}>
              <Route path="dashboard" element={<Dashboard user={user} token={token} activeTab="admin_dashboard" setActiveTab={() => {}} refreshNotices={refreshNotices} API_BASE={API_BASE} notices={notices} masterContent={masterContent} setMasterContent={setMasterContent} />} />
              <Route path="media" element={<MediaLibrary />} />
              <Route path="pages" element={<PageEditor />} />
              <Route path="news" element={<NewsEditor />} />
              <Route path="users" element={<h2>User Management (Coming Soon)</h2>} />
              <Route path="settings" element={<SettingsEditor />} />
            </Route>
          </Route>

          {/* 404 Route */}
          <Route path="*" element={
            <div style={{ textAlign: 'center', padding: '50px' }}>
              <h2>404 - Page Not Found</h2>
              <p>The page you are looking for does not exist.</p>
              <button className="btn btn-primary mt-3" onClick={() => navigate('/')}>Return to Homepage</button>
            </div>
          } />
        </Routes>
      </div>

      {/* Notice Detail Modal Dialog */}
      {selectedNotice && (
        <div className="modal-overlay" onClick={() => setSelectedNotice(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '10px', marginBottom: '15px', color: 'var(--accent-indigo)' }}>{selectedNotice.title}</h3>
            <div style={{ fontSize: '0.85rem', color: 'var(--accent-amber)', marginBottom: '10px', fontWeight: '600' }}>
              Posted on: {selectedNotice.date} | Category: <span className="badge badge-info">{selectedNotice.category}</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '25px', whiteSpace: 'pre-wrap', lineHeight: '1.7' }}>{selectedNotice.content}</p>
            <button className="btn btn-secondary" onClick={() => setSelectedNotice(null)} style={{ float: 'right' }}>Close</button>
          </div>
        </div>
      )}

      {/* Welcome announcement popup modal */}
      {showWelcomePopup && (
        <div className="modal-overlay" onClick={() => setShowWelcomePopup(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ textAlign: 'center' }}>
            <span style={{ fontSize: '3rem', marginBottom: '15px', display: 'block' }}>🔔</span>
            <h3 style={{ marginBottom: '15px', color: 'var(--accent-indigo)' }}>Admission Announcement 2026-27</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '25px', lineHeight: '1.6' }}>
              Online Registration forms for BCA, B.Sc Computer Science, B.Sc Biotech, BBA, and MCA/MBA programs are open under MAH-CET guidelines. Please complete forms before timelines.
            </p>
            <button className="btn btn-primary" onClick={() => setShowWelcomePopup(false)}>Enter College Website</button>
          </div>
        </div>
      )}
      
      {/* Universal Footer - Hide on Portal Routes */}
      {!isPortalRoute && <Footer setCurrentPage={dummySetCurrentPage} />}
    </div>
  );
}
