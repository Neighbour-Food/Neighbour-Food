const express = require('express');
const authRouter = require('./routes/authRoutes.js');
// const dataRoutes = require('./routes/dataRoutes.js');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');
const path = require("path");
const { errorHandler } = require("./middleware/errorMiddleware");
const { Storage } = require('@google-cloud/storage');
const crypto = require('crypto');
const app = express();
const PORT = 3000;

dotenv.config();

// ALLOWS REQUEST FROM LOCALHOST8080
// const corsOptions = {
//   origin: 'http://localhost:8080',
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   credentials: true,
//   optionsSuccessStatus: 204,
// };

app.use(
  cors({
    origin: 'http://localhost:8080',
    credentials: true,
    optionsSuccessStatus: 200,
  })
);


// HANDLE PARSE BODY
app.use(express.json());

// ROUTES
app.use('/api/users', authRouter);

// app.use('/dashboard', dataRoutes, (req, res) => {
//   return res.status(200).json({
//     savings: res.locals.savings,
//     budget: res.locals.budget,
//     savings_goals: res.locals.savings_goals,
//     transactions: res.locals.transactions,
//     users: res.locals.users,
//   });
// });

// GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  console.log(err);
  res.json({ status: 'error' });
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});
module.exports = app;
