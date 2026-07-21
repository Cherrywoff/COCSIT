import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const StudentLayout = ({ user, handleLogout }) => {
  return (
    <div className="portal-layout">
      <aside className="portal-sidebar">
        <div className="sidebar-header">
          <h2>Student Portal</h2>
          <p>{user?.name}</p>
        </div>
        <nav className="sidebar-nav">
          <Link to="/student/dashboard">Dashboard</Link>
          <Link to="/student/attendance">Attendance</Link>
          <Link to="/student/assignments">Assignments</Link>
          <Link to="/student/results">Results</Link>
          <Link to="/student/fees">Fees</Link>
        </nav>
        <button onClick={handleLogout} className="btn btn-secondary mt-auto">Logout</button>
      </aside>
      <main className="portal-main">
        <Outlet />
      </main>
    </div>
  );
};

export default StudentLayout;
