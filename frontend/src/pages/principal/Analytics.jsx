import React, { useState, useEffect } from 'react';

const Analytics = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:5000/api/principal/analytics', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(res => res.json())
    .then(result => {
      setData(result);
      setLoading(false);
    })
    .catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <h2 style={{ color: 'var(--accent-indigo)', marginBottom: '20px' }}>Campus Analytics</h2>
      <div className="card">
        {loading ? <p>Loading...</p> : (
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 200px', padding: '20px', border: '1px solid #eaeaea', borderRadius: '8px', textAlign: 'center' }}>
              <h3 style={{ margin: '0 0 10px 0' }}>Overall Attendance</h3>
              <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--accent-indigo)', margin: 0 }}>{data?.attendanceRate}</p>
            </div>
            <div style={{ flex: '1 1 200px', padding: '20px', border: '1px solid #eaeaea', borderRadius: '8px', textAlign: 'center' }}>
              <h3 style={{ margin: '0 0 10px 0' }}>Fee Collection</h3>
              <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--accent-teal)', margin: 0 }}>{data?.feeCollection}</p>
            </div>
            <div style={{ flex: '1 1 200px', padding: '20px', border: '1px solid #eaeaea', borderRadius: '8px', textAlign: 'center' }}>
              <h3 style={{ margin: '0 0 10px 0' }}>Top Department</h3>
              <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--accent-rose)', margin: 0 }}>{data?.topPerformingDept}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Analytics;
