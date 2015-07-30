(function() {
	'use strict';

	ClientStore.$inject = [];
	function ClientStore() {
		var Client = {
			model: {
				url: ''
			}
		};

		return Client;
	}

	angular
	    .module('app.services')
	    .factory('ClientStore', ClientStore);
})();
