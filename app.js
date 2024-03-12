const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const userRoutes = require("./routes/users");
const connectDb = require("./config/connectDb");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const flash = require("express-flash");
const methodOverride = require("method-override");

const initializePassport = require("./config/passport-config");

initializePassport(passport);

function ErrorThr(req, res, next) {
  if (req.err) {
    return res.send("there has been an error!");
  }
  next();
}
app.use(express.static(__dirname + "/public"));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.set("view-engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));

app.use("/", ErrorThr, userRoutes);
const PORT = process.env.PORT;

connectDb();

app.listen(PORT || 3000);
