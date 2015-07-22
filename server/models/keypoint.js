/*jslint node: true */
'use strict';

var mongoose =  require('mongoose');
var Schema =    mongoose.Schema;

var KeypointSchema = new Schema({
    contentType: String,
    keypoint: String,
    image: String
});

module.exports = mongoose.model('Keypoint', KeypointSchema);
