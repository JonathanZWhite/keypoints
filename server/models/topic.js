/*jslint node: true */
'use strict';

var mongoose =  require('mongoose');
var Schema =    mongoose.Schema;

var TopicSchema = new Schema({
    url: String,
    title: String,
    keypoints: [{ type : mongoose.Schema.ObjectId, ref : 'Keypoint' }]
});

module.exports = mongoose.model('Topic', TopicSchema);
