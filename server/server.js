// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// Static file serving
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Routes
const authRoutes = require('./routes/auth');
const ordersRoutes = require('./routes/orders');
const productsRoutes = require('./routes/products');
const usersRoutes = require('./routes/users');
const dashboardRoutes = require('./routes/dashboard');
const cartRoutes = require('./routes/cart'); // ✅ added

// Apply routes
app.use('/api/auth', authRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/cart', cartRoutes); // ✅ user-specific cart

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
