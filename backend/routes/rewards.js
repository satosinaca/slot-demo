const express = require('express');
const router = express.Router();
const db = require('../db/database');

// Get available rewards
router.get('/', (req, res) => {
  try {
    const rewards = [
      { id: 1, name: 'Welcome Bonus', amount: 100, description: 'Bonus for new players' },
      { id: 2, name: 'Daily Spin', amount: 50, description: 'Spin to win daily rewards' },
      { id: 3, name: 'VIP Bonus', amount: 500, description: 'Special VIP rewards' }
    ];
    res.json(rewards);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Claim reward
router.post('/:userId/claim/:rewardId', (req, res) => {
  try {
    const user = db.findUserById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const rewardAmounts = {
      '1': 100,
      '2': 50,
      '3': 500
    };

    const amount = rewardAmounts[req.params.rewardId];
    if (!amount) {
      return res.status(400).json({ error: 'Invalid reward' });
    }

    user.balance += amount;
    user.claimedRewards = user.claimedRewards || [];
    user.claimedRewards.push({ rewardId: req.params.rewardId, claimedAt: new Date() });

    db.updateUser(req.params.userId, user);

    res.json({ 
      message: 'Reward claimed successfully', 
      balance: user.balance,
      amount: amount
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
