var _ = require("lodash");

var express = require("express");
var expressSession = require('express-session');

var bodyParser = require("body-parser");
var jwt = require('jsonwebtoken');

var passport = require("passport");

var morgan = require("morgan");
var mongoose = require("mongoose");
/**
 * User model for authentication of JWT
 */
var User = require("./models/user.js");
var passportInit = require("./passport/init.js");
/**
 * Storing configuration in the environment separate from code is based on The Twelve-Factor App methodology.
 */
var path = require('path');
var dotenv = require("dotenv");
dotenv.load({
	path: path.join(__dirname, './config.env')
});

/**
 * Connect to MongoDB.
 */
var mongoDbOptions = {
	user: process.env.MONGODB_USER,
	pass: process.env.MONGODB_PASS,
	server: {
		ssl: true
	},
	replSet: {
		socketOptions: {
			keepAlive: 120
		}
	}
};
mongoose.connect(process.env.MONGODB_URI, mongoDbOptions).then(
	() => {
		console.log('app.mongoose: Connection to MongoDB initialized');
	},
	err => {
		console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
		//TODO: Logic for gracefull reconnection and persistent db writes when no connection is reached.
		process.exit();
	}
);

/**
 * Passport configuration
 */
passportInit(passport);

var app = express();
app.use(require('cookie-parser')());
app.use(require('express-session')({ secret: process.env.SESSION_SECRET, resave: true, saveUninitialized: true }));
/**
 *  Passport middleware for authentication
 */
app.use(passport.initialize());
app.use(passport.session());

//morgan to log requests to the console
app.use(morgan('dev'));

// parse application/x-www-form-urlencoded
// for easier testing with Postman or plain HTML forms
app.use(bodyParser.urlencoded({
	extended: true
}));
// parse application/json
app.use(bodyParser.json())


/**
 * Express.js routes handling
 */


app.get("/", function(req, res) {
	res.json({
		message: "Express is up!"
	});
});

app.listen(8000, function() {
	console.log("Express running");
});