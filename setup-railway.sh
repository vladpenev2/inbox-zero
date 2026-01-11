#!/bin/bash

# =============================================================================
# Inbox Zero - Railway Setup Script
# Run this in your terminal (it requires interactive input)
# =============================================================================

set -e

cd "$(dirname "$0")"

echo "=============================================="
echo "  Inbox Zero - Railway Setup"
echo "=============================================="
echo ""

# Pre-generated secrets
AUTH_SECRET="853578da0471408f2031c8fd1744a84efaa4867a9f61bed21eb84f4458ad56b7"
EMAIL_ENCRYPT_SECRET="74b38d0eefd593e9963c675e6590504f3a7c3489459f432ada9f5748506728bb"
EMAIL_ENCRYPT_SALT="89808391a9eb3f6dc868ad93761f801c"
INTERNAL_API_KEY="4683355c10b47da55b85936c8a4935edd8d385148d247e5bec21e9466efbdedd"
API_KEY_SALT="4d47c1576790eb73dbaee7fd7b296f3fe1651d5333b5e10d13e2ad26a8610699"
CRON_SECRET="04c0c5b6f2be03c59861b5f536df1e60df917338bb521ffffe45d4fd4593a4fe"
UPSTASH_REDIS_TOKEN="4621e13e89fe3be0de5c122246170b6c4c851caa70bf5a2536405ae85c6a4e55"
GOOGLE_PUBSUB_VERIFICATION_TOKEN="81aa142a7aaa7f4fa9db45b9403b459b9707932fb270006e45b2ad9a7a17007a"

# Your credentials
GOOGLE_CLIENT_ID="442117447396-32bb13li3bcp5rv61f4llnnngqejgmp2.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="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"
OPENAI_API_KEY="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"

echo "Step 1: Adding PostgreSQL database..."
railway add -d postgres

echo ""
echo "Step 2: Adding Redis database..."
railway add -d redis

echo ""
echo "Step 3: Adding serverless-redis-http service..."
railway add -s serverless-redis-http -i hiett/serverless-redis-http:latest \
    -v "SRH_MODE=env" \
    -v "SRH_TOKEN=${UPSTASH_REDIS_TOKEN}"

echo ""
echo "Step 4: Adding web service from Docker image..."
railway add -s web -i ghcr.io/elie222/inbox-zero:latest

echo ""
echo "Step 5: Linking to web service to set variables..."
railway service link web

echo ""
echo "Step 6: Setting environment variables for web service..."
railway variables set \
    "AUTH_SECRET=${AUTH_SECRET}" \
    "EMAIL_ENCRYPT_SECRET=${EMAIL_ENCRYPT_SECRET}" \
    "EMAIL_ENCRYPT_SALT=${EMAIL_ENCRYPT_SALT}" \
    "INTERNAL_API_KEY=${INTERNAL_API_KEY}" \
    "API_KEY_SALT=${API_KEY_SALT}" \
    "CRON_SECRET=${CRON_SECRET}" \
    "UPSTASH_REDIS_TOKEN=${UPSTASH_REDIS_TOKEN}" \
    "GOOGLE_CLIENT_ID=${GOOGLE_CLIENT_ID}" \
    "GOOGLE_CLIENT_SECRET=${GOOGLE_CLIENT_SECRET}" \
    "GOOGLE_PUBSUB_TOPIC_NAME=projects/inbox-zero/topics/gmail-push" \
    "GOOGLE_PUBSUB_VERIFICATION_TOKEN=${GOOGLE_PUBSUB_VERIFICATION_TOKEN}" \
    "DEFAULT_LLM_PROVIDER=openai" \
    "DEFAULT_LLM_MODEL=gpt-4o" \
    "ECONOMY_LLM_PROVIDER=openai" \
    "ECONOMY_LLM_MODEL=gpt-4o-mini" \
    "OPENAI_API_KEY=${OPENAI_API_KEY}" \
    "NEXT_PUBLIC_BYPASS_PREMIUM_CHECKS=true" \
    "NEXT_PUBLIC_EMAIL_SEND_ENABLED=true"

echo ""
echo "=============================================="
echo "  Setup Complete!"
echo "=============================================="
echo ""
echo "Next steps:"
echo "1. Open Railway dashboard: https://railway.app/project"
echo "2. Connect the services:"
echo "   - serverless-redis-http needs REDIS connection from Redis service"
echo "   - web needs DATABASE_URL from Postgres"
echo "   - web needs UPSTASH_REDIS_URL pointing to serverless-redis-http"
echo "3. Generate a domain for the web service"
echo "4. Update NEXT_PUBLIC_BASE_URL with your domain"
echo "5. Update Google OAuth redirect URI"
echo ""
