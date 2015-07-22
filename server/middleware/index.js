var bodyParser =        require('body-parser');
var config =            require('../config/secrets').config();
var cookieParser =      require('cookie-parser');
var express =           require('express');
var path =              require('path');
var passport =          require('passport');

module.exports = function(app) {
    // configuration
    app.set('port', config.port);

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json({ limit: '900mb' }));
    app.use(cookieParser());
    app.use(passport.initialize());
    app.use(passport.session({ secret: 'grumpy cat', cookie: { secure: true }})); // http://stackoverflow.com/questions/11277779/passportjs-deserializeuser-never-called
    app.use(express.static(path.join(__dirname, '../../client/dist')));
};
