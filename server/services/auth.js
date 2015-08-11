/*jslint node: true */
'use strict';

var auth;
var _ = require('lodash-node');
var async = require('async');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User =     require('./models/user');
var db = require('../database');
var errorhandler = require('../utils').errorhandler;

auth = {

};

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
        console.log('+========');
        passport.authenticate('login', function(err, resp, info) {
            var user = resp.data;
            console.log('============');
            if (!user) return callback(resp);

            req.logIn(user, function(err) {
                if (err) {
                    errorhandler(err);
                    return callback({
                        status: false,
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
                    return callback({
                        status: false,
                        message: 'email is not registered'
                    });
                }

                if (user.comparePassword(password)) {
                    return callback(null, {
                        status: 200,
                        data: user
                    });
                } else {
                    return callback({
                        status: false,
                        message: 'email and password do not match'
                    });
                }
            });
        }
    ));

    function signup(req, res, callback) {
        passport.authenticate('signup', function(err, resp) {
            var user = resp.data;
            console.log('Trying to serialize', user);
            req.logIn(user, function(err) { // serializes user
                if (err) {
                    errorhandler(err);
                    return callback({
                        status: 400,
                        data: null,
                        message: 'Uh oh! An unknown error occurred, please try again later'
                    });
                }

                return callback(resp);
            });
        })(req, res);
    }

    function _checkUnique(user, field, value, callback) {
        var query = {};
        query[field] = value;

        db.get('user', query, function(err, user) {
            if(err) {
                return callback(err);
            }

            if (user) {
                callback(new Error(field + ' must be unique'));
            } else {
                callback();
            }
        });
    }

    passport.use('signup', new LocalStrategy({
            usernameField: 'email',
            passReqToCallback : true
        }, function findOrCreateUser(req, email, password, done) {
            var user = req.body;
            var tasks = [function(next) {
                var parallelTasks = [function(callback) {
                    _checkUnique(user, 'email', user.email, callback);
                }, function(callback) {
                    _checkUnique(user, 'username', user.username, callback);
                }];

                async.parallel(parallelTasks, next);
            }, function(next) {
                console.log('HEREERE');
                db.create('user', req.body, function(err, user) {
                    if (err) {
                        errorhandler(err);
                        return done(null, {
                            status: 400,
                            data: null,
                            message: 'Uh oh! An unknown error occurred, please try again later'
                        });
                    }

                    console.log('HEREERE 4');
                    return done(null, {
                        status: 200,
                        data: user
                    });

                });
            }];

            // TODO: fix this
            async.waterfall(tasks, function(err, results) {
                return done(null, {
                    status: 200,
                    data: results
                });
            });
        })
    );
}(exports));
