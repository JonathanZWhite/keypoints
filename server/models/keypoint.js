/*jslint node: true */
'use strict';

var Keypoint;
var mongoose =  require('mongoose');
var Schema =    mongoose.Schema;

var KeypointSchema = new Schema({
    created: { type : Date, default: Date.now },
    topic: { type : mongoose.Schema.ObjectId, ref : 'topic' },
    contentType: String,
    keypoint: String,
    image: String
});

Keypoint = mongoose.model('keypoint', KeypointSchema);

module.exports = Keypoint;
