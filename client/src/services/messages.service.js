(function() {
	'use strict';

	MesssagesService.$inject = ['$state', '$window', 'ClientStore', 'KeypointStore'];

	function MesssagesService($state, $window, ClientStore, KeypointStore) {
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
					ClientStore.model.url = payload.url;
					$state.go('topic', { url: payload.url });
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
