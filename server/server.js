const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();




const authRoutes = require('./routes/auth');

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


const ordersRoutes = require("./routes/orders");
app.use("/api/orders", ordersRoutes);

const productsRoutes = require("./routes/products");
app.use("/api/products", productsRoutes);

const usersRoutes = require("./routes/users");
app.use("/api/users", usersRoutes);

const brandsRoutes = require("./routes/brands");
app.use("/api/brands", brandsRoutes);

const dashboardRoutes = require("./routes/dashboard");
app.use("/api/dashboard", dashboardRoutes);





