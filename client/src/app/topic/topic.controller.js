(function() {
    'use strict';

    TopicController.$inject = ['$stateParams', 'KeypointService', 'TopicService'];
    function TopicController($stateParams, KeypointService, TopicService) {
        var vm = this;
        // model
        vm.keypoint = '';
        // functions
        vm.createKeypoint = createKeypoint;
        //activation
        init();

        function init() {
            _createTopic();
        }

        function createKeypoint() {
            KeypointService.create($stateParams.url, vm.keypoint);
        }

        function _createTopic() {
            TopicService.create($stateParams.url);
        }
    }

    angular
        .module('app.pages.topic')
        .controller('TopicController', TopicController);
})();
