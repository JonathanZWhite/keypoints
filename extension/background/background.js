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
