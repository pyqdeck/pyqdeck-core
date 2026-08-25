---
title: Authentication
description: "Authentication and Authorization guide for the PyqDeck API"
---

## Overview

PyqDeck uses **Clerk** for user authentication and session management. To access protected endpoints, you must include a valid Clerk JWT token in your request headers.

## JWT Authentication

All protected routes require an `Authorization` header with a Bearer token.

### Header Format

```http
Authorization: Bearer <CLERK_JWT_TOKEN>
```

### Obtaining a Token

In the frontend, you can retrieve the current session token using Clerk's `getToken()` method:

```javascript
const { getToken } = useAuth();
const token = await getToken();
```

## User Provisioning

PyqDeck follows a **Lazy Provisioning** strategy. A user record is created in the PyqDeck database the first time a user makes an authenticated request to the API.

1. User authenticates via Clerk on the frontend.
2. Frontend sends the JWT to the Backend.
3. Backend verifies the JWT.
4. Backend checks if the user exists in MongoDB.
5. If not, it fetches user details from Clerk and creates a new local user record.

## Roles and Permissions

PyqDeck implements Role-Based Access Control (RBAC) with the following roles:

| Role     | Description                                                                    |
| -------- | ------------------------------------------------------------------------------ |
| `normal` | Standard user. Can view content, bookmark items, and submit solutions.         |
| `editor` | Can manage academic content (Universities, Subjects, Papers).                  |
| `admin`  | Full system access, including user role management and platform configuration. |

### Role Management

Roles are initially synced from Clerk's `public_metadata`. Admins can also update roles via the API or the Admin Studio.

## Authentication Errors

If authentication fails, the API returns a `401 Unauthorized` response:

```json
{
  "status": "error",
  "message": "Authentication required",
  "code": "UNAUTHORIZED",
  "statusCode": 401
}
```

If a user lacks the required role for an endpoint, the API returns a `403 Forbidden` response:

```json
{
  "status": "error",
  "message": "You do not have permission to perform this action",
  "code": "FORBIDDEN",
  "statusCode": 403
}
```
