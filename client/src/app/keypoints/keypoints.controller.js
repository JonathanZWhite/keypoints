(function() {
    'use strict';

    KeypointsController.$inject = ['KeypointStore'];
    function KeypointsController(KeypointStore) {
        var vm = this;
        vm.keypoints = [];
        vm.isContenteditable = false;

        init();

        function init() {
            KeypointStore.getAll()
                .then(function(resp) {
                    vm.keypoints = resp.data.data;
                });
        }
    }

    angular
        .module('app.pages.keypoints')
        .controller('KeypointsController', KeypointsController);
})();
