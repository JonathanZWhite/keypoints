var config = 	require('../config/secrets').config();
var mongoose = 	require('mongoose');

(function(module) {
	'use strict';

	module.init = init;

	/**
	 * init initializes an instance of mongo that can
	 * be accessed server-wide
	 */
	function init() {
		module.db = mongoose.connect(config.mongoDB, function(err) {
			if (err) {
				console.error('Could not establish connection with MongoDB' + err);
			}

			require('./main')(module);
		});
	}

}(exports));
