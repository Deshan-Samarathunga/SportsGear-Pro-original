
SportsGear-Pro
An e-commerce admin dashboard and storefront for managing sports gear products, orders, and registered users. Built using **MERN Stack** (MongoDB, Express, React, Node.js).

---

## 📦 Features
- Admin Login System (Token-based auth)
- Dashboard with stats (Listed Products, Orders, Users)
- Product CRUD (Add, Edit, Delete, View)
- Order Management
- User Management
- Responsive Sidebar Navigation
- Search & Filter support

---

## 🚀 Project Structure

```
SportsGear-Pro-main/
├── client/               # React frontend
│   ├── src/admin/        # Admin-specific components/pages
│   └── src/components/   # Shared components
│   └── App.js
│   └── index.js
├── server/               # Node.js + Express backend
│   ├── routes/           # API route handlers
│   ├── models/           # Mongoose schemas
│   ├── middleware/       # Auth middleware
│   └── server.js         # Entry point
```

---

## 🛠️ Installation Guide

### 1️⃣ Prerequisites:
- Node.js v16+
- MongoDB local or MongoDB Atlas
- Git

### 2️⃣ Clone the repository:
```bash
git clone https://github.com/your-username/SportsGear-Pro-main.git
cd SportsGear-Pro-main
```

### 3️⃣ Install dependencies:

#### Backend:
```bash
cd server
npm install
```

#### Frontend:
```bash
cd ../client
npm install
```

---

## 🔐 Environment Setup

Create a `.env` file in `server/` directory with the following content:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

Example for MongoDB Atlas:
```
MONGO_URI=mongodb+srv://username:password@cluster0.mongodb.net/sportsgear?retryWrites=true&w=majority
```

---

## ▶️ Running the Project

### Run Backend:
```bash
cd server
npm start
```

### Run Frontend:
```bash
cd client
node server.js
```

🟢 React app will run at: `http://localhost:3000`  
🟠 Express server will run at: `http://localhost:5000`

---

## 🔑 Admin Login

### Login Credentials:
Make sure you have at least one admin user created in the database (role: `admin`).

Example admin object:
```json
{
  "name": "admin",
  "email": "admin@example.com",
  "password": "admin", // hashed in DB
  "role": "admin"
}
```

If not, manually insert it using MongoDB Compass or create a POST route to register.

### Logging In:

1. Visit `http://localhost:3000/admin/login`
2. Enter email + password
3. On success:
   - JWT will be stored in `localStorage` as `token`
   - Admin will be redirected to dashboard

---

## 📊 Dashboard Overview

- **Listed Products** ➝ Count of products in DB
- **Total Orders** ➝ Count of placed orders
- **Registered Users** ➝ Count of user records

---

## 👩‍💻 Tech Stack
- **Frontend**: React, React Router, Axios, Bootstrap
- **Backend**: Express.js, Mongoose
- **Database**: MongoDB
- **Authentication**: JWT (token in localStorage)

---

## 📜 License

MIT License © 2025 SportsGear-Pro
