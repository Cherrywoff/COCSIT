const express = require('express');
const router = express.Router();
const { verifyToken, authorizeRoles } = require('../middleware/auth.middleware');

// Apply middleware to all routes in this router
router.use(verifyToken);
router.use(authorizeRoles('student'));

// @route   GET /api/student/dashboard
// @desc    Get student dashboard data
router.get('/dashboard', (req, res) => {
  // Mock data for now
  res.json({
    message: 'Welcome to Student Dashboard',
    user: req.user,
    stats: {
      attendance: 85,
      pendingFees: 500,
      assignmentsDue: 2
    }
  });
});

module.exports = router;
