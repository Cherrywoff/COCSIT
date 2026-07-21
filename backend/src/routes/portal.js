const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../database');

const JWT_SECRET = 'cocsit_secret_key_2026';

// Authentication Middleware
function authMiddleware(req, res, next) {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token is invalid' });
  }
}

// Apply authentication check to all routes in this router
router.use(authMiddleware);

// @route   GET /api/portal/profile
// @desc    Get current user profile
router.get('/profile', (req, res) => {
  db.get('SELECT id, username, name, role, department, email FROM users WHERE id = ?', [req.user.id], (err, user) => {
    if (err || !user) {
      return res.status(400).json({ error: 'User profile not found' });
    }
    res.json(user);
  });
});

// @route   GET /api/portal/attendance
// @desc    Get student attendance logs or department statistics
router.get('/attendance', (req, res) => {
  if (req.user.role === 'student') {
    // Return attendance list and metrics for the logged-in student
    db.all('SELECT date, subject, status FROM attendance WHERE student_id = ? ORDER BY date DESC', [req.user.id], (err, rows) => {
      if (err) {
        return res.status(500).json({ error: 'Database error fetching attendance' });
      }

      // Calculate subject-wise metrics
      const subjectMetrics = {};
      rows.forEach(log => {
        if (!subjectMetrics[log.subject]) {
          subjectMetrics[log.subject] = { present: 0, total: 0 };
        }
        subjectMetrics[log.subject].total++;
        if (log.status === 'Present') {
          subjectMetrics[log.subject].present++;
        }
      });

      const summary = Object.keys(subjectMetrics).map(subj => {
        const item = subjectMetrics[subj];
        return {
          subject: subj,
          present: item.present,
          total: item.total,
          percentage: item.total > 0 ? Math.round((item.present / item.total) * 100) : 0
        };
      });

      res.json({ logs: rows, summary });
    });
  } else {
    // HOD, Admin, or Teacher: get all attendance records for their department
    const query = req.user.role === 'admin'
      ? 'SELECT a.*, u.name as student_name, u.department FROM attendance a JOIN users u ON a.student_id = u.id ORDER BY a.date DESC'
      : 'SELECT a.*, u.name as student_name, u.department FROM attendance a JOIN users u ON a.student_id = u.id WHERE u.department = ? ORDER BY a.date DESC';
    const params = req.user.role === 'admin' ? [] : [req.user.department];

    db.all(query, params, (err, rows) => {
      if (err) {
        return res.status(500).json({ error: 'Database error fetching attendance lists' });
      }
      res.json(rows);
    });
  }
});

// @route   POST /api/portal/attendance
// @desc    Mark attendance for a list of students (Teacher, HOD, Admin only)
router.post('/attendance', (req, res) => {
  const { date, subject, logs } = req.body; // logs: [{ student_id: 'student_01', status: 'Present' }]

  if (req.user.role === 'student') {
    return res.status(403).json({ error: 'Permission denied' });
  }

  if (!date || !subject || !logs || !Array.isArray(logs)) {
    return res.status(400).json({ error: 'Invalid payload parameters' });
  }

  db.serialize(() => {
    const stmt = db.prepare('INSERT INTO attendance (student_id, date, subject, status) VALUES (?, ?, ?, ?)');
    logs.forEach(log => {
      stmt.run(log.student_id, date, subject, log.status);
    });
    stmt.finalize((err) => {
      if (err) {
        return res.status(500).json({ error: 'Database insertion error' });
      }
      res.json({ success: true, message: `Attendance logs saved for ${logs.length} students` });
    });
  });
});

// @route   GET /api/portal/grades
// @desc    Get student academic marks sheet
router.get('/grades', (req, res) => {
  const studentId = req.user.role === 'student' ? req.user.id : req.query.student_id;
  if (!studentId) {
    return res.status(400).json({ error: 'Student ID parameter required' });
  }

  db.all('SELECT subject, marks_obtained, marks_total, exam_name FROM grades WHERE student_id = ?', [studentId], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Database error fetching grades' });
    }
    res.json(rows);
  });
});

// @route   POST /api/portal/notice
// @desc    Create a new announcement notice (Admin, HOD only)
router.post('/notice', (req, res) => {
  const { title, content, category } = req.body;

  if (req.user.role !== 'admin' && req.user.role !== 'hod') {
    return res.status(403).json({ error: 'Permission denied: Admin or HOD status required' });
  }

  if (!title || !category) {
    return res.status(400).json({ error: 'Title and category fields are required' });
  }

  const dateStr = new Date().toISOString().slice(0, 10);

  db.run(
    'INSERT INTO notices (title, content, date, category) VALUES (?, ?, ?, ?)',
    [title, content, dateStr, category],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Database insertion error' });
      }
      res.json({ success: true, noticeId: this.lastID, message: 'Notice posted successfully' });
    }
  );
});

// @route   GET /api/portal/students
// @desc    Get list of students in the department (Teacher, HOD, Admin only)
router.get('/students', (req, res) => {
  if (req.user.role === 'student') {
    return res.status(403).json({ error: 'Permission denied' });
  }

  const query = req.user.role === 'admin'
    ? "SELECT id, name, department, email FROM users WHERE role = 'student'"
    : "SELECT id, name, department, email FROM users WHERE role = 'student' AND department = ?";
  const params = req.user.role === 'admin' ? [] : [req.user.department];

  db.all(query, params, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Database error fetching students' });
    }
    res.json(rows);
  });
});

// @route   DELETE /api/portal/notice/:id
// @desc    Delete notice (Admin, HOD only)
router.delete('/notice/:id', (req, res) => {
  if (req.user.role !== 'admin' && req.user.role !== 'hod') {
    return res.status(403).json({ error: 'Permission denied' });
  }

  db.run('DELETE FROM notices WHERE id = ?', [req.params.id], function(err) {
    if (err) {
      return res.status(500).json({ error: 'Database deletion error' });
    }
    res.json({ success: true, message: 'Notice deleted successfully' });
  });
});

// @route   POST /api/portal/master
// @desc    Update website settings catalog (Admin only)
router.post('/master', (req, res) => {
  const fs = require('fs');
  const path = require('path');
  
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Permission denied: Admin status required' });
  }

  const filePath = path.join(__dirname, '..', '..', '..', 'content_source', 'master_content.json');
  try {
    fs.writeFileSync(filePath, JSON.stringify(req.body, null, 2), 'utf8');
    res.json({ success: true, message: 'Master content updated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save master content' });
  }
});

module.exports = router;
