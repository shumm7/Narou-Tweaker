import { changeHeaderScrollMode } from "./cogs.js";
import { defaultValue } from "../../utils/misc.js";

var header_mode

chrome.storage.sync.get(null, (options) => {
    header_mode = defaultValue(options.novel_header_mode, "scroll");

    /* Header */
    if(header_mode!="default"){
        $("#novelnavi_right .toggle").remove()
        $("#novelnavi_right .toggle_menuclose").remove()
        $("#novelnavi_right .novelview_navi").remove()
    }
    changeHeaderScrollMode()
    
});
