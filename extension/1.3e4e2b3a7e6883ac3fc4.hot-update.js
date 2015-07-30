webpackHotUpdate(1,[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var utils = __webpack_require__(1);

	var Inject = (function() {
	    var inject = {
	        show: false,
	        iframe: null,
	        init: init
	    };
	    var self = inject;

	    inject.init = init;
	    return inject;

	    function init() {
	        console.log('initializing: inject');
	        _injectIframe();
	        chrome.extension.onMessage.addListener(_messageManager); // listens to background
	    }

	    function _injectIframe() {
	        var formattedHref = utils.removeUrlIdentifier(window.location.href);
	        self.iframe = document.createElement('iframe');
	        self.iframe.src = 'https://localhost:8000/topic?url=' + formattedHref;
	        self.iframe.style.cssText = 'position:fixed; top:0; right:0; display:block;' +
	                               'width:350px;height:100%;z-index:1000; border: none;';
	        self.iframe.id = 'keypoints';
	        document.body.appendChild(self.iframe);
	    }

	    function _toggleFrame() {
	        console.log('Look', self);
	        self.iframe.style.cssText = 'position:fixed; top:0; right:0; display:none;' +
	                               'width:350px;height:100%;z-index:1000; border: none;';
	    }

	    function _message(request) {
	        console.log('Sending message', request);
	        this.iframe.contentWindow.postMessage(request, '*');
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


/***/ }
])