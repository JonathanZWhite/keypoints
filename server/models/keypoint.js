/*jslint node: true */
'use strict';

var Keypoint;
var async = require('async');
var errorhandler = require('../utils').errorhandler;
var db = require('../database');
var moment = require('moment');
var mongoose =  require('mongoose');
var Schema =    mongoose.Schema;
var Topic = require('./topic');
var topicService = require('../topic');
var utils = require('../../shared/utils');
var _ = require('lodash-node');

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
KeypointSchema.statics.update = update;

function del(keypointId, callback) {
    Keypoint.findByIdAndRemove(keypointId, function(err) {
        if (err) {
            return errorhandler(err);
        }

        callback({ status: true });
    });
}

function make(userId, payload, callback) {
    console.log('This is the payload', payload);
    var tasks = [function(next) {
        var url = utils.removeUrlIdentifier(payload.url);
        var query = { user: userId, url: url };

        db.get('topic', query, function(err, topic) {
            if (err) return next(err);

            if (topic) {
                next(null, topic._id);
            } else {
                topicService.create(userId, payload.url, function(resp) {
                    next(null, resp._id);
                });
            }
        });
    }, function(topicId, next) {
        var contentType = payload.keypoint ? 'text' : 'image';

        var keypointData = {
            topic: topicId,
            contentType: contentType,
            keypoint: payload.keypoint,
            image: payload.image
        };

        db.create('keypoint', keypointData, function(err, keypoint) {
            if (err) return errorhandler(err);
            next(null, keypoint);
        });
    }];

    async.waterfall(tasks, function(err, result) {
        if (err) return errorhandler(err);
        callback(result);
    });
}

function list(userId, url, callback) {
    var tasks = [function(next) {
        var query = {
            user: userId,
            url: url
        };
        db.get('topic', query, function(err, topic) {
            if (err) return errorhandler(err);
            if (!topic) return;
            next(null, topic._id);
        });
    }, function(topicId, next) {
        db.find('keypoint', { topic: topicId }, function(err, keypoints) {
            if (err) return errorhandler(err);
            next(null, keypoints);
        });
    }];

    async.waterfall(tasks, function(err, result) {
        if (err) return errorhandler(err);
        callback(result);
    });
}

function update(keypoint, callback) {
    var tasks = [function(next) {
        db.findById('keypoint', keypoint._id, function(err, oldKeypoint) {
            if (err) return errorhandler(err);
            next(null, oldKeypoint);
        });
    }, function(oldKeypoint, next) {
        db.update(oldKeypoint, keypoint, next);
    }];

    async.waterfall(tasks, function(err, result) {
        if (err) return errorhandler(err);
        callback({ status: true });
    });
}

Keypoint = mongoose.model('keypoint', KeypointSchema);

module.exports = Keypoint;
