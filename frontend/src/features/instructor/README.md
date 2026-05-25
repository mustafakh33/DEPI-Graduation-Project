# Instructor Feature — Full Documentation

The instructor portal lets course instructors monitor subjects, manage lecture materials, view student rosters and profiles, grade submissions, and run live sessions. It lives under `src/features/instructor/` and is wired through `InstructorLayout` in the app router.

---

## Table of contents

1. [Architecture](#architecture)
2. [How we built it](#how-we-built-it)
3. [Folder structure](#folder-structure)
4. [Routing and navigation](#routing-and-navigation)
5. [Section: Dashboard](#section-dashboard)
6. [Section: My Courses](#section-my-courses)
7. [Section: Students](#section-students)
8. [Section: Grades](#section-grades)
9. [Section: Live Session](#section-live-session)
10. [Hooks reference](#hooks-reference)
11. [Types and mock data](#types-and-mock-data)
12. [Styling](#styling)
13. [Cross-feature reuse](#cross-feature-reuse)
14. [Backend integration checklist](#backend-integration-checklist)

---

## Architecture

```text
AuthGuard
  └── RoleGuard (role === "instructor")
        └── InstructorLayout
              └── AppShellLayout (sidebar + header + <Outlet />)
                    └── Page (thin shell)
                          └── Hook (state + business logic)
                                └── data/*.mock.ts (today)
                          └── Components (presentation)
                          └── styles/*.css (feature-scoped)
```

**Design principles**

| Layer | Responsibility |
|-------|----------------|
| `pages/` | Route entry points; minimal JSX; import one hook + components |
| `hooks/` | Filtering, pagination, timers, local mutations |
| `components/` | Presentational UI; props only |
| `data/` | Mock datasets shaped like future API responses |
| `types/` | TypeScript contracts per domain |
| `config/navigation.ts` | Sidebar links and default dashboard path |

There is **no HTTP layer** inside this feature yet. Hooks read from `data/*.mock.ts` and keep state in React (`useState`, `useMemo`, `useCallback`, `useEffect`).

---

## How we built it

1. **Feature-first layout** — Everything for instructors stays in one folder so the module can be owned, tested, and later swapped to real APIs without touching student or mentor code.

2. **Thin pages, fat hooks** — Pages like `Students.tsx` only branch on URL params; list/profile logic lives in `useStudentsList` and `useStudentProfile`.

3. **Mocks mirror APIs** — Functions such as `getSubjectDashboard()` and `getStudentProfile()` return the same object shapes we expect from REST endpoints, so hook internals can later call `apiGet` with minimal changes.

4. **Shared shell** — `InstructorLayout` delegates sidebar, theme, and logout to `AppShellLayout`, same pattern as mentor and admin.

5. **Reusable pagination** — `useTablePagination` (page size **7**) is exported for the mentor feature’s student list and analytics table.

6. **Plain CSS per surface** — One stylesheet per major page (`instructorDashboard.css`, `students.css`, etc.) with BEM-like class names, plus Lucide/Material icons in components.

---

## Folder structure

```text
instructor/
├── config/
│   └── navigation.ts          # Sidebar + dashboardPath
├── pages/
│   ├── Dashboard.tsx          # InstructorDashboard
│   ├── MyCourses.tsx          # LectureMaterialsPage
│   ├── Students.tsx           # List OR profile via :studentId
│   ├── Grades.tsx             # GradingPage (tabbed)
│   └── LiveSession.tsx        # LiveSessionsPage
├── hooks/
│   ├── useInstructorDashboard.ts
│   ├── useStudentsList.ts
│   ├── useStudentProfile.ts
│   ├── useLectureMaterials.ts
│   ├── useLiveSessions.ts
│   ├── useQuizGrading.ts
│   ├── useAssignmentGrading.ts
│   ├── useProjectGrading.ts
│   └── useTablePagination.ts
├── types/
│   ├── instructorDashboard.types.ts
│   ├── students.types.ts
│   ├── grading.types.ts
│   ├── lectureMaterials.types.ts
│   └── liveSessions.types.ts
├── data/
│   ├── instructorDashboard.mock.ts
│   ├── students.mock.ts
│   ├── lectureMaterials.mock.ts
│   ├── grading.mock.ts
│   └── liveSessions.mock.ts
├── utils/
│   └── advisorNotes.ts
├── styles/
│   ├── instructorDashboard.css
│   ├── students.css
│   ├── LectureMaterials.css
│   ├── grading.css
│   └── liveSessions.css
└── components/
    ├── dashboard/       (7 components)
    ├── students/        (11 components)
    ├── courses/         (5 components)
    ├── grading/         (tabs, quiz, assignments, projects, shared)
    └── liveSessions/    (6 components)
```

---

## Routing and navigation

Registered in `src/router/AppRouter.tsx`:

| Path | Page | Purpose |
|------|------|---------|
| `/instructor/dashboard` | `Dashboard.tsx` | Subject overview, metrics, upcoming session |
| `/instructor/my-courses` | `MyCourses.tsx` | Upload lecture PDFs and quiz files |
| `/instructor/students` | `Students.tsx` | Filterable student roster |
| `/instructor/students/:studentId` | `Students.tsx` | Student profile (KPIs, chart, advisor notes) |
| `/instructor/grades` | `Grades.tsx` | Quiz / assignment / project grading |
| `/instructor/live-session` | `LiveSession.tsx` | Upcoming session, lectures, activity |

After login, users with role `instructor` redirect to `instructorDashboardPath` (`/instructor/dashboard`) via `roleRedirects` in `AppRouter.tsx`.

**Navigation config** (`config/navigation.ts`):

- Dashboard → `/instructor/dashboard`
- My Courses → `/instructor/my-courses`
- Students → `/instructor/students`
- Grades → `/instructor/grades`
- Live Session → `/instructor/live-session`

Icons use shared `navIcon()` from `@/utils/navIcon`.

---

## Section: Dashboard

**Page:** `pages/Dashboard.tsx`  
**Hook:** `hooks/useInstructorDashboard.ts`  
**Data:** `data/instructorDashboard.mock.ts`  
**Styles:** `styles/instructorDashboard.css`

### What it shows

- **Subject tabs** — Switch between instructor subjects (e.g. Web Dev, AI).
- **Header** — Subject name and short description.
- **Upcoming session** — Countdown (`timeLeft`), join button when within **15 minutes** of start (`JOIN_WINDOW_MS`), opens `meetingLink` in a new tab.
- **Metric cards** — High-level KPIs for the active subject.
- **Attendance chart** — Weekly attendance visualization.
- **Top performing students** — Links to `/instructor/students/:id`.
- **Progress summary cards** — Course progress breakdown.

### Components

| Component | Role |
|-----------|------|
| `SubjectTabs` | Subject switcher |
| `DashboardUpcomingSession` | Session card + countdown + join |
| `MetricCards` | KPI grid |
| `AttendanceChart` | Chart area |
| `TopPerformingStudents` | Ranked list with profile links |
| `ProgressSummaryCards` | Progress widgets |

### Flow

```text
useInstructorDashboard
  → activeSubjectId state
  → getSubjectDashboard(activeSubjectId) via useMemo
  → 1s interval for countdown + canJoin
  → joinSession() → window.open(meetingLink)
```

---

## Section: My Courses

**Page:** `pages/MyCourses.tsx` (exports `LectureMaterialsPage`)  
**Hook:** `hooks/useLectureMaterials.ts`  
**Data:** `data/lectureMaterials.mock.ts`  
**Styles:** `styles/LectureMaterials.css`

### What it shows

- Page header with subject context.
- **Upload material** — Select PDF/file; maps to `UploadedMaterial` in local state.
- **Upload quiz** — Same pattern for quiz files.
- **Uploaded file cards** — List with delete; “delete all” clears local list.

### Components

| Component | Role |
|-----------|------|
| `LectureHeader` | Title and actions |
| `UploadMaterialSection` | File input + upload UI |
| `UploadQuizSection` | Quiz file upload |
| `UploadedFileCard` | Single file row |

Uses the browser `File` API for selections; no upload to server yet.

---

## Section: Students

**Page:** `pages/Students.tsx`  
**Hooks:** `useStudentsList`, `useStudentProfile`  
**Data:** `data/students.mock.ts`  
**Styles:** `styles/students.css`

### Routing pattern

One page component, two views:

```tsx
const { studentId } = useParams();
if (!studentId) return <StudentsListPage />;
return <StudentProfilePage />;
```

### List view

| Piece | Behavior |
|-------|----------|
| `StudentsFilters` | Search + batch filter |
| `StudentsTable` | Roster rows |
| `StudentsPagination` | Uses `useTablePagination` (7 per page) |
| `useStudentsList` | Filters mock roster; resets page when filters change |

### Profile view

| Piece | Behavior |
|-------|----------|
| `StudentProfileHeader` | Name, avatar, status |
| `StudentProfileTabs` | Overview / Assignments / … (non-overview tabs are placeholders) |
| `StudentKpiCards` | GPA, attendance, etc. |
| `PerformanceTrendCard` | Trend chart |
| `AdvisorNotesCard` | Notes list + add note |
| `useStudentProfile` | Loads `getStudentProfile(id)`; local overrides for `status`, `advisorNotes`; `putAtRisk`, `clearRisk`, `addAdvisorNote` |

**Utility:** `utils/advisorNotes.ts` — `formatAdvisorNoteDate()` for new notes.

---

## Section: Grades

**Page:** `pages/Grades.tsx` (`GradingPage`)  
**Hooks:** `useQuizGrading`, `useAssignmentGrading`, `useProjectGrading`  
**Data:** `data/grading.mock.ts`  
**Styles:** `styles/grading.css`

### Tab UI (not router-based)

`activeTab` state in the page: `"quiz" | "assignment" | "project"`.

| Tab | Section | Hook behavior |
|-----|---------|---------------|
| Quiz | `QuizGradingSection` | Search + sort; read-only list |
| Assignment | `AssignmentGradingSection` | `updateScore`, `saveGrade` in local state |
| Project | `ProjectGradingSection` | Same as assignments |

### Shared grading components

| Component | Role |
|-----------|------|
| `GradingTabs` | Tab strip |
| `SearchHeader` | Search input |
| `TablePagination` | Page controls (quiz table) |
| `SubmissionGradingRow` | Row for assignment/project |
| `QuizRow` | Quiz-specific row |
| `ScoreBar` | Visual score |
| `SaveGradeButton` | Persist grade (local) |
| `StateCard` | Empty/loading states |

---

## Section: Live Session

**Page:** `pages/LiveSession.tsx` (`LiveSessionsPage`)  
**Hook:** `hooks/useLiveSessions.ts`  
**Data:** `data/liveSessions.mock.ts`  
**Styles:** `styles/liveSessions.css`

### What it shows

- **Upcoming session card** — Next live class with countdown (`CountdownTimer`).
- **Upcoming lectures list** — Scheduled lectures.
- **Session activity** — Recent activity feed.
- **Reward student** — Form UI for rewarding participation (mock).

`CountdownTimer` is also used on the **Dashboard** upcoming session card.

---

## Hooks reference

| Hook | Input / source | Returns / side effects |
|------|----------------|------------------------|
| `useInstructorDashboard` | `instructorDashboard.mock` | subjects, dashboard, countdown, `joinSession` |
| `useStudentsList` | `students.mock` | filtered list + pagination |
| `useStudentProfile` | `getStudentProfile(id)` | profile, tab state, risk/notes mutations |
| `useLectureMaterials` | mock + `File` | materials list, upload/delete handlers |
| `useLiveSessions` | `liveSessions.mock` | session, lectures, activity (static + timer) |
| `useQuizGrading` | `grading.mock` | filtered/sorted quiz rows |
| `useAssignmentGrading` | `grading.mock` | scores + `saveGrade` |
| `useProjectGrading` | `grading.mock` | same as assignments |
| `useTablePagination` | generic `T[]` | `paginatedItems`, page, `totalPages` (size 7) |

---

## Types and mock data

| Types file | Main exports |
|------------|--------------|
| `instructorDashboard.types.ts` | `SubjectDashboardData`, metrics, attendance, upcoming session |
| `students.types.ts` | `InstructorStudent`, `StudentProfile`, `AdvisorNote`, `StudentProfileTab`, `StudentStatus` |
| `grading.types.ts` | `QuizStudent`, `AssignmentStudent`, `ProjectStudent` |
| `lectureMaterials.types.ts` | `UploadedMaterial` |
| `liveSessions.types.ts` | Session, activity, lectures, reward form |

Mocks live in `data/` with parallel names. Replace mock imports inside hooks with `apiGet` / `apiPost` when the backend is ready.

---

## Styling

- Import CSS from the page or list/profile shell (e.g. `import "../styles/instructorDashboard.css"`).
- Dark-friendly palette: light text on dark panels (`#f8fafc`, `#1e293b`, accent `#3b82f6`).
- Class naming: `instructor-dashboard`, `instructor-subject-tab--active`, `students-page`, `grading-tabs`.
- Icons: `lucide-react` in grading/live; Material icons in nav via `navIcon`.

---

## Cross-feature reuse

The **mentor** feature imports from instructor:

| Export | Used for |
|--------|----------|
| `StudentKpiCards`, `PerformanceTrendCard`, `StudentProfileTabs` | Mentor student profile |
| `StudentsPagination` | Mentor roster pagination |
| `useTablePagination` | Mentor students + analytics |
| `students.types.ts` | Shared profile shapes |
| `students.css` | Shared profile/list styling |

When changing instructor student UI, check mentor profile pages for regressions.

---

## Backend integration checklist

- [ ] `POST/GET` subjects and dashboard aggregates → replace `getSubjectDashboard`
- [ ] Student roster and profile endpoints → replace `students.mock`
- [ ] File upload endpoints for materials/quizzes → replace `useLectureMaterials` local `File` mapping
- [ ] Grading APIs with optimistic updates → replace `grading.mock` mutations
- [ ] Live session join links and activity feed → replace `liveSessions.mock`
- [ ] Keep hook return shapes stable so components need few changes

---

## Related files outside this folder

| File | Role |
|------|------|
| `src/router/AppRouter.tsx` | Route registration, `roleRedirects` |
| `src/layouts/InstructorLayout.tsx` | `AppShellLayout` wiring |
| `src/layouts/AppShellLayout.tsx` | Sidebar, header, outlet |
| `src/guards/AuthGuard.tsx`, `RoleGuard.tsx` | Access control |
