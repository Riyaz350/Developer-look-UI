# Developer Look

A full-stack web application for managing authentication, user verification, and task management.

## 🔗 Live Links
- **Frontend UI**: [Developer Look UI](https://developer-look.vercel.app/)
- **API Base URL**: [Developer Look API](https://developer-look-api.vercel.app/api/v1)

## 📂 Repositories
- **Frontend (React/Next.js)**: [GitHub Repo](https://github.com/Riyaz350/Developer-look-UI)
- **Backend (Node.js/Express)**: [GitHub Repo](https://github.com/Riyaz350/DeveloperLookAPI)

## 🚀 Features
### Authentication System
- Users receive a **6-digit verification code** via email (expires in **2 minutes**).
- Registered users **must verify their email** before logging in.
- Users log in using their **password** and the **6-digit verification code**.
- A **JWT token** is saved in **local storage** for future authentication.

### Task Management
- Users can **create, update, and delete** their To-Do tasks.
- Each user has their **own task list**.

### Security & User Management
- **JWT-based authentication** for secure login.
- **Logout option** to clear user session.

## 🛠️ Tech Stack
- **Frontend**: React, Next.js, Tailwind CSS
- **Backend**: Node.js, Express.js, MongoDB
- **Authentication**: JWT, Email Verification
- **Deployment**: Vercel

## 📜 API Endpoints
### Authentication Routes
| Method | Endpoint         | Description  |
|--------|-----------------|--------------|
| POST   | `/auth/register` | Register a new user |
| POST   | `/auth/login`    | Login user with email & password |
| POST   | `/auth/verify`   | Verify user with 6-digit code |
| POST   | `/auth/logout`   | Logout user |

### To-Do Task Routes
| Method | Endpoint          | Description  |
|--------|------------------|--------------|
| GET    | `/tasks`         | Get all tasks for the authenticated user |
| POST   | `/tasks`         | Create a new task |
| PUT    | `/tasks/:id`     | Update a task |
| DELETE | `/tasks/:id`     | Delete a task |

## 🔧 Setup & Installation
### 1️⃣ Clone the Repositories
```sh
git clone https://github.com/Riyaz350/Developer-look-UI.git
cd Developer-look-UI
```
```sh
git clone https://github.com/Riyaz350/DeveloperLookAPI.git
cd DeveloperLookAPI
```

### 2️⃣ Install Dependencies
For **Frontend**:
```sh
cd Developer-look-UI
npm install
```
For **Backend**:
```sh
cd DeveloperLookAPI
npm install
```

### 3️⃣ Configure Environment Variables
Create a `.env` file in the backend project and add your credentials:
```sh
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_jwt_secret
EMAIL_API_KEY=your_email_api_key
```

### 4️⃣ Start the Development Servers
Frontend:
```sh
npm run dev
```
Backend:
```sh
npm start
```

## 📜 License
This project is licensed under the **MIT License**.

---

### 🎯 Future Enhancements
- **OAuth Integration (Google Login, etc.)**
- **Role-Based Access Control (RBAC)**
- **Task Categories & Reminders**

🚀 Happy Coding! Let me know if you need any modifications! 😊

