const express = require('express');
const router = express.Router();
const { verifyToken, authorizeRoles } = require('../middleware/auth.middleware');

router.use(verifyToken);
router.use(authorizeRoles('principal'));

// @route   GET /api/principal/dashboard
// @desc    Get principal dashboard data
router.get('/dashboard', (req, res) => {
  const db = require('../database');
  
  db.get("SELECT COUNT(*) as total_students FROM student_details", [], (err, studentRes) => {
    db.get("SELECT COUNT(*) as total_teachers FROM users WHERE role = 'teacher'", [], (err, teacherRes) => {
      res.json({
        message: 'Welcome to Principal Dashboard',
        user: req.user,
        stats: {
          totalStudents: studentRes ? studentRes.total_students : 0,
          totalFaculty: teacherRes ? teacherRes.total_teachers : 0,
          departments: 5,
          pendingApprovals: 8
        }
      });
    });
  });
});

// @route   GET /api/principal/analytics
// @desc    Get campus-wide analytics
router.get('/analytics', (req, res) => {
  res.json({
    attendanceRate: '88%',
    feeCollection: '75%',
    topPerformingDept: 'Computer Science'
  });
});

// @route   GET /api/principal/staff
// @desc    Get all campus staff
router.get('/staff', (req, res) => {
  const db = require('../database');
  db.all("SELECT id, name, username, email, role, department FROM users WHERE role IN ('teacher', 'hod', 'admin')", [], (err, rows) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json(rows || []);
  });
});

module.exports = router;
