import { fixOption } from "../../options/_lib/optionLib.js";
import { actionListener } from "./_action.js";
import { messageListener } from "./_process.js";
import { skinListener } from "./_skin.js";
import { yomouCssListener } from "./_yomou.js";

/* Update Option Data */
chrome.runtime.onInstalled.addListener((details) => {
    if(details.reason === "update"){
        console.log("Updated: fixing option...")
        fixOption(true, true)

        if(details.previousVersion !== chrome.runtime.getManifest().version){
            const id = `narou-tweaker--updated-version-${details.previousVersion}-to-${chrome.runtime.getManifest().version}`
            chrome.storage.local.get("extNotifications", function(data){
                if(data.extNotifications){
                    chrome.notifications.create(id, {
                        iconUrl: "/assets/icons/icon_48.png",
                        type: "basic",
                        title: "Narou Tweakerがアップデートされました",
                        message: `${details.previousVersion} -> ${chrome.runtime.getManifest().version}`,
                        buttons: [{
                            title: "パッチノート",
                        }]
                    })
                    chrome.notifications.onButtonClicked.addListener(function(notificationId, buttonIndex){
                        console.log(details)
                        if(notificationId === id && buttonIndex===0){
                            chrome.tabs.create({url: "/options/general/index.html?category=version"});
                        }
                    })
                }
            })
        }
    }
})

/* Reset Options */
chrome.storage.local.set({novelOfficialTags: undefined})
chrome.storage.local.onChanged.addListener(function(changes){
    if(changes.extOptionsVersion!=undefined){
        if(typeof changes.extOptionsVersion.newValue != "undefined"){
            console.log("Narou Tweaker's option was updated: "+changes.extOptionsVersion.oldValue+" -> "+changes.extOptionsVersion.newValue)
            console.log(changes)
        }
    }
})

/* Count */
chrome.storage.sync.get(null, function(data){
    var count = data.extLaunchCount
    if(typeof count === "number"){
        count += 1
    }else{
        count = 1
    }

    chrome.storage.sync.set({
        extLaunchCount: count,
        extLastLaunchTime: new Date().toUTCString()
    })
})

/* Action */
actionListener()

/* CSS */
chrome.storage.session.setAccessLevel({accessLevel: "TRUSTED_AND_UNTRUSTED_CONTEXTS"})
skinListener()
yomouCssListener()

/* Message */
messageListener()