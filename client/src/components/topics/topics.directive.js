(function () {
    'use strict';

    Topics.$inject = [];
    function Topics() {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                topics: '=',
                query: '='
            },
            templateUrl: 'topics/topics.tpl.html',
            controllerAs: 'vm',
            bindToController: true,
            controller: Controller
        };
    }

    function Controller() {
        var vm = this;
    }

    angular
        .module('app.components.topics')
        .directive('topics', Topics);

}());
