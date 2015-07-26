/*jslint node: true */
'use strict';

var topicController = {};
var Topic = require('../models/topic');
var topicService = require('../topic');
var utils = require('../../shared/utils');

topicController.get = get;
topicController.getAll = getAll;

function get(req, res) {
    var url = utils.removeUrlIdentifier(req.query.url);
    console.log('Getting topic...', req.query.url);
    Topic.findOne({ url: url }, function(err, topic) {
        console.log('Look', err, topic);
        res.json(topic);
    });
}

function getAll(req, res) {
    Topic.find({}, function(err, topics) {
        res.json(topics);
    });
}

module.exports = topicController;
