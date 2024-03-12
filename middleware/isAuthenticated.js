exports.checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};

exports.checkNotAuthetincated = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.redirect("/");
  }
  next();
};
