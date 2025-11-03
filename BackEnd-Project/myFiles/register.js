const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');

// Validation chain for registration
const registrationValidators = [
  body('firstName').trim().notEmpty().withMessage('First name is required'),
  body('lastName').trim().notEmpty().withMessage('Last name is required'),
  body('email').trim().isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('agreeToTerms').custom((v) => v === true).withMessage('You must agree to terms'),
  body('country').optional().trim()
];

// POST /api/register
router.post('/register', registrationValidators, async (req, res) => {
  // check validation result
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // return array of { msg, param }
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { firstName, lastName, email, password, country, agreeToTerms } = req.body;

    // check existing user
    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ message: 'Email already registered' });

    // hash password
    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 12;
    const hashed = await bcrypt.hash(password, saltRounds);

    const user = new User({
      firstName,
      lastName,
      email,
      password: hashed,
      country,
      agreeToTerms: !!agreeToTerms,
    });

    await user.save();

    // generate JWT token
    const jwtSecret = process.env.JWT_SECRET || 'dev-secret';
    const jwtExpiresIn = process.env.JWT_EXPIRES_IN || '24h';
    const tokenPayload = { 
      id: user._id, 
      email: user.email, 
      name: user.firstName,
      iat: Math.floor(Date.now() / 1000)
    };
    const token = jwt.sign(tokenPayload, jwtSecret, { expiresIn: jwtExpiresIn });

    return res.status(201).json({ message: 'User registered', token });
  } catch (err) {
    console.error('Registration error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
