const express = require('express');
const router = express.Router();
const { verifyToken, authorizeRoles } = require('../middleware/auth.middleware');

router.use(verifyToken);
router.use(authorizeRoles('teacher'));

router.get('/dashboard', (req, res) => {
  res.json({
    message: 'Welcome to Teacher Dashboard',
    user: req.user,
    stats: {
      classesToday: 3,
      pendingAttendance: 1,
      assignmentsToReview: 15
    }
  });
});

module.exports = router;
