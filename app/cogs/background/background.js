import { updateOption } from "/utils/option.js";
import { actionListener } from "./_action.js";
import { messageListener } from "./_process.js";
import { sidepanelListener } from "./_sidepanel.js";
import { skinListener } from "./_skin.js";
import { yomouCssListener } from "./_yomou.js";

/* Update Option Data */
updateOption()
chrome.storage.local.onChanged.addListener(function(changes){
    if(changes.extOptionsVersion!=undefined){
        if(typeof changes.extOptionsVersion.newValue != "undefined"){
            console.log("Narou Tweaker's option was updated: "+changes.extOptionsVersion.oldValue+" -> "+changes.extOptionsVersion.newValue)
            console.log(changes)
        }
    }
    else if(changes.extAdvancedSettings!=undefined){
        if(changes.extAdvancedSettings.newValue==false){
            chrome.storage.local.set({extExperimentalFeatures: false}, function(){})
        }
    }
})

/* Action */
actionListener()

/* CSS */
skinListener()
yomouCssListener()

/* Message */
messageListener()

/* Sidepanel */
sidepanelListener()