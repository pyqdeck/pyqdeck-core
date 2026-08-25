---
title: State Management & Data Fetching
description: "How PyqDeck handles data flow between the frontend and backend"
---

## API Client

We use a generated TypeScript SDK based on the backend's OpenAPI specification. The source of truth is `frontend/src/lib/api-generated.ts`.

## Data Fetching Strategies

PyqDeck uses different strategies depending on where the data is needed:

### 1. Server-Side Fetching (Server Components)

Used for initial page loads in the Dashboard and Studio to improve performance and SEO.

- **Utility**: `getApiServer()` from `@/lib/api-server`.
- **Flow**:
  - Automatically extracts the Clerk token from the server-side session.
  - Injects the token into the `Authorization` header.
  - Fetches data directly during SSR.

### 2. Client-Side Fetching (Hooks)

Used for interactive components, forms, and updates after the initial page load.

- **Utility**: `useApi()` hook from `@/hooks/use-api`.
- **Flow**:
  - Uses Clerk's `getToken` to get a fresh JWT.
  - Memoizes the API client instance.
  - Returns an authenticated SDK instance.

## State Management

### Local State

We prefer **standard React hooks** (`useState`, `useReducer`) for component-level state.

### Server State (Caching)

- **Next.js Cache**: We leverage Next.js's built-in `fetch` cache and `revalidatePath`/`revalidateTag` for server-side data.
- **Client-Side**: For complex client-side caching, we are moving towards React Query or similar patterns, but currently rely on local state or parent-component state management.

### Global State (Context)

We use **React Context** sparingly for truly global data:

- `ThemeProvider`: Handles dark/light mode.
- Clerk's `ClerkProvider`: Manages authentication state.

## Mutations & Forms

We use **Server Actions** for data mutations when possible, or direct client-side calls to the `useApi()` instance for complex forms.

- **Validation**: Client-side validation is handled by `react-hook-form` and Zod (reusing schemas where possible).
- **Feedback**: Success/Error messages are displayed using `sonner` (toast notifications).
