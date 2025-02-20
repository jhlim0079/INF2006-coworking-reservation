// middlewares/auth.js
const bcrypt = require('bcrypt');
const db = require('../db');

// Basic authentication middleware using the Authorization header
const basicAuth = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const base64Credentials = authHeader.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
  const [username, password] = credentials.split(':');
  try {
    const user = await db('users').where({ username }).first();
    if (user && (await bcrypt.compare(password, user.password))) {
      req.user = user;
      return next();
    }
    return res.status(401).json({ error: 'Invalid credentials' });
  } catch (err) {
    return res.status(500).json({ error: 'Server error' });
  }
};

// Middleware to ensure the user is an admin (assumes users table has an isAdmin flag)
const adminAuth = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ error: 'Forbidden: Admins only' });
  }
};

module.exports = {
  basicAuth,
  adminAuth,
};
