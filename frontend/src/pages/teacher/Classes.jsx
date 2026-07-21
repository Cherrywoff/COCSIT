import React, { useState, useEffect } from 'react';

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:5000/api/teacher/classes', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(res => res.json())
    .then(data => {
      setClasses(data || []);
      setLoading(false);
    })
    .catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <h2 style={{ color: 'var(--accent-indigo)', marginBottom: '20px' }}>My Classes</h2>
      <div className="card">
        {loading ? <p>Loading...</p> : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8f9fa', textAlign: 'left', borderBottom: '2px solid #eaeaea' }}>
                <th style={{ padding: '12px' }}>Class Name</th>
                <th style={{ padding: '12px' }}>Subject</th>
                <th style={{ padding: '12px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {classes.map((c, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #eaeaea' }}>
                  <td style={{ padding: '12px' }}>{c.name}</td>
                  <td style={{ padding: '12px' }}>{c.subject}</td>
                  <td style={{ padding: '12px' }}>
                    <button className="btn btn-primary" style={{ marginRight: '10px' }}>View Students</button>
                  </td>
                </tr>
              ))}
              {classes.length === 0 && (
                <tr><td colSpan="3" style={{ padding: '20px', textAlign: 'center' }}>No classes assigned.</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Classes;
