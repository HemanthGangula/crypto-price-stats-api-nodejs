const express = require('express');
const router = express.Router();
const { getAllSnapshots } = require('../db');

const ALLOWED_COINS = new Set(['bitcoin', 'ethereum', 'matic-network']);

function calculateStandardDeviation(prices) {
  if (prices.length < 2) {
    return 0.0;
  }

  const mean = prices.reduce((sum, price) => sum + price, 0) / prices.length;
  const squaredDiffs = prices.map(price => Math.pow(price - mean, 2));
  const meanSquaredDiff = squaredDiffs.reduce((sum, diff) => sum + diff, 0) / prices.length;
  return Math.sqrt(meanSquaredDiff);
}

router.get('/deviation', async (req, res) => {
  const { coin } = req.query;

  if (!coin || !ALLOWED_COINS.has(coin)) {
    return res.status(400).json({ error: `Coin '${coin}' is not supported.` });
  }

  try {
    const snapshots = await getAllSnapshots(coin, 100); 
    const prices = snapshots.map(snapshot => snapshot.current_price);

    if (prices.length === 0) {
      return res.status(404).json({ error: `No data found for coin '${coin}'.` });
    }

    const deviation = calculateStandardDeviation(prices);

    res.json({ deviation: deviation.toFixed(2) });
  } catch (error) {
    console.error(`Error fetching data for coin '${coin}':`, error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;