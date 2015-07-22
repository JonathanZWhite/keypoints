(function() {
    'use strict';

    TopicController.$inject = ['TopicStore'];
    function TopicController(TopicStore) {
        var vm = this;
        // model
        vm.keypoint = '';
        // functions
        vm.addKeypoint = addKeypoint;

        // TODO: create new topic if does not exist

        function addKeypoint() {

        }
    }

    angular
        .module('app.pages.topic')
        .controller('TopicController', TopicController);
})();
