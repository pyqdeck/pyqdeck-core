---
title: Universities API
description: "Detailed documentation for managing university profiles"
---

## Overview

The Universities API allows you to list, create, retrieve, update, and delete universities. Universities are the top-level entities in the academic hierarchy.

## Base Path

`/api/v1/universities`

## Endpoints

### List Universities

Retrieves a paginated list of all active universities.

- **Route**: `GET /universities`
- **Authentication**: None
- **Query Parameters**:
  - `page` (integer, default: 1): Page number.
  - `limit` (integer, default: 20): Items per page.
  - `search` (string): Filter by university name or short name.
  - `isActive` (string, enum: [true, all], default: true): Filter by active status.

**Example Request:**
<CodeGroup>

```bash cURL
curl -X GET "https://api.pyqdeck.in/api/v1/universities?page=1&limit=10"
```

```javascript fetch
fetch("https://api.pyqdeck.in/api/v1/universities?page=1&limit=10")
  .then((response) => response.json())
  .then((data) => console.log(data));
```

```javascript axios
axios
  .get("https://api.pyqdeck.in/api/v1/universities", {
    params: { page: 1, limit: 10 },
  })
  .then((response) => console.log(response.data));
```

</CodeGroup>

**Response (200 OK):**

```json
{
  "status": "success",
  "message": "Operation successful",
  "data": {
    "items": [
      {
        "id": "60d5f50c2f8fb814c8001744",
        "name": "University of Mumbai",
        "shortName": "MU",
        "slug": "university-of-mumbai",
        "state": "Maharashtra",
        "country": "India"
      }
    ],
    "pagination": {
      "total": 1,
      "limit": 10,
      "page": 1,
      "totalPages": 1
    }
  },
  "code": 200
}
```

### Get University by Slug

Retrieves a single university by its unique slug.

- **Route**: `GET /universities/:slug`
- **Authentication**: None

**Response (200 OK):**

```json
{
  "status": "success",
  "data": {
    "id": "60d5f50c2f8fb814c8001744",
    "name": "University of Mumbai",
    "slug": "university-of-mumbai",
    ...
  }
}
```

### Create University

Creates a new university profile.

- **Route**: `POST /universities`
- **Authentication**: Required (`admin`)
- **Headers**:
  - `Authorization: Bearer <clerk_jwt_token>`
- **Request Body**:

```json
{
  "name": "Delhi University",
  "shortName": "DU",
  "slug": "delhi-university",
  "state": "Delhi",
  "country": "India"
}
```

**Response (201 Created):**

```json
{
  "status": "success",
  "data": { "id": "...", "name": "Delhi University", ... }
}
```

### Update University

Updates an existing university.

- **Route**: `PATCH /universities/:id`
- **Authentication**: Required (`admin` or `editor`)
- **Headers**:
  - `Authorization: Bearer <clerk_jwt_token>`
- **Request Body**: Partial University object.

### Delete University

Soft-deletes a university.

- **Route**: `DELETE /universities/:id`
- **Authentication**: Required (`admin`)
- **Headers**:
  - `Authorization: Bearer <clerk_jwt_token>`

## Error Responses

| Status Code | Description                             |
| ----------- | --------------------------------------- |
| 400         | Bad Request - Invalid input data        |
| 401         | Unauthorized - Missing or invalid token |
| 403         | Forbidden - Insufficient permissions    |
| 404         | Not Found - University not found        |
