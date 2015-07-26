(function() {
	'use strict';

	TopicService.$inject = ['$http'];

	function TopicService($http) {
		var base = 'api/topic/';

		var Topic = {
			getAll: getAll
		};

		function getAll() {
			return $http({
				url: base + 'all',
				method: 'GET'
			});
		}

		return Topic;
	}

	angular
	    .module('app.services')
	    .factory('TopicService', TopicService);
})();
