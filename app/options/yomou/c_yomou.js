import { restoreOptions, setupDOM } from "../general.js";
import { buttonHide, colorPicker, optionHide, syntaxHighlight } from "../utils.js";

setupDOM()
buttonHide()
optionHide()

document.addEventListener('DOMContentLoaded', function(){
    restoreOptions()
    colorPicker()
    syntaxHighlight()
})