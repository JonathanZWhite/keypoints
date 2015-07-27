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
