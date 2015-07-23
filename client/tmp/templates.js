angular.module("app.core").run(["$templateCache", function($templateCache) {$templateCache.put("topic/topic.tpl.html","<section class=topic><div class=ui-container><div class=edit-overlay ng-show=vm.contenteditable ng-click=vm.disableContenteditable()></div><textarea class=\"ui-textarea ui-textarea--medium ui-textarea--light\" ng-model=vm.keypoint></textarea> <button class=\"topic__btn ui-btn ui-btn--medium ui-btn--highlight\" ng-click=vm.createKeypoint()>Add keypoint</button><div class=\"topic__card ui-card\" ng-repeat=\"keypoint in vm.keypoints track by $index\" ng-class=\"{ \'topic__card--contenteditable\': keypoint.contenteditable }\"><div class=kp__meta><span class=\"caption caption--dark\" ng-bind=\"keypoint.created | date:\'mediumDate\'\"></span><ul class=kp__options><li class=kp__option ng-click=vm.delKeypoint(keypoint)><i class=\"caption--dark fa fa-trash-o\"></i></li><li class=kp__option><i class=\"caption--dark fa fa-bars\"></i></li><li class=kp__option ng-click=vm.enableContenteditable(keypoint)><i class=\"caption--dark fa fa-pencil\"></i></li></ul></div><p class=text--dark contenteditable=\"{{ keypoint.contenteditable }}\" ng-class=\"{ \'ui-contenteditabe\': keypoint.contenteditable }\" ng-model=keypoint.keypoint></p><p><button class=\"kp-btn ui-btn ui-btn--medium ui-btn--success\" ng-if=keypoint.contenteditable ng-click=vm.updateKeypoint(keypoint)>update</button></p></div></div></section>");}]);