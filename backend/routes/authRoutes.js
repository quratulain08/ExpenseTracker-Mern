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

// Public route for profile image upload (used during signup)
router.post("/upload-image", upload.single('image'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // Cloudinary automatically handles the upload and returns the URL
        const imageUrl = req.file.path;

        res.status(200).json({ 
            message: 'Profile image uploaded successfully',
            imageUrl: imageUrl 
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
