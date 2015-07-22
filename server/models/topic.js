/*jslint node: true */
'use strict';

var mongoose =  require('mongoose');
var Schema =    mongoose.Schema;

var TopicSchema = new Schema({
    url: {
        type: String,
        required: true,
        unique: true,
        dropDups: true
    },
    title: String,
    keypoints: [{ type : mongoose.Schema.ObjectId, ref : 'Keypoint' }]
});

module.exports = mongoose.model('topic', TopicSchema);
