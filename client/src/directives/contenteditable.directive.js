(function() {
    'use strict';

    Contenteditable.$inject = [];
    function Contenteditable() {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: link
        };

        function link(scope, element, attrs, ngModel) {
            function read() {
                ngModel.$setViewValue(element.html());
            }

            ngModel.$render = function() {
                element.html(ngModel.$viewValue || '');
            };

            element.bind('blur keyup change', function() {
                scope.$apply(read);
            });
        }
    }


    angular
        .module('app.directives')
        .directive('contenteditable', Contenteditable);

}());
