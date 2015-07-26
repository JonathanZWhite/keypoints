(function () {
    'use strict';

    /**
     * Composer is the actual user
     */
    Composer.$inject = ['$stateParams', 'KeypointStore'];
    function Composer($stateParams, KeypointStore) {
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

    function Controller($stateParams, KeypointStore) {
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

            KeypointStore.create($stateParams.url, vm.keypoint, vm.image);
        }
    }

    angular
        .module('app.components.composer')
        .directive('composer', Composer);

}());
