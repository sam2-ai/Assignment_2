const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const { authenticateToken } = require('../middleware/auth');

// Login validation
const loginValidators = [
  body('email').trim().isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required')
];

// POST /api/login
router.post('/login', loginValidators, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    // Generate token
    const jwtSecret = process.env.JWT_SECRET || 'dev-secret';
    const jwtExpiresIn = process.env.JWT_EXPIRES_IN || '24h';
    const tokenPayload = { 
      id: user._id, 
      email: user.email, 
      name: user.firstName,
      iat: Math.floor(Date.now() / 1000)
    };
    const token = jwt.sign(tokenPayload, jwtSecret, { expiresIn: jwtExpiresIn });

    return res.json({ message: 'Login successful', token, user: { firstName: user.firstName, email: user.email } });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/profile - Get user profile (protected route)
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        country: user.country,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    });
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/logout - Logout user (client-side token removal)
router.post('/logout', authenticateToken, async (req, res) => {
  try {
    // In a more advanced implementation, you might maintain a blacklist of tokens
    // For now, we'll rely on client-side token removal
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/refresh - Refresh JWT token
router.post('/refresh', authenticateToken, async (req, res) => {
  try {
    const user = req.user;
    
    // Generate new token
    const jwtSecret = process.env.JWT_SECRET || 'dev-secret';
    const jwtExpiresIn = process.env.JWT_EXPIRES_IN || '24h';
    const tokenPayload = { 
      id: user._id, 
      email: user.email, 
      name: user.firstName,
      iat: Math.floor(Date.now() / 1000)
    };
    const token = jwt.sign(tokenPayload, jwtSecret, { expiresIn: jwtExpiresIn });
    
    res.json({ 
      message: 'Token refreshed successfully', 
      token,
      user: { firstName: user.firstName, email: user.email }
    });
  } catch (error) {
    console.error('Token refresh error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;