(function() {
	'use strict';

	TopicStore.$inject = ['$http', '$stateParams'];

	function TopicStore($http, $stateParams) {
		var base = 'api/topic/';

		var Topic = {
			model: {
				topic: {}
			},
			create: create,
			init: init
		};

		function init() {
			console.log('Initializing');
			get($stateParams.url)
				.then(function(resp) {
					Topic.model.topic = resp.data;
				});
		}

		function create(url) {
			return $http({
				url: base + 'create',
				method: 'POST',
				data: { url: url }
			});
		}

		function get(url) {
			return $http({
				url: base + 'get',
				method: 'GET',
				params: { url: url }
			});
		}

		return Topic;
	}

	angular
	    .module('app.services')
	    .factory('TopicStore', TopicStore);
})();
