const express = require("express");

// import the controller functions
const {
  registerUser,
  loginUser,
  getUserInfo,
} = require("./../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

// route to register a new user
router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/user", protect, getUserInfo);

router.post("/upload-image",upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

    // If file is uploaded successfully
     res.status(200).json({ imageUrl });
});

module.exports = router;
