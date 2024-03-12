const express = require("express");
const userController = require("../controller/userController");
const messageController = require("../controller/messageController");
const router = express.Router();
const passport = require("passport");
const checkIsMember = require("../middleware/checkMember");
const isAuthenticated = require("../middleware/isAuthenticated");

router.get(
  "/",
  isAuthenticated.checkAuthenticated,
  messageController.messageHomePage
);

router.get(
  "/register",
  isAuthenticated.checkNotAuthetincated,
  userController.userRegister_get
);

router.post(
  "/register",
  isAuthenticated.checkNotAuthetincated,
  userController.userRegister_post
);

router.get("/login", isAuthenticated.checkNotAuthetincated, (req, res) => {
  res.render("login.ejs", { user: req.user });
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })(req, res, next);
});

router.delete("/logout", (req, res, next) => {
  req.logOut(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
  });
});

router.get(
  "/member",
  isAuthenticated.checkAuthenticated,
  checkIsMember.checkNotMember,
  messageController.memberGet
);
router.post("/member", messageController.memberPost);

router.get(
  "/message",
  isAuthenticated.checkAuthenticated,
  messageController.createMessage_get
);

router.post(
  "/message",
  isAuthenticated.checkAuthenticated,
  messageController.createMessage_post
);

module.exports = router;
