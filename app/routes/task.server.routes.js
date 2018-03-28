const tasks  = require('../controllers/task.server.controller');
const index = require('../controllers/index.server.controller');

module.exports = function(app){
    app.route('/').get(index.render);
    app.route('/tasks').get(index.renderAdd);
    app.route('/list_tasks').get(tasks.readTasks);
    app.route('/tasks').post(tasks.createTask);
    app.route('/edit_task/:taskId').post(tasks.editTask);
    app.route('/delete/:taskId').post(tasks.delete);
}