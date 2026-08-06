# 🎯 GenAI Job Preparation - AI-Powered Interview Strategy & Resume Analyzer

A production-grade, full-stack AI interview preparation and resume analysis platform. Built with **Node.js, Express, MongoDB (Mongoose), and Google Gemini AI** on the backend, and a modern **React + Vite** frontend.

---

## 🚀 Key Features

* **AI-Powered Resume & Job Matching:** Calculates a 0-100% role match score by analyzing your resume against target job descriptions using Google Gemini AI.
* **ATS Keyword & Skill Gap Analysis:** Pinpoints missing keywords, hard skills, and soft skills to pass Applicant Tracking Systems (ATS).
* **Technical & Behavioral Question Generation:** Generates customized technical questions with detailed model answers and behavioral STAR scenario questions.
* **Personalized 7-Day Interview Roadmap:** Builds a step-by-step preparation roadmap tailored to the job requirements.
* **Automated Welcome & Credentials Email:** Sends account login credentials to newly registered users via Nodemailer SMTP.
* **Email & PDF Export:** Download complete interview preparation reports as a PDF or email them directly to your inbox.
* **Secure Authentication:** JWT-based session security with httpOnly cookies, password hashing (`bcryptjs`), and token blacklisting on logout.
* **Interactive Landing Page & Dashboard:** Features a modern dark-theme landing page with live sample report previews, dynamic profile navigation, and recent report history.

---

## 📁 Project Folder Structure

```
Gen AI-Job Preparation/
├── Backend/                  # Express & Node.js Backend Server
│   ├── server.js             # Entry point & Database connection
│   ├── package.json          # Backend dependencies
│   ├── vercel.json           # Vercel deployment configuration
│   └── src/
│       ├── app.js            # Express app configuration & CORS
│       ├── config/           # Database setup (MongoDB Mongoose)
│       ├── controllers/      # Route controllers (Auth, Interview)
│       ├── middlewares/      # Authentication, Validation, Multer Uploads
│       ├── models/           # Mongoose schemas (User, InterviewReport, BlackList)
│       ├── routes/           # API Endpoints (auth.routes, interview.routes)
│       └── services/         # Business logic layer (Gemini AI Service, Email Service)
├── Frontend/                 # React + Vite SPA Application
│   ├── package.json          # Frontend dependencies
│   ├── vite.config.js        # Vite configuration
│   ├── vercel.json           # Client routing configuration
│   └── src/
│       ├── App.jsx           # Main container
│       ├── app.routes.jsx    # React Router definitions
│       ├── components/       # Reusable UI components (Navbar)
│       ├── features/         # Feature modules
│       │   ├── auth/         # Auth Context, Hooks, Pages (Login, Register)
│       │   └── interview/    # Interview Context, Hooks, Pages (LandingPage, Home, Interview)
│       └── style/            # SCSS styling & CSS design system
└── README.md                 # Project documentation
```

---

## ⚡ Quick Start Guide

### Prerequisites
* **Node.js** (v18+)
* **MongoDB** instance (Local or MongoDB Atlas)
* **Google Gemini AI API Key** (`GOOGLE_GENAI_API_KEY`)

---

### Step 1: Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file in the `Backend/` directory:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/interview-master
JWT_SECRET=your_jwt_secret_key
CLIENT_URL=http://localhost:5173

# Google GenAI Key
GOOGLE_GENAI_API_KEY=your_google_gemini_api_key

# Email SMTP Credentials (Optional - defaults to test account if omitted)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_16_digit_app_password
EMAIL_FROM="GenAI Job Prep" <your_email@gmail.com>
```

Start the backend development server:

```bash
npm run dev
```

The backend server will run at `http://localhost:5000/`.

---

### Step 2: Frontend Setup

Open a new terminal window:

```bash
cd Frontend
npm install
```

Create a `.env` file in the `Frontend/` directory:

```env
VITE_API_URL=http://localhost:5000
```

Start the frontend development server:

```bash
npm run dev
```

The React frontend application will launch at `http://localhost:5173/`.

---

## 🔌 API Endpoints Summary

### 🔐 Authentication (`/api/auth`)

| Method | Endpoint | Description | Access |
|---|---|---|---|
| `POST` | `/api/auth/register` | Register a new user account & send credentials email | Public |
| `POST` | `/api/auth/login` | User login & set httpOnly JWT cookie | Public |
| `GET` | `/api/auth/logout` | User logout & blacklist JWT session token | Public |
| `GET` | `/api/auth/get-me` | Get current logged-in user profile details | Protected |

---

### 🎯 Interview & Strategy Reports (`/api/interview`)

| Method | Endpoint | Description | Access |
|---|---|---|---|
| `POST` | `/api/interview/` | Generate new AI report (Job Description + Resume PDF/DOCX or Self Description) | Protected |
| `GET` | `/api/interview/` | Get all interview reports belonging to logged-in user | Protected |
| `GET` | `/api/interview/report/:interviewId` | Get specific interview report details by ID | Protected |
| `POST` | `/api/interview/resume/pdf/:interviewReportId` | Generate and download interview report as a PDF | Protected |
| `POST` | `/api/interview/email/:interviewId` | Email interview strategy report directly to user inbox | Protected |

---

## 🛠️ Technology Stack

* **Backend:** Node.js, Express.js (v5), MongoDB, Mongoose ODM, `@google/genai` (Gemini SDK), Zod, JWT, BcryptJS, Cookie-Parser, Nodemailer, Multer, PDF-Parse, Puppeteer.
* **Frontend:** React 18, Vite, React Router v7, Axios, Sass (SCSS), Custom Dark Glassmorphic Design System.
* **Deployment:** Vercel (Frontend), Render (Backend).
