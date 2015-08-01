/*jslint node: true */
'use strict';

var Keypoint;
var KeypointSchema;
var db = require('../database');
var errorhandler = require('../utils').errorhandler;
var utils = require('../../shared/utils');
var topicService = require('../topic');
var mongoose =  require('mongoose');
var Schema = mongoose.Schema;

KeypointSchema = new Schema({
    created: { type : Date, default: Date.now },
    updated: { type : Date, default: Date.now },
    topic: { type : mongoose.Schema.ObjectId, ref : 'topic' },
    contentType: String,
    keypoint: String,
    image: String,
    user: { type : mongoose.Schema.ObjectId, ref : 'user' },
});

KeypointSchema.statics.add = add;
KeypointSchema.statics.make = add;
Keypoint = mongoose.model('keypoint', KeypointSchema);

function add(data, callback) {
    Keypoint.create(data, callback);
}

KeypointSchema.pre('save', function(next){
    this.updated = Date.now();
    next();
});

module.exports = Keypoint;
