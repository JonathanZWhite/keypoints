/*jslint node: true */
'use strict';

var mongoose =  require('mongoose');
var Schema =    mongoose.Schema;

var UserSchema = new Schema({
    email: String,
    password: String,
    topics: [{ type : mongoose.Schema.ObjectId, ref : 'Topic' }]
});

module.exports = mongoose.model('User', UserSchema);
