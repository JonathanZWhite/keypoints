(function() {
	'use strict';

	TagsService.$inject = ['$http'];

	function TagsService($http) {
		var base = 'api/tags/';

		var Tags = {
			getAll: getAll,
		};

		function getAll() {
			return $http({
				url: base + 'all',
				method: 'GET'
			});
		}

		return Tags;
	}

	angular
	    .module('app.services')
	    .factory('TagsService', TagsService);
})();
