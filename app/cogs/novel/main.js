import { _header, changeHeaderScrollMode } from "./_header.js";
import { _authorSkin } from "./_skin.js";
import { _novel } from "./_novel.js";
import { _optionModal } from "./_modal.js";

/* Header */
_header()

/* Option Menu */
_optionModal();

/* Header */
changeHeaderScrollMode("#novel_header_right");
changeHeaderScrollMode("#novel_header");

/* Novel Page */
_novel()

/* Author Skin */
_authorSkin()