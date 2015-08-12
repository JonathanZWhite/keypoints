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

var app = express();

// initializations
database.init();

middleware = middleware(app);
routes(app, middleware);

var options = {
	// key: fs.readFileSync('key.pem'),
	// cert: fs.readFileSync('server.crt'),
	key: fs.readFileSync('../certs/myserver.key.pem'),
	ca: fs.readFileSync('../certs/intermediate.crt.pem'),
	cert: fs.readFileSync('../certs/myserver.crt.pem'),
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
