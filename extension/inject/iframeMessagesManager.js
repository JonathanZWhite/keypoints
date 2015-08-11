var Iframe = require('./iframe');
var Notification = require('./notification');
var Store = require('./store');

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
        require('./iframe').getElement().contentWindow.postMessage(payload, '*');
    }
}());

module.exports = IframeMessagesManager;
