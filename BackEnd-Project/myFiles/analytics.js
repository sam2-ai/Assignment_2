const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { authenticateToken } = require('../middleware/auth');

// Dashboard statistics endpoint
router.get('/analytics/dashboard', authenticateToken, async (req, res) => {
  try {
    // Get user statistics
    const totalUsers = await User.countDocuments();
    const newUsersToday = await User.countDocuments({
      createdAt: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) }
    });
    const newUsersThisWeek = await User.countDocuments({
      createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
    });
    const newUsersThisMonth = await User.countDocuments({
      createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
    });

    // Mock document statistics (since we don't have documents yet)
    const totalDocuments = Math.floor(Math.random() * 1000) + 500;
    const documentsToday = Math.floor(Math.random() * 50) + 10;
    const documentsThisWeek = Math.floor(Math.random() * 200) + 50;
    const documentsThisMonth = Math.floor(Math.random() * 500) + 100;

    // Mock activity data
    const activityData = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      activityData.push({
        date: date.toISOString().split('T')[0],
        users: Math.floor(Math.random() * 50) + 10,
        documents: Math.floor(Math.random() * 100) + 20,
        views: Math.floor(Math.random() * 200) + 50
      });
    }

    // Mock storage usage
    const storageUsed = Math.floor(Math.random() * 80) + 10; // 10-90%
    const storageTotal = 100; // GB

    res.json({
      stats: {
        totalUsers,
        newUsersToday,
        newUsersThisWeek,
        newUsersThisMonth,
        totalDocuments,
        documentsToday,
        documentsThisWeek,
        documentsThisMonth,
        storageUsed,
        storageTotal,
        storagePercentage: storageUsed
      },
      activityData,
      recentActivity: [
        {
          id: 1,
          type: 'user_registered',
          message: 'New user registered',
          user: req.user.firstName,
          timestamp: new Date().toISOString()
        },
        {
          id: 2,
          type: 'document_uploaded',
          message: 'Document uploaded',
          user: 'John Doe',
          timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString() // 30 minutes ago
        },
        {
          id: 3,
          type: 'user_login',
          message: 'User logged in',
          user: 'Jane Smith',
          timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString() // 1 hour ago
        }
      ]
    });
  } catch (error) {
    console.error('Dashboard analytics error:', error);
    res.status(500).json({
      message: 'Failed to fetch dashboard statistics',
      error: error.message
    });
  }
});

// Usage statistics endpoint
router.get('/analytics/usage', authenticateToken, async (req, res) => {
  try {
    const { period = '7d' } = req.query;
    
    let days = 7;
    if (period === '30d') days = 30;
    else if (period === '90d') days = 90;

    const usageData = [];
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      usageData.push({
        date: date.toISOString().split('T')[0],
        activeUsers: Math.floor(Math.random() * 100) + 20,
        documentsCreated: Math.floor(Math.random() * 50) + 5,
        documentsViewed: Math.floor(Math.random() * 200) + 50,
        storageUsed: Math.floor(Math.random() * 1000) + 100 // MB
      });
    }

    res.json({
      period,
      data: usageData,
      summary: {
        totalActiveUsers: usageData.reduce((sum, day) => sum + day.activeUsers, 0),
        totalDocumentsCreated: usageData.reduce((sum, day) => sum + day.documentsCreated, 0),
        totalDocumentsViewed: usageData.reduce((sum, day) => sum + day.documentsViewed, 0),
        totalStorageUsed: usageData.reduce((sum, day) => sum + day.storageUsed, 0)
      }
    });
  } catch (error) {
    console.error('Usage analytics error:', error);
    res.status(500).json({
      message: 'Failed to fetch usage statistics',
      error: error.message
    });
  }
});

// Performance metrics endpoint
router.get('/analytics/performance', authenticateToken, async (req, res) => {
  try {
    // Mock performance data
    const performanceData = {
      responseTime: {
        average: Math.floor(Math.random() * 200) + 50, // 50-250ms
        p95: Math.floor(Math.random() * 500) + 200, // 200-700ms
        p99: Math.floor(Math.random() * 1000) + 500 // 500-1500ms
      },
      throughput: {
        requestsPerSecond: Math.floor(Math.random() * 100) + 50,
        requestsPerMinute: Math.floor(Math.random() * 6000) + 3000
      },
      errorRate: {
        percentage: Math.random() * 2, // 0-2%
        total: Math.floor(Math.random() * 50)
      },
      uptime: {
        percentage: 99.9,
        lastDowntime: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString() // 7 days ago
      }
    };

    res.json(performanceData);
  } catch (error) {
    console.error('Performance analytics error:', error);
    res.status(500).json({
      message: 'Failed to fetch performance metrics',
      error: error.message
    });
  }
});

module.exports = router;