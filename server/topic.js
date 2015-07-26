/*jslint node: true */
'use strict';

var async = require('async');
var errorhandler = require('./utils').errorhandler;
var MetaInspector = require('node-metainspector');
var Topic = require('./models/topic');
var utils = require('../shared/utils');

(function(module) {
    module.create = create;

    function create(url, callback) {
        url = utils.removeUrlIdentifier(url);
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
