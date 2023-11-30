const express = require("express");
const mealController = require("../controllers/mealController");

// INITIALIZE ROUTER
const router = express.Router();

// ROUTES
router.post("/list", mealController.list); //list an order
router.post("/claim", mealController.claim); //cliam an order
router.post("/available", mealController.available); //see what is available 

router.get("/test", mealController.test);

module.exports = router;
