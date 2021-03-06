const mongoose = require('mongoose');
const _ = require('lodash');
const Task = mongoose.model('Tasks');

function responseTask(req, task) {
  const protocol = process.env.NODE_ENV === 'production' ?
    'https' :
    'http';
  const url = `${protocol}://${req.headers.host}/tasks/${task._id}`; 
  return {
    id: task._id,
    title: task.title,
    order: task.order,
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
  if (!mongoose.Types.ObjectId.isValid(req.params.taskID)) {
    res.status(400).send({message: `${req.params.taskID} is not a valid ID`})
    return;
  }

  Task.findById(req.params.taskID, (err, task) => {
    if (err) { res.send(err); }
    if (!task) {
      res.status(404).send({message: `Task with id:${req.params.taskID} not found`})
      return;
    }
    res.json(responseTask(req, task));
  });
};

module.exports.update = (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.taskID)) {
    res.status(400).send({message: `${req.params.taskID} is not a valid ID`})
    return;
  }

  Task.findOneAndUpdate(req.params.taskID, req.body, {new: true}, (err, task) => {
    if (err) { res.send(err); }
    if (!task) {
      res.status(404).send({message: `Task with id:${req.params.taskID} not found`})
      return;
    }
    res.json(responseTask(req, task));
  });
};

module.exports.delete = (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.taskID)) {
    res.status(400).send({message: `${req.params.taskID} is not a valid ID`})
    return;
  }

  Task.remove({_id: req.params.taskID}, (err) => {
    if (err) { res.send(err); }
    res.json({message: 'Task deleted'});
  });
};
