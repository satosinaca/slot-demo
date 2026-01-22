const express = require('express');
const router = express.Router();
const db = require('../db/database');

// Get user profile
router.get('/:id', (req, res) => {
  try {
    const user = db.findUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update balance
router.put('/:id/balance', (req, res) => {
  try {
    const { amount } = req.body;
    const user = db.findUserById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.balance += amount;
    db.updateUser(req.params.id, user);

    res.json({ balance: user.balance });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add points
router.put('/:id/points', (req, res) => {
  try {
    const { points } = req.body;
    const user = db.findUserById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.points += points;
    db.updateUser(req.params.id, user);

    res.json({ points: user.points });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Leaderboard
router.get('/', (req, res) => {
  try {
    const limit = req.query.limit || 100;
    const users = db.getAllUsers(limit)
      .sort((a, b) => b.balance - a.balance)
      .map(u => ({ username: u.username, balance: u.balance, points: u.points }));

    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
