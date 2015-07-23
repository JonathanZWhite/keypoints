(function() {
    'use strict';

    TopicController.$inject = ['$stateParams', 'KeypointService', 'TopicService'];
    function TopicController($stateParams, KeypointService, TopicService) {
        var vm = this;
        // model
        vm.keypoint = '';
        // functions
        vm.createKeypoint = createKeypoint;

        function createKeypoint() {
            KeypointService.create($stateParams.url, vm.keypoint);
        }
    }

    angular
        .module('app.pages.topic')
        .controller('TopicController', TopicController);
})();
