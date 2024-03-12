const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Message = require("../models/messageModel");

exports.messageHomePage = asyncHandler(async (req, res, next) => {
  const messages = await Message.find().populate("author").exec();
  res.render("index.ejs", { messageList: messages, user: req.user });
});

exports.createMessage_get = asyncHandler(async (req, res) => {
  res.render("message_create.ejs", { user: req.user });
});

exports.createMessage_post = asyncHandler(async (req, res, next) => {
  try {
    const message = new Message({
      author: req.user._id,
      title: req.body.title,
      message: req.body.message,
    });
    await message.save();
    res.redirect("/");
  } catch (err) {
    return next(err);
  }
});

exports.memberGet = asyncHandler(async (req, res) => {
  res.render("become_member.ejs", { user: req.user });
});

exports.memberPost = asyncHandler(async (req, res, next) => {
  try {
    if (req.body.member !== "cats") {
      res.redirect("/");
    }
    await User.findByIdAndUpdate(req.user._id, { isMember: true }, {});
    res.redirect("/");
  } catch (err) {
    return next(err);
  }
});
