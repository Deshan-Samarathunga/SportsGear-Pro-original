// server/models/User.js
const mongoose = require('mongoose');

// Cart item schema (embedded)
const cartItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  imageUrl: { type: String, required: true }
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, default: "" },
  dob: { type: String, default: "" },
  address: { type: String, default: "" },
  city: { type: String, default: "" },
  image: { type: String, default: "" },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  },
  cart: [cartItemSchema] 
});

module.exports = mongoose.model('User', userSchema);
