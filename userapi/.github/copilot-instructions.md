# Copilot Instructions for User API Web Application

## Project Overview
- Node.js REST API for user management, backed by Redis.
- Main entry: `src/index.js` (starts server, sets up routes).
- User logic: `src/controllers/user.js` (user creation, validation, DB interaction).
- Redis client: `src/dbClient.js` (handles Redis connection and commands).
- Configuration: `src/configure.js`, `conf/default.json` (environment, DB config).
- Routes: `src/routes/user.js` (maps HTTP endpoints to controller methods).
- Tests: `test/` (mirrors src structure, uses Mocha/Chai conventions).

## Key Patterns & Conventions
- All user data is stored in Redis using `hmset` with username as key.
- User creation checks for required fields (`username`, etc.) and returns errors via callback.
- Controllers use callbacks for async DB operations (no promises/async-await).
- Route handlers expect JSON input and respond with status/message objects.
- Test files are named after their target (e.g., `user.controller.js` tests `user.js`).
- Configuration is loaded from `conf/default.json` via `src/configure.js`.

## Developer Workflows
- **Install dependencies:** `npm install`
- **Start server:** `npm start` (runs on http://localhost:3000)
- **Run tests:** `npm test` (Mocha/Chai, covers controllers/routes)
- **Create user:** Send POST to `/user` with JSON body (see README for curl example)
- **Debug Redis:** Check `src/dbClient.js` for connection details; ensure Redis is running locally

## Integration Points
- Redis must be running and accessible (default config in `conf/default.json`).
- External requests (e.g., user creation) use JSON and standard REST verbs.
- No authentication or advanced error handling implemented; focus is on basic CRUD.

## Example: User Creation Flow
1. POST `/user` → `routes/user.js` → `controllers/user.js:create`
2. Validates input, stores user in Redis, returns status

## Tips for AI Agents
- Follow callback style for async DB operations.
- Mirror test structure when adding new features (add tests in `test/` with similar naming).
- Reference config via `configure.js` and `conf/default.json` for environment-specific logic.
- Keep responses consistent: `{ status: "success"|"error", msg: "..." }`
- Use existing patterns for error handling and validation as seen in `controllers/user.js`.

---
If any section is unclear or missing, please provide feedback for further refinement.
