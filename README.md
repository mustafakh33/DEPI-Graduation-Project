# 🎓 UniHub – Structured Digital Learning Platform


> 🚀 Transforming self-learning into a structured, accountable academic experience

---

## 📌 Overview

**UniHub** is a next-generation digital learning platform designed to replicate the discipline and structure of traditional university systems — while leveraging modern technology, AI, and collaborative learning environments.

It addresses one of the biggest challenges in online education:

> ❌ Lack of commitment, structure, and accountability

By introducing:

* 📅 Semester-based learning
* 👥 Smart peer grouping
* ⏱ Real-time study tracking
* 🤖 AI-powered evaluation
* 🎯 Project-based assessment

👉 UniHub transforms passive learning into **measurable academic progression**.

---

## 🌍 Vision

> Build a scalable digital academic ecosystem that reduces dropout rates, enforces consistency, and enables real skill acquisition through structure, accountability, and collaboration.

---

## 🎯 Core Values

| Value                 | Description                                                   |
| --------------------- | ------------------------------------------------------------- |
| **Accountability**    | Enforced attendance, study-hour tracking, visible performance |
| **Peer Alignment**    | Smart grouping based on level, goals, and availability        |
| **Structured Growth** | Clear semester roadmap with progressive unlocking             |
| **AI Intelligence**   | Adaptive quizzes, prediction models, and smart feedback       |
| **Real Evaluation**   | Project-based grading over theoretical testing                |

---

## 🧠 Problem Statement

Modern self-learning platforms suffer from:

* ❌ Low commitment & high dropout rates
* ❌ Lack of structured academic progression
* ❌ No real accountability system
* ❌ Difficulty finding peers with similar goals
* ❌ Weak performance tracking & evaluation

👉 Result: **Incomplete learning journeys & weak skill outcomes**

---

## 💡 Solution

UniHub introduces a **hybrid academic model** combining:

* 🎓 University-like structure
* 🤝 Social learning environments
* 📊 Behavioral tracking
* 🤖 AI-driven insights

👉 Creating a **disciplined, data-driven learning experience**

---

## 🚀 Key Features

### 🧩 1. Smart Admission & Batch System

* Mandatory placement test (Beginner / Intermediate / Advanced)
* Intelligent batch assignment based on skill level, schedule, and goals
* Prerequisite system to control progression

### 📚 2. Semester-Based Academic Structure

* 16-week structured semesters
* Midterm + Final Project system
* Interactive roadmap with locked/unlocked courses, completion tracking, and progress visualization

### 👥 3. Collaborative Study Hub

* Private study rooms per batch
* Real-time features: ⏱ Study timer, 💬 Chat, 🎥 Voice/Video, 🖥 Screen sharing, 🎯 Focus mode
* Automated attendance tracking, study-hour analytics, and group performance insights

### 📊 4. Accountability System

* Weekly study goals (user-defined)
* Real-time progress tracking
* Streak system 🔥
* Public commitment status: ✅ On Track / ⚠ Under Minimum / 🔥 Streak Active

### 🤖 5. AI-Powered Learning System

* AI-generated quizzes from course content
* Weakness detection & personalized improvement plans
* Performance prediction & risk alerts
* AI academic assistant

### 📝 6. Evaluation System

| Component     | Weight |
| ------------- | ------ |
| Attendance    | 15%    |
| Study Hours   | 10%    |
| Midterm Exam  | 25%    |
| Final Project | 50%    |

### 🏆 7. Gamification (Optional)

* XP system, achievement badges, study ranking
* Weekly leaderboard resets & progress celebration 🎉

---

## 🏗 Project Structure

```
DEPI-Graduation-Project/
├── frontend/          → React.js Application
│   ├── src/
│   ├── public/
│   └── package.json
├── backend/           → Node.js API Server
│   ├── src/
│   └── package.json
└── README.md
```

---

## 🏗 Tech Stack

### Frontend
* React.js
* Tailwind CSS
* Redux
* React Hook Form
* Axios
* Sonner (Toast Notifications)

### Backend
* Node.js
* Express.js
* MongoDB

### Real-Time
* Socket.io

### AI / ML
* OpenAI API

---

## ⚙️ Installation & Setup

### Prerequisites
* Node.js >= 18
* npm >= 9
* MongoDB running locally or connection string ready

### 1. Clone the Repository

```bash
git clone https://github.com/mustafakh33/DEPI-Graduation-Project.git
cd DEPI-Graduation-Project
```

### 2. Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

### 3. Setup Backend

```bash
cd backend
npm install
npm run dev
```

---

## 🔐 Environment Variables

Create a `.env` file inside the `backend/` folder:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_api_key
```

Create a `.env` file inside the `frontend/` folder:

```env
VITE_API_URL=http://localhost:5000
```

> ⚠️ Never commit `.env` files to GitHub. Make sure `.env` is listed in `.gitignore`.

---

## 🔄 System Loops

UniHub operates on 3 core behavioral loops:

* **Academic Loop:** `Learn → Practice → Evaluate → Progress`
* **Study Loop:** `Study Room → Timer → Quiz → Improvement`
* **Accountability Loop:** `Goal → Tracking → Feedback → Behavior Adjustment`

---

## 🧭 Platform Architecture (UX Navigation)

| Section   | Description                             |
| --------- | --------------------------------------- |
| Dashboard | Goals, progress, streaks, notifications |
| Roadmap   | Learning path & course progression      |
| Study Hub | Live sessions & collaboration           |
| Exams     | Quizzes, midterms, projects             |
| Profile   | Analytics, achievements, mentor info    |

---

## 📈 Future Enhancements

* 🎓 Certification system
* 🧠 Advanced AI tutor (1-on-1)
* 💼 Internship matching
* 📊 Adaptive semester pacing
* 📱 Native mobile apps
* 🤝 Corporate partnerships

---

## 📊 Key Metrics (KPIs)

* Weekly Active Users
* Average Study Hours / User
* Completion Rate
* Dropout Reduction
* Project Performance Scores
* Group Consistency Score

---

## ⚠️ Challenges & Mitigation

| Challenge        | Solution                             |
| ---------------- | ------------------------------------ |
| User burnout     | Balanced workload + mentor check-ins |
| Fake study time  | Activity tracking & validation       |
| Strict penalties | Flexible warning system              |
| AI inaccuracies  | Human moderation layer               |

---

## 📄 License

This project is for educational purposes (Graduation Project).

---

## 🔚 Final Note

UniHub is not just another learning platform.

> 💥 It is a **behavior-driven academic system** designed to enforce discipline, build consistency, and deliver real outcomes.