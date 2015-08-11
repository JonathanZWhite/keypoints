var Iframe = require('./iframe');
var IframeMessagesManager = require('./iframeMessagesManager');
var Store = require('./store');

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
        console.log('============', require('./iframe'));
        var classes = require('./iframe').getVisibility() ? baseClasses + ' notification--offset' :
            baseClasses;
        _elem.className = classes;

        _toggleKeyListener(true);

        setTimeout(function() {
            baseClasses = 'notification';
            _elem.className = require('./iframe').getVisibility() ? baseClasses +
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

        require('./iframeMessagesManager').sendMessage({
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
