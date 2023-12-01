const db = require('../db/sqlmodel');
const distanceDifference = require('../util/distances');
const mealController = {};

// getting meals (restaurant side) 
mealController.getMeals = async (req, res, next) => {
  try{
    const { rest_id } = req.params; //ensure the get request includes rest_id as param
    console.log(req.params)
    const restmeals =
      'SELECT m.body_text, m.categories, m.quantity, m.headline, m.pickup_start, m.pickup_end, m.created_at, m.status FROM restaurants r JOIN meals m on r.id = m.rest_id WHERE r.id = $1';
    const results = await db.query(restmeals, [rest_id]);

    if (!results.rows) {
      res.locals.getMeals = [];
    } else {
      res.locals.getMeals = results.rows;
    }

    res.status(201).json({
      status: 'success',
      meals: res.locals.getMeals,
    })
  } catch (err){
    next(err);
  }
  };

// getting available meals (npo side)
mealController.getAvailableMeals = async (req, res, next) => {

  //npo id => npo state and dist pref => sql restuarants in that state => put into helper function to get within distance => get meals from those rest
  try {
    const { npo_id } = req.params; //npo id
  
    const npo_info = 'SELECT state, pref_distance, longitude, latitude FROM npos WHERE id = $1';
    const npo_info_res = await db.query(npo_info, [npo_id]);
    const npoLongitude = npo_info_res.rows[0].longitude;
    const npoLatitude = npo_info_res.rows[0].latitude;
  
    let state;
    let pref_distance;
  
    if (!npo_info_res.rows[0]){
      res.locals.availableMeals = [];
    } else {
      state = npo_info_res.rows[0].state;
      pref_distance = npo_info_res.rows[0].pref_distance;
    }
  
    state = state.trim();
  
    const restWithinStateQuery = 'SELECT id, longitude, latitude FROM restaurants WHERE state = $1';
    const restWithinState = await db.query(restWithinStateQuery, [state]);
  
    let withinDistance;
  
    if (!restWithinState.rows){
      res.locals.availableMeals = [];
    } else { 
       withinDistance = distanceDifference({longitude: npoLongitude, latitude: npoLatitude, distance_pref : pref_distance}, restWithinState.rows); //returns an array of the rest_ids within the distance
    }
  
    if (withinDistance.length > 0){
      const availableMeals = await Promise.all(withinDistance.map(async (rest_id) => {
        const availMealQuery = 'SELECT m.body_text, m.categories, m.quantity, m.headline, m.pickup_start, m.pickup_end, m.created_at, m.status FROM restaurants r JOIN meals m on r.id = m.rest_id WHERE r.id = $1 AND m.status = $2';
        const availMeal = await db.query(availMealQuery, [rest_id, 'available']);
        return availMeal.rows
      }));
    }
  
    res.status(201).json({
      status: 'success',
      meals: availableMeals,
    })

  } catch (err) {
    next(err);
  }
 
};

// update a meal status (claim / unclaim ) by npo 

// restuarant edit entire meal   by rest


  // posting meals
  mealController.postMeal = async (req, res, next) => {
    console.log('meals');
    // query the db with the current user's (restaurant's) email and get the id in the users table based off their email
    const findRestQuery = 'SELECT id FROM restaurants WHERE email=$1';
    const foundRestID = await db.query(findRestQuery, [req.body.rest_id]);
  
    if (!foundRestID.rowCount) {
      return next('No id found in the restaurants table');
    }
    // use that id found, and insert meal details
    const addMealQuery =
      'INSERT INTO meals(rest_id, body_text, categories, quantity, headline, pickup_start, pickup_end, created_at, status) VALUES($1, $2, $3, $4, $5, $6, $7, $8,  $9)';
    await db.query(addMealQuery, [
      foundRestID.rows[0].id,
      req.body.body_text,
      req.body.categories,
      req.body.quantity,
      req.body.headline,
      req.body.pickup_start,
      req.body.pickup_end,
      req.body.created_at,
      req.body.status
    ]);
    return next();
  };
  
  module.exports = mealController;
