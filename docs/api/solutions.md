---
title: Solutions API
description: "Endpoints for managing question solutions"
---

## Overview

Access and contribute to question solutions.

## Endpoints

### List Solutions

`GET /solutions`

- **Query Parameters**:
  - `questionId`: Filter by question

### Create Solution

`POST /solutions`

- **Auth**: Required

### Vote on Solution

`PATCH /solutions/:id/vote`

- **Auth**: Required
