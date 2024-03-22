import {addExclamationIconBalloon, addQuestionIconBalloon} from "../../utils/ui.js"
import {saveJson} from "../../utils/misc.js"
import {getDateString, parseIntWithComma, getYesterday, getDateStringJapanese, getDatetimeString} from "../../utils/text.js"
import {getBigGenre, getGenre, getNovelType, getNovelEnd} from "../../utils/api.js"
import {makeTable, getNcode, makeGraph} from "./utils.js"

var option

chrome.storage.local.get(null, (data) => {
    var path = location.pathname;
    var ncode = getNcode();
    option = data

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
        var m = $(".novelview_h3#title")
        if(m.length){
            if(option.kasasagiCustomStyle){
                var title = m.text().match("『(.*)』")[1]
                $(".novelview_h3#title").attr("style", "margin-bottom: 10px;")
                $(".novelview_h3#title").text(title)

                $("#today_data .caption").text("本日（"+getDateStringJapanese()+"）")
                $("#yesterday_data .caption").text("昨日（"+getDateStringJapanese(getYesterday())+"）")

                $(".novelview_h3:not(#title)").addClass("subtitle")
                $("#today_yesterday_data .novelview_h3.subtitle").text("アクセス解析（当日・前日）")
                $("#access_all .novelview_h3.subtitle").text("累計アクセス")
                $("#access_all .novelview_h3.subtitle").append(addExclamationIconBalloon("ユニークは約2日遅れ"));
                $("#access_all .novelview_h3.subtitle .ui-balloon").attr("style", "margin-left: .2em;");

                $("#access_all .caption").text("直近1週間のPV")
            }
            _general();
        }

    }else if(path.match('/access/chapter/ncode/.*/')!=null){
        var m = $(".novelview_h3")
        if(m.length){
            if(option.kasasagiCustomStyle){
                var title = m.text().match("『(.*)』 エピソード別 アクセス解析")[1]

                $(".novelview_h3").text("部分別 ユニークアクセス")
                $(".novelview_h3").addClass("subtitle")
                if(title!=undefined){$(".novelview_h3").before("<div class='novelview_h3' id='title' style='margin-bottom: 10px;'>" + title + "</div>")}
                
                $("form#datepicker_form").insertAfter(".novelview_h3.subtitle")
                $(".novelview_h3.subtitle").append(addExclamationIconBalloon("部分単位のユニークの合計＝作品全体のユニークではありません"));
                $(".novelview_h3.subtitle .ui-balloon").attr("style", "margin-left: .2em;");
                $(".attention").parent().remove();
            }
            _chapterUnique();
        }

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


/* General */
function _general(){
    var ncode = getNcode();

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
    if(option.kasasagiExportButton){
        $("#today_all").append('<div class="ui-button--center"><input class="ui-button" type="submit" value="エクスポート" id="export-general-day"></div>')
        $("#export-general-day").on("click", function(){
            var date = getDateString();
            var raw = {
                date: date,
                generatedTime: getDatetimeString(),
                ncode: ncode,
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
    if (option.kasasagiShowTable_GeneralDay){
        $("#today_data .oneday_graph tr:nth-child(1) th[colspan='2']").after('<th colspan="2">積算PV</th>')
        $("#yesterday_data .oneday_graph tr:nth-child(1) th[colspan='2']").after('<th colspan="2">積算PV</th>')

        const aryMax = function (a, b) {return Math.max(a, b);}

        var max = today_pv_sum.reduce(aryMax)
        $("#today_data .oneday_graph tr td.pv").each(function() {
            var time = parseInt($(this).parent().children(".hour").text().trim());
            var value = today_pv_sum[time]
            var bar = Math.floor(value / max * 100)
            if(isNaN(bar) || !isFinite(bar)){bar = 0}
            $(this).parent().children(".bar").after('<td class="pv sum">'+value.toLocaleString()+'</td>')
            $(this).parent().children(".sum").after('<td class="bar sum"><p class="graph" style="width:'+bar+'%;"></td>')
        });

        var max = yesterday_pv_sum.reduce(aryMax)
        $("#yesterday_data .oneday_graph tr td.pv").each(function() {
            var time = parseInt($(this).parent().children(".hour").text());
            var value = yesterday_pv_sum[time]
            var bar = Math.floor(value / max * 100)
            if(isNaN(bar) || !isFinite(bar)){bar = 0}
            $(this).parent().children(".bar").after('<td class="pv sum">'+value.toLocaleString()+'</td>')
            $(this).parent().children(".sum").after('<td class="bar sum"><p class="graph" style="width:'+bar+'%;"></td>')
        });
    }

    /* Graph */
    if (option.kasasagiShowGraph_GeneralDay){
        $("#yesterday_data").after('<canvas class="access-chart" id="general-day" style="width: 100%; margin-top:10px; margin-bottom:10px;"></canvas>')
        var graph = null

        function generateOnedayGraph(){
            graph = new Chart(document.getElementById("general-day"), {
                type: option.kasasagiGraphType_GeneralDay,
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

    /* Graph */
    if (option.kasasagiShowGraph_GeneralTotal){
        $("#access_all").append('<canvas class="access-chart" id="general-total" style="width: 100%; margin-top:10px; margin-bottom:10px;"></canvas>')
        var graph = null

        function generateOnedayGraph(){
            graph = new Chart(document.getElementById("general-total"), {
                type: option.kasasagiGraphType_GeneralTotal,
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

    /* Export Button */
    if(option.kasasagiExportButton){
        $("#access_all").append('<div class="ui-button--center"><input class="ui-button" type="submit" value="エクスポート" id="export-general-total"></div>')
        $("#export-general-total").on("click", function(){
            var date = getDateString();
            var raw = {
                date: date,
                generatedTime: getDatetimeString(),
                ncode: ncode,
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


    /* 作品データ */
    /* Table */
    if (option.kasasagiShowTable_API){
        $("#access_all").after("<div id='novel_detail'></div>")
        $("#novel_detail").append("<p class='novelview_h3'>作品データ</p>")
        if(option.kasasagiCustomStyle){
            $("#novel_detail .novelview_h3").addClass("subtitle")
            $("#novel_detail .novelview_h3.subtitle").append(addQuestionIconBalloon("なろう小説APIから取得した情報です", "https://dev.syosetu.com/man/api/"));
            $("#novel_detail .novelview_h3.subtitle .ui-balloon").attr("style", "margin-left: .2em;");
        }
        $("#novel_detail").append("<div id='novel_data'><span class='loading-api'>情報を取得中...</span></div>")
        $("#novel_detail #novel_data").append("<div class='novel_info'></div>")
        $("#novel_detail #novel_data").append("<div class='novel_statics'></div>")

        chrome.runtime.sendMessage({action: "fetch", format: "json", data: {url: "https://api.syosetu.com/novelapi/api/?out=json&libtype=2&ncode=" + ncode, options: {'method': 'GET'}}}, function(response){
        if(response){
            if(response.success && response.action=="fetch"){
                var d = response.result[1]
                if(d!=undefined){
                    $(".loading-api").remove()

                    /* Info */
                    $("#novel_detail .novel_info").append("<table class='access-table'><tbody></tbody></table>")
                    var table = $("#novel_detail .novel_info table tbody")
                    function addValue(key, desc, value){
                        if(value==undefined){
                            table.append(`<tr><td>${key}</td><td class='right' colspan='2'>${escapeHtml(desc)}</td></tr>`)
                        }else{
                            table.append(`<tr><td>${key}</td><td class='right'>${escapeHtml(desc)}</td><td class='right'>${escapeHtml(value)}</td></tr>`)
                        }
                    }
                    function getYesNo(state){
                        if(state==0){
                            return "いいえ"
                        }
                        else if(state==1){
                            return "はい"
                        }else{
                            return ""
                        }
                    }

                    table.append("<tr class='header'><th>作品情報</th><th>項目</th><th>データ</th></tr>")
                    addValue("タイトル", "<a href='https://ncode.syosetu.com/"+ncode+"/'>"+d.title+"</a>")
                    addValue("Nコード", ncode, d.ncode)
                    addValue("あらすじ", d.story)
                    addValue("キーワード", d.keyword)
                    addValue("作者", "<a href='https://mypage.syosetu.com/"+d.userid+"/'>"+d.writer+"</a>", d.userid)
                    addValue("大ジャンル", getBigGenre(d.biggenre), d.biggenre)
                    addValue("ジャンル", getGenre(d.genre), d.genre)
                    addValue("種類", getNovelType(d.novel_type), d.novel_type)
                    addValue("連載状態", getNovelEnd(d.end), d.end)
                    addValue("初回掲載日", d.general_firstup, d.general_firstup)
                    addValue("最終掲載日", d.general_lastup, d.general_lastup)
                    addValue("最終更新日", d.novelupdated_at, d.novelupdated_at)
                    addValue("話数", d.general_all_no.toLocaleString(), d.general_all_no)
                    addValue("長期連載停止中", getYesNo(d.isstop), d.isstop)
                    addValue("R15", getYesNo(d.isr15), d.isr15)
                    addValue("ボーイズラブ", getYesNo(d.isbl), d.isbl)
                    addValue("ガールズラブ", getYesNo(d.isgl), d.isgl)
                    addValue("残酷な描写あり", getYesNo(d.iszankoku), d.iszankoku)
                    addValue("異世界転生", getYesNo(d.istensei), d.istensei)
                    addValue("異世界転移", getYesNo(d.istenni), d.istenni)

                    /* Statics */
                    $("#novel_detail .novel_statics").append("<table class='access-table'><tbody></tbody></table>")
                    table = $("#novel_detail .novel_statics table tbody")

                    table.append("<tr class='header'><th>作品統計</th><th>項目</th><th>データ</th></tr>")
                    addValue("文字数", d.length.toLocaleString(), d.length)
                    addValue("読了時間", d.time.toLocaleString() + "分", d.time)
                    addValue("挿絵数", d.sasie_cnt.toLocaleString(), d.sasie_cnt)
                    addValue("会話率", d.kaiwaritu + "%", d.kaiwaritu)
                    addValue("総合ポイント", d.global_point.toLocaleString() + "pt", d.global_point)
                    addValue("日間ポイント", d.daily_point.toLocaleString() + "pt", d.daily_point)
                    addValue("週間ポイント", d.weekly_point.toLocaleString() + "pt", d.weekly_point)
                    addValue("月間ポイント", d.monthly_point.toLocaleString() + "pt", d.monthly_point)
                    addValue("四半期ポイント", d.quarter_point.toLocaleString() + "pt", d.quarter_point)
                    addValue("年間ポイント", d.yearly_point.toLocaleString() + "pt", d.yearly_point)
                    addValue("ブックマーク数", d.fav_novel_cnt.toLocaleString(), d.fav_novel_cnt)
                    addValue("感想数", d.impression_cnt.toLocaleString(), d.impression_cnt)
                    addValue("レビュー数", d.review_cnt.toLocaleString(), d.review_cnt)
                    addValue("評価ポイント", d.all_point.toLocaleString(), d.all_point)
                    addValue("評価者数", d.all_hyoka_cnt.toLocaleString(), d.all_hyoka_cnt)
                    addValue("最終更新日時<br>（システム用）", d.updated_at, d.updated_at)

                    /* Export Button */
                    if(option.kasasagiExportButton){
                        $("#novel_detail").append('<div class="ui-button--center"><input class="ui-button" type="submit" value="エクスポート" id="export-api-data"></div>')
                        $("#export-api-data").on("click", function(){
                            var date = getDateString();
                            var raw = {
                                date: date,
                                generatedTime: getDatetimeString(),
                                ncode: ncode,
                                data: d
                            }
                            saveJson(raw, "api-data_" + date + ".json");
                        })
                    }


                }else{
                    $(".loading-api").text("情報の取得に失敗しました。")
                }
            }else{
                $(".loading-api").text("情報の取得に失敗しました。")
            }
            return true;
        }
        });
    }
}

/* Chapter Unique */
function _chapterUnique(){
    var ncode = getNcode();

    var chapterpv = [];
    $('.chapter-graph-list__item').each(function() {
        var text = $(this).text().trim();
        var res = text.match(/ep.(\d*): (\d*)人/);
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
    if(option.kasasagiExportButton){
        $("#chapter_graph").after('<div class="ui-button--center"><input class="ui-button" type="submit" value="エクスポート" id="export-chapter-unique"></div>')
        $("#export-chapter-unique").on("click", function(){
            var date = $("input[name='date']").attr("value")
            var raw = {
                date: date,
                generatedTime: getDatetimeString(),
                ncode: ncode,
                data: {
                    unique: data
                }
            }
            saveJson(raw, "chapter-unique_" + date + ".json");
        })
    }

    /* Graph */
    if (option.kasasagiShowGraph_ChapterUnique){
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
                type: option.kasasagiGraphType_ChapterUnique,
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
                                    return "ep." + p[0].label;
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
    if(option.kasasagiShowTable_ChapterUnique){
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
                if(isNaN(bar) || !isFinite(bar)){bar = 0}
    
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
        old_graph.after(makeTableDiffs("chapter-unique", ["ep.", "ユニーク（人）", "前EP比", "離脱数"], labels, data))
    
        old_graph.remove();
    }
}

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