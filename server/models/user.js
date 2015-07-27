/*jslint node: true */
'use strict';

var async = require('async');
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
    var self = this;
    var tasks = [function(callback) {
        _checkUnique(self, 'email', self.email, callback);
    }, function(callback) {
        _checkUnique(self, 'username', self.username, callback);
    }];

    async.parallel(tasks, next);
});

function _checkUnique(self, field, value, callback) {
    var query = {};
    query[field] = value;

    db.get('user', query, function(err, user) {
        if(err) {
            return callback(err);
        }

        if (user) {
            self.invalidate(field, field + ' must be unique');
            callback(new Error(field + ' must be unique'));
        } else {
            callback();
        }
    });
}

User = mongoose.model('user', UserSchema);

module.exports = User;
