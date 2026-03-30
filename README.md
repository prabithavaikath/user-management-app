# User Management Application

A modern, extensible React-based CRUD application for managing user data with configuration-driven architecture.

## Live Demo

- **Frontend:** https://user-management-app-1-mblf.onrender.com
- **Backend API:** https://user-management-app-server-02mn.onrender.com/api/users

## Features

- ✅ **Complete CRUD Operations** - Create, Read, Update, Delete users
- ✅ **Form Validation** - Real-time validation with regex patterns
- ✅ **Extensible Architecture** - Add new fields without code changes
- ✅ **Responsive Design** - Works on desktop and mobile devices
- ✅ **Search Functionality** - Search users by name, email, or phone
- ✅ **Toast Notifications** - User-friendly success/error messages
- ✅ **Loading States** - Visual feedback during API calls

## Tech Stack

### Frontend
- React 18 with Hooks
- Axios for API calls
- React Toastify for notifications
- React Icons for icons
- CSS3 with modern features

### Backend
- JSON Server (RESTful API)
- Express.js
- CORS enabled

### Deployment
- Render.com (both frontend and backend)

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)


## 🚀 Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/prabithavaikath/user-management-app.git
cd user-management-app

# Install root dependencies (for running both apps together)
npm install

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install

# Return to root directory
cd ..

Step 3: Configure Environment Variables (Optional)
Create environment files if needed:

Backend (server/.env):

env
PORT=3001
NODE_ENV=development

Frontend (client/.env):

env
REACT_APP_API_URL=http://localhost:3001/api

🏃 Running the Application
Method 1: Run Both Servers Together (Recommended)
bash
# From the root directory
npm run dev


This will start:

Backend: http://localhost:3001

Frontend: http://localhost:3000

Method 2: Run Separately
Terminal 1 - Backend:

bash
cd server
npm start
# Server runs on http://localhost:3001
Terminal 2 - Frontend:

bash
cd client
npm start
# App runs on http://localhost:3000
Verify Installation
Open your browser and go to http://localhost:3000

You should see the User Management interface

Test the API: http://localhost:3001/api/users