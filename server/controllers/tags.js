/*jslint node: true */
'use strict';

var tagsController = {};
var services = require('../services');

tagsController.getAll = getAll;

function getAll(req, res) {
    services.tags.getAll(req.user._id, function(resp) {
        res.json(resp);
    });
}

module.exports = tagsController;
