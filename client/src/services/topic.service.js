(function() {
	'use strict';

	TopicService.$inject = ['$http'];

	function TopicService($http) {
		var base = 'api/topic/';

		var Topic = {
			create: create
		};

		function create(url) {
			return $http({
				url: base + 'create',
				method: 'POST',
				data: { url: url }
			});
		}

		return Topic;
	}

	angular
	    .module('app.services')
	    .factory('TopicService', TopicService);
})();