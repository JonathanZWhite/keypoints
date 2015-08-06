var utils = require('../../shared/utils');

var Inject = (function() {
    var inject = {
        showFrame: false,
        iframe: null,
        notification: null,
        init: init,
        toggleFrame: toggleFrame
    };
    var self = inject;

    inject.init = init;
    return inject;

    function init() {
        console.log('initializing: inject');
        _injectIframe();
        _injectNotification();
        chrome.extension.onMessage.addListener(_handleMessage); // listens to background
    }

    function _injectNotification() {
        var xmlHttp = null;

        xmlHttp = new XMLHttpRequest();
        xmlHttp.open('GET', chrome.extension.getURL ('../templates/notifications.html'), false);
        xmlHttp.send(null);

        self.notification = document.createElement('div');
        self.notification.className = 'notification';
        self.notification.innerHTML = xmlHttp.responseText;
        document.body.appendChild(self.notification);
    }

    function _injectIframe() {
        var formattedHref = utils.removeUrlIdentifier(window.location.href);
        self.iframe = document.createElement('iframe');
        self.iframe.src = 'https://localhost:8000/topic?url=' + formattedHref;
        self.iframe.className = 'frame';
        self.iframe.id = 'keypoints';
        document.body.appendChild(self.iframe);
        self.iframe.onload = _sendUrl;
    }

    // pings iframe till loaded
    function _sendUrl() {
        _message({
            type: 'init',
            url: utils.removeUrlIdentifier(window.location.href)
        });
    }

    function toggleFrame(toggle) {
        self.showFrame = toggle ? toggle : !self.showFrame;
        if (self.showFrame) {
            self.iframe.className = 'frame frame--active';
        } else {
            self.iframe.className = 'frame';
        }
    }

    function _getFrameDisplay() {
        self.showFrame = !self.showFrame;
        if (self.showFrame) {
            return 'block';
        } else {
            return 'none';
        }
    }

    function _message(request) {
        self.iframe.contentWindow.postMessage(request, '*');
    }

    function _handleMessage(request, sender, sendResponse) {
        switch(request.type) {
            case 'context':
                _showNotification();
                _message(request);
                break;
            case 'navigate':
                console.log('<<<<<<<< navigating...', request);
                _message(request);
                break;
            case 'browserAction':
                self.toggleFrame();
                break;
        }
    }

    function _showNotification() {
        var baseClasses = 'notification notification--active';
        var classes = self.showFrame ? baseClasses + ' notification--offset' :
            baseClasses;
        self.notification.className = classes;

        setTimeout(function() {
            baseClasses = 'notification';
            self.notification.className = self.showFrame ? baseClasses +
                ' notification--offset' : baseClasses;
        }, 5000);
    }
}());

window.addEventListener('load', Inject.init());
