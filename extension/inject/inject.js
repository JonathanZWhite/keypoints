var utils = require('../../shared/utils');

var Inject = (function() {
    var inject = {
        showFrame: false,
        iframe: null,
        init: init
    };
    var self = inject;

    inject.init = init;
    return inject;

    function init() {
        console.log('initializing: inject');
        _injectIframe();
        _injectNotifications();
        chrome.extension.onMessage.addListener(_messageManager); // listens to background
    }

    function _injectNotifications() {
        var xmlHttp = null;

        xmlHttp = new XMLHttpRequest();
        xmlHttp.open('GET', chrome.extension.getURL ('../templates/notifications.html'), false);
        xmlHttp.send(null);

        var inject  = document.createElement('div');
        inject.innerHTML = xmlHttp.responseText;
        document.body.insertBefore(inject, document.body.firstChild);
    }

    function _injectIframe() {
        var formattedHref = utils.removeUrlIdentifier(window.location.href);
        self.iframe = document.createElement('iframe');
        self.iframe.src = 'https://localhost:8000/topic?url=' + formattedHref;
        self.iframe.className = 'frame';
        self.iframe.id = 'keypoints';
        document.body.appendChild(self.iframe);
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
        console.log('Sending message', request);
        self.iframe.contentWindow.postMessage(request, '*');
    }

    function _messageManager(request, sender, sendResponse) {
        switch(request.type) {
            case 'context':
                _message(request);
                break;
            case 'browserAction':
                _toggleFrame();
                break;
        }
    }
}());

window.addEventListener('load', Inject.init());
