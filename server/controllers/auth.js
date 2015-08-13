/*jslint node: true */
'use strict';

var authController = {};
var auth = require('../auth');

authController.isAuthenticated = isAuthenticated;
authController.signup = signup;
authController.login = login
authController.get = get;

function isAuthenticated(req, res) {
    res.json({ isAuthenticated: req.isAuthenticated() });
}

function get(req, res) {
    res.json({
        status: true,
        data: req.user
    });
}

function signup(req, res) {
    auth.signup(req, res, function(resp) {
        res.json(resp);
    });
}

function login(req, res) {
    auth.login(req, res, function(resp) {
        res.json(resp);
    });
}

module.exports = authController;
