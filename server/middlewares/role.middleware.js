// server/middlewares/role.middleware.js
exports.isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: "Access denied: Admin only" });
  }
  next();
};

exports.isOwner = (req, res, next) => {
  if (req.user.role !== 'owner') {
    return res.status(403).json({ message: "Access denied: Store Owner only" });
  }
  next();
};

exports.isNormalUser = (req, res, next) => {
  if (req.user.role !== 'user') {
    return res.status(403).json({ message: "Access denied: Normal User only" });
  }
  next();
};
