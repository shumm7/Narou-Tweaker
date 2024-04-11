import { getDateString, getYesterday, getDatetimeString, getDateStringJapanese, parseIntWithComma, escapeHtml } from "/utils/text.js";
import {getBigGenre, getGenre, getNovelType, getNovelEnd, getNocgenre} from "/utils/api.js"
import { addQuestionIconBalloon, addExclamationIconBalloon } from "/utils/ui.js";
import { saveJson } from "/utils/misc.js";
import { getNcode } from "./utils.js";

/* General */
export function _general(r18){
    chrome.storage.local.get(null, (option)=>{
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

            /* 当日・前日 */
            today()

            /* 累計 */
            total()

            /* 作品データ */
            api(r18)
        }
    })
}


function today(){
    chrome.storage.local.get(null, (option)=>{
        var today_pv = [];
        var yesterday_pv = [];
        var today_pv_sum = [];
        var yesterday_pv_sum = [];
        var today_total = {}
        var yesterday_total = {}

        $("#today_data .oneday_graph tr td.pv").each(function() {
            today_pv.push(parseIntWithComma($(this).text()))
        });
        $("#yesterday_data .oneday_graph tr td.pv").each(function() {
            yesterday_pv.push(parseIntWithComma($(this).text()))
        });

        // Sum
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
            _buttonToday(today_total, yesterday_total, today_pv, yesterday_pv, today_pv_sum, yesterday_pv_sum)
        }

        /* Table */
        if (option.kasasagiShowTable_GeneralDay){
            _tableToday(today_pv_sum, yesterday_pv_sum)
        }

        /* Graph */
        if (option.kasasagiShowGraph_GeneralDay){
            _graphToday(today_pv, yesterday_pv, today_pv_sum, yesterday_pv_sum, option.kasasagiGraphType_GeneralDay)
        }
    })
}

function total(){
    chrome.storage.local.get(null, (option)=>{
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
            _graphTotal(week, week_pv, option.kasasagiGraphType_GeneralTotal)
        }

        /* Export Button */
        if(option.kasasagiExportButton){
            _buttonTotal(total_pv, total_unique, week, week_pv)
        }
    })
}

function api(r18){
    
    chrome.storage.local.get(null, (option)=>{
        if (option.kasasagiShowTable_API){
            const ncode = getNcode()
            
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

            var url = "https://api.syosetu.com/novelapi/api/?out=json&libtype=2&ncode=" + ncode
            if(r18){
                url = "https://api.syosetu.com/novel18api/api/?out=json&libtype=2&ncode=" + ncode
            }

            chrome.runtime.sendMessage({action: "fetch", format: "json", data: {url: url, options: {'method': 'GET'}}}, function(response){
            if(response){
                if(response.success && response.action=="fetch"){
                    var data = response.result[1]
                    if(data!=undefined){
                        $(".loading-api").remove()

                        /* Info */
                        _tableApi(ncode, data, r18)

                        /* Export Button */
                        if(option.kasasagiExportButton){
                            _buttonApi(ncode, data)
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
    })
}


function _buttonToday(today_total, yesterday_total, today_pv, yesterday_pv, today_pv_sum, yesterday_pv_sum){
    $("#today_all").append('<div class="ui-button--center"><input class="ui-button" type="submit" value="エクスポート" id="export-general-day"></div>')
        $("#export-general-day").on("click", function(){
            var date = getDateString();
            var raw = {
                date: date,
                generatedTime: getDatetimeString(),
                ncode: getNcode(),
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

function _tableToday(today_pv_sum, yesterday_pv_sum){
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

function _graphToday(today_pv, yesterday_pv, today_pv_sum, yesterday_pv_sum, graphType){
    $("#yesterday_data").after('<canvas class="access-chart" id="general-day" style="width: 100%; margin-top:10px; margin-bottom:10px;"></canvas>')
    var graph = null

    var hours = [];
    for(var i=0; i<24; i++){
        hours.push(i);
    }

    function generateOnedayGraph(){
        graph = new Chart(document.getElementById("general-day"), {
            type: graphType,
            data: {
                labels: hours,
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


function _buttonTotal(total_pv, total_unique, week, week_pv){
    $("#access_all").append('<div class="ui-button--center"><input class="ui-button" type="submit" value="エクスポート" id="export-general-total"></div>')
    $("#export-general-total").on("click", function(){
        var date = getDateString();
        var raw = {
            date: date,
            generatedTime: getDatetimeString(),
            ncode: getNcode(),
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

function _graphTotal(week, week_pv, graphType){
    $("#access_all").append('<canvas class="access-chart" id="general-total" style="width: 100%; margin-top:10px; margin-bottom:10px;"></canvas>')
    var graph = null

    function generateTotalGraph(){
        graph = new Chart(document.getElementById("general-total"), {
            type: graphType,
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

    generateTotalGraph()
}


function _tableApi(ncode, d, r18){
    $("#novel_detail .novel_info").append("<table class='access-table'><tbody></tbody></table>")
    var table = $("#novel_detail .novel_info table tbody")
    function addValue(key, desc, value, noEscape){
        if(!noEscape){
            desc = escapeHtml(desc)
            if(value){
                value = escapeHtml(value)
            }
        }
        if(value==undefined){
            table.append(`<tr><td>${key}</td><td class='right' colspan='2'>${desc}</td></tr>`)
        }else{
            table.append(`<tr><td>${key}</td><td class='right'>${desc}</td><td class='right'>${value}</td></tr>`)
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
    addValue("タイトル", "<a href='https://ncode.syosetu.com/"+ncode+"/'>"+escapeHtml(d.title)+"</a>", null, true)
    addValue("Nコード", ncode, d.ncode)
    addValue("あらすじ", d.story)
    addValue("キーワード", d.keyword)
    if(!r18){
        addValue("作者", "<a href='https://mypage.syosetu.com/"+d.userid+"/'>"+escapeHtml(d.writer)+"</a>", escapeHtml(d.userid), true)
    }else{
        addValue("作者", d.writer)
    }
    addValue("大ジャンル", getBigGenre(d.biggenre), d.biggenre)
    addValue("ジャンル", getGenre(d.genre), d.genre)
    addValue("種類", getNovelType(d.novel_type), d.novel_type)
    if(r18){
        addValue("掲載サイト", getNocgenre(d.nocgenre), d.nocgenre)
    }
    addValue("連載状態", getNovelEnd(d.end), d.end)
    addValue("初回掲載日", d.general_firstup, d.general_firstup)
    addValue("最終掲載日", d.general_lastup, d.general_lastup)
    addValue("最終更新日", d.novelupdated_at, d.novelupdated_at)
    addValue("話数", d.general_all_no.toLocaleString(), d.general_all_no)
    addValue("長期連載停止中", getYesNo(d.isstop), d.isstop)
    if(!r18){
        addValue("R15", getYesNo(d.isr15), d.isr15)
    }
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
    if(!r18){
        addValue("ブックマーク数", d.fav_novel_cnt.toLocaleString(), d.fav_novel_cnt)
    }else{
        addValue("Xブックマーク数", d.fav_novel_cnt.toLocaleString(), d.fav_novel_cnt)
    }
    addValue("感想数", d.impression_cnt.toLocaleString(), d.impression_cnt)
    addValue("レビュー数", d.review_cnt.toLocaleString(), d.review_cnt)
    addValue("評価ポイント", d.all_point.toLocaleString(), d.all_point)
    addValue("評価者数", d.all_hyoka_cnt.toLocaleString(), d.all_hyoka_cnt)
    addValue("最終更新日時<br>（システム用）", d.updated_at, d.updated_at)
}

function _buttonApi(ncode, data){
    $("#novel_detail").append('<div class="ui-button--center"><input class="ui-button" type="submit" value="エクスポート" id="export-api-data"></div>')
    $("#export-api-data").on("click", function(){
        var date = getDateString();
        var raw = {
            date: date,
            generatedTime: getDatetimeString(),
            ncode: ncode,
            data: data
        }
        saveJson(raw, "api-data_" + date + ".json");
    })
}