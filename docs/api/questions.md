---
title: Questions API
description: "Endpoints for managing individual questions"
---

## Overview

Access and search the question bank.

## Endpoints

### List Questions

`GET /questions`

- **Query Parameters**:
  - `type`: Filter by question type (mcq, short, long, numerical, coding)
  - `difficulty`: Filter by difficulty (easy, medium, hard)
  - `isVerified`: Filter by verification status (true, false)
  - `page`: Page number for pagination
  - `limit`: Number of items per page

### Get Question by Slug

`GET /questions/slug/:slug`

Retrieves a single question by its unique slug.

### Get Question by ID

`GET /questions/:id`

Retrieves a single question by its unique ID.

### Create Question

`POST /questions`

- **Auth**: Required (`admin` or `editor`)

### Update Question

`PATCH /questions/:id`

- **Auth**: Required (`admin` or `editor`)

### Delete Question

`DELETE /questions/:id`

- **Auth**: Required (`admin`)
