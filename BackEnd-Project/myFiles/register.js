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
    const saltRounds = 10;
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

    // generate JWT token (keep secret in env in production)
    const jwtSecret = process.env.JWT_SECRET || 'dev-secret';
    const tokenPayload = { id: user._id, email: user.email, name: user.firstName };
    const token = jwt.sign(tokenPayload, jwtSecret, { expiresIn: '1h' });

    return res.status(201).json({ message: 'User registered', token });
  } catch (err) {
    console.error('Registration error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
