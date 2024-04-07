import { changeHeaderScrollMode, setOptionContentsDisplay, setOptionContentsCorrection, setOptionContentsAuthorSkin } from "./cogs.js";
import { defaultValue } from "../../utils/misc.js";
import { checkNovelPageDetail, getEpisode, getNcode } from "./utils.js";
import { ncodeToIndex } from "../../utils/text.js";
import { addFontAwesomeOriginaIcons, getExceptedIcon } from "../../utils/header.js";
import { defaultOption } from "../../utils/option.js";
import { formatSkinData, makeSkinCSS } from "../../utils/skin.js";

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

        if(checkNovelPageDetail()=="novel"){
            _novelPage()
        }
    }
    
    /* Author Skin */
    _authorSkin()
});

function _header(){
    addFontAwesomeOriginaIcons()

    chrome.storage.local.get(null, (data) => {
        if(!$("#novel_header").length){return}
        const isCustomHeader = data.novelCustomHeader

        var ncode = getNcode()
        var index = ncodeToIndex(ncode)
        var episode = getEpisode()
        var pageType = checkNovelPageDetail()
        var atom = $("link[href^='https://api.syosetu.com/writernovel/'][title='Atom']").prop("href")
        var userid
        var r18 = false
        if(location.hostname == "ncode.syosetu.com"){
            userid = atom.match(/https:\/\/api\.syosetu\.com\/writernovel\/(\d+)\.Atom/)[1]
        }else if(location.hostname == "novel18.syosetu.com"){
            userid = atom.match(/https:\/\/api\.syosetu\.com\/writernovel\/(x\d+[a-z]+)\.Atom/)[1]
            r18 = true
        }

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

        
        /* Twitter シェアボタンを削除 */
        $("#novel_header li:nth-last-child(1)").remove()

        /* ホーム / ログイン */
        elm = $("#novel_header li#login a")
        if(elm.length){
            text = elm.text()
            elm.text("")
            elm.append('<i class="fa-solid fa-house"></i><span class="title">'+text+'</span>')
            elm.parent().addClass("home")
        }

        /* 作品情報 */
        elm = $("#novel_header li a[href^='https://ncode.syosetu.com/novelview/'], #novel_header li a[href^='https://novel18.syosetu.com/novelview/']")
        if(elm.length){
            elm.text("")
            elm.append('<i class="fa-solid fa-circle-info"></i><span class="title">作品情報</span>')
            elm.parent().addClass("info")
        }

        /* 感想 */
        elm = $("#novel_header li a[href^='https://novelcom.syosetu.com/impression/'], #novel_header li a[href^='https://novelcom18.syosetu.com/impression/']")
        if(elm.length){
            elm.text("")
            elm.append('<i class="fa-solid fa-comments"></i><span class="title">感想</span>')
            elm.parent().addClass("impression")
        }

        /* レビュー */
        elm = $("#novel_header li a[href^='https://novelcom.syosetu.com/novelreview/'], #novel_header li a[href^='https://novelcom18.syosetu.com/novelreview/']")
        if(elm.length){
            elm.text("")
            elm.append('<i class="fa-solid fa-flag"></i><span class="title">レビュー</span>')
            elm.parent().addClass("review")
        }

        /* PDF */
        elm = $("#novel_header li form[action^='https://ncode.syosetu.com/novelpdf/'], #novel_header li form[action^='https://novel18.syosetu.com/novelpdf/']")
        if(elm.length){
            elm.prepend('<i class="fa-solid fa-file-pdf"></i>')
            elm.parent().addClass("pdf")
            $("#novel_header li.pdf form i").on("click", function(){
                $(this).parent().find("input[type='submit']").trigger("click")
            })
        }

        /* ブックマーク */
        var is_login = true
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
            is_login = false
            if(isCustomHeader){
                elm = $("#novel_header li.booklist")
                elm.find(".button_bookmark.logout").remove()
                elm.prepend('<a><i class="fa-solid fa-book"></i><span class="title">ブックマーク<br><span style="font-size: 90%;">（要ログイン）</span></span></a>')
            }else{
            }
        } else { //ログイン済み（自分の作品）
            if(isCustomHeader){
                $("#novel_header li.booklist").remove()
            }else{
                $("#novel_header ul").append(`
                    <li class="booklist">
                        <span class="button_bookmark logout">ブックマークに追加</span>
                    </li>
                `)
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

        /* 小説家になろう */
        $("#novel_header ul").append('<li class="narou"><a href="https://syosetu.com/"><i class="fa-solid fa-pen-nib"></i><span class="title">小説家になろう</span></a></li>')

        /* ログイン/ログアウト */
        if(is_login){
            $("#novel_header ul").append('<li class="login"><a href="https://syosetu.com/login/logout/"><i class="fa-solid fa-right-from-bracket"></i><span class="title">ログアウト</span></a></li>')
        }else{
            $("#novel_header ul").append('<li class="login"><a href="https://syosetu.com/login/input/"><i class="fa-solid fa-right-to-bracket"></i><span class="title">ログイン</span></a></li>')
        }

        /* 作者マイページ */
        if(!r18){
            $("#novel_header ul").append('<li class="author"><a href="https://mypage.syosetu.com/'+userid+'/"><i class="fa-solid fa-user"></i><span class="title">作者</span></a></li>')
        }else{
            $("#novel_header ul").append('<li class="author"><a href="https://xmypage.syosetu.com/'+userid+'/"><i class="fa-solid fa-user"></i><span class="title">作者</span></a></li>')
        }

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

        /* スクロール */
        $("#novel_header ul").append(`
            <li class="scroll" id="scroll-icon">
                <a id="scroll-down" class="scroll-icon-inner">
                    <i class="fa-solid fa-angles-down"></i>
                    <span class="title">下へ移動</span>
                </a>
                <a id="scroll-up" class="scroll-icon-inner disabled">
                    <i class="fa-solid fa-angles-up"></i>
                    <span class="title">上へ移動</span>
                </a>
            </li>
        `)
        $(window).on("scroll", function () {
            $("#scroll-icon .scroll-icon-inner").removeClass("disabled");
            if ($(window).scrollTop() > 500) {
                $("#scroll-icon #scroll-down").addClass("disabled");
            } else {
                $("#scroll-icon #scroll-up").addClass("disabled");
            }
        });
        $("#scroll-down").on("click", function(){
            if($(".wrap_menu_novelview_after").length){
                var height = $(".wrap_menu_novelview_after").offset().top
                $(window).scrollTop(height)
            }else{
                var a = document.documentElement;
                var y = a.scrollHeight - a.clientHeight;
                window.scroll(0, y);
            }
        })
        $("#scroll-up").on("click", function(){
            $(window).scrollTop(0)
        })

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
        if(meta_url && r18){
            meta_url = meta_url.replace(/ncode\.syosetu\.com/, "novel18.syosetu.com")
        }

        /* Twitter */
        if(meta_title!=undefined && meta_url!=undefined){
            var prefix = ""
            var host = "ncode"
            if(r18){
                prefix = "【R18】"
                host = "novel18"
            }

            var uri
            if(!r18){
                if(pageType=="novel"){
                    uri = `https://twitter.com/intent/post?hashtags=narou,narou${ncode.toUpperCase()}&original_referer=https://ncode.syosetu.com/&text=${meta_title}&url=${meta_url}`
                }else if(pageType=="top"){
                    uri = `https://twitter.com/intent/post?hashtags=narou,narou${ncode.toUpperCase()}&original_referer=https://ncode.syosetu.com/&text=${meta_title}&url=${meta_url}`
                }else if(pageType=="info"){
                    uri = `https://twitter.com/intent/post?hashtags=narou,narou${ncode.toUpperCase()}&original_referer=https://ncode.syosetu.com/&text=「${meta_title}」読んだ！&url=${meta_url}`
                }
            }else{
                if(pageType=="novel"){
                    uri = `https://twitter.com/intent/post?hashtags=narou,narou${ncode.toUpperCase()}&original_referer=https://novel18.syosetu.com/&text=【R18】${meta_title}&url=${meta_url}`
                }else if(pageType=="top"){
                    uri = `https://twitter.com/intent/post?hashtags=narou,narou${ncode.toUpperCase()}&original_referer=https://novel18.syosetu.com/&text=【R18】${meta_title}&url=${meta_url}`
                }else if(pageType=="info"){
                    uri = `https://twitter.com/intent/post?hashtags=narou,narou${ncode.toUpperCase()}&original_referer=https://novel18.syosetu.com/&text=【R18】「${meta_title}」読んだ！&url=${meta_url}`
                }
            }

            var txt
            if(data.novelCustomHeaderSocialShowsBrandName){
                txt = "X"
            }else{
                txt = "ポスト"
            }
            if(uri!=undefined){
                $("#novel_header ul").append('<li class="twitter"><a href="'+encodeURI(uri)+'"><i class="fa-brands fa-x-twitter"></i><span class="title">'+txt+'</span></a></li>')
            }
        }

        /* Facebook */
        var txt
        if(data.novelCustomHeaderSocialShowsBrandName){
            txt = "Facebook"
        }else{
            txt = "シェア"
        }
        if(meta_url!=undefined){
            var uri = "https://www.facebook.com/share.php?u=" + meta_url
            $("#novel_header ul").append('<li class="facebook"><a href="'+encodeURI(uri)+'"><i class="fa-brands fa-facebook"></i><span class="title">'+txt+'</span></a></li>')
        }

        /* LINE */
        var txt
        if(data.novelCustomHeaderSocialShowsBrandName){
            txt = "LINE"
        }else{
            txt = "シェア"
        }
        if(meta_url!=undefined){
            var uri = "https://social-plugins.line.me/lineit/share?url=" + meta_url
            $("#novel_header ul").append('<li class="line"><a href="'+encodeURI(uri)+'"><i class="fa-brands fa-line"></i><span class="title">'+txt+'</span></a></li>')
        }

        /* はてなブックマーク */
        var txt
        if(data.novelCustomHeaderSocialShowsBrandName){
            txt = "はてな<br>ブックマーク"
        }else{
            txt = "ブックマーク"
        }
        if(meta_title!=undefined && meta_url!=undefined){
            var uri
            if(!r18){
                uri = `https://b.hatena.ne.jp/entry/panel/?url=${meta_url}&btitle=${meta_title}`
            }else{
                uri = `https://b.hatena.ne.jp/entry/panel/?url=${meta_url}&btitle=【R18】${meta_title}`
            }
            $("#novel_header ul").append('<li class="hatena-bookmark"><a href="'+encodeURI(uri)+'"><i class="fa-brands fa-hatena-bookmark"></i><span class="title">'+txt+'</span></a></li>')
        }

        /* Feedly */
        var txt
        if(data.novelCustomHeaderSocialShowsBrandName){
            txt = "Feedly"
        }else{
            txt = "フォロー"
        }
        if(atom!=undefined){
            var uri = `https://feedly.com/i/subscription/feed/${atom}`
            $("#novel_header ul").append('<li class="feedly"><a href="'+encodeURI(uri)+'"><i class="fa-brands fa-feedly"></i><span class="title">'+txt+'</span></a></li>')
        }

        /* コピー */
        let copy_animation_timer = null;
        $("#novel_header ul").append('<li class="copy-url"><a><i class="fa-solid fa-link"></i><span class="title">URLをコピー</span></a></li>')
        $("#novel_header ul li.copy-url>a").on("click", function(){
            if(meta_url!=undefined){
                navigator.clipboard.writeText(meta_url)
            }else{
                navigator.clipboard.writeText(location.href)
            }
            var icon = $("li.copy-url>a i")
            var text = $("li.copy-url>a span.title")
            if(copy_animation_timer!=null){
                clearTimeout(copy_animation_timer)
                icon.removeClass("fa-check")
                icon.addClass("fa-link")
                text.text("URLをコピー")
            }

            icon.removeClass("fa-link")
            icon.addClass("fa-check")
            text.text("コピーしました")

            copy_animation_timer = setTimeout(function() {
                icon.removeClass("fa-check")
                icon.addClass("fa-link")
                text.text("URLをコピー")
            }, 3000);
        })

        /* QRコード */
        if(data.novelCustomHeaderQRCodeShowURL){
            $("#novel_header").before(`<div id='qrcode-outer'><div id="qrcode-background"></div><div id="qrcode-display"><div id="qrcode-text"></div></div></div>`)
        }else{
            $("#novel_header").before(`<div id='qrcode-outer'><div id="qrcode-background"></div><div id="qrcode-display"></div></div>`)
        }
        $("#qrcode-background").on("click", function(){
            $("#qrcode-outer").removeClass("show")
        })

        var qrcode
        if(data.novelCustomHeaderQRCodeCurrentLocation){
            $("#novel_header ul").append('<li class="qrcode"><a><i class="fa-solid fa-qrcode"></i><span class="title">QRコード</span></a></li>')
            qrcode = new QRCode(document.getElementById("qrcode-display"), {text: location.href});
            $("#qrcode-text").text(location.href)
        }else{
            if(meta_url!=undefined){
                $("#novel_header ul").append('<li class="qrcode"><a><i class="fa-solid fa-qrcode"></i><span class="title">QRコード</span></a></li>')
                qrcode = new QRCode(document.getElementById("qrcode-display"), {text: meta_url});
                $("#qrcode-text").text(meta_url)
            }else if(ncode!=undefined){
                $("#novel_header ul").append('<li class="qrcode"><a><i class="fa-solid fa-qrcode"></i><span class="title">QRコード</span></a></li>')
                var url
                if(episode){
                    url = `https://ncode.syosetu.com/${ncode}/${episode}/`
                }else{
                    url = `https://ncode.syosetu.com/${ncode}/`
                }
                qrcode = new QRCode(document.getElementById("qrcode-display"), {text: url});
                $("#qrcode-text").text(url)
            }
        }

        $("#novel_header ul li.qrcode").on("click", function(){
            var elm = $("#qrcode-outer")
            if(elm.hasClass("show")){
                elm.removeClass("show")
            }else{
                elm.addClass("show")
            }
        })
        
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
    
    if($(".novelrankingtag a:has(img[alt='Narou Tweaker 作者スキン'])").length){
        addTab(99, "作者スキン")
        setOptionContentsAuthorSkin(99)
    }
    
    const scrollElement = document.querySelector("#novel-option--contents");
    if(scrollElement!=null){
        scrollElement.addEventListener("wheel", (e) => {
            e.preventDefault();
            scrollElement.scrollTop += e.deltaY;
        });
    }

    chrome.storage.local.get(["novelOptionModalSelected"], function(data){
        var tab = $("#novel-option .novel-option-tab-"+defaultValue(data.novelOptionModalSelected, defaultOption.novelOptionModalSelected))
        if(tab.length){
            tab.addClass("active")
        }else{
            chrome.storage.local.set({novelOptionModalSelected: 0}, function(){
                $("#novel-option .novel-option-tab-0").addClass("active")
            })
        }
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

function _authorSkin(){
    changeAuthorSkin()
    chrome.storage.local.onChanged.addListener(function(changes){
        if(changes.novelAuthorCustomSkin!=undefined || changes.novelAuthorCustomSkinWarning!=undefined){
            changeAuthorSkin()
        }
    })

    function changeAuthorSkin(){
        chrome.storage.local.get(["novelAuthorCustomSkin"], (data)=>{
            if(data.novelAuthorCustomSkin){
                var banner = $(".novelrankingtag a:has(img[alt='Narou Tweaker 作者スキン'])")
                if(banner.length){
                    var span = banner.find("span")
                    if(span.length){
                        try{
                            // Escape HTML Tags
                            var p = $("<p>")
                            p.text(span.get(0).firstChild.nodeValue)
                            var text = p.text()
                            
                            // Parse to Tags
                            var skinData = formatSkinData(JSON.parse(text))
                            chrome.storage.local.get(["novelCustomStyle", "novelAuthorCustomSkinWarning"], (data)=>{
                                const style = makeSkinCSS(skinData, data.novelCustomStyle)
                                $("#narou-tweaker-style--author-css").text(style)
                                if(data.novelAuthorCustomSkinWarning){
                                    userSkinActive(true)
                                }else{
                                    userSkinActive(false)
                                }
                            })

                        }catch(e){
                            console.warn(e)
                            $("#narou-tweaker-style--author-css").text("")
                            userSkinActive(false)
                        }
                    }
                }
            }else{
                $("#narou-tweaker-style--author-css").text("")
                userSkinActive(false)
            }
            
        })
    }

    function userSkinActive(active){
        $("#author-skin-warning").remove()
        if(active){
            $("body").prepend(`
                <div id="author-skin-warning">
                    <i class="fa-solid fa-triangle-exclamation"></i>
                    作者スキン有効（小説の作者によってスキンが強制されています）<br>
                    <span style="font-size: 80%;">
                        Narou Tweakerの設定 → [小説ページ] → [スキン] → [作者スキン] から無効化できます。
                    </span>
                </div>
            `)
        }
    }
}