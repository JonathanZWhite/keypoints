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
        'app.pages.list',
        'app.pages.topic',
        'app.pages.signup'
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
    .module('app.pages.list', []);

angular
    .module('app.pages.signup', []);

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

    angular.module('app.components.topics', []);
})();

(function() {
    'use strict';

    angular.module('app.components', [
        'app.components.composer',
        'app.components.keypoint',
        'app.components.topics'
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

angular.module("app.core").run(["$templateCache", function($templateCache) {$templateCache.put("signup/signup.tpl.html","<section class=signup><div class=ui-container><h3 class=\"signup__head text-dark--dark\">Signup</h3><input placeholder=email class=\"ui-input ui-input--medium ui-input--light\" ng-model=vm.user.email> <input placeholder=username class=\"ui-input ui-input--medium ui-input--light\" ng-model=vm.user.username> <input placeholder=password type=password class=\"ui-input ui-input--medium ui-input--light\" ng-model=vm.user.password> <button class=\"composer__btn ui-btn ui-btn--medium ui-btn--highlight\" ng-click=vm.signup()>Signup</button></div></section>");
$templateCache.put("list/list.tpl.html","<section class=list><div class=ui-container><h3 class=\"list__head text-dark--dark\">Highlighted topics</h3><topics topics=vm.listStore.topics></topics></div></section>");
$templateCache.put("topic/topic.tpl.html","<section class=tp><div class=ui-container><div class=edit-overlay ng-show=vm.contenteditable ng-click=vm.disableContenteditable()></div><h5 class=\"tp__head text-dark--dark\" ng-bind=vm.topicStore.topic.title></h5><composer keypoints=vm.keypointStore.keypoints></composer><keypoint ng-repeat=\"keypoint in vm.keypointStore.keypoints track by $index\" keypoint=keypoint keypoints=vm.keypointStore.keypoints is-contenteditable=vm.contenteditable></keypoint></div></section>");
$templateCache.put("composer/composer.tpl.html","<div class=composer><div class=composer__options><span class=\"composer__option caption text-dark--lightest\" ng-click=\"vm.toggleMode(\'text\')\" ng-class=\"{ \'composer__option--active\': vm.mode === \'text\' }\">TEXT</span> <span class=\"caption text-dark--lightest\">|</span> <span class=\"composer__option caption text-dark--lightest\" ng-click=\"vm.toggleMode(\'image\')\" ng-class=\"{ \'composer__option--active\': vm.mode === \'image\' }\">IMAGE</span></div><textarea placeholder=\"Enter in a keypoint about whatever article you are reading\" ng-show=\"vm.mode === \'text\'\" class=\"ui-textarea ui-textarea--medium ui-textarea--light\" ng-model=vm.keypoint></textarea> <input placeholder=http://imgur.com ng-show=\"vm.mode === \'image\'\" class=\"ui-input ui-input--medium ui-input--light\" ng-model=vm.image> <button class=\"composer__btn ui-btn ui-btn--medium ui-btn--highlight\" ng-click=vm.createKeypoint()>Add keypoint</button></div>");
$templateCache.put("keypoint/keypoint.tpl.html","<div class=\"keypoint ui-card\" ng-class=\"{ \'keypoint--contenteditable\': vm.keypoint.contenteditable, \'keypoint--preview\': vm.keypoint.contentType === \'image\' }\"><div class=kp__meta><span class=\"caption text-dark--lightest\" ng-bind=\"vm.keypoint.created | date:\'mediumDate\'\"></span><ul class=kp__options><li class=kp__option ng-click=vm.delKeypoint(vm.keypoint)><i class=\"text-dark--lightest fa fa-trash-o\"></i></li><li class=kp__option><i class=\"text-dark--lightest fa fa-bars\"></i></li><li class=kp__option ng-click=vm.enableContenteditable() ng-if=\"vm.keypoint.contentType === \'text\'\"><i class=\"text-dark--lightest fa fa-pencil\"></i></li></ul></div><p class=text-dark--light ng-if=\"vm.keypoint.contentType === \'text\'\" contenteditable=\"{{ vm.keypoint.contenteditable }}\" ng-class=\"{ \'ui-contenteditabe\': vm.keypoint.contenteditable }\" ng-model=vm.keypoint.keypoint></p><p><div class=kp__preview ng-if=\"vm.keypoint.contentType === \'image\'\" ng-style=\"{ \'background-image\': \'url(\' + vm.keypoint.image + \')\' }\"></div><button class=\"kp-btn ui-btn ui-btn--medium ui-btn--success\" ng-if=vm.keypoint.contenteditable ng-click=vm.updateKeypoint()>update</button></p></div>");
$templateCache.put("topics/topics.tpl.html","<section class=topics><div class=ui-card ng-repeat=\"topic in vm.topics track by $index\"><div class=topic__content><div class=\"ui-column ui-column--one\"><div class=topic__preview ng-style=\"{ \'background-image\': \'url(\' + topic.image + \')\' }\"></div></div><div class=\"ui-column ui-column--eleven\"><span class=\"topic__head text-dark--dark u-reset-lh u-truncate\" ng-bind=topic.title></span></div><p class=\"caption text-dark--light\" ng-bind=topic.description></p></div></div></section>");}]);
(function() {
    'use strict';

    ListController.$inject = ['ListStore'];
    function ListController(ListStore) {
        var vm = this;

        vm.listStore = ListStore.model;
    }

    angular
        .module('app.pages.list')
        .controller('ListController', ListController);
})();

(function() {
    'use strict';

    function config($stateProvider) {
        $stateProvider
            .state('list', {
                url: '/list',
                views: {
                    'content@': {
                        templateUrl: 'list/list.tpl.html',
                        controllerAs: 'vm',
                        controller: 'ListController'
                    }
                },
                data: {
                    pageTitle: 'List'
                }
            });
    }

    angular.module('app.pages.list')
        .config(['$stateProvider', config]);

}());

(function() {
    'use strict';

    SignupController.$inject = ['$state', '$stateParams', 'AuthService'];
    function SignupController($state, $stateParams, AuthService) {
        var vm = this;
        // view model
        vm.user = {
            email: '',
            username: '',
            password: ''
        };
        // functions
        vm.signup = signup;

        function signup() {
            AuthService.signup(vm.user)
                .then(function(resp) {
                    if (resp.data) {
                        $state.go('topic', { url: $stateParams.url });
                    }
                });
        }
    }

    angular
        .module('app.pages.signup')
        .controller('SignupController', SignupController);
})();

(function() {
    'use strict';

    function config($stateProvider) {
        $stateProvider
            .state('signup', {
                url: '/signup?url',
                views: {
                    'content@': {
                        templateUrl: 'signup/signup.tpl.html',
                        controllerAs: 'vm',
                        controller: 'SignupController'
                    }
                },
                data: {
                    pageTitle: 'Signup'
                }
            });
    }

    angular.module('app.pages.signup')
        .config(['$stateProvider', config]);

}());

(function() {
    'use strict';

    TopicController.$inject = ['$stateParams', 'KeypointStore', 'MesssagesService', 'TopicStore'];
    function TopicController($stateParams, KeypointStore, MesssagesService, TopicStore) {
        var vm = this;
        // model
        vm.keypoints = [];
        // functions
        vm.contenteditable = false;

        vm.keypointStore = KeypointStore.model;
        vm.topicStore = TopicStore.model;
    }

    angular
        .module('app.pages.topic')
        .controller('TopicController', TopicController);
})();

(function() {
    'use strict';

    function config($stateProvider) {
        $stateProvider
            .state('home', {
                url : '/',
                views: {
                    'content@': {
                        template: '<h1>Hello world</h1>',
                    }
                },
                data: {
                    pageTitle: 'Topic'
                }
            })
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
				Keypoint.model.keypoints.push(resp);
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

(function() {
	'use strict';

	MesssagesService.$inject = ['$window', 'KeypointStore'];

	function MesssagesService($window, KeypointStore) {
		var Messages = {};

		init();

		function init() {
			$window.addEventListener('message', handleChange, false);
		}

		function handleChange(message) {
			console.log('Look', message.data);
			var payload = message.data;
			KeypointStore.create(payload.url, payload.keypoint, payload.image);
		}


		return Messages;
	}

	angular
	    .module('app.services')
	    .factory('MesssagesService', MesssagesService);
})();

(function() {
	'use strict';

	TopicService.$inject = ['$http'];

	function TopicService($http) {
		var base = 'api/topic/';

		var Topic = {
			getAll: getAll
		};

		function getAll() {
			return $http({
				url: base + 'all',
				method: 'GET'
			});
		}

		return Topic;
	}

	angular
	    .module('app.services')
	    .factory('TopicService', TopicService);
})();

(function() {
	'use strict';

	TopicStore.$inject = ['$http', '$stateParams'];

	function TopicStore($http, $stateParams) {
		var base = 'api/topic/';

		var Topic = {
			model: {
				topic: {}
			},
			create: create
		};

		init();

		function init() {
			console.log('Initializing');
			get($stateParams.url)
				.then(function(resp) {
					Topic.model.topic = resp.data;
				});
		}

		function create(url) {
			return $http({
				url: base + 'create',
				method: 'POST',
				data: { url: url }
			});
		}

		function get(url) {
			return $http({
				url: base + 'get',
				method: 'GET',
				params: { url: url }
			});
		}

		return Topic;
	}

	angular
	    .module('app.services')
	    .factory('TopicStore', TopicStore);
})();

(function () {
    'use strict';

    /**
     * Composer is the actual user
     */
    Composer.$inject = ['$stateParams', 'KeypointStore'];
    function Composer($stateParams, KeypointStore) {
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

    function Controller($stateParams, KeypointStore) {
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

            KeypointStore.create($stateParams.url, vm.keypoint, vm.image);
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
    Keypoint.$inject = ['$document', 'KeypointStore'];
    function Keypoint($document, KeypointStore) {
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
            }
        }
    }

    function Controller($document, KeypointStore) {
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
            KeypointStore.update(vm.keypoint);
            vm.isContenteditable = false;
        }

        function delKeypoint() {
            KeypointStore.del(vm.keypoint._id)
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

(function () {
    'use strict';

    Topics.$inject = [];
    function Topics() {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                topics: '='
            },
            templateUrl: 'topics/topics.tpl.html',
            controllerAs: 'vm',
            bindToController: true,
            controller: Controller
        };
    }

    function Controller() {
        var vm = this;
    }

    angular
        .module('app.components.topics')
        .directive('topics', Topics);

}());
