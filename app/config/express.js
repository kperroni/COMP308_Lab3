// Load the module dependencies
const config = require('./config');
const express = require('express');
const morgan = require('morgan');
const compress = require('compression');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const passport = require('passport');
const path = require('path');

// Define the Express configuration method
module.exports = function () {
    // Create a new Express application instance
    const app = express();

    // Use the 'NDOE_ENV' variable to activate the 'morgan' logger or 'compress' middleware
    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    } else if (process.env.NODE_ENV === 'production') {
        app.use(compress());
    }

    // Use the 'body-parser' and 'method-override' middleware functions
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(bodyParser.json());
    app.use(methodOverride());

    // Configure the 'session' middleware
    app.use(session({
        //a session is uninitialized when it is new but not modified
        //force a session that is "uninitialized" to be saved to the store
        saveUninitialized: true,
        //forces the session to be saved back to the session store
        //even if the session was never modified during the request
        resave: true,
        secret: config.sessionSecret // secret used to sign the session ID cookie
    }));

    // Set passport variables
    app.use(passport.initialize()); // boostraping passport module
    app.use(passport.session()); // keep track of user`s session
   
   // Angular DIST output folder
    app.use(express.static(path.join(__dirname, '../../', 'dist')));

    // Load the routing files
    var studentRouter = require('../routes/student.server.routes');
    app.use('/api/student', studentRouter);

    var courseRouter = require('../routes/course.server.routes');
    app.use('/api/course', courseRouter);

    require('../routes/ng.server.routes.js')(app);
    // Return the Express application instance
    return app;
};