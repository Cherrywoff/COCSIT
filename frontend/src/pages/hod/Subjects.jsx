import React, { useState, useEffect } from 'react';

const Subjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:5000/api/hod/subjects', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(res => res.json())
    .then(data => {
      setSubjects(data || []);
      setLoading(false);
    })
    .catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <h2 style={{ color: 'var(--accent-indigo)', marginBottom: '20px' }}>Department Subjects</h2>
      <div className="card">
        {loading ? <p>Loading...</p> : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8f9fa', textAlign: 'left', borderBottom: '2px solid #eaeaea' }}>
                <th style={{ padding: '12px' }}>Code</th>
                <th style={{ padding: '12px' }}>Name</th>
                <th style={{ padding: '12px' }}>Semester</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((sub, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #eaeaea' }}>
                  <td style={{ padding: '12px', fontWeight: 'bold' }}>{sub.code}</td>
                  <td style={{ padding: '12px' }}>{sub.name}</td>
                  <td style={{ padding: '12px' }}>{sub.semester}</td>
                </tr>
              ))}
              {subjects.length === 0 && (
                <tr><td colSpan="3" style={{ padding: '20px', textAlign: 'center' }}>No subjects found.</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Subjects;
