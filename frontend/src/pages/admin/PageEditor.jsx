import React from 'react';

const PageEditor = () => {
  return (
    <div>
      <h2 style={{ color: 'var(--accent-indigo)', marginBottom: '20px' }}>Page Editor</h2>
      <div className="card">
        <h3>Dynamic Pages</h3>
        <p style={{ color: 'var(--text-secondary)' }}>The visual page builder will be available in a future update. For now, please use the Global Settings editor to modify master content sections on the homepage.</p>
        
        <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f0f4ff', borderRadius: '8px', borderLeft: '4px solid var(--accent-indigo)' }}>
          <strong>Note:</strong> Most public website content has been migrated to the <code>master_content</code> setting to allow immediate editing without a full page builder.
        </div>
      </div>
    </div>
  );
};

export default PageEditor;
