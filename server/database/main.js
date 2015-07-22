var Keypoint = require('../models/keypoint');
var mongoose = require('mongoose');

module.exports = function(module) {
	module.create = create;

	function create(key, payload, callback) {
		if (!key) {
			console.log('DBService: missing key');
			return callback({ status: false });
		}

		mongoose.model(key).create(payload, callback);
	}
};
