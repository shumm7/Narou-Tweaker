import {addExclamationIconBalloon} from "../../utils/ui.js"
import { saveJson } from "../../utils/misc.js";

chrome.storage.sync.get(null, (options) => {
    var path = location.pathname;
    var ncode = getNcode();

    var enable_css = options.enable_kasasagi_css;
    if(enable_css==undefined) {enable_css = true}
    var enable_graph = options.enable_kasasagi_graph;
    if(enable_graph==undefined) {enable_graph = true}
    var enable_export = options.enable_kasasagi_export;
    if(enable_export==undefined) {enable_export = true}

    /* Design */
    if(enable_css){
        $("body").addClass("narou-tweaker")

        /* Header */
        $("#container").before("<div class='l-header'></div>")
        var header = $(".l-header")
        
        /* header inner */
        header.append("<div class='p-header'><div class='p-header__content'></div></div>")
        var header_inner = $(".p-header__content")

        header_inner.append('<div class="p-header__main"><h1 class="p-header__logo"><a href="https://kasasagi.hinaproject.com/"><img style="max-height: 50px;" src="https://kasasagi.hinaproject.com/view/images/kasasagi_logo.gif" alt="KASASAGI"></a></h1><div class="p-header__description">KASASAGIは株式会社ヒナプロジェクトによって作られた<br>アクセス解析システムです。</div></div>')
        header_inner.append('<div class="p-header__mainnav"><ul class="p-header__mainnav-list"></ul></div>')
        $("ul.p-header__mainnav-list").append('<li class="p-header__mainnav-item"><a href="https://syosetu.com/user/top/">ユーザーホーム</a></li>')
        $("ul.p-header__mainnav-list").append('<li class="p-header__mainnav-item"><a href="https://ncode.syosetu.com/novelview/infotop/ncode/'+ncode+'/">作品情報</a></li>')
        $("ul.p-header__mainnav-list").append('<li class="p-header__mainnav-item"><a href="https://ncode.syosetu.com/'+ncode+'/">作品TOP</a></li>')

        /* navigation */
        header.append("<div class='p-mainheader'><div class='p-mainheader__tab'></div></div>")
        var header_nav = $(".p-mainheader__tab")
        header_nav.append('<ul class="p-mainheader__tab-list"></ul>')

        var header_nav_ul = $("ul.p-mainheader__tab-list")
        header_nav_ul.append('<li class="p-mainheader__tab-list-item"><a href="/access/top/ncode/'+ncode+'/">総合</a></li>')
        header_nav_ul.append('<li class="p-mainheader__tab-list-item"><a href="/access/chapter/ncode/'+ncode+'/">部分別ユニーク</a></li>')
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

        /* Footer */
        $("#container").after('<div class="l-footer"><div class="p-footer"></div></div>')
        $("#copyright").addClass("p-footer__foot")
        $("#copyright").appendTo(".p-footer")
        $("#copyright").attr("id", "")
    }

    /* Switch */
    if(path.match('/access/top/ncode/.*/')!=null){
        _general();

    }else if(path.match('/access/chapter/ncode/.*/')!=null){
        if(enable_css){

            var m = $(".novelview_h3").text().match("『(.*)』 部分別 アクセス解析")
            var title = m[1]

            $(".novelview_h3").text("部分別 ユニークアクセス")
            $(".novelview_h3").attr("id", "subtitle")
            if(title!=undefined){$(".novelview_h3").before("<div class='novelview_h3' id='title' style='margin-bottom: 10px;'>" + title + "</div>")}
            
            $("form#datepicker_form").insertAfter(".novelview_h3#subtitle")
            $(".novelview_h3#subtitle").append(addExclamationIconBalloon("本ページの人数は部分単位のユニークです<br>（部分単位のユニークの合計＝作品全体のユニークではありません）"));
            $(".novelview_h3#subtitle .ui-balloon").attr("style", "margin-left: 10px;");
            $(".attention").parent().remove();
        }

        _chapterUnique();
    }else if(path.match('/access/daypv/ncode/.*/')!=null){
        console.log('daypv')
    }else if(path.match('/access/monthpv/ncode/.*/')!=null){
        console.log('monthpv')
    }else if(path.match('/access/dayunique/ncode/.*/')!=null){
        console.log('dayunique')
    }else if(path.match('/access/monthunique/ncode/.*/')!=null){
        console.log('monthunique')
    }
});


/* Chapter Unique */
function _chapterUnique(){
    var chapterpv = [];
    $('.chapter-graph-list__item').each(function() {
        var text = $(this).text().trim();
        var res = text.match(/第(\d*)部分:(\d*)人/);
        if(res!=null){
            chapterpv[res[1]] = res[2]
        }
    });

    var data = []
    var labels = [];
    var labels_show = [];
    const tickCounts = (labels, step) => (Math.ceil(labels / step));

    for(let i=1; i<chapterpv.length; i++) {
        if(chapterpv[i]==null){
            data[i-1] = null;
        }else{
            data[i-1] = chapterpv[i]
        }
    }

    /* Export Button */
    if(enable_export){
        $("#chapter_graph").after('<div class="ui-button--center"><input class="ui-button" type="submit" value="エクスポート" id="export-chapter-unique"></div>')
        $("#export-chapter-unique").on("click", function(){
            var date = $("input[name='date']").attr("value")
            var raw = {
                date: date,
                unique: data
            }
            saveJson(raw, "date-unique_" + date + ".json");
        })
    }

    /* Graph */
    if (enable_graph){
        var unit = "人"
        var old_graph = $('.chapter-graph-list');

        /* Data */
        for(let i=0; i<tickCounts(data.length, 5) * 5 ; i++) {
            labels_show[i] = i+1;
        }
        for(let i=0; i<data.length; i++) {
            labels[i] = i+1;
        }


        /* Range Bar */
        old_graph.before('<div class="slider-outer" id="chapter-range"><div class="nstSlider chapter-slider" data-range_min="0" data-range_max="'+String(tickCounts(data.length, 5))+'" data-cur_min="0" data-cur_max="'+String(tickCounts(data.length, 5))+'"><div class="bar"></div><div class="leftGrip"></div><div class="rightGrip"></div></div><div class="leftLabel chapter-slider"></div><div class="rightLabel chapter-slider"></div></div>')

        /* Graph */
        old_graph.before('<canvas class="access-chart" id="chapter" style="width: 100%; margin-bottom:10px;"></canvas>')
        var graph = null
        function generateGraph(min, max){
            graph = new Chart(document.getElementById("chapter"), {
                type: 'bar',
                data: {
                    labels: labels_show,
                    datasets: [
                        {
                            label: '閲覧人数（ユニーク）',
                            data: data,
                            backgroundColor: "rgb(34,153,255)"
                        },
                    ],
                },
                options: {
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            callbacks: {
                                label: function(p){
                                    return p.dataset.label + ": " + p.raw + unit;
                                },
                                title: function(p) {
                                    return "第" + p[0].label + "部分";
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            ticks: {
                                stepSize: 10,
                                callback: function(value, index){
                                    return value + unit;
                                }
                            }
                        },
                        x: {
                            ticks: {
                                display: false,
                                maxTicksLimit: tickCounts(max - min, 5) + 2,
                            },
                            min: min,
                            max: max
                        }
                    },
                }
            });
        }
        generateGraph(0, (tickCounts(data.length, 5) + 2) * 5);
        $('.nstSlider.chapter-slider').nstSlider({
            "left_grip_selector": ".leftGrip",
            "right_grip_selector": ".rightGrip",
            "value_bar_selector": ".bar",
            "value_changed_callback": function(cause, leftValue, rightValue) {
                var l = leftValue * 5
                var r = rightValue * 5
                if(l==0){l=1}
                if(r==0){r=1}
                $(this).parent().find('.leftLabel').text(l);
                $(this).parent().find('.rightLabel').text(r);
                graph.destroy();
                generateGraph(leftValue * 5, rightValue * 5);
            }
        });

        /* Table */
        var old_graph = $('.chapter-graph-list');
        function makeTableDiffs(id, label, header, data){
            const size = Math.max(header.length, data.length)
            const aryMax = function (a, b) {return Math.max(a, b);}
            const max_data = data.reduce(aryMax)
            
            var outer = $("<table class='data-table'></table>")
            outer.attr("id", id);
            var table = outer.append("<tbody></tbody>")
            table.append("<tr><th>"+label[0]+"</th><th colspan='2'>"+label[1]+"</th><th>"+label[2]+"</th><th>"+label[3]+"</th></tr>")
    
            for(let i=0; i<size; i++){
                var idx = header[i];
                var value = data[i];
                var value_temp = value;
                if(idx==undefined || idx==null){idx=""}
                if(value==undefined || value==null){value=""}
                if(value_temp==undefined || value_temp==null){value_temp=0}
    
                var bar = Math.floor(value_temp / max_data * 100);
    
                var rate_before = ""
                var rate_declease = ""
                var style = ""
                if(i>0){
                    var value_before = data[i-1]
                    if(value_before==undefined || value_before<=0 || value_before==null){
                        value_before = 1
                    }
    
                    /* 前部分比 */
                    rate_before = Math.round(value / value_before * 100)
                    if(rate_before == undefined){
                        rate_before = ""
                    }else{
                        rate_before = rate_before + "%"
                    }
    
                    /* 離脱数 */
                    rate_declease = -(value_before - value);
                    if(rate_declease == undefined){
                        rate_declease = ""
                    }
                }
    
    
                table.append("<tr><td class='key'>"+ idx +"</td><td class='value'>"+value+"</td><td class='bar'><p class='graph' style='width:"+bar+"%;'></p></td><td class='rate'>"+rate_before+"</td><td class='rate'>"+rate_declease+"</td></tr>")
            }
            return outer;
        }

        old_graph.after(makeTableDiffs("chapter-unique", ["部分", "ユニーク（人）", "前部分比", "離脱数（人）"], labels, data))
        old_graph.remove();
    }
}

/* General */
function _general(){

}

/* Utilities */
function getNcode(){
    return location.pathname.match('/access/.*/ncode/(.*)/')[1];
}

function makeTable(id, label, header, data){
    const size = Math.max(header.length, data.length)
    const aryMax = function (a, b) {return Math.max(a, b);}
    const max_data = data.reduce(aryMax)
    
    var outer = $("<table class='data-table'></table>")
    outer.attr("id", id);
    var table = outer.append("<tbody></tbody>")
    table.append("<tr><th>"+label[0]+"</th><th colspan='2'>"+label[1]+"</th></tr>")
    for(let i=0; i<size; i++){
        var h = header[i];
        var d = data[i];
        var d_t = d;
        if(h==undefined || h==null){h=""}
        if(d==undefined || d==null){d=""}
        if(d_t==undefined || d_t==null){d_t=0}

        var bar = Math.floor(d_t / max_data * 100);

        table.append("<tr><td class='key'>"+ h +"</td><td class='value'>"+d+"</td><td class='bar'><p class='graph' style='width:"+bar+"%;'></p></td></tr>")
    }
    return outer;
}