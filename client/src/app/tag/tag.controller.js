(function() {
    'use strict';

    TagController.$inject = ['$stateParams', 'KeypointStore'];
    function TagController($stateParams, KeypointStore) {
        var vm = this;
        // model
        vm.keypoints = [];
        vm.tagName = $stateParams.tagName;
        // functions
        vm.isContenteditable = false;
        // activation
        init();

        function init() {
            console.log('This is the tagName', $stateParams.tagName);
            KeypointStore.getTagKeypoints($stateParams.tagName)
                .then(function(resp) {
                    vm.keypoints = resp.data.data;
                });
        }
    }

    angular
        .module('app.pages.tag')
        .controller('TagController', TagController);
})();
