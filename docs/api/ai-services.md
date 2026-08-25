---
title: AI Services
description: "Documentation for AI-powered features and configuration"
---

## Overview

PyqDeck integrates with various AI providers (OpenAI, Anthropic, etc.) to power features like automated solution generation, question tagging, and syllabus mapping.

## AI Configuration

The platform's AI settings are managed via the `PlatformConfig` entity.

### Configuration Parameters

- **enabled**: Boolean flag to enable/disable AI features globally.
- **provider**: The AI provider to use (`openai`, `anthropic`, `openai-compatible`).
- **model**: The specific model ID (e.g., `gpt-4o`, `claude-3-5-sonnet`).
- **apiKey**: The API key for the selected provider.
- **baseUrl**: Custom base URL for OpenAI-compatible providers.

## AI Endpoints

Currently, AI configuration is managed through the Platform Config API.

### Get AI Configuration

- **Route**: `GET /platform-config`
- **Authentication**: Required (`admin`)

### Update AI Configuration

- **Route**: `PATCH /platform-config`
- **Authentication**: Required (`admin`)
- **Request Body**:

```json
{
  "ai": {
    "enabled": true,
    "provider": "openai",
    "model": "gpt-4o",
    "apiKey": "sk-..."
  }
}
```

## AI Workflows

### 1. Automated Solution Generation

When a new question is added, the system can trigger an AI workflow to generate an initial solution draft. These solutions are tagged with `type: "AI"` and can be reviewed by editors.

### 2. Question Tagging & Analysis

AI is used to analyze question content to determine:

- **Difficulty**: Easy, Medium, Hard.
- **Bloom's Taxonomy**: Remembering, Understanding, Applying, etc.
- **Syllabus Mapping**: Associating the question with specific topics.
