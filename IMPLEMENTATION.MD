# ContentHub — Modern Content Platform (Next.js App Router)

## Overview

ContentHub is a production-quality content platform built to demonstrate **advanced modern frontend architecture** using the Next.js App Router.

The goal of this project is **not feature breadth**, but clarity of thought, correctness, scalability, and clean separation of concerns. The application consumes the public JSONPlaceholder API and showcases best practices in server/client composition, state management, routing, and developer tooling.

> **Important architectural decision:**  
> This project intentionally **does NOT use a `src/` directory**.  
> The `app/` directory lives at the project root, and all domain code (`features`, `lib`, `components`, etc.) exists alongside it for clarity and discoverability.

---

## Tech Stack (Required)

- **Next.js (App Router)**
- **TypeScript**
- **Tailwind CSS**
- **State Management:** Zustand (no Context API)
- **Server State:** TanStack Query
- **HTTP Client:** Axios
- **Tooling:** ESLint, Prettier, Husky, lint-staged

---

## Core Concepts Demonstrated

### Advanced App Router Patterns

- Route Groups: `(public)` and `(protected)`
- Nested layouts for dashboard UI
- Route-level `loading.tsx`, `error.tsx`, and `not-found.tsx`
- Parallel Routes and Intercepting Routes (modal post viewer)
- URL-driven state using search params

### Server vs Client Components

- **Server Components**
  - Layouts and route composition
  - Data prefetching and streaming
  - Auth cookie access
- **Client Components**
  - Interactive UI
  - TanStack Query hooks
  - Mutations and optimistic updates

### Authentication & Route Protection

- Fake authentication (email/password)
- Auth token stored in HTTP-only cookie
- Global auth store using Zustand
- Middleware-based route protection with redirects
- Logged-in users cannot access `/login`

### Data Fetching & Caching

- Centralized Axios instance with interceptors
- TanStack Query for all server state
- Server-side prefetch + hydration
- Optimistic updates with rollback

---

## Application Features

### Public

- Login page (mock authentication)

### Protected (Dashboard)

- Posts list with pagination and filters
- Post detail page composed from:
  - Post data
  - Author data
  - Comments
- Intercepting route to open post details in a modal
- Create/Edit post with optimistic updates

---

## API

Data is fetched from:
https://jsonplaceholder.typicode.com

> Note: Mutations are mocked and handled optimistically.

---

## Folder Structure (NO `src/` DIRECTORY)

```
app/
  (public)/
    login/
      page.tsx
  (protected)/
    dashboard/
      layout.tsx
      page.tsx
      posts/
        page.tsx
        [id]/
          page.tsx
          loading.tsx
          error.tsx
  middleware.ts

components/
  ui/
  layout/

features/
  auth/
    store.ts
    types.ts
  posts/
    queries.ts
    mutations.ts
    types.ts

lib/
  api/
    axios.ts
    endpoints.ts
  query/
    queryClient.ts
    hydration.ts
  auth/
    cookies.ts

types/
  index.ts

styles/
  globals.css
```

---

## State Management Strategy

| Concern         | Solution         |
| --------------- | ---------------- |
| Server State    | TanStack Query   |
| Global UI State | Zustand          |
| Auth State      | Zustand + Cookie |
| URL State       | Search Params    |

---

## Middleware Behavior

- Protects all `(protected)` routes
- Redirects unauthenticated users to `/login`
- Redirects authenticated users away from `/login`
- Cookies are the single source of truth

---

## Code Quality & Tooling

- ESLint with strict rules
- Prettier for formatting
- Husky + lint-staged pre-commit hooks
- Type-safe API layer
- No `any`
- No React Context API

---

## Installation & Development

```bash
pnpm install
pnpm dev
```

---

## Design Philosophy

- Architecture over features
- Explicit over implicit
- Server-first, client only when needed
- Small surface area, strong foundations

---

## Notes for Reviewers

This project intentionally keeps the feature set minimal. Each feature exists to demonstrate a specific architectural decision or Next.js capability rather than product scope.
