import { makeGraph } from "./utils.js"

/* Day PV */
export function _dayPV(){
    chrome.storage.local.get(null, (option)=>{
        if($(".novelview_h3").length){
            if(option.kasasagiCustomStyle){
                var m = $(".novelview_h3")
                var title = m.text().trim().match(/『(.*)』 日別\[全エピソード\] アクセス解析\(PV\)/)[2]

                $(".novelview_h3").text("日別（PV）")
                $(".novelview_h3").addClass("subtitle")
                if(title!=undefined){$(".novelview_h3").before("<div class='novelview_h3' id='title' style='margin-bottom: 10px;'>" + title + "</div>")}
            }
            
            /* Graph */
            if(option.kasasagiShowGraph_DayPV){
                $("form").after('<canvas class="access-chart" id="day_pv" style="width: 100%; margin-bottom:10px;"></canvas>')
                makeGraph("day_pv", option.kasasagiGraphType_DayPV, "日別（PV）")
            }
        }
    })
}