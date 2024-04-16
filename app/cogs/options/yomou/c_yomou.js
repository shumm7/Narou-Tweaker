import { restoreOptions, setupDOM } from "../general.js";
import { buttonHide, colorPicker, optionHide } from "../utils.js";

setupDOM()
buttonHide()
optionHide()

document.addEventListener('DOMContentLoaded', function(){
    restoreOptions()
    colorPicker()
})