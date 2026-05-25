# Frontend Documentation

This frontend is the active part of the UniHub project. It is a Vite + React + TypeScript application that implements the user experience, role-based routing, onboarding flow, and dashboard prototypes for the platform.

## Stack

- React 19
- TypeScript
- Vite
- Redux Toolkit
- React Router
- Tailwind CSS 4
- Radix UI
- React Hook Form
- Zod
- Recharts

## Scripts

```bash
npm install
npm run dev
npm run build
npm run lint
npm run preview
```

## Environment

Optional `frontend/.env`:

```env
VITE_API_BASE_URL=http://localhost:5000
```

The API base URL is consumed by `src/services/api/client.ts`. If it is omitted, API requests fall back to relative paths.

## Application Structure

### Providers and bootstrap

- Entry point: `src/main.tsx`
- Global providers:
  - Redux `Provider`
  - `AuthProvider`
  - `OnboardingProvider`
  - Radix `Theme`

### Routing

Routes are defined in `src/router/AppRouter.tsx`.

- Public routes:
  - `/`
  - `/login`
  - `/signup`
  - `/forgot-password`
  - `/forgot-password/verify-code`
  - `/forgot-password/reset`
- Onboarding routes:
  - `/track-selection`
  - `/schedule`
  - `/placement-intro`
  - `/placement-test`
  - `/result`
  - `/onboarding-complete`
  - `/dashboard`
- Protected role routes:
  - `/student/*`
  - `/instructor/*`
  - `/mentor/*`
  - `/admin/*`

### Guards

- `AuthGuard` blocks protected routes when no user exists in auth context.
- `RoleGuard` restricts routes by role.
- `OnboardingRouteGuard` enforces the multi-step onboarding sequence.

## Current Auth Behavior

Auth is still mocked.

- `AuthProvider` stores a `user` object in `localStorage`.
- `Login.tsx` currently logs in by role through a development-only selector.
- No real API request is made during login.
- No JWT is issued yet.

The API client is already prepared for real auth:

- It reads `access_token` from `localStorage`.
- It sends `Authorization: Bearer <token>` automatically.
- It exposes `apiGet`, `apiPost`, `apiPut`, `apiPatch`, and `apiDelete`.

## Onboarding Flow

The onboarding experience is managed by `src/features/onboarding/context/OnboardingContext.tsx`.

Current behavior:

- State is persisted in `localStorage` under `unihub:onboarding`.
- Placement questions are loaded from local mock data in `src/features/onboarding/data/questions.ts`.
- Test scoring is calculated on the client.
- Completion state is local only and not validated against a server.

### Tracks currently exposed in the UI

- Web Development
- AI and Data Science
- Mobile Development
- Cybersecurity

## Role Modules

### Student

- Dashboard
- Roadmap
- Sessions
- Study Room
- Analytics
- Assignments
- Quizzes
- Ranking
- Results
- Profile

### Instructor

Full documentation: [`src/features/instructor/README.md`](src/features/instructor/README.md)

| Section | Route | Summary |
|---------|-------|---------|
| Dashboard | `/instructor/dashboard` | Subject tabs, metrics, attendance, upcoming session (15 min join window) |
| My Courses | `/instructor/my-courses` | Upload lecture materials and quiz files (local mock) |
| Students | `/instructor/students`, `.../:studentId` | Roster with filters; profile with KPIs, chart, advisor notes |
| Grades | `/instructor/grades` | Tabbed quiz / assignment / project grading |
| Live Session | `/instructor/live-session` | Upcoming session, lectures, activity sidebar |

Architecture: thin `pages/` → domain `hooks/` → `data/*.mock.ts` → `components/` + `styles/*.css`. Layout: `InstructorLayout` → `AppShellLayout`.

### Mentor

Full documentation: [`src/features/mentor/README.md`](src/features/mentor/README.md)

| Section | Route | Summary |
|---------|-------|---------|
| Dashboard | `/mentor/dashboard` | Subject tabs, search, stats, student grid, risk/top widgets |
| My Students | `/mentor/my-students`, `.../:studentId` | Roster + profile (reuses instructor student UI) |
| My Sessions | `/mentor/my-sessions` | Study groups, logs, create session form |
| Chat | `/mentor/chat/:studentId` | 3-column chat; notes in `localStorage` |
| Progress | `/mentor/progress/:id` | Batch analytics table, filters, CSV export |

`CheckIns` page exists but is not routed yet. Architecture matches instructor; mentor adds `utils/chatStorage.ts` and larger `sessions.css`.

### Admin

- Dashboard
- User Management
- Students
- Sessions
- Courses
- Batches
- Feedback
- Settings

## Directory Guide

```text
src/
|-- components/        # Shared and UI components
|-- context/           # Auth and theme context
|-- features/          # Role-based feature modules
|-- guards/            # Route protection
|-- hooks/             # Shared hooks
|-- layouts/           # Layout shells per role
|-- pages/             # Shared public pages
|-- router/            # App routing
|-- services/          # API client
|-- store/             # Redux store
|-- styles/            # Global styles
|-- types/             # Shared types
`-- utils/             # Formatting and helper utilities
```

## Integration Notes

The frontend is ready to be connected to a backend, but these pieces still need implementation:

- Replace mock login with `POST /api/auth/login`
- Restore sessions with `GET /api/auth/me`
- Move placement test scoring to the backend
- Persist onboarding steps server-side
- Replace mock dashboard data with API-backed hooks and thunks

## Known Limitations

- Frontend-only prototype
- No server validation for auth or onboarding
- No automated tests are present in this repository
- Some data and dashboards still depend on mock objects
