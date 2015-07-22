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

angular.module("app.core").run(["$templateCache", function($templateCache) {$templateCache.put("topic/topic.tpl.html","<section class=topic><div class=ui-container><textarea class=\"ui-textarea ui-textarea--medium ui-textarea--light\" ng-model=vm.keypoint></textarea> <button class=\"ui-btn ui-btn--medium\" ng-click=vm.addKeypoint()>Add keypoint</button></div></section>");}]);
(function() {
    'use strict';

    TopicController.$inject = ['$stateParams', 'TopicService'];
    function TopicController($stateParams, TopicService) {
        var vm = this;
        // model
        vm.keypoint = '';
        // functions

        // TODO: create new topic if does not exist
        init();

        function init() {
            _createTopic();
        }

        function _createTopic() {
            TopicService.create($stateParams.url);
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
