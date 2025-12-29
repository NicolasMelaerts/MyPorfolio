#!/bin/bash

CONTAINER_NAME="mon-portfolio"

echo "🛑 Arrêt du site..."
docker stop $CONTAINER_NAME 2>/dev/null
docker rm $CONTAINER_NAME 2>/dev/null

echo "✅ Site arrêté."
