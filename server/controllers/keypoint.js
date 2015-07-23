/*jslint node: true */
'use strict';

var keypointController = {};
var Keypoint = require('../models/keypoint');

keypointController.create = create;
keypointController.list = list;
keypointController.del = del;

function create(req, res) {
    console.log('Creating new keypoint...');
    Keypoint.make(req.body, function(resp) {
        res.json(resp);
    });
}

function del(req, res) {
    console.log(req.query);
    Keypoint.del(req.query.url, req.query.keypointId, function(resp) {
        res.json(resp);
    });
}

function list(req, res) {
    console.log('Getting list of keypoints...');
    Keypoint.list(req.query.url, function(resp) {
        res.json(resp);
    });
}

module.exports = keypointController;
