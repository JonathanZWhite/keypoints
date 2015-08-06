angular.module("app.core").run(["$templateCache", function($templateCache) {$templateCache.put("keypoints/keypoints.tpl.html","<section class=ui-page><navbar></navbar><div class=ui-container><edit-overlay is-contenteditable=vm.isContenteditable keypoints=vm.keypoints></edit-overlay><h3 class=\"list__head text-dark--dark\">All keypoints</h3><keypoint ng-repeat=\"keypoint in vm.keypoints track by $index\" keypoint=keypoint keypoints=vm.keypoints is-contenteditable=vm.isContenteditable show-detail={{true}}></keypoint></div></section>");
$templateCache.put("list/list.tpl.html","<section class=ui-page><navbar></navbar><div class=ui-container><h3 class=\"list__head text-dark--dark\">Highlighted pages</h3><topics topics=vm.listStore.topics></topics></div></section>");
$templateCache.put("login/login.tpl.html","<section class=login><div class=ui-container><h3 class=\"login__head text-dark--dark\">Login</h3><input placeholder=email class=\"ui-input ui-input--medium ui-input--light\" ng-model=vm.user.email> <input placeholder=password type=password class=\"ui-input ui-input--medium ui-input--light\" ng-model=vm.user.password> <button class=\"login__btn ui-btn ui-btn--medium ui-btn--highlight\" ng-click=vm.login()>login</button> <span class=\"caption text-dark--lightest u-float-r\" ui-sref=signup>Create an account</span></div></section>");
$templateCache.put("signup/signup.tpl.html","<section class=signup><div class=ui-container><h3 class=\"signup__head text-dark--dark\">Signup</h3><input placeholder=email class=\"ui-input ui-input--medium ui-input--light\" ng-model=vm.user.email> <input placeholder=username class=\"ui-input ui-input--medium ui-input--light\" ng-model=vm.user.username> <input placeholder=password type=password class=\"ui-input ui-input--medium ui-input--light\" ng-model=vm.user.password> <button class=\"signup__btn ui-btn ui-btn--medium ui-btn--highlight\" ng-click=vm.signup()>Signup</button> <span class=\"caption text-dark--lightest u-float-r\" ui-sref=login>Have an account?</span></div></section>");
$templateCache.put("topic/topic.tpl.html","<section class=ui-page><navbar></navbar><div class=ui-container><edit-overlay is-contenteditable=vm.isContenteditable keypoints=vm.keypointStore.keypoints></edit-overlay><a ng-href=http://{{vm.topicStore.topic.url}} target=_blank><h5 class=\"tp__head text-dark--dark\" ng-bind=vm.topicStore.topic.title></h5></a><composer keypoints=vm.keypointStore.keypoints></composer><keypoint ng-repeat=\"keypoint in vm.keypointStore.keypoints track by $index\" keypoint=keypoint keypoints=vm.keypointStore.keypoints is-contenteditable=vm.isContenteditable></keypoint></div></section>");
$templateCache.put("composer/composer.tpl.html","<div class=composer><div class=composer__content><div class=composer__options><span class=\"composer__option caption text-dark--lightest\" ng-click=\"vm.toggleMode(\'text\')\" ng-class=\"{ \'composer__option--active\': vm.mode === \'text\' }\">TEXT</span> <span class=\"caption text-dark--lightest\">|</span> <span class=\"composer__option caption text-dark--lightest\" ng-click=\"vm.toggleMode(\'image\')\" ng-class=\"{ \'composer__option--active\': vm.mode === \'image\' }\">IMAGE</span></div><textarea placeholder=\"Enter in a keypoint about whatever article you are reading\" ng-show=\"vm.mode === \'text\'\" class=\"ui-textarea ui-textarea--medium ui-textarea--light\" ng-model=vm.keypoint></textarea> <input placeholder=http://imgur.com ng-show=\"vm.mode === \'image\'\" class=\"ui-input ui-input--medium ui-input--light\" ng-model=vm.image></div><input placeholder=\"adds tags, separated by a comma\" ng-list=\"\" class=\"ui-input ui-input--medium ui-input--light\" ng-model=vm.tags> <button class=\"composer__btn ui-btn ui-btn--medium ui-btn--highlight\" ng-click=vm.createKeypoint()>Add keypoint</button></div>");
$templateCache.put("delete-button/delete-button.tpl.html","<div class=db ng-click=vm.delete() ng-show=vm.show><i class=\"text-dark--light fa fa-times\"></i></div>");
$templateCache.put("edit-overlay/edit-overlay.tpl.html","<div class=edit-overlay ng-show=vm.isContenteditable ng-click=vm.disableContenteditable()></div>");
$templateCache.put("keypoint/keypoint.tpl.html","<div class=\"keypoint ui-card\" ng-class=\"{ \'keypoint--contenteditable\': vm.keypoint.isContenteditable, \'keypoint--preview\': vm.keypoint.contentType === \'image\' }\"><delete-button delete=vm.delKeypoint()></delete-button><div class=kp__meta ng-if=vm.showDetail><a class=\"kp__head text text-dark--dark u-truncate\" ng-bind=vm.keypoint.topic.title ng-href=http://{{vm.keypoint.topic.url}} target=_blank></a></div><div class=kp__content ng-if=\"vm.keypoint.contentType === \'text\'\"><p class=text-dark--light contenteditable=\"{{ vm.keypoint.isContenteditable }}\" ng-class=\"{ \'ui-contenteditabe\': vm.keypoint.isContenteditable }\" ng-model=vm.keypoint.keypoint ng-click=vm.enableContenteditable()></p><p></p></div><div class=kp__preview ng-if=\"vm.keypoint.contentType === \'image\'\" ng-style=\"{ \'background-image\': \'url(\' + vm.keypoint.image + \')\' }\"></div><div class=kp__meta ng-if=\"vm.keypoint.tags.length !== 0\"><tags tags=vm.keypoint.tags></tags></div><button class=\"kp-btn ui-btn ui-btn--medium ui-btn--success\" ng-if=vm.keypoint.isContenteditable ng-click=vm.updateKeypoint()>update</button></div>");
$templateCache.put("navbar/navbar.tpl.html","<nav class=navbar><a class=u-float-l ui-sref=\"topic({ url: vm.clientStore.url })\" ng-class=\"{ \'navbar--active\': vm.isCurrentPage() }\">current page</a> <a ui-sref=list ng-class=\"{ \'navbar--active\': vm.$state.current.name === \'list\' }\">all pages</a> <a class=u-float-r ui-sref=keypoints ng-class=\"{ \'navbar--active\': vm.$state.current.name === \'keypoints\' }\">all keypoints</a></nav>");
$templateCache.put("tags/tags.tpl.html","<div class=tags><ul class=\"tags__list ui-list ui-list--di\"><li><i class=\"caption fa fa-tag\"></i></li><li ng-repeat=\"tag in vm.tags\"><span class=caption ng-bind=tag.name></span></li></ul></div>");
$templateCache.put("topics/topics.tpl.html","<section class=topics><div class=ui-card ng-repeat=\"topic in vm.topics track by $index\" ui-sref=\"topic({ url: topic.url })\"><div class=topic__content><div class=\"ui-column ui-column--one\" ng-if=topic.image><div class=topic__preview ng-style=\"{ \'background-image\': \'url(\' + topic.image + \')\' }\"></div></div><div class=\"ui-column ui-column--eleven\"><span class=\"topic__head text-dark--dark u-reset-lh u-truncate\" ng-bind=topic.title></span></div><p class=\"caption text-dark--light\" ng-bind=topic.description></p></div></div></section>");}]);