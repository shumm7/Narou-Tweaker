import { setup } from "../general.js";
import { addFontAwesomeOriginaIcons } from "/utils/header.js"
import { addFontEditButtonEvent, restoreFont } from "./font.js";
import { addReplacePatternEditButtonEvent, restoreReplacePattern } from "./correction.js";
import { addSkinEditButtonEvent, restoreSkins } from "./skins.js";
import { setSortable, restoreHeaderIconList } from "./header.js";

setup()
addFontAwesomeOriginaIcons()
addFontEditButtonEvent()
addSkinEditButtonEvent()
addReplacePatternEditButtonEvent()

document.addEventListener('DOMContentLoaded', function(){
    restoreHeaderIconList()
    setSortable()

    restoreFont()
    chrome.storage.local.get(null, function(data) {
        restoreSkins(data.skins, data.selectedSkin)
    })
    restoreReplacePattern()
});

