---
title: Component Architecture
description: "Standard patterns for React components in the PyqDeck frontend"
---

## The 3-File Pattern

PyqDeck follows a strict separation of concerns for complex components, especially within the Studio. Most components are split into three files:

1. **`{component}.jsx` (Logic/Container)**: Handles state, data fetching (using `useApi`), and event handlers. It passes data and callbacks to the view.
2. **`{component}.view.jsx` (Pure View)**: A functional component that only cares about rendering UI. It receives all data and actions via props. This makes it easy to test and preview in isolation.
3. **`{component}.stories.jsx` (Storybook)**: Defines various states (Loading, Empty, Success, Error) for the view component to be visualized in Storybook.

### Benefits

- **Testability**: You can test UI logic without mocking API calls.
- **Speed**: Storybook allows developing UI components without running the entire app or backend.
- **Maintainability**: Clear separation between "how it works" and "how it looks".

## UI Primitives (shadcn/ui)

We use **shadcn/ui** for our base component library. These are accessible, unstyled components built on top of Radix UI and styled with Tailwind CSS.

- **Location**: `frontend/src/components/ui/`
- **Philosophy**: We "own" these components. They are copied into the codebase and can be customized as needed.
- **Consistency**: All high-level components should use these primitives (Button, Card, Input, etc.) to ensure a consistent look and feel.

### Radix UI 'asChild' Pattern

Our UI components utilize the **Radix UI Slot** primitive to implement the `asChild` prop pattern. This allows for flexible tag composition while maintaining styles and accessibility features.

When `asChild` is true, the component will not render its own default HTML tag but will instead clone its child and pass its props and styles to it.

```jsx
// Example: Using a Button as a Link
<Button asChild>
  <Link href="/dashboard">Go to Dashboard</Link>
</Button>
```

### Border Radius & 'data-slot'

To manage complex CSS variants and border-radius consistency in compound components, we use the `data-slot` attribute pattern. Components are tagged with attributes like `data-slot="button"`, allowing parent components to target them precisely via CSS selectors.

## Storybook Setup

Storybook is used as a workshop for building and documenting components in isolation.

- **Run locally**: `pnpm storybook` (from `frontend/` directory)
- **Deployment**: Storybook is automatically deployed to `storybook.pyqdeck.in` on every push to the main branch.
- **Visual Testing**: We use Storybook to verify component states across different themes and screen sizes.

## Design Patterns

- **Controlled Components**: Form inputs are generally controlled by React state or `react-hook-form`.
- **Skeleton Screens**: Use the `Skeleton` primitive from shadcn/ui to handle loading states gracefully.
- **Empty States**: Use the `Empty` component to provide feedback when no data is available.
- **Composition**: Prefer component composition (passing children) over complex prop drilling.
