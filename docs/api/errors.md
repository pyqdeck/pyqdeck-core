---
title: Error Handling
description: "Standard API error responses and codes"
---

## Error Response Format

All API errors follow a standard JSON format to make handling them on the client side consistent.

```json
{
  "status": "error",
  "message": "Detailed error message",
  "code": "ERROR_CODE",
  "statusCode": 400
}
```

## HTTP Status Codes

| Code | Type                  | Description                                         |
| ---- | --------------------- | --------------------------------------------------- |
| 400  | Bad Request           | The request was invalid or could not be understood. |
| 401  | Unauthorized          | Authentication is required and has failed.          |
| 403  | Forbidden             | You do not have the necessary permissions.          |
| 404  | Not Found             | The requested resource could not be found.          |
| 409  | Conflict              | Resource already exists or state conflict.          |
| 429  | Too Many Requests     | Rate limit exceeded.                                |
| 500  | Internal Server Error | An unexpected error occurred on the server.         |

## Common Error Codes

| Code                  | Description                                                |
| --------------------- | ---------------------------------------------------------- |
| `VALIDATION_ERROR`    | One or more request fields failed validation.              |
| `NOT_FOUND`           | The specific resource (e.g., University ID) was not found. |
| `ALREADY_EXISTS`      | A resource with the same unique identifier already exists. |
| `UNAUTHORIZED`        | Invalid or expired token.                                  |
| `FORBIDDEN`           | Insufficient role or permissions.                          |
| `RATE_LIMIT_EXCEEDED` | Too many requests in a short period.                       |

## Validation Errors

When a `VALIDATION_ERROR` occurs, the `message` field will often contain details about which fields failed and why.

```json
{
  "status": "error",
  "message": "Validation failed: 'email' is required, 'password' must be at least 8 characters",
  "code": "VALIDATION_ERROR",
  "statusCode": 400
}
```
