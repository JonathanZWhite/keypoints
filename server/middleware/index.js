var bodyParser =        require('body-parser');
var config =            require('../config/secrets');
var cookieParser =      require('cookie-parser');
var errorhandler =      require('errorhandler');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var express =           require('express');
var path =              require('path');
var passport =          require('passport');

module.exports = function(app) {
    // configuration
    app.set('port', config.port);

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json({ limit: '900mb' }));
    app.use(cookieParser('foo'));
    app.use(errorhandler());
    app.use(session({
        secret: 'foo',
        store: new MongoStore({ mongooseConnection: mongoose.connection }),
        resave: true,
        saveUninitialized: false
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(express.static(path.join(__dirname, '../../client/dist')));
};
