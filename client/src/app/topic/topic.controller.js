(function() {
    'use strict';

    TopicController.$inject = ['$stateParams', 'KeypointService', 'TopicService'];
    function TopicController($stateParams, KeypointService, TopicService) {
        var vm = this;
        var _keypoint;
        var _keypointOldValue;
        // model
        vm.keypoints = [];
        // functions
        vm.createKeypoint = createKeypoint;
        vm.contenteditable = false;
        // activation
        init();

        function init() {
            KeypointService.list($stateParams.url)
                .then(function(resp) {
                    vm.keypoints = resp.data;
                });
        }
    }

    angular
        .module('app.pages.topic')
        .controller('TopicController', TopicController);
})();
