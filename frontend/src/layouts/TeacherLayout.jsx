import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const TeacherLayout = ({ user, handleLogout }) => {
  return (
    <div className="portal-layout">
      <aside className="portal-sidebar">
        <div className="sidebar-header">
          <h2>Teacher Portal</h2>
          <p>{user?.name}</p>
        </div>
        <nav className="sidebar-nav">
          <Link to="/teacher/dashboard">Dashboard</Link>
          <Link to="/teacher/attendance">Attendance</Link>
          <Link to="/teacher/assignments">Assignments</Link>
          <Link to="/teacher/marks">Marks</Link>
          <Link to="/teacher/study-material">Study Material</Link>
        </nav>
        <button onClick={handleLogout} className="btn btn-secondary mt-auto">Logout</button>
      </aside>
      <main className="portal-main">
        <Outlet />
      </main>
    </div>
  );
};

export default TeacherLayout;
