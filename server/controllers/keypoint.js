/*jslint node: true */
'use strict';

var keypointController = {};
var services = require('../services');

keypointController.add = add;
keypointController.addTags = addTags;
keypointController.getTopicKeypoints = getTopicKeypoints;
keypointController.del = del;
keypointController.getAll = getAll;
keypointController.update = update;

function add(req, res) {
    console.log('Creating new keypoint...');
    services.keypoint.add(req.user._id, req.body, function(resp) {
        res.json(resp);
    });
}

function addTags(req, res) {
    console.log('Adding tags to keypoint...');
    services.keypoint.addTags(req.body.keypointId, req.body.tags, function(resp) {
        res.json(resp);
    });
}

function del(req, res) {
    services.keypoint.del(req.query.keypointId, function(resp) {
        res.json(resp);
    });
}

function getAll(req, res) {
    services.keypoint.getAll(req.user._id, function(resp) {
        res.json(resp);
    });
}

function getTopicKeypoints(req, res) {
    if (!req.user) return;
    console.log('Getting list of keypoints...');
    services.keypoint.getTopicKeypoints(req.user._id, req.query.url, function(resp) {
        res.json(resp);
    });
}

function update(req, res) {
    services.keypoint.update(req.body.keypoint, function(resp) {
        res.json(resp);
    });
}

module.exports = keypointController;
