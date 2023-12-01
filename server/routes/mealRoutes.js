const express = require('express');
const router = express.Router();
const mealController = require('../controllers/mealController');

router.get("/:rest_id", mealController.getMeals);
router.get("/getAvail/:npo_id", mealController.getAvailableMeals);
router.post("/postMeal", mealController.postMeal);

  
  

module.exports = router;
