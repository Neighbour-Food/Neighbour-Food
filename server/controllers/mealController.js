const db = require('../db/sqlmodel');
const mealController = {};

//getting meals (restaurant side) 

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

//getting available meals (npo side)
mealController.getAvailableMeals = async (req, res, next) => {
    const availablemeals =
      'SELECT * FROM meals WHERE status = $1';
    const results = await db.query(availablemeals, ['available']);
    if (!results.rows) {
      res.locals.availableMeals = [];
    } else {
      res.locals.availableMeals = results.rows;
    }
  
    return next();
  };

  
  // posting meals
  mealController.postMeal = async (req, res, next) => {
    console.log('meals: ', req.body);
    // query the db with the current user's (restaurant's) email and get the id in the users table based off their email
    const findRestQuery = 'SELECT id FROM restaurants WHERE email=$1';
    // const foundRestID = await db.query(findRestQuery, [req.body.email]);
  
    // if (!foundRestID.rowCount) {
    //   return next('No id found in the restaurants table');
    // }
    // use that id found, and insert meal details
    // const addMealQuery =
    //   'INSERT INTO meals(rest_id, body_text, categories, quantity, headline, pickup_start, pickup_end, created_at, status) VALUES($1, $2, $3, $4, $5, $6, $7, $8,  $9)';
    // await db.query(addMealQuery, [
    //   foundRestID.rows[0].id,
    //   req.body.body_text,
    //   req.body.categories,
    //   req.body.quantity,
    //   req.body.headline,
    //   req.body.pickup_start,
    //   req.body.pickup_end,
    //   req.body.created_at,
    //   req.body.status
    // ]);
    res.status(201).json({
      status: 'success',
    });
    return next();
  };
  
  module.exports = mealController;
