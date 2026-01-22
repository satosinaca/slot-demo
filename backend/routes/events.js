const express = require('express');
const router = express.Router();

// Get daily events
router.get('/', (req, res) => {
  try {
    const events = [
      { id: 1, name: 'Daily Login', reward: 50, description: 'Login daily to get rewards' },
      { id: 2, name: 'Lucky Spin', reward: 100, description: 'Spin the wheel for bonus' },
      { id: 3, name: 'Tournament', reward: 500, description: 'Compete with other players' }
    ];
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
