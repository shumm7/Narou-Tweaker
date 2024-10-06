import { _header, changeHeaderScrollMode } from "./_header.js";
import { _authorSkin } from "./_skin.js";
import { _novel } from "./_novel.js";
import { _optionModal } from "./_modal.js";
import { _novelcom } from "./_novelcom.js";
import { checkNovelPageDetail } from "./utils.js";

const pageDetail = checkNovelPageDetail()
$("body").addClass("narou-tweaker--custom-skin")
if(pageDetail!==undefined){
    $("body").addClass(`narou-tweaker--novel-page--${pageDetail}`)
}

/* Header */
if(pageDetail!=="pdf" && pageDetail!=="txt" && pageDetail!==undefined){
    _header()
    changeHeaderScrollMode("#novel_header_right");
    changeHeaderScrollMode("#novel_header");
}

/* Option Menu */
_optionModal();


/* Novel Page */
_novel()

/* Novelcom */
_novelcom()

/* Author Skin */
_authorSkin()