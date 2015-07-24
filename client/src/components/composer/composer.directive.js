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
        // model
        vm.keypoint = '';
        vm.image = '';
        vm.mode = 'text';
        // function
        vm.createKeypoint = createKeypoint;
        vm.toggleMode = toggleMode;

        function toggleMode(mode) {
            vm.mode = mode;
        }

        function createKeypoint() {
            if (!vm.keypoint && !vm.image) return;

            KeypointService.create($stateParams.url, vm.keypoint, vm.image)
                .then(function(resp) {
                    vm.keypoints.unshift(resp.data);
                });
        }
    }

    angular
        .module('app.components.composer')
        .directive('composer', Composer);

}());
