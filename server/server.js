const express = require('express');
const authRouter = require('./routes/authRoutes.js');
const mealRouter = require('./routes/mealRoutes.js');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');
const { Storage } = require('@google-cloud/storage');
const crypto = require('crypto');
const app = express();
const path = require('path');
const PORT = 4000;

dotenv.config();

// ALLOWS REQUEST FROM LOCALHOST8080
const corsOptions = {
  origin: 'http://localhost:8080',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(
  cors(corsOptions)
);


// HANDLE PARSE BODY
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false}));
app.use(express.static(path.resolve(__dirname, "../build")));

// ROUTES

const storage = new Storage({
  projectId: 'empirical-radio-406002',
  keyFilename: 'server/empirical-radio-406002-62edab3ef56a.json',
});

app.use('/api/users', authRouter);
app.use('/api/meals', mealRouter);

const bucket = storage.bucket('restaurantimageslogos');


app.post('/generate-signed-url', cors(), (req, res) => {
  console.log('Received request to generate signed URL');
  
  const fileName = generateRandomFileName();

  // const corsConfiguration = [
  //   { maxAgeSeconds: 3600, method: ['GET', 'POST', 'DELETE'], origin: ['*'] },
  // ];
  const corsConfiguration = async () => {
    await storage.bucket('restaurantimageslogos').setCorsConfiguration([
      {
        maxAgeSeconds: 3600,
        method: ['*'],
        origin: ['*'],
        responseHeader: ['Content-Type'],
      },
    ])
  }

  const options = {
    version: 'v4',
    action: 'write',
    expires: Date.now() + 15 * 60 * 1000,
    // contentType: 'image/jpeg',
    // extensionHeaders: {
    //   'x-goog-content-length-range': '0,5242880',
    // },
    promptSaveAs: fileName,
    cors: corsConfiguration(),
  };

  async function getBucketMetadata() {

    // Get Bucket Metadata
    const [metadata] = await storage.bucket('restaurantimageslogos').getMetadata();
  
    console.log(JSON.stringify(metadata, null, 2));
  }
  getBucketMetadata();


  bucket
    .file(fileName)
    .getSignedUrl(options)
    .then((signedUrl) => {
      console.log('Generated signed URL:', signedUrl);
      // res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
      // res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
      // res.header('Access-Control-Allow-Headers', 'Content-Type');
      // res.header('Access-Control-Allow-Credentials', true);
      res.json({ signedUrl, fileName });
    })
    .catch((error) => {
      console.error('Error generating signed URL:', error);
      res.status(500).send('Error generating signed URL: ' + error.message);
    });
});

function generateRandomFileName() {
  return `${Date.now()}_${crypto.randomBytes(16).toString('hex')}.jpg`;
}

// GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  console.log(err);
  res.json({ status: 'error' });
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});
module.exports = app;
