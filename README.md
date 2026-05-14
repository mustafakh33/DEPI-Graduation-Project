# UniHub

UniHub is a role-based learning platform prototype built for the DEPI graduation project. The repository currently contains a substantial React frontend and backend planning documents, but it does not yet include an implemented server.

## Current Status

- `frontend/` is the active application and can be run locally.
- Authentication and onboarding are currently mocked in the browser with `localStorage`.
- `backend/` contains architecture and schema notes only. There is no backend source code or `package.json` yet.
- The frontend already includes an API client and route guards, so it is prepared for backend integration once the server is implemented.

## Implemented Frontend Areas

- Public landing page
- Authentication screens: login, register, forgot password, verify code, reset password
- Student onboarding flow: track selection, schedule setup, placement test, result, final welcome
- Role-based dashboards and navigation for `student`, `instructor`, `mentor`, and `admin`
- Student modules: roadmap, sessions, study room, analytics, assignments, quizzes, ranking, results, profile
- Instructor modules: dashboard, courses, students, grades, quizzes, live session
- Mentor modules: dashboard, students, chat, check-ins, progress
- Admin modules: dashboard, users, students, sessions, batches, courses, reports, feedback, settings

## Tech Stack

### Frontend

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

### Backend Plan

- Node.js
- Express
- MongoDB
- JWT-based authentication

## Repository Layout

```text
DEPI-Graduation-Project/
|-- frontend/                # React application
|   |-- src/
|   |-- public/
|   `-- README.md
|-- backend/                 # Documentation for planned API and data model
|   |-- README.md
|   |-- SCHEMA.md
|   `-- ANALYSIS.md
`-- README.md
```

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm 9 or newer

### Run the Frontend

```bash
cd frontend
npm install
npm run dev
```

The Vite dev server will print the local URL, typically `http://localhost:5173`.

### Frontend Environment Variables

Create `frontend/.env` if you want to point the app at a real API later:

```env
VITE_API_BASE_URL=http://localhost:5000
```

At the moment, the app still works without this variable because most flows are mocked.

## Authentication and Data Flow

- Session state is stored in `localStorage` under `user`.
- Onboarding state is stored in `localStorage` under `unihub:onboarding`.
- The shared API client is in `frontend/src/services/api/client.ts`.
- The API client already supports reading a JWT from `localStorage.getItem("access_token")`.
- The current login flow does not call an API yet; it creates a fake user object based on a development role selector.

## Documentation Map

- [Frontend documentation](frontend/README.md)
- [Backend overview](backend/README.md)
- [Proposed backend schema](backend/SCHEMA.md)
- [Frontend-to-backend integration analysis](backend/ANALYSIS.md)

## Known Limitations

- No backend implementation is present in this repository yet.
- No database schema or API is enforced by code yet; only documentation exists.
- Login, role switching, and onboarding completion are client-side only.
- Some route and label casing is inconsistent because the project is still in prototype form.

## Recommended Next Steps

1. Implement the backend auth module and `GET /api/auth/me`.
2. Replace mock login and onboarding persistence with real API calls.
3. Add database models for users, tracks, batches, and student onboarding.
4. Connect dashboard pages to server-backed data instead of mock data.
5. Add automated tests for auth, onboarding, and route protection.
