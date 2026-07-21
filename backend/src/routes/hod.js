const express = require('express');
const router = express.Router();
const { verifyToken, authorizeRoles } = require('../middleware/auth.middleware');

router.use(verifyToken);
router.use(authorizeRoles('hod'));

router.get('/dashboard', (req, res) => {
  res.json({
    message: 'Welcome to HOD Dashboard',
    user: req.user,
    stats: {
      totalStudents: 120,
      totalFaculty: 15,
      pendingApprovals: 4
    }
  });
});

module.exports = router;
