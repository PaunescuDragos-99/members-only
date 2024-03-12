
exports.checkMember = (req, res, next) => {
    if (req.user.isMember) {
      return next();
    }
    res.redirect("/member");
  }
exports.checkNotMember = (req, res, next) => {
    if (!req.user.isMember) {
      return next();
    }
    res.redirect("/");
  }
