import React, { useState, useEffect } from 'react';

const NewsEditor = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form states
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('general');

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = () => {
    fetch('http://localhost:5000/api/public/notices')
      .then(res => res.json())
      .then(data => {
        setNotices(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch notices');
        setLoading(false);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    // In a real app we'd post to /api/admin/notices
    fetch('http://localhost:5000/api/admin/notice', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ title, content, date: new Date().toISOString().split('T')[0], category })
    })
    .then(res => {
      if (!res.ok) throw new Error('Failed to create notice');
      return res.json();
    })
    .then(() => {
      setTitle('');
      setContent('');
      fetchNotices();
      alert('Notice created successfully!');
    })
    .catch(err => alert(err.message));
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this notice?")) return;
    const token = localStorage.getItem('token');
    
    fetch(`http://localhost:5000/api/admin/notice/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(res => {
      if (!res.ok) throw new Error('Deletion failed');
      fetchNotices();
    })
    .catch(err => alert(err.message));
  };

  return (
    <div>
      <h2 style={{ color: 'var(--accent-indigo)', marginBottom: '20px' }}>News & Notices Editor</h2>
      
      <div className="card" style={{ marginBottom: '30px' }}>
        <h3>Create New Notice</h3>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '15px' }}>
          <div>
            <label>Title</label>
            <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div>
            <label>Category</label>
            <select className="form-control" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="general">General</option>
              <option value="academics">Academics</option>
              <option value="placement">Placement</option>
            </select>
          </div>
          <div>
            <label>Content</label>
            <textarea className="form-control" rows="5" value={content} onChange={(e) => setContent(e.target.value)} required></textarea>
          </div>
          <button type="submit" className="btn btn-primary">Publish Notice</button>
        </form>
      </div>

      <div className="card">
        <h3>Existing Notices</h3>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {!loading && !error && notices.length === 0 && <p>No notices found.</p>}
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '15px' }}>
          {notices.map(notice => (
            <div key={notice.id} style={{ padding: '15px', border: '1px solid var(--border-color)', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h4 style={{ margin: '0 0 5px 0' }}>{notice.title}</h4>
                <small style={{ color: 'var(--text-secondary)' }}>{notice.date} | {notice.category}</small>
              </div>
              <button className="btn btn-secondary" style={{ color: 'var(--accent-rose)', borderColor: 'var(--accent-rose)' }} onClick={() => handleDelete(notice.id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsEditor;
