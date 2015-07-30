var authController = require('../controllers/auth');
var keypointController = require('../controllers/keypoint');
var topicController = require('../controllers/topic');

module.exports = function(app, router) {
    // keypoint
    router.post('/api/keypoint/create', keypointController.create);
    router.delete('/api/keypoint/del', keypointController.del);
    router.get('/api/keypoint/all', keypointController.getAll);
    router.get('/api/keypoint/list', keypointController.list);
    router.put('/api/keypoint/update', keypointController.update);

    // topic
    router.get('/api/topic/get', topicController.get);
    router.get('/api/topic/all', topicController.getAll);

    // auth
    router.get('/api/auth/is-authenticated', authController.isAuthenticated);
    router.post('/api/auth/signup', authController.signup);
    router.post('/api/auth/login', authController.login);
};
