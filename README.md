# Professional MERN Stack Profile Management System

A production-ready User Management System built with the MERN stack (MySQL, Express, React, Node.js), featuring Redis caching, JWT authentication, and automated file management.

---

## 🚀 Key Features

### 🔐 Authentication & Authorization
- **JWT & Refresh Tokens**: Secure token-based authentication with persistent session support.
- **Email Verification**: Mandatory email verification for new accounts using Nodemailer.
- **Password Reset**: Fully automated "Forgot Password" flow with secure email links.
- **RBAC (Role-Based Access Control)**: Permission-based access (Admin can delete users, Users can manage their own profile).
- **Google Login (Showcase)**: Integrated Google OAuth UI component.

### 👤 Profile & User Management
- **Dynamic Profile CRUD**: Full control over username, email, and identity settings.
- **Smart Image Management**:
    - Real-time profile picture preview using React Hook Form.
    - Automated server-side cleanup (Old images are deleted when replaced or when the account is deleted).
- **Global User Directory**: Searchable, paginated list of all registered users for administrators.

### ⚡ Performance & Quality
- **Redis Integration**: High-performance caching for user lists with smart cache-invalidation.
- **Responsive UX**: Fluid design optimized for Desktop, Tablet, and Mobile devices.
- **Validation**: Strict real-time form validation using `React-Hook-Form` and backend `express-validator`.

---

## 🛠️ Technical Stack
- **Frontend**: React.js (Vite), Axios, Lucide Icons, React-Hook-Form.
- **Backend**: Node.js, Express, Sequelize ORM.
- **Database**: MySQL.
- **Infrastructure**: Redis (Caching), Multer (File Handling), Nodemailer (Emails), JWT.

---

## ⚙️ Configuration & Setup

### 1. Prerequisites
- **Node.js**: [Download here](https://nodejs.org/)
- **MySQL**: [Download here](https://dev.mysql.com/downloads/installer/)
- **Redis for Windows**: [Download here](https://github.com/tporadowski/redis/releases)

### 2. Environment Variables (.env)
Create a `.env` file in the `/backend` directory. Use the following template as a guide:

```env
# Server Port & Environment
PORT=5000
NODE_ENV=development

# Database Configuration (MySQL)
DB_HOST=localhost
DB_USER=root
DB_PASSWORD="your_mysql_password"   # Wrap in quotes if it contains special characters like #
DB_NAME=mern_profile
DB_PORT=3306

# Redis Configuration
REDIS_HOST=127.0.0.1
REDIS_PORT=6379

# JWT Secrets (Use long random strings)
JWT_SECRET=your_super_secret_key_123
JWT_REFRESH_SECRET=your_refresh_secret_key_456
JWT_EXPIRE=1h
JWT_REFRESH_EXPIRE=7d

# Email (SMTP) - Get credentials from https://ethereal.email/
SMTP_HOST=smtp.ethereal.email
SMTP_PORT=587
SMTP_USER=your_ethereal_user_email
SMTP_PASS=your_ethereal_password
FROM_EMAIL=noreply@mernprofile.com
FROM_NAME="MERN Profile System"

# Google OAuth (Optional showcase)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
CALLBACK_URL=http://localhost:5000/api/auth/google/callback
```

---

## 📥 Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/soumyadeepdutta7/profile.git
   cd profile
   ```

2. **Setup Backend**:
   ```bash
   cd backend
   npm install
   # Create your .env file here (refer to the example above)
   npm start
   ```

3. **Setup Frontend**:
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

---

## 📂 Troubleshooting

- **Database Connection Error**: Ensure MySQL is running and you have created the `mern_profile` database. 
- **Redis Connection Error**: Ensure the Redis server (`redis-server.exe`) is running on port 6379.
- **Verification Email Not Received**: Check your Ethereal Email inbox or verify the `SMTP_USER` and `SMTP_PASS` in your `.env`.
- **Special Characters in Password**: If your DB password has characters like `#`, you **must** wrap it in double quotes in the `.env` file.

---

## 📝 License
Distributed under the MIT License.
