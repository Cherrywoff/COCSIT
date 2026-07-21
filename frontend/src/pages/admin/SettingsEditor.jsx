import React, { useState, useEffect } from 'react';

const SettingsEditor = () => {
  const [masterContent, setMasterContent] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/public/master')
      .then(res => res.json())
      .then(data => {
        setMasterContent(data || {});
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch settings');
        setLoading(false);
      });
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    // In a real app we'd post to /api/admin/settings
    // Since we don't have that yet, let's mock the success
    // Or we can add it to admin.js
    fetch('http://localhost:5000/api/admin/settings', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ key: 'master_content', value: masterContent })
    })
    .then(res => {
      if (!res.ok) throw new Error('Failed to save settings');
      alert('Settings saved successfully!');
    })
    .catch(err => alert(err.message));
  };

  const handleContentChange = (section, field, value) => {
    setMasterContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  if (loading) return <p>Loading Settings...</p>;
  if (error) return <p style={{color: 'red'}}>{error}</p>;

  return (
    <div>
      <h2 style={{ color: 'var(--accent-indigo)', marginBottom: '20px' }}>Global Settings & Content</h2>
      
      <form onSubmit={handleSave} className="card" style={{ marginBottom: '30px' }}>
        <h3>Master Content Configuration</h3>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>Modify the static content displayed on the public website.</p>
        
        {Object.keys(masterContent).map(section => (
          <div key={section} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #eaeaea', borderRadius: '8px' }}>
            <h4 style={{ textTransform: 'capitalize', marginBottom: '10px' }}>{section.replace('_', ' ')}</h4>
            <div style={{ marginBottom: '10px' }}>
              <label>Title</label>
              <input 
                type="text" 
                className="form-control" 
                value={masterContent[section]?.title || ''} 
                onChange={(e) => handleContentChange(section, 'title', e.target.value)}
              />
            </div>
          </div>
        ))}
        
        <button type="submit" className="btn btn-primary">Save All Settings</button>
      </form>
    </div>
  );
};

export default SettingsEditor;
