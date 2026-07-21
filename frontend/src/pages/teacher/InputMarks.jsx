import React, { useState } from 'react';

const InputMarks = () => {
  const [studentId, setStudentId] = useState('');
  const [subject, setSubject] = useState('Java Programming');
  const [marksObtained, setMarksObtained] = useState('');
  const [marksTotal, setMarksTotal] = useState('25');
  const [examName, setExamName] = useState('Internal Test 1');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem('token');
    
    fetch('http://localhost:5000/api/teacher/marks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ 
        student_id: studentId, 
        subject, 
        marks_obtained: parseInt(marksObtained), 
        marks_total: parseInt(marksTotal), 
        exam_name: examName 
      })
    })
    .then(res => {
      if (!res.ok) throw new Error('Failed to input marks');
      return res.json();
    })
    .then(data => {
      alert('Marks saved successfully!');
      setStudentId('');
      setMarksObtained('');
    })
    .catch(err => alert(err.message))
    .finally(() => setLoading(false));
  };

  return (
    <div>
      <h2 style={{ color: 'var(--accent-indigo)', marginBottom: '20px' }}>Input Marks</h2>
      <div className="card">
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div>
            <label>Student ID</label>
            <input type="text" className="form-control" value={studentId} onChange={(e) => setStudentId(e.target.value)} required placeholder="e.g. student_bca" />
          </div>
          <div>
            <label>Subject</label>
            <input type="text" className="form-control" value={subject} onChange={(e) => setSubject(e.target.value)} required />
          </div>
          <div>
            <label>Exam Name</label>
            <input type="text" className="form-control" value={examName} onChange={(e) => setExamName(e.target.value)} required />
          </div>
          <div style={{ display: 'flex', gap: '15px' }}>
            <div style={{ flex: 1 }}>
              <label>Marks Obtained</label>
              <input type="number" className="form-control" value={marksObtained} onChange={(e) => setMarksObtained(e.target.value)} required />
            </div>
            <div style={{ flex: 1 }}>
              <label>Total Marks</label>
              <input type="number" className="form-control" value={marksTotal} onChange={(e) => setMarksTotal(e.target.value)} required />
            </div>
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>Save Marks</button>
        </form>
      </div>
    </div>
  );
};

export default InputMarks;
