# ContentHub — Modern Content Platform

A production-quality content platform built with Next.js 16 App Router, demonstrating advanced frontend architecture patterns, server/client composition, and modern React patterns.

## 🚀 Quick Start

### Prerequisites

- **Node.js 18+** (required for Next.js 16)
- **pnpm** (recommended) or npm/yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd content-hub-next
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` and set:

   ```env
   NEXT_PUBLIC_API_BASE_URL=https://jsonplaceholder.typicode.com
   ```

4. **Start the development server**

   ```bash
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### First-Time Setup

After starting the dev server:

1. Navigate to `/login`
2. Use any email/password combination (mock authentication)
3. You'll be redirected to the dashboard
4. Explore posts, create/edit/delete functionality

## 📋 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier
- `pnpm format:check` - Check code formatting without changes

## 🏗️ Architecture Overview

### Design Philosophy

ContentHub follows a **server-first, feature-based architecture** that prioritizes:

- **Clarity over complexity** - Explicit patterns, minimal abstractions
- **Separation of concerns** - Clear boundaries between server/client, features, and utilities
- **Type safety** - TypeScript strict mode throughout
- **Scalability** - Feature-based organization that scales with team size

### Directory Structure

```
content-hub-next/
├── actions/          # Server Actions (Next.js 16)
│   ├── auth.ts      # Authentication operations
│   ├── posts.ts     # Post CRUD operations
│   ├── comments.ts  # Comment operations
│   └── users.ts     # User operations
│
├── app/              # Next.js App Router
│   ├── (public)/    # Public route group
│   │   └── login/   # Login page
│   └── (protected)/ # Protected route group
│       └── dashboard/
│           ├── @modal/  # Parallel route for modals
│           └── posts/   # Posts feature routes
│
├── components/       # Reusable UI components
│   ├── partials/    # Layout components (sidebar, header)
│   └── ui/          # shadcn/ui components
│
├── features/         # Feature-based modules
│   ├── auth/        # Authentication feature
│   │   ├── store.ts # Zustand auth store
│   │   ├── types.ts # Auth types
│   │   └── ui/      # Auth UI components
│   └── posts/       # Posts feature
│       ├── types.ts # Post types
│       ├── queries.ts # TanStack Query hooks
│       ├── mutations.ts # TanStack Query mutations
│       ├── schema.ts # Validation schemas
│       └── ui/      # Posts UI components
│
├── hooks/           # Custom React hooks
├── lib/             # Shared utilities
│   ├── api/         # API client & utilities
│   ├── auth/        # Auth utilities (cookies)
│   ├── query/       # TanStack Query setup
│   ├── routes.ts    # Centralized route constants
│   └── utils.ts     # Common utilities
│
└── types/           # Shared TypeScript types
```

### Key Architectural Decisions

#### 1. Feature-Based Organization

**Why:** Features are self-contained modules that group related functionality together, making the codebase easier to navigate and scale.

**Structure:**

- Each feature has its own directory
- Features contain: `types.ts`, `queries.ts`, `mutations.ts`, `schema.ts`, `ui/`
- UI components are co-located with feature logic
- Barrel exports (`index.ts`) provide clean public APIs

**Benefits:**

- Clear ownership and boundaries
- Easy to find related code
- Simple to add new features
- Reduces coupling between features

#### 2. Server Actions Pattern

**Why:** Next.js 16 Server Actions provide a type-safe, server-side API without needing separate API routes.

**Implementation:**

- All Server Actions in `/actions` directory
- Consistent return types: `{ data }` or `{ error }`
- Reusable HTTP functions from `lib/api/axios.ts`
- Error handling via `lib/api/errors.ts`

**Benefits:**

- Type-safe end-to-end (client → server → API)
- No API route boilerplate
- Automatic request/response serialization
- Built-in security (CSRF protection)

#### 3. Centralized Query Key Management

**Why:** TanStack Query keys are centralized to ensure type-safe cache invalidation and prevent key collisions.

**Implementation:**

- All keys defined in `lib/query/keys.ts`
- Hierarchical key structure: `["posts", "list", params]`
- Type-safe key factories
- Single source of truth

**Benefits:**

- Prevents cache key collisions
- Type-safe invalidation
- Easy to understand cache structure
- Consistent key patterns

#### 4. Route Groups & Parallel Routes

**Why:** Next.js route groups enable logical organization without affecting URLs, and parallel routes enable advanced UI patterns like modals.

**Implementation:**

- `(public)` and `(protected)` route groups
- `@modal` parallel route for intercepting routes
- Intercepting routes `(.)` for modal navigation

**Benefits:**

- Clean URL structure
- Logical route organization
- Advanced navigation patterns (modals)
- Shared layouts per route group

#### 5. Server Components by Default

**Why:** Server Components reduce client bundle size and improve performance by defaulting to server-side rendering.

**Implementation:**

- All pages are Server Components by default
- Only add `"use client"` when interactivity is needed
- Server-side data prefetching with TanStack Query hydration

**Benefits:**

- Smaller client bundles
- Faster initial page loads
- Better SEO
- Reduced client-side JavaScript

## 🛠️ Technology Choices & Reasoning

### Core Framework

#### Next.js 16.1.4 (App Router)

**Why:** Next.js 16 App Router provides the most advanced React framework features with built-in support for Server Components, Server Actions, and advanced routing patterns.

**Key Features Used:**

- **App Router** - File-based routing with layouts
- **Server Components** - Default server-side rendering
- **Server Actions** - Type-safe server-side mutations
- **Route Groups** - Logical route organization
- **Parallel Routes** - Simultaneous route rendering
- **Intercepting Routes** - Modal navigation patterns
- **Streaming** - Progressive page rendering

### Language & Type Safety

#### TypeScript 5 (Strict Mode)

**Why:** Type safety catches errors at compile time, improves developer experience with autocomplete, and serves as inline documentation.

**Configuration:**

- Path aliases for clean imports (`@/*`)
- No `any` types (enforced via ESLint)

**Benefits:**

- Catch errors before runtime
- Better IDE support
- Self-documenting code
- Refactoring confidence

### State Management

#### Zustand (Client State)

**Why:** Zustand provides a simple, unopinionated state management solution without the boilerplate of Redux or Context API.

**Use Cases:**

- Authentication state (user, isAuthenticated)
- UI state that needs global access

**Why Not Context API:**

- Context API causes unnecessary re-renders
- Zustand is more performant and simpler
- Better TypeScript support

**Why Not Redux:**

- Too much boilerplate for this use case
- Zustand is simpler and more modern
- Better developer experience

#### TanStack Query (Server State)

**Why:** TanStack Query handles all server state concerns: caching, synchronization, background updates, and optimistic updates.

**Key Features Used:**

- Server-side prefetching and hydration
- Optimistic updates with rollback
- Automatic cache invalidation
- Background refetching

**Benefits:**

- Reduces boilerplate significantly
- Built-in caching and synchronization
- Excellent TypeScript support
- Optimistic updates out of the box

### Styling

#### Tailwind CSS 4

**Why:** Tailwind provides utility-first CSS that enables rapid UI development without leaving HTML/JSX.

**Configuration:**

- CSS variables for theming
- shadcn/ui integration
- Custom utilities via `lib/utils.ts`

**Benefits:**

- Rapid development
- Consistent design system
- Small production bundle (unused styles removed)
- No CSS naming conflicts

#### shadcn/ui

**Why:** shadcn/ui provides high-quality, accessible components that are copied into the project (not installed as dependencies), allowing full customization.

**Benefits:**

- Full control over component code
- Easy customization
- Accessible by default
- Built on Radix UI primitives

### Form Handling

#### react-hook-form + yup

**Why:** react-hook-form provides performant form state management, while yup provides powerful schema validation.

**Implementation:**

- `react-hook-form` for form state
- `yup` for validation schemas
- `@hookform/resolvers` for integration

**Benefits:**

- Minimal re-renders
- Powerful validation
- Type-safe schemas
- Good developer experience

### HTTP Client

#### Axios

**Why:** Axios provides a more feature-rich HTTP client than fetch, with interceptors, automatic JSON parsing, and better error handling.

**Implementation:**

- Centralized instance in `lib/api/axios.ts`
- Request/response interceptors
- Consistent error handling
- Reusable HTTP methods (`get`, `post`, `put`, `patch`, `del`)

**Why Not Fetch:**

- Fetch requires more boilerplate
- No interceptors (would need custom wrapper)
- Less convenient error handling

### Package Manager

#### pnpm

**Why:** pnpm is faster and more disk-efficient than npm/yarn, with better workspace support.

**Benefits:**

- Faster installs
- Disk space efficient (hard links)
- Better workspace support
- Strict dependency resolution

## 🔑 Key Implementation Details

### Authentication Flow

1. **Login Process:**
   - User submits login form (Client Component)
   - Form calls `loginAction` Server Action
   - Server Action calls API and sets HTTP-only cookie
   - Zustand store updated with user data
   - Redirect to dashboard

2. **Route Protection:**
   - Next.js proxy (`proxy.ts`) checks auth cookie on each request
   - Unauthenticated users redirected to `/login`
   - Authenticated users redirected away from `/login`
   - Cookie is single source of truth

3. **Session Management:**
   - Auth token stored in HTTP-only cookie (server-side only)
   - Zustand store holds user data (client-side)
   - Cookie persists across page refreshes
   - Logout clears both cookie and store

### Data Fetching Strategy

1. **Server-Side Prefetching:**
   - Server Components prefetch data using TanStack Query
   - Data dehydrated and passed to client
   - Client hydrates QueryClient with prefetched data
   - Zero loading states for initial render

2. **Client-Side Fetching:**
   - Client Components use TanStack Query hooks
   - Automatic background refetching
   - Optimistic updates for mutations
   - Cache invalidation on mutations

3. **Query Key Structure:**
   ```
   ["posts", "list", params]
   ["posts", "detail", id]
   ["posts", "detail", id, "comments"]
   ["posts", "user", userId]
   ```

### Error Handling

1. **Server Actions:**
   - Return `{ data }` or `{ error }` objects
   - Errors wrapped via `lib/api/errors.ts`
   - Consistent error format across all actions

2. **React Error Boundaries:**
   - `error.tsx` files catch component errors
   - User-friendly error messages
   - Recovery actions (retry, navigate back)

3. **Client-Side Errors:**
   - TanStack Query handles query errors
   - Toast notifications for user feedback
   - Console logging for debugging

### Optimistic Updates

1. **Implementation:**
   - Mutations use `onMutate` to update cache optimistically
   - `onError` rolls back on failure
   - `onSettled` invalidates queries (disabled for JSONPlaceholder)

2. **Why Disabled for JSONPlaceholder:**
   - JSONPlaceholder doesn't persist changes
   - Invalidating queries would refetch random data
   - Optimistic updates persist in cache instead

### Modal Navigation

1. **Intercepting Routes:**
   - `(.)[id]` pattern intercepts navigation to post detail
   - Opens modal instead of full page
   - Direct URL navigation shows full page

2. **Parallel Routes:**
   - `@modal` slot renders modal content
   - `default.tsx` renders `null` when no modal
   - Modal closes via `router.back()`

## 📚 Project Structure

See [`.cursor/rules/project-structure.mdc`](.cursor/rules/project-structure.mdc) for detailed documentation.

## 🎯 Key Features

### Authentication

- Mock authentication flow
- HTTP-only cookie-based session management
- Route protection via Next.js proxy
- Zustand store for client-side auth state

### Posts Management

- List posts with pagination (grid layout)
- View post details in modal or page
- Create, update, and delete posts
- Optimistic updates with TanStack Query
- Server-side prefetching and hydration

### Advanced Routing

- Route groups: `(public)` and `(protected)`
- Parallel routes for modals
- Intercepting routes for seamless navigation
- URL-driven state management

### Code Quality

- TypeScript strict mode
- ESLint with strict rules
- Prettier for code formatting
- Husky pre-commit hooks
- Error boundaries and loading states

## 🔐 Authentication

The application uses mock authentication for demonstration purposes:

- **Login**: Use any email/password combination
- **Session**: Stored in HTTP-only cookie
- **Protection**: Routes are protected via Next.js proxy

## 🧪 Development

### Code Quality Tools

- **ESLint**: Configured with Next.js rules and strict TypeScript rules
- **Prettier**: Automatic code formatting
- **Husky**: Pre-commit hooks for linting and formatting
- **TypeScript**: Strict mode enabled

### Error Handling

- Server Actions return `{ error }` objects
- Error boundaries catch React errors
- Toast notifications for user feedback
- Consistent error wrapping via `lib/api/errors.ts`

### Testing

Currently, the application uses manual testing. Future improvements may include:

- Unit tests for utilities
- Integration tests for features
- E2E tests for critical flows

## 🚢 Deployment

### Build for Production

```bash
pnpm build
```

### Environment Variables

Ensure all required environment variables are set in your deployment platform:

- `NEXT_PUBLIC_API_BASE_URL` - API base URL

### Recommended Platforms

- **Vercel**: Optimized for Next.js (recommended)
- **Netlify**: Good Next.js support
- **Self-hosted**: Any Node.js hosting platform

## 🤝 Contributing

1. Follow the project structure conventions
2. Use TypeScript strict mode
3. Run `pnpm lint` and `pnpm format` before committing
4. Follow the feature-based organization pattern
5. Comment only complex logic, architectural decisions, and non-obvious patterns

## 📝 License

This project is for demonstration purposes.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org) - React framework
- [shadcn/ui](https://ui.shadcn.com) - UI components
- [TanStack Query](https://tanstack.com/query) - Server state management
- [JSONPlaceholder](https://jsonplaceholder.typicode.com) - Fake REST API
