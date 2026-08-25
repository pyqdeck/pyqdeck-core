---
title: Storybook Guide
description: "Documentation and workshop for PyqDeck UI components"
---

## Overview

PyqDeck uses **Storybook** to build, document, and test UI components in isolation. It serves as a living design system and a workshop for developers.

## Getting Started

To start the Storybook development server:

```bash
cd frontend
pnpm storybook
```

The server usually runs on `http://localhost:6006`.

## Creating Stories

Stories are defined in `{component}.stories.jsx` files, typically following the **3-file pattern**.

### Example Story Structure

```javascript
import { MyComponent } from "./my-component.view";

export default {
  title: "Components/MyComponent",
  component: MyComponent,
  // Use subcomponents for compound components
  subcomponents: { Item: MyComponentItem },
  parameters: {
    layout: "centered",
  },
};

export const Default = {
  args: {
    label: "Click me",
    variant: "primary",
  },
};

export const Loading = {
  args: {
    isLoading: true,
  },
};
```

## Best Practices

### 1. Interactive Controls

Always use `args` within your stories. This ensures that the Storybook **Controls panel** remains interactive, allowing designers and developers to tweak props in real-time.

### 2. Anonymous Default Exports

While ESLint might warn about `import/no-anonymous-default-export`, it is the **standard pattern** for Storybook configuration objects in this project.

### 3. Compound Components

For components with children (like Tabs, Accordions, or Menus), include the `subcomponents` property in the default export. This helps Storybook generate better documentation for the entire component family.

## Building for Production

To build Storybook as a static site:

```bash
cd frontend
pnpm build-storybook
```

The output will be in the `frontend/storybook-static` directory. This is automatically deployed to `storybook.pyqdeck.in` via CI/CD.
