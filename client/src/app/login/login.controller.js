(function() {
    'use strict';

    LoginController.$inject = ['$state', '$stateParams', 'AuthService'];
    function LoginController($state, $stateParams, AuthService) {
        var vm = this;
        // view model
        vm.user = {
            email: '',
            password: ''
        };
        // functions
        vm.login = login;

        function login() {
            AuthService.login(vm.user)
                .then(function(resp) {
                    if (resp.data) {
                        console.log('This is the response', resp.data);
                        $state.go('topic', { url: $stateParams.url });
                    }
                });
        }
    }

    angular
        .module('app.pages.login')
        .controller('LoginController', LoginController);
})();
