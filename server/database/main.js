var Keypoint = require('../models/keypoint');
var mongoose = require('mongoose');
var _ = require('lodash-node');

module.exports = function(module) {
	module.create = create;
	module.get = get;
	module.find = find;
	module.findById = findById;
	module.update = update;

	function create(key, payload, callback) {
		if (!key) return callback({ status: false });

		mongoose.model(key).create(payload, callback);
	}

	function get(key, query, callback) {
		if (!key) return callback({ status: false });

		mongoose.model(key).findOne(query, callback);
	}

	function find(key, query, callback) {
		if (!key) return callback({ status: false });

		mongoose.model(key).find(query, callback);
	}

	function findById(key, id, callback) {
		if (!key) return callback({ status: false });
		mongoose.model(key).findById(id, callback);
	}

	function update(oldDoc, newDoc, callback) {
		var updatedDoc = _.extend(oldDoc, newDoc);
		// TODO: add updated when...
		updatedDoc.save(callback);
	}
};
