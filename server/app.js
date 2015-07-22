/*jslint node: true */
'use strict';

var express = 		require('express');
var config = 		require('./config/secrets').config();
var middleware = 	require('./middleware');
var routes = 		require('./routes');
var database = 		require('./database');

var app = express();

// initializations
database.init();

middleware = middleware(app);
routes(app, middleware);

app.listen(app.get('port'), config.domain, function() {
	console.log('Express listening to port', app.get('port'));
});

module.exports = app;
