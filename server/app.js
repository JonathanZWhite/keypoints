/*jslint node: true */
'use strict';

var express = 		require('express');
var config = 		require('../config');
var middleware = 	require('./middleware');
var routes = 		require('./routes');
var http = 			require('http');
var https = 		require('https');
var fs = 			require('fs');
var database = 		require('./database');
var path = 			require('path');
var CERT_PATH = 	'../certs/';

var app = express();

// initializations
database.init();

middleware = middleware(app);
routes(app, middleware);

var certPaths = {
	key: path.join(__dirname, CERT_PATH + config.cert.key),
	ca: path.join(__dirname, CERT_PATH + config.cert.ca),
	cert: path.join(__dirname, CERT_PATH + config.cert.cert)
};

var options = {
	// key: fs.readFileSync('key.pem'),
	// cert: fs.readFileSync('server.crt'),
	key: fs.readFileSync(certPaths.key),
	ca: fs.readFileSync(certPaths.ca),
	cert: fs.readFileSync(certPaths.cert),
	requestCert: false,
    rejectUnauthorized: false
};

var httpServer = http.createServer(app);
var httpsServer = https.createServer(options, app);

httpServer.listen(config.port.http);
httpsServer.listen(config.port.https);

// app.listen(app.get('port'), config.domain, function() {
// 	console.log('Express listening to port', app.get('port'));
// });
//
// https.createServer(options, app).listen(app.get('post'), function() {
// 	console.log('Express listening to port', app.get('port'));
// });
//
module.exports = app;
