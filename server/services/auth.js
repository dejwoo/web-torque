var bCrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');

module.exports = {
  /**
   * Hash the password field of the passed user using bCrypt.
   * @param  {Object}   user object with password property
   * @param  {Function} cb callback function to call with hashed password set up
   * @return {undefined}
   */
  hashPassword: function(user, cb) {
    if (user.password) {
      bCrypt.genSalt(10, function(err, salt) {
        if (err) {
          cb(false, err);
        }
        bCrypt.hash(user.password, salt, function(err, hash) {
          user.password = hash;
          cb(user)
        });
      });
    }
    cb(false, "service.auth.hassPassword: Malformed User Object, no password property found");
  },
  /**
   * Compares hash with password if hash is hashed password
   * @param  {String}   hash     string representing hashed password
   * @param  {String}   password password to compare with hash
   * @param  {Function} cb       function(res, err) res is response from bCrypt or false with err as reason
   * @return {undefined}
   */
  comparePassword: function(hash, password, cb) {
    bCrypt.compare(hash, password, function(err, res) {
      if (err) {
        cb(false, err);
      }
      cb(res);
    });
  },
  /**
   * Create a token based on the passed user id.
   * @param {String} ObjectId string of mongodb user object
   * @return {String} JWT Token
   */
  createToken: function(id) {
    return jwt.sign(id, process.env.JWTSETTINGS_SECRET, {
      algorithm: process.env.JWTSETTINGS_ALGORITHM,
      expiresInMinutes: process.env.JWTSETTINGS_EXPIRESINMINUTES,
      issuer: process.env.JWTSETTINGS_ISSUER,
      audience: process.env.JWTSETTINGS_AUDIENCE
    });
  },
  /**
   * Verifies JWT token, cb is passed error and if id is correct for supplied token
   * @param  {String}   token JWT token to verify
   * @param  {String}   id    ObjectId string to compare against decoded token
   * @param  {Function} cb    Callback function
   * @return {None}         TODO: when cb is not supplied, behave synchronously
   */
  verifyToken: function(token, id, cb) {
    jwt.verifyToken(token, process.env.JWTSETTINGS_SECRET, {
      algorithm: process.env.JWTSETTINGS_ALGORITHM,
      expiresInMinutes: process.env.JWTSETTINGS_EXPIRESINMINUTES,
      issuer: process.env.JWTSETTINGS_ISSUER,
      audience: process.env.JWTSETTINGS_AUDIENCE
    }, function (err, decoded) {
      //TODO stop assuming cb is supplied if it is not supplied then  we need to act synchronously
      cb(err, decoded == id);
    });
  }
};