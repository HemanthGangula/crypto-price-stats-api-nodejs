# crypto-price-stats-api-nodejs

Cryptocurrency Price Stats API

This project fetches cryptocurrency data, stores it in a MongoDB database, and exposes APIs to retrieve the latest cryptocurrency status, history, and deviation. The project implements background jobs to fetch data every 2 hours, deploys the database on MongoDB Atlas, and the backend on AWS EC2.

## Setup

1. **Database Deployment**:
    - The database is deployed on MongoDB Atlas in a free tier cluster.

2. **Backend Deployment**:
    - The backend is deployed on an AWS EC2 instance. You can access the APIs at the following base URL:
      ```
      http://3.129.230.195:3000/api/status/bitcoin
      ```

3. **Scheduling**:
    - Data fetching is scheduled every 2 hours using a cron job running inside the Docker container. The job fetches the latest data from CoinGecko and stores it in the MongoDB database.

## API Endpoints

You can interact with the following endpoints:

1. **/status/{coin_id}**
    - **Description**: Returns the current status of the requested cryptocurrency.
    - **Example**:
      ```
      http://3.129.230.195:3000/api/status/bitcoin
      ```
    - **Response**:
      ```json
      {
         "coin_id": "bitcoin",
         "current_price": 94694,
         "market_cap": 1875810872435,
         "price_change_percentage_24h": 0.24153,
         "timestamp": "2025-01-12T15:19:44.591Z"
      }
      ```

2. **/status/history/{coin_id}**
    - **Description**: Returns the past history of the requested cryptocurrency.
    - **Example**:
      ```
      http://3.129.230.195:3000/api/status/history/bitcoin
      ```
    - **Response**: A list of previous snapshots with the same structure as the `/status/{coin_id}` endpoint.

3. **/deviation?coin={coin_id}**
    - **Description**: Returns the standard deviation of the price for the last 100 records of the requested cryptocurrency.
    - **Example**:
      ```
      http://3.129.230.195:3000/api/deviation?coin=bitcoin
      ```
    - **Response**:
      ```json
      {
         "deviation": 7.34
      }
      ```

## Supported Coins

- Bitcoin
- Ethereum
- Matic Network

## Testing the API Endpoints

You can check if all endpoints are working properly by running the provided shell script. To use the script:

1. Clone the repository.
2. Run the following commands in your terminal:
    ```bash
    chmod +x ./test_endpoints.sh
    ./test_endpoints.sh
    ```

Alternatively, you can manually test the endpoints using the following curl commands:

- **For status**:
  ```bash
  curl http://3.129.230.195:3000/api/status/bitcoin
  curl http://3.129.230.195:3000/api/status/ethereum
  curl http://3.129.230.195:3000/api/status/matic-network
  ```

- **For status history**:
  ```bash
  curl http://3.129.230.195:3000/api/status/history/bitcoin
  curl http://3.129.230.195:3000/api/status/history/ethereum
  curl http://3.129.230.195:3000/api/status/history/matic-network
  ```

- **For deviation**:
  ```bash
  curl http://3.129.230.195:3000/api/deviation?coin=bitcoin
  curl http://3.129.230.195:3000/api/deviation?coin=ethereum
  curl http://3.129.230.195:3000/api/deviation?coin=matic-network
  ```

## Notes

- **Latency**: Due to the use of the free-tier MongoDB Atlas cluster, you may notice some latency in the response times. This is not an issue with the code but rather a limitation of the free-tier database.
