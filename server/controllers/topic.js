/*jslint node: true */
'use strict';

var async = require('async');
var topicController = {};
var MetaInspector = require('node-metainspector');
var topicService = require('../topic');

topicController.create = create;

function create(req, res) {
    var url = req.body.url;
    topicService.create(req.body.url, function(resp) {
        res.json(resp);
    });
}

module.exports = topicController;
