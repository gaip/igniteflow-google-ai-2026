#!/bin/bash

# Configuration
PROJECT_ID=$(gcloud config get-value project)
APP_NAME="igniteflow-portfolio-2026"
REGION="us-central1"

echo "Deploying $APP_NAME to project $PROJECT_ID in $REGION..."

# Retrieve API Key from local environment or prompt
if [ -f .env.local ]; then
  # Load env vars from .env.local, ignoring comments and empty lines
  export $(grep -v '^#' .env.local | xargs)
fi

if [ -z "$GEMINI_API_KEY" ]; then
  echo "Error: GEMINI_API_KEY is not set. Please export it or add it to your .env file."
  exit 1
fi

# Build the image using Cloud Build
echo "Building container image..."
gcloud builds submit --config cloudbuild.yaml \
  --project $PROJECT_ID \
  --substitutions=_GEMINI_API_KEY="$GEMINI_API_KEY",_APP_NAME="$APP_NAME" .

# Deploy the image to Cloud Run
echo "Deploying to Cloud Run..."
gcloud run deploy $APP_NAME \
  --image us-central1-docker.pkg.dev/$PROJECT_ID/igniteflow-repo/$APP_NAME \
  --project $PROJECT_ID \
  --region $REGION \
  --allow-unauthenticated \
  --set-env-vars GEMINI_API_KEY=$GEMINI_API_KEY
