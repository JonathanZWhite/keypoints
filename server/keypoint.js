/*jslint node: true */
'use strict';

var async = require('async');
var db = require('./database');
var errorhandler = require('./utils').errorhandler;
var utils = require('../shared/utils');
var topicService = require('./topic');

(function(module) {
    module.del = del;
    module.create = create;
    module.list = list;
    module.update = update;

    function del(keypointId, callback) {
        db.findByIdAndRemove('keypoint', keypointId, function(err) {
            if (err) return errorhandler(err);
            callback({ status: true });
        });
    }

    function create(userId, payload, callback) {
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

            console.log('Look', payload.tags);

            var keypointData = {
                topic: topicId,
                contentType: contentType,
                keypoint: payload.keypoint,
                image: payload.image,
                tags: payload.tags,
                user: userId
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
}(exports));
