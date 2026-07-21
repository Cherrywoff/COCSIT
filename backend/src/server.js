const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRouter = require('./routes/auth');
const publicRouter = require('./routes/public');
const portalRouter = require('./routes/portal');

app.use('/api/auth', authRouter);
app.use('/api/public', publicRouter);
app.use('/api/portal', portalRouter);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`COCSIT Server is running on port ${PORT}`);
});
