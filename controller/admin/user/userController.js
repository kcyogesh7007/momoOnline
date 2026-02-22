const User = require("../../../models/userModel");

exports.getUsers = async (req, res) => {
  const userId = req.user._id;
  const users = await User.find({ _id: { $ne: userId } }).select(
    "-userPassword",
  );
  if (users.length == 0) {
    return res.status(404).json({
      message: "User collection is empty",
    });
  }
  res.status(200).json({
    message: "Users fetched successfully",
    data: users,
  });
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(404).json({
      message: "Plese provide id",
    });
  }
  await User.findByIdAndDelete(id);
  res.status(200).json({
    message: "User deleted successfully",
  });
};
