angular.module("app.core").run(["$templateCache", function($templateCache) {$templateCache.put("topic/topic.tpl.html","<section class=topic><div class=ui-container><div class=edit-overlay ng-show=vm.contenteditable ng-click=vm.disableContenteditable()></div><composer keypoints=vm.keypoints></composer><keypoint ng-repeat=\"keypoint in vm.keypoints track by $index\" keypoint=keypoint keypoints=vm.keypoints is-contenteditable=vm.contenteditable></keypoint></div></section>");
$templateCache.put("keypoint/keypoint.tpl.html","<div class=\"keypoint ui-card\" ng-class=\"{ \'keypoint--contenteditable\': vm.keypoint.contenteditable, \'keypoint--preview\': vm.mode === \'image\' }\"><div class=kp__meta><span class=\"caption caption--dark\" ng-bind=\"vm.keypoint.created | date:\'mediumDate\'\"></span><ul class=kp__options><li class=kp__option ng-click=vm.delKeypoint(vm.keypoint)><i class=\"caption--dark fa fa-trash-o\"></i></li><li class=kp__option><i class=\"caption--dark fa fa-bars\"></i></li><li class=kp__option ng-click=vm.enableContenteditable()><i class=\"caption--dark fa fa-pencil\"></i></li></ul></div><p class=text--dark contenteditable=\"{{ vm.keypoint.contenteditable }}\" ng-class=\"{ \'ui-contenteditabe\': vm.keypoint.contenteditable }\" ng-model=vm.keypoint.keypoint></p><p><div class=kp__preview ng-style=\"{ \'background-image\': \'url(\' + vm.keypoint.image + \')\' }\"></div><button class=\"kp-btn ui-btn ui-btn--medium ui-btn--success\" ng-if=vm.keypoint.contenteditable ng-click=vm.updateKeypoint()>update</button></p></div>");
$templateCache.put("composer/composer.tpl.html","<div class=composer><div class=composer__options><span class=\"composer__option caption caption--dark\" ng-click=\"vm.toggleMode(\'text\')\" ng-class=\"{ \'composer__option--active\': vm.mode === \'text\' }\">TEXT</span> <span class=\"caption caption--dark\">|</span> <span class=\"composer__option caption caption--dark\" ng-click=\"vm.toggleMode(\'image\')\" ng-class=\"{ \'composer__option--active\': vm.mode === \'image\' }\">IMAGE</span></div><textarea placeholder=\"Enter in a keypoint about whatever article you are reading\" ng-show=\"vm.mode === \'text\'\" class=\"ui-textarea ui-textarea--medium ui-textarea--light\" ng-model=vm.keypoint></textarea> <input placeholder=http://imgur.com ng-show=\"vm.mode === \'image\'\" class=\"ui-input ui-input--medium ui-input--light\" ng-model=vm.image> <button class=\"composer__btn ui-btn ui-btn--medium ui-btn--highlight\" ng-click=vm.createKeypoint()>Add keypoint</button></div>");}]);