import { restoreOptions, setupDOM } from "../general.js";
import { addFontAwesomeOriginaIcons } from "/utils/header.js"
import { buttonHide, colorPicker, optionHide, syntaxHighlight } from "../utils.js";
import { addFontEditButtonEvent, restoreFont } from "./font.js";
import { addReplacePatternEditButtonEvent, restoreReplacePattern } from "./correction.js";
import { addSkinEditButtonEvent, restoreSkins } from "./skins.js";
import { setSortable, restoreHeaderIconList } from "./header.js";

setupDOM()
buttonHide()
optionHide()
addFontAwesomeOriginaIcons()
addFontEditButtonEvent()
addSkinEditButtonEvent()
addReplacePatternEditButtonEvent()

document.addEventListener('DOMContentLoaded', function(){
    restoreOptions()
    restoreHeaderIconList()
    setSortable()

    restoreFont()
    chrome.storage.local.get(null, function(data) {
        restoreSkins(data.skins, data.selectedSkin)
        colorPicker()
    })
    restoreReplacePattern()
    syntaxHighlight()
});

