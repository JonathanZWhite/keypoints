/*jslint node: true */
'use strict';

var authController = {};
var auth = require('../auth');
authController.signup = signup;

function signup(req, res) {
    auth.signup(req, res, function(resp) {
        console.log('Done!', resp);
    });
}

module.exports = authController;
