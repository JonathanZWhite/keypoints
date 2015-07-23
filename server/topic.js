/*jslint node: true */
'use strict';

var async = require('async');
var errorhandler = require('./utils').errorhandler;
var MetaInspector = require('node-metainspector');
var Topic = require('./models/topic');

(function(module) {
    module.create = create;

    function create(url, callback) {
        var tasks = [function(next) {
            // TODO: get real title
            var payload = {
                title: 'This is a test',
                url: url
            };

            Topic.make(payload, next);
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
