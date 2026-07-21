import React, { useState, useEffect } from 'react';

const FacultyList = () => {
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:5000/api/hod/faculty', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(res => res.json())
    .then(data => {
      setFaculty(data || []);
      setLoading(false);
    })
    .catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <h2 style={{ color: 'var(--accent-indigo)', marginBottom: '20px' }}>Department Faculty</h2>
      <div className="card">
        {loading ? <p>Loading...</p> : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8f9fa', textAlign: 'left', borderBottom: '2px solid #eaeaea' }}>
                <th style={{ padding: '12px' }}>Name</th>
                <th style={{ padding: '12px' }}>Username</th>
                <th style={{ padding: '12px' }}>Email</th>
                <th style={{ padding: '12px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {faculty.map((f, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #eaeaea' }}>
                  <td style={{ padding: '12px' }}>{f.name}</td>
                  <td style={{ padding: '12px' }}>{f.username}</td>
                  <td style={{ padding: '12px' }}>{f.email}</td>
                  <td style={{ padding: '12px' }}>
                    <button className="btn btn-secondary" style={{ padding: '5px 10px', fontSize: '0.9rem' }}>Assign Subject</button>
                  </td>
                </tr>
              ))}
              {faculty.length === 0 && (
                <tr><td colSpan="4" style={{ padding: '20px', textAlign: 'center' }}>No faculty found in your department.</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default FacultyList;
