/*jslint node: true */
'use strict';

var keypointController = {};
var Keypoint = require('../models/keypoint');

keypointController.create = create;

function create(req, res) {
    Keypoint.make(req.body, function(err, result) {
        console.log('This is the result', result);
    });
}

module.exports = keypointController;
