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

app.use("/api", authRoute);
app.use("/api", productRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
