import { changeHeaderScrollMode, setOptionContentsDisplay, setOptionContentsCorrection } from "./cogs.js";
import { defaultValue, check } from "../../utils/misc.js";
import { checkPageDetail, getEpisode, getNcode } from "./utils.js";
import { ncodeToIndex } from "../../utils/text.js";
import { getExceptedIcon } from "../../utils/header.js";
import { defaultOption } from "../../utils/option.js";

chrome.storage.local.get(null, (data) => {
    /* Header */
    _header()

    /* Option Menu */
    _optionModal();

    /* Header */
    changeHeaderScrollMode("#novel_header_right");
    changeHeaderScrollMode("#novel_header");

    if(data.novelCustomStyle){
        $("body").addClass("narou-tweaker")
        $("#footer").remove()

        if(checkPageDetail()=="novel"){
            _novelPage()
        }
    }
});

function _header(){
    chrome.storage.local.get(null, (data) => {
        if(!$("#novel_header").length){return}
        const isCustomHeader = data.novelCustomHeader

        var ncode = getNcode()
        var index = ncodeToIndex(ncode)
        var episode = getEpisode()
        var pageType = checkPageDetail()
        var atom = $("link[href^='https://api.syosetu.com/writernovel/'][title='Atom']").prop("href")
        var userid = atom.match(/https:\/\/api\.syosetu\.com\/writernovel\/(\d+)\.Atom/)[1]

        var text
        var elm

        $("#pageBottom").remove()
        $("#pageTop").remove()

        /* Right Menu Bar */
        if(isCustomHeader){
            $("body").addClass("narou-tweaker-header")
            $("#novelnavi_right").remove()

            $("#novel_header").before(`<div id="novel_header_right">
                <ul id="head_nav">
                </ul>
            </div>`)
            $(".wrap_menu_novelview_after").empty()
        }else{
            if(!data.novelLegacyHeaderIcon){
                $("body").addClass("narou-tweaker-header--hide-icon") //アイコンを隠す
            }

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

            $(".wrap_menu_novelview_after ul").empty()
        }
        $("#novel_footer").remove()

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
            elm.append('<i class="fa-solid fa-circle-info"></i><span class="title">作品情報</span>')
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
            $("#novel_header li.pdf form i").on("click", function(){
                $(this).parent().find("input[type='submit']").trigger("click")
            })
        }

        /* ブックマーク */
        var is_logined_and_self = false
        elm = $("#novel_header li.booklist a")
        if(elm.length){
            elm.text("")
            if(elm.hasClass("js-bookmark_setting_button")){ //ブックマーク登録済み
                if(isCustomHeader){
                    elm.append('<i class="fa-solid fa-book-bookmark"></i><span class="title">ブックマーク<br><span style="font-size: 90%;">（設定変更）</span></span>')
                }else{
                    elm.append('<i class="fa-solid fa-book-bookmark"></i><span class="title">ブックマーク<span style="font-size: 90%;">（設定変更）</span></span>')
                }
            }else if(elm.hasClass("js-add_bookmark")){ //ブックマーク未登録
                if(isCustomHeader){
                    elm.append('<i class="fa-solid fa-book"></i><span class="title">ブックマーク<br><span style="font-size: 90%;">（登録）</span></span>')
                }else{
                    elm.append('<i class="fa-solid fa-book"></i><span class="title">ブックマーク<span style="font-size: 90%;">（登録）</span></span>')
                }
            }
            elm.parent().addClass("booklist")
        }
        else if($("#novel_header li.booklist .button_bookmark.logout").length){ //非ログイン状態
            if(isCustomHeader){

            }else{
                elm = $("#novel_header li.booklist")
                elm.find(".button_bookmark.logout").remove()
                elm.prepend('<a><i class="fa-solid fa-book"></i><span class="title">ブックマーク<span style="font-size: 90%;">（要ログイン）</span></span></a>')
            }
        } else { //ログイン済み（自分の作品）
            if(isCustomHeader){
                $("#novel_header li.booklist").remove()
            }else{
                
            }
            is_logined_and_self = true
        }

        /* しおり */
        elm = $("#novel_header li.bookmark_now a")
        if(elm.length){
            elm.text("")
            elm.append('<i class="fa-regular fa-bookmark"></i><span class="title">しおり</span>')
            elm.addClass("siori")
            $("#novel_header li.set_siori").on("click", function(){
                $(this).find("a.siori i.fa-bookmark").removeClass("fa-regular")
                $(this).find("a.siori i.fa-bookmark").addClass("fa-solid")
                $(this).find("a.siori .title").text("しおり中")
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
        if(pageType=="top" && !elm.length){
            elm = $(".novellingindex_bookmarker_no")
            if(elm.length){
                var link = elm.find("a").prop("href")
                var text = elm.find("a").text()
                elm.remove()
                if(isCustomHeader){
                    $("#novel_header ul").prepend('<li class="siori"><a href="'+link+'"><i class="fa-solid fa-bookmark"></i><span class="title">しおり中<br><span style="font-size: 90%;">（'+text+'）</span></span></a></li>')
                }else{
                    $("#novel_header ul").prepend('<li class="siori"><a href="'+link+'"><i class="fa-solid fa-bookmark"></i><span class="title">しおり中<span style="font-size: 90%;">（'+text+'）</span></span></a></li>')
                }
            }else{
                if(isCustomHeader){
                    $("#novel_header ul").prepend('<li class="siori"><a><i class="fa-regular fa-bookmark"></i><span class="title">しおり<br><span style="font-size: 90%;">（なし）</span></span></a></li>')
                }else{
                    $("#novel_header ul").prepend('<li class="siori"><a><i class="fa-regular fa-bookmark"></i><span class="title">しおり<span style="font-size: 90%;">（なし）</span></span></a></li>')
                }
            }
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
        $("#novel_header ul").append('<li class="author"><a href="https://mypage.syosetu.com/'+userid+'/"><i class="fa-solid fa-user"></i><span class="title">作者</span></a></li>')

        /* KASASAGI */
        $("#novel_header ul").append('<li class="kasasagi"><a href="https://kasasagi.hinaproject.com/access/top/ncode/'+ncode+'/"><i class="fa-solid fa-chart-line"></i><span class="title">アクセス解析</span></a></li>')

        /* API */
        $("#novel_header ul").append('<li class="narou-api"><a href="https://api.syosetu.com/novelapi/api/?libtype=2&out=json&ncode='+ncode+'"><i class="fa-solid fa-file-code"></i><span class="title">なろうAPI</span></a></li>')

        /* RSS */
        $("#novel_header ul").append('<li class="rss"><a href="'+atom+'"><i class="fa-solid fa-rss"></i><span class="title">RSS</span></a></li>')

        /* TXT */
        $("#novel_header ul").append('<li class="text"><a href="https://ncode.syosetu.com/txtdownload/top/ncode/'+index+'/"><i class="fa-solid fa-file-lines"></i><span class="title">TXT</span></a></li>')

        /* 誤字報告 */
        if(episode==0 && pageType=="novel"){
            $("#novel_header ul").append('<li class="typo"><a href="https://novelcom.syosetu.com/novelreport/input/ncode/'+index+'/"><i class="fa-solid fa-keyboard"></i><span class="title">誤字報告</span></a></li>')
        }else if(pageType=="novel"){
            $("#novel_header ul").append('<li class="typo"><a href="https://novelcom.syosetu.com/novelreport/input/ncode/'+index+'/no/'+episode+'/"><i class="fa-solid fa-keyboard"></i><span class="title">誤字報告</span></a></li>')
        }

        /* 情報提供 */
        $("#novel_header ul").append('<li class="report"><a href="https://syosetu.com/ihantsuhou/input/ncode/'+index+'/"><i class="fa-solid fa-bullhorn"></i><span class="title">情報提供</span></a></li>')

        /* 編集 */
        if(is_logined_and_self){
            $("#novel_header ul").append('<li class="edit"><a href="https://syosetu.com/usernovelmanage/top/ncode/'+index+'/"><i class="fa-solid fa-pen-to-square"></i><span class="title">編集</span></a></li>')
        }

        /* 検索 */
        $("#novel_header ul").append('<li class="search"><a><i class="fa-solid fa-magnifying-glass"></i><span class="title">検索</span></a></li>')
        $("body").prepend(`
        <div id="novel_header_search_box">
            <form>
                <input type="text" id="novel_header_search_field">
                <button id="novel_header_search_button">検索</button>
            </form>
        </div>
        `)
        $("#novel_header ul li.search>a").on("click", function(){
            var position = $("li.search").offset()
            position.left -= $(window).scrollLeft()
            position.top -= $(window).scrollTop()
            var box = $("#novel_header_search_box")
            if(box.hasClass("show")){
                console.log
                box.removeClass("show")
            }else{
                if(isCustomHeader){
                    if($(window).width()/2<position.left){
                        var top = position.top
                        var left = position.left - box.width()
                        box.css({top: `calc(${top}px - .5em)`, left: `calc(${left}px)`})
                    }else{
                        var top = position.top
                        var left = position.left
                        box.css({top: `calc(${top}px - .5em)`, left: `calc(${left}px + 4em)`})
                    }
                }else{
                    if($(window).height()/2<position.top){
                        var top = position.top - box.height()
                        var left = position.left - box.width()/2
                        box.css({top: `calc(${top}px)`, left: `calc(${left}px + 2em)`})
                    }else{
                        var top = position.top
                        var left = position.left - box.width()/2
                        box.css({top: `calc(${top}px + 4em)`, left: `calc(${left}px + 2em)`})
                    }
                }
                box.addClass("show")

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

        /* Socials */
        var meta_title = $("head meta[property='og:title']").prop("content")
        var meta_url = $("head meta[property='og:url']").prop("content")

        /* Twitter */
        if(meta_title!=undefined && meta_url!=undefined){
            var uri
            if(pageType=="novel"){
                uri = `https://twitter.com/intent/post?hashtags=narou,narou`+ncode.toUpperCase()+`&original_referer=https://ncode.syosetu.com/&text=`+meta_title+`&url=`+meta_url
            }else if(pageType=="top" || pageType=="novel" && episode==0){
                uri = `https://twitter.com/intent/post?hashtags=narou,narou`+ncode.toUpperCase()+`&original_referer=https://ncode.syosetu.com/&text=`+meta_title+`&url=`+meta_url
            }else if(pageType=="info"){
                uri = `https://twitter.com/intent/post?hashtags=narou,narou`+ncode.toUpperCase()+`&original_referer=https://ncode.syosetu.com/&text=「`+meta_title+`」読んだ！&url=`+meta_url
            }

            if(uri!=undefined){
                $("#novel_header ul").append('<li class="twitter"><a href="'+encodeURI(uri)+'"><i class="fa-brands fa-x-twitter"></i><span class="title">ポスト</span></a></li>')
            }
        }

        /* コピー */
        /*
        if(meta_url!=undefined){
            $("#novel_header ul").append('<li class="copy-url"><a><i class="fa-solid fa-link"></i><span class="title">URLをコピー</span></a></li>')
            $("#novel_header ul li.copy-url>a").on("click", function(){
                navigator.clipboard.writeText(meta_url)
                showToast("コピーしました")
            })
        }
        */
        
        /* Set Position */
        function resetHeader(left, right){
            $("#novel_header ul li.disabled").removeClass("disabled")
            $("#novel_header_right ul li.disabled").removeClass("disabled")
            $(".box_menu_novelview_after ul.menu_novelview_after li.disabled").removeClass("disabled")
            $.each(getExceptedIcon([right, left]), (_, cls)=>{
                var elm = $(`#novel_header ul li.${cls}, #novel_header_right ul li.${cls}, .box_menu_novelview_after ul.menu_novelview_after li.${cls}`)
                if(elm.length){
                    elm.addClass("disabled")
                }
            })
            $.each(right, (_, cls)=>{
                var elm = $(`#novel_header ul li.${cls}, #novel_header_right ul li.${cls}, .box_menu_novelview_after ul.menu_novelview_after li.${cls}`)
                if(elm.length){
                    var ext
                    if(isCustomHeader){
                        ext = "#novel_header_right ul"
                    }else{
                        ext = ".box_menu_novelview_after .menu_novelview_after"
                    }
                    if($(ext).length){
                        elm.appendTo(ext)
                    }else{
                        elm.addClass("disabled")
                    }
                }
            })
            $.each(left, (_, cls)=>{
                var elm = $(`#novel_header ul li.${cls}, #novel_header_right ul li.${cls}, .box_menu_novelview_after ul.menu_novelview_after li.${cls}`)
                if(elm.length){
                    var ext = "#novel_header ul"
                    if($(ext).length){
                        elm.appendTo(ext)
                    }else{
                        elm.addClass("disabled")
                    }
                }
            })
        }
        
        resetHeader(data.novelCustomHeaderLeft, data.novelCustomHeaderRight)

        /* Header Scroll */
        if(isCustomHeader){
            const scrollElement = document.querySelector("#novel_header, #novel_header_right");
            if(scrollElement!=null){
                scrollElement.addEventListener("wheel", (e) => {
                    if(scrollElement.classList.contains("header-mode--fixed") || scrollElement.classList.contains("header-mode--scroll")){
                        e.preventDefault();
                        scrollElement.scrollTop += e.deltaY;
                    }
                });
            }
        }else{
            const scrollElement = document.querySelector("#novel_header ul");
            if(scrollElement!=null){
                scrollElement.addEventListener("wheel", (e) => {
                    if (Math.abs(e.deltaY) < Math.abs(e.deltaX)) return;
                    e.preventDefault();
                    scrollElement.scrollLeft += e.deltaY;
                });
            }
            const scrollElementFooter = document.querySelector(".box_menu_novelview_after ul");
            if(scrollElementFooter!=null){
                scrollElementFooter.addEventListener("wheel", (e) => {
                    if (Math.abs(e.deltaY) < Math.abs(e.deltaX)) return;
                    e.preventDefault();
                    scrollElementFooter.scrollLeft += e.deltaY;
                });
            }
        }

        /* Storage Listener */
        chrome.storage.local.onChanged.addListener(function(changes){
            if(changes.novelCustomHeaderLeft!=undefined || changes.novelCustomHeaderRight!=undefined){
                chrome.storage.local.get(["novelCustomHeaderLeft", "novelCustomHeaderRight"], (data) => {
                    resetHeader(data.novelCustomHeaderLeft, data.novelCustomHeaderRight)
                })
            }else if(changes.novelLegacyHeaderIcon != undefined){
                chrome.storage.local.get(["novelLegacyHeaderIcon"], (data) => {
                    if(!data.novelLegacyHeaderIcon){
                        $("body").addClass("narou-tweaker-header--hide-icon")
                    }else{
                        $("body").removeClass("narou-tweaker-header--hide-icon")
                    }
                })
            }
        })
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
            chrome.storage.local.set({"novelOptionModalSelected": index}, function(){
                $("#novel-option .novel-option--header-tab").removeClass("active")
                $("#novel-option .novel-option--content").removeClass("active")
                $("#novel-option .novel-option-tab-" + index).addClass("active")
            })
        })
    }

    addTab(0, "表示")
    setOptionContentsDisplay(0)

    addTab(1, "文章校正")
    setOptionContentsCorrection(1)

    //addTab(2, "統計")

    chrome.storage.local.get(["novelOptionModalSelected"], function(data){
        $("#novel-option .novel-option-tab-"+defaultValue(data.novelOptionModalSelected, defaultOption.novelOptionModalSelected)).addClass("active")
    })

}

function _novelPage(){
    var ncode = getNcode()
    var episode = location.pathname.match(/^\/[n|N]\d{4}[a-zA-Z]{2}\/(\d+)\/*$/)
    if(episode==null){
        episode=0
    }else{
        episode = parseInt(episode[1])
    }
    var title
    var chapter = undefined
    
    if(episode==0){
        title = $(".novel_title")
    }else{
        title = $("#container .contents1 a[href='/"+ncode+"/']")
        if($("#container .contents1 .chapter_title").length){
            chapter = $("#container .contents1 .chapter_title").text()
        }

    }

    if(episode==0){
        var d_1 = `<div class="novel-title">`+title.text()+`</div>`
        var d_2

        if($("#novel_contents .novel_writername a").length){
            var author = $("#novel_contents .novel_writername a")
            d_2 = `<div class="novel-author"><a href="`+author.prop("href")+`">`+author.text()+`</a></div>`
        }else{
            var author = $("#novel_contents .novel_writername").text().trim().match(/作者：(.*)/)[1]
            d_2 = `<div class="novel-author">`+author+`</div>`
        }

        $("#novel_contents").before(`
        <div class="contents1">
            <div class="novel-titles" id="ep-`+episode+`">
                `+d_1+`
                `+d_2+`
            </div>
        </div>
        `)
        $(".novel_title").remove()
        $(".novel_writername").remove()

    }else{
        title.remove()
        var d = `<div class="novel-titles" id="ep-`+episode+`"></div>`
        var d_1 = `<div class="novel-title"><a href="`+title.prop("href")+`">`+title.text()+`</a></div>`
        var d_2

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
    }
    


    if(episode==1){
        
    }else if(episode>1){

    }
}