(function() {
	'use strict';

	AnalyticsService.$inject = ['$http', 'AuthService'];

	function AnalyticsService($http, AuthService) {
		var events = {
			// keypoints
			KEYPOINT_ADDED: 'Keypoint Added',
			// auth
			LOGIN: 'User Logged In',
			SIGNUP: 'User Signup Up'
		};

		var Analytics = {
			track: track,
			trackLogin: trackLogin,
			trackSignup: trackSignup
		};

		function track(event) {
			AuthService.get()
				.then(function(resp) {
					var user = resp.data.data;
					mixpanel.identify(user._id);
					mixpanel.track(events[event]);
				});
		}

		function trackSignup(user) {
			mixpanel.identify(user._id);
			mixpanel.people.set_once({
				'userId': user._id,
				'username': user.username,
				'$email': user.email,
				'$created': new Date(),
				'lastActivity': new Date(),
				'topics': 0,
				'keypoints': 0
			});
			mixpanel.track(events.SIGNUP);
		}

		function trackLogin(user) {
			mixpanel.identify(user._id);
			mixpanel.people.set({ 'lastActivity': new Date() });
			mixpanel.track(events.LOGIN);
		}

		return Analytics;
	}

	angular
	    .module('app.services')
	    .factory('AnalyticsService', AnalyticsService);
})();
