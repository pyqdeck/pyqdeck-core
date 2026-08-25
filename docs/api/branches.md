---
title: Branches API
description: "Endpoints for managing academic branches"
---

## Overview

Manage branches (departments) within a university.

## Endpoints

### List Branches

`GET /branches`

- **Query Parameters**:
  - `universityId`: Filter by university
  - `search`: Filter by name

### Create Branch

`POST /branches`

- **Auth**: Required (`admin` or `editor`)

### Update Branch

`PATCH /branches/:id`

- **Auth**: Required (`admin` or `editor`)

### Delete Branch

`DELETE /branches/:id`

- **Auth**: Required (`admin`)
