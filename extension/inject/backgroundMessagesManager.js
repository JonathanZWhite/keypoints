var Iframe = require('./iframe');
var IframeMessagesManager = require('./iframeMessagesManager');

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
