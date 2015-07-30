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
