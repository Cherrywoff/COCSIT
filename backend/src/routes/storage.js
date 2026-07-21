const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { verifyToken } = require('../middleware/auth.middleware');

// Ensure upload directory exists
const uploadDir = path.join(__dirname, '..', '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Set up Multer for local storage (Fallback for Supabase Storage)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder = 'misc';
    if (file.mimetype.startsWith('image/')) folder = 'images';
    else if (file.mimetype === 'application/pdf') folder = 'documents';
    
    const targetDir = path.join(uploadDir, folder);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    cb(null, targetDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// @route   POST /api/storage/upload
// @desc    Upload a file
router.post('/upload', verifyToken, upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // Generate a URL for the uploaded file
  const fileUrl = `/uploads/${path.basename(req.file.destination)}/${req.file.filename}`;

  res.json({
    message: 'File uploaded successfully',
    fileUrl: fileUrl,
    filename: req.file.filename,
    mimetype: req.file.mimetype,
    size: req.file.size
  });
});

module.exports = router;
