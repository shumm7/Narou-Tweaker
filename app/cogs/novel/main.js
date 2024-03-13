import { changeHeaderScrollMode, setOptionContentsDisplay } from "./cogs.js";
import { defaultValue, check } from "../../utils/misc.js";
import { getEpisode, getNcode } from "./utils.js";
import { ncodeToIndex } from "../../utils/text.js";

var header_mode
var novel_css
var header_left
var header_right
var header_disabled

chrome.storage.sync.get(["options"], (data) => {
    var options = data.options
    header_mode = defaultValue(options.novel_header_mode, "scroll");
    novel_css = defaultValue(options.enable_novel_css, true)
    header_left = defaultValue(options.novel_header_icon_left, ["home", "info", "impression", "review", "pdf", "booklist"])
    header_right = defaultValue(options.novel_header_icon_right, ["siori", "option"])
    header_disabled = defaultValue(options.novel_header_icon_disabled, ["author", "kasasagi", "narou-api", "rss", "text"])

    if(novel_css){
        $("body").addClass("narou-tweaker")
        /* Header */
        _header(header_left, header_right, header_disabled)

        /* Option Menu */
        _optionModal();
        
        /* Header */
        changeHeaderScrollMode(header_mode, "#novel_header_right");
    }

    /* Header */
    changeHeaderScrollMode(header_mode, "#novel_header");
});

function _header(left, right, disabled){
    var ncode = getNcode()
    var index = ncodeToIndex(ncode)
    var episode = getEpisode()
    var atom = $("link[href^='https://api.syosetu.com/writernovel/'][title='Atom']").prop("href")
    var userid = atom.match(/https:\/\/api\.syosetu\.com\/writernovel\/(\d+)\.Atom/)[1]

    var text
    var elm
    $("#novel_header #novelnavi_right").remove()
    $("#pageBottom").remove()
    $("#pageTop").remove()
    $(".wrap_menu_novelview_after").empty()

    /* Right Menu Bar */
    $("#novel_header").before(`<div id="novel_header_right">
        <ul id="head_nav">
        </ul>
    </div>`)

    /* ホーム / ログイン */
    elm = $("#novel_header li#login a")
    if(elm){
        text = elm.text()
        elm.text("")
        elm.append('<i class="fa-solid fa-house"></i><span class="title">'+text+'</span>')
        elm.parent().addClass("home")
    }

    /* 作品情報 */
    elm = $("#novel_header li a[href^='https://ncode.syosetu.com/novelview/']")
    if(elm){
        elm.text("")
        elm.append('<i class="fa-solid fa-info"></i></i><span class="title">作品情報</span>')
        elm.parent().addClass("info")
    }

    /* 感想 */
    elm = $("#novel_header li a[href^='https://novelcom.syosetu.com/impression/']")
    if(elm){
        elm.text("")
        elm.append('<i class="fa-solid fa-comments"></i><span class="title">感想</span>')
        elm.parent().addClass("impression")
    }

    /* レビュー */
    elm = $("#novel_header li a[href^='https://novelcom.syosetu.com/novelreview/']")
    if(elm){
        elm.text("")
        elm.append('<i class="fa-solid fa-flag"></i><span class="title">レビュー</span>')
        elm.parent().addClass("review")
    }

    /* PDF */
    elm = $("#novel_header li form[action^='https://ncode.syosetu.com/novelpdf/']")
    if(elm){
        elm.prepend('<i class="fa-solid fa-file-pdf"></i>')
        elm.parent().addClass("pdf")
        $("#novel_header li form[action^='https://ncode.syosetu.com/novelpdf/'] i").on("click", ()=>{
            $("#novel_header li form[action^='https://ncode.syosetu.com/novelpdf/'] input[type='submit']").trigger("click")
        })
    }

    /* ブックマーク */
    elm = $("#novel_header li.booklist a")
    if(elm){
        elm.text("")
        if(elm.hasClass("js-bookmark_setting_button")){
            elm.append('<i class="fa-solid fa-book-bookmark"></i><span class="title">ブックマーク<br><span style="font-size: 90%;">（設定変更）</span></span>')
        }else if(elm.hasClass("js-add_bookmark")){
            elm.append('<i class="fa-solid fa-book"></i><span class="title">ブックマーク<br><span style="font-size: 90%;">（登録）</span></span>')
        }
        elm.parent().addClass("booklist")
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
        elm.parent().addClass("siori")
        /*elm.parent().appendTo("#novel_header_right ul")*/
    }

    elm = $("#novel_header li.bookmark")
    if(elm){
        elm.text("")
        elm.append('<a><i class="fa-solid fa-bookmark"></i><span class="title">しおり中</span></a>')
        elm.addClass("siori")
        /*elm.appendTo("#novel_header_right ul")*/
    }

    /* Twitter */
    $("#novel_header li:nth-last-child(1)").remove()
    

    /* 設定 */
    $("#novel_header ul").append('<li class="option"><a><i class="fa-solid fa-gear"></i><span>設定</span></a></li>')
    $("#novel_header li.option").on("click", function(){
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

    /* 作者マイページ */
    if(userid){
        $("#novel_header ul").append('<li class="author"><a href="https://mypage.syosetu.com/'+userid+'/"><i class="fa-solid fa-user"></i><span class="title">作者</span></a></li>')
    }

    /* KASASAGI */
    $("#novel_header ul").append('<li class="kasasagi"><a href="https://kasasagi.hinaproject.com/access/top/ncode/'+ncode+'/"><i class="fa-solid fa-chart-line"></i><span class="title">アクセス解析</span></a></li>')

    /* API */
    $("#novel_header ul").append('<li class="narou-api"><a href="https://api.syosetu.com/novelapi/api/?libtype=2&out=json&ncode='+ncode+'"><i class="fa-solid fa-file-code"></i><span class="title">なろうAPI</span></a></li>')

    /* RSS */
    if(atom){
        $("#novel_header ul").append('<li class="rss"><a href="'+atom+'"><i class="fa-solid fa-rss"></i><span class="title">RSS</span></a></li>')
    }

    /* TXT */
    $("#novel_header ul").append('<li class="text"><a href=https://ncode.syosetu.com/txtdownload/top/ncode/'+index+'/"><i class="fa-solid fa-file-lines"></i><span class="title">TXT</span></a></li>')

    /* Set Position */
    $.each(disabled, (_, cls)=>{
        var elm = $("#novel_header ul li."+cls)
        if(elm){
            elm.remove()
        }
    })
    $.each(right, (_, cls)=>{
        var elm = $("#novel_header ul li."+cls)
        if(elm){
            elm.appendTo("#novel_header_right ul")
        }
    })
    $.each(left, (_, cls)=>{
        var elm = $("#novel_header ul li."+cls)
        if(elm){
            elm.appendTo("#novel_header ul")
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