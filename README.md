# VivaFemini - Cycle Tracking Application

A full-stack cycle tracking application built with Next.js (frontend) and NestJS (backend), using MongoDB for data persistence.

## Project Structure

```
viva-femini/
├── app/                    # Next.js frontend application
│   ├── components/        # React components
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # API client and utilities
│   └── ...
├── backend/               # NestJS backend API
│   ├── src/
│   │   ├── cycles/       # Cycle tracking module
│   │   ├── daily-logs/   # Daily log entries module
│   │   ├── articles/     # Articles module
│   │   ├── health-reports/ # Health reports module
│   │   ├── symptoms/     # Symptoms module
│   │   ├── seed/         # Database seeding module
│   │   └── schemas/      # MongoDB schemas
│   └── ...
└── ...
```

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (v6 or higher) - Can be installed locally or use MongoDB Atlas (cloud)
- npm or yarn package manager

## Getting Started

### 1. MongoDB Setup

#### Option A: Local MongoDB

Install MongoDB locally following the [official installation guide](https://www.mongodb.com/docs/manual/installation/).

Start MongoDB:
```bash
# macOS (using Homebrew)
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows
# Start MongoDB service from Services
```

#### Option B: MongoDB Atlas (Cloud)

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get your connection string
4. Update the `MONGODB_URI` in the backend `.env` file

### 2. Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the `backend` directory:

```bash
cp .env.example .env
```

Edit `.env` and configure:

```env
MONGODB_URI=mongodb://localhost:27017/vivafemini
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

Start the backend server:

```bash
# Development mode (with hot reload)
npm run start:dev

# Production mode
npm run build
npm start
```

The backend API will be available at `http://localhost:3001`
Swagger documentation will be available at `http://localhost:3001/api/docs`

### 3. Frontend Setup

Navigate to the project root:

```bash
cd ..
```

Install dependencies:

```bash
npm install
```

Create a `.env.local` file in the root directory (optional, defaults are already set):

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

Start the development server:

```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

### 4. Seed the Database

Once both servers are running, seed the database with sample data:

```bash
# Using curl
curl -X POST http://localhost:3001/seed

# Or using the Swagger UI at http://localhost:3001/api/docs
# Navigate to the "seed" tag and click "Try it out" on the POST /seed endpoint
```

## API Documentation

The API documentation is available via Swagger UI when the backend is running:

- **URL**: http://localhost:3001/api/docs
- **Interactive**: Try out endpoints directly from the browser

### Available Endpoints

#### Daily Logs
- `GET /daily-logs` - Get all daily logs
- `GET /daily-logs/:date` - Get a specific daily log by date (YYYY-MM-DD)
- `POST /daily-logs` - Create a new daily log
- `PATCH /daily-logs/:date` - Update a daily log
- `DELETE /daily-logs/:date` - Delete a daily log

#### Cycles
- `GET /cycles` - Get all cycles
- `GET /cycles/current` - Get the current active cycle
- `GET /cycles/:id` - Get a cycle by ID
- `POST /cycles` - Create a new cycle
- `PATCH /cycles/:id` - Update a cycle
- `DELETE /cycles/:id` - Delete a cycle

#### Articles
- `GET /articles` - Get all active articles
- `GET /articles/:id` - Get an article by ID

#### Health Reports
- `GET /health-reports` - Get all health reports
- `GET /health-reports/:month/:year` - Get a health report for a specific month/year
- `POST /health-reports/generate?month=10&year=2025` - Generate a health report

#### Symptoms
- `GET /symptoms` - Get all unique symptoms
- `GET /symptoms?startDate=2025-10-01&endDate=2025-10-31` - Get symptom frequency for a date range

#### Seed
- `POST /seed` - Seed the database with sample data
- `DELETE /seed` - Clear all data from the database

## Features

### Frontend
- ✅ Responsive design for all screen sizes
- ✅ Cycle calendar tracking
- ✅ Daily log entries (symptoms, flow intensity, notes)
- ✅ Health reports and analytics
- ✅ Article recommendations
- ✅ Real-time data synchronization with backend
- ✅ Error handling and loading states

### Backend
- ✅ RESTful API architecture
- ✅ MongoDB data persistence
- ✅ Swagger/OpenAPI documentation
- ✅ Data validation
- ✅ Error handling
- ✅ Database seeding endpoint
- ✅ CORS configuration
- ✅ TypeScript for type safety

## Development

### Backend Commands

```bash
cd backend

# Development
npm run start:dev

# Build
npm run build

# Production
npm run start:prod

# Debug
npm run start:debug
```

### Frontend Commands

```bash
# Development
npm run dev

# Build
npm run build

# Production
npm start

# Lint
npm run lint
```

## Technology Stack

### Frontend
- **Next.js 16** - React framework
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling

### Backend
- **NestJS** - Node.js framework
- **MongoDB** - Database
- **Mongoose** - MongoDB ODM
- **Swagger/OpenAPI** - API documentation
- **TypeScript** - Type safety
- **class-validator** - Data validation

## Project Architecture

The application follows a modular architecture:

- **Frontend**: Component-based React architecture with custom hooks for data fetching
- **Backend**: Modular NestJS architecture with feature-based modules (cycles, daily-logs, articles, etc.)
- **Database**: MongoDB with Mongoose schemas for data modeling
- **API Communication**: RESTful API with JSON responses

## Environment Variables

### Backend (.env)
- `MONGODB_URI` - MongoDB connection string
- `PORT` - Backend server port (default: 3001)
- `NODE_ENV` - Environment (development/production)
- `FRONTEND_URL` - Frontend URL for CORS

### Frontend (.env.local)
- `NEXT_PUBLIC_API_URL` - Backend API URL (default: http://localhost:3001)

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check the `MONGODB_URI` in the backend `.env` file
- For MongoDB Atlas, ensure your IP is whitelisted

### CORS Errors
- Verify `FRONTEND_URL` in backend `.env` matches your frontend URL
- Check that both servers are running

### Port Already in Use
- Change the port in the `.env` file
- Kill the process using the port: `lsof -ti:3001 | xargs kill` (macOS/Linux)

## License

This project is part of a technical assessment.

## Author

Built as a technical assessment for VivaFemini.
# viva-femini
