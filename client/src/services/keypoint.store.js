(function() {
	'use strict';

	KeypointStore.$inject = ['$http', '$stateParams'];

	function KeypointStore($http, $stateParams) {
		var base = 'api/keypoint/';

		var Keypoint = {
			model: {
				keypoints: []
			},
			add: add,
			addTags: addTags,
			del: del,
			getTopicKeypoints: getTopicKeypoints,
			getAll: getAll,
			init: init,
			update: update
		};
		// TODO: allow reinitialization cal

		function init(url) {
			url = url ? url : $stateParams.url;
			getTopicKeypoints(url)
				.then(function(resp) {
					console.log('This is the resp', resp);
					Keypoint.model.keypoints = resp.data.data;
				});
		}

		function add(data) {
			return $http({
				url: base + 'add',
				method: 'POST',
				data: data
			})
			.success(function(resp) {
				Keypoint.model.keypoints.push(resp);
			});
		}

		function addTags(data) {
			return $http({
				url: base + 'add-tags',
				method: 'PUT',
				data: data
			})
			.success(function(resp) {
				var updatedKeypoint = resp.data.updatedKeypoint;
				Keypoint.model.keypoints.forEach(function(keypoint, index) {
					if (keypoint._id === updatedKeypoint._id) {
						Keypoint.model.keypoints[index].tags = updatedKeypoint.tags;
					}
				});
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

		function getAll() {
			return $http({
				url: base + 'all',
				method: 'GET'
			});
		}

		function getTopicKeypoints(url) {
			return $http({
				url: base + 'topic-keypoints',
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
