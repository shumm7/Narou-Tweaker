import { defaultValue } from "../../utils/misc.js";
import { applyCSS } from "./novel.js";

/* Message */
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action == "fetch"){
        if(message.format == "json" || message.format==undefined){
            fetch(message.data.url, message.data.options)
            .then(response => response.json())
            .then(data => {
                chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                    chrome.tabs.sendMessage(tabs[0].id, {action: "fetch", result: data, format: "json", success: true, id: message.id}).catch((error) => {
                        console.log(error);
                    });
                });
            })
            .catch((e) => {
                chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                    chrome.tabs.sendMessage(tabs[0].id, {action: "fetch", result: e, format: "json", success: false, id: message.id}).catch((error) => {
                        console.log(error);
                    });
                });    
            })
            
        }else if(message.format == "text"){
            fetch(message.data.url, message.data.options)
            .then(response => response.text())
            .then(data => {
                chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                    chrome.tabs.sendMessage(tabs[0].id, {action: "fetch", result: data, format: "text", success: true, id: message.id}).catch((error) => {
                        console.log(error);
                    });
                });
            })
            .catch((e) => {
                chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                    chrome.tabs.sendMessage(tabs[0].id, {action: "fetch", result: e, format: "text", success: false, id: message.id}).catch((error) => {
                        console.log(error);
                    });
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
    }else if(message.action == "file_open"){

    }else if(message.action == "apply_skin"){
        chrome.tabs.query({}, tabs => {
            for(let i=0; i<tabs.length; i++){
                if (tabs[i].url.match("https://ncode.syosetu.com/.*")){
                    applyCSS(tabs[i], defaultValue(message.data.index, 0))
                };
            }
        });
    }
    return true;
});

/* Novel */
chrome.tabs.onUpdated.addListener((tabId, info, tab) => {
    if (info.status == 'loading' && tab.url.match("https://ncode.syosetu.com/.*")){
        applyCSS(tab)
    };
});