# 🎓 College Appointment Booking System - Backend API

A comprehensive REST API built with Node.js, Express.js, and MongoDB for managing college appointment bookings between students and professors.

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Installation & Setup](#-installation--setup)
- [Environment Variables](#-environment-variables)
- [Database Models](#-database-models)
- [API Documentation](#-api-documentation)
- [Complete Testing Guide](#-complete-testing-guide)
- [User Flow Example](#-user-flow-example)

---

## ✨ Features

- **Authentication & Authorization**
  - JWT-based authentication
  - Role-based access control (Student/Professor)
  - HTTP-only cookie storage for tokens
  - Password hashing with bcrypt

- **Professor Features**
  - Create availability time slots
  - View all appointments
  - Cancel appointments
  - Manage meeting links

- **Student Features**
  - View available professor slots
  - Book appointments
  - View personal appointments
  - See appointment status (Booked/Cancelled)

- **Security**
  - Protected routes with middleware
  - Role-based authorization
  - Secure password storage
  - Token expiration (30 minutes)

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| Node.js | Runtime Environment |
| Express.js | Web Framework |
| MongoDB | Database |
| Mongoose | ODM (Object Data Modeling) |
| JWT | Authentication Tokens |
| bcrypt | Password Hashing |
| cookie-parser | Cookie Management |
| dotenv | Environment Configuration |

---

## 📁 Project Structure

```
college-appointment-system/
│
├── src/
│   ├── config/
│   │   └── db.js                          # MongoDB connection
│   │
│   ├── controller/
│   │   ├── AuthControllers/
│   │   │   ├── login.controller.js        # Login logic
│   │   │   └── signup.controller.js       # Registration logic
│   │   │
│   │   ├── ProfessorController/
│   │   │   ├── available_time.controller.js      # Create availability
│   │   │   ├── appointments.controller.js        # View appointments
│   │   │   └── cancel_appointments.controller.js # Cancel appointments
│   │   │
│   │   └── StudentController/
│   │       ├── available_slots.controller.js     # View available slots
│   │       ├── book_slots.controller.js          # Book appointment
│   │       └── appointments.controller.js        # View appointments
│   │
│   ├── middleware/
│   │   ├── auth.middleware.js             # JWT verification
│   │   └── role.middleware.js             # Role-based authorization
│   │
│   ├── models/
│   │   ├── user.model.js                  # User schema
│   │   ├── availability.model.js          # Availability schema
│   │   └── appointment.model.js           # Appointment schema
│   │
│   ├── services/
│   │   └── appointment.service.js         # Business logic
│   │
│   ├── routes/
│   │   ├── auth.routes.js                 # Auth endpoints
│   │   ├── professor.routes.js            # Professor endpoints
│   │   └── student.routes.js              # Student endpoints
│   │
│   ├── lib/
│   │   └── generateToken.js               # JWT token generation
│   │
│   └── index.js                           # App entry point
│
├── .env                                   # Environment variables (create this)
├── .gitignore
├── package.json
└── README.md
```

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v4.4 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **npm** or **yarn** - Comes with Node.js
- **Postman** (optional, for API testing) - [Download](https://www.postman.com/downloads/)

---

## 🚀 Installation & Setup

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/college-appointment-system.git
cd college-appointment-system
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages:
- express
- mongoose
- jsonwebtoken
- bcryptjs
- cookie-parser
- dotenv
- cors

If `package.json` doesn't exist, create it with:

```bash
npm init -y
```

Then install dependencies manually:

```bash
npm install express mongoose jsonwebtoken bcryptjs cookie-parser dotenv cors
npm install --save-dev nodemon
```

### Step 3: Configure Environment Variables

Create a `.env` file in the root directory:

```bash
# Create .env file
touch .env

# Or on Windows
type nul > .env
```

Add the following configuration to `.env`:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
# Option 1: Local MongoDB
MONGODB_URI=mongodb://localhost:27017/college_appointment_system

# Option 2: MongoDB Atlas (uncomment and use this if using cloud)
# MONGODB_URI=mongodb+srv://your_username:your_password@cluster0.xxxxx.mongodb.net/college_appointment_system?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_minimum_32_characters
JWT_EXPIRE=30m

```

⚠️ **Important Security Notes:**
- Replace `JWT_SECRET` with a strong random string (minimum 32 characters)
- Never commit `.env` file to version control
- Use different secrets for production
- Generate random secret: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

### Step 4: Create .gitignore

Create a `.gitignore` file to prevent sensitive files from being committed:

```
node_modules/
.env
.DS_Store
*.log
npm-debug.log*
```

### Step 5: Update package.json Scripts

Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "start": "nodemon index.js",
    "dev": "nodemon index.js"
  }
}
```

### Step 6: Start the Server

**Development Mode (with auto-reload):**
```bash
npm run dev
```

**Production Mode:**
```bash
npm start
```

You should see:
```
✅ MongoDB Connected Successfully
🚀 Server running on port 3000
```

If you see these messages, your server is ready! 🎉

---

## 🔐 Environment Variables

| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `PORT` | Server port number | `3000` | Yes |
| `NODE_ENV` | Environment mode | `development` | Yes |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/dbname` | Yes |
| `JWT_SECRET` | Secret key for JWT signing | `mysecretkey123...` | Yes |

---

## 🗄️ Database Models

### 1. User Model

```javascript
{
  name: String,              // User's full name
  email: String,             // Unique email
  password: String,          // Hashed password (bcrypt)
  role: String,              // "student" or "professor"
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**
- `email` (unique)

---

### 2. Availability Model

```javascript
{
  professorId: ObjectId,     // Reference to User
  date: String,              // Format: "YYYY-MM-DD"
  startTime: String,         // Format: "HH:MM"
  endTime: String,           // Format: "HH:MM"
  meetingLink: String,       // Google Meet/Zoom link
  isBooked: Boolean,         // Slot booking status
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**
- `{ professorId, date, startTime, endTime }` (compound)

**Key Design Points:**
- Each document represents ONE time slot
- `isBooked` flag prevents double booking
- Atomic updates ensure slot locking
- When appointment is cancelled, `isBooked` becomes false again

---

### 3. Appointment Model

```javascript
{
  studentId: ObjectId,       // Reference to User
  professorId: ObjectId,     // Reference to User
  availabilityId: ObjectId,  // Reference to Availability
  status: String,            // "Booked" or "Cancelled"
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**
- `studentId`
- `professorId`
- `availabilityId`

---

## 📡 API Documentation

### Base URL
```
http://localhost:3000/api
```

---

## 🔑 Authentication Endpoints

### 1. Register User (Signup)

**Endpoint:** `POST http://localhost:3000/api/signup`

**Request Body:**
```json
{
  "name": "Professor One",
  "email": "prof1@college.edu",
  "password": "password123",
  "role": "professor"
}
```

**Success Response (201):**
```json
{
  "message": "User Created SuccessFully",
  "user": {
    "id": "6954d7a6a8c152d5b76a70a4",
    "name": "Professor One",
    "email": "prof1@college.edu",
    "role": "professor"
  }
}
```

**Error Responses:**

Email already exists (400):
```json
{
  "message": "User already exists",
  "success": false
}
```

**Validation Rules:**
- Email must be unique and valid format
- Role must be either "student" or "professor"
- Password minimum 6 characters
- All fields are required

---

### 2. Login

**Endpoint:** `POST http://localhost:3000/api/login`

**Request Body:**
```json
{
  "email": "prof1@college.edu",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "message": "Login successfull",
  "user": {
    "id": "66f2a8c3e8f4b9a2c1d10001",
    "name": "Professor 1",
    "email": "prof1@college.edu",
    "role": "professor"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZjJhOGMzZThmNGI5YTJjMWQxMDAwMSIsInJvbGUiOiJwcm9mZXNzb3IiLCJpYXQiOjE3NjcxNjU3NjIsImV4cCI6MTc2NzE2NzU2Mn0.MgjrPNf4Yjx_j_w0x2PYdbldQkpKQhnJgtWLGiilGhY"
}
```

**Error Response (401):**
```json
{
  "message": "Invalid email or password",
  "success": false
}
```

**Important Notes:**
- JWT token is automatically stored in HTTP-only cookie
- Cookie name: `token`
- Token expires in 30 minutes
- Cookie is automatically sent with subsequent requests

---

## 👨‍🏫 Professor Endpoints

All professor endpoints require authentication and professor role.

### 1. Create Availability

**Endpoint:** `POST http://localhost:3000/api/professor/create_availability_time`

**Headers:**
```
Cookie: token=<jwt_token>
```
*(Cookie is automatically sent by browser/Postman after login)*

**Request Body:**
```json
{
  "date": "2025-01-10",
  "startTime": "10:00",
  "endTime": "10:30",
  "meetingLink": "https://meet.google.com/abc-xyz"
}
```

**Success Response (201):**
```json
{
  "message": "Availability created",
  "availability": {
    "_id": "6954c6b05b20217cabd07f82",
    "professorId": "66f2a8c3e8f4b9a2c1d10001",
    "date": "2025-01-10",
    "startTime": "10:00",
    "endTime": "10:30",
    "meetingLink": "https://meet.google.com/abc-xyz",
    "isBooked": false,
    "createdAt": "2025-12-31T06:46:08.174Z"
  }
}
```

**Notes:**
- Date format: YYYY-MM-DD
- Time format: HH:MM (24-hour)
- Each slot is 30 minutes by default
- Professor can create multiple slots

---

### 2. View All Appointments

**Endpoint:** `GET http://localhost:3000/api/professor/appointments`

**Headers:**
```
Cookie: token=<jwt_token>
```

**Success Response (200):**
```json
{
  "messaage": "Professor appointment fetched successfully",
  "appointments": [
    {
      "studentName": "Student 2",
      "professorName": "Professor 1",
      "date": "2025-03-10",
      "startTime": "10:00",
      "endTime": "10:30",
      "status": "Booked"
    },
    {
      "studentName": "Student 1",
      "professorName": "Professor 1",
      "date": "2025-01-10",
      "startTime": "10:00",
      "endTime": "10:30",
      "status": "Cancelled"
    }
  ]
}
```

**Notes:**
- Shows all appointments for the logged-in professor
- Includes both "Booked" and "Cancelled" appointments
- No internal IDs exposed (clean response)

---

### 3. Cancel Appointment

**Endpoint:** `POST http://localhost:3000/api/professor/cancel_appointments/:appointmentId`

**Headers:**
```
Cookie: token=<jwt_token>
```

**URL Parameters:**
- `appointmentId` - MongoDB ObjectId of the appointment

**Example:**
```
POST http://localhost:3000/api/professor/cancel_appointments/6954c6e15b20217cabd07f8a
```

**Success Response (200):**
```json
{
  "message": "Appointment cancelled successfully"
}
```

**Error Responses:**

Appointment not found (404):
```json
{
  "message": "Appointment not found",
  "success": false
}
```

Not authorized (403):
```json
{
  "message": "Access Denied",
  "success": false
}
```

**Important:**
- Only the professor who owns the appointment can cancel it
- Cancelling sets appointment status to "Cancelled"
- The availability slot becomes available again (`isBooked = false`)
- Students can see the cancelled status when viewing their appointments

---

## 👨‍🎓 Student Endpoints

All student endpoints require authentication and student role.

### 1. View Available Slots

**Endpoint:** `GET http://localhost:3000/api/student/available-slots`

**Headers:**
```
Cookie: token=<jwt_token>
```

**Success Response (200):**
```json
{
  "message": "Available slots",
  "data": [
    {
      "_id": "6954c6b05b20217cabd07f82",
      "professorId": {
        "name": "Professor 1"
      },
      "date": "2025-01-10",
      "startTime": "10:00",
      "endTime": "10:30",
      "meetingLink": "https://meet.google.com/abc-xyz"
    },
    {
      "_id": "6954c6b05b20217cabd07f83",
      "professorId": {
        "name": "Professor 2"
      },
      "date": "2025-03-10",
      "startTime": "14:00",
      "endTime": "14:30",
      "meetingLink": "https://meet.google.com/def-uvw"
    }
  ]
}
```

**No Slots Response (200):**
```json
{
  "message": "There is no slots available "
}
```

**Notes:**
- Only shows slots where `isBooked = false`
- Shows slots from all professors
- Returns professor name with each slot
- Copy the `_id` to book a slot

---

### 2. Book Appointment

**Endpoint:** `POST http://localhost:3000/api/student/book-slot/:availabilityId`

**Headers:**
```
Cookie: token=<jwt_token>
```

**URL Parameters:**
- `availabilityId` - MongoDB ObjectId of the availability slot

**Example:**
```
POST http://localhost:3000/api/student/book-slot/6954c6b05b20217cabd07f82
```

**Success Response (201):**
```json
{
  "message": "Appointment booked successfully",
  "data": {
    "studentId": "66f2a8c3e8f4b9a2c1d10102",
    "professorId": "66f2a8c3e8f4b9a2c1d10001",
    "availabilityId": "6954c6b05b20217cabd07f82",
    "status": "Booked",
    "_id": "6954c6e15b20217cabd07f8a",
    "createdAt": "2025-12-31T06:46:57.174Z",
    "updatedAt": "2025-12-31T06:46:57.174Z",
    "__v": 0
  }
}
```

**Error Responses:**

Slot already booked (400):
```json
{
  "message": "This slot is already booked"
}
```

Slot not found (404):
```json
{
  "message": "Availability slot not found"
}
```

**Booking Process:**
1. System checks if slot exists
2. Checks if slot is already booked (`isBooked = true`)
3. Creates appointment record
4. Updates slot to `isBooked = true`
5. All done atomically to prevent race conditions

---

### 3. View My Appointments

**Endpoint:** `GET http://localhost:3000/api/student/appointments`

**Headers:**
```
Cookie: token=<jwt_token>
```

**Success Response (200):**
```json
{
  "messaage": "Studnet appointment fetched successfully",
  "appointments": [
    {
      "studentName": "Student 1",
      "professorName": "Professor 1",
      "date": "2025-01-10",
      "startTime": "10:00",
      "endTime": "10:30",
      "status": "Cancelled"
    }
  ]
}
```

**No Appointments Response (200):**
```json
{
  "message": "There is no slots available "
}
```

**Notes:**
- Shows all appointments for logged-in student
- Includes cancelled appointments
- Clean response without internal IDs

---

## 🧪 Complete Testing Guide

### Testing with Postman

#### Initial Setup in Postman

1. **Download and Install Postman** from [postman.com](https://www.postman.com/downloads/)

2. **Create New Collection**
   - Click "New" → "Collection"
   - Name it: "College Appointment System"

3. **Enable Cookie Handling**
   - Postman automatically handles cookies
   - No additional setup needed

---

### Complete Test Sequence

#### Phase 1: Create Test Users

**Test 1: Register Professor**

```
POST http://localhost:3000/api/signup
Content-Type: application/json

Body:
{
  "name": "Professor 1",
  "email": "prof1@college.edu",
  "password": "password",
  "role": "professor"
}

Expected Response (201):
{
  "message": "User Created SuccessFully",
  "user": {
    "id": "66f2a8c3e8f4b9a2c1d10001",
    "name": "Professor 1",
    "email": "prof1@college.edu",
    "role": "professor"
  }
}
```

---

**Test 2: Register Student 1**

```
POST http://localhost:3000/api/signup
Content-Type: application/json

Body:
{
  "name": "Student 1",
  "email": "student1@college.edu",
  "password": "password",
  "role": "student"
}

Expected Response (201):
{
  "message": "User Created SuccessFully",
  "user": {
    "id": "66f2a8c3e8f4b9a2c1d10102",
    "name": "Student 1",
    "email": "student1@college.edu",
    "role": "student"
  }
}
```

---

**Test 3: Register Student 2**

```
POST http://localhost:3000/api/signup
Content-Type: application/json

Body:
{
  "name": "Student 2",
  "email": "student2@college.edu",
  "password": "password",
  "role": "student"
}

Expected Response (201):
{
  "message": "User Created SuccessFully",
  "user": {
    "id": "66f2a8c3e8f4b9a2c1d10103",
    "name": "Student 2",
    "email": "student2@college.edu",
    "role": "student"
  }
}
```

---

#### Phase 2: Professor Creates Availability

**Test 4: Login as Professor**

```
POST http://localhost:3000/api/login
Content-Type: application/json

Body:
{
  "email": "prof1@college.edu",
  "password": "password"
}

Expected Response (200):
{
  "message": "Login successfull",
  "user": {
    "id": "66f2a8c3e8f4b9a2c1d10001",
    "name": "Professor 1",
    "email": "prof1@college.edu",
    "role": "professor"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**⭐ Important:** After this request, Postman automatically stores the cookie!

---

**Test 5: Create Slot 1**

```
POST http://localhost:3000/api/professor/create_availability_time
Content-Type: application/json

Body:
{
  "date": "2025-01-10",
  "startTime": "10:00",
  "endTime": "10:30",
  "meetingLink": "https://meet.google.com/p1-slot1"
}

Expected Response (201):
{
  "message": "Availability created",
  "availability": {
    "_id": "6954c6b05b20217cabd07f82",
    "professorId": "66f2a8c3e8f4b9a2c1d10001",
    "date": "2025-01-10",
    "startTime": "10:00",
    "endTime": "10:30",
    "meetingLink": "https://meet.google.com/p1-slot1",
    "isBooked": false,
    "createdAt": "2025-12-31T06:46:08.174Z"
  }
}
```

---

**Test 6: Create Slot 2**

```
POST http://localhost:3000/api/professor/create_availability_time
Content-Type: application/json

Body:
{
  "date": "2025-03-10",
  "startTime": "10:00",
  "endTime": "10:30",
  "meetingLink": "https://meet.google.com/p1-slot2"
}

Expected Response (201):
{
  "message": "Availability created",
  "availability": {
    "_id": "6954c6b05b20217cabd07f83",
    "professorId": "66f2a8c3e8f4b9a2c1d10001",
    "date": "2025-03-10",
    "startTime": "10:00",
    "endTime": "10:30",
    "meetingLink": "https://meet.google.com/p1-slot2",
    "isBooked": false,
    "createdAt": "2025-12-31T06:47:15.234Z"
  }
}
```

---

#### Phase 3: Student 1 Books Slot

**Test 7: Login as Student 1**

```
POST http://localhost:3000/api/login
Content-Type: application/json

Body:
{
  "email": "student1@college.edu",
  "password": "password"
}

Expected Response (200):
{
  "message": "Login successfull",
  "user": {
    "id": "66f2a8c3e8f4b9a2c1d10102",
    "name": "Student 1",
    "email": "student1@college.edu",
    "role": "student"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

**Test 8: View Available Slots**

```
GET http://localhost:3000/api/student/available-slots

Expected Response (200):
{
  "message": "Available slots",
  "data": [
    {
      "_id": "6954c6b05b20217cabd07f82",
      "professorId": {
        "name": "Professor 1"
      },
      "date": "2025-01-10",
      "startTime": "10:00",
      "endTime": "10:30",
      "meetingLink": "https://meet.google.com/p1-slot1"
    },
    {
      "_id": "6954c6b05b20217cabd07f83",
      "professorId": {
        "name": "Professor 1"
      },
      "date": "2025-03-10",
      "startTime": "10:00",
      "endTime": "10:30",
      "meetingLink": "https://meet.google.com/p1-slot2"
    }
  ]
}
```

**📝 Note:** Copy the first `_id` (6954c6b05b20217cabd07f82) to use in next request.

---

**Test 9: Book Slot 1**

```
POST http://localhost:3000/api/student/book-slot/6954c6b05b20217cabd07f82

Expected Response (201):
{
  "message": "Appointment booked successfully",
  "data": {
    "studentId": "66f2a8c3e8f4b9a2c1d10102",
    "professorId": "66f2a8c3e8f4b9a2c1d10001",
    "availabilityId": "6954c6b05b20217cabd07f82",
    "status": "Booked",
    "_id": "6954c6e15b20217cabd07f8a",
    "createdAt": "2025-12-31T06:46:57.174Z",
    "updatedAt": "2025-12-31T06:46:57.174Z",
    "__v": 0
  }
}
```

---

#### Phase 4: Student 2 Books Another Slot

**Test 10: Login as Student 2**

```
POST http://localhost:3000/api/login
Content-Type: application/json

Body:
{
  "email": "student2@college.edu",
  "password": "password"
}

Expected Response (200):
{
  "message": "Login successfull",
  "user": {
    "id": "66f2a8c3e8f4b9a2c1d10103",
    "name": "Student 2",
    "email": "student2@college.edu",
    "role": "student"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

**Test 11: View Available Slots**

```
GET http://localhost:3000/api/student/available-slots

Expected Response (200):
{
  "message": "Available slots",
  "data": [
    {
      "_id": "6954c6b05b20217cabd07f83",
      "professorId": {
        "name": "Professor 1"
      },
      "date": "2025-03-10",
      "startTime": "10:00",
      "endTime": "10:30",
      "meetingLink": "https://meet.google.com/p1-slot2"
    }
  ]
}
```

**Note:** Only one slot available now (first slot is booked by Student 1)

---

**Test 12: Book Slot 2**

```
POST http://localhost:3000/api/student/book-slot/6954c6b05b20217cabd07f83

Expected Response (201):
{
  "message": "Appointment booked successfully",
  "data": {
    "studentId": "66f2a8c3e8f4b9a2c1d10103",
    "professorId": "66f2a8c3e8f4b9a2c1d10001",
    "availabilityId": "6954c6b05b20217cabd07f83",
    "status": "Booked",
    "_id": "6954c7205b20217cabd07f92",
    "createdAt": "2025-12-31T06:48:00.456Z",
    "updatedAt": "2025-12-31T06:48:00.456Z",
    "__v": 0
  }
}
```

---

#### Phase 5: Professor Manages Appointments

**Test 13: Login as Professor Again**

```
POST http://localhost:3000/api/login
Content-Type: application/json

Body:
{
  "email": "prof1@college.edu",
  "password": "password"
}

Expected Response (200):
{
  "message": "Login successfull",
  "user": {
    "id": "66f2a8c3e8f4b9a2c1d10001",
    "name": "Professor 1",
    "email": "prof1@college.edu",
    "role": "professor"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

**Test 14: View All Appointments**

```
GET http://localhost:3000/api/professor/appointments

Expected Response (200):
{
  "messaage": "Professor appointment fetched successfully",
  "appointments": [
    {
      "studentName": "Student 1",
      "professorName": "Professor 1",
      "date": "2025-01-10",
      "startTime": "10:00",
      "endTime": "10:30",
      "status": "Booked"
    },
    {
      "studentName": "Student 2",
      "professorName": "Professor 1",
      "date": "2025-03-10",
      "startTime": "10:00",
      "endTime": "10:30",
      "status": "Booked"
    }
  ]
}
```

**📝 Note:** Both appointments are shown. You can cancel any appointment using its ID from the database.

---

**Test 15: Cancel Student 1's Appointment**

```
POST http://localhost:3000/api/professor/cancel_appointments/6954c6e15b20217cabd07f8a

Expected Response (200):
{
  "message": "Appointment cancelled successfully"
}
```

**Note:** Use the appointment `_id` from Test 9's response.

---

#### Phase 6: Verify Cancellation

**Test 16: Login as Student 1**

```
POST http://localhost:3000/api/login
Content-Type: application/json

Body:
{
  "email": "student1@college.edu",
  "password": "password"
}

Expected Response (200):
{
  "message": "Login successfull",
  "user": {
    "id": "66f2a8c3e8f4b9a2c1d10102",
    "name": "Student 1",
    "email": "student1@college.edu",
    "role": "student"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

**Test 17: Check My Appointments**

```
GET http://localhost:3000/api/student/appointments

Expected Response (200):
{
  "messaage": "Studnet appointment fetched successfully",
  "appointments": [
    {
      "studentName": "Student 1",
      "professorName": "Professor 1",
      "date": "2025-01-10",
      "startTime": "10:00",
      "endTime": "10:30",
      "status": "Cancelled"
    }
  ]
}
```

**✅ Status changed to "Cancelled"**

---

#### Phase 7: Verify Slot is Available Again

**Test 18: View Available Slots Again**

```
GET http://localhost:3000/api/student/available-slots

Expected Response (200):
{
  "message": "Available slots",
  "data": [
    {
      "_id": "6954c6b05b20217cabd07f82",
      "professorId": {
        "name": "Professor 1"
      },
      "date": "2025-01-10",
      "startTime": "10:00",
      "endTime": "10:30",
      "meetingLink": "https://meet.google.com/p1-slot1"
    }
  ]
}
```

**✅ First slot is available again after cancellation!**

---

### Testing Authorization (Access Denied)

**Test 19: Student Tries Professor Endpoint**

First, make sure you're logged in as a student (Test 16), then try:

```
POST http://localhost:3000/api/professor/create_availability_time
Content-Type: application/json

Body:
{
  "date": "2025-01-15",
  "startTime": "14:00",
  "endTime": "14:30",
  "meetingLink": "https://meet.google.com/test"
}

Expected Response (403):
{
  "message": "Access Denied",
  "success": false
}
```

**✅ Role-based authorization is working correctly!**

---

## 🔄 User Flow Example

This demonstrates the complete assignment flow:

```
┌─────────────────────────────────────────────────────────────┐
│  Complete Appointment Booking Flow                           │
└─────────────────────────────────────────────────────────────┘

Step 1: Student A1 logs in
   → POST http://localhost:3000/api/login
   → email: student1@college.edu
   ✅ Receives JWT token in cookie

Step 2: Professor P1 logs in
   → POST http://localhost:3000/api/login
   → email: prof1@college.edu
   ✅ Receives JWT token in cookie

Step 3: Professor P1 creates availability slots
   → POST http://localhost:3000/api/professor/create_availability_time
   → Creates Slot T1: Jan 10, 10:00-10:30
   → Creates Slot T2: Mar 10, 10:00-10:30
   ✅ Both slots created with isBooked = false

Step 4: Student A1 views available slots
   → GET http://localhost:3000/api/student/available-slots
   ✅ Sees both T1 and T2 (both unbooked)

Step 5: Student A1 books slot T1
   → POST http://localhost:3000/api/student/book-slot/{T1_availabilityId}
   ✅ Appointment created
   ✅ T1 slot: isBooked = true
   ✅ Status: "Booked"

Step 6: Student A2 logs in
   → POST http://localhost:3000/api/login
   → email: student2@college.edu
   ✅ Receives JWT token in cookie

Step 7: Student A2 books slot T2
   → GET http://localhost:3000/api/student/available-slots
   ✅ Sees only T2 (T1 is booked, T2 is available)
   → POST http://localhost:3000/api/student/book-slot/{T2_availabilityId}
   ✅ Appointment created
   ✅ T2 slot: isBooked = true
   ✅ Status: "Booked"

Step 8: Professor P1 cancels A1's appointment
   → GET http://localhost:3000/api/professor/appointments
   ✅ Sees both appointments (A1 and A2)
   → POST http://localhost:3000/api/professor/cancel_appointments/{A1_appointmentId}
   ✅ A1's appointment: status = "Cancelled"
   ✅ T1 slot: isBooked = false (available again)

Step 9: Student A1 checks appointments
   → GET http://localhost:3000/api/student/appointments
   ✅ Sees appointment with status: "Cancelled"
   ✅ Can now book a new slot if needed

Step 10: Verify slot is available
   → GET http://localhost:3000/api/student/available-slots
   ✅ T1 slot appears in available slots again
```

---

## 📝 Quick Reference - All Endpoints

| Method | Endpoint | Role | Description |
|--------|----------|------|-------------|
| `POST` | `http://localhost:3000/api/signup` | Public | Register new user |
| `POST` | `http://localhost:3000/api/login` | Public | User login |
| `POST` | `http://localhost:3000/api/professor/create_availability_time` | Professor | Create availability slot |
| `GET` | `http://localhost:3000/api/professor/appointments` | Professor | View all appointments |
| `POST` | `http://localhost:3000/api/professor/cancel_appointments/:id` | Professor | Cancel appointment |
| `GET` | `http://localhost:3000/api/student/available-slots` | Student | View available slots |
| `POST` | `http://localhost:3000/api/student/book-slot/:id` | Student | Book appointment |
| `GET` | `http://localhost:3000/api/student/appointments` | Student | View my appointments |

---

## 🚀 Quick Start Summary

```bash
# 1. Clone and install
git clone https://github.com/yourusername/college-appointment-system.git
cd college-appointment-system
npm install

# 2. Set up environment
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret

# 3. Start MongoDB
# Windows: net start MongoDB
# Mac: brew services start mongodb-community
# Linux: sudo systemctl start mongod

# 4. Start server
npm run dev

# 5. Test with Postman
# Follow the 19-step testing guide above
```

