import { getDateString, getDatetimeString } from "/utils/text.js"
import { saveJson } from "/utils/misc.js"
import { makeGraph, getValueFromTables, getNcode } from "./utils.js"

/* Month PV */
export function _monthPV(){
    chrome.storage.local.get(null, (option)=>{
        if($(".novelview_h3").length){
            if(option.kasasagiCustomStyle){
                var m = $(".novelview_h3")
                var title = m.text().trim().match(/『(.*)』 月別\[全エピソード\] アクセス解析\(PV\)/)[1]

                $(".novelview_h3").text("月別（PV）")
                $(".novelview_h3").addClass("subtitle")
                if(title!=undefined){$(".novelview_h3").before("<div class='novelview_h3' id='title' style='margin-bottom: 10px;'>" + title + "</div>")}
            }

            var [datasets, labels] = getValueFromTables()

            /* Graph */
            if(option.kasasagiShowGraph_MonthPV){
                _graph(datasets, labels, option.kasasagiGraphType_MonthPV)
            }

            /* Export Button */
            if(option.kasasagiExportButton){
                _button(datasets, labels)
            }
        }
    })
}

function _graph(datasets, labels, graphType){
    $("#access_all").after('<canvas class="access-chart" id="month_pv" style="width: 100%; margin-bottom:10px;"></canvas>')
    makeGraph("month_pv", graphType, "月別（PV）", datasets, labels, "")
}


function _button(datasets, labels){
    $(".access_information").before('<div class="ui-button--center"><input class="ui-button" type="submit" value="エクスポート" id="export-month-pv"></div>')
    $("#export-month-pv").on("click", function(){
        var date = getDateString();
        var data = []
        
        $.each(labels, function(idx, date){
            data[idx] = {
                date: date,
                pv: {}
            }
            $.each(datasets, function(_, value){
                var key
                value.label = value.label.trim()
                if(value.label=="合計"){key = "total"}
                else if(value.label=="パソコン版"){key = "pc"}
                else if(value.label=="スマートフォン版"){key = "smartphone"}
                else if(value.label=="フィーチャーフォン版"){key = "phone"}

                if(key){
                    data[idx]["pv"][key] = value.data[idx]
                }
            })
        })

        var raw = {
            date: date,
            generatedTime: getDatetimeString(),
            ncode: getNcode(),
            data: data
        }
        saveJson(raw, "day-month_" + date + ".json");
    })
}