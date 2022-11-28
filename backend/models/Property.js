const mongoose = require("mongoose");
const { model } = require("./User");
const Schema = mongoose.Schema;
const newProperty = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  pName: {
    type: String,
  },
  cover: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  priceRange: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  specification: {
    type: String,
    required: true,
  },
  longitude: { type: String, required: true },
  latitude: { type: String, required: true },
  category: { type: String, required: true },
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("property", newProperty);
