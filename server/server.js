const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// ==========================
// Middleware
// ==========================
app.use(cors());
app.use(express.json()); // Parse JSON request bodies

// ==========================
// MongoDB Connection
// ==========================
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// ==========================
// Static Files
// ==========================
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// ==========================
// Route Imports
// ==========================
const authRoutes = require('./routes/auth');
const ordersRoutes = require('./routes/orders');
const productsRoutes = require('./routes/products');
const usersRoutes = require('./routes/users');
const brandsRoutes = require('./routes/brands');
const dashboardRoutes = require('./routes/dashboard');

// ==========================
// API Routes
// ==========================
app.use('/api/auth', authRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/brands', brandsRoutes);
app.use('/api/dashboard', dashboardRoutes);

// ==========================
// Server Start
// ==========================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
