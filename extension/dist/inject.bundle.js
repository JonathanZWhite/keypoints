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
/***/ function(module, exports) {

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
	        var href = window.location.href;
	        var formattedHref = href.substr(href.indexOf('://')+3);
	        this.iframe = document.createElement('iframe');
	        this.iframe.src = 'http://localhost:3000/topic?url=' + formattedHref;
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


/***/ }
/******/ ]);