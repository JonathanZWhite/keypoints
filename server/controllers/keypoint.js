/*jslint node: true */
'use strict';

var errorhandler = require('../utils').errorhandler;
var db = require('../database');

var keypointController = {};
var keypoint = require('../keypoint');
var keypointService = require('../services').keypoint;

keypointController.create = create;
keypointController.list = list;
keypointController.del = del;
keypointController.getAll = getAll;
keypointController.update = update;

function create(req, res) {
    console.log('Creating new keypoint...');
    keypointService.add(req.user._id, req.body, function(resp) {
        res.json(resp);
    });
    // keypoint.create(req.user._id, req.body, function(resp) {
    //     res.json(resp);
    // });
}

function del(req, res) {
    keypoint.del(req.query.keypointId, function(resp) {
        res.json(resp);
    });
}

function getAll(req, res) {
    db.find('keypoint', { user: req.user._id }, function(err, keypoints) {
        console.log('Yo', keypoints, req.user);
        if (err) {
            errorhandler(err);
            return res.status(400).json({
                status: 400,
                data: null,
                message: 'an unknown error occured'
            });
        }

        return res.json({
            status: 200,
            data: keypoints
        });
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
