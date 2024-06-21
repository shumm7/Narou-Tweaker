import { restoreOptions, setupDOM } from "../general.js";
import { buttonHide, optionHide } from "../utils.js";
import { setSortable, restoreHeaderIconList } from "../novel/header.js";

setupDOM()
buttonHide()
optionHide()

document.addEventListener('DOMContentLoaded', function(){
    restoreOptions()
    restoreHeaderIconList()
    setSortable()
})