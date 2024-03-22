import { updateOption } from "../../utils/option.js";
import { applyFont, applySkin } from "./novel.js";

/* Update Option Data */
updateOption()
chrome.storage.local.onChanged.addListener(function(changes){
    if(changes.optionsVersion!=undefined){
        console.log("Narou Tweaker's option was updated: "+changes.optionsVersion.oldValue+" -> "+changes.optionsVersion.newValue)
        console.log(changes)
    }
})

/* Message */
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action == "fetch"){
        if(message.format == "json" || message.format==undefined){
            fetch(message.data.url, message.data.options)
            .then(response => response.json())
            .then(data => {
                sendResponse({action: "fetch", result: data, format: message.format, success: true, id: message.id})
            })
            .catch((e) => {
                sendResponse({action: "fetch", result: e, format: message.format, success: false, id: message.id})
            })
            return true
            
        }else if(message.format == "text"){
            fetch(message.data.url, message.data.options)
            .then(response => response.text())
            .then(data => {
                sendResponse({action: "fetch", result: data, format: message.format, success: true, id: message.id})
            })
            .catch((e) => {
                sendResponse({action: "fetch", result: e, format: message.format, success: false, id: message.id})
            })
            return true
        }
        
    }else if(message.action == "downloads"){
        chrome.downloads.download({
            url: message.data.url,
            filename: message.data.filename
        }, function(downloadId){
            sendResponse({action: "downloads", id: downloadId});
            return true;
        });
    }
    sendResponse()
    return
});

/* First Load */
chrome.tabs.onUpdated.addListener((tabId, info, tab) => {
    if (info.status == 'loading' && tab.url.match(/^https:\/\/(ncode|novelcom).syosetu.com\/*.*/)){
        applySkin(tab)
        applyFont(tab)
    };
});

/* Storage Listener ( for Skin ) */
chrome.storage.local.onChanged.addListener(function(changes){
    if(changes.skins!=undefined || changes.selectedSkin!=undefined){
        chrome.tabs.query({lastFocusedWindow: true, url: ["https://ncode.syosetu.com/*", "https://novelcom.syosetu.com/*"]}, tabs => {
            for(let i=0; i<tabs.length; i++){
                applySkin(tabs[i])
            };
        });
    }
    if(changes.fontFontFamily!=undefined || changes.fontFontFamily_Custom!=undefined || changes.fontFontSize!=undefined || changes.fontLineHeight!=undefined || changes.fontTextRendering!=undefined || changes.fontWidth!=undefined){
        chrome.tabs.query({lastFocusedWindow: true, url: ["https://ncode.syosetu.com/*", "https://novelcom.syosetu.com/*"]}, tabs => {
            for(let i=0; i<tabs.length; i++){
                applyFont(tabs[i])
            };
        });
    }
})

