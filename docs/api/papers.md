---
title: Papers API
description: "Endpoints for managing exam papers"
---

## Overview

Manage Previous Year Question (PYQ) papers.

## Endpoints

### List Papers

`GET /papers`

- **Query Parameters**:
  - `subjectOfferingId`: Filter by offering ID
  - `examYear`: Filter by exam year (e.g., 2023)
  - `examType`: Filter by exam type (e.g., end-term, mid-term)
  - `page`: Page number for pagination
  - `limit`: Number of items per page

### Get Paper by Slug

`GET /papers/:slug`

Retrieves a single paper by its unique slug.

### Create Paper

`POST /papers`

- **Auth**: Required (`admin` or `editor`)

### Update Paper

`PATCH /papers/:id`

- **Auth**: Required (`admin` or `editor`)

### Update Paper Status

`PATCH /papers/:id/status`

Approve or reject a paper.

- **Auth**: Required (`admin`)
- **Body**:
  - `status`: `draft`, `pending`, `approved`, or `rejected`

### Delete Paper

`DELETE /papers/:id`

- **Auth**: Required (`admin`)
