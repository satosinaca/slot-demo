const express = require('express');
const router = express.Router();
const db = require('../db/database');

// Get leaderboard
router.get('/', (req, res) => {
  try {
    const limit = req.query.limit || 50;
    const users = db.getAllUsers()
      .sort((a, b) => b.balance - a.balance)
      .slice(0, limit)
      .map((u, index) => ({ 
        rank: index + 1,
        username: u.username, 
        balance: u.balance, 
        points: u.points 
      }));

    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
