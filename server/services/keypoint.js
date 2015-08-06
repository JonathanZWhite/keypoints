var keypoint;
var async = require('async');
var dataProvider = require('../models');

var topicService = require('../topic');
var db = require('../database');
var errorhandler = require('../utils').errorhandler;
var utils = require('../../shared/utils');

keypoint = {
    add: function(userId, payload, callback) {
        var tasks;

        function createTopic(next) {
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
        }

        function createKeypoint(topicId, next) {
            var contentType = payload.keypoint ? 'text' : 'image';
            var formattedTags = _formatTags(payload.tags);

            var keypointData = {
                topic: topicId,
                contentType: contentType,
                keypoint: payload.keypoint,
                image: payload.image,
                tags: formattedTags,
                user: userId
            };

            dataProvider.keypoint.add(keypointData, function(err, keypoint) {
                if (err) return errorhandler(err);
                next(null, keypoint);
            });
        }

        function _formatTags(tags) {
            return tags.map(function(tag) {
                return { name: tag };
            });
        }

        tasks = [
            createTopic,
            createKeypoint
        ];

        async.waterfall(tasks, function(err, results) {
            if (err) return errorhandler(err);
            callback(results);
        });
    },
    del: function(keypointId, callback) {
        dataProvider.keypoint.findByIdAndRemove(keypointId, function(err) {
            if (err) return errorhandler(err);
            callback({ status: true });
        });
    },
    getAll: function(userId, callback) {
        dataProvider.keypoint.get({ user: userId }, function(err, keypoints) {
            if (err) return errorhandler(err);

            callback({
                status: 200,
                data: keypoints
            });
        });
    },
    getTopicKeypoints: function(userId, url, callback) {
        var tasks;

        function getTopic(next) {
            url = utils.removeUrlIdentifier(url);
            dataProvider.topic.findOne({ user: userId, url: url}, function(err, topic) {
                if (err) return errorhandler(err);
                if (!topic) {
                    return next({
                        status: false,
                        message: 'topic has not been saved yet',
                        data: []
                    });
                }
                next(null, topic._id);
            });
        }

        function getKeypoints(topicId, next) {
            dataProvider.keypoint.find({ topic: topicId }, function(err, keypoints) {
                if (err) return errorhandler(err);
                next(null, {
                    status: true,
                    data: keypoints
                });
            });
        }

        tasks = [
            getTopic,
            getKeypoints
        ];

        async.waterfall(tasks, function(err, result) {
            if (err) return callback(err);
            callback(result);
        });
    },
    update: function(keypoint, callback) {
        var tasks;

        function get(next) {
            dataProvider.keypoint.findById('keypoint', keypoint._id, function(err, oldKeypoint) {
                if (err) return errorhandler(err);
                next(null, oldKeypoint);
            });
        }

        function update(oldKeypoint, next) {
            dataProvider.keypoint.edit(oldKeypoint, keypoint, next);
        }

        tasks = [
            get,
            update
        ];

        async.waterfall(tasks, function(err, result) {
            if (err) return errorhandler(err);
            callback({ status: true });
        });
    }
};

module.exports = keypoint;
