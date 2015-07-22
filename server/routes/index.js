var express = require('express');
var router = express.Router();
var path = require('path');

module.exports = function(app) {
    app.use('/', router);

    require('./api')(app, router);

    router.all('*', function(req, res, next) {
    	res.header('Access-Control-Allow-Origin', '*');
    	res.header('Access-Control-Allow-Headers', ' Access-Control-Allow-Origin: http://http://*.local-inventive.io:3000', 'X-Requested-With, Authorization, Content-Type, Username, Password');
    	next();
    });

    router.get('/*', function(req, res) {
    	res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
    });
};
