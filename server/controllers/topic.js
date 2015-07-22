/*jslint node: true */
'use strict';

var topicController = {};
var DBService = require('../database');

topicController.create = create;

function create(req, res) {
    DBService.create('topic', req.body, function(err, result) {
        console.log('This is the body', req.body);
        if (err) {
            console.log('TopicController: create', err);
            return;
        }

        console.log('This is the result', result);
    });
}

module.exports = topicController;
