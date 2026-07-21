import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const HODLayout = ({ user, handleLogout }) => {
  return (
    <div className="portal-layout">
      <aside className="portal-sidebar">
        <div className="sidebar-header">
          <h2>HOD Portal</h2>
          <p>{user?.name}</p>
        </div>
        <nav className="sidebar-nav">
          <Link to="/hod/dashboard">Dashboard</Link>
          <Link to="/hod/faculty">Faculty Workload</Link>
          <Link to="/hod/approvals">Approvals</Link>
          <Link to="/hod/reports">Reports</Link>
        </nav>
        <button onClick={handleLogout} className="btn btn-secondary mt-auto">Logout</button>
      </aside>
      <main className="portal-main">
        <Outlet />
      </main>
    </div>
  );
};

export default HODLayout;
