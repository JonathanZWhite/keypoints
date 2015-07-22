/*jslint node: true */
'use strict';

var async = require('async');
var topicController = {};
var DBService = require('../database');
var errorhandler = require('../utils').errorhandler;
var MetaInspector = require('node-metainspector');

topicController.create = create;

function create(req, res) {
    var url = req.body.url;
    var tasks = [function(next) {
        var metaInspector = new MetaInspector(url, { timeout: 10000 });

        metaInspector.on('fetch', function() {
            console.log('This is the title', metaInspector.title)
            return next(null, metaInspector.title);
        });

        metaInspector.on('error', function(err) {
            return next(err);
        });

        metaInspector.fetch();
    }, function(title, next) {
        var payload = {
            title: title,
            url: url
        };

        DBService.create('topic', payload, next);
    }];

    async.waterfall(tasks, function(err, result) {
        if (err) {
            return errorhandler(err);
        }

        console.log('These are the results', result);
    });
}

module.exports = topicController;
