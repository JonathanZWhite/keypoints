(function() {
    'use strict';

    TopicController.$inject = ['$stateParams', 'KeypointService'];
    function TopicController($stateParams, KeypointService) {
        var vm = this;
        // model
        vm.keypoints = [];
        // functions
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
