class CryptoSnapshot {
    constructor({ coin_id, current_price, market_cap, price_change_percentage_24h, timestamp }) {
        this.coin_id = coin_id;
        this.current_price = current_price;
        this.market_cap = market_cap;
        this.price_change_percentage_24h = price_change_percentage_24h;
        this.timestamp = timestamp;
    }
}

module.exports = { CryptoSnapshot };
