var keypointController = require('../controllers/keypoint');
var topicController = require('../controllers/topic');

module.exports = function(app, router) {
    router.post('/api/keypoint/create', keypointController.create);
    router.delete('/api/keypoint/del', keypointController.del);
    router.get('/api/keypoint/list', keypointController.list);
    router.put('/api/keypoint/update', keypointController.update);
};
