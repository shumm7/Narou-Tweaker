import { setup } from "../general.js";
import { addFontAwesomeOriginaIcons } from "../../utils/header.js"

import { addFontEditButtonEvent, restoreFont } from "./font.js";
import { addReplacePatternEditButtonEvent, restoreReplacePattern } from "./correction.js";
import { restoreSkins } from "./skins.js";
import { setSortable, restoreHeaderIconList } from "./header.js";

setup()
addFontAwesomeOriginaIcons()
addFontEditButtonEvent()
//addSkinEditButtonEvent()
addReplacePatternEditButtonEvent()

document.addEventListener('DOMContentLoaded', function(){
    restoreHeaderIconList()
    setSortable()

    restoreFont()
    restoreSkins()
    restoreReplacePattern()
});

