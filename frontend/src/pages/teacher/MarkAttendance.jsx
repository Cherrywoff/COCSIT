import React, { useState } from 'react';

const MarkAttendance = () => {
  const [studentId, setStudentId] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [subject, setSubject] = useState('Java Programming');
  const [status, setStatus] = useState('Present');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem('token');
    
    fetch('http://localhost:5000/api/teacher/attendance', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ student_id: studentId, date, subject, status })
    })
    .then(res => {
      if (!res.ok) throw new Error('Failed to mark attendance');
      return res.json();
    })
    .then(data => {
      alert('Attendance marked successfully!');
      setStudentId('');
    })
    .catch(err => alert(err.message))
    .finally(() => setLoading(false));
  };

  return (
    <div>
      <h2 style={{ color: 'var(--accent-indigo)', marginBottom: '20px' }}>Mark Attendance</h2>
      <div className="card">
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div>
            <label>Student ID</label>
            <input type="text" className="form-control" value={studentId} onChange={(e) => setStudentId(e.target.value)} required placeholder="e.g. student_bca" />
          </div>
          <div>
            <label>Date</label>
            <input type="date" className="form-control" value={date} onChange={(e) => setDate(e.target.value)} required />
          </div>
          <div>
            <label>Subject</label>
            <input type="text" className="form-control" value={subject} onChange={(e) => setSubject(e.target.value)} required />
          </div>
          <div>
            <label>Status</label>
            <select className="form-control" value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
              <option value="Late">Late</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>Submit Attendance</button>
        </form>
      </div>
    </div>
  );
};

export default MarkAttendance;
