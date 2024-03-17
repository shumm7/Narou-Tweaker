import { changeHeaderScrollMode, setOptionContentsDisplay } from "./cogs.js";
import { defaultValue, check } from "../../utils/misc.js";
import { getEpisode, getNcode } from "./utils.js";
import { ncodeToIndex } from "../../utils/text.js";
import { getExceptedIcon } from "../../utils/header.js";

var header_mode
var novel_css
var novel_header
var novel_header_scroll_hidden
var header_left
var header_right

chrome.storage.local.get(["options"], (data) => {
    var options = defaultValue(data.options, {})

    header_mode = defaultValue(options.novel_header_mode, "scroll");
    novel_css = defaultValue(options.enable_novel_css, true)
    novel_header = defaultValue(options.enable_novel_header, true)
    novel_header_scroll_hidden = defaultValue(options.enable_novel_header_scroll_hidden, false)
    header_left = defaultValue(options.novel_header_icon_left, ["home", "info", "impression", "review", "pdf", "booklist"])
    header_right = defaultValue(options.novel_header_icon_right, ["siori", "option"])
    
    if(novel_header){
        $("body").addClass("narou-tweaker-header")
        $("#novelnavi_right").remove()
        /* Header */
        _header(header_left, header_right)
        
        /* Header */
        changeHeaderScrollMode(header_mode, "#novel_header_right", novel_header_scroll_hidden);
    }else{
        $("#novelnavi_right").empty()
        $("#novelnavi_right").append(`<div class="option" id="menu_on" style="position: fixed;">設定</div>`)
        $("#novelnavi_right .option").on("click", function(){
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

    
    /* Option Menu */
    _optionModal();

    /* Header */
    changeHeaderScrollMode(header_mode, "#novel_header", novel_header_scroll_hidden);

    if(novel_css){
        $("body").addClass("narou-tweaker")

        if(location.pathname.match(/^\/[n|N]\d{4}[a-zA-Z]{2}\/\d+\/*$/)){
            _novelPage()
        }
    }
});

function _header(left, right){
    if(!$("#novel_header").length){return}

    var ncode = getNcode()
    var index = ncodeToIndex(ncode)
    var episode = getEpisode()
    var atom = $("link[href^='https://api.syosetu.com/writernovel/'][title='Atom']").prop("href")
    var userid = atom.match(/https:\/\/api\.syosetu\.com\/writernovel\/(\d+)\.Atom/)[1]
    const disabled = getExceptedIcon([right, left])
    const isDisabled = key => {return disabled.includes(key)}

    var text
    var elm

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
    if(elm.length){
        text = elm.text()
        elm.text("")
        elm.append('<i class="fa-solid fa-house"></i><span class="title">'+text+'</span>')
        elm.parent().addClass("home")
    }

    /* 作品情報 */
    elm = $("#novel_header li a[href^='https://ncode.syosetu.com/novelview/']")
    if(elm.length){
        elm.text("")
        elm.append('<i class="fa-solid fa-info"></i></i><span class="title">作品情報</span>')
        elm.parent().addClass("info")
    }

    /* 感想 */
    elm = $("#novel_header li a[href^='https://novelcom.syosetu.com/impression/']")
    if(elm.length){
        elm.text("")
        elm.append('<i class="fa-solid fa-comments"></i><span class="title">感想</span>')
        elm.parent().addClass("impression")
    }

    /* レビュー */
    elm = $("#novel_header li a[href^='https://novelcom.syosetu.com/novelreview/']")
    if(elm.length){
        elm.text("")
        elm.append('<i class="fa-solid fa-flag"></i><span class="title">レビュー</span>')
        elm.parent().addClass("review")
    }

    /* PDF */
    elm = $("#novel_header li form[action^='https://ncode.syosetu.com/novelpdf/']")
    if(elm.length){
        elm.prepend('<i class="fa-solid fa-file-pdf"></i>')
        elm.parent().addClass("pdf")
        $("#novel_header li form[action^='https://ncode.syosetu.com/novelpdf/'] i").on("click", ()=>{
            $("#novel_header li form[action^='https://ncode.syosetu.com/novelpdf/'] input[type='submit']").trigger("click")
        })
    }

    /* ブックマーク */
    var is_logined_and_self = false
    elm = $("#novel_header li.booklist a")
    if(elm.length){
        elm.text("")
        if(elm.hasClass("js-bookmark_setting_button")){
            elm.append('<i class="fa-solid fa-book-bookmark"></i><span class="title">ブックマーク<br><span style="font-size: 90%;">（設定変更）</span></span>')
        }else if(elm.hasClass("js-add_bookmark")){
            elm.append('<i class="fa-solid fa-book"></i><span class="title">ブックマーク<br><span style="font-size: 90%;">（登録）</span></span>')
        }
        elm.parent().addClass("booklist")
    }
    else if($("#novel_header li.booklist .button_bookmark.logout").length){
        /*
        elm = $("#novel_header li.booklist")
        elm.find(".button_bookmark.logout").remove()
        elm.prepend('<a><i class="fa-solid fa-book"></i><span class="title">ブックマーク<br><span style="font-size: 90%;">（未ログイン）</span></span></a>')
        */
    } else {
        $("#novel_header li.booklist").remove()
        is_logined_and_self = true
    }

    /* しおり */
    elm = $("#novel_header li.bookmark_now a")
    if(elm.length){
        elm.text("")
        elm.append('<i class="fa-regular fa-bookmark"></i><span class="title">しおり</span>')
        elm.addClass("siori")
        $("#novel_header li.set_siori").on("click", ()=>{
            $("a.siori i.fa-bookmark").removeClass("fa-regular")
            $("a.siori i.fa-bookmark").addClass("fa-solid")
            $("a.siori .title").text("しおり中")
        })
        elm.parent().addClass("siori")
    }

    elm = $("#novel_header li.bookmark")
    if(elm.length){
        elm.text("")
        elm.append('<a><i class="fa-solid fa-bookmark"></i><span class="title">しおり中</span></a>')
        elm.addClass("siori")
    }

    elm = $("#novel_header li.bookmark")
    if(location.pathname.match(/^\/[n|N]\d{4}[a-zA-Z]{2}\/*$/) && !elm.length){
        elm = $(".novellingindex_bookmarker_no")
        if(elm.length){
            var link = elm.find("a").prop("href")
            var text = elm.find("a").text()
            elm.remove()
            $("#novel_header ul").prepend('<li class="siori"><a href="'+link+'"><i class="fa-solid fa-bookmark"></i><span class="title">しおり中<br><span style="font-size: 90%;">（'+text+'）</span></span></a></li>')
        }else{
            $("#novel_header ul").prepend('<li class="siori"><a><i class="fa-regular fa-bookmark"></i><span class="title">しおり<br><span style="font-size: 90%;">（なし）</span></span></a></li>')
        }
    }

    /* Twitter */
    $("#novel_header li:nth-last-child(1)").remove()
    

    /* 設定 */
    if(!isDisabled("option")){
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
    }

    /* 作者マイページ */
    if(userid && !isDisabled("author")){
        $("#novel_header ul").append('<li class="author"><a href="https://mypage.syosetu.com/'+userid+'/"><i class="fa-solid fa-user"></i><span class="title">作者</span></a></li>')
    }

    /* KASASAGI */
    if(!isDisabled("kasasagi")){
        $("#novel_header ul").append('<li class="kasasagi"><a href="https://kasasagi.hinaproject.com/access/top/ncode/'+ncode+'/"><i class="fa-solid fa-chart-line"></i><span class="title">アクセス解析</span></a></li>')
    }

    /* API */
    if(!isDisabled("narou-api")){
        $("#novel_header ul").append('<li class="narou-api"><a href="https://api.syosetu.com/novelapi/api/?libtype=2&out=json&ncode='+ncode+'"><i class="fa-solid fa-file-code"></i><span class="title">なろうAPI</span></a></li>')
    }

    /* RSS */
    if(atom && !isDisabled("rss")){
        $("#novel_header ul").append('<li class="rss"><a href="'+atom+'"><i class="fa-solid fa-rss"></i><span class="title">RSS</span></a></li>')
    }

    /* TXT */
    if(!isDisabled("text")){
        $("#novel_header ul").append('<li class="text"><a href=https://ncode.syosetu.com/txtdownload/top/ncode/'+index+'/"><i class="fa-solid fa-file-lines"></i><span class="title">TXT</span></a></li>')
    }

    /* 編集 */
    if(is_logined_and_self && !isDisabled("edit")){
        $("#novel_header ul").append('<li class="edit"><a href="https://syosetu.com/usernovelmanage/top/ncode/'+index+'/"><i class="fa-solid fa-pen-to-square"></i><span class="title">編集</span></a></li>')
    }

    /* 検索 */
    if(!isDisabled("search")){
        $("#novel_header ul").append('<li class="search"><a><i class="fa-solid fa-magnifying-glass"></i><span class="title">検索</span></a></li>')
        $("li.search").append(`
        <div id="novel_header_search_box">
            <form>
                <input type="text" id="novel_header_search_field">
                <button id="novel_header_search_button">検索</button>
            </form>
        </div>
        `)
        $("#novel_header ul li.search>a").on("click", function(){
            if($(this).parent().hasClass("show")){
                $(this).parent().removeClass("show")
            }else{
                $(this).parent().addClass("show")
            }
        })
        $("#novel_header_search_box > form").submit(function(){
            var keyword = $("#novel_header_search_field").val().trim()
            if(keyword.length == 0){
                return false
            }else{
                var url = "https://yomou.syosetu.com/search.php?word=" + keyword
                window.open(url);
            }
        })
    }

    /* Set Position */
    $.each(disabled, (_, cls)=>{
        var elm = $("#novel_header ul li."+cls)
        if(elm.length){
            elm.remove()
        }
    })
    $.each(right, (_, cls)=>{
        var elm = $("#novel_header ul li."+cls)
        if(elm.length){
            elm.appendTo("#novel_header_right ul")
        }
    })
    $.each(left, (_, cls)=>{
        var elm = $("#novel_header ul li."+cls)
        if(elm.length){
            elm.appendTo("#novel_header ul")
        }
    })

}

function _optionModal(){
    if(!$("#novel_header").length){return}

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

    addTab(1, "表示")
    $("#novel-option .novel-option-tab-1").addClass("active")
    setOptionContentsDisplay()

    if(location.pathname.match(/^\/[n|N]\d{4}[a-zA-Z]{2}\/\d+\/*$/)){
        /*addTab(2, "文章校正")
        addTab(3, "統計")*/
    }

}

function _novelPage(){
    var ncode = getNcode()
    var episode = parseInt(location.pathname.match(/^\/[n|N]\d{4}[a-zA-Z]{2}\/(\d+)\/*$/)[1])
    var title = $("#container .contents1 a[href='/"+ncode+"/']")
    var chapter = $("#container .contents1 .chapter_title")
    if(chapter.length){
        chapter = chapter.text()
    }else{
        chapter = undefined
    }

    var d = `<div class="novel-titles" id="ep-`+episode+`"></div>`
    var d_1 = `<div class="novel-title"><a href="`+title.prop("href")+`">`+title.text()+`</a></div>`
    var d_2

    title.remove()
    if($("#container .contents1 a").length){
        var author = $("#container .contents1 a")
        d_2 = `<div class="novel-author"><a href="`+author.prop("href")+`">`+author.text()+`</a></div>`
    }else{
        var author = $("#container .contents1").text().trim().match(/作者：(.*)/)[1]
        d_2 = `<div class="novel-author">`+author+`</div>`
    }
    if(chapter){
        $("#novel_no").after("<div class='novel-chapter'>"+chapter+"</div>")
    }
    
    $("#container .contents1").empty()
    $("#container .contents1").append(d)
    $("#container .contents1 .novel-titles").append(d_1 + d_2)


    if(episode==1){
        
    }else if(episode>1){

    }
}