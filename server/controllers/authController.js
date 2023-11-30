const db = require('../db/sqlmodel');
const bcrypt = require('bcrypt');
const getCoordsForAddress = require('../util/location.js')

exports.signup = async (req, res, next) => {
  try {

    const { category, name, username, password, street, city, state, zip, phonenumber, email} = req.body; //discuss with frontend to send a category (npo or restaurant)

    // logic to get the long and latitude (to be modularized function incase they change locations)
    const address = street + ", " + city + ", " + state + " " + zip;
    // will need to ensure a correct address is put in (possibly auto complete address functionality on frontend with google maps api)
    const coordsFetched = await getCoordsForAddress(address);

    const longitude = coordsFetched.lng;
    const latitude = coordsFetched.lat;

    let hashed;
    let queryStrCreate;

    if (category == 'npos'){ //non-profit
        const { pref_distance } = req.body; 

        // should this be where we have the logic to generate the long/lat based on address?

        hashed = await bcrypt.hash(password, 10);
        // do we want to get the pref_distance at signup or set it to a default value and have htem input this later?
        queryStrCreate = `INSERT INTO ${category} (name, username, password, street, city, state, zip, phonenumber, email, longitude, latitude,pref_distance) VALUES ('${name}', '${username}', '${hashed}', '${street}',  '${city}',' ${state}', '${zip}', '${phonenumber}', '${email}', '${longitude}', '${latitude}', '${pref_distance}');`;
    } else { //restaurant
        let { type } = req.body; 
        hashed = await bcrypt.hash(password, 10);
        queryStrCreate = `INSERT INTO ${category} (name, username, password, street, city, zip, phonenumber, email, type) VALUES ('${name}', '${username}', '${hashed}', '${street}',  '${city}',' ${state}',  '${zip}', '${phonenumber}', '${email}', '${type}');`;
    }
     
    await db.query(queryStrCreate);
    const queryStrRetrieve = `SELECT * FROM ${category} WHERE username = '${username}' ;`;
    const result = await db.query(queryStrRetrieve);

    // what do we want to send back?

    res.status(201).json({
      status: 'success',
      id: result.rows[0].id,
    });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { category, username, password } = req.body;

    const queryStr = `SELECT * FROM ${category} WHERE username = '${username}';`;
    const result = await db.query(queryStr);
    const loginCheck = await bcrypt.compare(password, result.rows[0].password);

    if (loginCheck) {
    //   db.query(updateLoginQuery);

    // what do we want to send back?

      res.status(200).json({
        status: 'success',
        user: result.rows[0].id,
      });
    } else {
      next('username or password is incorrect');
    }
  } catch (err) {
    next(err);
  }
};


// test to see if any updates. to be deleted

exports.test = async (req, res, next) => {
    try {
  
      const queryStr = `SELECT * FROM npos;`;
      const result = await db.query(queryStr);
      console.log(result)

    res.status(200).json({
        status: 'success',
        user: result.rows[1],
    });

    } catch (err) {
      next(err);
    }
  };

//