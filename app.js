const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./database/database");
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("uploads"));

const authRoute = require("./routes/authRoute");
const productRoute = require("./routes/productRoute");
const adminUserRoute = require("./routes/adminUserRoute");
const reviewRoute = require("./routes/reviewRoute");
const profileRoute = require("./routes/profileRoute");
const cartRoute = require("./routes/cartRoute");
const orderRoute = require("./routes/orderRoute");

app.use("/api", authRoute);
app.use("/api", productRoute);
app.use("/api", adminUserRoute);
app.use("/api", reviewRoute);
app.use("/api/profile", profileRoute);
app.use("/api/cart", cartRoute);
app.use("/api/order", orderRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
