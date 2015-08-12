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
	var Iframe = __webpack_require__(2);
	var IframeMessagesManager = __webpack_require__(3);
	var BackgroundMessagesManager = __webpack_require__(4);
	var Notification = __webpack_require__(5);

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


/***/ },
/* 1 */
/***/ function(module, exports) {

	var utils = {
	    removeUrlIdentifier: removeUrlIdentifier
	};

	function removeUrlIdentifier(url) {
	    if (!url) return;
	    return url.replace('http://', '').replace('https://', '').replace('www.', '');
	}

	module.exports = utils;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var config = __webpack_require__(8);
	var utils = __webpack_require__(1);
	var IframeMessagesManager = __webpack_require__(3);

	var Iframe = (function() {
	    var iframe = {
	        inject: inject,
	        getElement: getElement,
	        getVisibility: getVisibility,
	        toggle: toggle
	    };
	    var _elem = null;
	    var _showFrame = false;

	    return iframe;

	    function inject() {
	        var formattedHref = utils.removeUrlIdentifier(window.location.href);
	        _elem = document.createElement('iframe');
	        _elem.src = config.url.https + '/topic?url=' + formattedHref;
	        _elem.className = 'frame';
	        _elem.id = 'keypoints';
	        document.body.appendChild(_elem);
	        _elem.onload = _sendUrl;
	    }

	    function getVisibility() {
	        return _showFrame;
	    }

	    function getElement() {
	        return _elem;
	    }

	    function toggle(show) {
	        _showFrame = show ? show : !_showFrame;
	        if (_showFrame) {
	            _elem.className = 'frame frame--active';
	        } else {
	            _elem.className = 'frame';
	        }
	    }

	    // pings iframe till loaded
	    function _sendUrl() {
	        IframeMessagesManager.sendMessage({
	            type: 'init',
	            url: utils.removeUrlIdentifier(window.location.href)
	        });
	    }
	}());

	module.exports = Iframe;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var Iframe = __webpack_require__(2);
	var Notification = __webpack_require__(5);
	var Store = __webpack_require__(6);

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
	                Notification.show();
	                Store.setKeypoint(payload.data);
	        }
	    }

	    function sendMessage(payload) {
	        __webpack_require__(2).getElement().contentWindow.postMessage(payload, '*');
	    }
	}());

	module.exports = IframeMessagesManager;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var Iframe = __webpack_require__(2);
	var IframeMessagesManager = __webpack_require__(3);

	var BackgroundMessagesManager = (function() {
	    var backgroundMessagesManager = {
	        handleMessage: handleMessage
	    };

	    return backgroundMessagesManager;

	    function handleMessage(request, sender, sendResponse) {
	        switch(request.type) {
	            case 'context':
	                IframeMessagesManager.sendMessage(request);
	                break;
	            case 'navigate':
	                IframeMessagesManager.sendMessage(request);
	                break;
	            case 'browserAction':
	                Iframe.toggle();
	                break;
	        }
	    }
	}());

	module.exports = BackgroundMessagesManager;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var Iframe = __webpack_require__(2);
	var IframeMessagesManager = __webpack_require__(3);
	var Store = __webpack_require__(6);

	var Notification = (function() {
	    var notification = {
	        inject: inject,
	        show: show
	    };
	    var _elem = null;

	    return notification;

	    function inject() {
	        var xmlHttp = null;

	        xmlHttp = new XMLHttpRequest();
	        xmlHttp.open('GET', chrome.extension.getURL ('../templates/notifications.html'), false);
	        xmlHttp.send(null);

	        _elem = document.createElement('div');
	        _elem.className = 'notification';
	        _elem.innerHTML = xmlHttp.responseText;
	        document.body.appendChild(_elem);
	    }

	    function show() {
	        var baseClasses = 'notification notification--active';
	        console.log('============', __webpack_require__(2));
	        var classes = __webpack_require__(2).getVisibility() ? baseClasses + ' notification--offset' :
	            baseClasses;
	        _elem.className = classes;

	        _toggleKeyListener(true);

	        setTimeout(function() {
	            baseClasses = 'notification';
	            _elem.className = __webpack_require__(2).getVisibility() ? baseClasses +
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

	        __webpack_require__(3).sendMessage({
	            type: 'tag',
	            data: {
	                tags: event.target.value,
	                keypointId: Store.getKeypoint()._id
	            }
	        });

	        event.target.value = '';
	    }
	}());

	module.exports = Notification;


/***/ },
/* 6 */
/***/ function(module, exports) {

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

	module.exports = Store;


/***/ },
/* 7 */,
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {module.exports = {
	    development: {
	        port: {
	            http: 3000,
	            https: 8000
	        },
	        url: {
	            http: 'http://www.localhost:3000',
	            https: 'https://www.localhost:8000'
	        }
	    },
	    production: {
	        port: {
	            http: 3000,
	            https: 80
	        },
	        url: {
	            http: 'http://www.keypointsapp.com:3000',
	            https: 'https://www.keypointsapp.com:80'
	        }
	    }
	}[process.env.NODE_ENV || 'development'];

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9)))

/***/ },
/* 9 */
/***/ function(module, exports) {

	// shim for using process in browser

	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            currentQueue[queueIndex].run();
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	// TODO(shtylman)
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ }
/******/ ]);