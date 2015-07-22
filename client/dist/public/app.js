(function() {
    'use strict';
    angular
        .module('app', [
            'app.core',
            'app.components',
            'app.pages'
        ]);
})();

(function() {
    'use strict';

    angular.module('app.pages', [
        'app.pages.keypoints'
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

angular.module("app.core").run(["$templateCache", function($templateCache) {$templateCache.put("keypoints/keypoints.tpl.html","<section class=kp><div class=ui-container><textarea class=\"ui-textarea ui-textarea--medium ui-textarea--light\"></textarea> <button class=\"ui-btn ui-btn--medium\">Add keypoint</button></div></section>");}]);
(function() {
    'use strict';

    KeypointsController.$inject = [];
    function KeypointsController() {

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
                url: '/keypoints/:url',
                views: {
                    'content@': {
                        templateUrl: 'keypoints/keypoints.tpl.html',
                        controllerAs: 'vm',
                        controller: 'KeypointsController'
                    }
                },
                data: {
                    pageTitle: 'Keypints'
                }
            });
    }

    angular.module('app.pages.keypoints')
        .config(['$stateProvider', config]);

}());
