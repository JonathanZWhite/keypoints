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
        'app.pages.login',
        'app.pages.keypoints',
        'app.pages.tag',
        'app.pages.tags',
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
    .module('app.pages.keypoints', []);

angular
    .module('app.pages.list', []);

angular
    .module('app.pages.login', []);

angular
    .module('app.pages.signup', []);

angular
    .module('app.pages.tag', []);

angular
    .module('app.pages.tags', []);

angular
    .module('app.pages.topic', []);

(function() {
    'use strict';

    angular.module('app.components.composer', []);
})();

(function() {
    'use strict';

    angular.module('app.components.deleteButton', []);
})();

(function() {
    'use strict';

    angular.module('app.components.editOverlay', []);
})();

(function() {
    'use strict';

    angular.module('app.components.keypoint', []);
})();

(function() {
    'use strict';

    angular.module('app.components.message', []);
})();

(function() {
    'use strict';

    angular.module('app.components.navbar', []);
})();

(function() {
    'use strict';

    angular.module('app.components.search', []);
})();

(function() {
    'use strict';

    angular.module('app.components.topics', []);
})();

(function() {
    'use strict';

    angular.module('app.components', [
        'app.components.composer',
        'app.components.editOverlay',
        'app.components.deleteButton',
        'app.components.keypoint',
        'app.components.message',
        'app.components.navbar',
        'app.components.topics',
        'app.components.search'
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

    run.$inject = ['$rootScope', '$state', 'AuthService'];
    function run($rootScope, $state, AuthService) {
        $rootScope.$on('$stateChangeStart', function(event, toState, toStateParams) {
            if (toState.name === 'login') return;

            AuthService.isAuthenticated()
                .then(function(resp) {
                    if (!resp.data.isAuthenticated) {
                        $state.go('signup');
                    }
                });
        });
    }

    angular
        .module('app')
        .run(run)
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

angular.module("app.core").run(["$templateCache", function($templateCache) {$templateCache.put("keypoints/keypoints.tpl.html","<section class=ui-page><navbar></navbar><div class=ui-container><edit-overlay is-contenteditable=vm.isContenteditable keypoints=vm.keypoints></edit-overlay><h3 class=\"list__head text-dark--dark\">All keypoints</h3><search query=vm.query></search><keypoint ng-repeat=\"keypoint in vm.keypoints | filter: vm.query track by $index\" keypoint=keypoint keypoints=vm.keypoints is-contenteditable=vm.isContenteditable show-detail={{true}}></keypoint></div></section>");
$templateCache.put("list/list.tpl.html","<section class=ui-page><navbar></navbar><div class=ui-container><h3 class=\"list__head text-dark--dark\">Highlighted pages</h3><search query=vm.query></search><topics topics=vm.listStore.topics query=vm.query></topics></div></section>");
$templateCache.put("login/login.tpl.html","<section class=login><div class=ui-container><h3 class=\"login__head text-dark--dark\">Login</h3><input placeholder=email class=\"ui-input ui-input--medium ui-input--light\" ng-model=vm.user.email> <input placeholder=password type=password class=\"ui-input ui-input--medium ui-input--light\" ng-model=vm.user.password> <button class=\"login__btn ui-btn ui-btn--medium ui-btn--highlight\" ng-click=vm.login()>login</button> <span class=\"caption text-dark--lightest u-float-r\" ui-sref=signup>Create an account</span><message message=vm.message></message></div></section>");
$templateCache.put("tag/tag.tpl.html","<section class=ui-page><navbar></navbar><div class=ui-container><edit-overlay is-contenteditable=vm.isContenteditable keypoints=vm.keypointStore.keypoints></edit-overlay><h5 class=\"tp__head text-dark--dark\">Tag: {{vm.tagName}}</h5><keypoint ng-repeat=\"keypoint in vm.keypoints track by $index\" keypoint=keypoint keypoints=vm.keypoints is-contenteditable=vm.isContenteditable></keypoint></div></section>");
$templateCache.put("signup/signup.tpl.html","<section class=signup><div class=ui-container><h3 class=\"signup__head text-dark--dark\">Signup</h3><input placeholder=email class=\"ui-input ui-input--medium ui-input--light\" ng-model=vm.user.email> <input placeholder=username class=\"ui-input ui-input--medium ui-input--light\" ng-model=vm.user.username> <input placeholder=password type=password class=\"ui-input ui-input--medium ui-input--light\" ng-model=vm.user.password> <button class=\"signup__btn ui-btn ui-btn--medium ui-btn--highlight\" ng-click=vm.signup()>Signup</button> <span class=\"caption text-dark--lightest u-float-r\" ui-sref=login>Have an account?</span><message message=vm.message></message></div></section>");
$templateCache.put("tags/tags.tpl.html","<section class=ui-page><navbar></navbar><div class=ui-container><div class=tags__item ng-repeat=\"tag in vm.tags\" ng-bind=tag.name ui-sref=\"tag({ tagName: tag.name })\"></div></div></section>");
$templateCache.put("topic/topic.tpl.html","<section class=ui-page><navbar></navbar><div class=ui-container><edit-overlay is-contenteditable=vm.isContenteditable keypoints=vm.keypointStore.keypoints></edit-overlay><a ng-href=http://{{vm.topicStore.topic.url}} target=_blank><h5 class=\"tp__head text-dark--dark\" ng-bind=vm.topicStore.topic.title></h5></a><composer keypoints=vm.keypointStore.keypoints></composer><keypoint ng-repeat=\"keypoint in vm.keypointStore.keypoints track by $index\" keypoint=keypoint keypoints=vm.keypointStore.keypoints is-contenteditable=vm.isContenteditable></keypoint></div></section>");
$templateCache.put("composer/composer.tpl.html","<div class=composer><div class=composer__content><div class=composer__options><span class=\"composer__option caption text-dark--lightest\" ng-click=\"vm.toggleMode(\'text\')\" ng-class=\"{ \'composer__option--active\': vm.mode === \'text\' }\">TEXT</span> <span class=\"caption text-dark--lightest\">|</span> <span class=\"composer__option caption text-dark--lightest\" ng-click=\"vm.toggleMode(\'image\')\" ng-class=\"{ \'composer__option--active\': vm.mode === \'image\' }\">IMAGE</span></div><textarea placeholder=\"Enter in a keypoint about whatever article you are reading\" ng-show=\"vm.mode === \'text\'\" class=\"ui-textarea ui-textarea--medium ui-textarea--light\" ng-model=vm.keypoint></textarea> <input placeholder=http://imgur.com ng-show=\"vm.mode === \'image\'\" class=\"ui-input ui-input--medium ui-input--light\" ng-model=vm.image></div><input placeholder=\"adds tags, separated by a comma\" ng-list=\"\" class=\"ui-input ui-input--medium ui-input--light\" ng-model=vm.tags> <button class=\"composer__btn ui-btn ui-btn--medium ui-btn--highlight\" ng-click=vm.createKeypoint()>Add keypoint</button></div>");
$templateCache.put("delete-button/delete-button.tpl.html","<div class=db ng-click=vm.delete() ng-show=vm.show><i class=\"text-dark--light fa fa-times\"></i></div>");
$templateCache.put("edit-overlay/edit-overlay.tpl.html","<div class=edit-overlay ng-show=vm.isContenteditable ng-click=vm.disableContenteditable()></div>");
$templateCache.put("keypoint/keypoint-tags.tpl.html","<div class=kp-tags><ul class=\"kp-tags__list ui-list ui-list--di\"><li><i class=\"caption fa fa-tag\"></i></li><li ng-repeat=\"tag in vm.tags\"><span class=caption ng-bind=tag.name></span></li></ul></div>");
$templateCache.put("keypoint/keypoint.tpl.html","<div class=\"keypoint ui-card\" ng-class=\"{ \'keypoint--contenteditable\': vm.keypoint.isContenteditable, \'keypoint--preview\': vm.keypoint.contentType === \'image\' }\"><delete-button delete=vm.delKeypoint()></delete-button><div class=kp__meta ng-if=vm.showDetail><a class=\"kp__head text text-dark--dark u-truncate\" ng-bind=vm.keypoint.topic.title ng-href=http://{{vm.keypoint.topic.url}} target=_blank></a></div><div class=kp__content ng-if=\"vm.keypoint.contentType === \'text\'\"><p class=text-dark--light contenteditable=\"{{ vm.keypoint.isContenteditable }}\" ng-class=\"{ \'ui-contenteditabe\': vm.keypoint.isContenteditable }\" ng-model=vm.keypoint.keypoint ng-click=vm.enableContenteditable()></p><p></p></div><div class=\"kp__content kp__content--link\" ng-if=\"vm.keypoint.contentType === \'link\'\"><i class=\"text-dark--light inline fa fa-link\"></i> <a ng-href=\"{{ vm.keypoint.linkUrl }}\" target=_blank><p class=\"text-dark--light inline\" ng-bind=vm.keypoint.keypoint></p><p></p></a></div><div class=kp__preview ng-if=\"vm.keypoint.contentType === \'image\'\" ng-style=\"{ \'background-image\': \'url(\' + vm.keypoint.image + \')\' }\"></div><div class=kp__meta ng-if=\"vm.keypoint.tags.length !== 0\"><keypoint-tags tags=vm.keypoint.tags></keypoint-tags></div><button class=\"kp-btn ui-btn ui-btn--medium ui-btn--success\" ng-if=vm.keypoint.isContenteditable ng-click=vm.updateKeypoint()>update</button></div>");
$templateCache.put("message/message.tpl.html","<div class=message ng-if=vm.message.text ng-bind=vm.message.text></div>");
$templateCache.put("navbar/navbar.tpl.html","<nav class=navbar><a ui-sref=\"topic({ url: vm.clientStore.url })\" ng-class=\"{ \'navbar--active\': vm.isCurrentPage() }\">current</a> <a ui-sref=keypoints ng-class=\"{ \'navbar--active\': vm.$state.current.name === \'keypoints\' }\">keypoints</a> <a ui-sref=tags ng-class=\"{ \'navbar--active\': vm.$state.current.name === \'tags\' }\">tags</a> <a ui-sref=list ng-class=\"{ \'navbar--active\': vm.$state.current.name === \'list\' }\">pages</a> <span class=navbar__stretcher></span></nav>");
$templateCache.put("search/search.tpl.html","<input class=\"ui-input ui-input--medium ui-input--light\" placeholder=search ng-model=vm.query>");
$templateCache.put("topics/topics.tpl.html","<section class=topics><div class=ui-card ng-repeat=\"topic in vm.topics | filter: vm.query track by $index\" ui-sref=\"topic({ url: topic.url })\"><div class=topic__content><div class=\"ui-column ui-column--one\" ng-if=topic.image><div class=topic__preview ng-style=\"{ \'background-image\': \'url(\' + topic.image + \')\' }\"></div></div><div class=\"ui-column ui-column--eleven\"><span class=\"topic__head text-dark--dark u-reset-lh u-truncate\" ng-bind=topic.title></span></div><p class=\"caption text-dark--light\" ng-bind=topic.description></p></div></div></section>");}]);
(function() {
    'use strict';

    KeypointsController.$inject = ['KeypointStore'];
    function KeypointsController(KeypointStore) {
        var vm = this;
        vm.keypoints = [];
        vm.isContenteditable = false;

        init();

        function init() {
            KeypointStore.getAll()
                .then(function(resp) {
                    vm.keypoints = resp.data.data;
                });
        }
    }

    angular
        .module('app.pages.keypoints')
        .controller('KeypointsController', KeypointsController);
})();

(function() {
    'use strict';

    function config($stateProvider) {
        $stateProvider
            .state('keypoints', {
                url: '/keypoints',
                views: {
                    'content@': {
                        templateUrl: 'keypoints/keypoints.tpl.html',
                        controllerAs: 'vm',
                        controller: 'KeypointsController'
                    }
                },
                data: {
                    pageTitle: 'keypoints'
                }
            });
    }

    angular.module('app.pages.keypoints')
        .config(['$stateProvider', config]);

}());

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

    LoginController.$inject = ['$state', '$stateParams', 'AnalyticsService', 'AuthService'];
    function LoginController($state, $stateParams, AnalyticsService, AuthService) {
        var vm = this;
        // view model
        vm.user = {
            email: '',
            password: ''
        };
        vm.message = {
            type: null,
            text: ''
        };
        // functions
        vm.login = login;

        function login() {
            if (!vm.user.email || !vm.user.password) {
                _fillMessage('error', 'Please fill out all fields');
                return;
            }

            AuthService.login(vm.user)
                .then(function(resp) {
                    if (!resp.data.status) return _fillMessage('error', resp.data.message);
                    if (resp.data) {
                        AnalyticsService.trackLogin(resp.data);
                        $state.go('topic', { url: $stateParams.url });
                    }
                });
        }

        function _fillMessage(status, text) {
            vm.message.type = status;
            vm.message.text = text;
        }
    }

    angular
        .module('app.pages.login')
        .controller('LoginController', LoginController);
})();

(function() {
    'use strict';

    function config($stateProvider) {
        $stateProvider
            .state('login', {
                url: '/login?url',
                views: {
                    'content@': {
                        templateUrl: 'login/login.tpl.html',
                        controllerAs: 'vm',
                        controller: 'LoginController'
                    }
                },
                data: {
                    pageTitle: 'Login'
                }
            });
    }

    angular.module('app.pages.login')
        .config(['$stateProvider', config]);

}());

(function() {
    'use strict';

    SignupController.$inject = ['$state', '$stateParams', 'AnalyticsService', 'AuthService'];
    function SignupController($state, $stateParams, AnalyticsService, AuthService) {
        var vm = this;
        // view model
        vm.user = {
            email: '',
            username: '',
            password: ''
        };
        vm.message = {
            type: null,
            text: ''
        };
        // functions
        vm.signup = signup;

        function signup() {
            if (!vm.user.email || !vm.user.username || !vm.user.password) {
                _fillMessage('error', 'Please fill out all fields');
                return;
            }

            AuthService.signup(vm.user)
                .then(function(resp) {
                    if (!resp.data.status) return _fillMessage('error', resp.data.message);
                    if (resp.data) {
                        AnalyticsService.trackSignup(resp.data);
                        $state.go('topic', { url: $stateParams.url });
                    }
                });
        }

        function _fillMessage(status, text) {
            vm.message.type = status;
            vm.message.text = text;
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

    TagController.$inject = ['$stateParams', 'KeypointStore'];
    function TagController($stateParams, KeypointStore) {
        var vm = this;
        // model
        vm.keypoints = [];
        vm.tagName = $stateParams.tagName;
        // functions
        vm.isContenteditable = false;
        // activation
        init();

        function init() {
            console.log('This is the tagName', $stateParams.tagName);
            KeypointStore.getTagKeypoints($stateParams.tagName)
                .then(function(resp) {
                    vm.keypoints = resp.data.data;
                });
        }
    }

    angular
        .module('app.pages.tag')
        .controller('TagController', TagController);
})();

(function() {
    'use strict';

    function config($stateProvider) {
        $stateProvider
            .state('tag', {
                url: '/tag?tagName',
                views: {
                    'content@': {
                        templateUrl: 'tag/tag.tpl.html',
                        controllerAs: 'vm',
                        controller: 'TagController'
                    }
                },
                data: {
                    pageTitle: 'Tag'
                }
            });
    }

    angular.module('app.pages.tag')
        .config(['$stateProvider', config]);

}());

(function() {
    'use strict';

    TagsController.$inject = ['TagsService'];
    function TagsController(TagsService) {
        var vm = this;
        vm.tags = [];
        init();

        function init() {
            TagsService.getAll()
                .then(function(resp) {
                    vm.tags = resp.data.data;
                });
        }
    }

    angular
        .module('app.pages.tags')
        .controller('TagsController', TagsController);
})();

(function() {
    'use strict';

    function config($stateProvider) {
        $stateProvider
            .state('tags', {
                url: '/tags',
                views: {
                    'content@': {
                        templateUrl: 'tags/tags.tpl.html',
                        controllerAs: 'vm',
                        controller: 'TagsController'
                    }
                },
                data: {
                    pageTitle: 'Tags'
                }
            });
    }

    angular.module('app.pages.tags')
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
        vm.isContenteditable = false;
        // activation
        init();

        vm.keypointStore = KeypointStore.model;
        vm.topicStore = TopicStore.model;

        function init() {
            KeypointStore.init();
            TopicStore.init();
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

(function() {
	'use strict';

	AuthService.$inject = ['$http'];

	function AuthService($http) {
		var base = 'api/auth/';

		var Auth = {
			get: get,
			isAuthenticated: isAuthenticated,
			login: login,
			signup: signup
		};

		function isAuthenticated() {
			return $http({
				url: base + 'is-authenticated',
				method: 'GET'
			});
		}

		function login(user) {
			return $http({
				url: base + 'login',
				method: 'POST',
				data: user
			});
		}

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

	ClientStore.$inject = [];
	function ClientStore() {
		var Client = {
			model: {
				url: ''
			}
		};

		return Client;
	}

	angular
	    .module('app.services')
	    .factory('ClientStore', ClientStore);
})();

(function() {
	'use strict';

	KeypointStore.$inject = ['$http', '$stateParams', 'AnalyticsService'];

	function KeypointStore($http, $stateParams, AnalyticsService) {
		var base = 'api/keypoint/';

		var Keypoint = {
			model: {
				keypoints: []
			},
			add: add,
			addTags: addTags,
			del: del,
			getTagKeypoints: getTagKeypoints,
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
				AnalyticsService.track('KEYPOINT_ADDED');
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

		function getTagKeypoints(tagName) {
			return $http({
				url: base + 'tag-keypoints',
				method: 'GET',
				params: { tagName: tagName }
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

	MesssagesService.$inject = ['$state', '$window', 'ClientStore', 'KeypointStore'];

	function MesssagesService($state, $window, ClientStore, KeypointStore) {
		var Messages = {};

		init();

		function init() {
			$window.addEventListener('message', handleMessage, false);
		}

		function handleMessage(message) {
			var payload = message.data;
			switch(payload.type) {
				case 'init':
					ClientStore.model.url = payload.url;
					break;
				case 'navigate':
					ClientStore.model.url = payload.url;
					$state.go('topic', { url: payload.url });
					break;
				case 'context':
					KeypointStore.add({
						url: payload.url,
						keypoint: payload.keypoint,
						image: payload.image,
						linkUrl: payload.linkUrl,
						tags: []
					})
					.then(function(resp) {
						_sendMessage({
							type: 'success',
							data: resp.data // keypoint
						});
					});
					break;
				case 'tag':
					KeypointStore.addTags(payload.data);
			}
		}

		function _sendMessage(payload) {
			$window.parent.postMessage(payload, '*');
		}

		return Messages;
	}

	angular
	    .module('app.services')
	    .factory('MesssagesService', MesssagesService);
})();

(function() {
	'use strict';

	TagsService.$inject = ['$http'];

	function TagsService($http) {
		var base = 'api/tags/';

		var Tags = {
			getAll: getAll,
		};

		function getAll() {
			return $http({
				url: base + 'all',
				method: 'GET'
			});
		}

		return Tags;
	}

	angular
	    .module('app.services')
	    .factory('TagsService', TagsService);
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
			create: create,
			init: init
		};

		function init() {
			console.log('Initializing topic store');
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
        vm.tags = [];
        // function
        vm.createKeypoint = createKeypoint;
        vm.toggleMode = toggleMode;

        function toggleMode(mode) {
            vm.mode = mode;
        }

        function createKeypoint() {
            if (!vm.keypoint && !vm.image) return;

            KeypointStore.add({
                url: $stateParams.url,
                keypoint: vm.keypoint,
                image: vm.image,
                tags: vm.tags
            });

            vm.keypoint = '';
            vm.image = '';
            vm.tags = [];
        }
    }

    angular
        .module('app.components.composer')
        .directive('composer', Composer);

}());

(function () {
    'use strict';

    DeleteButton.$inject = [];
    function DeleteButton() {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                delete: '&'
            },
            templateUrl: 'delete-button/delete-button.tpl.html',
            controllerAs: 'vm',
            bindToController: true,
            link: link,
            controller: Controller
        };

        function link(scope, elem, attrs, vm) {
            var parent = elem.parent()[0];
            angular.element(parent).on('mouseenter', function() { _handleMouseEvent(true); });
            angular.element(parent).on('mouseleave', function() { _handleMouseEvent(false); });

            function _handleMouseEvent(toggle) {
                vm.show = toggle;
                scope.$apply();
            }
        }
    }

    function Controller() {}

    angular
        .module('app.components.deleteButton')
        .directive('deleteButton', DeleteButton);

}());

(function () {
    'use strict';

    EditOverlay.$inject = [];
    function EditOverlay() {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                isContenteditable: '=',
                keypoints: '='
            },
            templateUrl: 'edit-overlay/edit-overlay.tpl.html',
            controllerAs: 'vm',
            bindToController: true,
            controller: Controller
        };
    }

    function Controller() {
        var vm = this;

        vm.disableContenteditable = disableContenteditable;

        function disableContenteditable() {
            vm.isContenteditable = false;
            console.log('Look', vm.keypoints);
            vm.keypoints.forEach(function(keypoint) {
                console.log(keypoint);
                if (keypoint.isContenteditable) {
                    keypoint.isContenteditable = false;
                }
            });
        }
    }

    angular
        .module('app.components.editOverlay')
        .directive('editOverlay', EditOverlay);

}());

(function () {
    'use strict';

    KeypointTags.$inject = [];
    function KeypointTags() {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                tags: '='
            },
            templateUrl: 'keypoint/keypoint-tags.tpl.html',
            controllerAs: 'vm',
            bindToController: true,
            controller: Controller
        };
    }

    function Controller() {
        var vm = this;
    }

    angular
        .module('app.components.keypoint')
        .directive('keypointTags', KeypointTags);

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
                isContenteditable: '=',
                showDetail: '@'
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

                console.log('toggline...');

                vm.keypoint.keypoint = vm.keypointOldValue;
                vm.isContenteditable = false;
                vm.keypoint.isContenteditable = false;
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
            // vm.keypoint = keypointOldValue;
            // vm.keypoint.isContenteditable = false;
            // vm.isContenteditable = false;
        }

        function enableContenteditable() {
            vm.keypointOldValue = angular.copy(vm.keypoint.keypoint);
            vm.keypoint.isContenteditable = true;
            vm.isContenteditable = true;
        }

        function updateKeypoint() {
            console.log('Updating keypoint....', vm.keypoint);
            vm.keypoint.isContenteditable = false;
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

    Message.$inject = [];
    function Message() {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                message: '='
            },
            templateUrl: 'message/message.tpl.html',
            controllerAs: 'vm',
            bindToController: true,
            controller: Controller
        };
    }

    function Controller() {
        var vm = this;
    }

    angular
        .module('app.components.message')
        .directive('message', Message);

}());

(function () {
    'use strict';

    Navbar.$inject = ['$state', '$stateParams', 'ClientStore'];
    function Navbar() {
        return {
            restrict: 'E',
            replace: true,
            scope: {},
            templateUrl: 'navbar/navbar.tpl.html',
            controllerAs: 'vm',
            bindToController: true,
            controller: Controller
        };
    }

    function Controller($state, $stateParams, ClientStore) {
        var vm = this;
        vm.$state = $state;
        vm.$stateParams = $stateParams;
        vm.clientStore = ClientStore.model;
        vm.isCurrentPage = isCurrentPage;

        function isCurrentPage() {
            return (($stateParams.url === vm.clientStore.url) && ($state.current.name === 'topic'));
        }
    }

    angular
        .module('app.components.navbar')
        .directive('navbar', Navbar);

}());

(function () {
    'use strict';

    Search.$inject = [];
    function Search($stateParams, KeypointStore) {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                query: '='
            },
            templateUrl: 'search/search.tpl.html',
            controllerAs: 'vm',
            bindToController: true,
            controller: Controller
        };
    }

    function Controller() {
        var vm = this;

    }

    angular
        .module('app.components.search')
        .directive('search', Search);

}());

(function () {
    'use strict';

    Topics.$inject = [];
    function Topics() {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                topics: '=',
                query: '='
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
