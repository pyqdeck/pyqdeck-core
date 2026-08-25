---
title: Users API
description: "Detailed documentation for managing user profiles and roles"
---

## Overview

The Users API allows management of user profiles and role-based access control.

## Endpoints

### Get Current User

Retrieves the profile of the currently authenticated user.

- **Route**: `GET /users/me`
- **Authentication**: Required
- **Headers**:
  - `Authorization: Bearer <clerk_jwt_token>`

**Response (200 OK):**

```json
{
  "status": "success",
  "data": {
    "id": "...",
    "clerkId": "user_...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "normal"
  }
}
```

### List Users

Retrieves a paginated list of all users.

- **Route**: `GET /users`
- **Authentication**: Required (`admin`)
- **Query Parameters**:
  - `role`: Filter by role (`admin`, `editor`, `normal`)
  - `search`: Search by name or email
  - `page`: Page number
  - `limit`: Items per page

### Update User Role

Updates a user's role or active status.

- **Route**: `PATCH /users/:clerkId`
- **Authentication**: Required (`admin`)
- **Request Body**:

```json
{
  "role": "editor",
  "isActive": true
}
```

## Error Responses

| Status Code | Description                             |
| ----------- | --------------------------------------- |
| 401         | Unauthorized - Missing or invalid token |
| 403         | Forbidden - Admin access required       |
| 404         | Not Found - User not found              |
