/*jslint node: true */
'use strict';

var Keypoint;
var async = require('async');
var errorhandler = require('../utils').errorhandler;
var moment = require('moment');
var mongoose =  require('mongoose');
var Schema =    mongoose.Schema;
var Topic = require('./topic');
var topicService = require('../topic');

var KeypointSchema = new Schema({
    created: { type : Date, default: Date.now },
    topic: { type : mongoose.Schema.ObjectId, ref : 'topic' },
    contentType: String,
    keypoint: String,
    image: String
});

KeypointSchema.statics.make = make;
KeypointSchema.statics.list = list;
KeypointSchema.statics.del = del;

function del(url, keypointId, callback) {
    Keypoint.findByIdAndRemove(keypointId, function(err) {
        if (err) {
            return errorhandler(err);
        }

        callback({ status: true });
    });
}

function make(payload, callback) {
    var tasks = [function(next) {
        Topic.findOne({ url: payload.url }, function(err, topic) {
            if (err) {
                return next(err);
            }

            if (topic) {
                next(null, topic._id);
            } else {
                topicService.create(payload.url, function(resp) {
                    next(null, resp._id);
                });
            }
        });
    }, function(topicId, next) {
        var keypoint = new Keypoint({
            topic: topicId,
            contentType: 'text',
            keypoint: payload.keypoint
        });

        keypoint.save(function(err) {
            console.log('Look', err);
            if (err) {
                return callback(err);
            }

            next(null, keypoint);
        });
    }]

    async.waterfall(tasks, function(err, result) {
        if (err) {
            return errorhandler(err);
        }

        callback(result);
    });
}

function list(url, callback) {
    var tasks = [function(next) {
        Topic.findOne({ url: url }, function(err, topic) {
            if (err) {
                return errorhandler(err);
            }

            if (!topic) {
                return;
            }

            next(null, topic._id);
        });
    }, function(topicId, next) {
        Keypoint.find({ topic: topicId }, function(err, keypoints) {
            if (err) {
                return errorhandler(err);
            }

            next(null, keypoints);
        });
    }];

    async.waterfall(tasks, function(err, result) {
        if (err) {
            return errorhandler(err);
        }

        callback(result);
    });
}

Keypoint = mongoose.model('keypoint', KeypointSchema);

module.exports = Keypoint;
