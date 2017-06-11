const controller = require('../controllers/Task');

module.exports = (app) => {
  app.route('/')
    .get(controller.index)
    .post(controller.create)
    .delete(controller.deleteAll);

  app.route('/tasks/:taskID')
    .get(controller.read)
    .patch(controller.update)
    .delete(controller.delete);
};
