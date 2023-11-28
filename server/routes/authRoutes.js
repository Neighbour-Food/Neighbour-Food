const express = require("express");
const authController = require("../controllers/authController");

// INITIALIZE ROUTER
const router = express.Router();

// ROUTES
router.post("/login", authController.login);
router.post("/signup", authController.signup);
router.get("/test", authController.test);

module.exports = router;
