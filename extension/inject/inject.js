// file known as content-script
var script = document.createElement('script');
script.src = chrome.extension.getURL('script.js');
(document.head||document.documentElement).appendChild(script);
script.onload = function() {
    script.parentNode.removeChild(script);
};

var Inject = {};

Inject.init = init;

function init() {
    console.log('initializing: inject');
    _injectIframe();
    chrome.extension.onMessage.addListener(_messageHandler); // listens to background
}

function _injectIframe() {
    console.log('action: injecting iframe');
    var iframe = document.createElement('iframe');
    iframe.src = chrome.extension.getURL('frame.html');
    iframe.style.cssText = 'position:fixed; top:0; right:0; display:block;' +
                           'width:350px;height:100%;z-index:1000;';
    iframe.id = 'keypoints';
    document.body.appendChild(iframe);
}

function _messageHandler(request, sender, sendResponse) {
    console.log('Received a message', request, sender, sendResponse);
}

window.addEventListener('load', Inject.init());
