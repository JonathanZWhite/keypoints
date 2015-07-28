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
