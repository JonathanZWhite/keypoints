(function () {
    'use strict';

    function AppController($rootScope, $scope, $stateParams) {
        $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
            $scope.pageTitle = toState.data.pageTitle;
        });
    }

    angular
        .module('app')
        .controller('AppController', ['$rootScope', '$scope', '$stateParams', AppController]); // 3rd

}());
