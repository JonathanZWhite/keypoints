chrome.contextMenus.create({
    title: 'Add keypoint',
    contexts: ['page', 'selection', 'image', 'link'],
    onclick: clickHandler
});

function clickHandler(event) {
    var url = event.pageUrl;
    var keypoint = event.selectionText;
    var image = event.srcUrl;

    _message(url, keypoint, image);
}

function _message(url, keypoint, image) {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
            payload: {
                url: url,
                keypoint: keypoint,
                image: image
            }
        }, function(response) {});
    });
}
