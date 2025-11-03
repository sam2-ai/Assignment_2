const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET /api/users - Get all users (for admin/testing)
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({}, 'firstName lastName email country createdAt').sort({ createdAt: -1 });
    res.json({ users, count: users.length });
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;