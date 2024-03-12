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

    if(novel_css){
        $("body").addClass("narou-tweaker")
        /* Header */
        _header()

        /* Option Menu */
        _optionModal();

    }

    /* Header */
    changeHeaderScrollMode(header_mode);
});

function _header(){
    var ncode = getNcode()
    var index = ncodeToIndex(ncode)
    var episode = getEpisode()

    var text
    var elm
    $("#novel_header #novelnavi_right").remove()

    /* ホーム / ログイン */
    elm = $("#novel_header li#login a")
    if(elm){
        text = elm.text()
        elm.text("")
        elm.append('<i class="fa-solid fa-house"></i><span class="title">'+text+'</span>')
    }

    /* 作品情報 */
    elm = $("#novel_header li a[href^='https://ncode.syosetu.com/novelview/']")
    if(elm){
        elm.text("")
        elm.append('<i class="fa-solid fa-file-lines"></i><span class="title">作品情報</span>')
    }

    /* 感想 */
    elm = $("#novel_header li a[href^='https://novelcom.syosetu.com/impression/']")
    if(elm){
        elm.text("")
        elm.append('<i class="fa-solid fa-comments"></i><span class="title">感想</span>')
    }

    /* レビュー */
    elm = $("#novel_header li a[href^='https://novelcom.syosetu.com/novelreview/']")
    if(elm){
        elm.text("")
        elm.append('<i class="fa-solid fa-flag"></i><span class="title">レビュー</span>')
    }

    /* PDF */
    elm = $("#novel_header li form[action^='https://ncode.syosetu.com/novelpdf/']")
    if(elm){
        elm.prepend('<i class="fa-solid fa-file-pdf"></i>')
        $("#novel_header li form[action^='https://ncode.syosetu.com/novelpdf/'] i").on("click", ()=>{
            $("#novel_header li form[action^='https://ncode.syosetu.com/novelpdf/'] input[type='submit']").trigger("click")
        })
    }

    /* ブックマーク */
    elm = $("#novel_header li.booklist a")
    if(elm){
        elm.text("")
        if(elm.hasClass("js-bookmark_setting_button")){
            elm.append('<i class="fa-solid fa-book-bookmark"></i><span class="title">ブック<br>マーク</span>')
        }else if(elm.hasClass("js-add_bookmark")){
            elm.append('<i class="fa-solid fa-book"></i><span class="title">ブック<br>マーク</span>')
        }
    }

    /* しおり */
    elm = $("#novel_header li.bookmark_now a")
    if(elm){
        elm.text("")
        elm.append('<i class="fa-regular fa-bookmark"></i><span class="title">しおり</span>')
        elm.addClass("siori")
        $("#novel_header li.set_siori").on("click", ()=>{
            $("a.siori i.fa-bookmark").removeClass("fa-regular")
            $("a.siori i.fa-bookmark").addClass("fa-solid")
            $("a.siori .title").text("しおり中")
        })
    }

    elm = $("#novel_header li.bookmark")
    if(elm){
        elm.text("")
        elm.append('<a><i class="fa-solid fa-bookmark"></i><span class="title">しおり中</span></a>')
    }

    $("#novel_header ul").append('<li class="option"><a><i class="fa-solid fa-gear"></i><span>設定</span></a></li>')
    $("#novel_header ul .option").on("click", function(){
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
}

function _optionModal(){

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