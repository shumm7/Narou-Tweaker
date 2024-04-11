import { addExclamationIconBalloon } from "/utils/ui.js"
import { makeGraph } from "./utils.js"

/* Month Unique */
export function _monthUnique(){
    chrome.storage.local.get(null, (option)=>{
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

            /* Graph */
            if(option.kasasagiShowGraph_DayUnique){
                $("#access_all").after('<canvas class="access-chart" id="month_unique" style="width: 100%; margin-bottom:10px;"></canvas>')
                makeGraph("month_unique", option.kasasagiGraphType_MonthUnique, "月別（ユニーク）")
            }
        }
    })
}