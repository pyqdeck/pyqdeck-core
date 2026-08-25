---
title: Bookmarks API
description: "Endpoints for managing user bookmarks"
---

## Overview

Manage saved questions, papers, and solutions.

## Endpoints

### List Bookmarks

`GET /bookmarks`

- **Auth**: Required

### Toggle Bookmark

`POST /bookmarks/toggle`

- **Auth**: Required
- **Body**: `{ "targetId": "...", "targetType": "Question" | "Paper" | "Solution" }`
