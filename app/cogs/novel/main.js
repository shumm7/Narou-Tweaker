import { changeHeaderScrollMode, removeDefaultSkinClass } from "./cogs.js";
import { defaultValue, check } from "../../utils/misc.js";

var header_mode
var novel_skin

chrome.storage.sync.get(null, (options) => {
    header_mode = defaultValue(options.novel_header_mode, "scroll");
    novel_skin = defaultValue(options.novel_skin, "default");

    /* Header */
    $("#novelnavi_right .novelview_navi .color input[name='colorset'][value='0']").click()
    if($("#novelnavi_right .novelview_navi input[name='fix_menu_bar']").prop('checked')){
        $("#novelnavi_right .novelview_navi input[name='fix_menu_bar']").click()
    }
    /*
    $("#novelnavi_right .toggle").remove()
    $("#novelnavi_right .toggle_menuclose").remove()
    $("#novelnavi_right .novelview_navi").remove()
    */
    changeHeaderScrollMode(header_mode);
    
    /* Skin */
    removeDefaultSkinClass();
});

function changeSkin(skin){

}