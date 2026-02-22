const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (!allowedTypes.includes(file.mimetype)) {
      cb(new Error("This type of file is not supported"));
      return;
    }
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });
module.exports = upload;
