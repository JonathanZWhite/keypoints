/*jslint node: true */
'use strict';

var keypointController = {};
var DBService = require('../database');

keypointController.getNew = getNew;

function getNew(req, res) {
    res.json(DBService.getNewModel('keypoint'));
}

module.exports = keypointController;
