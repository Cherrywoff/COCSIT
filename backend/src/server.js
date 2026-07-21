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
const hodRouter = require('./routes/hod');
const principalRouter = require('./routes/principal');
const adminRouter = require('./routes/admin');

app.use('/api/auth', authRouter);
app.use('/api/public', publicRouter);
app.use('/api/student', studentRouter);
app.use('/api/teacher', teacherRouter);
app.use('/api/hod', hodRouter);
app.use('/api/principal', principalRouter);
app.use('/api/admin', adminRouter);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`COCSIT Server is running on port ${PORT}`);
});
