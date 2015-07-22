var keypointController = require('../controllers/keypoint');

module.exports = function(app, router) {
    router.get('/api/keypoint/new', keypointController.getNew);
};
