var utils = require('../../shared/utils');
var Iframe = require('./iframe');
var IframeMessagesManager = require('./iframeMessagesManager');
var BackgroundMessagesManager = require('./backgroundMessagesManager');
var Notification = require('./notification');

var Inject = (function() {
    var inject = {
        init: init
    };

    return inject;

    function init() {
        console.log('initializing: inject');
        Iframe.inject();
        Notification.inject();
        _injectStyle();
        chrome.extension.onMessage.addListener(BackgroundMessagesManager.handleMessage); // listens to background
    }

    function _injectStyle() {
        var link = document.createElement('link');
        var head = document.head || document.getElementsByTagName('head')[0];
        link.href = '//fonts.googleapis.com/css?family=Lato:400,700,400italic,700italic';
        link.rel = 'stylesheet';
        link.type = 'text/css';

        head.appendChild(link);
    }
}());

window.addEventListener('message', IframeMessagesManager.handleMessage, false);
window.addEventListener('load', Inject.init());
