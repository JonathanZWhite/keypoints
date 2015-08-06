(function () {
    'use strict';

    DeleteButton.$inject = [];
    function DeleteButton() {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                delete: '&'
            },
            templateUrl: 'delete-button/delete-button.tpl.html',
            controllerAs: 'vm',
            bindToController: true,
            link: link,
            controller: Controller
        };

        function link(scope, elem, attrs, vm) {
            console.log('Look this the parent', elem.parent()[0]);
            var parent = elem.parent()[0];
            angular.element(parent).on('mouseenter', function() { _handleMouseEvent(true); });
            angular.element(parent).on('mouseleave', function() { _handleMouseEvent(false); });

            function _handleMouseEvent(toggle) {
                vm.show = toggle;
                scope.$apply();
            }
        }
    }

    function Controller() {}

    angular
        .module('app.components.deleteButton')
        .directive('deleteButton', DeleteButton);

}());
