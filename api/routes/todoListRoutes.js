const todoListController = require('../controllers/todoListController');

module.exports = (app) => {
  app.route('/')
    .get(todoListController.index)
    .post(todoListController.create)
    .delete(todoListController.deleteAll);
};
