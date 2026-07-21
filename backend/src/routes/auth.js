const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../database');
const supabase = require('../supabase');

const JWT_SECRET = process.env.JWT_SECRET || 'cocsit_secret_key_2026';

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Please enter all fields' });
  }

  const fallbackLogin = () => {
    db.get('SELECT * FROM users WHERE username = ?', [username], (err, user) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      if (!user) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }

      const isMatch = bcrypt.compareSync(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }

      const token = jwt.sign(
        { id: user.id, username: user.username, role: user.role, name: user.name, department: user.department },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.json({
        token,
        user: {
          id: user.id,
          username: user.username,
          name: user.name,
          role: user.role,
          department: user.department,
          email: user.email
        }
      });
    });
  };

  if (supabase) {
    supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .single()
      .then(({ data: user, error }) => {
        if (error || !user) {
          console.log('User not found in Supabase, trying SQLite fallback...');
          return fallbackLogin();
        }

        const passHash = user.password_hash || user.password;
        const isMatch = bcrypt.compareSync(password, passHash);
        if (!isMatch) {
          return res.status(400).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign(
          { id: user.id, username: user.username, role: user.role, name: user.name, department: user.department },
          JWT_SECRET,
          { expiresIn: '24h' }
        );

        res.json({
          token,
          user: {
            id: user.id,
            username: user.username,
            name: user.name,
            role: user.role,
            department: user.department,
            email: user.email
          }
        });
      })
      .catch(err => {
        console.error('Supabase query error:', err.message);
        fallbackLogin();
      });
  } else {
    fallbackLogin();
  }
});

// @route   GET /api/auth/validate
// @desc    Validate token and get user profile
router.get('/validate', (req, res) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    const fallbackValidate = () => {
      db.get('SELECT id, username, name, role, department, email FROM users WHERE id = ?', [decoded.id], (err, user) => {
        if (err || !user) {
          return res.status(400).json({ error: 'User does not exist' });
        }
        res.json({ user });
      });
    };

    if (supabase) {
      supabase
        .from('users')
        .select('id, username, name, role, department, email')
        .eq('id', decoded.id)
        .single()
        .then(({ data: user, error }) => {
          if (error || !user) {
            return fallbackValidate();
          }
          res.json({ user });
        })
        .catch(err => {
          console.error('Supabase query error:', err.message);
          fallbackValidate();
        });
    } else {
      fallbackValidate();
    }
  } catch (err) {
    res.status(401).json({ error: 'Token is not valid' });
  }
});

module.exports = router;
