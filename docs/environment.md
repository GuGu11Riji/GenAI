# Environment Variables Guide

## Required for Production

| Variable | Description |
|----------|-------------|
| DATABASE_URL | MySQL/TiDB connection string |
| JWT_SECRET | Session cookie signing secret (64+ chars) |
| BUILT_IN_FORGE_API_KEY | Manus LLM API key |
| BUILT_IN_FORGE_API_URL | Manus LLM API base URL |

## Auto-Injected on Manus Platform

DATABASE_URL, JWT_SECRET, BUILT_IN_FORGE_API_KEY, BUILT_IN_FORGE_API_URL,
VITE_APP_ID, OAUTH_SERVER_URL, VITE_OAUTH_PORTAL_URL, OWNER_OPEN_ID, OWNER_NAME

No manual configuration needed when deploying on Manus.
