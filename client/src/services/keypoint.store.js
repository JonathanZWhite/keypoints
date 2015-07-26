(function() {
	'use strict';

	KeypointStore.$inject = ['$http', '$stateParams'];

	function KeypointStore($http, $stateParams) {
		var base = 'api/keypoint/';

		var Keypoint = {
			model: {
				keypoints: []
			},
			create: create,
			del: del,
			list: list,
			update: update
		};

		init();

		function init() {
			console.log('initializing keypoint store');
			list($stateParams.url)
				.then(function(resp) {
					Keypoint.model.keypoints = resp.data;
				});
		}

		function create(url, keypoint, image) {
			return $http({
				url: base + 'create',
				method: 'POST',
				data: {
					url: url,
					keypoint: keypoint,
					image: image
				}
			})
			.success(function(resp) {
				console.log('Yay!', resp);
				Keypoint.model.keypoints.unshift(resp.data);
			});
		}

		function del(keypointId) {
			return $http({
				url: base + 'del',
				method: 'DELETE',
				params: {
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

		function update(keypoint) {
			return $http({
				url: base + 'update',
				method: 'PUT',
				data: {
					keypoint: keypoint
				}
			});
		}

		return Keypoint;
	}

	angular
	    .module('app.services')
	    .factory('KeypointStore', KeypointStore);
})();
