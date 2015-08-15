var tags;
var dataProvider = require('../models');
var db = require('../database');
var errorhandler = require('../utils').errorhandler;

tags = {
    getAll: function(userId, callback) {
        dataProvider.keypoint.getDistinct({ user: userId }, 'tags.name', function(err, tags) {
            if (err) return errorhandler(err);

            callback({
                status: true,
                data: tags
            });
        });
    }
};

module.exports = tags;
