(function () {
    'use strict';

    Navbar.$inject = ['$state', '$stateParams'];
    function Navbar() {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                topicUrl: '='
            },
            templateUrl: 'navbar/navbar.tpl.html',
            controllerAs: 'vm',
            bindToController: true,
            controller: Controller
        };
    }

    function Controller($state, $stateParams) {
        var vm = this;
        vm.$state = $state;
        vm.$stateParams = $stateParams;
        
        vm.isCurrentPage = isCurrentPage;

        function isCurrentPage() {
            return (($stateParams.url === vm.topicUrl) && ($state.current.name === 'topic'));
        }
    }

    angular
        .module('app.components.navbar')
        .directive('navbar', Navbar);

}());
