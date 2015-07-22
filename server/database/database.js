var config = 	require('../config/secrets').config();
var mongoose = 	require('mongoose');

(function(Database) {
	'use strict';

	Database.init = init;

	/**
	 * init initializes an instance of mongo that can
	 * be accessed server-wide
	 */
	function init() {
		Database.db = mongoose.connect(config.mongoDB, function(err) {
			if (err) {
				console.error('Could not establish connection with MongoDB' + err);
			}
		});
	}

}(exports));
