// The server.js file is the main file of your Node.js application 
// It will load the express.js file as a module to bootstrap your Express application
//
//The process.env.NODE_ENV variable is set to the default 'development�
//value if it doesn 't exist.
// Set the 'NODE_ENV' variable
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Load the module dependencies
const configureMongoose = require('./app/config/mongoose');
const configureExpress = require('./app/config/express');
const configurePassport = require('./app/config/passport');

// Create a new Mongoose connection instance
const db = configureMongoose();

// Create a new Express application instance
const app = configureExpress();

// Create a new Passport application instance
const passport = configurePassport();

// Use the Express application instance to listen to the '3000' port
app.listen(3000);

// Log the server status to the console
console.log('Server running at http://localhost:3000/');

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// Use the module.exports property to expose our Express application instance for external usage
module.exports = app;
