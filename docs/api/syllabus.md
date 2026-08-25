---
title: Syllabus API
description: "Detailed documentation for managing academic syllabus structures"
---

## Overview

The Syllabus API manages the hierarchy of Modules and Topics for a given Subject Offering.

## Endpoints

### Get Syllabus

Retrieves the full syllabus hierarchy for a specific subject offering.

- **Route**: `GET /subject-offerings/:subjectOfferingId/syllabus`
- **Authentication**: None

**Response (200 OK):**

```json
{
  "status": "success",
  "data": {
    "id": "...",
    "subjectOfferingId": "...",
    "modules": [
      {
        "id": "...",
        "title": "Module 1: Introduction",
        "order": 1,
        "topics": [
          {
            "id": "...",
            "title": "Topic 1.1: Basic Concepts",
            "order": 1
          }
        ]
      }
    ]
  }
}
```

### Create Syllabus

Initializes a new syllabus for a subject offering.

- **Route**: `POST /syllabus`
- **Authentication**: Required (`admin` or `editor`)
- **Request Body**:

```json
{
  "subjectOfferingId": "..."
}
```

### Create Module

Adds a module to a syllabus.

- **Route**: `POST /modules`
- **Authentication**: Required (`admin` or `editor`)
- **Request Body**:

```json
{
  "syllabusId": "...",
  "title": "Module 1",
  "order": 1,
  "description": "..."
}
```

### Create Topic

Adds a topic to a module.

- **Route**: `POST /topics`
- **Authentication**: Required (`admin` or `editor`)
- **Request Body**:

```json
{
  "moduleId": "...",
  "title": "Topic 1.1",
  "order": 1,
  "description": "..."
}
```

### Get Questions for Module/Topic

- `GET /modules/:id/questions`
- `GET /topics/:id/questions`

Retrieves all questions mapped to a specific module or topic.
