import React, { useState, useEffect } from 'react';

const Results = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:5000/api/student/results', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(res => res.json())
    .then(data => {
      setResults(data || []);
      setLoading(false);
    })
    .catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <h2 style={{ color: 'var(--accent-indigo)', marginBottom: '20px' }}>My Academic Results</h2>
      <div className="card">
        {loading ? <p>Loading...</p> : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8f9fa', textAlign: 'left', borderBottom: '2px solid #eaeaea' }}>
                <th style={{ padding: '12px' }}>Exam Name</th>
                <th style={{ padding: '12px' }}>Subject</th>
                <th style={{ padding: '12px' }}>Marks Obtained</th>
                <th style={{ padding: '12px' }}>Total Marks</th>
                <th style={{ padding: '12px' }}>Percentage</th>
              </tr>
            </thead>
            <tbody>
              {results.map((record, index) => {
                const percentage = Math.round((record.marks_obtained / record.marks_total) * 100);
                return (
                  <tr key={index} style={{ borderBottom: '1px solid #eaeaea' }}>
                    <td style={{ padding: '12px' }}>{record.exam_name}</td>
                    <td style={{ padding: '12px' }}>{record.subject}</td>
                    <td style={{ padding: '12px', fontWeight: 'bold' }}>{record.marks_obtained}</td>
                    <td style={{ padding: '12px' }}>{record.marks_total}</td>
                    <td style={{ padding: '12px' }}>
                      <span className={`badge ${percentage >= 40 ? 'badge-success' : 'badge-danger'}`}>
                        {percentage}%
                      </span>
                    </td>
                  </tr>
                );
              })}
              {results.length === 0 && (
                <tr><td colSpan="5" style={{ padding: '20px', textAlign: 'center' }}>No results found.</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Results;
