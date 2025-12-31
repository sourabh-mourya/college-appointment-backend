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
- [Testing with Postman](#-testing-with-postman)
- [User Flow Example](#-user-flow-example)
- [Common Issues](#-common-issues--solutions)

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

### Step 3: Set Up MongoDB

**Option A: Local MongoDB**

1. Install MongoDB Community Edition
2. Start MongoDB service:
   ```bash
   # Windows
   net start MongoDB
   
   # Mac
   brew services start mongodb-community
   
   # Linux
   sudo systemctl start mongod
   ```

3. Verify MongoDB is running:
   ```bash
   mongosh
   # or
   mongo
   ```

**Option B: MongoDB Atlas (Cloud)**

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (free tier available)
3. Create a database user with password
4. Whitelist your IP address (or use 0.0.0.0/0 for testing)
5. Get your connection string (looks like): 
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/
   ```

### Step 4: Configure Environment Variables

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

# Cookie Configuration
COOKIE_EXPIRE=30
```

⚠️ **Important Security Notes:**
- Replace `JWT_SECRET` with a strong random string (minimum 32 characters)
- Never commit `.env` file to version control
- Use different secrets for production
- Generate random secret: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

### Step 5: Create .gitignore

Create a `.gitignore` file to prevent sensitive files from being committed:

```
node_modules/
.env
.DS_Store
*.log
npm-debug.log*
```

### Step 6: Update package.json Scripts

Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "start": "node src/index.js",
    "dev": "nodemon src/index.js"
  }
}
```

### Step 7: Start the Server

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
🚀 Server running on port 5000
```

If you see these messages, your server is ready! 🎉

---

## 🔐 Environment Variables

| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `PORT` | Server port number | `5000` | Yes |
| `NODE_ENV` | Environment mode | `development` | Yes |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/dbname` | Yes |
| `JWT_SECRET` | Secret key for JWT signing | `mysecretkey123...` | Yes |
| `JWT_EXPIRE` | Token expiration time | `30m` | Yes |
| `COOKIE_EXPIRE` | Cookie expiration (minutes) | `30` | Yes |

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
http://localhost:5000/api
```

---

## 🔑 Authentication Endpoints

### 1. Register User (Signup)

**Endpoint:** `POST /api/signup`

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
  "message": "User registered successfully"
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

**Endpoint:** `POST /api/login`

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
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
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

**Endpoint:** `POST /api/professor/create_availability_time`

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

**Endpoint:** `GET /api/professor/appointments`

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

**Endpoint:** `POST /api/professor/cancel_appointments/:appointmentId`

**Headers:**
```
Cookie: token=<jwt_token>
```

**URL Parameters:**
- `appointmentId` - MongoDB ObjectId of the appointment

**Example:**
```
POST /api/professor/cancel_appointments/6954c6e15b20217cabd07f8a
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

**Endpoint:** `GET /api/student/available-slots`

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
  "message": "There is no slots available"
}
```

**Notes:**
- Only shows slots where `isBooked = false`
- Shows slots from all professors
- Returns professor name with each slot
- Copy the `_id` to book a slot

---

### 2. Book Appointment

**Endpoint:** `POST /api/student/book-slot/:availabilityId`

**Headers:**
```
Cookie: token=<jwt_token>
```

**URL Parameters:**
- `availabilityId` - MongoDB ObjectId of the availability slot

**Example:**
```
POST /api/student/book-slot/6954c6b05b20217cabd07f82
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

**Endpoint:** `GET /api/student/appointments`

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
  "message": "There is no slots available"
}
```

**Notes:**
- Shows all appointments for logged-in student
- Includes cancelled appointments
- Clean response without internal IDs

---

## 🧪 Testing with Postman

### Initial Setup in Postman

1. **Download and Install Postman** from [postman.com](https://www.postman.com/downloads/)

2. **Create New Collection**
   - Click "New" → "Collection"
   - Name it: "College Appointment System"

3. **Set Base URL Variable**
   - Click on Collection → "Variables" tab
   - Add variable:
     - Variable: `baseUrl`
     - Initial Value: `http://localhost:5000/api`
     - Current Value: `http://localhost:5000/api`

4. **Enable Cookie Handling**
   - Postman automatically handles cookies
   - No additional setup needed

---

### Complete Test Flow

#### Phase 1: Create Test Users

**Request 1: Register Professor**
```
POST {{baseUrl}}/signup
Content-Type: application/json

Body:
{
  "name": "Professor 1",
  "email": "prof1@college.edu",
  "password": "password",
  "role": "professor"
}
```

**Request 2: Register Student 1**
```
POST {{baseUrl}}/signup
Content-Type: application/json

Body:
{
  "name": "Student 1",
  "email": "student1@college.edu",
  "password": "password",
  "role": "student"
}
```

**Request 3: Register Student 2**
```
POST {{baseUrl}}/signup
Content-Type: application/json

Body:
{
  "name": "Student 2",
  "email": "student2@college.edu",
  "password": "password",
  "role": "student"
}
```

---

#### Phase 2: Professor Creates Availability

**Request 4: Login as Professor**
```
POST {{baseUrl}}/login
Content-Type: application/json

Body:
{
  "email": "prof1@college.edu",
  "password": "password"
}
```

**⭐ Important:** After this request, Postman automatically stores the cookie. You don't need to copy/paste tokens!

**Request 5: Create Slot 1**
```
POST {{baseUrl}}/professor/create_availability_time
Content-Type: application/json

Body:
{
  "date": "2025-01-10",
  "startTime": "10:00",
  "endTime": "10:30",
  "meetingLink": "https://meet.google.com/p1-slot1"
}
```

**Request 6: Create Slot 2**
```
POST {{baseUrl}}/professor/create_availability_time
Content-Type: application/json

Body:
{
  "date": "2025-03-10",
  "startTime": "10:00",
  "endTime": "10:30",
  "meetingLink": "https://meet.google.com/p1-slot2"
}
```

---

#### Phase 3: Student 1 Books Slot

**Request 7: Login as Student 1**
```
POST {{baseUrl}}/login
Content-Type: application/json

Body:
{
  "email": "student1@college.edu",
  "password": "password"
}
```

**Request 8: View Available Slots**
```
GET {{baseUrl}}/student/available-slots
```

**📝 Note:** Copy one `_id` from the response to use in next request.

**Request 9: Book Slot**
```
POST {{baseUrl}}/student/book-slot/PASTE_AVAILABILITY_ID_HERE

Example:
POST {{baseUrl}}/student/book-slot/6954c6b05b20217cabd07f82
```

---

#### Phase 4: Student 2 Books Another Slot

**Request 10: Login as Student 2**
```
POST {{baseUrl}}/login
Content-Type: application/json

Body:
{
  "email": "student2@college.edu",
  "password": "password"
}
```

**Request 11: View Available Slots**
```
GET {{baseUrl}}/student/available-slots
```

**Request 12: Book Different Slot**
```
POST {{baseUrl}}/student/book-slot/PASTE_DIFFERENT_AVAILABILITY_ID
```

---

#### Phase 5: Professor Manages Appointments

**Request 13: Login as Professor Again**
```
POST {{baseUrl}}/login
Content-Type: application/json

Body:
{
  "email": "prof1@college.edu",
  "password": "password"
}
```

**Request 14: View All Appointments**
```
GET {{baseUrl}}/professor/appointments
```

**📝 Note:** Copy an `appointmentId` (the `_id` field from appointment data) to cancel it.

**Request 15: Cancel Student 1's Appointment**
```
POST {{baseUrl}}/professor/cancel_appointments/PASTE_APPOINTMENT_ID_HERE

Example:
POST {{baseUrl}}/professor/cancel_appointments/6954c6e15b20217cabd07f8a
```

---

#### Phase 6: Verify Cancellation

**Request 16: Login as Student 1**
```
POST {{baseUrl}}/login
Content-Type: application/json

Body:
{
  "email": "student1@college.edu",
  "password": "password"
}
```

**Request 17: Check My Appointments**
```
GET {{baseUrl}}/student/appointments
```

**Expected:** You should see status: "Cancelled"

---

### Testing Authorization (Access Denied)

**Request 18: Try Professor Endpoint as Student**

First, login as student:
```
POST {{baseUrl}}/login
Content-Type: application/json

Body:
{
  "email": "student1@college.edu",
  "password": "password"
}
```

Then try to create availability (should fail):
```
POST {{baseUrl}}/professor/create_availability_time
Content-Type: application/json

Body:
{
  "date": "2025-01-15",
  "startTime": "14:00",
  "endTime": "14:30",
  "meetingLink": "https://meet.google.com/test"
}
```

**Expected Response (403):**
```json
{
  "message": "Access Denied",
  "success": false
}
```

This confirms role-based authorization is working! ✅

---

## 🔄 User Flow Example

This demonstrates the complete assignment flow:

```
┌─────────────────────────────────────────────────────────────┐
│  Complete Appointment Booking Flow                           │
└─────────────────────────────────────────────────────────────┘

Step 1: Student A1 logs in
   → POST /api/login
   → email: student1@college.edu
   ✅ Receives JWT token in cookie

Step 2: Professor P1 logs in
   → POST /api/login
   → email: prof1@college.edu
   ✅ Receives JWT token in cookie

Step 3: Professor P1 creates availability slots
   → POST /api/professor/create_availability_time
   → Creates Slot T1: Jan 10, 10:00-10:30
   → Creates Slot T2: Mar 10, 10:00-10:30
   ✅ Both slots created with isBooked = false

Step 4: Student A1 views available slots
   → GET /api/student/available-slots
   ✅ Sees both T1 and T2 (both unbooked)

Step 5: Student A1 books slot T1
   → POST /api/student/book-slot/{T1_availabilityId}
   ✅ Appointment created
   ✅ T1 slot: isBooked = true
   ✅ Status: "Booked"

Step 6: Student A2 logs in
   → POST /api/login
   → email: student2@college.edu
   ✅ Receives JWT token in cookie

Step 7: Student A2 books slot T2
   → GET /api/student/available-slots
   ✅ Sees only T2 (T1 is booked, T2 is available)
   → POST /api/student/book-slot/{T2_availabilityId}
   ✅ Appointment created
   ✅ T2 slot: isBooked = true
   ✅ Status: "Booked"

Step 8: Professor P1 cancels A1's appointment
   → GET /api/professor/appointments
   ✅ Sees both appointments (A1 and A2)
   → POST /api/professor/cancel_appointments/{A1_appointmentId}
   ✅ A1's appointment: status = "Cancelled"
   ✅ T1 slot: isBooked = false (available again)

Step 9: Student A1 checks appointments
   → GET /api/student/appointments
   ✅ Sees appointment with status: "Cancelled"
   ✅ Can now book a new slot if needed

```

---

## 🐛 Common Issues & Solutions

### Issue 1: MongoDB Connection Failed

**Error Message:**
```
MongooseServerSelectionError: connect ECONNREFUSED 127.0.0.1:27017
```

**Solutions:**

1. **Check if MongoDB is running:**
   ```bash
   # Windows
   net start MongoDB
   
   # Mac
   brew services start mongodb-community
   
   # Linux
   sudo systemctl status mongod
   sudo systemctl start mongod
   ```

2. **Verify MongoDB URI in .env:**
   ```env
   MONGODB_URI=mongodb://localhost:27017/college_appointment_system
   ```

3. **For MongoDB Atlas:**
   - Check username and password are correct
   - Verify IP address is whitelisted (or use 0.0.0.0/0)
   - Check connection string format

---

### Issue 2: Port Already in Use

**Error Message:**
```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solutions:**

1. **Kill process using port 5000:**
   ```bash
   # Windows
   netstat -ano | findstr :5000
   taskkill /PID <PID_NUMBER> /F
   
   # Mac/Linux
   lsof -i :5000
   kill -9 <PID>
   ```

2. **Change port in .env:**
   ```env
   PORT=5001
   ```

---

### Issue 3: JWT Token Invalid/Expired

**Error Message:**
```json
{
  "message": "Authentication failed",
  "success": false
}
```

**Solutions:**

1. **Login again** - Token expires after 30 minutes
2. **Check cookie in Postman:**
   - Go to Cookies (under Send button)
   - Verify token exists for localhost:5000
3. **Clear cookies and login fresh:**
   - Postman: Cookies → Remove All
   - Then login again

---

### Issue 4: Access Denied (403)

**Error Message:**
```json
{
  "message": "Access Denied",
  "success": false
}
```

**Solutions:**

1. **Check your role:**
   - Students cannot access `/api/professor/*` endpoints
   - Professors cannot access `/api/student/*` endpoints

2. **Login with correct credentials:**
   - For professor endpoints: login as professor
   - For student endpoints: login as student

3. **Verify you're logged in:**
   - Check if cookie exists
   - Try logging in again

---

### Issue 5: Slot Already Booked

**Error Message:**
```json
{
  "message": "This slot is already booked"
}
```

**Solutions:**

1. **Fetch available slots again:**
   ```
   GET /api/student/available-slots
   ```
   The booked slot won't appear in results

2. **Choose a different slot** from available ones

3. **Wait for professor to cancel** if you need that specific slot

---

### Issue 6: Module Not Found

**Error Message:**
```
Error: Cannot find module 'express'
```

**Solution:**
```bash
npm install
```

If problem persists:
```bash
rm -rf node_modules
rm package-lock.json
npm install
```

---

### Issue 7
