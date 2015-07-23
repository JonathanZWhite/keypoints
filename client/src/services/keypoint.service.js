(function() {
	'use strict';

	KeypointService.$inject = ['$http'];

	function KeypointService($http) {
		var base = 'api/keypoint/';

		var Keypoint = {
			create: create,
			del: del,
			list: list
		};

		function create(url, keypoint) {
			return $http({
				url: base + 'create',
				method: 'POST',
				data: {
					url: url,
					keypoint: keypoint
				}
			});
		}

		function del(url, keypointId) {
			return $http({
				url: base + 'del',
				method: 'DELETE',
				params: {
					url: url,
					keypointId: keypointId
				}
			});
		}

		function list(url) {
			return $http({
				url: base + 'list',
				method: 'GET',
				params: { url: url }
			});
		}

		return Keypoint;
	}

	angular
	    .module('app.services')
	    .factory('KeypointService', KeypointService);
})();
