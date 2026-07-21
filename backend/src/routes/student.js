const express = require('express');
const router = express.Router();
const { verifyToken, authorizeRoles } = require('../middleware/auth.middleware');

// Apply middleware to all routes in this router
router.use(verifyToken);
router.use(authorizeRoles('student'));

// @route   GET /api/student/dashboard
// @desc    Get student dashboard data
router.get('/dashboard', (req, res) => {
  const db = require('../database');
  
  db.get("SELECT * FROM student_details WHERE id = ?", [req.user.id], (err, profile) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    
    // Fetch quick stats
    db.get("SELECT COUNT(*) as total_present FROM attendance WHERE student_id = ? AND status = 'Present'", [req.user.id], (err2, att) => {
      res.json({
        message: 'Welcome to Student Dashboard',
        user: req.user,
        profile: profile || {},
        stats: {
          attendance_days: att ? att.total_present : 0,
          pendingFees: 0,
          assignmentsDue: 0
        }
      });
    });
  });
});

// @route   GET /api/student/attendance
// @desc    Get student attendance records
router.get('/attendance', (req, res) => {
  const db = require('../database');
  db.all("SELECT * FROM attendance WHERE student_id = ? ORDER BY date DESC", [req.user.id], (err, rows) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json(rows || []);
  });
});

// @route   GET /api/student/results
// @desc    Get student grades
router.get('/results', (req, res) => {
  const db = require('../database');
  db.all("SELECT * FROM grades WHERE student_id = ? ORDER BY exam_name DESC", [req.user.id], (err, rows) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json(rows || []);
  });
});

module.exports = router;
