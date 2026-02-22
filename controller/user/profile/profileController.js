//getMyprofile

const User = require("../../../models/userModel");

exports.getProfile = async (req, res) => {
  const userId = req.user._id;
  const profile = await User.find({ _id: userId }).select("-userPassword");
  res.status(200).json({
    message: "Profile fetched successfully",
    data: profile,
  });
};

//delete my profile
exports.deleteProfile = async (req, res) => {
  const userId = req.user._id;
  await User.findByIdAndDelete(userId);
  res.status(200).json({
    message: "Profile deleted successfully",
  });
};

//update profile
exports.updateProfile = async (req, res) => {
  const userId = req.user._id;
  const { userName, userPhoneNumber, userEmail } = req.body;
  const updatedData = await User.findByIdAndUpdate(
    userId,
    {
      userName,
      userPhoneNumber,
      userEmail,
    },
    {
      new: true,
      runValidators: true,
    },
  );
  res.status(200).json({
    message: "User profile updated successfully",
    data: updatedData,
  });
};

//change password
exports.changePassword = async (req, res) => {
  const userId = req.user._id;
  const { currentPassword, newPassword, confirmPassword } = req.body;
  if (!currentPassword || !newPassword || !confirmPassword) {
    return res.status(400).json({
      message: "Please provide currentPassword,newPassword and confirmPassword",
    });
  }
  if (newPassword !== confirmPassword) {
    return res.status(400).json({
      message: "New password and confirmPassword didnt match",
    });
  }
  const user = await User.findById(userId);
  const oldHashPassword = user.userPassword;
  const isPasswordMatch = bcrypt.compareSync(currentPassword, oldHashPassword);
  if (!isPasswordMatch) {
    return res.status(400).json({
      message: "Your current Password is incorrect",
    });
  }
  user.userPassword = bcrypt.hashSync(newPassword, 10);
  await user.save();
  res.status(200).json({
    message: "Password changed successfully",
  });
};
