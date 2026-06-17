# TaskFlow — Task Management Application

A full-stack Task Management App built with **Next.js**, **TypeScript**, **Tailwind CSS**, **Node.js/Express**, and **MongoDB**.

---

## Features

- ✅ Add, Edit, Delete Tasks
- ✅ Mark Task as Complete (with validation)
- ✅ Filter by Priority (High / Medium / Low)
- ✅ Filter by Status (Pending / Completed)
- ✅ Stats dashboard (Total, Completed, Pending, High Priority)
- ✅ Responsive UI (mobile + desktop)
- ✅ Toast notifications for all actions
- ✅ Overdue task detection

### Logical Validation
A task **cannot** be marked as Completed if:
- Due Date is missing
- Description is less than 20 characters

---

## Tech Stack

| Layer     | Technology                        |
|-----------|-----------------------------------|
| Frontend  | Next.js 14, TypeScript, Tailwind  |
| Backend   | Node.js, Express.js, TypeScript   |
| Database  | MongoDB + Mongoose                |
| UI Extras | Lucide Icons, react-hot-toast     |

---

## Project Structure

```
task-manager/
├── backend/
│   ├── src/
│   │   ├── models/Task.ts
│   │   ├── routes/tasks.ts
│   │   └── index.ts
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
└── frontend/
    ├── app/
    │   ├── layout.tsx
    │   └── page.tsx
    ├── components/
    │   ├── TaskCard.tsx
    │   └── TaskForm.tsx
    ├── lib/api.ts
    ├── types/task.ts
    └── .env.local.example
```

---

## Setup Instructions

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- npm

---

### Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Copy and configure environment variables
cp sample.env
# Edit .env and set your MONGO_URI

# Run in development
npm run dev

# Build for production
npm run build
npm start
```

Backend runs on: `http://localhost:5000`

---

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Copy and configure environment variables
cp sample.env
# Set NEXT_PUBLIC_API_URL=http://localhost:5000

# Run in development
npm run dev

# Build for production
npm run build
npm start
```

Frontend runs on: `http://localhost:3000`

---

## API Endpoints

| Method | Endpoint                  | Description           |
|--------|---------------------------|-----------------------|
| GET    | /api/tasks                | Get all tasks         |
| GET    | /api/tasks?priority=High  | Filter by priority    |
| GET    | /api/tasks?status=Pending | Filter by status      |
| POST   | /api/tasks                | Create a task         |
| PUT    | /api/tasks/:id            | Update a task         |
| DELETE | /api/tasks/:id            | Delete a task         |
| PATCH  | /api/tasks/:id/complete   | Mark task as complete |

---

## Deployment

### Backend → Render
1. Create a new Web Service on [Render](https://render.com)
2. Connect your GitHub repo
3. Set build command: `cd backend && npm install && npm run build`
4. Set start command: `cd backend && npm start`
5. Add environment variables: `MONGO_URI`, `FRONTEND_URL`, `PORT`

### Frontend → Vercel
1. Import your GitHub repo on [Vercel](https://vercel.com)
2. Set root directory to `frontend`
3. Add environment variable: `NEXT_PUBLIC_API_URL` (your Render backend URL)
4. Deploy!

---

## Screenshots

<p align="center">

  <img src="pictures\All task.png" width="80%" />
  <br/><br/>
  
  <img src="pictures\Add task.png" width="80%" />
  <br/><br/>

  <img src="pictures\Responsive.png" width="80%" /><br/><br/>
</p>

### Dashboard Overview

---

The main dashboard provides a quick summary of all tasks, including:

* Total Tasks
* Completed Tasks
* Pending Tasks
* High Priority Tasks
* Task Filtering by Priority and Status
* Task Management Actions (Edit, Delete, Mark Complete)
---

### Add New Task

---

Users can create tasks using a clean and intuitive modal form.

Features include:

* Task Title
* Detailed Description
* Priority Selection (Low, Medium, High)
* Status Selection
* Due Date Picker
* Form Validation
* Completion Requirements
---

### Responsive Design

---
The application is fully responsive and optimized for different screen sizes, including desktop, tablet, and mobile devices.

Features:

* Adaptive Grid Layout
* Mobile-Friendly Navigation
* Responsive Task Cards
* Flexible Filter Controls

---