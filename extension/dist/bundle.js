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
	    console.log('Look here', event);
	    var url = event.pageUrl;
	    var selected = event.selectionText;
	    var contentType = event.mediaType === 'image' ? 'image' : 'text';
	    var imageSrc = event.srcUrl;

	    chrome.extension.sendRequest({
	        message: 'yoyoyoyoy',
	        data: 'yoyoyoyoy'
	    });

	    chrome.tabs.query({
	        active: true,
	        currentWindow: true
	    }, function(tabs) {
	        chrome.tabs.sendMessage(tabs[0].id, {
	            action: "open_dialog_box"
	        }, function(response) {});
	    });
	}

	// var clickHandler = function(e) {
	//     var url = e.pageUrl;
	//     var buzzPostUrl = 'http://www.google.com/buzz/post?';
	//
	//     if (e.selectionText) {
	//         // The user selected some text, put this in the message.
	//         buzzPostUrl += 'message=' + encodeURI(e.selectionText) + '&';
	//     }
	//
	//     if (e.mediaType === 'image') {
	//         buzzPostUrl += 'imageurl=' + encodeURI(e.srcUrl) + '&';
	//     }
	//
	//     if (e.linkUrl) {
	//         // The user wants to buzz a link.
	//         url = e.linkUrl;
	//     }
	//
	//     buzzPostUrl += 'url=' + encodeURI(url);
	//
	//     // Open the page up.
	//     chrome.tabs.create(
	//           {'url' : buzzPostUrl });
	// };


/***/ }
/******/ ]);