# Pastebin-Lite

A simple, secure, and ephemeral pastebin application built with Next.js and Express.

## How to Run Locally

### Prerequisites
- Node.js (v18+)
- pnpm or npm

### Backend
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Start the server:
   ```bash
   pnpm dev
   ```
   The backend will run on `http://localhost:3001`.

### Frontend
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Start the development server:
   ```bash
   pnpm dev
   ```
   The application will be available at `http://localhost:3000`.

## API Endpoints

- `GET /api/healthz`: Health check.
- `POST /api/pastes`: Create a new paste.
- `GET /api/pastes/:id`: Retrieve a paste (view count reduced).
