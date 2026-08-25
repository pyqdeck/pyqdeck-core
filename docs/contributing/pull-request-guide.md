---
title: Contributing Guide
description: "How to contribute to the PyqDeck project"
---

## Process

1. **Find an Issue**: Check the GitHub issues for tasks.
2. **Create a Branch**: Create a new branch for your work.
3. **Commit Changes**: Make your changes and commit them with descriptive messages.
4. **Push & PR**: Push your branch to GitHub and open a Pull Request against the `main` branch.
5. **Review**: Address feedback from reviewers.
6. **Merge**: Once approved and CI passes, your PR will be merged.

## Branch Naming Conventions

We use specific prefixes for branch names:

- `feat/`: For new features (e.g., `feat/add-university-search`)
- `fix/`: For bug fixes (e.g., `fix/user-sync-retry`)
- `docs/`: For documentation changes (e.g., `docs/expand-api-ref`)
- `refactor/`: For code refactoring without behavior changes.

## Commit Message Conventions

We follow **Conventional Commits**:

- `feat: ...`
- `fix: ...`
- `docs: ...`
- `style: ...`
- `refactor: ...`
- `test: ...`
- `chore: ...`

## Code Review Checklist

Before submitting a PR, ensure:

- [ ] Code is formatted with Prettier (`pnpm format`).
- [ ] Code passes linting (`pnpm lint`).
- [ ] New code has corresponding unit or integration tests.
- [ ] All existing tests pass.
- [ ] Documentation is updated (if applicable).
- [ ] Commit messages are descriptive and follow conventions.

## PR Process

- **Draft PRs**: If your work is still in progress, open a Draft PR to get early feedback.
- **Labels**: Add appropriate labels (e.g., `frontend`, `backend`, `bug`).
- **Description**: Provide a clear summary of your changes and link to the relevant issue.
