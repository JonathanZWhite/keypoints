/*jslint node: true */
'use strict';

var db = require('../database');
var errorhandler = require('../utils').errorhandler;
var utils = require('../../shared/utils');
var Keypoint;
var topicService = require('../topic');
var mongoose =  require('mongoose');
var Schema =    mongoose.Schema;

var KeypointSchema = new Schema({
    created: { type : Date, default: Date.now },
    topic: { type : mongoose.Schema.ObjectId, ref : 'topic' },
    contentType: String,
    keypoint: String,
    image: String,
    user: { type : mongoose.Schema.ObjectId, ref : 'user' },
});

Keypoint = mongoose.model('keypoint', KeypointSchema);

module.exports = Keypoint;
