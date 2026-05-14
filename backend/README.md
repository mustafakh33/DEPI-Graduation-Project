# Backend Documentation

This folder does not contain a backend implementation yet. It currently holds planning documents for the API and data model that the frontend will need.

## Current State

- No `src/` directory exists yet.
- No `package.json` exists yet.
- No server, database models, controllers, or routes are implemented.
- The frontend already expects a backend and includes an API client prepared for JWT-based auth.

## Intended Responsibilities

The backend is expected to provide:

- User registration and login
- JWT session validation
- Role-aware authorization
- Student onboarding persistence
- Placement test delivery and scoring
- Dashboard data for student, instructor, mentor, and admin views
- Batch, course, and performance management

## Suggested Backend Stack

- Node.js
- Express
- MongoDB with Mongoose
- JWT authentication
- Zod or Joi for request validation

## Suggested Module Breakdown

- `auth`
  - register
  - login
  - current user
- `users`
  - admin user management
- `onboarding`
  - track selection
  - schedule submission
  - placement test fetch and submit
- `students`
  - dashboard
  - roadmap
  - batch and study progress
- `instructors`
  - dashboard
  - batches
  - students
  - grading
- `mentors`
  - dashboard
  - alerts
  - check-ins
  - progress
- `admins`
  - platform dashboard
  - users
  - batches
  - reports

## References in This Folder

- [SCHEMA.md](SCHEMA.md): proposed MongoDB collections and relationships
- [ANALYSIS.md](ANALYSIS.md): frontend-to-backend integration notes and endpoint expectations

## Recommended Implementation Order

1. Create the Node.js project structure and environment configuration.
2. Implement `User`, `Track`, `Batch`, and `StudentProfile` models.
3. Add auth endpoints and JWT middleware.
4. Move onboarding flow from `localStorage` to backend persistence.
5. Implement role-specific dashboard endpoints.
6. Add validation, error handling, and automated tests.
