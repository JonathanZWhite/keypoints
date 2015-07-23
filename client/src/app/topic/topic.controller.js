(function() {
    'use strict';

    TopicController.$inject = ['$stateParams', 'KeypointService', 'TopicService'];
    function TopicController($stateParams, KeypointService, TopicService) {
        var vm = this;
        // model
        vm.keypoint = '';
        vm.keypoints = [];
        // functions
        vm.createKeypoint = createKeypoint;
        vm.delKeypoint = delKeypoint;
        // activation
        init();

        function init() {
            KeypointService.list($stateParams.url)
                .then(function(resp) {
                    vm.keypoints = resp.data;
                });
        }

        function createKeypoint() {
            KeypointService.create($stateParams.url, vm.keypoint)
                .then(function(resp) {
                    vm.keypoints.unshift(resp.data);
                });
        }

        function delKeypoint(keypoint) {
            KeypointService.del($stateParams.url, keypoint._id)
                .then(function(resp) {
                    if (resp.data.status) {
                        var index = vm.keypoints.indexOf(keypoint);
                        vm.keypoints.splice(index, 1);
                    }
                });
        }
    }

    angular
        .module('app.pages.topic')
        .controller('TopicController', TopicController);
})();
