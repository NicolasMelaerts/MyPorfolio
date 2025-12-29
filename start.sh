#!/bin/bash

CONTAINER_NAME="mon-portfolio"
IMAGE_NAME="portfolio"
PORT="3001"

# Check if already running
if [ "$(docker ps -q -f name=$CONTAINER_NAME)" ]; then
    echo "⚠️ Le site tourne déjà !"
    exit 0
fi

# Remove if exists but stopped
docker rm $CONTAINER_NAME 2>/dev/null

echo "🚀 Démarrage du site..."
docker run -d -p $PORT:3000 --name $CONTAINER_NAME $IMAGE_NAME

echo "✅ Site accessible sur http://localhost:$PORT"
