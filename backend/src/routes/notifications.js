const express = require('express');
const router = express.Router();
const db = require('../database');
const { verifyToken } = require('../middleware/auth.middleware');

// Apply middleware
router.use(verifyToken);

// @route   GET /api/notifications
// @desc    Get user notifications
router.get('/', (req, res) => {
  db.all('SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC', [req.user.id], (err, rows) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json(rows || []);
  });
});

// @route   PUT /api/notifications/:id/read
// @desc    Mark a notification as read
router.put('/:id/read', (req, res) => {
  db.run('UPDATE notifications SET is_read = 1 WHERE id = ? AND user_id = ?', [req.params.id, req.user.id], function(err) {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json({ success: true });
  });
});

// Utility to create a notification (callable internally by other routes)
const createNotification = (userId, title, message) => {
  const timestamp = new Date().toISOString();
  db.run('INSERT INTO notifications (user_id, title, message, created_at) VALUES (?, ?, ?, ?)', [userId, title, message, timestamp], (err) => {
    if (err) console.error('Failed to create notification', err.message);
  });
};

module.exports = { router, createNotification };
