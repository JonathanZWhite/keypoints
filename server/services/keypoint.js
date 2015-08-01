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

            var keypointData = {
                topic: topicId,
                contentType: contentType,
                keypoint: payload.keypoint,
                image: payload.image,
                user: userId
            };

            var yo = require('../models/keypoint');

            // console.log('Yo', require('../models/keypoint'));
            // console.log('Yo', dataProvider.keypoint);

            // dataProvider.keypoint.add(keypointData, function(err, keypoint) {
            //     if (err) return errorhandler(err);
            //     next(null, keypoint);
            // });

            yo.make(keypointData, function(err, keypoint) {
                if (err) return errorhandler(err);
                next(null, keypoint);
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
    }
};

module.exports = keypoint;
