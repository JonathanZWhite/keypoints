angular.module("app.core").run(["$templateCache", function($templateCache) {$templateCache.put("keypoints/keypoints.tpl.html","<section class=list><div class=ui-container><navbar></navbar><h3 class=\"list__head text-dark--dark\">All keypoints</h3><keypoint ng-repeat=\"keypoint in vm.keypoints track by $index\" keypoint=keypoint keypoints=vm.keypoints></keypoint></div></section>");
$templateCache.put("list/list.tpl.html","<section class=list><div class=ui-container><navbar></navbar><h3 class=\"list__head text-dark--dark\">Highlighted pages</h3><topics topics=vm.listStore.topics></topics></div></section>");
$templateCache.put("signup/signup.tpl.html","<section class=signup><div class=ui-container><h3 class=\"signup__head text-dark--dark\">Signup</h3><input placeholder=email class=\"ui-input ui-input--medium ui-input--light\" ng-model=vm.user.email> <input placeholder=username class=\"ui-input ui-input--medium ui-input--light\" ng-model=vm.user.username> <input placeholder=password type=password class=\"ui-input ui-input--medium ui-input--light\" ng-model=vm.user.password> <button class=\"composer__btn ui-btn ui-btn--medium ui-btn--highlight\" ng-click=vm.signup()>Signup</button></div></section>");
$templateCache.put("topic/topic.tpl.html","<section class=tp><div class=ui-container><div class=edit-overlay ng-show=vm.contenteditable ng-click=vm.disableContenteditable()></div><navbar topic-url=vm.topicStore.topic.url></navbar><a ng-href=http://{{vm.topicStore.topic.url}} target=_blank><h5 class=\"tp__head text-dark--dark\" ng-bind=vm.topicStore.topic.title></h5></a><composer keypoints=vm.keypointStore.keypoints></composer><keypoint ng-repeat=\"keypoint in vm.keypointStore.keypoints track by $index\" keypoint=keypoint keypoints=vm.keypointStore.keypoints is-contenteditable=vm.contenteditable></keypoint></div></section>");
$templateCache.put("composer/composer.tpl.html","<div class=composer><div class=composer__options><span class=\"composer__option caption text-dark--lightest\" ng-click=\"vm.toggleMode(\'text\')\" ng-class=\"{ \'composer__option--active\': vm.mode === \'text\' }\">TEXT</span> <span class=\"caption text-dark--lightest\">|</span> <span class=\"composer__option caption text-dark--lightest\" ng-click=\"vm.toggleMode(\'image\')\" ng-class=\"{ \'composer__option--active\': vm.mode === \'image\' }\">IMAGE</span></div><textarea placeholder=\"Enter in a keypoint about whatever article you are reading\" ng-show=\"vm.mode === \'text\'\" class=\"ui-textarea ui-textarea--medium ui-textarea--light\" ng-model=vm.keypoint></textarea> <input placeholder=http://imgur.com ng-show=\"vm.mode === \'image\'\" class=\"ui-input ui-input--medium ui-input--light\" ng-model=vm.image> <button class=\"composer__btn ui-btn ui-btn--medium ui-btn--highlight\" ng-click=vm.createKeypoint()>Add keypoint</button></div>");
$templateCache.put("keypoint/keypoint.tpl.html","<div class=\"keypoint ui-card\" ng-class=\"{ \'keypoint--contenteditable\': vm.keypoint.contenteditable, \'keypoint--preview\': vm.keypoint.contentType === \'image\' }\"><div class=kp__meta><span class=\"caption text-dark--lightest\" ng-bind=\"vm.keypoint.created | date:\'mediumDate\'\"></span><ul class=kp__options><li class=kp__option ng-click=vm.enableContenteditable() ng-if=\"vm.keypoint.contentType === \'text\'\"><i class=\"text-dark--lightest fa fa-pencil\"></i></li><li class=kp__option><i class=\"text-dark--lightest fa fa-bars\"></i></li><li class=kp__option ng-click=vm.delKeypoint(vm.keypoint)><i class=\"text-dark--lightest fa fa-trash-o\"></i></li></ul></div><p class=text-dark--light ng-if=\"vm.keypoint.contentType === \'text\'\" contenteditable=\"{{ vm.keypoint.contenteditable }}\" ng-class=\"{ \'ui-contenteditabe\': vm.keypoint.contenteditable }\" ng-model=vm.keypoint.keypoint></p><p><div class=kp__preview ng-if=\"vm.keypoint.contentType === \'image\'\" ng-style=\"{ \'background-image\': \'url(\' + vm.keypoint.image + \')\' }\"></div><button class=\"kp-btn ui-btn ui-btn--medium ui-btn--success\" ng-if=vm.keypoint.contenteditable ng-click=vm.updateKeypoint()>update</button></p></div>");
$templateCache.put("navbar/navbar.tpl.html","<nav class=navbar><a ui-sref=\"topic({ url: vm.clientStore.url })\" ng-class=\"{ \'navbar--active\': vm.isCurrentPage() }\">current page</a> <span>|</span> <a ui-sref=list ng-class=\"{ \'navbar--active\': vm.$state.current.name === \'list\' }\">all pages</a> <span>|</span> <a ui-sref=keypoints ng-class=\"{ \'navbar--active\': vm.$state.current.name === \'keypoints\' }\">all keypoints</a></nav>");
$templateCache.put("topics/topics.tpl.html","<section class=topics><div class=ui-card ng-repeat=\"topic in vm.topics track by $index\" ui-sref=\"topic({ url: topic.url })\"><div class=topic__content><div class=\"ui-column ui-column--one\"><div class=topic__preview ng-style=\"{ \'background-image\': \'url(\' + topic.image + \')\' }\"></div></div><div class=\"ui-column ui-column--eleven\"><span class=\"topic__head text-dark--dark u-reset-lh u-truncate\" ng-bind=topic.title></span></div><p class=\"caption text-dark--light\" ng-bind=topic.description></p></div></div></section>");}]);