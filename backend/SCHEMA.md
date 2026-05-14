# Proposed Backend Schema

This schema is a draft for the backend that the current frontend expects. It documents the minimum data model needed to replace the mocked auth and onboarding flows and to support the role-based dashboards.

## Design Goals

- Support four roles: `student`, `instructor`, `mentor`, `admin`
- Persist onboarding state server-side
- Organize students into tracks and batches
- Track progress, attendance, assessments, and mentorship
- Keep auth and profile data cleanly separated

## Core Collections

### `users`

Primary account table for authentication and authorization.

| Field | Type | Notes |
|---|---|---|
| `_id` | ObjectId | Primary key |
| `name` | string | Full display name |
| `email` | string | Unique, indexed |
| `passwordHash` | string | Hashed password |
| `role` | enum | `student`, `instructor`, `mentor`, `admin` |
| `status` | enum | `active`, `inactive`, `suspended` |
| `onboardingStep` | enum | `signup`, `track`, `schedule`, `intro`, `test`, `result`, `complete`, `dashboard` |
| `createdAt` | date | Audit field |
| `updatedAt` | date | Audit field |

### `tracks`

Learning tracks exposed during onboarding.

| Field | Type | Notes |
|---|---|---|
| `_id` | ObjectId | Primary key |
| `slug` | string | Example: `web-development` |
| `title` | string | Display title |
| `description` | string | Summary shown in UI |
| `durationWeeks` | number | Example: `16` |
| `isActive` | boolean | Enable or disable track |

### `batches`

Groups students by level, track, and schedule.

| Field | Type | Notes |
|---|---|---|
| `_id` | ObjectId | Primary key |
| `name` | string | Human-readable batch name |
| `trackId` | ObjectId | Ref `tracks` |
| `level` | enum | `Beginner`, `Intermediate`, `Advanced` |
| `instructorId` | ObjectId | Ref `users` |
| `mentorId` | ObjectId | Ref `users` |
| `semesterStart` | date | Start date |
| `availableDays` | string[] | Example: `["Mon", "Wed"]` |
| `preferredTime` | string | Example: `evening` |
| `capacity` | number | Max students |
| `status` | enum | `planned`, `active`, `completed` |

### `studentProfiles`

Student-specific data separated from base auth data.

| Field | Type | Notes |
|---|---|---|
| `_id` | ObjectId | Primary key |
| `userId` | ObjectId | Ref `users`, unique |
| `trackId` | ObjectId | Ref `tracks` |
| `batchId` | ObjectId | Ref `batches` |
| `level` | enum | `Beginner`, `Intermediate`, `Advanced` |
| `weeklyGoalHours` | number | From onboarding |
| `availableDays` | string[] | From onboarding |
| `preferredTime` | string | From onboarding |
| `streakDays` | number | For student dashboard |
| `studyHoursTotal` | number | Aggregate metric |
| `onboardingCompleted` | boolean | Completion flag |

### `instructorProfiles`

Optional instructor metadata if the project needs more than role assignment.

| Field | Type | Notes |
|---|---|---|
| `_id` | ObjectId | Primary key |
| `userId` | ObjectId | Ref `users`, unique |
| `bio` | string | Optional |
| `specialties` | string[] | Optional |
| `assignedBatchIds` | ObjectId[] | Ref `batches` |

### `mentorProfiles`

Optional mentor metadata if the project needs more than role assignment.

| Field | Type | Notes |
|---|---|---|
| `_id` | ObjectId | Primary key |
| `userId` | ObjectId | Ref `users`, unique |
| `bio` | string | Optional |
| `assignedBatchIds` | ObjectId[] | Ref `batches` |

## Learning Content

### `courses`

| Field | Type | Notes |
|---|---|---|
| `_id` | ObjectId | Primary key |
| `trackId` | ObjectId | Ref `tracks` |
| `title` | string | Course name |
| `description` | string | Overview |
| `order` | number | Roadmap ordering |
| `isLockedByDefault` | boolean | Supports gated roadmap |

### `courseModules`

| Field | Type | Notes |
|---|---|---|
| `_id` | ObjectId | Primary key |
| `courseId` | ObjectId | Ref `courses` |
| `title` | string | Module title |
| `contentType` | enum | `lecture`, `quiz`, `assignment`, `project` |
| `resourceUrl` | string | Optional file or link |
| `order` | number | Module ordering |

### `studentCourseProgress`

| Field | Type | Notes |
|---|---|---|
| `_id` | ObjectId | Primary key |
| `studentId` | ObjectId | Ref `studentProfiles` |
| `courseId` | ObjectId | Ref `courses` |
| `completionPercent` | number | `0` to `100` |
| `status` | enum | `locked`, `available`, `in_progress`, `completed` |
| `lastAccessedAt` | date | Optional |

## Onboarding and Assessment

### `placementQuestions`

| Field | Type | Notes |
|---|---|---|
| `_id` | ObjectId | Primary key |
| `category` | string | Matches UI badge |
| `prompt` | string | Question text |
| `code` | string | Optional code block |
| `helper` | string | Optional hint |
| `answers` | array | Store answer options |
| `answers[].id` | string | Example: `a`, `b`, `c`, `d` |
| `answers[].text` | string | Option text |
| `answers[].isCorrect` | boolean | Server-only usage |
| `isActive` | boolean | Toggle availability |

### `placementAttempts`

| Field | Type | Notes |
|---|---|---|
| `_id` | ObjectId | Primary key |
| `studentId` | ObjectId | Ref `studentProfiles` |
| `questionIds` | ObjectId[] | Questions served in the attempt |
| `answers` | object[] | Submitted answers |
| `answers[].questionId` | ObjectId | Question ref |
| `answers[].selectedOptionId` | string | Example: `b` |
| `scoreRaw` | number | Correct answer count |
| `scorePercent` | number | Normalized `0` to `100` |
| `level` | enum | `Beginner`, `Intermediate`, `Advanced` |
| `durationSeconds` | number | Optional timer analytics |
| `tabSwitches` | number | Optional anti-cheat signal |
| `submittedAt` | date | Audit field |

## Study and Attendance

### `studyRooms`

| Field | Type | Notes |
|---|---|---|
| `_id` | ObjectId | Primary key |
| `batchId` | ObjectId | Ref `batches` |
| `name` | string | Room display name |
| `status` | enum | `open`, `closed`, `scheduled` |

### `studySessions`

| Field | Type | Notes |
|---|---|---|
| `_id` | ObjectId | Primary key |
| `roomId` | ObjectId | Ref `studyRooms` |
| `studentId` | ObjectId | Ref `studentProfiles` |
| `startedAt` | date | Start timestamp |
| `endedAt` | date | End timestamp |
| `durationMinutes` | number | Derived or stored |
| `focusModeUsed` | boolean | Optional |

### `attendanceRecords`

| Field | Type | Notes |
|---|---|---|
| `_id` | ObjectId | Primary key |
| `batchId` | ObjectId | Ref `batches` |
| `studentId` | ObjectId | Ref `studentProfiles` |
| `sessionType` | enum | `lecture`, `study_room`, `quiz`, `project_review` |
| `status` | enum | `present`, `late`, `absent` |
| `recordedAt` | date | Audit field |

## Evaluation

### `assessments`

Generic assessment definition for quizzes, assignments, and projects.

| Field | Type | Notes |
|---|---|---|
| `_id` | ObjectId | Primary key |
| `courseId` | ObjectId | Ref `courses` |
| `type` | enum | `quiz`, `assignment`, `project`, `exam` |
| `title` | string | Assessment name |
| `description` | string | Optional |
| `dueAt` | date | Optional |
| `maxScore` | number | Example: `100` |
| `weight` | number | For final grade calculations |

### `assessmentSubmissions`

| Field | Type | Notes |
|---|---|---|
| `_id` | ObjectId | Primary key |
| `assessmentId` | ObjectId | Ref `assessments` |
| `studentId` | ObjectId | Ref `studentProfiles` |
| `submittedAt` | date | Timestamp |
| `score` | number | Graded score |
| `feedback` | string | Optional instructor feedback |
| `status` | enum | `pending`, `submitted`, `graded`, `late` |

## Mentorship

### `mentorCheckIns`

| Field | Type | Notes |
|---|---|---|
| `_id` | ObjectId | Primary key |
| `mentorId` | ObjectId | Ref `users` |
| `studentId` | ObjectId | Ref `studentProfiles` |
| `summary` | string | Check-in note |
| `riskLevel` | enum | `low`, `medium`, `high` |
| `actionItems` | string[] | Follow-up items |
| `createdAt` | date | Audit field |

## Relationship Summary

- One `user` has one role.
- A student `user` has one `studentProfile`.
- An instructor or mentor may have an optional profile document and can be assigned to many `batches`.
- A `track` contains many `courses`.
- A `batch` belongs to one `track`.
- A student belongs to one current `batch` and one current `track`.
- A student can have many `placementAttempts`, `studySessions`, `attendanceRecords`, and `assessmentSubmissions`.

## Minimum Viable Backend

If the goal is to support the current frontend quickly, implement these collections first:

1. `users`
2. `tracks`
3. `batches`
4. `studentProfiles`
5. `placementQuestions`
6. `placementAttempts`

Then add:

1. `courses`
2. `studentCourseProgress`
3. `attendanceRecords`
4. `assessments`
5. `assessmentSubmissions`
6. `mentorCheckIns`
