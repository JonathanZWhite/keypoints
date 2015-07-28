(function() {
    'use strict';

    TopicController.$inject = ['$stateParams', 'KeypointStore', 'MesssagesService', 'TopicStore'];
    function TopicController($stateParams, KeypointStore, MesssagesService, TopicStore) {
        var vm = this;
        // model
        vm.keypoints = [];
        // functions
        vm.contenteditable = false;
        // activation
        init();

        vm.keypointStore = KeypointStore.model;
        vm.topicStore = TopicStore.model;

        function init() {
            KeypointStore.init();
            TopicStore.init();
        }
    }

    angular
        .module('app.pages.topic')
        .controller('TopicController', TopicController);
})();
