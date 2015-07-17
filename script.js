document.addEventListener('mouseup',function(event) {
    var selected = window.getSelection().toString();
    console.log('yoo');
    alert(selected);
        // chrome.extension.sendRequest({'message':'setText','data': sel},function(response){})
})

alert('This is being injected');
