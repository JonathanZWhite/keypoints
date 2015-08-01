(function() {
	'use strict';

	MesssagesService.$inject = ['$window', 'ClientStore', 'KeypointStore'];

	function MesssagesService($window, ClientStore, KeypointStore) {
		var Messages = {};

		init();

		function init() {
			$window.addEventListener('message', handleMessage, false);
		}

		function handleMessage(message) {
			var payload = message.data;
			switch(payload.type) {
				case 'init':
					ClientStore.model.url = payload.url;
					break;
				case 'context':
					KeypointStore.add(payload.url, payload.keypoint, payload.image);
					break;
			}
		}


		return Messages;
	}

	angular
	    .module('app.services')
	    .factory('MesssagesService', MesssagesService);
})();
