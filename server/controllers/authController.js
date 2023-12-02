const db = require('../db/sqlmodel');
const bcrypt = require('bcrypt');
const getCoordsForAddress = require('../util/location.js')

exports.signup = async (req, res, next) => {
  try {

    let { category, org , contact, username, password, phone, email, address} = req.body.formData;

    // logic to get the long and latitude (to be modularized function incase they change locations)
    const coordsFetched = await getCoordsForAddress(address);
    const state = address.slice(-13,-11);

    const longitude = coordsFetched.lng;
    const latitude = coordsFetched.lat;

    let hashed;
    let queryStrCreate;

    if (category == 'NON-PROFIT'){ //non-profit
        const { pickup } = req.body.formData;

        hashed = await bcrypt.hash(password, 10);
        queryStrCreate = `INSERT INTO npos (name, org, username, password, state, address, phonenumber, email, longitude, latitude, pref_distance) VALUES ('${contact}', '${org}', '${username}', '${hashed}', '${state}', '${address}', ${phone}, '${email}', '${longitude}', '${latitude}', ${Number(pickup)});`;

        category = 'npos';
    } else { //restaurant
        hashed = await bcrypt.hash(password, 10);
        queryStrCreate = `INSERT INTO restaurant (name, org, username, password, state, address, phonenumber, email, longitude, latitude) VALUES ('${contact}', '${org}', '${username}', '${hashed}', '${state}', '${address}', ${phone}, '${email}', '${longitude}', '${latitude}');`;
        category = 'restaurant';
    }

   
    await db.query(queryStrCreate);
    const queryStrRetrieve = `SELECT * FROM ${category} WHERE username = '${username}' ;`;
    const result = await db.query(queryStrRetrieve);

    // what do we want to send back?

    res.status(201).json({
      status: 'success',
      username: result.rows[0].username,
      id: result.rows[0].id,
      category
    });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    let { category, username, password } = req.body.loginData;

    if (category === 'NON-PROFIT'){ //non-profit
      category = 'npos';
  } else { //restaurant
      category = 'restaurant';
  }

    const queryStr = `SELECT * FROM ${category} WHERE username = '${username}';`;
    const result = await db.query(queryStr);
    const loginCheck = await bcrypt.compare(password, result.rows[0].password);

    if (loginCheck) {
      res.status(201).json({
        status: 'success',
        username: result.rows[0].username,
        id: result.rows[0].id,
        category
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