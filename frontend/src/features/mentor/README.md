# Mentor Feature — Full Documentation

The mentor portal supports academic mentors: subject dashboards, student roster and profiles, study-group sessions, one-to-one chat, and batch progress analytics. It lives under `src/features/mentor/` and is wired through `MentorLayout` in the app router.

---

## Table of contents

1. [Architecture](#architecture)
2. [How we built it](#how-we-built-it)
3. [Folder structure](#folder-structure)
4. [Routing and navigation](#routing-and-navigation)
5. [Section: Dashboard](#section-dashboard)
6. [Section: My Students](#section-my-students)
7. [Section: My Sessions](#section-my-sessions)
8. [Section: Chat](#section-chat)
9. [Section: Progress (Analytics)](#section-progress-analytics)
10. [Hooks reference](#hooks-reference)
11. [Types and mock data](#types-and-mock-data)
12. [Styling](#styling)
13. [Instructor reuse](#instructor-reuse)
14. [Legacy / unused code](#legacy--unused-code)
15. [Backend integration checklist](#backend-integration-checklist)

---

## Architecture

```text
AuthGuard
  └── RoleGuard (role === "mentor")
        └── MentorLayout
              └── AppShellLayout (sidebar + header + <Outlet />)
                    └── Page (thin shell)
                          └── Hook (state + business logic)
                                └── data/*.mock.ts (+ localStorage for chat notes)
                          └── Components (presentation)
                          └── style/*.css (feature-scoped)
```

**Design principles**

| Layer | Responsibility |
|-------|----------------|
| `pages/` | Route entry; wire hook to layout components |
| `hooks/` | Subject selection, filters, chat state, session form, CSV export |
| `components/` | Grouped by domain: `Dashboard/`, `my-students/`, `sessions/`, `chat/`, `analytics/` |
| `data/` | Central mocks; `DashMockData.ts` is canonical for dashboard students |
| `utils/chatStorage.ts` | Persist advisor notes in `localStorage` |
| `config/navigation.ts` | Sidebar links (includes demo deep links for Chat/Progress) |

There is **no HTTP layer** in this feature today. Join session and schedule actions use `window.open` / `window.alert`; analytics export builds a client-side CSV `Blob`.

---

## How we built it

1. **Parallel to instructor** — Student list/profile follows the same URL pattern (`:studentId` on one page) and reuses instructor profile components where possible.

2. **Domain folders** — Each major area has its own `components/` subfolder and CSS file so sessions or chat can evolve independently.

3. **URL-driven chat** — `useChat` reads `studentId` from `useParams` and `navigate`s when switching conversations so links are shareable.

4. **Single student source** — `DashMockData.ts` (`mentorSubjects`) feeds dashboard, roster derivation (`mentorStudents.mock.ts`), and chat cross-references.

5. **Persistent mentor notes** — Private notes in chat sidebar use `chatStorage.ts` key `mentor-student-notes`.

6. **Feature CSS** — Large `sessions.css` (~430 lines) for grid/list layouts, live badges, and create-session form; dashboard uses dark pill UI in `mentorDashboard.css`.

---

## Folder structure

```text
mentor/
├── config/
│   └── navigation.ts
├── pages/
│   ├── Dashboard.tsx
│   ├── MyStudents.tsx
│   ├── MySessions.tsx
│   ├── ChatPage.tsx
│   ├── Progress.tsx
│   └── CheckIns.tsx           # NOT routed — placeholder only
├── hooks/
│   ├── useMentorDashboard.ts
│   ├── useMentorStudentsList.ts
│   ├── useMentorStudentProfile.ts
│   ├── useMentorSessions.ts
│   ├── useChat.ts
│   ├── useAnalytics.ts
│   └── useStudentDashboard.ts # unused legacy
├── types/
│   ├── mentor.types.ts
│   ├── mentorStudents.types.ts
│   ├── mentorSessions.types.ts
│   ├── chat.types.ts
│   └── analystics.types.ts    # filename typo: "analystics"
├── data/
│   ├── DashMockData.ts
│   ├── mentorStudents.mock.ts
│   ├── mentorSessions.mock.ts
│   ├── mockChatData.ts
│   └── analytics.mock.ts
├── utils/
│   └── chatStorage.ts
├── style/
│   ├── mentorDashboard.css
│   ├── mentorStudents.css
│   ├── sessions.css
│   ├── Chat.css
│   ├── analytics.css
│   └── StudentsProfile.css    # legacy students/ components
└── components/
    ├── Dashboard/         (7)
    ├── my-students/       (6)
    ├── sessions/          (6)
    ├── chat/              (5)
    ├── analytics/         (4)
    └── students/          (4 — legacy, unused)
```

---

## Routing and navigation

Registered in `src/router/AppRouter.tsx`:

| Path | Page | Purpose |
|------|------|---------|
| `/mentor/dashboard` | `Dashboard.tsx` | Default home after login |
| `/mentor/my-students` | `MyStudents.tsx` | Student roster |
| `/mentor/my-students/:studentId` | `MyStudents.tsx` | Student profile |
| `/mentor/chat/:studentId` | `ChatPage.tsx` | Active conversation |
| `/mentor/ChatPage` | redirect | → `/mentor/chat/8` (legacy path) |
| `/mentor/my-sessions` | `MySessions.tsx` | Study groups + create session |
| `/mentor/progress/:id` | `Progress.tsx` | Batch analytics (`:id` unused in UI today) |

**Navigation config** (`config/navigation.ts`):

| Label | Path | Note |
|-------|------|------|
| Dashboard | `/mentor/dashboard` | |
| My Students | `/mentor/my-students` | |
| My Sessions | `/mentor/my-sessions` | |
| Chat | `/mentor/chat/8` | Hardcoded demo student id `8` |
| Progress | `/mentor/progress/1` | Hardcoded demo batch id `1` |

Replace hardcoded ids with “last visited” or list defaults when APIs exist.

---

## Section: Dashboard

**Page:** `pages/Dashboard.tsx`  
**Hook:** `hooks/useMentorDashboard.ts`  
**Data:** `data/DashMockData.ts` (`mentorSubjects`)  
**Styles:** `style/mentorDashboard.css`

### What it shows

- **Header** — Subject tabs + search (name, student id, major).
- **Stats cards** — Total students, attendance, absence for selected subject.
- **Upcoming session** — Countdown; join within **15 minutes** (`JOIN_WINDOW_MS`); `window.open` meeting link.
- **Student grid** — Cards linking to `/mentor/my-students/:id`.
- **Side widgets** — Risk students (flagged) and top performers (top 3 GPA, non-risk).

### Components

| Component | Role |
|-----------|------|
| `DashboardHeader` | Tabs + search |
| `SubjectTabs` | Subject switcher (inside header) |
| `StatsCards` | Subject KPIs |
| `DashboardUpcomingSession` | Session countdown + join |
| `StudentGrid` / `StudentCard` | Filtered student cards |
| `RiskStudents` | At-risk list |
| `TopPerformers` | Top GPA list |

### Flow

```text
useMentorDashboard
  → selectedSubjectId + searchQuery
  → students filtered by search
  → topPerformers: sort by GPA, slice(3), exclude risk
  → riskStudents: filter risk flag
  → session countdown (same 15-min join window as instructor dashboard)
```

---

## Section: My Students

**Page:** `pages/MyStudents.tsx`  
**Hooks:** `useMentorStudentsList`, `useMentorStudentProfile`  
**Data:** `data/mentorStudents.mock.ts` (derived from `DashMockData`)  
**Styles:** `style/mentorStudents.css` + instructor `students.css`

### Routing pattern

```tsx
const { studentId } = useParams();
if (!studentId) return <MentorStudentsListPage />;
return <MentorStudentProfilePage />;
```

### List view

| Component | Role |
|-----------|------|
| `MentorStudentsFilters` | Subject + search filters |
| `MentorStudentsTable` | Roster table |
| `MentorStudentsListPage` | Composes filters, table, pagination |
| `useMentorStudentsList` | Filters mock roster; `useTablePagination` from instructor |

### Profile view

| Component | Role |
|-----------|------|
| `MentorStudentProfileHeader` | Mentor-specific header + “Start Chat” |
| `MentorAdvisorNotesCard` | Advisor notes |
| **From instructor** | `StudentKpiCards`, `PerformanceTrendCard`, `StudentProfileTabs` |
| `useMentorStudentProfile` | `getMentorStudentProfile(id)`; tab state from instructor types |

Profiles extend instructor `StudentProfile` shape via mock builders.

---

## Section: My Sessions

**Page:** `pages/MySessions.tsx`  
**Hook:** `hooks/useMentorSessions.ts`  
**Data:** `data/mentorSessions.mock.ts`  
**Styles:** `style/sessions.css`

### What it shows

- **Page header** — Toggle **grid** vs **list** view for active groups.
- **Active sessions** — Study group cards (observe / join discussion).
- **Classroom logs** — Historical session log entries.
- **Create session panel** — Form with batch options, validation, success notice.
- **Upcoming session alert** — Next scheduled group session.

### Components

| Component | Role |
|-----------|------|
| `SessionsPageHeader` | Title + view mode toggle |
| `ActiveSessionsSection` | Grid/list of `SessionGroupCard` |
| `SessionGroupCard` | Single live group room |
| `ClassroomLogs` | Log list |
| `CreateSessionPanel` | Create form |
| `UpcomingSessionAlert` | Upcoming banner |

### Hook behavior

- `viewMode`: `"grid" | "list"`
- `createSession`: validates form, pushes to local list, shows notice
- `observeRoom` / `joinDiscussion`: `window.open` on `meetingLink`

---

## Section: Chat

**Page:** `pages/ChatPage.tsx`  
**Hook:** `hooks/useChat.ts`  
**Data:** `data/mockChatData.ts`  
**Utils:** `utils/chatStorage.ts`  
**Styles:** `style/Chat.css`

### Layout (3 columns)

```text
┌─────────────┬──────────────────┬─────────────────┐
│ ChatSidebar │ Thread + Input   │ StudentInfoPanel│
│ (threads)   │ ChatHeader       │ (profile, files,│
│             │ MessageBubble    │  notes, sessions)│
│             │ MessageInput     │                 │
└─────────────┴──────────────────┴─────────────────┘
```

### Components

| Component | Role |
|-----------|------|
| `ChatSidebar` | Conversation list; navigates to `/mentor/chat/:id` |
| `ChatHeader` | Student name, status |
| `MessageBubble` | Text / file / system messages (`chat.types` discriminated union) |
| `MessageInput` | Send, attachments, quick replies |
| `StudentInfoPanel` | GPA, files, upcoming sessions, editable notes |

### Hook behavior

- Active thread from URL `studentId`
- Send message appends to local thread state
- File attachments: `formatFileSize`, `inferRecentFileType` from `chatStorage`
- Notes: `loadSavedNotes` / `persistNotes` → `localStorage` key `mentor-student-notes`
- Unread counts simulated in mock state

Default demo student id: **8** (sidebar nav and `/mentor/ChatPage` redirect).

---

## Section: Progress (Analytics)

**Page:** `pages/Progress.tsx`  
**Hook:** `hooks/useAnalytics.ts`  
**Data:** `data/analytics.mock.ts`  
**Styles:** `style/analytics.css`

### What it shows

- **Analytics header** — Title and export action.
- **Stats cards** — Batch-level aggregates and deltas (`AnalysticsStats` — component name typo).
- **Filters** — Batch, track, date range (client-side).
- **Batch analytics table** — Paginated rows (page size **7** via `useTablePagination`).
- **CSV export** — Client-generated download from filtered data.

### Components

| Component | Role |
|-----------|------|
| `AnalyticsHeader` | Title + export |
| `AnalysticsStats` | Summary stat cards |
| `AnalyticsFilters` | Filter controls |
| `BatchAnalyticsTable` | Data table + pagination |

Route param `:id` is reserved for future “single batch” deep links; UI currently shows all filtered batches.

---

## Hooks reference

| Hook | Source | Key behavior |
|------|--------|--------------|
| `useMentorDashboard` | `DashMockData` | Subject, search, risk/top lists, join window |
| `useMentorStudentsList` | `mentorStudents.mock` | Filters + `useTablePagination` |
| `useMentorStudentProfile` | `getMentorStudentProfile` | Profile + tabs |
| `useMentorSessions` | `mentorSessions.mock` | View mode, create session, open links |
| `useChat` | `mockChatData` + storage | URL thread, send, notes persist |
| `useAnalytics` | `analytics.mock` | Filters, pagination, CSV blob |
| `useStudentDashboard` | static mock | **Unused** |

---

## Types and mock data

| File | Purpose |
|------|---------|
| `mentor.types.ts` | `Student`, `MentorSubject`, upcoming session, dashboard props |
| `mentorStudents.types.ts` | `MentorRosterStudent`, status enum |
| `mentorSessions.types.ts` | `StudyGroupSession`, `CreateSessionForm`, logs |
| `chat.types.ts` | `ChatMessage` union, `ChatConversation`, quick replies |
| `analystics.types.ts` | `BatchAnalytics`, filters, stats (typo in filename) |

| Mock file | Contents |
|-----------|----------|
| `DashMockData.ts` | `mentorSubjects` — students, attendance, sessions |
| `mentorStudents.mock.ts` | Roster + `getMentorStudentProfile()` |
| `mentorSessions.mock.ts` | Active groups, logs, batches, upcoming |
| `mockChatData.ts` | Threads, messages, quick replies, files |
| `analytics.mock.ts` | `batchesAnalytics`, summary deltas |

---

## Styling

| Stylesheet | Used by |
|------------|---------|
| `mentorDashboard.css` | Dashboard — dark pills, grid, widgets |
| `mentorStudents.css` | Mentor-specific list/profile overrides |
| `sessions.css` | My Sessions — layout, cards, forms, live badges |
| `Chat.css` | Chat 3-column layout |
| `analytics.css` | Progress page table and filters |
| `StudentsProfile.css` | Legacy `components/students/` only |

Icons: **lucide-react** in feature components; shell uses shared UI from `@/components/ui/*`.

---

## Instructor reuse

| Imported from instructor | Mentor usage |
|--------------------------|--------------|
| `StudentKpiCards` | Profile overview |
| `PerformanceTrendCard` | Profile chart |
| `StudentProfileTabs` | Profile tabs |
| `StudentsPagination` | Roster pages |
| `useTablePagination` | Students list + analytics table |
| `students.types.ts` | `StudentProfile`, `StudentProfileTab`, etc. |
| `styles/students.css` | Shared student UI look |

Keep instructor student types stable when extending mentor profiles.

---

## Legacy / unused code

| Item | Status |
|------|--------|
| `pages/CheckIns.tsx` | Placeholder; **not** in `AppRouter` |
| `components/students/*` | No imports found |
| `hooks/useStudentDashboard.ts` | Unused |
| `style/StudentsProfile.css` | Tied to legacy students components |

Safe to remove in a cleanup pass or wire Check-Ins when product spec is ready.

---

## Backend integration checklist

- [ ] Subjects + dashboard → replace `DashMockData` / `useMentorDashboard`
- [ ] Roster + profile API → replace `mentorStudents.mock`
- [ ] Study groups CRUD + logs → replace `mentorSessions.mock`
- [ ] Real-time chat WebSocket or REST → replace `mockChatData`; keep `chatStorage` or move notes to API
- [ ] Batch analytics endpoint → replace `analytics.mock`; keep CSV export or server export
- [ ] Dynamic nav links for Chat/Progress (remove hardcoded `8` and `1`)
- [ ] Route and implement `CheckIns` when specified

---

## Related files outside this folder

| File | Role |
|------|------|
| `src/router/AppRouter.tsx` | Mentor routes, `roleRedirects.mentor` |
| `src/layouts/MentorLayout.tsx` | `AppShellLayout` + `mentorNavItems` |
| `src/layouts/AppShellLayout.tsx` | Shared shell |
| `src/guards/AuthGuard.tsx`, `RoleGuard.tsx` | Access control |
