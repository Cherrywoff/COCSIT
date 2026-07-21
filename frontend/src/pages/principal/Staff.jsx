import React, { useState, useEffect } from 'react';

const Staff = () => {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:5000/api/principal/staff', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(res => res.json())
    .then(data => {
      setStaff(data || []);
      setLoading(false);
    })
    .catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <h2 style={{ color: 'var(--accent-indigo)', marginBottom: '20px' }}>Campus Staff Directory</h2>
      <div className="card">
        {loading ? <p>Loading...</p> : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8f9fa', textAlign: 'left', borderBottom: '2px solid #eaeaea' }}>
                <th style={{ padding: '12px' }}>Name</th>
                <th style={{ padding: '12px' }}>Role</th>
                <th style={{ padding: '12px' }}>Department</th>
                <th style={{ padding: '12px' }}>Email</th>
              </tr>
            </thead>
            <tbody>
              {staff.map((s, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #eaeaea' }}>
                  <td style={{ padding: '12px' }}>{s.name}</td>
                  <td style={{ padding: '12px', textTransform: 'capitalize' }}>{s.role}</td>
                  <td style={{ padding: '12px' }}>{s.department || '-'}</td>
                  <td style={{ padding: '12px' }}>{s.email}</td>
                </tr>
              ))}
              {staff.length === 0 && (
                <tr><td colSpan="4" style={{ padding: '20px', textAlign: 'center' }}>No staff found.</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Staff;
