const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Please add your full name!"],
    minLength: 3,
    maxLength: 100,
  },
  email: {
    type: String,
    required: [true, "Please add your email adress"],
    unique: [true, "Email adress already in use!"],
    minLength: 3,
    maxLength: 100,
  },
  password: {
    type: String,
    required: [true, "please add a password!"],
    minLength: 3,
    maxLength: 100,
  },
  isMember: {
    type: Boolean,
    required: true,
    default: false,
  },
});

module.exports = mongoose.model("User", userSchema);
