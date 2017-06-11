const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Task = require('./api/models/todoListModel');
const routes = require('./api/routes/todoListRoutes');

const app = express();
const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/todo-backend';

mongoose.promise = global.Promise;
mongoose.connect(mongoURI);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);

app.listen(port);

console.log('todo list RESTful API server started on: ' + port);
