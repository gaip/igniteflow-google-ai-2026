#!/bin/bash

# Configuration
PROJECT_ID=$(gcloud config get-value project)
APP_NAME="igniteflow-portfolio"
REGION="us-central1"

echo "Deploying $APP_NAME to project $PROJECT_ID in $REGION..."

# Retrieve API Key from local environment or prompt
if [ -z "$GEMINI_API_KEY" ]; then
  echo "Error: GEMINI_API_KEY is not set. Please export it or add it to your .env file."
  exit 1
fi

# Build and Deploy
gcloud run deploy $APP_NAME \
  --source . \
  --project $PROJECT_ID \
  --region $REGION \
  --allow-unauthenticated \
  --set-env-vars GEMINI_API_KEY=$GEMINI_API_KEY \
  --build-arg GEMINI_API_KEY=$GEMINI_API_KEY

echo "Deployment complete!"
