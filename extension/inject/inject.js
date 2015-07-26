// file known as content-script
var script = document.createElement('script');
script.src = chrome.extension.getURL('script.js');
(document.head||document.documentElement).appendChild(script);
script.onload = function() {
    script.parentNode.removeChild(script);
};

// var Inject = {};
//
// Inject.init = init;

// var Inject = {
//     init: function init() {
//         console.log('initializing: inject');
//         this._injectIframe();
//         chrome.extension.onMessage.addListener(this._messageHandler); // listens to background
//     },
//     _iframe: '',
//     test: 'yoo',
//     _injectIframe: function _injectIframe() {
//         console.log('action: injecting iframe');
//         var self = this;
//         self._iframe = document.createElement('iframe');
//         self._iframe.src = chrome.extension.getURL('frame.html');
//         self._iframe.style.cssText = 'position:fixed; top:0; right:0; display:block;' +
//                                'width:350px;height:100%;z-index:1000;';
//         self._iframe.id = 'keypoints';
//         this.test = 'doo';
//         console.log('Look', this);
//         document.body.appendChild(self._iframe);
//     },
//     _messageHandler: function(request, sender, sendResponse) {
//         var self = this;
//         console.log('Received a message', request, sender, sendResponse);
//         console.log('this:', this);
//         console.log('<<<<', Inject);
//         console.log('<<<<', Inject.test);
//     }
// };

var Inject = (function() {
    var inject = {
        iframe: null,
        init: init
    };

    inject.init = init;
    return inject;

    function init() {
        console.log('initializing: inject');
        _injectIframe();
        chrome.extension.onMessage.addListener(_messageHandler); // listens to background
    }

    function _injectIframe() {
        console.log('action: injecting iframe');
        this.iframe = document.createElement('iframe');
        this.iframe.src = chrome.extension.getURL('frame.html');
        this.iframe.style.cssText = 'position:fixed; top:0; right:0; display:block;' +
                               'width:350px;height:100%;z-index:1000;';
        this.iframe.id = 'keypoints';
        document.body.appendChild(iframe);
    }

    function _messageHandler(request, sender, sendResponse) {
        var self = this;
        console.log('Received a message', request, sender, sendResponse);
        console.log('this:', this.iframe);
    }
}());

window.addEventListener('load', Inject.init());
