(function() {
    'use strict';

    function config($stateProvider) {
        $stateProvider
            .state('home', {
                url : '/',
                views: {
                    'content@': {
                        template: '<h1>Hello world</h1>',
                    }
                },
                data: {
                    pageTitle: 'Topic'
                }
            })
            .state('topic', {
                url: '/topic?url',
                views: {
                    'content@': {
                        templateUrl: 'topic/topic.tpl.html',
                        controllerAs: 'vm',
                        controller: 'TopicController'
                    }
                },
                data: {
                    pageTitle: 'Topic'
                }
            });
    }

    angular.module('app.pages.topic')
        .config(['$stateProvider', config]);

}());
