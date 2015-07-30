/*jslint node: true */
'use strict';

var authController = {};
var auth = require('../auth');

authController.isAuthenticated = isAuthenticated;
authController.signup = signup;
authController.login = login;

function isAuthenticated(req, res) {
    res.json({ isAuthenticated: req.isAuthenticated() });
}

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
