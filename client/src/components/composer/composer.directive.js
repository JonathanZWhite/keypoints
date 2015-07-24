(function () {
    'use strict';

    /**
     * Composer is the actual user
     */
    Composer.$inject = ['$stateParams', 'KeypointService'];
    function Composer($stateParams, KeypointService) {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                keypoints: '='
            },
            templateUrl: 'composer/composer.tpl.html',
            controllerAs: 'vm',
            bindToController: true,
            controller: Controller
        };
    }

    function Controller($stateParams, KeypointService) {
        var vm = this;
        vm.keypoint = '';

        function createKeypoint() {
            if (!vm.keypoint) return;

            KeypointService.create($stateParams.url, vm.keypoint)
                .then(function(resp) {
                    vm.keypoints.unshift(resp.data);
                });
        }
    }

    angular
        .module('app.components.composer')
        .directive('composer', Composer);

}());
