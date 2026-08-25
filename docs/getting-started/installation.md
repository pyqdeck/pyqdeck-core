---
title: Getting Started
description: "How to set up PyqDeck for local development"
---

## Prerequisites

- **Node.js**: v20 or higher
- **pnpm**: v8 or higher
- **MongoDB**: A local instance or a MongoDB Atlas connection string
- **Clerk Account**: For authentication

## Repository Structure

PyqDeck is a monorepo (though managed without a root workspace tool for now):

- `backend/`: Express.js API
- `frontend/`: Next.js Web App
- `docs/`: Mintlify documentation

## Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/pyqdeck/pyqdeck-monorepo.git
cd pyqdeck-monorepo
```

### 2. Backend Setup

```bash
cd backend
pnpm install
cp .env.example .env
```

Fill in your `.env` with:

- `MONGODB_URI`
- `CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`

Start the dev server:

```bash
pnpm dev
```

### 3. Frontend Setup

```bash
cd ../frontend
pnpm install
cp .env.example .env.local
```

Fill in your `.env.local` with:

- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1`

Start the dev server:

```bash
pnpm dev
```

## Seeding Data

To populate your local database with initial data:

```bash
cd backend
pnpm run db:seed
```

## Running Tests

### Backend

```bash
cd backend
pnpm test        # Run all tests
pnpm test:watch  # Run tests in watch mode
```

### Frontend

```bash
cd frontend
pnpm test        # Run Vitest tests
pnpm storybook   # Start Storybook for UI development
```

## Troubleshooting

- **CORS Errors**: Ensure `ALLOWED_ORIGINS` in `backend/.env` includes `http://localhost:3001` (or whatever port your frontend is running on).
- **Authentication**: If you see 401 errors, ensure your Clerk keys are correct and you are logged into the frontend.

For more details on authentication, see the [Authentication Guide](/api/authentication).
