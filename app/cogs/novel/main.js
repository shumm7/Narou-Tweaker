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
        if($("#novel-option-background").hasClass("show")){
            $("#novel-option-background").removeClass("show")
        }else{
            $("#novel-option-background").addClass("show")
        }
    })

    /* Option Modal */
    $("#novel_header").after("<aside id='novel-option'></aside>")
    $("#novel-option").before("<div id='novel-option-background'></div>")
    $("#novel-option").append("<div id='novel-option--header'></div>")
    $("#novel-option").append("<div id='novel-option--contents'></div>")
    
    $("#novel-option-background").on("click", ()=>{
        if($("#novel-option").hasClass("show")){
            $("#novel-option").removeClass("show")
        }else{
            $("#novel-option").addClass("show")
        }
        if($("#novel-option-background").hasClass("show")){
            $("#novel-option-background").removeClass("show")
        }else{
            $("#novel-option-background").addClass("show")
        }
    })

    /* Modal Header */
    $("#novel-option--header").append("<ul></ul>")
    function addTab(index, title){
        $("#novel-option--header ul").append("<li class='novel-option--header-tab novel-option-tab-"+index+"'><button type='button'><span class='novel-option--header-tab'>"+title+"</span></button></li>")
        $("#novel-option--contents").append("<div class='novel-option--content novel-option-tab-"+index+"'></div>")
        $(".novel-option--header-tab.novel-option-tab-"+index+" button").on("click", ()=>{
            $("#novel-option .novel-option--header-tab").removeClass("active")
            $("#novel-option .novel-option--content").removeClass("active")
            $("#novel-option .novel-option-tab-" + index).addClass("active")
        })
    }

    addTab(1, "表示設定")
    addTab(2, "その他")
    $("#novel-option .novel-option-tab-1").addClass("active")
    $(".novel-option--content.novel-option-tab-1").text("1")
    $(".novel-option--content.novel-option-tab-2").text("2")

}