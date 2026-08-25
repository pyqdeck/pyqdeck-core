---
title: Coding Standards
description: "Linguistic and architectural standards for the PyqDeck codebase"
---

## General Principles

- **Clarity over Cleverness**: Write code that is easy to read and understand.
- **Consistency**: Follow the established patterns in the codebase.
- **DRY (Don't Repeat Yourself)**: Extract shared logic into utilities or hooks.
- **Single Responsibility**: Each function or component should do one thing well.

## Backend Standards

- **Architecture**: Always follow the **5-layer pattern** (Routes -> Controllers -> Services -> Repositories -> Models).
- **Naming**:
  - Files: camelCase (e.g., `userController.js`).
  - Variables/Functions: camelCase.
  - Models: PascalCase (e.g., `User`).
- **Validation**: Every POST/PATCH route must have a Zod validation middleware.
- **Error Handling**: Use the custom error classes (`NotFoundError`, etc.) and the `catchAsync` wrapper.
- **Async/Await**: Prefer `async/await` over raw Promises or callbacks.

## Frontend Standards

- **Architecture**: Follow the **3-file pattern** for Studio components (.jsx, .view.jsx, .stories.jsx).
- **Naming**:
  - Files: kebab-case (e.g., `add-university-dialog.jsx`).
  - Components: PascalCase (e.g., `AddUniversityDialog`).
- **Styling**: Use Tailwind CSS and the `cn()` utility. Avoid arbitrary values where possible.
- **State**: Use Server Components for data fetching and local state for UI interactivity.
- **Hooks**: Prefix custom hooks with `use` (e.g., `useApi`).

## Tooling

- **Formatting**: **Prettier** is mandatory. Configure your editor to format on save.
- **Linting**: **ESLint** is used to catch common mistakes and enforce style rules.
- **Package Manager**: **pnpm** is the required package manager for all projects.

## Documentation

- **JSDoc**: Use JSDoc for complex functions and all backend routes (for OpenAPI generation).
- **Comments**: Explain _why_ something is done, not _what_ is being done (the code should be self-explanatory).
