(function() {
    'use strict';

    TopicController.$inject = ['$stateParams', 'KeypointStore', 'MesssagesService'];
    function TopicController($stateParams, KeypointStore, MesssagesService) {
        var vm = this;
        // model
        vm.keypoints = [];
        // functions
        vm.contenteditable = false;

        vm.keypointStore = KeypointStore.model;
    }

    angular
        .module('app.pages.topic')
        .controller('TopicController', TopicController);
})();
