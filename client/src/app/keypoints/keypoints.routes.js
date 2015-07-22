(function() {
    'use strict';

    function config($stateProvider) {
        $stateProvider
            .state('keypoints', {
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
            })
    }

    angular.module('app.keypoints')
        .config(['$stateProvider', config]);

}());
