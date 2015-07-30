var utils = require('../../shared/utils');

var Inject = (function() {
    var inject = {
        frameIsLoaded: false,
        showFrame: false,
        iframe: null,
        notification: null,
        init: init
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

    function _toggleFrame() {
        self.showFrame = !self.showFrame;
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
                self.notification.className = 'notification notification--active';
                setTimeout(function() {
                    self.notification.className = 'notification';
                }, 6000);
                _message(request);
                break;
            case 'browserAction':
                _toggleFrame();
                break;
        }
    }
}());

window.addEventListener('load', Inject.init());
