# Professional MERN Stack Profile Management System

A production-grade User Management System built with the MERN stack (MySQL, Express, React, Node.js), featuring Redis caching, JWT authentication, and automated file management.

## 🚀 Key Features

### 🔐 Authentication & Authorization
- **JWT & Refresh Tokens**: Secure authentication with persistent sessions.
- **Email Verification**: Mandatory email verification for new accounts (powered by Nodemailer).
- **Password Reset**: Automated secure password reset flow through email.
- **RBAC (Role-Based Access Control)**: Admin vs. User roles with specific permissions (e.g., Admins can delete users).
- **Google Login (Showcase)**: Integrated social login UI.

### 👤 User & Profile Management
- **Dynamic Profile**: Edit usernames, emails, and profile pictures.
- **Image Uploads**: Handled by Multer with real-time preview (React Hook Form).
- **Automated Cleanup**: Old profile images are automatically deleted from the server upon update or account deletion.
- **User Directory**: Searchable, paginated list of all users.

### ⚡ Performance & Quality
- **Redis Caching**: Caches user lists to minimize database load.
- **React Hook Form**: Real-time form validation for a smooth user experience.
- **Responsive Design**: Fully optimized for Desktop, Tablet, and Mobile.
- **Clean Architecture**: Decoupled backend controllers, routes, and Sequelize models.

## 🛠️ Technical Stack
- **Frontend**: React.js, Vite, Axios, Lucide-react, React-Hook-Form.
- **Backend**: Node.js, Express, Sequelize ORM (MySQL), JWT.
- **Infrastructure**: Redis (Caching), Multer (File Handling), Nodemailer (Email).

## ⚙️ Local Setup

### 1. Prerequisites
- Node.js installed.
- MySQL server running with a database named `mern_profile`.
- Redis server running on port `6379`.

### 2. Backend Configuration
- Navigate to `/backend`.
- Install dependencies: `npm install`.
- Create a `.env` file based on `.env.example`:
  ```env
  DB_HOST=localhost
  DB_USER=root
  DB_PASSWORD="your_password"
  DB_NAME=mern_profile
  SMTP_USER="your_email"
  SMTP_PASS="your_password"
  ...
  ```
- Start the server: `npm start`.

### 3. Frontend Configuration
- Navigate to `/frontend`.
- Install dependencies: `npm install`.
- Start the development server: `npm run dev`.

## 📁 Project Structure
```text
profile/
├── backend/
│   ├── src/
│   │   ├── config/     # Database & Redis config
│   │   ├── controllers/# Business logic
│   │   ├── models/     # Sequelize models
│   │   ├── routes/     # API endpoints
│   │   └── utils/      # Helpers (Email, Tokens)
│   └── uploads/        # Local image storage
└── frontend/
    ├── src/
    │   ├── context/    # Auth state management
    │   ├── pages/      # View components
    │   └── components/ # Reusable UI
```

## 📝 License
MIT
