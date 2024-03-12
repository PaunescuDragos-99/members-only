const dotenv = require("dotenv").config();
const mongoose = require("mongoose");

const mongoDbString = process.env.CONNECTION_STRING;

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(mongoDbString);
    console.log(
      "Database connnected",
      connect.connection.host,
      connect.connection.name
    );
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDb;
