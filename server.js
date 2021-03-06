const express = require('express');
const Task = require('./api/models/Task'); // Need to require this before initializing mongoose
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./api/routes/Task');

const app = express();
const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/todo-backend';

// Database setup
mongoose.promise = global.Promise;
mongoose.connect(mongoURI);

// JSON parsing
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Allow cross origin requests
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  //intercepts OPTIONS method
  if ('OPTIONS' === req.method) {
    res.send(200);
  }
  next();
});

// Routing
routes(app);

// Start server
app.listen(port);

console.log('todo list RESTful API server started on: ' + port);
