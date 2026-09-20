# MERN Job & Internship Portal

A full-stack job/internship portal built with the MERN stack (MongoDB, Express, React, Node.js), featuring JWT authentication, role-based access control, and a listing moderation workflow.

## Overview

This platform connects students, companies, and administrators around job/internship postings:

- **Students** can browse approved listings, apply to jobs, track their application status, and withdraw applications.
- **Companies** can post job/internship listings and manage (edit, close, delete) their own postings.
- **Admins** review newly posted listings before they go public, approving legitimate postings and rejecting spam/invalid ones.

Every job listing goes through a moderation step (`pending` → `approved`/`rejected`) before it becomes visible to the public, solving the trust problem of an open, crowdsourced job board.

## Features

- **Authentication:** Secure registration and login with bcrypt password hashing and JWT tokens (1-hour expiry)
- **Role-based access control:** Three roles — `user` (student), `company`, and `admin` — each with distinct permissions enforced at the middleware level
- **Job listing moderation:** All new listings start as `pending` and require admin approval before appearing publicly; posters can close their own listings once a position is filled
- **Ownership-based permissions:** Posters can only edit/delete their own listings; students can only manage their own applications
- **Application tracking:** Students can track their application status (Applied → OA → Interview → Offer/Rejected) independently of the job listing's own status
- **Duplicate application prevention:** A student cannot apply to the same job twice

## Tech Stack

**Backend:** Node.js, Express, MongoDB (Mongoose), JWT, bcrypt
**Frontend:** React (Vite), React Router, Context API

## Architecture

**Data models:**
- `User` — name, email, hashed password, role (`user`/`company`/`admin`)
- `Job` — listing details, moderation status (`pending`/`approved`/`rejected`/`closed`), poster reference
- `Application` — links a user to a job, tracks personal application status

**API structure:**
- `/auth` — register, login
- `/jobs` — CRUD for job listings, with role- and ownership-based access control, plus admin approval/rejection endpoints
- `/applications` — apply to jobs, view own applications, update status, withdraw

**Frontend:**
- React Context (`AuthContext`) manages auth state (user, token) globally, persisted to `localStorage`
- React Router handles navigation across 7 pages (Login, Register, Browse Jobs, My Applications, Post a Job, My Posted Jobs, Admin Review)
- A shared API utility (`apiRequest`) centralizes all backend communication, including automatic JWT attachment

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

## Author

Built by Sasi Kumar as a hands-on project to learn full-stack MERN development, including authentication, authorization, and role-based application design.