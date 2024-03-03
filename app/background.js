chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action == "fetch"){
        if(message.format == "json" || message.format == undefined){
            fetch(message.data.url, message.data.options)
            .then(response => response.json())
            .then(data => {
                chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                    chrome.tabs.sendMessage(tabs[0].id, {action: "fetch", result: data, success: true});
                });
            })
            .catch((e) => {
                chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                    chrome.tabs.sendMessage(tabs[0].id, {action: "fetch", result: e, success: false});
                });    
            })
            
        }else if(message.format == "text"){
            fetch(message.data.url, message.data.options)
            .then(response => response.text())
            .then(data => {
                chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                    chrome.tabs.sendMessage(tabs[0].id, {action: "fetch", result: data, success: true});
                });
            })
            .catch((e) => {
                chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                    chrome.tabs.sendMessage(tabs[0].id, {action: "fetch", result: e, success: false});
                });    
            })
        }
        
    }else if(message.action == "downloads"){
        if(message.type == "download"){   
            chrome.downloads.download({
                url: message.data.url,
                filename: message.data.filename
            });
        }
    }
    return true;
});