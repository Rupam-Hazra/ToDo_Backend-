const express = require('express');
const router = express.Router();
const { register, login, getProfile } = require('../controllers/auth.controller');
const protect = require('../middlewares/auth.middleware');

// Public
router.post('/register', register);
router.post('/login', login);

// Private
router.get('/profile', protect, getProfile);

module.exports = router;
