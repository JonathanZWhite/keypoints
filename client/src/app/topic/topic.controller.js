(function() {
    'use strict';

    TopicController.$inject = ['$stateParams', 'KeypointService', 'TopicService'];
    function TopicController($stateParams, KeypointService, TopicService) {
        var vm = this;
        var _keypoint;
        var _keypointOldValue;
        // model
        vm.keypoint = '';
        vm.keypoints = [];
        // functions
        vm.createKeypoint = createKeypoint;
        vm.contenteditable = false;
        vm.delKeypoint = delKeypoint;
        vm.disableContenteditable = disableContenteditable;
        vm.enableContenteditable = enableContenteditable;
        vm.updateKeypoint = updateKeypoint;
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

        function disableContenteditable() {
            _keypoint.keypoint = _keypointOldValue;
            vm.contenteditable = false;
            _keypoint.contenteditable = false;
        }

        function enableContenteditable(keypoint) {
            _keypoint = keypoint;
            _keypointOldValue = angular.copy(keypoint.keypoint);
            vm.contenteditable = true;
            keypoint.contenteditable = true;
        }

        function delKeypoint(keypoint) {
            KeypointService.del(keypoint._id)
                .then(function(resp) {
                    if (resp.data.status) {
                        var index = vm.keypoints.indexOf(keypoint);
                        vm.keypoints.splice(index, 1);
                    }
                });
        }

        function updateKeypoint(keypoint) {
            keypoint.contenteditable = false;
            vm.contenteditable = false;
            KeypointService.update(keypoint);
        }
    }

    angular
        .module('app.pages.topic')
        .controller('TopicController', TopicController);
})();
