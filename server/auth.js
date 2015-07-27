/*jslint node: true */
'use strict';

var _ = require('lodash-node');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User =     require('./models/user');
var db = require('./database');
var errorhandler = require('./utils').errorhandler;

(function(Auth) {
    Auth.signup = signup;
    Auth.login = login;

	passport.serializeUser(function(user, done) {
		done(null, user._id);
	});

	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			done(err, user);
		});
	});

    function login(req, res, callback) {
        passport.authenticate('login', function(err, resp, info) {
            var user = resp.data;
            if (!user) return callback(resp);

            req.logIn(user, function(err) {
                if (err) {
                    errorhandler(err);
                    return callback({
                        status: 400,
                        data: null,
                        message: 'error logging in, please try again later'
                    });
                }

                return callback(resp);
            });
        })(req, res);
    }

    passport.use('login', new LocalStrategy({
            usernameField: 'email',
            passReqToCallback: true
        }, function(req, email, password, callback) {
            email = email.toLowerCase();

            db.get('user', { 'email': email }, function(err, user) {
                if (err) return callback(err);

                if (!user) {
                    return callback(null, {
                        status: 400,
                        data: null,
                        message: 'email is not registered'
                    });
                }

                if (user.comparePassword(password)) {
                    return callback(null, {
                        status: 200,
                        data: user
                    });
                } else {
                    return callback(null, {
                        status: 400,
                        data: null,
                        message: 'email and password do not match'
                    });
                }
            });
        }
    ));

    function signup(req, res, callback) {
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
            db.create('user', req.body, function(err, user) {
                console.log('<<<<<', err, user);
            });
        })
    );
}(exports));
