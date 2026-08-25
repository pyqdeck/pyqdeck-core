---
title: Subjects API
description: "Endpoints for managing the subject catalog"
---

## Overview

Manage the global catalog of academic subjects.

## Endpoints

### List Subjects

`GET /subjects`

- **Query Parameters**:
  - `page`: Page number for pagination
  - `limit`: Number of items per page

### Get Subject by Slug

`GET /subjects/:slug`

Retrieves a single subject by its unique slug.

### Create Subject

`POST /subjects`

- **Auth**: Required (`admin` or `editor`)

### Update Subject

`PATCH /subjects/:id`

- **Auth**: Required (`admin` or `editor`)

### Delete Subject

`DELETE /subjects/:id`

- **Auth**: Required (`admin`)
