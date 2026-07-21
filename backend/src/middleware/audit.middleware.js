const db = require('../database');
const supabase = require('../supabase');

/**
 * Middleware to log actions to an audit table.
 * Records Who, What, When, and IP address.
 */
const auditLog = (actionName) => {
  return async (req, res, next) => {
    // We hook into the response finish event so we only log if it succeeded (or log errors)
    res.on('finish', () => {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        const logEntry = {
          user_id: req.user ? req.user.id : null,
          role: req.user ? req.user.role : 'anonymous',
          action: actionName,
          endpoint: req.originalUrl,
          method: req.method,
          ip_address: req.ip,
          timestamp: new Date().toISOString()
        };

        // If using Supabase
        if (supabase) {
          // Since we don't have an audit_logs table yet in Supabase SQL, we can just console log in development
          // In production, we'd insert: supabase.from('audit_logs').insert([logEntry]);
          console.log('[AUDIT LOG Supabase]', logEntry);
        } else {
          // Fallback SQLite
          console.log('[AUDIT LOG SQLite]', logEntry);
        }
      }
    });
    
    next();
  };
};

module.exports = {
  auditLog
};
