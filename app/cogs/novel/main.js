import { changeHeaderScrollMode, setOptionContentsDisplay } from "./cogs.js";
import { defaultValue, check } from "../../utils/misc.js";
import { getEpisode, getNcode } from "./utils.js";
import { ncodeToIndex } from "../../utils/text.js";

var header_mode
var novel_css

chrome.storage.sync.get(["options"], (data) => {
    var options = data.options
    header_mode = defaultValue(options.novel_header_mode, "scroll");
    novel_css = defaultValue(options.enable_novel_css, true)

    /* Header */
    changeHeaderScrollMode(header_mode);

    if(novel_css){
        /* Header */
        _header()

        /* Option Menu */
        _optionModal();

    }
});

function _header(){
    var ncode = getNcode()
    var index = ncodeToIndex(ncode)
    var episode = getEpisode()
    var isLogin = false
    $("#novel_header").before('<div class="novel-tabs"><ul></ul></div>')

    /* Home */
    if($("#head_nav #login a").prop("href")=="https://syosetu.com/user/top/"){
        var isLogin = true
        $(".novel-tabs ul").append('<li class="home"><a href="https://syosetu.com/user/top/"><i class="fa-solid fa-house"></i></a></li>')
    }else{
        $(".novel-tabs ul").append('<li class="login"><a href="https://syosetu.com/login/input/"><i class="fa-solid fa-house"></i></a></li>')
    }

    /* Info */
    $(".novel-tabs ul").append('<li class="info"><a href="https://ncode.syosetu.com/novelview/infotop/ncode/'+ncode+'/"><i class="fa-solid fa-file-lines"></i></a></li>')

    /* Comment */
    if(episode==0){
        $(".novel-tabs ul").append('<li class="comment"><a href="https://novelcom.syosetu.com/impression/list/ncode/'+index+'/"><i class="fa-solid fa-comments"></i></a></li>')
    }else{
        $(".novel-tabs ul").append('<li class="comment"><a href="https://novelcom.syosetu.com/impression/list/ncode/'+index+'/no/'+episode+'/"><i class="fa-solid fa-comments"></i></a></li>')
    }

    /* Review */
    $(".novel-tabs ul").append('<li class="review"><a href="https://novelcom.syosetu.com/novelreview/list/ncode/'+index+'/"><i class="fa-solid fa-flag"></i></a></li>')

    $("#novel_header").remove()
    
}

function _optionModal(){
    /* New Header */
    $("#novelnavi_right").remove()
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
    setOptionContentsDisplay()
    $(".novel-option--content.novel-option-tab-2").text("2")

}