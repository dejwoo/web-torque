var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
var authService = require('../services/auth');
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport) {

    passport.use('login', new LocalStrategy({
            passReqToCallback: true
        },
        function(req, username, password, done) {
            // check in mongo if a user with username exists or not
            User.findOne({
                    'username': username
                },
                function(err, user) {
                    // In case of any error, return using the done method
                    if (err)
                        return done(err);
                    // Username does not exist, log the error and redirect back
                    if (!user) {
                        console.log('User NOT found with username ' + username);
                        return done(null, false, 'User NOT found.');
                    }
                    // call authService to compare password with hash stored in DB
                    authService.comparePassword(password, user.password, function(result, err) {
                        if (err) {
                            console.error("passport.classic-login.authService.comparePassword: Error while comparing hash and password");
                        }
                        // User and password both match, return user from done method
                        if (result) {
                            return done(null, user);
                        } else {
                            console.log('passport.classic-login.authService.comparePassword: Invalid Password');
                            return done(null, false, "Invalid password or username");
                        }
                    });
                }
            );
        }));
}