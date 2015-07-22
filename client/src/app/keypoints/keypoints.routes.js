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
