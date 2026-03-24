const { auth } = require('../config/firebase');

/**
 * Middleware to verify Firebase ID token from the Authorization header.
 * Usage: add `authenticate` to any route that requires a logged-in user.
 */
const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized. No token provided.' });
  }

  const idToken = authHeader.split('Bearer ')[1];

  try {
    const decodedToken = await auth.verifyIdToken(idToken);
    req.user = decodedToken; // contains uid, email, role (custom claims), etc.
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired token.' });
  }
};

/**
 * Middleware to protect admin-only routes.
 * Requires `authenticate` to run first.
 * Set custom claim via Firebase Admin SDK: auth.setCustomUserClaims(uid, { admin: true })
 */
const requireAdmin = (req, res, next) => {
  if (!req.user || !req.user.admin) {
    return res.status(403).json({ error: 'Forbidden. Admin access required.' });
  }
  next();
};

module.exports = { authenticate, requireAdmin };
