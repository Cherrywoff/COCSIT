const express = require('express');
const router = express.Router();
const { verifyToken, authorizeRoles } = require('../middleware/auth.middleware');

router.use(verifyToken);
router.use(authorizeRoles('principal'));

router.get('/dashboard', (req, res) => {
  res.json({
    message: 'Welcome to Principal Dashboard',
    user: req.user,
    stats: {
      totalStudents: 1500,
      totalFaculty: 120,
      feeCollection: '85%'
    }
  });
});

module.exports = router;
