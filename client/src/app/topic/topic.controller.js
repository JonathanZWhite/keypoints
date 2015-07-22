(function() {
    'use strict';

    TopicController.$inject = ['$stateParams', 'TopicService'];
    function TopicController($stateParams, TopicService) {
        var vm = this;
        // model
        vm.keypoint = '';
        // functions

        // TODO: create new topic if does not exist
        init();

        function init() {
            _createTopic();
        }

        function _createTopic() {
            TopicService.create($stateParams.url);
        }
    }

    angular
        .module('app.pages.topic')
        .controller('TopicController', TopicController);
})();
