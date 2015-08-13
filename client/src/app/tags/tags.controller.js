(function() {
    'use strict';

    TagsController.$inject = ['TagsService'];
    function TagsController(TagsService) {
        var vm = this;
        vm.tags = [];
        init();

        function init() {
            TagsService.getAll()
                .then(function(resp) {
                    vm.tags = resp.data.data;
                });
        }
    }

    angular
        .module('app.pages.tags')
        .controller('TagsController', TagsController);
})();
