(function () {
    'use strict';

    Search.$inject = [];
    function Search($stateParams, KeypointStore) {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                query: '='
            },
            templateUrl: 'search/search.tpl.html',
            controllerAs: 'vm',
            bindToController: true,
            controller: Controller
        };
    }

    function Controller() {
        var vm = this;

    }

    angular
        .module('app.components.search')
        .directive('search', Search);

}());
