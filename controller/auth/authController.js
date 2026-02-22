const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/userModel");
const otpGenerator = require("otp-generator");
const sendEmail = require("../../services/sendEmail");

exports.registerUser = async (req, res) => {
  const { email, password, phoneNumber, userName } = req.body;
  if (!email || !password || !phoneNumber || !userName) {
    return res.status(400).json({
      message: "Please provide email,password,phoneNumber and userName",
    });
  }
  const userExist = await User.findOne({ userEmail: email });
  if (userExist) {
    return res.status(400).json({
      message: "User with that email already exist",
    });
  }

  await User.create({
    userEmail: email,
    userPhoneNumber: phoneNumber,
    userPassword: await bcrypt.hash(password, 10),
    userName,
  });
  res.status(201).json({
    message: "User registered successfully",
  });
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "Please provide email and password",
    });
  }
  const userExist = await User.findOne({ userEmail: email });
  if (!userExist) {
    return res.status(404).json({
      message: "User with that email doesnot exist",
    });
  }
  const isPasswordMatch = await bcrypt.compare(
    password,
    userExist.userPassword,
  );
  if (!isPasswordMatch) {
    return res.status(400).json({
      message: "Invalid credentials",
    });
  }
  const token = jwt.sign({ id: userExist._id }, process.env.SECRET_KEY, {
    expiresIn: "7d",
  });
  res.status(200).json({
    message: "User loggedIn successfully",
    token,
  });
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({
      message: "Please provide email",
    });
  }
  const userExist = await User.findOne({ userEmail: email });
  if (!userExist) {
    return res.status(400).json({
      message: "User with that email address doesnot exist",
    });
  }

  const otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });
  userExist.otp = otp;
  await userExist.save();
  await sendEmail({
    email,
    subject: "Your OTP for momo Online :",
    message: `Your OTP for momo Online is ${otp}. Don't share with anyone.`,
  });
  res.status(200).json({
    message: "OTP sent successfully",
  });
};

exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    return res.status(400).json({
      message: "Please provide email and otp",
    });
  }
  const userExist = await User.findOne({ userEmail: email });
  if (!userExist) {
    return res.status(400).json({
      message: "User with that email address doesnot exist",
    });
  }
  if (userExist.otp !== otp) {
    return res.status(400).json({
      message: "Invalid OTP",
    });
  }
  ((userExist.otp = undefined), (userExist.isOtpVerified = true));
  await userExist.save();
  res.status(200).json({
    message: "OTP verified successfully",
  });
};

exports.resetPassword = async (req, res) => {
  const { email, newPassword, confirmPassword } = req.body;
  if (!email || !newPassword || !confirmPassword) {
    return res.status(400).json({
      message: "Please provide email,newPassword,confirmPassword",
    });
  }
  if (newPassword !== confirmPassword) {
    return res.status(400).json({
      mesasge: "NewPassword and confirmPassword didnt match",
    });
  }
  const userExist = await User.findOne({ userEmail: email });
  if (!userExist) {
    return res.status(400).json({
      message: "User with that email address doesnot exist",
    });
  }
  if (!userExist.isOtpVerified) {
    return res.status(403).json({
      message: "You dont have permission to do this",
    });
  }
  userExist.userPassword = await bcrypt.hash(newPassword, 10);
  userExist.isOtpVerified = false;
  await userExist.save();
  res.status(200).json({
    message: "Password reset successfully",
  });
};
