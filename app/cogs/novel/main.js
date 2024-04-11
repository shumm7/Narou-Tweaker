import { _header, changeHeaderScrollMode } from "./_header.js";
import { checkNovelPageDetail } from "./utils.js";
import { _authorSkin } from "./_skin.js";
import { _novel } from "./_novel.js";
import { _optionModal } from "./_modal.js";
import { _tategaki } from "./_vertical.js";

chrome.storage.local.get(null, (data) => {
    /* Header */
    _header()

    /* Option Menu */
    _optionModal();

    /* Header */
    changeHeaderScrollMode("#novel_header_right");
    changeHeaderScrollMode("#novel_header");

    if(data.novelCustomStyle){
        $("body").addClass("narou-tweaker")
        $("#footer").remove()

        if(checkNovelPageDetail()=="novel"){
            _novel()
            _tategaki()
        }
    }
    
    /* Author Skin */
    _authorSkin()
});