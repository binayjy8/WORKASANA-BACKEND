# Workasana Backend

## Project Overview

Workasana Backend is the server-side application for the Workasana Project Management System. It provides REST APIs for managing users, authentication, projects, tasks, teams, reports, and tags.

This backend handles all business logic, database operations, authentication, and data relationships.

---

## Features

* User Authentication (Register/Login)
* JWT-based Authorization
* Project Management (Create, Update, Delete, View)
* Task Management
* Team Management
* User Management
* Reports Generation
* Tag Management
* Protected Routes
* MongoDB Database Integration
* Password Hashing using bcrypt

---

## Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT (JSON Web Token)
* bcryptjs
* dotenv
* cors

---

## Installation Steps

### Clone Repository

```bash
git clone <your-backend-repo-link>
cd workasana-backend
```

### Install Dependencies

```bash
npm install
```

### Create Environment Variables

Create `.env` file:

```env
PORT=5000
MONGODB=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### Run Server

```bash
npm start
```

or for development:

```bash
npm run dev
```

---

## Environment Variables

| Variable   | Description               |
| ---------- | ------------------------- |
| PORT       | Server Port               |
| MONGODB    | MongoDB Connection String |
| JWT_SECRET | JWT Secret Key            |

---

## API Endpoints

### Auth Routes

| Method | Endpoint             | Description      |
| ------ | -------------------- | ---------------- |
| POST   | `/api/auth/register` | Register User    |
| POST   | `/api/auth/login`    | Login User       |
| GET    | `/api/auth/user`     | Get Current User |

---

### Project Routes

| Method | Endpoint            |
| ------ | ------------------- |
| GET    | `/api/projects`     |
| POST   | `/api/projects`     |
| PUT    | `/api/projects/:id` |
| DELETE | `/api/projects/:id` |

---

### Task Routes

| Method | Endpoint         |
| ------ | ---------------- |
| GET    | `/api/tasks`     |
| POST   | `/api/tasks`     |
| PUT    | `/api/tasks/:id` |
| DELETE | `/api/tasks/:id` |

---

### Team Routes

| Method | Endpoint         |
| ------ | ---------------- |
| GET    | `/api/teams`     |
| POST   | `/api/teams`     |
| PUT    | `/api/teams/:id` |
| DELETE | `/api/teams/:id` |

---

### User Routes

| Method | Endpoint     |
| ------ | ------------ |
| GET    | `/api/users` |

---

### Report Routes

| Method | Endpoint       |
| ------ | -------------- |
| GET    | `/api/reports` |

---

### Tag Routes

| Method | Endpoint    |
| ------ | ----------- |
| GET    | `/api/tags` |

---

## Screenshots

Add backend API screenshots here:

* MongoDB Collections
* Postman API Testing
* Authentication APIs
* Task APIs
* Project APIs

---

## Live Working Link

Backend Live URL:

```text
[https://workasana-backend-iota.vercel.app/api/users]
```

Frontend Live URL:

```text
https://workasana-front-ui.vercel.app/
```

---

## Author

Developed by Binaybhusan Mohanta
