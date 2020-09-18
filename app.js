const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

//Middleware
app.use(cors());
app.use(bodyParser.json());

//Import routes
const postRoutes = require('./routes/posts');

app.use('/posts', postRoutes);

//ROUTES
app.get('/', (req, res) => {
  res.send('Hello World!');
});

//Connect to db
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
  console.log('Connected to mongo db');
});

//Start server
app.listen(3000);
