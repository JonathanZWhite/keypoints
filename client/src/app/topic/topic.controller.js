(function() {
    'use strict';

    TopicController.$inject = ['$stateParams', 'KeypointStore', 'MesssagesService', 'TopicStore'];
    function TopicController($stateParams, KeypointStore, MesssagesService, TopicStore) {
        var vm = this;
        // model
        vm.keypoints = [];
        // functions
        vm.contenteditable = false;

        vm.keypointStore = KeypointStore.model;
        vm.topicStore = TopicStore.model;
    }

    angular
        .module('app.pages.topic')
        .controller('TopicController', TopicController);
})();
