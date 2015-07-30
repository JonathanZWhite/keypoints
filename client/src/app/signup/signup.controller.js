(function() {
    'use strict';

    SignupController.$inject = ['$state', '$stateParams', 'AuthService'];
    function SignupController($state, $stateParams, AuthService) {
        var vm = this;
        // view model
        vm.user = {
            email: '',
            username: '',
            password: ''
        };
        // functions
        vm.signup = signup;

        function signup() {
            AuthService.signup(vm.user)
                .then(function(resp) {
                    if (resp.data) {
                        console.log('This is the response', resp.data);
                        $state.go('topic', { url: $stateParams.url });
                    }
                });
        }
    }

    angular
        .module('app.pages.signup')
        .controller('SignupController', SignupController);
})();
