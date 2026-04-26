# Admin LMS Foundation

## 1. UI Structure Extracted From The Stitch Reference

The published Stitch project does not expose its artboards in static HTML, but the share page and visual system cues point to a modern admin shell built around:

- A fixed left sidebar with grouped navigation and compact icons
- A slim topbar with search, notifications, quick actions, and account controls
- Large rounded cards with soft borders, light shadows, and dense data layouts
- Clean sans-serif typography aligned with Google Sans style proportions
- Spacious section headers followed by KPI cards, charts, and tabular panels
- Form surfaces that use stacked labels, rounded inputs, segmented filters, and modal dialogs
- High signal status presentation through colored badges, chips, and inline progress states

For implementation, the UI should follow this structure:

- App shell: sidebar + topbar + responsive content container
- Page header: title, breadcrumbs, context actions, date/filter controls
- Overview zone: stat cards and trend indicators
- Content zone: charts, tables, cards, and detail drawers/dialogs
- Utility patterns: search bars, tabs, filters, export buttons, status badges, empty/loading/error states

## 2. Required Admin Pages

- `/login`
- `/dashboard`
- `/sessions`
- `/sessions/[sessionId]`
- `/users`
- `/users/new`
- `/users/[userId]`
- `/students`
- `/students/new`
- `/students/[studentId]`
- `/groups`
- `/groups/new`
- `/groups/[groupId]`
- `/community`
- `/community/posts/[postId]`
- `/tickets`
- `/tickets/[ticketId]`
- `/surveys`
- `/surveys/new`
- `/surveys/[surveyId]`
- `/surveys/[surveyId]/analytics`
- `/all-surveys`
- `/quizzes`
- `/quizzes/new`
- `/quizzes/[quizId]`
- `/assessments`
- `/assessments/new`
- `/assessments/[assessmentId]`
- `/reports`
- `/reports/exports`
- `/settings/roles`
- `/settings/permissions`
- `/403`

## 3. Core Reusable Components

- `AppSidebar`
- `Topbar`
- `PageContainer`
- `PageHeader`
- `StatCard`
- `KpiGrid`
- `ChartCard`
- `StatusBadge`
- `FilterBar`
- `SearchInput`
- `DataTable`
- `TableToolbar`
- `TablePagination`
- `EmptyState`
- `ErrorState`
- `ConfirmDialog`
- `EntityFormDialog`
- `ImportDialog`
- `ExportDialog`
- `DetailDrawer`
- `SectionCard`
- `AssignmentPicker`
- `AttendanceMatrix`
- `ResponseSummaryCard`
- `ThreadPanel`

## 4. Proposed Project Folder Structure

```text
DEPI-Graduation-Project/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   ├── src/
│   │   ├── app.ts
│   │   ├── server.ts
│   │   ├── config/
│   │   ├── lib/
│   │   ├── middleware/
│   │   ├── modules/
│   │   │   ├── auth/
│   │   │   ├── dashboard/
│   │   │   ├── users/
│   │   │   ├── students/
│   │   │   ├── groups/
│   │   │   ├── sessions/
│   │   │   ├── attendance/
│   │   │   ├── community/
│   │   │   ├── tickets/
│   │   │   ├── surveys/
│   │   │   ├── quizzes/
│   │   │   ├── assessments/
│   │   │   ├── reports/
│   │   │   ├── imports/
│   │   │   └── roles/
│   │   ├── routes/
│   │   ├── types/
│   │   └── utils/
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── (auth)/
│   │   │   ├── (dashboard)/
│   │   │   ├── api/
│   │   │   ├── globals.css
│   │   │   └── layout.tsx
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   ├── charts/
│   │   │   ├── tables/
│   │   │   ├── forms/
│   │   │   ├── badges/
│   │   │   ├── dialogs/
│   │   │   └── states/
│   │   ├── features/
│   │   │   ├── auth/
│   │   │   ├── dashboard/
│   │   │   ├── sessions/
│   │   │   ├── users/
│   │   │   ├── students/
│   │   │   ├── groups/
│   │   │   ├── community/
│   │   │   ├── tickets/
│   │   │   ├── surveys/
│   │   │   ├── quizzes/
│   │   │   ├── assessments/
│   │   │   └── reports/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── providers/
│   │   ├── store/
│   │   ├── types/
│   │   └── config/
│   ├── public/
│   ├── package.json
│   └── tsconfig.json
└── docs/
    └── admin-lms-foundation.md
```

## 5. Schema Design Notes

- `AdminUser` represents authenticated admin-side users
- RBAC uses `Role`, `Permission`, `AdminUserRole`, and `RolePermission`
- `Student` remains separate from admin users
- Group membership is explicit to support historical enrollments
- Sessions are linked to groups and trainers, with attendance tracked per student per session
- Community, tickets, and replies support both admin-side and student-side authors
- Surveys and quizzes store responses separately from definitions for analytics
- Import/export operations are logged for traceability and admin reporting
