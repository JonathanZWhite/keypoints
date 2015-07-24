(function() {
	'use strict';

	MesssagesService.$inject = ['$window'];

	function MesssagesService($window) {
		var Messages = {};

		init();

		function init() {
			$window.addEventListener('message', handleChange, false);
		}

		function handleChange(message) {
			console.log('Look', message);
		}


		return Messages;
	}

	angular
	    .module('app.services')
	    .factory('MesssagesService', MesssagesService);
})();
