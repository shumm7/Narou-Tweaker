import { getNcode } from "./utils.js";
import { getDatetimeString } from "/utils/text.js";
import { saveJson } from "/utils/misc.js";
import { addExclamationIconBalloon } from "/utils/ui.js";

/* Chapter Unique */
export function _chapterUnique(){
    chrome.storage.local.get(null, function(option){
        var m = $(".novelview_h3")
        if(m.length){
            if(option.kasasagiCustomStyle){
                var title = m.text().match("『(.*)』 エピソード別 アクセス解析")[1]

                $(".novelview_h3").text("エピソード別 ユニークアクセス")
                $(".novelview_h3").addClass("subtitle")
                if(title!=undefined){$(".novelview_h3").before("<div class='novelview_h3' id='title' style='margin-bottom: 10px;'>" + title + "</div>")}
                
                $("form#datepicker_form").insertAfter(".novelview_h3.subtitle")
                $(".novelview_h3.subtitle").append(addExclamationIconBalloon("エピソード単位のユニークの合計＝作品全体のユニークではありません"));
                $(".novelview_h3.subtitle .ui-balloon").attr("style", "margin-left: .2em;");
                $(".attention").parent().remove();
            }

            var chapterpv = [];
            $('.chapter-graph-list__item').each(function() {
                var text = $(this).text().trim();
                var res = text.match(/ep.(\d*): (\d*)人/);
                if(res!=null){
                    chapterpv[res[1]] = res[2]
                }
            });

            var data = []
            for(let i=1; i<chapterpv.length; i++) {
                if(chapterpv[i]==null){
                    data[i-1] = null;
                }else{
                    data[i-1] = chapterpv[i]
                }
            }

            /* Export Button */
            if(option.kasasagiExportButton){
                _button(data)
            }

            /* Graph */
            if (option.kasasagiShowGraph_ChapterUnique){
                _graph(data, option.kasasagiGraphType_ChapterUnique)
            }

            /* Table */
            if(option.kasasagiShowTable_ChapterUnique){
                _table(data)
            }
        }
    })
}

function _button(data){
    $("#chapter_graph").after('<div class="ui-button--center"><input class="ui-button" type="submit" value="エクスポート" id="export-chapter-unique"></div>')
    $("#export-chapter-unique").on("click", function(){
        var date = $("input[name='date']").attr("value")
        var raw = {
            date: date,
            generatedTime: getDatetimeString(),
            ncode: getNcode(),
            data: {
                unique: data
            }
        }
        saveJson(raw, "chapter-unique_" + date + ".json");
    })
}

function _graph(data, graphType){
    const tickCounts = (labels, step) => (Math.ceil(labels / step));
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
            type: graphType,
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
        left_grip_selector: ".leftGrip",
        right_grip_selector: ".rightGrip",
        value_bar_selector: ".bar",
        value_changed_callback: function(cause, leftValue, rightValue) {
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

function _table(data){
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
            if(i>0){
                var value_before = data[i-1]
                if(value_before==undefined || value_before<=0 || value_before==null){
                    value_before = 1
                }

                /* 前エピソード比 */
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

    /* Label */
    var labels = []
    for(let i=0; i<data.length; i++) {
        labels[i] = i+1;
    }
    
    /* Table */
    var old_graph = $('.chapter-graph-list');
    old_graph.after(makeTableDiffs("chapter-unique", ["ep.", "ユニーク（人）", "前EP比", "離脱数"], labels, data))

    old_graph.remove();
}