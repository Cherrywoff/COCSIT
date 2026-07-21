const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'cocsit_secret_key_2026';

/**
 * Middleware to verify JWT token.
 * Extracts user info from token and attaches it to req.user
 */
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // { id, username, role, name, department }
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid or expired token.' });
  }
};

/**
 * Middleware factory to authorize specific roles.
 * Usage: router.get('/admin-only', verifyToken, authorizeRoles('admin'), (req, res) => {...})
 * @param  {...string} allowedRoles 
 */
const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Access denied. Not authenticated.' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Permission denied. Insufficient role permissions.' });
    }

    next();
  };
};

module.exports = {
  verifyToken,
  authorizeRoles
};
