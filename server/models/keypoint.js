/*jslint node: true */
'use strict';

var Keypoint;
var async = require('async');
var errorhandler = require('../utils').errorhandler;
var mongoose =  require('mongoose');
var Schema =    mongoose.Schema;
var Topic = require('./topic');

var KeypointSchema = new Schema({
    topic: [{ type : mongoose.Schema.ObjectId, ref : 'topic' }],
    contentType: String,
    keypoint: String,
    image: String
});

KeypointSchema.statics.make = make;

function make(payload, callback) {
    var tasks = [function(next) {
        // look up url and then save
        Topic.findOne({ url: payload.url }, function(err, topic) {
            next(null, topic._id);
        });
    }, function(next, topicId) {
        var keypoint = new Keypoint({
            topic: topicId,
            contentType: 'text',
            keypoint: payload.keypoint
        });

        keypoint.save(function(err) {
            if (err) {
                return callback(err);
            }

            callback(null, keypoint);
        });
    }]

    async.waterfall(tasks, function(err, result) {
        if (err) {
            return errorhandler(err);
        }

        console.log('These are the results', result);
    });
}

Keypoint = mongoose.model('keypoint', KeypointSchema);

module.exports = Keypoint;
