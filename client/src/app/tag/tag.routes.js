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
