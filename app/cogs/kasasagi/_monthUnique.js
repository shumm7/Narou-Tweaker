import { addExclamationIconBalloon } from "/utils/ui.js"
import { getDateString, getDatetimeString } from "/utils/text.js"
import { saveJson } from "/utils/misc.js"
import { makeGraph, getValueFromTables, getNcode } from "./utils.js"

var graph

/* Month Unique */
export function _monthUnique(){
    chrome.storage.local.get(null, (option)=>{
        if($(".novelview_h3").length){
            if(option.kasasagiCustomStyle){
                var m = $(".novelview_h3")
                var title = m.text().trim().match(/『(.*)』 月別\[全エピソード\] アクセス解析\(ユニーク\)/)[1]

                $(".novelview_h3").text("月別（ユニーク）")
                $(".novelview_h3").addClass("subtitle")
                if(title!=undefined){$(".novelview_h3").before("<div class='novelview_h3' id='title' style='margin-bottom: 10px;'>" + title + "</div>")}

                $(".novelview_h3.subtitle").append(addExclamationIconBalloon("ユニークは約2日遅れ"));
                $(".novelview_h3.subtitle .ui-balloon").attr("style", "margin-left: .2em;");
                $(".attention").parent().remove();
            }

            var [datasets, labels] = getValueFromTables()

            /* Graph */
            if(option.kasasagiShowGraph_MonthUnique){
                _graph(datasets, labels, option.kasasagiGraphType_MonthUnique)
            }

            /* Dropdown */
            _dropdown(option, labels)

            /* Export Button */
            if(option.kasasagiExportButton){
                _button(datasets, labels)
            }
        }
    })
}

function _graph(datasets, labels, graphType){
    if(graph){graph.destroy()} 
    if(!$("#month_unique").length){
        $("#access_all").after('<canvas class="access-chart" id="month_unique" style="width: 100%; margin-bottom:10px;"></canvas>')
    }
    graph = makeGraph("month_unique", graphType, "月別（ユニーク）", datasets, labels, "人")
}

function _button(datasets, labels){
    $(".ui-button--center:has(#export-month-unique)").remove()
    $(".access_information").before('<div class="ui-button--center"><input class="ui-button" type="submit" value="エクスポート" id="export-month-unique"></div>')
    $("#export-month-unique").on("click", function(){
        var date = getDateString();
        var data = []
        
        $.each(labels, function(idx, date){
            data[idx] = {
                date: date,
                unique: {}
            }
            $.each(datasets, function(_, value){
                var key
                value.label = value.label.trim()
                if(value.label=="合計"){key = "total"}
                else if(value.label=="パソコン版"){key = "pc"}
                else if(value.label=="スマートフォン版"){key = "smp"}
                else if(value.label=="フィーチャーフォン版"){key = "mobile"}

                if(key){
                    data[idx]["unique"][key] = value.data[idx]
                }
            })
        })

        var raw = {
            date: date,
            generatedTime: getDatetimeString(),
            ncode: getNcode(),
            data: data
        }
        saveJson(raw, `month-unique_${ncode}_${date}.json`);
    })
}

function _dropdown(option, labels){
    $("#access_all").after(`
        ▼見たい年を選んでください<br>
        <div class="dropdown">
            <select name="year" id="month-pv--year-dropdown" size="1">
            </select>
        </div>
    `)

    // Create Year List
    var years = []
    $.each(labels, function(_, label){
        var m = label.trim().match(/^(\d+)年\d+月$/)
        if(m){
            var year = parseInt(m[1])
            if(!isNaN(year)){
                if(!years.includes(year)){
                    years.push(year)
                }
            }
        }
    })
    years.reverse()

    // Dropdown Options
    $("#month-pv--year-dropdown").append(`<option value="all">全て</option>`)
    $.each(years, function(_, year){
        $("#month-pv--year-dropdown").append(`<option value="${year}">${year}年</option>`)
    })

    //Event
    $("#month-pv--year-dropdown").on("change", function(){
        var year = $(this).val()
        if(year=="all"){
            $(".access_per_day").removeClass("hide")
        }else{
            $(".access_per_day").each(function(){
                var d = $(this).find("td.day")
                if(d.length){
                    var m = d.text().trim().match(/^(\d+)年\d+月$/)
                    if(m){
                        var table_year = m[1]
                        if(table_year==year){
                            $(this).removeClass("hide")
                        }else{
                            $(this).addClass("hide")
                        }
                    }
                }
            })
        }

        var [datasets, labels] = getValueFromTables()

        /* Graph */
        if(option.kasasagiShowGraph_MonthUnique){
            _graph(datasets, labels, option.kasasagiGraphType_MonthUnique)
        }

        /* Export Button */
        if(option.kasasagiExportButton){
            _button(datasets, labels)
        }

    })
}