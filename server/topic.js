/*jslint node: true */
'use strict';

var async = require('async');
var errorhandler = require('./utils').errorhandler;
var MetaInspector = require('node-metainspector');
var Topic = require('./models/topic');
var utils = require('../shared/utils');
var nodeUrl = require('url');

(function(module) {
    module.create = create;

    function create(userId, url, callback) {
        url = utils.removeUrlIdentifier(url);
        var tasks = [function(next) {
            var metaInspector = new MetaInspector(url, { timeout: 10000 });

            metaInspector.on('fetch', function() {
                console.log('Fetching...', metaInspector);
                // TODO: send from FE
                var title = metaInspector.title ? metaInspector.title : '';
                var image = metaInspector.image ? metaInspector.image : '';
                var description = metaInspector.description ?
                    metaInspector.description.substring(0, 75) : '';
                    
                var topicData = {
                    title: title,
                    image: image,
                    description: description,
                    url: url,
                    user: userId
                };
                return next(null, topicData);
            });

            metaInspector.on('error', function(err) {
                return next(null, nodeUrl.parse(url).hostname);
            });

            metaInspector.fetch();
        }, function(topicData, next) {
            Topic.make(topicData, next);
        }];

        async.waterfall(tasks, function(err, result) {
            if (err) return errorhandler(err);
            callback(result);
        });
    }
}(exports));
