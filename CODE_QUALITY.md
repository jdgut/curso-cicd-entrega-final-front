# Code Quality Tooling – Vue 3 + TypeScript

This project uses a standard JavaScript/TypeScript code‑quality toolchain equivalent to **flake8 + pylint + black** in Python.

The goal is to:

- Catch bugs early
- Enforce consistent style
- Keep code readable and maintainable
- Make quality checks reproducible locally and in CI

---

## Tools Installed

### 1. ESLint – Linting & Static Analysis

**Comparable to:** flake8 + pylint

**What it does**

- Finds syntax errors
- Detects unused variables/imports
- Enforces best practices
- Applies Vue‑specific and TypeScript‑specific rules

**Key packages**

- `eslint`
- `eslint-plugin-vue`
- `@typescript-eslint/parser`
- `@typescript-eslint/eslint-plugin`

ESLint analyzes:

- `.ts` files
- `.vue` Single File Components
- modern ES modules

---

### 2. Prettier – Code Formatting

**Comparable to:** black

**What it does**

- Automatically formats code
- Enforces consistent spacing, line length, quotes, commas
- Makes diffs smaller and reviews easier

**Key packages**

- `prettier`
- `eslint-plugin-prettier`
- `eslint-config-prettier`

Prettier **does not check logic** — only style.

---

### 3. vue-tsc – Type Checking

**Comparable to:** mypy

**What it does**

- Performs full TypeScript type checking
- Validates Vue props, emits, refs, and component types
- Finds type errors ESLint cannot

**Key package**

- `vue-tsc`

No files are generated (`--noEmit`).

---

## Available Commands

All important checks are exposed via `package.json` scripts.

### Lint code (check only)

```bash
npm run lint
```

---

Using These Tools in CI
A typical CI pipeline step should include all three checks.
Example (generic):
npm ci
npm run lint
npm run typecheck
npm run format -- --check
