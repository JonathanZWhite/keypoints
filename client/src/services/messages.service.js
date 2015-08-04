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
				case 'navigate':
					console.log('This is the payload', payload);
					break;
				case 'context':
					KeypointStore.add({
						url: payload.url,
						keypoint: payload.keypoint,
						image: payload.image,
						tags: []
					});
					break;
			}
		}


		return Messages;
	}

	angular
	    .module('app.services')
	    .factory('MesssagesService', MesssagesService);
})();
