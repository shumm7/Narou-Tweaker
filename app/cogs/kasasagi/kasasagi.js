import {addExclamationIconBalloon} from "../../utils/ui.js"
import {saveJson} from "../../utils/misc.js"
import {getDateString, parseIntWithComma, getYesterday, getDateStringJapanese, getDatetimeString} from "../../utils/text.js"

var enable_css
var enable_export
var enable_graph_general_day
var enable_graph_general_total
var enable_graph_chapter_unique
var graph_type_general_day
var graph_type_general_total
var graph_type_chapter_unique
var enable_table_general_day
var enable_table_chapter_unique

chrome.storage.sync.get(null, (options) => {
    var path = location.pathname;
    var ncode = getNcode();

    enable_css = options.enable_kasasagi_css;
    if(enable_css==undefined) {enable_css = true}
    enable_export = options.enable_kasasagi_export;
    if(enable_export==undefined) {enable_export = true}

    enable_graph_general_day = options.enable_kasasagi_graph_general_day;
    if(enable_graph_general_day==undefined) {enable_graph_general_day = true}
    enable_graph_general_total = options.enable_kasasagi_graph_general_total;
    if(enable_graph_general_total==undefined) {enable_graph_general_total = true}
    enable_graph_chapter_unique = options.enable_kasasagi_graph_chapter_unique;
    if(enable_graph_chapter_unique==undefined) {enable_graph_chapter_unique = true}

    graph_type_general_day = options.kasasagi_graph_type_general_day;
    if(graph_type_general_day==undefined) {graph_type_general_day = "bar"}
    graph_type_general_total = options.kasasagi_graph_type_general_total;
    if(graph_type_general_total==undefined) {graph_type_general_total = "bar"}
    graph_type_chapter_unique = options.kasasagi_graph_type_chapter_unique;
    if(graph_type_chapter_unique==undefined) {graph_type_chapter_unique = "bar"}

    enable_table_general_day = options.enable_kasasagi_table_general_day;
    if(enable_table_general_day==undefined) {enable_table_general_day = true}
    enable_table_chapter_unique = options.enable_kasasagi_table_chapter_unique;
    if(enable_table_chapter_unique==undefined) {enable_table_chapter_unique = true}

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
        if(enable_css){

            var m = $(".novelview_h3#title").text().match("『(.*)』")
            var title = m[1]
            $(".novelview_h3#title").attr("style", "margin-bottom: 10px;")
            $(".novelview_h3#title").text(title)

            $("#today_data .caption").text("本日（"+getDateStringJapanese()+"）")
            $("#yesterday_data .caption").text("昨日（"+getDateStringJapanese(getYesterday())+"）")

            $(".novelview_h3:not(#title)").attr("id", "subtitle")
            $("#today_yesterday_data .novelview_h3#subtitle").text("アクセス解析（当日・前日）")
            $("#access_all .novelview_h3#subtitle").text("累計アクセス")
            $("#access_all .novelview_h3#subtitle").append(addExclamationIconBalloon("ユニークは約2日遅れ"));
            $("#access_all .novelview_h3#subtitle .ui-balloon").attr("style", "margin-left: .2em;");

            $("#access_all .caption").text("直近1週間のPV")
        }
        _general();

    }else if(path.match('/access/chapter/ncode/.*/')!=null){
        if(enable_css){

            var m = $(".novelview_h3").text().match("『(.*)』 部分別 アクセス解析")
            var title = m[1]

            $(".novelview_h3").text("部分別 ユニークアクセス")
            $(".novelview_h3").attr("id", "subtitle")
            if(title!=undefined){$(".novelview_h3").before("<div class='novelview_h3' id='title' style='margin-bottom: 10px;'>" + title + "</div>")}
            
            $("form#datepicker_form").insertAfter(".novelview_h3#subtitle")
            $(".novelview_h3#subtitle").append(addExclamationIconBalloon("部分単位のユニークの合計＝作品全体のユニークではありません"));
            $(".novelview_h3#subtitle .ui-balloon").attr("style", "margin-left: .2em;");
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


/* General */
function _general(){
    /* 当日・前日 */
    var hour = [];
    var today_pv = [];
    var yesterday_pv = [];
    var today_pv_sum = [];
    var yesterday_pv_sum = [];
    var today_total = {}
    var yesterday_total = {}

    for(i=0; i<24; i++){
        hour.push(i);
    }

    $("#today_data .oneday_graph tr td.pv").each(function() {
        today_pv.push(parseIntWithComma($(this).text()))
    });
    $("#yesterday_data .oneday_graph tr td.pv").each(function() {
        yesterday_pv.push(parseIntWithComma($(this).text()))
    });

    var i = 0
    $.each(today_pv, function(idx, val){
        if(val==NaN || val==undefined){val=0}
        i += val;
        today_pv_sum[idx] = i
    });
    var i = 0
    $.each(yesterday_pv, function(idx, val){
        if(val==NaN || val==undefined){val=0}
        i += val;
        yesterday_pv_sum[idx] = i
    });

    today_total.total = parseIntWithComma($("#today_data .oneday_access_table tr.highlight td.right").text())
    today_total.pc = parseIntWithComma($("#today_data .oneday_access_table tr:nth-child(3) td.right").text())
    today_total.smartphone = parseIntWithComma($("#today_data .oneday_access_table tr:nth-child(4) td.right").text())
    yesterday_total.total = parseIntWithComma($("#yesterday_data .oneday_access_table tr.highlight td.right").text())
    yesterday_total.pc = parseIntWithComma($("#yesterday_data .oneday_access_table tr:nth-child(3) td.right").text())
    yesterday_total.smartphone = parseIntWithComma($("#yesterday_data .oneday_access_table tr:nth-child(4) td.right").text())

    /* Export Button */
    if(enable_export){
        $("#today_all").after('<div class="ui-button--center"><input class="ui-button" type="submit" value="エクスポート" id="export-general-day"></div>')
        $("#export-general-day").on("click", function(){
            var date = getDateString();
            var raw = {
                date: date,
                generatedTime: getDatetimeString(),
                data: {
                    today: {
                        date: date,
                        highlight: today_total,
                        pv: today_pv,
                        sum: today_pv_sum
                    },
                    yesterday: {
                        date: getDateString(getYesterday()),
                        highlight: yesterday_total,
                        pv: yesterday_pv,
                        sum: yesterday_pv_sum
                    }
                }
            }
            saveJson(raw, "oneday-pv_" + date + ".json");
        })
    }

    /* Table */
    if (enable_table_general_day){
        $("#today_data .oneday_graph tr:nth-child(1) th[colspan='2']").after('<th colspan="2">積算PV</th>')
        $("#yesterday_data .oneday_graph tr:nth-child(1) th[colspan='2']").after('<th colspan="2">積算PV</th>')

        const aryMax = function (a, b) {return Math.max(a, b);}

        var max = today_pv_sum.reduce(aryMax)
        $("#today_data .oneday_graph tr td.pv").each(function() {
            var time = parseInt($(this).parent().children(".hour").text().trim());
            var value = today_pv_sum[time]
            var bar = Math.floor(value / max * 100)
            $(this).parent().children(".bar").after('<td class="pv sum">'+value.toLocaleString()+'</td>')
            $(this).parent().children(".sum").after('<td class="bar sum"><p class="graph" style="width:'+bar+'%;"></td>')
        });

        var max = yesterday_pv_sum.reduce(aryMax)
        $("#yesterday_data .oneday_graph tr td.pv").each(function() {
            var time = parseInt($(this).parent().children(".hour").text());
            var value = yesterday_pv_sum[time]
            var bar = Math.floor(value / max * 100)
            $(this).parent().children(".bar").after('<td class="pv sum">'+value.toLocaleString()+'</td>')
            $(this).parent().children(".sum").after('<td class="bar sum"><p class="graph" style="width:'+bar+'%;"></td>')
        });
    }

    /* Graph */
    if (enable_graph_general_day){
        $("#yesterday_data").after('<canvas class="access-chart" id="general-day" style="width: 100%; margin-top:10px; margin-bottom:10px;"></canvas>')
        var graph = null

        function generateOnedayGraph(){
            graph = new Chart(document.getElementById("general-day"), {
                type: graph_type_general_day,
                data: {
                    labels: hour,
                    datasets: [
                        {
                            label: '本日PV',
                            data: today_pv,
                            backgroundColor: "#2299ff"
                        },
                        {
                            label: '昨日PV',
                            data: yesterday_pv,
                            backgroundColor: "#90ccff"
                        },
                        {
                            label: '本日積算PV',
                            data: today_pv_sum,
                            backgroundColor: "#ffa500",
                            hidden: true
                        },
                        {
                            label: '昨日積算PV',
                            data: yesterday_pv_sum,
                            backgroundColor: "#ffd27f",
                            hidden: true
                        },
                    ],
                },
                options: {
                    plugins: {
                        legend: {
                            display: true
                        },
                        tooltip: {
                            callbacks: {
                                label: function(p){
                                    return " " + p.raw;
                                },
                                title: function(p) {
                                    var date
                                    if(p[0].datasetIndex==0 || p[0].datasetIndex==2){
                                        date = getDateStringJapanese();
                                    }else if(p[0].datasetIndex==1 || p[0].datasetIndex==3){
                                        date = getDateStringJapanese(getYesterday());
                                    }
                                    return p[0].dataset.label + " （" + date + " " + p[0].label + "時）";
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            ticks: {
                                stepSize: 10
                            }
                        },
                        x: {
                            ticks: {
                                display: true
                            }
                        }
                    },
                }
            });
        }

        generateOnedayGraph()
    }


    /* 累計 */
    var total_pv = {
        total: parseIntWithComma($("#access_all .total_access_table tr:nth-child(2) td:nth-child(2)").text()),
        pc: parseIntWithComma($("#access_all .total_access_table tr:nth-child(3) td:nth-child(2)").text()),
        smartphone: parseIntWithComma($("#access_all .total_access_table tr:nth-child(4) td:nth-child(2)").text()),
    }
    var total_unique = {
        total: parseIntWithComma($("#access_all .total_access_table tr:nth-child(2) td:nth-child(3)").text()),
        pc: parseIntWithComma($("#access_all .total_access_table tr:nth-child(3) td:nth-child(3)").text()),
        smartphone: parseIntWithComma($("#access_all .total_access_table tr:nth-child(4) td:nth-child(3)").text()),
    }
    var week_pv = []
    var week = []
    $("#access_all .total_graph tr:not(.header)").each(function(){
        week_pv.push(parseIntWithComma($(this).children("td.pv").text()))
        week.push($(this).children("td.day").text())
    })

    /* Export Button */
    if(enable_export){
        $("#access_all").after('<div class="ui-button--center"><input class="ui-button" type="submit" value="エクスポート" id="export-general-total"></div>')
        $("#export-general-total").on("click", function(){
            var date = getDateString();
            var raw = {
                date: date,
                generatedTime: getDatetimeString(),
                data: {
                    highlight: {
                        pv: total_pv,
                        unique: total_unique
                    },
                    week: {
                        day: week,
                        pv: week_pv
                    }
                }
            }
            saveJson(raw, "access-all_" + date + ".json");
        })
    }

    /* Graph */
    if (enable_graph_general_total){
        $("#access_all").after('<canvas class="access-chart" id="general-total" style="width: 100%; margin-top:10px; margin-bottom:10px;"></canvas>')
        var graph = null

        function generateOnedayGraph(){
            graph = new Chart(document.getElementById("general-total"), {
                type: graph_type_general_total,
                data: {
                    labels: week,
                    datasets: [
                        {
                            label: '直近1週間のPV',
                            data: week_pv,
                            backgroundColor: "#2299ff"
                        }
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
                                    return " " + p.raw;
                                },
                                title: function(p) {
                                    var date
                                    if(p[0].datasetIndex==0 || p[0].datasetIndex==2){
                                        date = getDateStringJapanese();
                                    }else if(p[0].datasetIndex==1 || p[0].datasetIndex==3){
                                        date = getDateStringJapanese(getYesterday());
                                    }
                                    return p[0].label + " （PV）";
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            ticks: {
                                stepSize: 10
                            }
                        },
                        x: {
                            ticks: {
                                display: true
                            }
                        }
                    },
                }
            });
        }

        generateOnedayGraph()
    }
}

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
    const tickCounts = (labels, step) => (Math.ceil(labels / step));

    for(let i=1; i<chapterpv.length; i++) {
        if(chapterpv[i]==null){
            data[i-1] = null;
        }else{
            data[i-1] = chapterpv[i]
        }
    }
    for(let i=0; i<data.length; i++) {
        labels[i] = i+1;
    }

    /* Export Button */
    if(enable_export){
        $("#chapter_graph").after('<div class="ui-button--center"><input class="ui-button" type="submit" value="エクスポート" id="export-chapter-unique"></div>')
        $("#export-chapter-unique").on("click", function(){
            var date = $("input[name='date']").attr("value")
            var raw = {
                date: date,
                generatedTime: getDatetimeString(),
                data: {
                    unique: data
                }
            }
            saveJson(raw, "chapter-unique_" + date + ".json");
        })
    }

    /* Graph */
    if (enable_graph_chapter_unique){
        var unit = "人"
        var old_graph = $('.chapter-graph-list');
        var labels_show = [];

        /* Data */
        for(let i=0; i<tickCounts(data.length, 5) * 5 ; i++) {
            labels_show[i] = i+1;
        }

        /* Range Bar */
        old_graph.before('<div class="slider-outer" id="chapter-range"><div class="nstSlider chapter-slider" data-range_min="0" data-range_max="'+String(tickCounts(data.length, 5))+'" data-cur_min="0" data-cur_max="'+String(tickCounts(data.length, 5))+'"><div class="bar"></div><div class="leftGrip"></div><div class="rightGrip"></div></div><div class="leftLabel chapter-slider"></div><div class="rightLabel chapter-slider"></div></div>')

        /* Graph */
        old_graph.before('<canvas class="access-chart" id="chapter" style="width: 100%; margin-bottom:10px;"></canvas>')
        var graph = null

        function generateGraph(min, max){
            graph = new Chart(document.getElementById("chapter"), {
                type: graph_type_chapter_unique,
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

    }

    /* Table */
    if(enable_table_chapter_unique){
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
                        rate_declease = "";
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