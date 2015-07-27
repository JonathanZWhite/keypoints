/*jslint node: true */
'use strict';

var authController = {};
var auth = require('../auth');

authController.signup = signup;
authController.login = login;

function signup(req, res) {
    auth.signup(req, res, function(resp) {
        res.json(resp);
    });
}

function login(req, res) {
    auth.login(req, res, function(resp) {
        res.status(resp.status).json(resp);
    });
}

module.exports = authController;
