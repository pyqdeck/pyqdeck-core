---
title: Semesters API
description: "Endpoints for managing semesters"
---

## Overview

Manage academic semesters under a branch.

## Endpoints

### List Semesters

`GET /semesters`

- **Query Parameters**:
  - `branchId`: Filter by branch

### Create Semester

`POST /semesters`

- **Auth**: Required (`admin` or `editor`)

### Update Semester

`PATCH /semesters/:id`

- **Auth**: Required (`admin` or `editor`)

### Delete Semester

`DELETE /semesters/:id`

- **Auth**: Required (`admin`)
