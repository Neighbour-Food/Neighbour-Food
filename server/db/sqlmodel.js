const pg = require('pg');
const dotenv = require("dotenv");
dotenv.config();

const PG_URI = process.env.POSTGRES_URL;
const db = new pg.Client(PG_URI);

db.connect(function(err) {
  if (err){
    return console.error('Could not connect to postgres', err);
  }
  console.log('connected to database');
})

module.exports = db;
