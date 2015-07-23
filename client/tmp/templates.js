angular.module("app.core").run(["$templateCache", function($templateCache) {$templateCache.put("topic/topic.tpl.html","<section class=topic><div class=ui-container><div class=edit-overlay ng-show=vm.contenteditable ng-click=vm.disableContenteditable()></div><textarea class=\"ui-textarea ui-textarea--medium ui-textarea--light\" ng-model=vm.keypoint></textarea> <button class=\"topic__btn ui-btn ui-btn--medium ui-btn--highlight\" ng-click=vm.createKeypoint()>Add keypoint</button><keypoint ng-repeat=\"keypoint in vm.keypoints track by $index\" keypoint=keypoint keypoints=vm.keypoints is-contenteditable=vm.contenteditable></keypoint></div></section>");
$templateCache.put("keypoint/keypoint.tpl.html","<div class=\"topic__card ui-card\" ng-class=\"{ \'topic__card--contenteditable\': vm.keypoint.contenteditable }\"><div class=kp__meta><span class=\"caption caption--dark\" ng-bind=\"vm.keypoint.created | date:\'mediumDate\'\"></span><ul class=kp__options><li class=kp__option ng-click=vm.delKeypoint(vm.keypoint)><i class=\"caption--dark fa fa-trash-o\"></i></li><li class=kp__option><i class=\"caption--dark fa fa-bars\"></i></li><li class=kp__option ng-click=vm.enableContenteditable()><i class=\"caption--dark fa fa-pencil\"></i></li></ul></div><p class=text--dark contenteditable=\"{{ vm.keypoint.contenteditable }}\" ng-class=\"{ \'ui-contenteditabe\': vm.keypoint.contenteditable }\" ng-model=vm.keypoint.keypoint></p><p><button class=\"kp-btn ui-btn ui-btn--medium ui-btn--success\" ng-if=vm.keypoint.contenteditable ng-click=vm.updateKeypoint()>update</button></p></div>");}]);