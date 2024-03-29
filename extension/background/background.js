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
        linkUrl: event.linkUrl,
        keypoint: keypoint,
        image: image,
        event: event
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

function _onUpdated(tabId, changeInfo, tab) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (tabs[0].id !== tabId) return;

        if (changeInfo.status === 'loading' && changeInfo.url) {
            _message({
                type: 'navigate',
                url: changeInfo.url
            });
        }
    });
}

chrome.tabs.onUpdated.addListener(_onUpdated);
chrome.browserAction.onClicked.addListener(_onClick);
