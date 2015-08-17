(function() {
    'use strict';

    SignupController.$inject = ['$state', '$stateParams', 'AnalyticsService', 'AuthService'];
    function SignupController($state, $stateParams, AnalyticsService, AuthService) {
        var vm = this;
        // view model
        vm.user = {
            email: '',
            username: '',
            password: ''
        };
        vm.message = {
            type: null,
            text: ''
        };
        // functions
        vm.signup = signup;

        function signup() {
            if (!vm.user.email || !vm.user.username || !vm.user.password) {
                _fillMessage('error', 'Please fill out all fields');
                return;
            }

            AuthService.signup(vm.user)
                .then(function(resp) {
                    if (!resp.data.status) return _fillMessage('error', resp.data.message);
                    if (resp.data) {
                        AnalyticsService.trackSignup(resp.data);
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
        .module('app.pages.signup')
        .controller('SignupController', SignupController);
})();
