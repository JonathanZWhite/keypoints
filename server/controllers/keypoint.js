/*jslint node: true */
'use strict';

var keypointController = {};
var keypoint = require('../keypoint');

keypointController.create = create;
keypointController.list = list;
keypointController.del = del;
keypointController.update = update;

function create(req, res) {
    console.log('Creating new keypoint...');
    keypoint.create(req.user._id, req.body, function(resp) {
        res.json(resp);
    });
}

function del(req, res) {
    keypoint.del(req.query.keypointId, function(resp) {
        res.json(resp);
    });
}

function list(req, res) {
    console.log('Getting list of keypoints...');
    keypoint.list(req.user._id, req.query.url, function(resp) {
        res.json(resp);
    });
}

function update(req, res) {
    console.log('Updating keypoint...');
    keypoint.update(req.body.keypoint, function(resp) {
        res.json(resp);
    });
}

module.exports = keypointController;
