import {addExclamationIconBalloon} from "../../utils/ui.js"
import {getNcode, makeGraph} from "./utils.js"
import { _general } from "./_general.js"
import { _chapterUnique } from "./_chapter.js"

var option

chrome.storage.local.get(null, (data) => {
    var path = location.pathname;
    const ncode = getNcode();
    if(ncode==null){return}
    option = data

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
        $("body").addClass("narou-tweaker")

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
        _general()

    }else if(path.match('/access/chapter/ncode/.*/')!=null){
        _chapterUnique()

    }else if(path.match('/access/daypv/ncode/.*/')!=null){
        if($(".novelview_h3").length){
            if(option.kasasagiCustomStyle){
                var m = $(".novelview_h3")
                var title = m.text().trim().match(/『(.*)』 日別\[全エピソード\] アクセス解析\(PV\)/)[2]

                $(".novelview_h3").text("日別（PV）")
                $(".novelview_h3").addClass("subtitle")
                if(title!=undefined){$(".novelview_h3").before("<div class='novelview_h3' id='title' style='margin-bottom: 10px;'>" + title + "</div>")}
            }
            _dayPV()
        }
    }else if(path.match('/access/monthpv/ncode/.*/')!=null){
        if($(".novelview_h3").length){
            if(option.kasasagiCustomStyle){
                var m = $(".novelview_h3")
                var title = m.text().trim().match(/『(.*)』 月別\[全エピソード\] アクセス解析\(PV\)/)[2]

                $(".novelview_h3").text("月別（PV）")
                $(".novelview_h3").addClass("subtitle")
                if(title!=undefined){$(".novelview_h3").before("<div class='novelview_h3' id='title' style='margin-bottom: 10px;'>" + title + "</div>")}
            }
            _monthPV()
        }
    }else if(path.match('/access/dayunique/ncode/.*/')!=null){
        if($(".novelview_h3").length){
            if(option.kasasagiCustomStyle){
                var m = $(".novelview_h3")
                var title = m.text().trim().match(/『(.*)』 日別\[全エピソード\] アクセス解析\(ユニーク\)/)[2]

                $(".novelview_h3").text("日別（ユニーク）")
                $(".novelview_h3").addClass("subtitle")
                if(title!=undefined){$(".novelview_h3").before("<div class='novelview_h3' id='title' style='margin-bottom: 10px;'>" + title + "</div>")}

                $(".novelview_h3.subtitle").append(addExclamationIconBalloon("ユニークは約2日遅れ"));
                $(".novelview_h3.subtitle .ui-balloon").attr("style", "margin-left: .2em;");
                $(".attention").parent().remove();
            }
            _dayUnique()
        }
    }else if(path.match('/access/monthunique/ncode/.*/')!=null){
        if($(".novelview_h3").length){
            if(option.kasasagiCustomStyle){
                var m = $(".novelview_h3")
                var title = m.text().trim().match(/『(.*)』 月別\[全エピソード\] アクセス解析\(ユニーク\)/)[2]

                $(".novelview_h3").text("月別（ユニーク）")
                $(".novelview_h3").addClass("subtitle")
                if(title!=undefined){$(".novelview_h3").before("<div class='novelview_h3' id='title' style='margin-bottom: 10px;'>" + title + "</div>")}

                $(".novelview_h3.subtitle").append(addExclamationIconBalloon("ユニークは約2日遅れ"));
                $(".novelview_h3.subtitle .ui-balloon").attr("style", "margin-left: .2em;");
                $(".attention").parent().remove();
            }
            _monthUnique()
        }
    }
});

/* Day PV */
function _dayPV(){
    if(option.kasasagiShowGraph_DayPV){
        $("form").after('<canvas class="access-chart" id="day_pv" style="width: 100%; margin-bottom:10px;"></canvas>')
        makeGraph("day_pv", option.kasasagiGraphType_DayPV, "日別（PV）")
    }
}

/* Day Unique */
function _dayUnique(){
    if(option.kasasagiShowGraph_DayUnique){
        $("form").after('<canvas class="access-chart" id="day_unique" style="width: 100%; margin-bottom:10px;"></canvas>')
        makeGraph("day_unique", option.kasasagiGraphType_DayUnique, "日別（ユニーク）")
    }
}

/* Month PV */
function _monthPV(){
    if(option.kasasagiShowGraph_DayPV){
        $("#access_all").after('<canvas class="access-chart" id="month_pv" style="width: 100%; margin-bottom:10px;"></canvas>')
        makeGraph("month_pv", option.kasasagiGraphType_MonthPV, "月別（PV）")
    }
}

/* Month Unique */
function _monthUnique(){
    if(option.kasasagiShowGraph_DayUnique){
        $("#access_all").after('<canvas class="access-chart" id="month_unique" style="width: 100%; margin-bottom:10px;"></canvas>')
        makeGraph("month_unique", option.kasasagiGraphType_MonthUnique, "月別（ユニーク）")
    }
}