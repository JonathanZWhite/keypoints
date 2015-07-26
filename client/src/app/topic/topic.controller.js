(function() {
    'use strict';

    TopicController.$inject = ['$stateParams', 'KeypointStore', 'MesssagesService', 'TopicStore', 'AuthService'];
    function TopicController($stateParams, KeypointStore, MesssagesService, TopicStore, AuthService) {
        var vm = this;
        // model
        vm.keypoints = [];
        // functions
        vm.contenteditable = false;

        vm.keypointStore = KeypointStore.model;
        vm.topicStore = TopicStore.model;

        // AuthService.signup()
        //     .then(function(resp) {
                AuthService.get();
            // });
    }

    angular
        .module('app.pages.topic')
        .controller('TopicController', TopicController);
})();
