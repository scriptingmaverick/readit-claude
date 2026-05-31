# Readit Claude

A Reddit-style clone scaffold using TypeScript, Express, and MongoDB.

> This repository contains the project scaffold and file structure only. Business logic and implementation still need to be added.

## Setup

1. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```
2. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```
3. Copy `backend/.env.example` to `backend/.env` and fill in the database URI.
4. Start the backend in development:
   ```bash
   cd backend
   npm run dev
   ```
5. Start the frontend in development from the `frontend` folder:
   ```bash
   cd frontend
   npm run dev
   ```

## Project structure

### Backend
- `backend/package.json` - backend dependencies and scripts
- `backend/tsconfig.json` - backend TypeScript configuration
- `backend/tsconfig.build.json` - backend build config
- `backend/.env.example` - backend environment example file
- `backend/src/server.ts` - app entry point
- `backend/src/app.ts` - Express application setup
- `backend/src/config/db.ts` - MongoDB connection
- `backend/src/models` - Mongoose models for posts and users
- `backend/src/routes` - API route definitions
- `backend/src/controllers` - request handlers
- `backend/src/utils` - helper utilities

### Frontend
- `frontend/package.json` - frontend dependencies and Vite scripts
- `frontend/tsconfig.json` - frontend TypeScript configuration
- `frontend/vite.config.ts` - Vite build configuration
- `frontend/index.html` - frontend HTML entry point
- `frontend/src/main.tsx` - React app bootstrap
- `frontend/src/App.tsx` - main React component scaffold
- `frontend/src/styles.css` - basic frontend styles
