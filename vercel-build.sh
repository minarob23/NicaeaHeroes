#!/bin/bash

echo "Building for Vercel deployment..."

# Build the client
echo "Building client..."
npx vite build

# Copy necessary files for serverless functions
echo "Preparing serverless functions..."
mkdir -p api/server
mkdir -p api/shared

# Copy server files to api directory for serverless functions
cp -r server/* api/server/
cp -r shared/* api/shared/

echo "Vercel build complete!"