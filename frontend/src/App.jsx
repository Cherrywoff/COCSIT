import React, { useState, useEffect } from 'react';

// Components imports
import Navigation from './components/Navigation';
import Footer from './components/Footer';

// Pages imports
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
  const [currentPage, setCurrentPage] = useState('home');
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [user, setUser] = useState(null);
  
  // Theme state: default 'light' as requested ("Mostly white background")
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

  // Dashboard active tab
  const [activeDashboardTab, setActiveDashboardTab] = useState('profile');

  // Welcome popup overlay
  const [showWelcomePopup, setShowWelcomePopup] = useState(true);

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
    fetch(`${API_BASE}/public/branding`)
      .then(res => res.json())
      .then(data => setBranding(data))
      .catch(err => console.error("Error loading branding:", err));

    fetch(`${API_BASE}/public/notices`)
      .then(res => res.json())
      .then(data => setNotices(data))
      .catch(err => console.error("Error loading notices:", err));

    fetch(`${API_BASE}/public/courses`)
      .then(res => res.json())
      .then(data => setCourses(data))
      .catch(err => console.error("Error loading courses:", err));

    // Fetch Scraped detailed info
    fetch(`${API_BASE}/public/about/res`)
      .then(res => res.json())
      .then(data => setResInfo(data))
      .catch(err => console.error("Error loading RES info:", err));

    fetch(`${API_BASE}/public/about/principal`)
      .then(res => res.json())
      .then(data => setPrincipalMessage(data))
      .catch(err => console.error("Error loading Principal message:", err));

    fetch(`${API_BASE}/public/about/chairman`)
      .then(res => res.json())
      .then(data => setChairmanMessage(data))
      .catch(err => console.error("Error loading Chairman message:", err));

    fetch(`${API_BASE}/public/about/vicechairman`)
      .then(res => res.json())
      .then(data => setViceChairmanMessage(data))
      .catch(err => console.error("Error loading Vice Chairman message:", err));

    fetch(`${API_BASE}/public/master`)
      .then(res => res.json())
      .then(data => setMasterContent(data))
      .catch(err => console.error("Error loading master content:", err));
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
        setCurrentPage('dashboard');
        if (data.user.role === 'principal') {
          setActiveDashboardTab('principal_overview');
        } else if (data.user.role === 'hod') {
          setActiveDashboardTab('hod_dashboard');
        } else {
          setActiveDashboardTab('profile');
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
    setCurrentPage('home');
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

  const refreshNotices = () => {
    fetch(`${API_BASE}/public/notices`)
      .then(res => res.json())
      .then(data => setNotices(data))
      .catch(err => console.error("Error refreshing notices:", err));
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <div>
      {/* Active Session Sticky Strip */}
      {user && (
        <div style={{
          backgroundColor: 'var(--accent-indigo)',
          color: '#ffffff',
          padding: '10px 30px',
          fontSize: '0.85rem',
          fontWeight: '600',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '15px',
          borderBottom: '1px solid var(--border-color)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          position: 'sticky',
          top: '0',
          zIndex: '1001'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1.1rem' }}>🎓</span>
            <span>Active Session: Logged in as <strong>{user.name}</strong> ({user.role.toUpperCase()})</span>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button className="btn btn-secondary" style={{ padding: '4px 12px', fontSize: '0.75rem', color: '#ffffff', borderColor: '#ffffff', background: 'transparent' }} onClick={() => setCurrentPage('dashboard')}>
              Go to Dashboard
            </button>
            <button className="btn btn-secondary" style={{ padding: '4px 12px', fontSize: '0.75rem', color: 'var(--accent-rose)', borderColor: 'var(--accent-rose)', background: 'transparent' }} onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      )}

      {/* Sticky Main Navigation */}
      <Navigation 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        branding={branding}
        user={user}
        handleLogout={handleLogout}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Main Content Sections */}
      <main className="container" style={{ minHeight: '60vh', padding: '40px 0' }}>
        {currentPage === 'home' && (
          <Home 
            branding={branding} 
            notices={notices} 
            setCurrentPage={setCurrentPage} 
            setSelectedNotice={setSelectedNotice} 
            user={user}
            onDeleteNotice={handleDeleteNotice}
          />
        )}

        {currentPage === 'about' && (
          <About 
            principalMessage={principalMessage} 
            chairmanMessage={chairmanMessage}
            viceChairmanMessage={viceChairmanMessage}
          />
        )}

        {currentPage === 'about_res' && (
          <AboutRes resInfo={resInfo} />
        )}

        {currentPage === 'academics' && (
          <Academics />
        )}

        {currentPage === 'courses' && (
          <Courses courses={courses} />
        )}

        {currentPage === 'departments' && (
          <Departments />
        )}

        {currentPage === 'governance' && (
          <Governance masterContent={masterContent} />
        )}

        {currentPage === 'facilities' && (
          <Facilities masterContent={masterContent} />
        )}

        {currentPage === 'placements' && (
          <Placements />
        )}

        {currentPage === 'admissions' && (
          <Admissions masterContent={masterContent} />
        )}

        {currentPage === 'research' && (
          <Research />
        )}

        {currentPage === 'examinations' && (
          <Examinations />
        )}

        {currentPage === 'studentcorner' && (
          <StudentCorner setCurrentPage={setCurrentPage} />
        )}

        {currentPage === 'downloads' && (
          <Downloads />
        )}

        {currentPage === 'iqac' && (
          <IQAC />
        )}

        {currentPage === 'naac' && (
          <NAAC />
        )}

        {currentPage === 'gallery' && (
          <Gallery />
        )}

        {currentPage === 'newsevents' && (
          <NewsEvents />
        )}

        {currentPage === 'contact' && (
          <Contact />
        )}

        {currentPage === 'login' && (
          <Login 
            usernameInput={usernameInput}
            setUsernameInput={setUsernameInput}
            passwordInput={passwordInput}
            setPasswordInput={setPasswordInput}
            loginError={loginError}
            loginLoading={loginLoading}
            handleLogin={handleLogin}
          />
        )}

        {currentPage === 'dashboard' && user && (
          <Dashboard 
            user={user} 
            token={token} 
            activeTab={activeDashboardTab} 
            setActiveTab={setActiveDashboardTab}
            refreshNotices={refreshNotices}
            API_BASE={API_BASE}
            notices={notices}
            masterContent={masterContent}
            setMasterContent={setMasterContent}
          />
        )}
      </main>

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
      
      {/* Universal Footer */}
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}
