# HireNow

## How to Run the Project

### Prerequisites

- Node.js
- npm

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/vasa-r/amaha-assignment
   ```

2. Install dependencies for backend and frontend:

   ```bash
   cd server
   npm install
   cd ../client
   npm install
   ```

3. Set up environment variables:

   - Backend `.env` file:
     ```env
        JWT_SECRET = secret
        PORT = 3000
        MONGO_URI =
        IS_PRODUCTION = false
        CLIENT_ID = OAUTH
        CLIENT_SECRET = 0AUTH
        CALLBACK_URL = http://localhost:3000/api/auth/oauth
        CLIENT_URL = http://localhost:5173
        BASE_URL = http://localhost:5173
     ```
   - Frontend `.env` file:
     ```env
        VITE_API_BASE_URL = http://localhost:3000
     ```

4. Run the backend server:

   ```bash
   cd backend
   npm start
   ```

5. Run the frontend server:

   ```bash
   cd frontend
   npm run dev
   ```

6. Access the application:

   - Frontend: `http://localhost:5173`
   - Backend: `http://localhost:3000`

## Live Deployment

- **Frontend**: [Vercel URL](https://rirm-assignment-lac.vercel.app/)
- **Backend**: [Render](https://rirm-assignment.onrender.com/health)
