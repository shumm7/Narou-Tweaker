import { updateOption } from "../../utils/option.js";
import { actionListener } from "./action.js";
import { messageListener } from "./process.js";
import { sidepanelListener } from "./sidepanel.js";
import { skinListener } from "./skin.js";

/* Update Option Data */
updateOption()
chrome.storage.local.onChanged.addListener(function(changes){
    if(changes.extOptionsVersion!=undefined){
        if(typeof changes.extOptionsVersion.newValue != "undefined"){
            console.log("Narou Tweaker's option was updated: "+changes.extOptionsVersion.oldValue+" -> "+changes.extOptionsVersion.newValue)
            console.log(changes)
        }
    }
})

/* Action */
actionListener()

/* Skin */
skinListener()

/* Message */
messageListener()

/* Sidepanel */
sidepanelListener()