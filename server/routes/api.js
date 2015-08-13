var authController = require('../controllers/auth');
var keypointController = require('../controllers/keypoint');
var tagsController = require('../controllers/tags');
var topicController = require('../controllers/topic');

module.exports = function(app, router) {
    // keypoint
    router.post('/api/keypoint/add', keypointController.add);
    router.put('/api/keypoint/add-tags', keypointController.addTags);
    router.delete('/api/keypoint/del', keypointController.del);
    router.get('/api/keypoint/all', keypointController.getAll);
    router.get('/api/keypoint/topic-keypoints', keypointController.getTopicKeypoints);
    router.put('/api/keypoint/update', keypointController.update);

    // topic
    router.get('/api/topic/get', topicController.get);
    router.get('/api/topic/all', topicController.getAll);

    // auth
    router.get('/api/auth/is-authenticated', authController.isAuthenticated);
    router.get('/api/auth/get', authController.get);
    router.post('/api/auth/signup', authController.signup);
    router.post('/api/auth/login', authController.login);

    // tags
    router.get('/api/tags/all', tagsController.getAll);
};
