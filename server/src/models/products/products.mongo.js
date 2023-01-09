const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  subcategory: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  current_price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  likes_count: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  image_url: {
    type: String,
    required: true,
  },
  variation_0_image: {
    type: String,
    required: true,
  },
  variation_0_color: {
    type: String,
    required: true
  },
  variation_1_color: {
    type: String,
    required: true
  },
  is_new: {
    type: Boolean,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("Products", productsSchema);
