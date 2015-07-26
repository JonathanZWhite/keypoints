/*jslint node: true */
'use strict';

var mongoose =  require('mongoose');
var Schema =    mongoose.Schema;

var UserSchema = new Schema({
    email: String,
    username: String,
    profile: { type: String, default: 'http://americanmuslimconsumer.com/wp-content/uploads/2013/09/blank-user.jpg' },
    password: String
});

module.exports = mongoose.model('user', UserSchema);
