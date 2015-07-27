(function() {
	'use strict';

	AuthService.$inject = ['$http'];

	function AuthService($http) {
		var base = 'api/auth/';

		var Auth = {
			get: get,
			signup: signup
		};

		function signup(user) {
			return $http({
				url: base + 'signup',
				method: 'POST',
				data: user
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
