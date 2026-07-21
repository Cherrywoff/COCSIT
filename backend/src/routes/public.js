const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const db = require('../database');

// @route   GET /api/public/notices
// @desc    Get all active notices (announcements)
router.get('/notices', (req, res) => {
  db.all('SELECT * FROM notices ORDER BY date DESC', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Database error fetching notices' });
    }
    res.json(rows);
  });
});

// @route   GET /api/public/courses
// @desc    Get courses and syllabus catalogs from JSON source
router.get('/courses', (req, res) => {
  const filePath = path.join(__dirname, '..', '..', '..', 'content_source', 'courses.json');
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    res.json(JSON.parse(data));
  } catch (err) {
    res.status(500).json({ error: 'Error reading courses data file' });
  }
});

// @route   GET /api/public/branding
// @desc    Get college branding details
router.get('/branding', (req, res) => {
  const filePath = path.join(__dirname, '..', '..', '..', 'content_source', 'branding.json');
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    res.json(JSON.parse(data));
  } catch (err) {
    res.status(500).json({ error: 'Error reading branding data file' });
  }
});

// @route   GET /api/public/about/res
router.get('/about/res', (req, res) => {
  const filePath = path.join(__dirname, '..', '..', '..', 'content_source', 'res_info.json');
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    res.json(JSON.parse(data));
  } catch (err) {
    res.status(500).json({ error: 'Error reading res data file' });
  }
});

// @route   GET /api/public/about/principal
router.get('/about/principal', (req, res) => {
  const filePath = path.join(__dirname, '..', '..', '..', 'content_source', 'principal_message.json');
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    res.json(JSON.parse(data));
  } catch (err) {
    res.status(500).json({ error: 'Error reading principal data file' });
  }
});

// @route   GET /api/public/about/chairman
router.get('/about/chairman', (req, res) => {
  const filePath = path.join(__dirname, '..', '..', '..', 'content_source', 'chairman_message.json');
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    res.json(JSON.parse(data));
  } catch (err) {
    res.status(500).json({ error: 'Error reading chairman data file' });
  }
});

// @route   GET /api/public/about/vicechairman
router.get('/about/vicechairman', (req, res) => {
  const filePath = path.join(__dirname, '..', '..', '..', 'content_source', 'vice_chairman_message.json');
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    res.json(JSON.parse(data));
  } catch (err) {
    res.status(500).json({ error: 'Error reading vice chairman data file' });
  }
});

// @route   GET /api/public/master
router.get('/master', (req, res) => {
  const filePath = path.join(__dirname, '..', '..', '..', 'content_source', 'master_content.json');
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    res.json(JSON.parse(data));
  } catch (err) {
    res.status(500).json({ error: 'Error reading master content data file' });
  }
});

module.exports = router;
