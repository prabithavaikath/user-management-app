# User Management Application

A modern, extensible React-based CRUD application for managing user data with a configuration-driven architecture and RESTful API.

![React](https://img.shields.io/badge/React-18.2.0-blue)
![Node](https://img.shields.io/badge/Node-14+-green)
![License](https://img.shields.io/badge/License-MIT-yellow)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen)



## ✨ Features

- ✅ **Complete CRUD Operations** - Create, Read, Update, Delete users
- ✅ **Form Validation** - Real-time validation with regex patterns
- ✅ **Extensible Architecture** - Add new fields without code changes
- ✅ **Responsive Design** - Works on desktop and mobile devices
- ✅ **Search Functionality** - Search users by name, email, or phone
- ✅ **Toast Notifications** - User-friendly success/error messages
- ✅ **Loading States** - Visual feedback during API calls
- ✅ **Error Handling** - Comprehensive error handling and retry options
- ✅ **RESTful API** - JSON Server backend with full CRUD support

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI Framework
- **Axios** - HTTP Client
- **React Toastify** - Notifications
- **React Icons** - Icon library
- **CSS3** - Styling with modern features

### Backend
- **JSON Server** - Mock REST API
- **Express** - Web framework
- **CORS** - Cross-origin resource sharing

### Development Tools
- **Concurrently** - Run multiple commands
- **Nodemon** - Auto-restart server during development

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** (v6 or higher) - Comes with Node.js
- **Git** - [Download](https://git-scm.com/)
- A modern web browser (Chrome, Firefox, Safari, Edge)

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