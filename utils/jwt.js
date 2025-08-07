const jwt = require('jsonwebtoken');
const { secret, expiresIn } = require('../config/jwt');

// Generate JWT token
exports.generateToken = (payload) => {
  return jwt.sign(payload, secret, { expiresIn });
};

// Verify JWT token
exports.verifyToken = (token) => {
  return jwt.verify(token, secret);
};
