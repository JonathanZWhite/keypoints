(function() {
    'use strict';
    angular
        .module('app', [
            'app.core',
            'app.components',
            'app.pages',
            'app.services'
        ]);
})();

(function() {
    'use strict';

    angular.module('app.pages', [
        'app.pages.topic'
    ]);
})();

(function() {
    'use strict';

    angular
        .module('app.core', [
            'ngAnimate',
            'ngResource',
            'ngSanitize',
            'ui.router'
        ]);

})();

angular
    .module('app.pages.topic', []);

(function() {
    'use strict';

    angular.module('app.components', []);
})();

(function() {
    'use strict';

    angular.module('app.services', []);
})();

(function () {
    'use strict';

    function AppController($rootScope, $scope, $stateParams) {
        $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
            $scope.pageTitle = toState.data.pageTitle;
        });
    }

    angular
        .module('app')
        .controller('AppController', ['$rootScope', '$scope', '$stateParams', AppController]); // 3rd

}());

(function () {
    'use strict';

    config.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];
    function config($locationProvider, $stateProvider, $urlRouterProvider) {
        // Route config
        $locationProvider.html5Mode(true).hashPrefix('!');
        $urlRouterProvider.otherwise('/');
    }

    angular.module('app')
        .config(config);

}());

angular.module("app.core").run(["$templateCache", function($templateCache) {$templateCache.put("topic/topic.tpl.html","<section class=topic><div class=ui-container><textarea class=\"ui-textarea ui-textarea--medium ui-textarea--light\" ng-model=vm.keypoint></textarea> <button class=\"topic__btn ui-btn ui-btn--medium ui-btn--highlight\" ng-click=vm.createKeypoint()>Add keypoint</button><div class=\"topic__card ui-card\" ng-repeat=\"keypoint in vm.keypoints track by $index\"><div class=kp__meta><span class=\"caption caption--dark\" ng-bind=\"keypoint.created | date:\'mediumDate\'\"></span><ul class=kp__options><li class=kp__option ng-click=vm.delKeypoint(keypoint)><i class=\"caption--dark fa fa-trash-o\"></i></li><li class=kp__option><i class=\"caption--dark fa fa-bars\"></i></li><li class=kp__option><i class=\"caption--dark fa fa-pencil\"></i></li></ul></div><p class=text--dark ng-bind=keypoint.keypoint></p><p></p></div></div></section>");}]);
(function() {
    'use strict';

    TopicController.$inject = ['$stateParams', 'KeypointService', 'TopicService'];
    function TopicController($stateParams, KeypointService, TopicService) {
        var vm = this;
        // model
        vm.keypoint = '';
        vm.keypoints = [];
        // functions
        vm.createKeypoint = createKeypoint;
        vm.delKeypoint = delKeypoint;
        // activation
        init();

        function init() {
            KeypointService.list($stateParams.url)
                .then(function(resp) {
                    vm.keypoints = resp.data;
                });
        }

        function createKeypoint() {
            KeypointService.create($stateParams.url, vm.keypoint)
                .then(function(resp) {
                    vm.keypoints.unshift(resp.data);
                });
        }

        function delKeypoint(keypoint) {
            KeypointService.del($stateParams.url, keypoint._id)
                .then(function(resp) {
                    if (resp.data.status) {
                        var index = vm.keypoints.indexOf(keypoint);
                        vm.keypoints.splice(index, 1);
                    }
                });
        }
    }

    angular
        .module('app.pages.topic')
        .controller('TopicController', TopicController);
})();

(function() {
    'use strict';

    function config($stateProvider) {
        $stateProvider
            .state('topic', {
                url: '/topic?url',
                views: {
                    'content@': {
                        templateUrl: 'topic/topic.tpl.html',
                        controllerAs: 'vm',
                        controller: 'TopicController'
                    }
                },
                data: {
                    pageTitle: 'Topic'
                }
            });
    }

    angular.module('app.pages.topic')
        .config(['$stateProvider', config]);

}());

(function() {
	'use strict';

	TopicStore.$inject = ['$http'];
	function TopicStore($http) {
		var base = 'api/topic/';

		var Topic = {
			// models
			topic: {
				model: {}
			},

			model: {
				newTopic: {
					
				}
			}
		};

		// activation
		init();

		return Topic;

		function init() {
			console.log('Topic store initialized');
		}
	}

	angular
        .module('app.pages.topic')
        .factory('TopicStore', TopicStore);
})();

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
