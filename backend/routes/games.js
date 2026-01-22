const express = require('express');
const router = express.Router();

// List all games
router.get('/', (req, res) => {
  const games = [
    { id: 'sl', name: 'Starlight Princess', url: '/sl.html', image: '/image/Starlight-Princess_EN_339x180_01.png' },
    { id: 'slc', name: 'Starlight Princess Christmas', url: '/slc.html', image: '/image/Starlight-Christmas_339x180.png' },
    { id: 'gool', name: 'Gate of Olympus', url: '/gool.html', image: '/image/GOOL_EN_339x180.png' },
    { id: 'sbc', name: 'Sweet Bonanza Xmas', url: '/sbc.html', image: '/image/Sweet-Bonanza-Xmas™_339x180.png' },
    { id: 'sb', name: 'Sweet Bonanza', url: '/sb.html', image: '/image/Sweet-Bonanza™_Thumb_339x180-3.png' },
    { id: 'dog', name: 'The Dog House', url: '/dog.html', image: '/image/The-Dog-House™_339x180px-1-1.png' },
    { id: 'thor', name: 'Thor Megaways', url: '/thor.html', image: '/image/Power_of_Thor_Megaways_EN_339x180.png' },
    { id: 'wwg', name: 'Wild West Gold', url: '/wwg.html', image: '/image/Wild_West_Gold_Megaways_EN_339x180_01-1.png' },
    { id: 'zvh', name: 'Zeus vs Hades', url: '/zvh.html', image: '/image/Zeus-vs-Hades-Gods-of-war_339x180.png' }
  ];

  res.json(games);
});

// Get game details
router.get('/:id', (req, res) => {
  const games = {
    'sl': { id: 'sl', name: 'Starlight Princess', rtp: '96.5%', volatility: 'Medium' },
    'gool': { id: 'gool', name: 'Gate of Olympus', rtp: '96.5%', volatility: 'High' },
    'sbc': { id: 'sbc', name: 'Sweet Bonanza Xmas', rtp: '96.48%', volatility: 'Medium' }
  };

  const game = games[req.params.id];
  res.json(game || { error: 'Game not found' });
});

module.exports = router;
