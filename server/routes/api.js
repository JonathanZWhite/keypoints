var authController =        require('../controllers/auth');
var fileBrowserController = require('../controllers/code-editor');
var githubController =      require('../controllers/github');
var linkedinController =    require('../controllers/linkedin');
var multiparty =            require('connect-multiparty');
var multipartyMiddleware =  multiparty();
var themeController =       require('../controllers/theme');
var userController =        require('../controllers/user');
var path =                  require('path');


module.exports = function(app, router) {
    // CORS
    router.all('*', function(req, res, next) {
    	res.header('Access-Control-Allow-Origin', '*');
    	res.header('Access-Control-Allow-Headers', ' Access-Control-Allow-Origin: http://http://*.local-inventive.io:3000', 'X-Requested-With, Authorization, Content-Type, Username, Password');
    	next();
    });

    router.get('/*', function(req, res) {
    	res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
    });
};
