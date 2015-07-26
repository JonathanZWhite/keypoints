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
        this.iframe.src = 'http://localhost:3000/topic?url=www.youtube.com%2Fwatch%3Fv#';
        this.iframe.style.cssText = 'position:fixed; top:0; right:0; display:block;' +
                               'width:350px;height:100%;z-index:1000;';
        this.iframe.id = 'keypoints';
        document.body.appendChild(iframe);
    }

    function _messageHandler(request, sender, sendResponse) {
        console.log('Sending message', request.payload);
        this.iframe.contentWindow.postMessage(request.payload, '*');
    }
}());

window.addEventListener('load', Inject.init());