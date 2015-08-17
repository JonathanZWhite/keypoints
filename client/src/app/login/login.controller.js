(function() {
    'use strict';

    LoginController.$inject = ['$state', '$stateParams', 'AnalyticsService', 'AuthService'];
    function LoginController($state, $stateParams, AnalyticsService, AuthService) {
        var vm = this;
        // view model
        vm.user = {
            email: '',
            password: ''
        };
        vm.message = {
            type: null,
            text: ''
        };
        // functions
        vm.login = login;

        function login() {
            if (!vm.user.email || !vm.user.password) {
                _fillMessage('error', 'Please fill out all fields');
                return;
            }

            AuthService.login(vm.user)
                .then(function(resp) {
                    if (!resp.data.status) return _fillMessage('error', resp.data.message);
                    if (resp.data) {
                        AnalyticsService.trackLogin(resp.data);
                        $state.go('topic', { url: $stateParams.url });
                    }
                });
        }

        function _fillMessage(status, text) {
            vm.message.type = status;
            vm.message.text = text;
        }
    }

    angular
        .module('app.pages.login')
        .controller('LoginController', LoginController);
})();
