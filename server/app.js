/*jslint node: true */
'use strict';

var express = 		require('express');
var config = 		require('./config/secrets');
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
	key: fs.readFileSync('server.key'),
	cert: fs.readFileSync('server.crt'),
	requestCert: false,
    rejectUnauthorized: false
};

var httpServer = http.createServer(app);
var httpsServer = https.createServer(options, app);

httpServer.listen(3000);
httpsServer.listen(8000);

// app.listen(app.get('port'), config.domain, function() {
// 	console.log('Express listening to port', app.get('port'));
// });
//
// https.createServer(options, app).listen(app.get('post'), function() {
// 	console.log('Express listening to port', app.get('port'));
// });
//
module.exports = app;
