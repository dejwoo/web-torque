var passportJWT = require("passport-jwt");
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var User = require('../models/user');
var authService = require('../services/auth');


module.exports = function(passport) {
    var jwtOptions = {
        "jwtFromRequest": ExtractJwt.fromAuthHeader(),
        "algorithm": process.env.JWTSETTINGS_ALGORITHM,
        "issuer": process.env.JWTSETTINGS_ISSUER,
        "audience": process.env.JWTSETTINGS_AUDIENCE,
        "secretOrKey": process.env.SESSION_SECRET
    };
    passport.use('jwt', process.env.JWTSETTINGS_SECRET, new JwtStrategy(jwtOptions, function(jwt_payload, done) {
        User.findOne({
            id: jwt_payload
        }, function(err, user) {
            // In case of any error, return using the done method
            if (err) {
                return done(err, false, "Server error, token not validated");
            }
            if (!user) {
                console.log('User Not Found with id ' + jwt_payload);
                done(null, false, "Wrong username or password");
            } else {
                return done(null, user);
            }
        });
    }));
};