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
