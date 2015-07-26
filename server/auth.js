/*jslint node: true */
'use strict';

var _ = require('lodash-node');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User =     require('./models/user');

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
            console.log('doing something', user);
            // req.logIn(user, function(err) { // serializes user
            //     return callback(user);
            // });
        })(req, res);
    }

    passport.use('signup', new LocalStrategy({
            usernameField: 'email',
            passReqToCallback : true
        }, function findOrCreateUser(req, email, password, callback) {
            var user;
            var newUser = new User();

            // wraps front-end model with mongoose
            user = _.extend(newUser, req.body);

            user.save(function(err) {
                if (err) {
                    return callback(null, false);
                }

                return callback(null, user);
            });
        })
    );
}(exports));
