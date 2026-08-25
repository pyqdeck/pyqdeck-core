---
title: Subject Offerings API
description: "Endpoints for managing subject offerings"
---

## Overview

Manage subject offerings (instances of subjects for a specific term/regulation).

## Endpoints

### List Subject Offerings

`GET /subject-offerings`

- **Query Parameters**:
  - `universityId`
  - `branchId`
  - `semesterId`
  - `subjectId`

### Create Offering

`POST /subject-offerings`

- **Auth**: Required (`admin` or `editor`)

### Delete Offering

`DELETE /subject-offerings/:id`

- **Auth**: Required (`admin`)
