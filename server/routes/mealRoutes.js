const express = require('express');
const router = express.Router();
const mealController = require('../controllers/mealController');

router.get("/meals", mealController.getMeals);
router.get("/", mealController.getAvailableMeals);
router.post("/meals", mealController.postMeal);

  
  

module.exports = router;
