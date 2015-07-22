/*jslint node: true */
'use strict';

var mongoose =  require('mongoose');
var Schema =    mongoose.Schema;

var UserSchema = new Schema({
    email: String,
    password: String,
    topics: [{ type : mongoose.Schema.ObjectId, ref : 'topic' }]
});

module.exports = mongoose.model('user', UserSchema);
