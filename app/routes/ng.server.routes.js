module.exports = function (app) {
    //load the controllers
    var ngController = require('../controllers/ng.server.controller');
    //handle the routing of get
    app.get('*', ngController.render);
};