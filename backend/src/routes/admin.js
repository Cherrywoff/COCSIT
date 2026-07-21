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

// @route   POST /api/admin/notice
// @desc    Create a new notice
router.post('/notice', (req, res) => {
  const { title, content, date, category } = req.body;
  const db = require('../database');
  
  if (!title || !date || !category) {
    return res.status(400).json({ error: 'Please provide all required fields' });
  }

  const stmt = db.prepare("INSERT INTO notices (title, content, date, category) VALUES (?, ?, ?, ?)");
  stmt.run(title, content, date, category, function(err) {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json({ success: true, id: this.lastID });
  });
  stmt.finalize();
});

// @route   DELETE /api/admin/notice/:id
// @desc    Delete a notice
router.delete('/notice/:id', (req, res) => {
  const db = require('../database');
  db.run("DELETE FROM notices WHERE id = ?", [req.params.id], function(err) {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json({ success: true });
  });
});

// @route   PUT /api/admin/settings
// @desc    Update website settings
router.put('/settings', (req, res) => {
  const { key, value } = req.body;
  const db = require('../database');
  
  if (!key || !value) {
    return res.status(400).json({ error: 'Please provide key and value' });
  }

  const valueStr = typeof value === 'object' ? JSON.stringify(value) : value;

  db.run("UPDATE website_settings SET value = ? WHERE key = ?", [valueStr, key], function(err) {
    if (err) return res.status(500).json({ error: 'Database error' });
    // If no row was updated, insert it
    if (this.changes === 0) {
      db.run("INSERT INTO website_settings (key, value) VALUES (?, ?)", [key, valueStr], function(err2) {
        if (err2) return res.status(500).json({ error: 'Database error' });
        res.json({ success: true });
      });
    } else {
      res.json({ success: true });
    }
  });
});

module.exports = router;
