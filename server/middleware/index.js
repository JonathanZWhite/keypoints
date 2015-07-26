var bodyParser =        require('body-parser');
var config =            require('../config/secrets');
var cookieParser =      require('cookie-parser');
var errorhandler =      require('errorhandler')
var express =           require('express');
var path =              require('path');
var passport =          require('passport');

module.exports = function(app) {
    // configuration
    app.set('port', config.port);

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json({ limit: '900mb' }));
    app.use(cookieParser());
    app.use(errorhandler());
    app.use(passport.initialize());
    app.use(passport.session({ secret: 'grumpy cat', cookie: { secure: true }})); // http://stackoverflow.com/questions/11277779/passportjs-deserializeuser-never-called
    app.use(express.static(path.join(__dirname, '../../client/dist')));
};
