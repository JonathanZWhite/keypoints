/*jslint node: true */
'use strict';

var async = require('async');
var bcrypt = require('bcrypt-nodejs');
var db = require('../database');
var mongoose =  require('mongoose');
var Schema =    mongoose.Schema;
var User;

var UserSchema = new Schema({
    email: String,
    username: String,
    profile: { type: String, default: 'http://americanmuslimconsumer.com/wp-content/uploads/2013/09/blank-user.jpg' },
    password: String
});

UserSchema.pre('save',function(next) {
    var user = this;
    var tasks = [function(callback) {
        _checkUnique(user, 'email', user.email, callback);
    }, function(callback) {
        _checkUnique(user, 'username', user.username, callback);
    }];

    async.parallel(tasks, next);
});

UserSchema.pre('save', function(next) {
    var user = this;

    if (!user.isModified('password')) return next();

    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    next();
});

UserSchema.methods.comparePassword = function(candidatePassword) {
    return bcrypt.compareSync(candidatePassword, this.password);
};

function _checkUnique(user, field, value, callback) {
    var query = {};
    query[field] = value;

    db.get('user', query, function(err, user) {
        if(err) {
            return callback(err);
        }

        if (user) {
            user.invalidate(field, field + ' must be unique');
            callback(new Error(field + ' must be unique'));
        } else {
            callback();
        }
    });
}

User = mongoose.model('user', UserSchema);

module.exports = User;
