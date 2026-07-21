import React from 'react';

const Assignments = () => {
  return (
    <div>
      <h2 style={{ color: 'var(--accent-indigo)', marginBottom: '20px' }}>My Assignments</h2>
      <div className="card">
        <p style={{ color: 'var(--text-secondary)' }}>You currently have no pending assignments.</p>
        <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <strong>Note:</strong> Check back later when your teachers upload new coursework.
        </div>
      </div>
    </div>
  );
};

export default Assignments;
