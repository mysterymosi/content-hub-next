# ContentHub — Modern Content Platform

A production-quality content platform built with Next.js 16 App Router, demonstrating advanced frontend architecture patterns, server/client composition, and modern React patterns.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm/yarn

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

## 📋 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier
- `pnpm format:check` - Check code formatting without changes

## 🏗️ Project Structure

```
content-hub-next/
├── actions/          # Server Actions (Next.js 16)
├── app/              # Next.js App Router routes
├── components/       # Reusable UI components
│   ├── partials/    # Layout components
│   └── ui/          # shadcn/ui components
├── features/        # Feature-based modules
│   ├── auth/        # Authentication feature
│   └── posts/       # Posts feature
├── hooks/           # Custom React hooks
├── lib/             # Shared utilities
│   ├── api/         # API client & utilities
│   ├── auth/        # Auth utilities
│   └── query/       # TanStack Query setup
└── types/           # Shared TypeScript types
```

See [`.cursor/rules/project-structure.mdc`](.cursor/rules/project-structure.mdc) for detailed documentation.

## 🛠️ Tech Stack

- **Framework**: Next.js 16.1.4 (App Router)
- **Language**: TypeScript 5 (strict mode)
- **UI**: React 19.2.3
- **Styling**: Tailwind CSS 4
- **Components**: shadcn/ui
- **State Management**:
  - Zustand (client state)
  - TanStack Query (server state)
- **Form Handling**: react-hook-form + yup
- **HTTP Client**: Axios
- **Notifications**: sonner
- **Package Manager**: pnpm

## 🎯 Key Features

### Authentication

- Mock authentication flow
- HTTP-only cookie-based session management
- Route protection via Next.js proxy
- Zustand store for client-side auth state

### Posts Management

- List posts with pagination
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

## 📚 Architecture Patterns

### Feature-Based Organization

Features are self-contained modules with:

- `types.ts` - TypeScript types
- `queries.ts` - TanStack Query hooks
- `mutations.ts` - TanStack Query mutations
- `schema.ts` - Validation schemas
- `ui/` - UI components

### Server Actions Pattern

Server Actions handle server-side operations:

- Located in `/actions` directory
- Return consistent `{ data }` or `{ error }` objects
- Use reusable HTTP functions from `lib/api/axios.ts`

### Query Key Management

All TanStack Query keys are centralized in `lib/query/keys.ts` for type-safe cache management.

## 🔐 Authentication

The application uses mock authentication for demonstration purposes:

- **Login**: Use any email/password combination
- **Session**: Stored in HTTP-only cookie
- **Protection**: Routes are protected via Next.js proxy

## 📖 Documentation

- [Project Structure](.cursor/rules/project-structure.mdc) - Directory structure and conventions
- [Tech Stack](.cursor/rules/tech-stack.mdc) - Technology versions and best practices
- [Implementation Phases](IMPLEMENTATION-PHASES.md) - Phased development plan
- [Implementation Requirements](IMPLEMENTATION.MD) - Detailed requirements

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
5. Add JSDoc comments for public APIs

## 📝 License

This project is for demonstration purposes.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org) - React framework
- [shadcn/ui](https://ui.shadcn.com) - UI components
- [TanStack Query](https://tanstack.com/query) - Server state management
- [JSONPlaceholder](https://jsonplaceholder.typicode.com) - Fake REST API
