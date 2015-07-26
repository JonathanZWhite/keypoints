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
