(function () {
    'use strict';

    /**
     * Keypoint is the actual user
     */
    Keypoint.$inject = ['$document', 'KeypointStore'];
    function Keypoint($document, KeypointStore) {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                keypoint: '=',
                keypoints: '=',
                isContenteditable: '='
            },
            templateUrl: 'keypoint/keypoint.tpl.html',
            controllerAs: 'vm',
            bindToController: true,
            controller: Controller,
            link: link
        };

        function link(scope, elem, attrs, vm) {
            function handleDocumentClick() {
                if (!vm.isContenteditable) {
                    return;
                }

                vm.keypoint.keypoint = vm.keypointOldValue;
                vm.isContenteditable = false;
                vm.keypoint.contenteditable = false;
                scope.$apply();
            }

            $document.on('click', handleDocumentClick);
            elem.on('click', handleElemClick);

            function handleElemClick() {
                 event.stopPropagation();
                 console.log('Stopping prop');
            }
        }
    }

    function Controller($document, KeypointStore) {
        var vm = this;

        vm.keypointOldValue = '';
        vm.delKeypoint = delKeypoint;
        vm.disableContenteditable = disableContenteditable;
        vm.enableContenteditable = enableContenteditable;
        vm.updateKeypoint = updateKeypoint;

        function disableContenteditable() {
            vm.keypoint = keypointOldValue;
            vm.keypoint.contenteditable = false;
            vm.isContenteditable = false;
        }

        function enableContenteditable() {
            vm.keypointOldValue = angular.copy(vm.keypoint.keypoint);
            vm.keypoint.contenteditable = true;
            vm.isContenteditable = true;
        }

        function updateKeypoint() {
            vm.keypoint.contenteditable = false;
            KeypointStore.update(vm.keypoint);
            vm.isContenteditable = false;
        }

        function delKeypoint() {
            KeypointStore.del(vm.keypoint._id)
                .then(function(resp) {
                    if (resp.data.status) {
                        var index = vm.keypoints.indexOf(vm.keypoint);
                        vm.keypoints.splice(index, 1);
                    }
                });
        }
    }

    angular
        .module('app.components.keypoint')
        .directive('keypoint', Keypoint);

}());
