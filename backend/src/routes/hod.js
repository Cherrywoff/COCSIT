const express = require('express');
const router = express.Router();
const { verifyToken, authorizeRoles } = require('../middleware/auth.middleware');

router.use(verifyToken);
router.use(authorizeRoles('hod'));

// @route   GET /api/hod/dashboard
// @desc    Get HOD dashboard data
router.get('/dashboard', (req, res) => {
  const db = require('../database');
  const department = req.user.department || 'Computer Science';
  
  db.get("SELECT COUNT(*) as faculty_count FROM users WHERE role = 'teacher' AND department = ?", [department], (err, facultyResult) => {
    res.json({
      message: 'Welcome to HOD Dashboard',
      user: req.user,
      stats: {
        totalFaculty: facultyResult ? facultyResult.faculty_count : 0,
        pendingApprovals: 2,
        activeCourses: 5
      }
    });
  });
});

// @route   GET /api/hod/faculty
// @desc    Get faculty list for HOD's department
router.get('/faculty', (req, res) => {
  const db = require('../database');
  const department = req.user.department || 'Computer Science';
  
  db.all("SELECT id, name, username, email FROM users WHERE role = 'teacher' AND department = ?", [department], (err, rows) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json(rows || []);
  });
});

// @route   GET /api/hod/subjects
// @desc    Get subjects/courses for department
router.get('/subjects', (req, res) => {
  res.json([
    { id: 1, name: 'Java Programming', code: 'CS101', semester: 'Sem 1' },
    { id: 2, name: 'Database Systems', code: 'CS102', semester: 'Sem 2' },
    { id: 3, name: 'Web Technology', code: 'CS201', semester: 'Sem 3' }
  ]);
});

module.exports = router;
