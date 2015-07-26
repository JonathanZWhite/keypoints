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

	chrome.contextMenus.create({
	    title: 'Add keypoint',
	    contexts: ['page', 'selection', 'image', 'link'],
	    onclick: clickHandler
	});

	function clickHandler(event) {
	    var url = event.pageUrl;
	    var selected = event.selectionText;
	    var contentType = event.mediaType === 'image' ? 'image' : 'text';
	    var imageSrc = event.srcUrl;

	    _message(url, selected, contentType, imageSrc);
	}

	function _message(url, selected, contentType, imageSrc) {
	    chrome.tabs.query({
	        active: true,
	        currentWindow: true
	    }, function(tabs) {
	        chrome.tabs.sendMessage(tabs[0].id, {
	            payload: {
	                url: url,
	                selected: selected,
	                contentType: contentType,
	                imageSrc: imageSrc
	            }
	        }, function(response) {});
	    });
	}


/***/ }
/******/ ]);