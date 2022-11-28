const mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost:27017/RentPay");
const { MongoClient } = require("mongodb");
require("dotenv").config();

// const url = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.hlyzp.mongodb.net/?retryWrites=true&w=majority`;
const url = "mongodb://localhost:27017/RentPay"
const connectDB = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected...");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
