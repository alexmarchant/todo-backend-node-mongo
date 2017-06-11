const mongoose = require('mongoose');
const _ = require('lodash');
const Task = mongoose.model('Tasks');

function responseTask(req, task) {
  const url = `${req.protocol}://${req.headers.host}/tasks/${task._id}`; 
  return {
    id: task._id,
    title: task.title,
    url: url,
    completed: task.completed,
    createdAt: task.createdAt,
  };
}

module.exports.index = (req, res) => {
  Task.find({}, (err, tasks) => {
    if (err) { res.send(err); }
    res.json(_.map(tasks, (task) => {
      return responseTask(req, task);
    }));
  });
};

module.exports.create = (req, res) => {
  const task = new Task(req.body);
  task.save((err, task) => {
    if (err) { res.send(err); }
    res.json(responseTask(req, task));
  });
};

module.exports.deleteAll = (req, res) => {
  Task.remove({}, (err) => {
    if (err) { res.send(err); }
    res.json({message: 'All tasks deleted'});
  });
};

module.exports.read = (req, res) => {
  Task.findById(req.params.taskID, (err, task) => {
    if (err) { res.send(err); }
    res.json(responseTask(req, task));
  });
};

module.exports.delete = (req, res) => {
  Task.remove({_id: req.params.taskID}, (err) => {
    if (err) { res.send(err); }
    res.json({message: 'Task deleted'});
  });
};
