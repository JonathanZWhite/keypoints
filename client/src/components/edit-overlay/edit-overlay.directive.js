(function () {
    'use strict';

    EditOverlay.$inject = [];
    function EditOverlay() {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                isContenteditable: '=',
                keypoints: '='
            },
            templateUrl: 'edit-overlay/edit-overlay.tpl.html',
            controllerAs: 'vm',
            bindToController: true,
            controller: Controller
        };
    }

    function Controller() {
        var vm = this;

        vm.disableContenteditable = disableContenteditable;

        function disableContenteditable() {
            vm.isContenteditable = false;
            console.log('Look', vm.keypoints);
            vm.keypoints.forEach(function(keypoint) {
                console.log(keypoint);
                if (keypoint.isContenteditable) {
                    keypoint.isContenteditable = false;
                }
            });
        }
    }

    angular
        .module('app.components.editOverlay')
        .directive('editOverlay', EditOverlay);

}());
