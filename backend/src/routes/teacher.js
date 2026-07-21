const express = require('express');
const router = express.Router();
const { verifyToken, authorizeRoles } = require('../middleware/auth.middleware');

router.use(verifyToken);
router.use(authorizeRoles('teacher'));

// @route   GET /api/teacher/dashboard
// @desc    Get teacher dashboard data
router.get('/dashboard', (req, res) => {
  const db = require('../database');
  
  // Quick stats
  db.get("SELECT COUNT(*) as total_students FROM student_details WHERE division = 'A'", [], (err, stats) => {
    res.json({
      message: 'Welcome to Teacher Dashboard',
      user: req.user,
      stats: {
        classesToday: 3,
        pendingAttendance: 1,
        assignmentsToReview: 15,
        totalStudentsAssigned: stats ? stats.total_students : 0
      }
    });
  });
});

// @route   GET /api/teacher/classes
// @desc    Get classes assigned to teacher
router.get('/classes', (req, res) => {
  // Mock data for assigned classes
  res.json([
    { id: 1, name: 'BCA 1st Year (Div A)', subject: 'C Programming' },
    { id: 2, name: 'BCA 2nd Year (Div B)', subject: 'Database Management' }
  ]);
});

// @route   POST /api/teacher/attendance
// @desc    Mark attendance for a class
router.post('/attendance', (req, res) => {
  const { student_id, date, subject, status } = req.body;
  const db = require('../database');
  
  if (!student_id || !date || !subject || !status) {
    return res.status(400).json({ error: 'Please provide all fields' });
  }

  const stmt = db.prepare("INSERT INTO attendance (student_id, date, subject, status) VALUES (?, ?, ?, ?)");
  stmt.run(student_id, date, subject, status, function(err) {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json({ success: true, id: this.lastID });
  });
  stmt.finalize();
});

// @route   POST /api/teacher/marks
// @desc    Input grades
router.post('/marks', (req, res) => {
  const { student_id, subject, marks_obtained, marks_total, exam_name } = req.body;
  const db = require('../database');
  
  const stmt = db.prepare("INSERT INTO grades (student_id, subject, marks_obtained, marks_total, exam_name) VALUES (?, ?, ?, ?, ?)");
  stmt.run(student_id, subject, marks_obtained, marks_total, exam_name, function(err) {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json({ success: true, id: this.lastID });
  });
  stmt.finalize();
});

module.exports = router;
