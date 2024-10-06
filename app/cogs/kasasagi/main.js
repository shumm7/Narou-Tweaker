import {addExclamationIconBalloon} from "../../utils/ui.js"
import {getNcode, makeGraph} from "./utils.js"
import { _general } from "./_general.js"
import { _chapterUnique } from "./_chapter.js"
import { _dayPV } from "./_dayPV.js"
import { _dayUnique } from "./_dayUnique.js"
import { _monthPV } from "./_monthPV.js"
import { _monthUnique } from "./_monthUnique.js"

chrome.storage.local.get(null, (option) => {
    var path = location.pathname;
    const ncode = getNcode();
    if(ncode==null){return}

    var r18 = false
    var novelLink = $(`.novelview_menu li a[href$='.syosetu.com/${ncode}/']`)
    if(novelLink.length){
        var link = new URL(novelLink.prop("href"))
        try{
            link = new URL(link)
            if(link.hostname=="novel18.syosetu.com"){
                r18 = true
            }
        }catch(e){

        }
    }

    /* Design */
    if(option.kasasagiCustomStyle){
        $("body").addClass("narou-tweaker--custom-style")

        /* Header */
        $("#container").before("<div class='l-header'></div>")
        var header = $(".l-header")
        
        /* header inner */
        header.append("<div class='p-header'><div class='p-header__content'></div></div>")
        var header_inner = $(".p-header__content")

        header_inner.append('<div class="p-header__main"><h1 class="p-header__logo"><a href="https://kasasagi.hinaproject.com/"><img style="max-height: 50px;" src="https://kasasagi.hinaproject.com/view/images/kasasagi_logo.gif" alt="KASASAGI"></a></h1><div class="p-header__description">KASASAGIは株式会社ヒナプロジェクトによって作られた<br>アクセス解析システムです。</div></div>')
        header_inner.append('<div class="p-header__mainnav"><ul class="p-header__mainnav-list"></ul></div>')
        if(!r18){
            $("ul.p-header__mainnav-list").append('<li class="p-header__mainnav-item"><a href="https://syosetu.com/user/top/">ユーザーホーム</a></li>')
            $("ul.p-header__mainnav-list").append(`<li class="p-header__mainnav-item"><a href="https://ncode.syosetu.com/novelview/infotop/ncode/${ncode}/">作品情報</a></li>`)
            $("ul.p-header__mainnav-list").append(`<li class="p-header__mainnav-item"><a href="https://ncode.syosetu.com/${ncode}/">作品TOP</a></li>`)
        }else{
            $("ul.p-header__mainnav-list").append('<li class="p-header__mainnav-item"><a href="https://syosetu.com/xuser/top/">Xユーザーホーム</a></li>')
            $("ul.p-header__mainnav-list").append(`<li class="p-header__mainnav-item"><a href="https://novel18.syosetu.com/novelview/infotop/ncode/${ncode}/">作品情報</a></li>`)
            $("ul.p-header__mainnav-list").append(`<li class="p-header__mainnav-item"><a href="https://novel18.syosetu.com/${ncode}/">作品TOP</a></li>`)
        }

        /* navigation */
        header.append("<div class='p-mainheader'><div class='p-mainheader__tab'></div></div>")
        var header_nav = $(".p-mainheader__tab")
        header_nav.append('<ul class="p-mainheader__tab-list"></ul>')

        var header_nav_ul = $("ul.p-mainheader__tab-list")
        header_nav_ul.append('<li class="p-mainheader__tab-list-item"><a href="/access/top/ncode/'+ncode+'/">総合</a></li>')
        header_nav_ul.append('<li class="p-mainheader__tab-list-item"><a href="/access/chapter/ncode/'+ncode+'/">エピソード別ユニーク</a></li>')
        header_nav_ul.append('<li class="p-mainheader__tab-list-item"><a href="/access/daypv/ncode/'+ncode+'/">日別PV</a></li>')
        header_nav_ul.append('<li class="p-mainheader__tab-list-item"><a href="/access/dayunique/ncode/'+ncode+'/">日別ユニーク</a></li>')
        header_nav_ul.append('<li class="p-mainheader__tab-list-item"><a href="/access/monthpv/ncode/'+ncode+'/">月別PV</a></li>')
        header_nav_ul.append('<li class="p-mainheader__tab-list-item"><a href="/access/monthunique/ncode/'+ncode+'/">月別ユニーク</a></li>')

        $(".p-mainheader__tab-list-item").each(function(){
            if(path==$(this).children("a").attr("href")){
                $(this).addClass("is-active");
            }
        });
        $("#novel_header").remove();

        /* Date Picker */
        $("input#datepicker").wrap('<div class="datepicker-outer"><label for="datepicker">日付を指定</label></div>')

        /* Select */
        var s = $("form:has(select)")
        s.before("<br>")
        s.addClass("dropdown")

        /* Footer */
        $("#container").after('<div class="l-footer"><div class="p-footer"></div></div>')
        $("#copyright").addClass("p-footer__foot")
        $("#copyright").appendTo(".p-footer")
        $("#copyright").attr("id", "")
    }

    /* Switch */
    if(path.match('/access/top/ncode/.*/')!=null){
        _general(r18)
    }else if(path.match('/access/chapter/ncode/.*/')!=null){
        _chapterUnique()
    }else if(path.match('/access/daypv/ncode/.*/')!=null){
        _dayPV()
    }else if(path.match('/access/monthpv/ncode/.*/')!=null){
        _monthPV()
    }else if(path.match('/access/dayunique/ncode/.*/')!=null){
        _dayUnique()
    }else if(path.match('/access/monthunique/ncode/.*/')!=null){
        _monthUnique()
    }
});