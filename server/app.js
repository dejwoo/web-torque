var _ = require("lodash");

var express = require("express");
var expressSession = require('express-session');

var bodyParser = require("body-parser");
var jwt = require('jsonwebtoken');

var passport = require("passport");


var mongoose = require("mongoose");
/**
 * User model for authentication of JWT
 */
var User = require("./models/user.js");

/**
 * Storing configuration in the environment separate from code is based on The Twelve-Factor App methodology.
 */
var dotenv = require("dotenv");
dotenv.load({
	path: 'config.env'
});

/**
 * Connect to MongoDB.
 */

mongoose.connect(process.env.MONGODB_URI, {
	user: process.env.MONGODB_USER,
	pass: process.env.MONGODB_PASS,
	server: {
		ssl: true
	}
});
mongoose.connection.on('error', function() {
	console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
	//TODO: Logic for gracefull reconnection and persistent db writes when no connection is reached.
	process.exit();
});

/**
 * Passport configuration
 */



passport.use(strategy);

var app = express();
app.use()
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

app.get("/", function(req, res) {
	res.json({
		message: "Express is up!"
	});
});

app.post("/login", function(req, res) {
	if (req.body.name && req.body.password) {
		var name = req.body.name;
		var password = req.body.password;
	}
	// usually this would be a database call:
	var user = users[_.findIndex(users, {
		name: name
	})];
	if (!user) {
		res.status(401).json({
			message: "no such user found"
		});
	}

	if (user.password === req.body.password) {
		// from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
		var payload = {
			id: user.id
		};
		var token = jwt.sign(payload, jwtOptions.secretOrKey);
		res.json({
			message: "ok",
			token: token
		});
	} else {
		res.status(401).json({
			message: "passwords did not match"
		});
	}
});

app.listen(8000, function() {
	console.log("Express running");
});