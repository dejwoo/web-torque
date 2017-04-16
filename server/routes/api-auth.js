var express = require('express');
var passport = require('passport');
var router = express.Router();
var User = require('../models/user.js');

router.get('/users', function(req, res) {
    //TODO authentication token
    //create cursor in db to which all matches fill be fetched on data event
    var cursor = User.find({}).cursor();
    //pipe the results from cursor
    cursor.pipe(res);
});
router.post('/users', function (req, res) {
    res.send("OK");
})

module.exports = router;