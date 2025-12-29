#!/bin/bash

# Configuration
CONTAINER_NAME="mon-portfolio"
IMAGE_NAME="portfolio"
PORT="3001"

echo "🔄 Mise à jour du site..."

# 1. Rebuild the image
echo "🔨 Construction de la nouvelle version..."
docker build -t $IMAGE_NAME . || { echo "❌ Échec de la construction"; exit 1; }

# 2. Remove old container
echo "🗑️ Suppression de l'ancien conteneur..."
docker rm -f $CONTAINER_NAME 2>/dev/null

# 3. Start new container
echo "🚀 Démarrage du nouveau conteneur sur le port $PORT..."
docker run -d -p $PORT:3000 --name $CONTAINER_NAME $IMAGE_NAME

echo "✅ Site mis à jour et accessible sur http://localhost:$PORT"
