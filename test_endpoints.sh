#!/bin/bash

endpoints=(
  "/status/bitcoin"
  "/status/ethereum"
  "/status/matic-network"
  "/status/history/bitcoin"
  "/status/history/ethereum"
  "/status/history/matic-network"
  "/deviation?coin=bitcoin"
  "/deviation?coin=ethereum"
  "/deviation?coin=matic-network"
  )


for endpoint in "${endpoints[@]}"; do
  status=$(curl -o /dev/null -s -w "%{http_code}" http://127.0.0.1:3000/api"$endpoint")
  
  if [ "$status" -eq 200 ]; then
    echo "✔ $endpoint returned 200"
  else
    echo "✗ $endpoint returned $status"
  fi
done