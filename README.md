# Personal Saving Tracker - AI Based Finance Management

A modern, full-stack financial management application that helps users track income, expenses, and savings goals with intelligent analysis and real-time visualization.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Frontend Features](#frontend-features)
- [Backend Features](#backend-features)
- [Usage Guide](#usage-guide)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### Financial Tracking

- **Income Management**: Record and track income from multiple sources
- **Expense Tracking**: Log expenses with categories and descriptions
- **Savings Goals**: Set financial goals and track progress toward them
- **Category Breakdown**: Visual pie charts showing expense distribution by category
- **Real-time Analytics**: Get instant insights into your financial data

### Dashboard

- Summary cards showing total income, expenses, and current savings
- Interactive pie chart visualization of expense distribution
- Category breakdown table with amounts and percentages
- Savings analysis with goal achievement predictions
- Monthly savings rate calculation
- Color-coded visual indicators

### Analysis Engine

- Intelligent goal achievement prediction
- Monthly savings requirement calculation
- Projection analysis for goal timeline
- Smart recommendations for achieving financial goals
- Real-time savings rate monitoring

### User Management

- Secure user registration and login with JWT authentication
- Profile management with editable information
- Password security with bcryptjs encryption
- Account deletion with data cleanup

## 🛠️ Tech Stack

### Frontend

- **Framework**: React 19.2.0
- **Build Tool**: Vite 7.2.5 (ROLLDOWN-VITE)
- **CSS Framework**: Bootstrap 5.3.0
- **UI Library**: react-bootstrap 2.10.0
- **Charts**: Recharts 2.10.3 (for data visualization)
- **HTTP Client**: Axios 1.13.4
- **Routing**: React Router DOM 7.13.0
- **Node**: v20+ recommended

### Backend

- **Runtime**: Node.js (v20+)
- **Framework**: Express.js
- **Database**: MongoDB
- **ODM**: Mongoose
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **Environment**: dotenv
- **CORS**: Enabled for frontend communication

### Development Tools

- ESLint for code quality
- PostCSS with autoprefixer
- npm for package management

## 📁 Project Structure

```
Personal Saving Tracker AI Based/
│
├── frontend/                          # React Vite Application
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth/
│   │   │   │   ├── Login.jsx         # Login page with form validation
│   │   │   │   ├── Register.jsx      # Registration page
│   │   │   │   └── ProtectedRoute.jsx # Route protection wrapper
│   │   │   ├── Dashboard/
│   │   │   │   └── Dashboard.jsx     # Main dashboard with charts & forms
│   │   │   ├── Profile/
│   │   │   │   └── ProfileView.jsx   # User profile management
│   │   │   └── Shared/
│   │   │       ├── Navbar.jsx        # Navigation bar
│   │   │       ├── ErrorMessage.jsx  # Error alert component
│   │   │       └── Loader.jsx        # Loading spinner
│   │   ├── contexts/
│   │   │   ├── AuthContext.jsx       # Authentication state
│   │   │   └── ExpenseContext.jsx    # Expense state management
│   │   ├── hooks/
│   │   │   ├── useAuth.js            # Auth hook
│   │   │   └── useInactivityLogout.js # Auto-logout on inactivity
│   │   ├── services/
│   │   │   ├── api.js                # API base configuration
│   │   │   ├── authService.js        # Auth API calls
│   │   │   └── expenseService.js     # Expense/goal API calls
│   │   ├── utils/
│   │   │   ├── helpers.js            # Utility functions
│   │   │   └── validators.js         # Form validators
│   │   ├── App.jsx                   # Main app component
│   │   ├── main.jsx                  # Entry point
│   │   ├── index.css                 # Global styles
│   │   └── App.css                   # App styles
│   ├── package.json
│   ├── vite.config.js
│   ├── eslint.config.js
│   └── README.md
│
├── backend/                           # Express.js Application
│   ├── config/
│   │   ├── database.js               # MongoDB connection
│   │   └── jwt.js                    # JWT configuration
│   ├── controllers/
│   │   ├── authController.js         # Auth logic (register, login)
│   │   ├── userController.js         # User management
│   │   ├── expenseControllers.js     # Expense CRUD
│   │   ├── incomeController.js       # Income CRUD
│   │   ├── goalController.js         # Goal management
│   │   └── analysisController.js     # Analytics & predictions
│   ├── middleware/
│   │   ├── authMiddleware.js         # JWT verification
│   │   ├── errorHandler.js           # Error handling
│   │   └── validators.js             # Input validation
│   ├── models/
│   │   ├── User.js                   # User schema
│   │   ├── Expense.js                # Expense schema
│   │   ├── Income.js                 # Income schema
│   │   └── SavingGoal.js             # Goal schema
│   ├── routes/
│   │   ├── authRoutes.js             # Auth endpoints
│   │   ├── userRoutes.js             # User endpoints
│   │   ├── expenseRoutes.js          # Expense endpoints
│   │   ├── incomeRoutes.js           # Income endpoints
│   │   ├── goalRoutes.js             # Goal endpoints
│   │   └── analysisRoutes.js         # Analysis endpoints
│   ├── utils/
│   │   └── analysisEngine.js         # Prediction algorithms
│   ├── server.js                     # Express app setup
│   ├── package.json
│   └── .env.example                  # Environment variables template
│
└── README.md                          # This file
```

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v20 or higher) - [Download](https://nodejs.org/)
- **npm** (v10 or higher) - comes with Node.js
- **MongoDB** (Local or Atlas Cloud) - [Download](https://www.mongodb.com/try/download/community)
- **Git** - [Download](https://git-scm.com/)

Verify installation:

```bash
node --version    # v20.0.0 or higher
npm --version     # v10.0.0 or higher
mongod --version  # MongoDB version
```

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/janzeerathnan/Personal_Saving_App.git
cd "Personal Saving Tracker AI Based"
```

### 2. Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

### 3. Frontend Setup

Navigate to the frontend directory (from project root):

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

## ⚙️ Configuration

### Backend Configuration

Create a `.env` file in the `backend/` directory:

```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/saving-tracker
# OR for MongoDB Atlas:
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/saving-tracker

# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRY=7d

# CORS Configuration (Frontend URL)
CORS_ORIGIN=http://localhost:5175
```

### Frontend Configuration

The frontend uses environment variables for API configuration. Create a `.env` file in the `frontend/` directory:

```env
VITE_API_URL=http://localhost:5000/api
```

**Note**: The frontend automatically uses these variables via `import.meta.env.VITE_*`

## ▶️ Running the Application

### Start MongoDB (if running locally)

```bash
# On macOS/Linux:
mongod

# On Windows:
# Run MongoDB as a service or use:
mongod --dbpath "C:\data\db"
```

### Start Backend Server

```bash
cd backend
npm start
# Server will run on http://localhost:5000
```

### Start Frontend Development Server

```bash
cd frontend
npm run dev
# Frontend will run on http://localhost:5175 (or next available port)
```

### Access the Application

- **Frontend**: http://localhost:5175
- **Backend API**: http://localhost:5000/api

### Build for Production

Frontend:

```bash
cd frontend
npm run build
# Creates optimized build in dist/ folder
```

Backend:

```bash
# The backend is ready for production deployment as-is
# Ensure NODE_ENV=production in .env
```

## 📡 API Documentation

### Base URL

```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User

```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

Response: 201 Created
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### Login User

```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response: 200 OK
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Expense Endpoints

#### Add Expense

```http
POST /expenses
Authorization: Bearer {token}
Content-Type: application/json

{
  "amount": 25.50,
  "title": "Grocery Shopping",
  "category": "Food"
}

Response: 201 Created
{
  "id": "expense_id",
  "amount": 25.50,
  "title": "Grocery Shopping",
  "category": "Food",
  "date": "2026-02-07T10:30:00Z"
}
```

#### Get All Expenses

```http
GET /expenses
Authorization: Bearer {token}

Response: 200 OK
{
  "expenses": [
    {
      "id": "expense_id",
      "amount": 25.50,
      "title": "Grocery Shopping",
      "category": "Food",
      "date": "2026-02-07T10:30:00Z"
    }
  ]
}
```

#### Delete Expense

```http
DELETE /expenses/:id
Authorization: Bearer {token}

Response: 200 OK
{
  "message": "Expense deleted successfully"
}
```

### Income Endpoints

#### Add Income

```http
POST /income
Authorization: Bearer {token}
Content-Type: application/json

{
  "amount": 2000,
  "source": "Salary"
}

Response: 201 Created
```

#### Get Dashboard Data

```http
GET /dashboard
Authorization: Bearer {token}

Response: 200 OK
{
  "totalIncome": 5000,
  "totalExpenses": 1500,
  "currentSavings": 3500,
  "savingRate": 70,
  "incomeCount": 2,
  "expenseCount": 8,
  "categoryBreakdown": {
    "Food": { "total": 500, "percentage": 33 },
    "Transport": { "total": 300, "percentage": 20 }
  }
}
```

### Goal Endpoints

#### Set Savings Goal

```http
POST /goals
Authorization: Bearer {token}
Content-Type: application/json

{
  "targetAmount": 10000,
  "duration": 12
}

Response: 201 Created
{
  "id": "goal_id",
  "targetAmount": 10000,
  "duration": 12,
  "status": "active"
}
```

### Analysis Endpoints

#### Get Savings Analysis

```http
GET /analysis/saving-analysis
Authorization: Bearer {token}

Response: 200 OK
{
  "analysis": {
    "currentMonthlySavings": 291.67,
    "requiredMonthlySavings": 833.33,
    "targetAmount": 10000,
    "duration": 12,
    "isAchievable": false,
    "difference": -541.66,
    "projections": {
      "monthsToReach": null,
      "projectedSavings": 3500,
      "surplus": null,
      "suggestedDuration": 29
    }
  }
}
```

## 🎨 Frontend Features

### Dashboard

- **Summary Cards**: Display income, expenses, savings, and active goals
- **Interactive Pie Chart**: Visual representation of expense distribution
- **Category Table**: Detailed breakdown with amounts and percentages
- **Input Forms**: Easy-to-use forms for adding income, expenses, and goals
- **Real-time Analysis**: Instant feedback on goal achievement status

### Navigation

- **Navbar**: Professional navigation with user greeting and logout
- **Responsive Design**: Mobile-friendly interface with Bootstrap 5.3
- **Protected Routes**: Secure pages only accessible to authenticated users

### User Management

- **Profile Page**: View and edit user information
- **Account Settings**: Manage email and name
- **Account Deletion**: Permanently delete account and associated data

### Authentication

- **Login Page**: Secure email/password authentication
- **Registration**: Easy account creation
- **Auto-logout**: Session timeout after 15 minutes of inactivity
- **Token Management**: Secure JWT token storage and validation

## 🔧 Backend Features

### Database Models

- **User**: Stores user profile and authentication data
- **Expense**: Tracks individual expenses with categories
- **Income**: Records income sources
- **SavingGoal**: Manages user financial goals

### Business Logic

- **Analysis Engine**: Calculates savings predictions and goal feasibility
- **Category Analysis**: Breakdown of expenses by category
- **Savings Rate**: Automatic calculation of monthly savings rate
- **Goal Predictions**: Intelligent timeline calculations

### Security

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcryptjs encryption with salt
- **Data Validation**: Input validation on all endpoints
- **CORS Protection**: Configured for frontend domain
- **Error Handling**: Comprehensive error responses

## 📖 Usage Guide

### 1. Register a New Account

- Navigate to the Register page
- Fill in your name, email, and password
- Click "Create Account"
- You'll be redirected to the Dashboard

### 2. Add Income

- Go to Dashboard
- Fill the "Add Income" form with amount and source
- Click "Add Income"
- Check the summary card to see updated total income

### 3. Log Expenses

- In the "Add Expense" form:
  - Enter the amount
  - Add a description (title)
  - Select a category
  - Click "Add Expense"
- View expense breakdown in the chart

### 4. Set a Savings Goal

- In the "Set Goal" form:
  - Enter target amount
  - Set duration in months
  - Click "Set Goal"
- See analysis results showing feasibility

### 5. Analyze Your Finances

- View the "Savings Analysis" section
- Check if your goal is achievable
- Follow recommendations to improve savings
- Monitor your savings rate

### 6. Manage Your Profile

- Click on your name in the Navbar
- Edit your profile information
- Update email or name
- Or delete your account

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🐛 Troubleshooting

### MongoDB Connection Error

- Ensure MongoDB is running
- Check `MONGODB_URI` in `.env` file
- Verify connection string format

### Frontend Can't Connect to Backend

- Check backend is running on port 5000
- Verify `VITE_API_URL` in frontend `.env`
- Check CORS is enabled in backend

### Port Already in Use

```bash
# Find process using port 5000
lsof -i :5000

# Find process using port 5175
lsof -i :5175

# Kill the process
kill -9 <PID>
```

### Clear npm Cache

```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

## 📞 Support

For issues, questions, or suggestions, please open an issue on GitHub or contact the development team.

---

**Last Updated**: February 7, 2026
**Version**: 1.0.0
**Status**: Production Ready ✅
