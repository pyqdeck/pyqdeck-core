---
title: Backend Services
description: "Detailed look at the Service layer in the PyqDeck backend"
---

## Overview

The Service layer (`backend/src/services/`) is the heart of the PyqDeck backend. It contains the core business logic and orchestrates interactions between multiple repositories.

## Responsibilities

1. **Business Logic**: Implementing complex rules that span beyond simple CRUD operations.
2. **Orchestration**: Coordinating multiple repository calls within a single transaction (where applicable).
3. **Data Transformation**: Preparing data from repositories for the controller layer.
4. **Third-Party Integration**: Communicating with external services (e.g., Clerk, UploadThing, AI Providers).

## Core Services

### University & Academic Services

- **UniversityService**: Manages university lifecycle, including slug generation and branch orchestration.
- **SyllabusService**: Handles the complex hierarchical structure of modules and topics.

### Content Services

- **QuestionService**: Manages question bank, difficulty levels, and metadata analysis.
- **PaperService**: Handles paper uploads, status transitions (draft/published), and question mapping.
- **SolutionService**: Manages student and expert solutions, including voting and moderation logic.

### Infrastructure Services

- **MailService**: Handles transactional emails using standardized templates.
- **SearchService**: Provides global search functionality across universities, subjects, and questions.
- **AnalyticsService**: Tracks platform usage and content coverage metrics.

## Patterns and Best Practices

### Error Handling

Services should throw custom error classes from `backend/src/utils/errors/`.

```javascript
if (!university) {
  throw new NotFoundError("University not found");
}
```

### Dependency Injection

Services typically import repositories directly. In the future, this may evolve toward a more formal DI pattern.

### Separation from Controllers

Controllers should **never** contain business logic. They only handle request parsing and response formatting, delegating all heavy lifting to services.
