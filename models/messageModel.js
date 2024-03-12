const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", require: true },
  title: {
    type: String,
    require: [true, "Please enter a title!"],
    minLength: 3,
    maxLength: 100,
  },
  message: {
    type: String,
    require: [true, "Please enter a message!"],
    minLength: 3,
    maxLength: 100,
  },
  added: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Message", messageSchema);
