(function() {
	'use strict';

	ListStore.$inject = ['TopicService'];

	function ListStore(TopicService) {
		var List = {
			model: {
				topics: {}
			}
		};

		init();

		function init() {
			console.log('Initializing list store');
			TopicService.getAll()
				.then(function(resp) {
					List.model.topics = resp.data;
				});
		}

		return List;
	}

	angular
	    .module('app.services')
	    .factory('ListStore', ListStore);
})();
