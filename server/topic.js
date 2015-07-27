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
                console.log('Fetching...', metaInspector.title);
                var metaData = {
                    title: metaInspector.title,
                    image: metaInspector.image,
                    description: metaInspector.description.substring(0, 75),
                    url: url,
                    user: userId
                };
                return next(null, metaData);
            });

            metaInspector.on('error', function(err) {
                return next(null, nodeUrl.parse(url).hostname);
            });

            metaInspector.fetch();
        }, function(metaData, next) {
            Topic.make(metaData, next);
        }];

        async.waterfall(tasks, function(err, result) {
            if (err) {
                return errorhandler(err);
            }

            callback(result);
        });
    }
}(exports));

// function(next) {
//     var metaInspector = new MetaInspector(url, { timeout: 10000 });
//
//     metaInspector.on('fetch', function() {
//         console.log('Fetching...', metaInspector.title);
//         return next(null, metaInspector.title);
//     });
//
//     metaInspector.on('error', function(err) {
//         console.log('There was an error', err);
//         return next(err);
//     });
//
//     metaInspector.fetch();
// },
