# UniHub — Frontend Analysis

> Generated after reading every file in `features/`, `pages/`, `router/`, `context/`, `services/`, `store/`, `guards/`, `hooks/`, and `types/`.

---

## 1. Roles Found

There are **4 roles** defined in `src/types/global.types.ts`:

| Role | What it accesses |
|------|-----------------|
| `student` | Onboarding flow → personalized dashboard, roadmap, study hub, study room, exams, profile, individual subject pages |
| `instructor` | Instructor dashboard, my courses, student list, grades, quizzes, live sessions |
| `mentor` | Mentor dashboard, assigned students list, alerts, check-ins, student progress view |
| `admin` | Full platform overview — user management, student list, sessions, courses, batches, reports, feedback, settings |

---

## 2. Pages per Role

### Student (`/student/*`) — protected by `AuthGuard` + `RoleGuard(['student'])`

| Page Component | Route |
|---|---|
| `StudentDashboard` | `/student/dashboard` |
| `Roadmap` | `/student/roadmap` |
| `StudyHub` | `/student/study-hub` |
| `StudyRoom` | `/student/study-room/:id` |
| `Exams` | `/student/exams` |
| `StudentProfile` | `/student/profile` |
| `Subject` | `/student/subject/:id` |

### Instructor (`/instructor/*`) — protected by `AuthGuard` + `RoleGuard(['instructor'])`

| Page Component | Route |
|---|---|
| `InstructorDashboard` | `/instructor/dashboard` |
| `MyCourses` | `/instructor/my-courses` |
| `Students` | `/instructor/students` |
| `Grades` | `/instructor/grades` |
| `Quizzes` | `/instructor/quizzes` |
| `LiveSession` | `/instructor/live-session` |

### Mentor (`/mentor/*`) — protected by `AuthGuard` + `RoleGuard(['mentor'])`

| Page Component | Route |
|---|---|
| `MentorDashboard` | `/mentor/dashboard` |
| `MyStudents` | `/mentor/my-students` |
| `Alerts` | `/mentor/alerts` |
| `CheckIns` | `/mentor/check-ins` |
| `Progress` | `/mentor/progress/:id` |

### Admin (`/admin/*`) — protected by `AuthGuard` + `RoleGuard(['admin'])`

| Page Component | Route |
|---|---|
| `AdminDashboard` | `/admin/dashboard` |
| `Users` | `/admin/users` |
| `AdminStudents` | `/admin/students` |
| `Sessions` | `/admin/sessions` |
| `Batches` | `/admin/batches` |
| `Courses` | `/admin/courses` |
| `Reports` | `/admin/reports` |
| `Feedback` | `/admin/feedback` |
| `Settings` | `/admin/settings` |

### Onboarding flow (guarded by `OnboardingRouteGuard`)

| Page | Route | Guard step |
|---|---|---|
| `Register` | `/signup` | public |
| `TrackSelection` | `/track-selection` | requires `user` in onboarding state |
| `ScheduleSetup` | `/schedule` | requires `selectedTrack` |
| `TestIntro` | `/placement-intro` | requires `schedule` |
| `ActiveTest` | `/placement-test` | requires `testQuestions.length > 0` |
| `TestResult` | `/result` | requires `result` |
| `FinalWelcome` | `/onboarding-complete` | requires `result` |
| `OnboardingDashboard` | `/dashboard` | requires `completed === true` |

---

## 3. Auth Flow Found in Frontend

### How login currently works — 100% mock, no real API

- `Login.tsx` collects email + password, but **ignores both values entirely**
- It reads a `<select>` dropdown labelled "Dev Only: Role"
- On submit, calls `login(role)` from `AuthContext`
- `AuthProvider.login(role)` creates a **hardcoded fake user object**:
  ```ts
  { id: "1", name: "Test User", email: "test@unihub.com", role }
  ```
- No password comparison, no HTTP call, no token issued

### Where the token/user is stored

- The `user` object (not a JWT) is stored in `localStorage` under key `"user"` via `AuthProvider`
- `VITE_API_BASE_URL` env var drives the API client — when blank, calls relative paths
- The API client (`services/api/client.ts`) **is already wired to read a JWT** from `localStorage.getItem("access_token")` and send `Authorization: Bearer <token>` on every request — infrastructure is ready but unused
- Onboarding state lives separately in `localStorage` under `"unihub:onboarding"`

### How `AuthGuard` checks auth

```
AuthGuard → reads user from AuthContext → if user === null → redirect to /login
```
No `GET /me` call, no token validation — purely checks whether the JS object is in memory.

### How `RoleGuard` checks role

```
RoleGuard({ allowedRoles }) → reads user.role from AuthContext
  → if role not in allowedRoles → redirect to /unauthorized (NOT /404)
  → otherwise → render Outlet
```

---

## 4. Data Shapes Needed

### User object expected by frontend (`src/types/global.types.ts`)

```ts
interface User {
  id: string;      // maps to MongoDB _id (as string)
  name: string;
  email: string;
  role: 'student' | 'instructor' | 'mentor' | 'admin';
}
```

### Additional fields per role (returned from GET /api/auth/me)

| Role | Extra fields needed |
|---|---|
| `student` | `onboardingStep`, `trackId`, `level`, `batchId` |
| `instructor` | `assignedBatches[]` |
| `mentor` | `assignedBatches[]` |
| `admin` | _(none)_ |

### What the JWT payload must contain

```ts
{
  userId: string;        // MongoDB _id of User document
  role: Role;            // 'student' | 'instructor' | 'mentor' | 'admin'
  studentId?: string;    // MongoDB _id of Student document (students only)
  iat: number;
  exp: number;
}
```

Token key in localStorage: **`"access_token"`** (already wired in `client.ts`).

---

## 5. API Calls Needed

The API client (`services/api/client.ts`) is **fully built** with `apiGet`, `apiPost`, `apiPut`, `apiPatch`, `apiDelete`. No actual API calls exist yet in the codebase — everything uses mock/context data.

### Auth

| Method | Endpoint | Request Body | Expected Response |
|---|---|---|---|
| `POST` | `/api/auth/register` | `{ name, email, password }` | `{ token, user: { id, name, email, role, onboardingStep } }` |
| `POST` | `/api/auth/login` | `{ email, password }` | `{ token, user: { id, name, email, role, onboardingStep } }` |
| `GET` | `/api/auth/me` | _(Bearer token)_ | `{ user }` — full user + role-specific profile |

### Onboarding (Student only)

| Method | Endpoint | Request Body | Expected Response |
|---|---|---|---|
| `POST` | `/api/onboarding/track` | `{ trackId }` | `{ success: true, onboardingStep: 'schedule' }` |
| `POST` | `/api/onboarding/schedule` | `{ availableDays, preferredTime, weeklyGoalHours }` | `{ success: true, onboardingStep: 'test' }` |
| `GET` | `/api/onboarding/test` | _(none)_ | `{ questions: [{ _id, text, options: [{label, text}], phase, category }] }` |
| `POST` | `/api/onboarding/test/submit` | `{ answers: [{questionId, selected}], tabSwitches, duration }` | `{ score, level, onboardingStep: 'complete' }` |

### Student

| Method | Endpoint | Expected Response |
|---|---|---|
| `GET` | `/api/student/dashboard` | Study stats, streak, batch info, recent activity |
| `GET` | `/api/student/roadmap` | Ordered module list with completion status |
| `GET` | `/api/student/batch` | Batch metadata + classmates + schedule |

### Instructor

| Method | Endpoint | Expected Response |
|---|---|---|
| `GET` | `/api/instructor/dashboard` | Summary stats for all batches |
| `GET` | `/api/instructor/batches` | List of assigned batches |
| `GET` | `/api/instructor/batches/:batchId/students` | Student list for a batch |

### Mentor

| Method | Endpoint | Expected Response |
|---|---|---|
| `GET` | `/api/mentor/dashboard` | Overview of assigned students |
| `GET` | `/api/mentor/batches` | List of assigned batches |
| `GET` | `/api/mentor/alerts` | At-risk students, attendance flags |

### Admin

| Method | Endpoint | Request Body | Expected Response |
|---|---|---|---|
| `GET` | `/api/admin/dashboard` | — | Platform-wide stats |
| `GET` | `/api/admin/users` | — | Paginated user list |
| `POST` | `/api/admin/users` | `{ name, email, password, role }` | Created user (no password field) |
| `DELETE` | `/api/admin/users/:id` | — | `{ success: true }` |
| `GET` | `/api/admin/batches` | — | All batches |
| `POST` | `/api/admin/batches` | `{ name, trackId, instructorId, mentorId, level, semesterStart }` | Created batch |

---

## 6. Onboarding Flow Data

### Track Selection (`TrackSelection.tsx`)

Data collected:
```ts
{ id: 'web-development' | 'ai-data-science' | 'mobile-development' | 'cybersecurity', title: string }
```

The 4 tracks hardcoded in UI:
- **Web Development** — `web-development` — `HTML/CSS → JS → React → Node.js` — 16 weeks
- **AI & Data Science** — `ai-data-science` — `Python → Statistics → ML → Deep Learning` — 16 weeks
- **Mobile Development** — `mobile-development` — `Flutter → Dart → APIs → Deployment` — 16 weeks
- **Cybersecurity** — `cybersecurity` — `Networking → Linux → Ethical Hacking` — 16 weeks

---

### Schedule Setup (`ScheduleSetup.tsx`)

Data collected:
```ts
{
  days: string[],           // subset of ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']
  preferredTime: 'morning' | 'afternoon' | 'evening' | 'night',
  weeklyCommitment: 5 | 10 | 15 | 20   // hours per week
}
```
Backend field names (per SCHEMA.md): `availableDays`, `preferredTime`, `weeklyGoalHours`.

---

### Placement Test (`ActiveTest.tsx` + `OnboardingContext.tsx`)

Test configuration:
- 20 questions from `questions.ts` (all general/fundamentals in mock)
- Questions + answers shuffled on every `startPlacementTest()` call
- Timer: 30 minutes — auto-submits at 0

Question shape the frontend consumes:
```ts
{
  id: string;
  category: string;       // displayed as badge above the question
  prompt: string;         // the question text
  code?: string;          // optional code block (terminal-style display)
  answers: Array<{
    id: string;           // 'a' | 'b' | 'c' | 'd'
    text: string;
    isCorrect: boolean;   // MUST NOT be sent from backend to client
  }>;
}
```

Answers submitted:
```ts
testAnswers: Record<questionId, answerId>
// Example: { "q1": "b", "q3": "a", "q5": "c" }
```

Scoring logic (currently client-side — MUST move server-side):
```ts
const percentage = score / total;
if (percentage >= 0.75) return "Advanced";
if (percentage >= 0.45) return "Intermediate";
return "Beginner";
```

---

### Test Result Page (`TestResult.tsx`)

What it reads from context:
```ts
result: {
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  score: number;    // UI renders this as "{score} / 100" — see DISCREPANCY below
  total: number;
}
schedule: { days: string[]; preferredTime: string; weeklyCommitment: number; }
selectedTrack: { id: TrackId; title: string; }
```

**DISCREPANCY:** `TestResult.tsx` renders `{result.score} / 100` but `score` is currently raw correct count (0–20).
**Decision:** Backend should return a **normalized 0–100 score** to match the UI.

What the backend response must contain:
```json
{
  "score": 80,
  "level": "Advanced",
  "onboardingStep": "complete"
}
```

---

## Key Observations for Implementation

1. **API client is ready.** `services/api/client.ts` auto-attaches `Authorization: Bearer <access_token>`. Just store the JWT in `localStorage` key `"access_token"` on login.

2. **Two separate auth systems** need backend connections:
   - `AuthContext` / `AuthProvider` — main app session (replace `login(role)` with real `POST /api/auth/login`)
   - `OnboardingContext` — multi-step registration flow (each step POSTs to backend)

3. **`FinalWelcome.tsx` calls `login("student")`** with only a role string. After integration this must receive the full `User` object + JWT from the backend.

4. **`AuthGuard` has no token validation** — checks `user !== null` in memory only. After integration, `AuthProvider` must call `GET /api/auth/me` on mount to restore session from `access_token`.

5. **Score display bug** — backend should return a normalized 0–100 score to match the UI's `/ 100` display.

6. **`OnboardingRouteGuard` is fully client-side** — guards based on `localStorage` state. After integration, should validate against `onboardingStep` from `GET /api/auth/me`.
