import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const PrincipalLayout = ({ user, handleLogout }) => {
  return (
    <div className="portal-layout">
      <aside className="portal-sidebar">
        <div className="sidebar-header">
          <h2>Principal Portal</h2>
          <p>{user?.name}</p>
        </div>
        <nav className="sidebar-nav">
          <Link to="/principal/dashboard">Executive Dashboard</Link>
          <Link to="/principal/analytics">Analytics</Link>
          <Link to="/principal/reports">Reports</Link>
          <Link to="/principal/directory">Directory</Link>
        </nav>
        <button onClick={handleLogout} className="btn btn-secondary mt-auto">Logout</button>
      </aside>
      <main className="portal-main">
        <Outlet />
      </main>
    </div>
  );
};

export default PrincipalLayout;
