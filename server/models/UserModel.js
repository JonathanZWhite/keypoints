/*jslint node: true */
'use strict';

var mongoose =  require('mongoose');
var Schema =    mongoose.Schema;

var UserSchema = new Schema({});

module.exports = mongoose.model('UserModel', UserSchema);
