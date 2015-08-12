var config = require('../../config');
var utils = require('../../shared/utils');
var IframeMessagesManager = require('./iframeMessagesManager');

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
        _elem.src = config.urls.https + '/topic?url=' + formattedHref;
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
