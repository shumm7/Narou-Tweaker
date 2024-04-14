import { makeGraph } from "./utils.js"

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

            /* Graph */
            if(option.kasasagiShowGraph_DayPV){
                $("#access_all").after('<canvas class="access-chart" id="month_pv" style="width: 100%; margin-bottom:10px;"></canvas>')
                makeGraph("month_pv", option.kasasagiGraphType_MonthPV, "月別（PV）")
            }
        }
    })
}