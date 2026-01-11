#!/bin/bash

# =============================================================================
# Inbox Zero - Railway Deployment Script
# =============================================================================
# This script helps you deploy Inbox Zero to Railway with all required services
#
# Prerequisites:
#   1. Railway CLI installed: npm install -g @railway/cli
#   2. Logged in to Railway: railway login
#   3. Google OAuth credentials ready
#   4. LLM API key ready (OpenAI, Anthropic, etc.)
# =============================================================================

set -e

echo "=============================================="
echo "  Inbox Zero - Railway Deployment"
echo "=============================================="
echo ""

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "Error: Railway CLI not found. Install with: npm install -g @railway/cli"
    exit 1
fi

# Check if logged in
if ! railway whoami &> /dev/null; then
    echo "Please log in to Railway first: railway login"
    exit 1
fi

echo "Step 1: Creating new Railway project..."
railway init --name inbox-zero

echo ""
echo "Step 2: Adding PostgreSQL database..."
railway add --plugin postgresql

echo ""
echo "Step 3: Adding Redis..."
railway add --plugin redis

echo ""
echo "Step 4: Setting up environment variables..."
echo ""
echo "Please provide the following values:"
echo ""

# Collect required inputs
read -p "Google Client ID: " GOOGLE_CLIENT_ID
read -p "Google Client Secret: " GOOGLE_CLIENT_SECRET
read -p "Google PubSub Topic (e.g., projects/myproject/topics/inbox-zero): " GOOGLE_PUBSUB_TOPIC_NAME
echo ""
echo "LLM Provider Options: openai, anthropic, google"
read -p "LLM Provider [openai]: " LLM_PROVIDER
LLM_PROVIDER=${LLM_PROVIDER:-openai}

case $LLM_PROVIDER in
    openai)
        read -p "OpenAI API Key: " LLM_API_KEY
        LLM_MODEL="gpt-4o"
        ECONOMY_MODEL="gpt-4o-mini"
        API_KEY_VAR="OPENAI_API_KEY"
        ;;
    anthropic)
        read -p "Anthropic API Key: " LLM_API_KEY
        LLM_MODEL="claude-sonnet-4-5-20250929"
        ECONOMY_MODEL="claude-haiku-4-5-20251001"
        API_KEY_VAR="ANTHROPIC_API_KEY"
        ;;
    google)
        read -p "Google API Key: " LLM_API_KEY
        LLM_MODEL="gemini-2.0-flash"
        ECONOMY_MODEL="gemini-2.0-flash"
        API_KEY_VAR="GOOGLE_API_KEY"
        ;;
    *)
        echo "Unknown provider, defaulting to OpenAI"
        LLM_PROVIDER="openai"
        read -p "OpenAI API Key: " LLM_API_KEY
        LLM_MODEL="gpt-4o"
        ECONOMY_MODEL="gpt-4o-mini"
        API_KEY_VAR="OPENAI_API_KEY"
        ;;
esac

# Generate secrets
echo ""
echo "Generating secure secrets..."
AUTH_SECRET=$(openssl rand -hex 32)
EMAIL_ENCRYPT_SECRET=$(openssl rand -hex 32)
EMAIL_ENCRYPT_SALT=$(openssl rand -hex 16)
INTERNAL_API_KEY=$(openssl rand -hex 32)
API_KEY_SALT=$(openssl rand -hex 32)
CRON_SECRET=$(openssl rand -hex 32)
UPSTASH_REDIS_TOKEN=$(openssl rand -hex 32)
GOOGLE_PUBSUB_VERIFICATION_TOKEN=$(openssl rand -hex 32)

echo ""
echo "Step 5: Setting environment variables on Railway..."

railway variables set \
    AUTH_SECRET="$AUTH_SECRET" \
    EMAIL_ENCRYPT_SECRET="$EMAIL_ENCRYPT_SECRET" \
    EMAIL_ENCRYPT_SALT="$EMAIL_ENCRYPT_SALT" \
    INTERNAL_API_KEY="$INTERNAL_API_KEY" \
    API_KEY_SALT="$API_KEY_SALT" \
    CRON_SECRET="$CRON_SECRET" \
    UPSTASH_REDIS_TOKEN="$UPSTASH_REDIS_TOKEN" \
    GOOGLE_CLIENT_ID="$GOOGLE_CLIENT_ID" \
    GOOGLE_CLIENT_SECRET="$GOOGLE_CLIENT_SECRET" \
    GOOGLE_PUBSUB_TOPIC_NAME="$GOOGLE_PUBSUB_TOPIC_NAME" \
    GOOGLE_PUBSUB_VERIFICATION_TOKEN="$GOOGLE_PUBSUB_VERIFICATION_TOKEN" \
    DEFAULT_LLM_PROVIDER="$LLM_PROVIDER" \
    DEFAULT_LLM_MODEL="$LLM_MODEL" \
    ECONOMY_LLM_PROVIDER="$LLM_PROVIDER" \
    ECONOMY_LLM_MODEL="$ECONOMY_MODEL" \
    "$API_KEY_VAR"="$LLM_API_KEY" \
    NEXT_PUBLIC_BYPASS_PREMIUM_CHECKS="true" \
    NEXT_PUBLIC_EMAIL_SEND_ENABLED="true"

echo ""
echo "Step 6: Deploying the application..."
railway up --detach

echo ""
echo "=============================================="
echo "  Deployment Started!"
echo "=============================================="
echo ""
echo "Next steps:"
echo "1. Run 'railway open' to view your deployment"
echo "2. Wait for the build to complete (5-10 minutes)"
echo "3. Get your domain from Railway dashboard"
echo "4. Update Google OAuth redirect URI to:"
echo "   https://YOUR-DOMAIN/api/auth/callback/google"
echo ""
echo "Your generated secrets have been saved to Railway."
echo ""
