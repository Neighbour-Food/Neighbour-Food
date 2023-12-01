const express = require('express');
const router = express.Router();
const mealController = require('../controllers/mealController');

router.get("/:rest_id", mealController.getMeals);
router.get("/getAvail", mealController.getAvailableMeals);
router.post("/postMeal", mealController.postMeal);

  
  

module.exports = router;
