var keypointController = require('../controllers/keypoint');
var topicController = require('../controllers/topic');

module.exports = function(app, router) {
    router.post('/api/topic/create', topicController.create);
    router.post('/api/keypoint/create', keypointController.create);
};
