(function() {
	'use strict';

	MesssagesService.$inject = ['$window', 'KeypointStore'];

	function MesssagesService($window, KeypointStore) {
		var Messages = {};

		init();

		function init() {
			$window.addEventListener('message', handleChange, false);
		}

		function handleChange(message) {
			console.log('Look', message.data);
			var payload = message.data;
			KeypointStore.create(payload.url, payload.keypoint, payload.image);
		}


		return Messages;
	}

	angular
	    .module('app.services')
	    .factory('MesssagesService', MesssagesService);
})();
