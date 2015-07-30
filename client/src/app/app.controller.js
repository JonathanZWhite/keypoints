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
