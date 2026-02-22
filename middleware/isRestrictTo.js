const isRestrictTo = (...roles) => {
  return (req, res, next) => {
    const userRole = req.user.role;
    if (!roles.includes(userRole)) {
      return res.status(400).json({
        message: "You don't have permission to do this",
      });
    }
    next();
  };
};
module.exports = isRestrictTo;
