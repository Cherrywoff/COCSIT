import React, { useState } from 'react';

const MediaLibrary = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [recentUploads, setRecentUploads] = useState([]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (!file) return alert('Please select a file first.');

    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('file', file);

    setUploading(true);

    fetch('http://localhost:5000/api/storage/upload', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    })
    .then(res => {
      if (!res.ok) throw new Error('Upload failed');
      return res.json();
    })
    .then(data => {
      alert('File uploaded successfully!');
      setRecentUploads(prev => [data, ...prev]);
      setFile(null);
    })
    .catch(err => alert(err.message))
    .finally(() => setUploading(false));
  };

  return (
    <div>
      <h2 style={{ color: 'var(--accent-indigo)', marginBottom: '20px' }}>Media Library</h2>
      
      <div className="card" style={{ marginBottom: '30px' }}>
        <h3>Upload New File</h3>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '15px' }}>Upload images or documents to be used on the website or portals.</p>
        
        <form onSubmit={handleUpload} style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <input type="file" onChange={handleFileChange} className="form-control" style={{ flex: 1 }} />
          <button type="submit" className="btn btn-primary" disabled={!file || uploading}>
            {uploading ? 'Uploading...' : 'Upload File'}
          </button>
        </form>
      </div>

      <div className="card">
        <h3>Recent Uploads</h3>
        {recentUploads.length === 0 && <p>No recent uploads during this session.</p>}
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '15px' }}>
          {recentUploads.map((upload, idx) => (
            <div key={idx} style={{ padding: '15px', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
              <h4 style={{ margin: '0 0 5px 0', wordBreak: 'break-all' }}>{upload.filename}</h4>
              <p style={{ margin: 0, fontSize: '0.85rem' }}>URL: <a href={`http://localhost:5000${upload.fileUrl}`} target="_blank" rel="noreferrer">http://localhost:5000{upload.fileUrl}</a></p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MediaLibrary;
