(function () {
    'use strict';

    Message.$inject = [];
    function Message() {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                message: '='
            },
            templateUrl: 'message/message.tpl.html',
            controllerAs: 'vm',
            bindToController: true,
            controller: Controller
        };
    }

    function Controller() {
        var vm = this;
    }

    angular
        .module('app.components.message')
        .directive('message', Message);

}());
