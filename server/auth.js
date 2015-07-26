/*jslint node: true */
'use strict';

var _ = require('lodash-node');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User =     require('./models/user');
var db = require('./database');

(function(Auth) {
    Auth.signup = signup;

	passport.serializeUser(function(user, done) {
		done(null, user._id);
	});

	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			done(err, user);
		});
	});

    function signup(req, res, callback) {
        console.log('Look', req.body);
        passport.authenticate('signup', function(err, user) {
            req.logIn(user, function(err) { // serializes user
                return callback(user);
            });
        })(req, res);
    }

    passport.use('signup', new LocalStrategy({
            usernameField: 'email',
            passReqToCallback : true
        }, function findOrCreateUser(req, email, password, callback) {
            db.create('user', req.body, callback);
        })
    );
}(exports));
