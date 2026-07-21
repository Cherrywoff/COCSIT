const express = require('express');
const router = express.Router();
const { verifyToken, authorizeRoles } = require('../middleware/auth.middleware');

router.use(verifyToken);
router.use(authorizeRoles('admin'));

router.get('/dashboard', (req, res) => {
  res.json({
    message: 'Welcome to Admin CMS Dashboard',
    user: req.user,
    stats: {
      storageUsed: '45%',
      publishedPages: 12,
      pendingDrafts: 3
    }
  });
});

module.exports = router;
