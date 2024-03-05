import { changeHeaderScrollMode, applySkin } from "./cogs.js";
import { defaultValue, check } from "../../utils/misc.js";

var header_mode
var novel_skin

chrome.storage.sync.get(["options"], (data) => {
    var options = data.options
    header_mode = defaultValue(options.novel_header_mode, "scroll");

    /* Remove Default Set */
    $("#novelnavi_right .novelview_navi .color input[name='colorset'][value='1']").click()
    if($("#novelnavi_right .novelview_navi input[name='fix_menu_bar']").prop('checked')){
        $("#novelnavi_right .novelview_navi input[name='fix_menu_bar']").click()
    }
    $("#novelnavi_right").remove()


    /* Option Menu */
    optionModal();

    /* Header */
    changeHeaderScrollMode(header_mode);
    
});

function optionModal(){
    
    /* New Header */
    $("#head_nav").after('<div id="novelnavi_right" style="position: absolute;"></div>')

    /* Option Button */
    $("#novelnavi_right").append('<div id="novel-option-button"><i id="novel-option-button--icon" class="fa-solid fa-gear"></i></div></div>')
    $("#novel-option-button").on("click", function(){
        if($("#novel-option").hasClass("show")){
            $("#novel-option").removeClass("show")
        }else{
            $("#novel-option").addClass("show")
        }
    })

    /* Option Modal */
    $("#novel_header").after("<aside id='novel-option'></aside>")
    $("#novel-option").append("<div id='novel-option--header'></div>")
    $("#novel-option").append("<div id='novel-option--ontent'></div>")

    /* Modal Header */
    $("#novel-option--header").append("<ul></ul>")
    $("#novel-option--header ul").append("<li class='active'><button type='button' class='novel-option--header-tab novel-option-tab-01'><span class='novel-option--header-tab'>"+"タブ1"+"</span></button></li>")
    $("#novel-option--header ul").append("<li><button type='button' class='novel-option--header-tab novel-option-tab-02'><span class='novel-option--header-tab'>"+"タブ2"+"</span></button></li>")

}