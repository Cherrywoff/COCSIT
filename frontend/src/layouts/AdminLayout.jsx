import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const AdminLayout = ({ user, handleLogout }) => {
  return (
    <div className="portal-layout">
      <aside className="portal-sidebar">
        <div className="sidebar-header">
          <h2>CMS Admin</h2>
          <p>{user?.name}</p>
        </div>
        <nav className="sidebar-nav">
          <Link to="/admin/dashboard">CMS Dashboard</Link>
          <Link to="/admin/media">Media Library</Link>
          <Link to="/admin/pages">Page Editor</Link>
          <Link to="/admin/news">News & Notices</Link>
          <Link to="/admin/users">User Management</Link>
          <Link to="/admin/settings">Global Settings</Link>
        </nav>
        <button onClick={handleLogout} className="btn btn-secondary mt-auto">Logout</button>
      </aside>
      <main className="portal-main">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
