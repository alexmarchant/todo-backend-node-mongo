const mongoose = require('mongoose');
const Task = mongoose.model('Tasks');

module.exports.index = (req, res) => {
  Task.find({}, (err, task) => {
    if (err) { res.send(err); }
    res.json(task);
  });
};

module.exports.create = (req, res) => {
  const task = new Task(req.body);
  task.save((err, task) => {
    if (err) { res.send(err); }
    res.json(task);
  });
};
