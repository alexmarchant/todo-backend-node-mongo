const controller = require('../controllers/Task');

module.exports = (app) => {
  app.route('/')
    .get(controller.index)
    .post(controller.create)
    .delete(controller.deleteAll);

  app.route('/tasks/:taskID')
    .get(controller.read)
    .delete(controller.delete);
};
