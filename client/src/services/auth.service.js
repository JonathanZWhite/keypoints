(function() {
	'use strict';

	AuthService.$inject = ['$http'];

	function AuthService($http) {
		var base = 'api/auth/';

		var Auth = {
			get: get,
			signup: signup
		};

		function signup() {
			return $http({
				url: base + 'signup',
				method: 'POST',
				data: {
					email: 'jonathanzwhite@gmail.com',
					password: 'movingcastle',
					username: 'jonathanzwhite'
				}
			});
		}

		function get() {
			return $http({
				url: base + 'get',
				method: 'GET'
			});
		}

		return Auth;
	}

	angular
	    .module('app.services')
	    .factory('AuthService', AuthService);
})();
