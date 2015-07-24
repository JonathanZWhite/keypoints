var iframe = document.getElementById('keypoints');

document.addEventListener('mouseup',function(event) {
    var selected = window.getSelection().toString();
    iframe.contentWindow.postMessage('Hello world', '*');
    // chrome.extension.sendRequest({'message':'setText','data': sel},function(response){})
});
