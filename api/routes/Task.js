const todoListController = require('../controllers/Task');

module.exports = (app) => {
  app.route('/')
    .get(todoListController.index)
    .post(todoListController.create)
    .delete(todoListController.deleteAll);
};
