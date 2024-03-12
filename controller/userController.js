const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

exports.userDefault = asyncHandler(async (req, res) => {
  res.render("index.ejs", { title: "Rege", user: req.user });
});

exports.userRegister_get = asyncHandler(async (req, res) => {
  res.render("register.ejs", { user: req.user });
});

exports.userRegister_post = asyncHandler(async (req, res, next) => {
  try {
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      fullName: req.body.fullName,
      email: req.body.email,
      password: hashPassword,
    });
    const emailExist = await User.findOne({ email: req.body.email }).exec();
    if (emailExist) {
      res.redirect("/register");
    } else {
      await user.save();
      res.redirect("/");
    }
  } catch (err) {
    return next(err);
  }
});
