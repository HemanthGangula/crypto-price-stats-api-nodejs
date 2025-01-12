const mongoose = require('mongoose');
const { Schema } = mongoose;

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/crypto_db';
const COLLECTION_NAME = 'crypto_snapshots';

const cryptoSnapshotSchema = new Schema({
    coin_id: { type: String, required: true },
    current_price: { type: Number, required: true },
    market_cap: { type: Number, required: true },
    price_change_percentage_24h: { type: Number, required: true },
    timestamp: { type: Date, required: true }
}, { collection: COLLECTION_NAME });

const CryptoSnapshot = mongoose.model('CryptoSnapshot', cryptoSnapshotSchema);

const getSnapshot = async (coin_id) => {
    try {
        return await CryptoSnapshot.findOne({ coin_id }).sort({ timestamp: -1 }).exec(); // Get the latest snapshot
    } catch (error) {
        console.error('Error getting snapshot:', error);
        throw error;
    }
};

const getAllSnapshots = async (coin_id, limit = 0) => { 
    try {
        let query = CryptoSnapshot.find({ coin_id }).sort({ timestamp: -1 });
        if (limit > 0) {
            query = query.limit(limit);
        }
        return await query.exec(); 
    } catch (error) {
        console.error('Error getting all snapshots:', error);
        throw error;
    }
};

module.exports = { getSnapshot, getAllSnapshots };