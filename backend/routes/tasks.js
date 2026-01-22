const express = require('express');
const router = express.Router();
const db = require('../db/database');

// Get tasks
router.get('/', (req, res) => {
  try {
    const tasks = [
      { id: 1, title: 'Play 5 games', reward: 100, description: 'Play 5 games to complete this task' },
      { id: 2, title: 'Win $100', reward: 200, description: 'Win total $100' },
      { id: 3, title: 'Spin 10 times', reward: 150, description: 'Make 10 spins' }
    ];
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Complete task
router.post('/:userId/complete/:taskId', (req, res) => {
  try {
    const user = db.findUserById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const taskRewards = {
      '1': 100,
      '2': 200,
      '3': 150
    };

    const reward = taskRewards[req.params.taskId];
    if (!reward) {
      return res.status(400).json({ error: 'Invalid task' });
    }

    user.balance += reward;
    user.points += 10;
    user.completedTasks = user.completedTasks || [];
    user.completedTasks.push(req.params.taskId);

    db.updateUser(req.params.userId, user);

    res.json({ 
      message: 'Task completed', 
      reward: reward,
      balance: user.balance,
      points: user.points
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
