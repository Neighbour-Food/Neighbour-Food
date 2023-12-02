const db = require("../db/sqlmodel");
const distanceDifference = require("../util/distances");
const mealController = {};

mealController.getMeals = async (req, res, next) => {
  try {
    const { rest_id } = req.params; //ensure the get request includes rest_id as param
    console.log(req.params);
    const restmeals =
      "SELECT m.body_text, m.categories, m.quantity, m.headline, m.pickup_start, m.pickup_end, m.created_at, m.status FROM restaurant r JOIN meals m on r.id = m.rest_id WHERE r.id = $1";
    const results = await db.query(restmeals, [rest_id]);

    if (!results.rows) {
      res.locals.getMeals = [];
    } else {
      res.locals.getMeals = results.rows;
    }

    res.status(201).json({
      status: "success",
      meals: res.locals.getMeals,
    });
  } catch (err) {
    next(err);
  }
};

mealController.getAvailableMeals = async (req, res, next) => {
  try {
    const { npo_id } = req.params; //npo id

    const npo_info_query =
      "SELECT state, pref_distance, longitude, latitude FROM npos WHERE id = $1";
    const npo_info_result = await db.query(npo_info_query, [npo_id]);

    let state;
    let pref_distance;

    if (npo_info_result.rows.length === 0) {
      res.locals.availableMeals = [];
    } else {
      state = npo_info_result.rows[0].state;
      pref_distance = npo_info_result.rows[0].pref_distance;
    }

    state = state.trim();

    // Fetch restaurant names and IDs within the state
    const restWithinStateQuery =
      "SELECT id, name FROM restaurant WHERE state = $1";
    const restWithinStateResult = await db.query(restWithinStateQuery, [state]);

    let withinDistance;
    let availableMeals = [];

    if (restWithinStateResult.rows.length > 0) {
      const npoLongitude = npo_info_result.rows[0].longitude;
      const npoLatitude = npo_info_result.rows[0].latitude;

      withinDistance = distanceDifference(
        {
          longitude: npoLongitude,
          latitude: npoLatitude,
          distance_pref: pref_distance,
        },
        restWithinStateResult.rows
      );

      if (withinDistance.length > 0) {
        // Fetch available meal data for each restaurant
        const availableMealsPromises = withinDistance.map(async (rest_id) => {
          const availMealQuery =
            "SELECT r.id as restaurant_id, r.name as restaurant_name, m.body_text, m.categories, m.quantity, m.headline, m.pickup_start, m.pickup_end, m.status FROM restaurant r JOIN meals m on r.id = m.rest_id WHERE r.id = $1 AND m.status = $2";
          const availMealResult = await db.query(availMealQuery, [
            rest_id.id, // Use the restaurant ID from the result of the previous query
            "available",
          ]);
          return availMealResult.rows;
        });

        availableMeals = await Promise.all(availableMealsPromises);
      }
    }

    res.status(200).json({
      status: "success",
      data: {
        restaurants: restWithinStateResult.rows,
        meals: availableMeals.flat(),
      },
    });
  } catch (err) {
    next(err);
  }
};

// update a meal status claim by npo
mealController.claimMeal = async (req, res, next) => {
  const { npo_id, meal_id } = req.body;

  try {
    const updateQuery =
      "UPDATE meals SET npo_id = $1, status = $2 WHERE id = $3";
    await db.query(updateQuery, [npo_id, "not available", meal_id]);

    res.status(201).json({
      status: "success",
    });
  } catch (err) {
    next(err);
  }
};

// update a meal status unclaim by npo
mealController.unclaimMeal = async (req, res, next) => {
  const { meal_id } = req.body;

  try {
    const updateQuery =
      "UPDATE meals SET status = $1, npo_id = $2 WHERE id = $3";
    await db.query(updateQuery, ["available", null, meal_id]);

    res.status(201).json({
      status: "success",
    });
  } catch (err) {
    next(err);
  }
};

// restuarant edit entire meal by rest
mealController.editMeal = async (req, res, next) => {
  // coordinate with frontend to send everything to backend, even whats not being changed

  const editMealQuery =
    "UPDATE meals SET body_text = $1, categories = $2, quantity = $3, headline = $4, pickup_start = $5, pickup_end = $6) WHERE id = $7";

  await db.query(editMealQuery, [
    req.body.body_text,
    req.body.categories,
    req.body.quantity,
    req.body.headline,
    req.body.pickup_start,
    req.body.pickup_end,
    req.body.meal_id,
  ]);

  res.status(201).json({
    status: "success",
  });

  try {
  } catch (err) {
    next(err);
  }
};

// restuarant remove meal
mealController.removeMeal = async (req, res, next) => {
  try {
    const removeMealQuery = "DELETE FROM meals WHERE id = $1";

    await db.query(removeMealQuery, [req.body.meal_id]);

    res.status(201).json({
      status: "success",
    });
  } catch (err) {
    next(err);
  }
};

// posting meals
mealController.postMeal = async (req, res, next) => {
  const foundRestID = await db.query(findRestQuery, [req.body.rest_id]);

  try {
    const addMealQuery =
      "INSERT INTO meals(rest_id, body_text, categories, quantity, headline, pickup_start, pickup_end) VALUES($1, $2, $3, $4, $5, $6, $7)";
    await db.query(addMealQuery, [
      foundRestID.rows[0].id,
      req.body.body_text,
      req.body.categories,
      req.body.quantity,
      req.body.headline,
      req.body.pickup_start,
      req.body.pickup_end,
    ]);

    res.status(201).json({
      status: "success",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = mealController;
