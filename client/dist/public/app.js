(function() {
    'use strict';
    angular
        .module('app', [
            'app.core',
            'app.components',
            'app.directives',
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

    angular.module('app.components.composer', []);
})();

(function() {
    'use strict';

    angular.module('app.components.keypoint', []);
})();

(function() {
    'use strict';

    angular.module('app.components', [
        'app.components.composer',
        'app.components.keypoint'
    ]);
})();

(function() {
    'use strict';

    angular.module('app.directives', []);
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

angular.module("app.core").run(["$templateCache", function($templateCache) {$templateCache.put("topic/topic.tpl.html","<section class=topic><div class=ui-container><div class=edit-overlay ng-show=vm.contenteditable ng-click=vm.disableContenteditable()></div><composer keypoints=vm.keypoints></composer><keypoint ng-repeat=\"keypoint in vm.keypoints track by $index\" keypoint=keypoint keypoints=vm.keypoints is-contenteditable=vm.contenteditable></keypoint></div></section>");
$templateCache.put("keypoint/keypoint.tpl.html","<div class=\"keypoint ui-card\" ng-class=\"{ \'keypoint--contenteditable\': vm.keypoint.contenteditable, \'keypoint--preview\': vm.mode === \'image\' }\"><div class=kp__meta><span class=\"caption caption--dark\" ng-bind=\"vm.keypoint.created | date:\'mediumDate\'\"></span><ul class=kp__options><li class=kp__option ng-click=vm.delKeypoint(vm.keypoint)><i class=\"caption--dark fa fa-trash-o\"></i></li><li class=kp__option><i class=\"caption--dark fa fa-bars\"></i></li><li class=kp__option ng-click=vm.enableContenteditable()><i class=\"caption--dark fa fa-pencil\"></i></li></ul></div><p class=text--dark contenteditable=\"{{ vm.keypoint.contenteditable }}\" ng-class=\"{ \'ui-contenteditabe\': vm.keypoint.contenteditable }\" ng-model=vm.keypoint.keypoint></p><p><div class=kp__preview ng-style=\"{ \'background-image\': \'url(\' + vm.keypoint.image + \')\' }\"></div><button class=\"kp-btn ui-btn ui-btn--medium ui-btn--success\" ng-if=vm.keypoint.contenteditable ng-click=vm.updateKeypoint()>update</button></p></div>");
$templateCache.put("composer/composer.tpl.html","<div class=composer><div class=composer__options><span class=\"composer__option caption caption--dark\" ng-click=\"vm.toggleMode(\'text\')\" ng-class=\"{ \'composer__option--active\': vm.mode === \'text\' }\">TEXT</span> <span class=\"caption caption--dark\">|</span> <span class=\"composer__option caption caption--dark\" ng-click=\"vm.toggleMode(\'image\')\" ng-class=\"{ \'composer__option--active\': vm.mode === \'image\' }\">IMAGE</span></div><textarea placeholder=\"Enter in a keypoint about whatever article you are reading\" ng-show=\"vm.mode === \'text\'\" class=\"ui-textarea ui-textarea--medium ui-textarea--light\" ng-model=vm.keypoint></textarea> <input placeholder=http://imgur.com ng-show=\"vm.mode === \'image\'\" class=\"ui-input ui-input--medium ui-input--light\" ng-model=vm.image> <button class=\"composer__btn ui-btn ui-btn--medium ui-btn--highlight\" ng-click=vm.createKeypoint()>Add keypoint</button></div>");}]);
(function() {
    'use strict';

    TopicController.$inject = ['$stateParams', 'KeypointService'];
    function TopicController($stateParams, KeypointService) {
        var vm = this;
        // model
        vm.keypoints = [];
        // functions
        vm.contenteditable = false;

        // activation
        init();

        function init() {
            KeypointService.list($stateParams.url)
                .then(function(resp) {
                    vm.keypoints = resp.data;
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

    Contenteditable.$inject = [];
    function Contenteditable() {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: link
        };

        function link(scope, element, attrs, ngModel) {
            function read() {
                ngModel.$setViewValue(element.html());
            }

            ngModel.$render = function() {
                element.html(ngModel.$viewValue || '');
            };

            element.bind('blur keyup change', function() {
                scope.$apply(read);
            });
        }
    }


    angular
        .module('app.directives')
        .directive('contenteditable', Contenteditable);

}());

(function() {
	'use strict';

	KeypointService.$inject = ['$http'];

	function KeypointService($http) {
		var base = 'api/keypoint/';

		var Keypoint = {
			create: create,
			del: del,
			list: list,
			update: update
		};

		function create(url, keypoint, image) {
			return $http({
				url: base + 'create',
				method: 'POST',
				data: {
					url: url,
					keypoint: keypoint,
					image: image
				}
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

(function () {
    'use strict';

    /**
     * Composer is the actual user
     */
    Composer.$inject = ['$stateParams', 'KeypointService'];
    function Composer($stateParams, KeypointService) {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                keypoints: '='
            },
            templateUrl: 'composer/composer.tpl.html',
            controllerAs: 'vm',
            bindToController: true,
            controller: Controller
        };
    }

    function Controller($stateParams, KeypointService) {
        var vm = this;
        // model
        vm.keypoint = '';
        vm.image = '';
        vm.mode = 'text';
        // function
        vm.createKeypoint = createKeypoint;
        vm.toggleMode = toggleMode;

        function toggleMode(mode) {
            vm.mode = mode;
        }

        function createKeypoint() {
            if (!vm.keypoint && !vm.image) return;

            KeypointService.create($stateParams.url, vm.keypoint, vm.image)
                .then(function(resp) {
                    vm.keypoints.unshift(resp.data);
                });
        }
    }

    angular
        .module('app.components.composer')
        .directive('composer', Composer);

}());

(function () {
    'use strict';

    /**
     * Keypoint is the actual user
     */
    Keypoint.$inject = ['$document', 'KeypointService'];
    function Keypoint($document, KeypointService) {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                keypoint: '=',
                keypoints: '=',
                isContenteditable: '='
            },
            templateUrl: 'keypoint/keypoint.tpl.html',
            controllerAs: 'vm',
            bindToController: true,
            controller: Controller,
            link: link
        };

        function link(scope, elem, attrs, vm) {
            function handleDocumentClick() {
                if (!vm.isContenteditable) {
                    return;
                }

                vm.keypoint.keypoint = vm.keypointOldValue;
                vm.isContenteditable = false;
                vm.keypoint.contenteditable = false;
                scope.$apply();
            }

            $document.on('click', handleDocumentClick);
            elem.on('click', handleElemClick);

            function handleElemClick() {
                 event.stopPropagation();
                 console.log('Stopping prop');
            }
        }
    }

    function Controller($document, KeypointService) {
        var vm = this;

        vm.keypointOldValue = '';
        vm.delKeypoint = delKeypoint;
        vm.disableContenteditable = disableContenteditable;
        vm.enableContenteditable = enableContenteditable;
        vm.updateKeypoint = updateKeypoint;

        function disableContenteditable() {
            vm.keypoint = keypointOldValue;
            vm.keypoint.contenteditable = false;
            vm.isContenteditable = false;
        }

        function enableContenteditable() {
            vm.keypointOldValue = angular.copy(vm.keypoint.keypoint);
            vm.keypoint.contenteditable = true;
            vm.isContenteditable = true;
        }

        function updateKeypoint() {
            vm.keypoint.contenteditable = false;
            KeypointService.update(vm.keypoint);
            vm.isContenteditable = false;
        }

        function delKeypoint() {
            KeypointService.del(vm.keypoint._id)
                .then(function(resp) {
                    if (resp.data.status) {
                        var index = vm.keypoints.indexOf(vm.keypoint);
                        vm.keypoints.splice(index, 1);
                    }
                });
        }
    }

    angular
        .module('app.components.keypoint')
        .directive('keypoint', Keypoint);

}());
