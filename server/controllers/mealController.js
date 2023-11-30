const db = require('../db/sqlmodel');

exports.list = async (req, res, next) => {
  try {

    const { body_text, categories, quantity, headline, rest_id } = req.body; //discuss with frontend to send a category (npo or restaurant)

    const queryStrCreate = `INSERT INTO meals (body_text, categories, quantity, headline, rest_id) VALUES ('${body_text}', '${categories}', '${quantity}', '${headline}',  '${rest_id}');`

    await db.query(queryStrCreate);
    const queryStrRetrieve = `SELECT * FROM meals WHERE body_text = '${body_text}' ;`;
    const result = await db.query(queryStrRetrieve);

    res.status(201).json({
      status: 'success',
      id: result.rows[0].id,
    });
  } catch (err) {
    next(err);
  }
};

exports.claim = async (req, res, next) => {
  try {
    const { meal_id, npo_id } = req.body;

    const queryStr = `UPDATE meals SET WHERE id = ``${meal_id}`



    res.status(200).json({
    status: 'success',
    user: result.rows[0].id,
    });
  } catch (err) {
    next(err);
  }
};


exports.available = async (req, res, next) => {
    try {
  

    res.status(200).json({
        status: 'success',
        user: result.rows[1],
    });

    } catch (err) {
      next(err);
    }
  };

//