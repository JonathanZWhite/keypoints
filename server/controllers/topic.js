/*jslint node: true */
'use strict';

var topicController = {};
var DBService = require('../database');
var errorhandler = require('../utils').errorhandler;

topicController.create = create;

function create(req, res) {
    DBService.create('topic', req.body, function(err, result) {
        if (err) {
            return errorhandler(err);
        }

        console.log('This is the result', result);
    });
}

module.exports = topicController;
