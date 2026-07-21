import React from 'react';

const StudyMaterial = () => {
  return (
    <div>
      <h2 style={{ color: 'var(--accent-indigo)', marginBottom: '20px' }}>Study Materials</h2>
      <div className="card">
        <h3>Upload Materials</h3>
        <p style={{ color: 'var(--text-secondary)' }}>You can upload PDFs and documents here. Use the Admin Media Library for large assets currently.</p>
        
        <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f0f4ff', borderRadius: '8px', borderLeft: '4px solid var(--accent-indigo)' }}>
          <strong>Note:</strong> Dedicated study material file management will be fully rolled out in the next update.
        </div>
      </div>
    </div>
  );
};

export default StudyMaterial;
