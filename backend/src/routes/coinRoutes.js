const express = require('express');
const router = express.Router();
const { getSnapshot, getAllSnapshots } = require('../db');
const { CryptoSnapshot } = require('../models/coin');

router.get('/status/:coin_id', async (req, res) => {
    try {
        const { coin_id } = req.params;
        const snapshot = await getSnapshot(coin_id);

        if (snapshot) {
            return res.json(new CryptoSnapshot({
                coin_id: snapshot.coin_id,
                current_price: snapshot.current_price,
                market_cap: snapshot.market_cap,
                price_change_percentage_24h: snapshot.price_change_percentage_24h,
                timestamp: snapshot.timestamp.toISOString(), 
            }));
        } else {
            return res.status(404).json({ error: 'Coin not found' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/status/history/:coin_id', async (req, res) => {
    try {
        const { coin_id } = req.params;
        const snapshots = await getAllSnapshots(coin_id);

        return res.json(snapshots.map(snapshot => new CryptoSnapshot({
            coin_id: snapshot.coin_id,
            current_price: snapshot.current_price,
            market_cap: snapshot.market_cap,
            price_change_percentage_24h: snapshot.price_change_percentage_24h,
            timestamp: snapshot.timestamp.toISOString(),
        })));
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
