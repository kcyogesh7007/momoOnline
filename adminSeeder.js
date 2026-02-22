const User = require("./models/userModel");
const bcrypt = require("bcryptjs");

const adminSeeder = async (req, res) => {
  const userExist = await User.findOne({ userEmail: "admin@gmail.com" });
  if (!userExist) {
    await User.create({
      userName: "admin",
      userPassword: await bcrypt.hash(process.env.ADMIN_PASS, 10),
      userPhoneNumber: 9841256352,
      userEmail: "admin@gmail.com",
      role: "admin",
    });
    console.log("Admin seeded successfully");
  } else {
    console.log("Admin already seeded");
  }
};

module.exports = adminSeeder;
