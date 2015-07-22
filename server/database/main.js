var Keypoint = require('../models/keypoint');

module.exports = function(module) {
	module.getNewModel = getNewModel;

	function getNewModel(model) {
		switch (model) {
			case 'keypoint':
				return new Keypoint();
				break;
		}
	}
};
