import React from 'react';

const Reports = () => {
  return (
    <div>
      <h2 style={{ color: 'var(--accent-indigo)', marginBottom: '20px' }}>Department Reports</h2>
      <div className="card">
        <h3>Analytics Dashboard</h3>
        <p style={{ color: 'var(--text-secondary)' }}>Advanced analytics and reporting for department performance will be integrated in Phase 7.</p>
        
        <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <strong>Coming Soon:</strong>
          <ul style={{ paddingLeft: '20px', marginTop: '10px' }}>
            <li>Faculty Workload Analysis</li>
            <li>Student Academic Performance Metrics</li>
            <li>Overall Attendance Tracking</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Reports;
