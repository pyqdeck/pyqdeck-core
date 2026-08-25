---
title: Monorepo Architecture
description: "Understanding the PyqDeck monorepo structure and design decisions"
---

## Overview

PyqDeck is a **pnpm monorepo** containing two independent packages: `backend` and `frontend`. Each package has its own `package.json`, dependencies, and scripts, but they share a common root for tooling and CI.

```
pyqdeck/
├── backend/              # Express.js API server
├── frontend/             # Next.js 15 application
├── docs/                 # Mintlify documentation
├── .github/workflows/    # CI/CD pipelines
├── render.yaml           # Render deployment config
├── pnpm-workspace.yaml   # Monorepo configuration
└── package.json          # Root package.json
```

## Design Principles

1. **Independent Deployability**: Each package can be built and deployed independently.
2. **Clear Boundaries**: The only coupling is the API contract (`openapi.json`).
3. **Shared Tooling**: Root-level scripts for linting, formatting, and CI.

## API Contract: The Only Coupling

The **only** dependency between frontend and backend is the OpenAPI spec:

```
backend/openapi.json  →  frontend/src/lib/api-generated.ts
```

This is enforced in CI to prevent API drift. For more details, see the [SDK Flow](/workflows/sdk-flow).

## Deployment Targets

| Package           | Platform     | Method                     |
| ----------------- | ------------ | -------------------------- |
| **Backend**       | Render       | Docker (multi-stage build) |
| **Frontend**      | Vercel       | Vercel GitHub integration  |
| **Storybook**     | GitHub Pages | GitHub Actions             |
| **Documentation** | Mintlify     | GitHub Actions             |

## Key Directories

- `backend/src/`: The Express.js source code.
- `frontend/src/`: The Next.js source code.
- `.github/workflows/`: CI/CD automation.
- `docs/`: This Wiki documentation.
