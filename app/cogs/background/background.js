import { defaultFont } from "../../utils/data/default_font.js";
import { defaultValue } from "../../utils/misc.js";
import { applyCSS } from "./novel.js";

/* Message */
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action == "fetch"){
        if(message.format == "json" || message.format==undefined){
            fetch(message.data.url, message.data.options)
            .then(response => response.json())
            .then(data => {
                sendResponse({action: "fetch", result: data, format: message.format, success: true, id: message.id});
            })
            .catch((e) => {
                sendResponse({action: "fetch", result: e, format: message.format, success: false, id: message.id});   
            })
            
        }else if(message.format == "text"){
            fetch(message.data.url, message.data.options)
            .then(response => response.text())
            .then(data => {
                sendResponse({action: "fetch", result: data, format: message.format, success: true, id: message.id});
            })
            .catch((e) => {
                sendResponse({action: "fetch", result: e, format: message.format, success: false, id: message.id});    
            })
        }
        
    }else if(message.action == "downloads"){
        chrome.downloads.download({
            url: message.data.url,
            filename: message.data.filename
        }, function(downloadId){
            sendResponse({action: "downloads", id: downloadId});
        });
    }else if(message.action == "apply_skin"){
        chrome.tabs.query({lastFocusedWindow: true, url: "https://ncode.syosetu.com/*"}, tabs => {
            for(let i=0; i<tabs.length; i++){
                applyCSS(tabs[i], message.data.index, message.data.font)
            };
            sendResponse({action: "apply_skin"});
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