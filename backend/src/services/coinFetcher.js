const axios = require('axios');
const { MongoClient } = require('mongodb');

const COINGECKO_URL = "https://api.coingecko.com/api/v3/coins/markets";
const COINS = ["bitcoin", "ethereum", "matic-network"];
const PARAMS = {
    vs_currency: "usd",
    ids: COINS.join(","),
};

// Use environment variable for MongoDB URI or default to 'mongodb://mongodb:27017'
//const MONGO_URI = process.env.MONGO_URI || 'mongodb://mongodb:27017';
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017';

async function fetchAndStore() {
    try {
        console.log("Fetching cryptocurrency data...");
        const response = await axios.get(COINGECKO_URL, { params: PARAMS });
        //console.log("Received data:", response.data); 
        const data = response.data;

        const client = new MongoClient(MONGO_URI);
        await client.connect();
        const db = client.db("crypto_db");
        const collection = db.collection("crypto_snapshots");

        for (const coin of data) {
            const snapshot = {
                coin_id: coin.id,
                current_price: coin.current_price,
                market_cap: coin.market_cap,
                price_change_percentage_24h: coin.price_change_percentage_24h,
                timestamp: new Date(),
            };

            await collection.insertOne(snapshot);
            console.log(`Inserted data for ${coin.id}: ${JSON.stringify(snapshot)}`);
        }

        console.log("Data insertion complete.");
        await client.close();
    } catch (error) {
        console.error("Error:", error);
    }
}

fetchAndStore();
