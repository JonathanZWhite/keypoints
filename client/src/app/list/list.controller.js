(function() {
    'use strict';

    ListController.$inject = ['ListStore'];
    function ListController(ListStore) {
        var vm = this;

        vm.listStore = ListStore.model;
    }

    angular
        .module('app.pages.list')
        .controller('ListController', ListController);
})();
