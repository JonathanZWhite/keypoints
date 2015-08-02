(function () {
    'use strict';

    Tags.$inject = [];
    function Tags() {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                tags: '='
            },
            templateUrl: 'tags/tags.tpl.html',
            controllerAs: 'vm',
            bindToController: true,
            controller: Controller
        };
    }

    function Controller() {
        var vm = this;
    }

    angular
        .module('app.components.tags')
        .directive('tags', Tags);

}());
