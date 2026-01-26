# ContentHub — Phased Implementation Plan

This document breaks down the ContentHub implementation into logical phases. Each phase builds upon the previous one, ensuring a solid foundation before adding complexity.

---

## Phase 1: Project Foundation & Setup

**Objective:** Set up the project structure, install dependencies, and configure tooling.

### Tasks

1. **Install Required Dependencies**
   - Install Zustand: `pnpm add zustand`
   - Install TanStack Query: `pnpm add @tanstack/react-query`
   - Install Axios: `pnpm add axios`
   - Install Prettier: `pnpm add -D prettier`
   - Install Husky: `pnpm add -D husky lint-staged`

2. **Configure Prettier**
   - Create `.prettierrc` and `.prettierignore`
   - Add format script to `package.json`

3. **Configure Husky & lint-staged**
   - Initialize Husky: `pnpm exec husky init`
   - Configure pre-commit hook to run lint-staged
   - Set up lint-staged to run ESLint and Prettier

4. **Create Base Folder Structure**

   ```
   components/
   features/
   lib/
   types/
   ```

5. **Set Up TypeScript Types**
   - Create `types/index.ts` with base types
   - Define API response types (Post, User, Comment)

### Deliverables

- ✅ All dependencies installed
- ✅ Prettier configured and working
- ✅ Husky pre-commit hooks working
- ✅ Base folder structure created
- ✅ TypeScript types defined

### Dependencies

- None (foundation phase)

---

## Phase 2: Core Infrastructure

**Objective:** Set up the API layer, query client, and core utilities.

### Tasks

1. **Create API Client**
   - Create `lib/api/axios.ts` with centralized Axios instance
   - Configure base URL: `https://jsonplaceholder.typicode.com`
   - Set up request/response interceptors
   - Handle error responses

2. **Create API Endpoints**
   - Create `lib/api/endpoints.ts`
   - Define endpoint functions for:
     - Posts: `getPosts()`, `getPost(id)`, `createPost()`, `updatePost()`, `deletePost()`
     - Users: `getUser(id)`
     - Comments: `getPostComments(postId)`

3. **Set Up TanStack Query**
   - Create `lib/query/queryClient.ts`
   - Configure QueryClient with default options
   - Create `lib/query/hydration.ts` for server-side prefetching
   - Set up QueryClientProvider in root layout

4. **Create Auth Cookie Utilities**
   - Create `lib/auth/cookies.ts`
   - Implement `getAuthToken()`, `setAuthToken()`, `removeAuthToken()`
   - Use HTTP-only cookies (server-side only)

5. **Create Base UI Components** (if using shadcn/ui)
   - Install shadcn/ui components: Button, Input, Card, etc.
   - Set up component library structure

### Deliverables

- ✅ Centralized Axios instance with interceptors
- ✅ All API endpoint functions defined
- ✅ TanStack Query configured and provider set up
- ✅ Cookie utilities for auth token management
- ✅ Base UI components available

### Dependencies

- Phase 1 (project setup)

---

## Phase 3: Authentication System

**Objective:** Implement authentication state management and types.

### Tasks

1. **Create Auth Types**
   - Create `features/auth/types.ts`
   - Define `User`, `LoginCredentials`, `AuthState` types

2. **Create Auth Store (Zustand)**
   - Create `features/auth/store.ts`
   - Implement auth store with:
     - `user` state
     - `isAuthenticated` computed
     - `login()` action (mock authentication)
     - `logout()` action
     - `checkAuth()` action (reads from cookie)

3. **Create Login API Function**
   - Add `login()` function to `lib/api/endpoints.ts`
   - Mock authentication (accept any email/password)
   - Return mock user data and token

4. **Test Auth Store**
   - Verify login/logout functionality
   - Verify cookie persistence

### Deliverables

- ✅ Auth types defined
- ✅ Zustand auth store implemented
- ✅ Login API function created
- ✅ Auth state persists via cookies

### Dependencies

- Phase 2 (API layer and cookie utilities)

---

## Phase 4: Route Structure & Layouts

**Objective:** Set up the App Router structure with route groups and layouts.

### Tasks

1. **Create Route Groups**
   - Create `app/(public)/` directory
   - Create `app/(protected)/` directory

2. **Create Root Layout**
   - Update `app/layout.tsx` with:
     - QueryClientProvider wrapper
     - Global styles
     - Metadata configuration

3. **Create Public Layout**
   - Create `app/(public)/layout.tsx`
   - Simple layout for public routes

4. **Create Protected Layout**
   - Create `app/(protected)/layout.tsx`
   - Dashboard-style layout
   - Navigation component (if needed)

5. **Create Dashboard Layout**
   - Create `app/(protected)/dashboard/layout.tsx`
   - Nested layout for dashboard routes
   - Sidebar/navigation structure

6. **Create Dashboard Home Page**
   - Create `app/(protected)/dashboard/page.tsx`
   - Simple dashboard landing page

### Deliverables

- ✅ Route groups `(public)` and `(protected)` created
- ✅ Root layout with QueryClientProvider
- ✅ Public layout component
- ✅ Protected dashboard layout component
- ✅ Dashboard home page accessible

### Dependencies

- Phase 2 (QueryClient setup)
- Phase 3 (Auth store for conditional rendering)

---

## Phase 5: Public Routes - Login Page

**Objective:** Implement the login page with authentication flow.

### Tasks

1. **Create Login Page**
   - Create `app/(public)/login/page.tsx`
   - Build login form component (Client Component)
   - Form fields: email, password
   - Form validation

2. **Implement Login Logic**
   - Connect form to auth store
   - Call login API on form submit
   - Set auth token in cookie
   - Update Zustand store
   - Redirect to dashboard on success
   - Show error messages on failure

3. **Create Login Form Component**
   - Extract form to `features/auth/login-form.tsx` (optional)
   - Use shadcn/ui components (Input, Button)

4. **Handle Already Authenticated Users**
   - Check auth state in login page
   - Redirect to dashboard if already logged in

### Deliverables

- ✅ Login page accessible at `/login`
- ✅ Login form with validation
- ✅ Authentication flow working
- ✅ Redirect to dashboard after login
- ✅ Already-authenticated users redirected away

### Dependencies

- Phase 3 (Auth store and login API)
- Phase 4 (Route structure)

---

## Phase 6: Protected Routes & Middleware

**Objective:** Implement route protection using Next.js middleware.

### Tasks

1. **Create Middleware**
   - Create `app/middleware.ts` (now called proxy.ts on the latest version of nextjs)
   - Implement route protection logic:
     - Check for auth cookie
     - Protect all `(protected)` routes
     - Redirect unauthenticated users to `/login`
     - Redirect authenticated users away from `/login`

2. **Configure Middleware Matcher**
   - Set up matcher to exclude static files and API routes
   - Only run on route changes

3. **Test Route Protection**
   - Verify unauthenticated users redirected to `/login`
   - Verify authenticated users can access protected routes
   - Verify authenticated users redirected away from `/login`

4. **Add Logout Functionality**
   - Create logout button/action
   - Clear auth cookie
   - Clear Zustand store
   - Redirect to login

### Deliverables

- ✅ Middleware protecting `(protected)` routes
- ✅ Unauthenticated users redirected to `/login`
- ✅ Authenticated users cannot access `/login`
- ✅ Logout functionality working

### Dependencies

- Phase 3 (Auth store and cookies)
- Phase 4 (Route structure)
- Phase 5 (Login page)

---

## Phase 7: Posts Feature - List & Detail

**Objective:** Implement posts listing and detail pages with data fetching.

### Tasks

1. **Create Posts Types**
   - Create `features/posts/types.ts`
   - Define `Post`, `Comment`, `CreatePostData`, `UpdatePostData` types

2. **Create Posts Queries**
   - Create `features/posts/queries.ts`
   - Implement query keys factory
   - Create queries:
     - `usePosts()` - list with pagination
     - `usePost(id)` - single post
     - `usePostComments(postId)` - post comments
     - `useUser(userId)` - user data

3. **Create Posts List Page**
   - Create `app/(protected)/dashboard/posts/page.tsx`
   - Implement posts list with:
     - Pagination (using search params)
     - Filters (optional)
     - Loading states
     - Error handling
   - Use Server Component for initial data prefetch

4. **Create Post Detail Page**
   - Create `app/(protected)/dashboard/posts/[id]/page.tsx`
   - Create `app/(protected)/dashboard/posts/[id]/loading.tsx`
   - Create `app/(protected)/dashboard/posts/[id]/error.tsx`
   - Compose post detail from:
     - Post data (Server Component)
     - Author data (Server Component)
     - Comments (Client Component with TanStack Query)

5. **Implement Server-Side Prefetching**
   - Prefetch post data in Server Component
   - Hydrate TanStack Query cache
   - Use `hydration.ts` utilities

6. **Add URL-Driven State**
   - Use search params for pagination
   - Use search params for filters (if implemented)

### Deliverables

- ✅ Posts types defined
- ✅ TanStack Query hooks for posts
- ✅ Posts list page with pagination
- ✅ Post detail page with loading/error states
- ✅ Server-side prefetching working
- ✅ URL-driven pagination

### Dependencies

- Phase 2 (API layer and TanStack Query)
- Phase 6 (Protected routes)

---

## Phase 8: Advanced Routing - Intercepting Routes & Modals

**Objective:** Implement intercepting routes to show post details in a modal.

### Tasks

1. **Create Intercepting Route**
   - Create `app/(protected)/dashboard/posts/@modal/(.)posts/[id]/page.tsx`
   - Create modal component for post details
   - Handle modal open/close state

2. **Implement Parallel Routes** (if needed)
   - Set up `@modal` slot in dashboard layout
   - Configure default.tsx for modal slot

3. **Create Modal Component**
   - Build reusable modal component
   - Display post details in modal
   - Handle navigation (back button, close button)
   - Preserve URL state

4. **Test Intercepting Route**
   - Verify clicking post opens modal
   - Verify direct URL navigation shows full page
   - Verify modal closes correctly
   - Verify browser back button works

### Deliverables

- ✅ Intercepting route configured
- ✅ Post details open in modal when navigating from list
- ✅ Direct URL shows full page (not modal)
- ✅ Modal navigation working correctly

### Dependencies

- Phase 7 (Posts feature)

---

## Phase 9: Mutations & Optimistic Updates

**Objective:** Implement create/edit post functionality with optimistic updates.

### Tasks

1. **Create Posts Mutations**
   - Create `features/posts/mutations.ts`
   - Implement mutations:
     - `useCreatePost()` - create new post
     - `useUpdatePost()` - update existing post
     - `useDeletePost()` - delete post

2. **Implement Optimistic Updates**
   - Add optimistic update logic to mutations
   - Implement rollback on error
   - Update query cache optimistically

3. **Create Post Form Component**
   - Create form for creating/editing posts
   - Form fields: title, body, userId
   - Form validation
   - Use mutations for submit

4. **Create Post Form Page**
   - Create `app/(protected)/dashboard/posts/new/page.tsx` (create)
   - Update `app/(protected)/dashboard/posts/[id]/edit/page.tsx` (edit)
   - Connect form to mutations

5. **Add Optimistic UI Feedback**
   - Show loading states during mutations
   - Show success/error toasts
   - Update list immediately (optimistic)

6. **Test Optimistic Updates**
   - Verify UI updates immediately
   - Verify rollback on error
   - Verify cache invalidation

### Deliverables

- ✅ Create post mutation with optimistic update
- ✅ Update post mutation with optimistic update
- ✅ Delete post mutation with optimistic update
- ✅ Post form pages (create/edit)
- ✅ Optimistic UI updates working
- ✅ Error rollback working

### Dependencies

- Phase 7 (Posts queries and pages)

---

## Phase 10: Code Quality & Tooling

**Objective:** Finalize code quality tools and ensure production readiness.

### Tasks

1. **Enhance ESLint Configuration**
   - Add strict rules
   - Enforce no `any` types
   - Add React-specific rules
   - Add Next.js-specific rules

2. **Set Up TypeScript Strict Mode**
   - Ensure strict mode is enabled
   - Fix any type errors
   - Add type coverage checks (optional)

3. **Add Error Boundaries**
   - Create error boundary components
   - Add error.tsx files where needed
   - Implement error recovery

4. **Add Loading States**
   - Ensure all routes have loading.tsx
   - Add skeleton loaders
   - Improve loading UX

5. **Optimize Performance**
   - Review bundle size
   - Add dynamic imports where appropriate
   - Optimize images (if any)

6. **Add Documentation**
   - Document API functions
   - Add JSDoc comments
   - Update README with setup instructions

7. **Final Testing**
   - Test all user flows
   - Verify error handling
   - Test on different screen sizes
   - Verify accessibility (basic)

### Deliverables

- ✅ ESLint strict rules enforced
- ✅ TypeScript strict mode with no errors
- ✅ Error boundaries implemented
- ✅ Loading states throughout
- ✅ Performance optimizations
- ✅ Documentation complete
- ✅ All features tested and working

### Dependencies

- All previous phases

---

## Implementation Checklist

Use this checklist to track progress through each phase:

### Phase 1: Foundation

- [ ] Dependencies installed
- [ ] Prettier configured
- [ ] Husky configured
- [ ] Folder structure created
- [ ] Types defined

### Phase 2: Infrastructure

- [ ] API client set up
- [ ] API endpoints created
- [ ] TanStack Query configured
- [ ] Cookie utilities created
- [ ] UI components set up

### Phase 3: Authentication

- [ ] Auth types defined
- [ ] Auth store implemented
- [ ] Login API function created
- [ ] Auth tested

### Phase 4: Routes & Layouts

- [ ] Route groups created
- [ ] Root layout updated
- [ ] Public layout created
- [ ] Protected layout created
- [ ] Dashboard layout created
- [ ] Dashboard home page created

### Phase 5: Login Page

- [ ] Login page created
- [ ] Login form implemented
- [ ] Login logic connected
- [ ] Redirects working

### Phase 6: Middleware

- [ ] Middleware created
- [ ] Route protection working
- [ ] Logout functionality added

### Phase 7: Posts Feature

- [ ] Posts types defined
- [ ] Posts queries created
- [ ] Posts list page created
- [ ] Post detail page created
- [ ] Server prefetching working

### Phase 8: Advanced Routing

- [ ] Intercepting route created
- [ ] Modal component created
- [ ] Modal navigation working

### Phase 9: Mutations

- [ ] Mutations created
- [ ] Optimistic updates implemented
- [ ] Post form pages created
- [ ] Error handling tested

### Phase 10: Polish

- [ ] ESLint configured
- [ ] TypeScript strict
- [ ] Error boundaries added
- [ ] Loading states added
- [ ] Documentation complete

---

## Notes

- **Build incrementally:** Complete each phase fully before moving to the next
- **Test as you go:** Test each phase before proceeding
- **Follow architecture:** Maintain separation of concerns throughout
- **No shortcuts:** Don't skip phases or take shortcuts that violate the architecture
- **Server-first:** Default to Server Components, only use Client Components when needed

---

## Quick Reference

**Key Commands:**

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Run linter
pnpm lint

# Format code
pnpm format

# Build for production
pnpm build
```

**Key Files to Create:**

- `app/middleware.ts` - Route protection
- `lib/api/axios.ts` - API client
- `lib/query/queryClient.ts` - TanStack Query setup
- `features/auth/store.ts` - Auth state management
- `features/posts/queries.ts` - Posts data fetching
- `features/posts/mutations.ts` - Posts mutations
