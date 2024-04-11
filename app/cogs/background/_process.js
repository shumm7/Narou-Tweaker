/* Message */
export function messageListener(){
    chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
        if (message.action == "fetch"){
            if(message.format == "json" || message.format==undefined){
                fetch(message.data.url, message.data.options)
                .then(response => response.json())
                .then(data => {
                    sendResponse({action: "fetch", result: data, format: message.format, success: true, id: message.id, message: message.data})
                })
                .catch((e) => {
                    sendResponse({action: "fetch", result: e, format: message.format, success: false, id: message.id, message: message.data})
                })
                return true
                
            }else if(message.format == "text"){
                fetch(message.data.url, message.data.options)
                .then(response => response.text())
                .then(data => {
                    sendResponse({action: "fetch", result: data, format: message.format, success: true, id: message.id, message: message.data})
                })
                .catch((e) => {
                    sendResponse({action: "fetch", result: e, format: message.format, success: false, id: message.id, message: message.data})
                })
                return true
            }
            
        }else if(message.action == "downloads"){
            chrome.downloads.download({
                url: message.data.url,
                filename: message.data.filename
            }, function(downloadId){
                sendResponse({action: "downloads", id: downloadId, message: message.data});
                return true;
            });
        }
        sendResponse()
        return
    })
}