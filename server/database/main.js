var Keypoint = require('../models/keypoint');
var mongoose = require('mongoose');

module.exports = function(module) {
	module.create = create;
	module.get = get;
	module.find = find;

	function create(key, payload, callback) {
		if (!key) {
			return callback({ status: false });
		}

		mongoose.model(key).create(payload, callback);
	}

	function get(key, query, callback) {
		if (!key) {
			return callback({ status: false });
		}

		mongoose.model(key).findOne(query, callback);
	}

	function find(key, query, callback) {
		if (!key) {
			return callback({ status: false });
		}

		mongoose.model(key).find(query, callback);
	}
};
