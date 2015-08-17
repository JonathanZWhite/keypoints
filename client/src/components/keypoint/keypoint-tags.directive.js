(function () {
    'use strict';

    KeypointTags.$inject = [];
    function KeypointTags() {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                tags: '='
            },
            templateUrl: 'keypoint/keypoint-tags.tpl.html',
            controllerAs: 'vm',
            bindToController: true,
            controller: Controller
        };
    }

    function Controller() {
        var vm = this;
    }

    angular
        .module('app.components.keypoint')
        .directive('keypointTags', KeypointTags);

}());
