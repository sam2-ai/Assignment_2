# Login System with LocalStorage and without Models - Quiz 1

A full-stack login and registration system built with React frontend and Node.js backend.

## Features

- ✅ User Registration with Client-side Validation
- ✅ User Registration with Server-side Validation  
- ✅ Data Storage in MongoDB Databaseg
- ✅ User Login Authentication
- ✅ JWT Token-based Authentication
- ✅ Password Encryption with bcrypt
- ✅ Redirect to Login Page After Registration
- ✅ LocalStorage for Token Management
- ✅ Real-time Backend Health Monitoring

## Tech Stack

**Frontend:**
- React 18
- React Router DOM
- Tailwind CSS
- Vite

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- bcrypt for password hashing
- JWT for authentication
- express-validator for validation

## Project Structure

```
Project/
├── BackEnd-Project/          # Node.js Backend
│   ├── models/User.js        # User MongoDB Model
│   ├── myFiles/
│   │   ├── register.js       # Registration API
│   │   ├── auth.js          # Login API
│   │   └── users.js         # Users API
│   ├── utils/               # Validation utilities
│   ├── db.js               # Database connection
│   ├── index.js            # Main server file
│   └── package.json
└── FrontEnd-React-Assignment-1/  # React Frontend
    ├── src/
    │   ├── components/      # Reusable components
    │   ├── pages/          # Page components
    │   ├── services/       # API services
    │   └── utils/          # Validation utilities
    ├── package.json
    └── vite.config.js
```

## Installation & Setup

### Backend Setup
```bash
cd BackEnd-Project
npm install
node index.js
```

### Frontend Setup
```bash
cd FrontEnd-React-Assignment-1
npm install
npm run dev
```

## Environment Variables

**Important:** For security reasons, environment variables are stored in `env.txt` file instead of `.env` file when pushing to GitHub.

To use environment variables:
1. Rename `env.txt` to `.env` in your local development
2. Update the values with your actual credentials
3. The `.env` file is ignored by git for security

Example env.txt (rename to .env for local use):
```
MONGO_URI=mongodb://localhost:27017/myDBTest
JWT_SECRET=your-secret-key-here
PORT=5000
```

**Note:** The `env.txt` file contains example values only. Replace with your actual database URI and JWT secret for production use.

## API Endpoints

- `POST /api/register` - User registration
- `POST /api/login` - User login
- `GET /api/users` - Get all users
- `GET /health` - Server health check

## Validation Features

### Client-side Validation
- First/Last name: Letters only, 2-35 characters
- Email: Valid email format
- Password: Minimum 6 characters
- Confirm password matching
- Terms agreement required

### Server-side Validation
- Express-validator for input validation
- Duplicate email prevention
- Password encryption with bcrypt
- Structured error responses

## Usage

1. Start MongoDB service
2. Run backend server: `node index.js`
3. Run frontend: `npm run dev`
4. Register new user at `/signup`
5. Login with credentials at `/login`
6. View registered users at `/users`

## Database

Users are stored in MongoDB with the following schema:
- firstName, lastName, email, password (hashed)
- country, agreeToTerms, timestamps

## Authentication Flow

1. User registers → Data saved to DB → Redirect to login
2. User logs in → JWT token generated → Stored in localStorage
3. Protected routes use token for authentication

## Author

Created for AWD Course - 5th Semester Project