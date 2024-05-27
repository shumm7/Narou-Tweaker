import { _header, changeHeaderScrollMode } from "./_header.js";
import { _authorSkin } from "./_skin.js";
import { _novel } from "./_novel.js";
import { _optionModal } from "./_modal.js";
import { _novelcom } from "./_novelcom.js";
import { checkNovelPageDetail } from "./utils.js";

/* Header */
if(checkNovelPageDetail()!="series"){
    _header()
}
changeHeaderScrollMode("#novel_header_right");
changeHeaderScrollMode("#novel_header");

/* Option Menu */
_optionModal();


/* Novel Page */
_novel()

/* Novelcom */
_novelcom()

/* Author Skin */
_authorSkin()