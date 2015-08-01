/*jslint node: true */
'use strict';

var errorhandler = require('../utils').errorhandler;
var db = require('../database');

var keypointController = {};
var keypoint = require('../keypoint');
var services = require('../services');

keypointController.add = add;
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
    console.log('Getting list of keypoints...');
    services.keypoint.getTopicKeypoints(req.user._id, req.query.url, function(resp) {
        res.json(resp);
    });
}

function update(req, res) {
    console.log('Updating keypoint...');
    services.keypoint.update(req.body.keypoint, function(resp) {
        res.json(resp);
    });
}

module.exports = keypointController;
