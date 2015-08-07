/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var utils = __webpack_require__(1);

	var Inject = (function() {
	    var inject = {
	        showFrame: false,
	        iframe: null,
	        notification: null,
	        init: init,
	        toggleFrame: toggleFrame
	    };
	    var self = inject;

	    return inject;

	    function init() {
	        console.log('initializing: inject');
	        _injectIframe();
	        _injectStyle();
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

	    function _injectStyle() {
	        var link = document.createElement('link');
	        var head = document.head || document.getElementsByTagName('head')[0];
	        link.href = '//fonts.googleapis.com/css?family=Lato:400,700,400italic,700italic';
	        link.rel = 'stylesheet';
	        link.type = 'text/css';

	        head.appendChild(link);
	    }

	    // pings iframe till loaded
	    function _sendUrl() {
	        IframeMessagesManager.sendMessage({
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

	    function _handleMessage(request, sender, sendResponse) {
	        switch(request.type) {
	            case 'context':
	                _showNotification();
	                IframeMessagesManager.sendMessage(request);
	                break;
	            case 'navigate':
	                IframeMessagesManager.sendMessage(request);
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

	        _toggleKeyListener(true);

	        setTimeout(function() {
	            baseClasses = 'notification';
	            self.notification.className = self.showFrame ? baseClasses +
	                ' notification--offset' : baseClasses;
	            _toggleKeyListener(false);
	        }, 10000);
	    }

	    function _toggleKeyListener(toggle) {
	        var input = document.getElementById('notification__input');
	        if (toggle) {
	            input.addEventListener('keypress', _onEnter);
	        } else {
	            input.removeEventListener('keypress', _onEnter);
	        }
	    }

	    function _onEnter(event) {
	        var key = event.which || event.keyCode;
	        if (key !== 13) return;

	        IframeMessagesManager.sendMessage({
	            type: 'tag',
	            data: {
	                tags: event.target.value,
	                keypointId: Store.getKeypoint()._id
	            }
	        });
	    }
	}());

	var IframeMessagesManager = (function() {
	    var iframeMessagesManager = {
	        handleMessage: handleMessage,
	        sendMessage: sendMessage
	    };

	    return iframeMessagesManager;

	    function handleMessage(request) {
	        var payload = request.data;
	        switch(payload.type) {
	            case 'success':
	                Store.setKeypoint(payload.data);
	        }
	    }

	    function sendMessage(payload) {
	        Inject.iframe.contentWindow.postMessage(payload, '*');
	    }
	}());

	// revealing module see:
	// http://stackoverflow.com/questions/1479319/simplest-cleanest-way-to-implement-singleton-in-javascript
	var Store = (function() {
	    var store = {
	        getKeypoint: getKeypoint,
	        setKeypoint: setKeypoint
	    };
	    var _keypoint = null;

	    return store;

	    function getKeypoint() {
	        return _keypoint;
	    }

	    function setKeypoint(keypoint) {
	        _keypoint = keypoint;
	    }
	}());

	window.addEventListener('message', IframeMessagesManager.handleMessage, false);
	window.addEventListener('load', Inject.init());


/***/ },
/* 1 */
/***/ function(module, exports) {

	var utils = {
	    removeUrlIdentifier: removeUrlIdentifier
	};

	function removeUrlIdentifier(url) {
	    return url.replace('http://', '').replace('https://', '').replace('www.', '');
	}

	module.exports = utils;


/***/ }
/******/ ]);