---
title: API Reference Overview
description: "Documentation for the PyqDeck REST API"
---

## Overview

The PyqDeck API is a RESTful API built with Express.js. It is documented using **OpenAPI 3.0** and serves as the source of truth for the generated frontend SDK.

## Swagger UI

The live API documentation (Swagger UI) is available at:
`https://backend.pyqdeck.in/api-docs`

## SDK Generation Flow

We follow an **API-first** approach:

1. **Backend**: Routes are annotated with JSDoc `@swagger`.
2. **Export**: `pnpm run openapi:export` generates `backend/openapi.json`.
3. **Frontend**: `pnpm run gen:api` consumes `openapi.json` and generates `frontend/src/lib/api-generated.ts`.

For a deep-dive into this flow, see the [SDK Flow](/workflows/sdk-flow) documentation.

## Authentication

Most endpoints require authentication via Clerk.

- **Header**: `Authorization: Bearer <clerk_jwt_token>`
- **Internal Handling**: The `requireAuthentication` middleware validates the token.

## Main Resource Groups

| Group            | Description                                    |
| ---------------- | ---------------------------------------------- |
| **Universities** | Management of university entities.             |
| **Subjects**     | Academic subject catalog and offerings.        |
| **Papers**       | Question papers, years, and metadata.          |
| **Questions**    | Individual questions, types, and difficulties. |
| **Solutions**    | Step-by-step solutions for questions.          |
| **Users**        | User profiles and role management.             |
