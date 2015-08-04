chrome.contextMenus.create({
    title: 'Add keypoint',
    contexts: ['page', 'selection', 'image', 'link'],
    onclick: contextMenuClickHandler
});

function contextMenuClickHandler(event) {
    var url = event.pageUrl;
    var keypoint = event.selectionText;
    var image = event.srcUrl;
    var payload = {
        type: 'context',
        url: url,
        keypoint: keypoint,
        image: image
    };

    _message(payload);
}

function _onClick() {
    _message({ type: 'browserAction' });
}

function _message(payload) {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, payload, function(response) {});
    });
}

function _onBeforeNavigate(detail, test) {
    _message({
        type: 'navigate',
        detail: detail,
        test: test
    });
}

chrome.webNavigation.onBeforeNavigate.addListener(_onBeforeNavigate);
chrome.browserAction.onClicked.addListener(_onClick);
