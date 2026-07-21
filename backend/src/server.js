const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

const authRouter = require('./routes/auth');
const publicRouter = require('./routes/public');
const studentRouter = require('./routes/student');
const teacherRouter = require('./routes/teacher');
const adminRouter = require('./routes/admin');
const storageRouter = require('./routes/storage');
const { router: notificationsRouter } = require('./routes/notifications');
const { auditLog } = require('./middleware/audit.middleware');

// Serve static files for uploads
app.use('/uploads', express.static(path.join(__dirname, '..', '..', 'uploads')));

// Apply audit logging to all API routes
app.use('/api', auditLog('API_REQUEST'));

app.use('/api/auth', authRouter);
app.use('/api/public', publicRouter);
app.use('/api/student', studentRouter);
app.use('/api/teacher', teacherRouter);
app.use('/api/hod', hodRouter);
app.use('/api/principal', principalRouter);
app.use('/api/admin', adminRouter);
app.use('/api/storage', storageRouter);
app.use('/api/notifications', notificationsRouter);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`COCSIT Server is running on port ${PORT}`);
});
