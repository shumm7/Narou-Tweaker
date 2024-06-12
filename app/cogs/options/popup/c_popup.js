import { restoreOptions } from "../general.js";
import { buttonHide, optionHide } from "../utils.js";
import { addFontAwesomeOriginaIcons } from "/utils/header.js"
import { addFontEditButtonEvent, restoreFont } from "../novel/font.js";
import { addReplacePatternEditButtonEvent, restoreReplacePattern } from "../novel/correction.js";
import { addSkinEditButtonEvent, restoreSkins } from "../novel/skins.js"
import { restoreHeaderIconList, setSortable } from "../novel/header.js"

setupDOM()
buttonHide()
optionHide()
addFontAwesomeOriginaIcons()
addFontEditButtonEvent()
addSkinEditButtonEvent()
addReplacePatternEditButtonEvent()

document.addEventListener('DOMContentLoaded', function(){
    openDropdown()
    restoreOptions()
    restoreHeaderIconList()
    setSortable()
    restoreFont()
    chrome.storage.local.get(null, function(data) {
        restoreSkins(data.skins, data.selectedSkin)
    })
    restoreReplacePattern()
})

function setupDOM(){
    $('#js-failed').remove();
}

function openDropdown(){
    chrome.tabs.query({active: true, lastFocusedWindow:true}, tabs => {
        try{
            const tab = tabs[0]
            const url = new URL(tab.url)

            if(url.hostname == "ncode.syosetu.com" || url.hostname=="novelcom.syosetu.com" || url.hostname == "novel18.syosetu.com" || url.hostname=="novelcom18.syosetu.com" ){
                $("#novel").prop("open", true)
                //location.hash = "#novel"
            }
            else if(url.hostname == "mypage.syosetu.com" || url.hostname==" xmypage.syosetu.com" ){
                $("#mypage").prop("open", true)
                //location.hash = "#mypage"
            }
            else if(url.hostname == "kasasagi.hinaproject.com" ){
                $("#kasasagi").prop("open", true)
                //location.hash = "#kasasagi"
            }
            else if(url.hostname == "syosetu.com" ){
                $("#workspace").prop("open", true)
                //location.hash = "#workspace"
            }
            else if(url.hostname == "yomou.syosetu.com" || url.hostname=="noc.syosetu.com" || url.hostname == "mnlt.syosetu.com" || url.hostname=="mid.syosetu.com" ){
                $("#yomou").prop("open", true)
                //location.hash = "#yomou"
            }
        }catch(e){
            
        }
    })
}