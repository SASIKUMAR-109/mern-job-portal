# CareerHub — MERN Job & Internship Portal

A full-stack job/internship portal built with the MERN stack (MongoDB, Express, React, Node.js), featuring JWT authentication, role-based access control, and a listing moderation workflow.

**Live demo:** https://career-hub-portal.vercel.app/
**Backend API:** https://mern-job-portal-76t9.onrender.com

## Overview

This platform connects students, companies, and administrators around job/internship postings:

- **Students** can browse approved listings, search/filter them, apply to jobs, track their application status with personal notes, and withdraw applications.
- **Companies** can post job/internship listings and manage (edit, close, delete) their own postings.
- **Admins** review newly posted listings before they go public, approving legitimate postings and rejecting spam/invalid ones.

Every job listing goes through a moderation step (`pending` → `approved`/`rejected`) before it becomes visible to the public, solving the trust problem of an open, crowdsourced job board.

## Features

- **Authentication:** Secure registration and login with bcrypt password hashing and JWT tokens; automatic session expiry handling (invalid/expired tokens redirect to login without affecting normal permission errors)
- **Role-based access control:** Three roles — `user` (student), `company`, and `admin` — each with distinct permissions enforced at the middleware level
- **Ownership-based authorization:** Every update/delete/close endpoint scopes its query to the requesting user (`{ _id, postedBy }`), preventing one user from modifying another user's data even with a valid token
- **Job listing moderation:** All new listings start as `pending` and require admin approval before appearing publicly; posters can close their own listings once a position is filled
- **Application tracking:** Students track their application status (Applied → OA → Interview → Offer/Rejected) independently of the job listing's own status — closing a job never overwrites a student's in-progress application state
- **Personal notes on applications:** Students can add/edit free-text notes per application (e.g. follow-up reminders)
- **Search & filtering:** Home page and Browse Jobs support searching by title, company, or skills
- **Remote-friendly listings:** Location is optional; listings default to "Remote" when left blank
- **Duplicate application prevention:** A student cannot apply to the same job twice
- **Polished UX:** Custom Toast notifications and ConfirmDialog modals replace native browser `alert()`/`confirm()`; loading spinners on all data-fetching pages; responsive mobile navbar; dark-mode-aware date picker
- **404 handling:** Custom not-found page with correct behavior on page refresh in production (via Vercel rewrites)

## Tech Stack

**Backend:** Node.js, Express, MongoDB (Mongoose), JWT, bcrypt
**Frontend:** React (Vite), React Router, Context API
**Deployment:** Render (backend), Vercel (frontend)

## Architecture

**Data models:**
- `User` — name, email, hashed password, role (`user`/`company`/`admin`)
- `Job` — listing details, moderation status (`pending`/`approved`/`rejected`/`closed`), poster reference, location (defaults to "Remote")
- `Application` — links a user to a job, tracks personal application status and notes, independent of the job's own status

**API structure:**
- `/auth` — register, login
- `/jobs` — CRUD for job listings, with role- and ownership-based access control, plus admin approval/rejection endpoints
- `/applications` — apply to jobs, view own applications, update status/notes, withdraw

**Frontend:**
- React Context (`AuthContext`) manages auth state (user, token) globally, persisted to `localStorage`
- React Router handles navigation across 10 pages: Home, Login, Register, Browse Jobs, My Applications, Post a Job, My Posted Jobs, Admin Review, About, Not Found
- A shared API utility (`apiRequest`) centralizes all backend communication — attaches JWTs automatically and distinguishes session-expiry errors from ordinary permission errors

## Getting Started

### Backend
```bash
cd backend
npm install
```
Create a `.env` file with:
```
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```
```bash
npm start
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Future Scope

- Companies managing/tracking applicants directly
- Email verification on signup
- Real-time notifications for application status changes
- Pagination for large job listings
- Tracking applications submitted outside the platform

## Author

Built by Sasi Kumar as a hands-on project to learn full-stack MERN development, including authentication, authorization, and role-based application design.