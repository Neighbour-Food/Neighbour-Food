const express = require("express");
const router = express.Router();
const mealController = require("../controllers/mealController");

router.get("/:rest_id", mealController.getMeals);
router.get("/getAvail/:npo_id", mealController.getAvailableMeals);
router.post("/claimMeal", mealController.claimMeal);
router.post("/unclaimMeal", mealController.unclaimMeal);
router.post("/editMeal", mealController.editMeal);
router.post("/removeMeal", mealController.removeMeal);
router.post("/postMeal", mealController.postMeal);

module.exports = router;
