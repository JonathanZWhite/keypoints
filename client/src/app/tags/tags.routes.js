(function() {
    'use strict';

    function config($stateProvider) {
        $stateProvider
            .state('tags', {
                url: '/tags',
                views: {
                    'content@': {
                        templateUrl: 'tags/tagsyo.tpl.html',
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
