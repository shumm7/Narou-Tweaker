import {addInfoIcon} from "../../utils/ui.js"

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
        $("ul.p-header__mainnav-list").prepend('<li class="p-header__mainnav-item"><a href="https://syosetu.com/user/top/">ユーザーホーム</a></li>')

        /* navigation */
        header.append("<div class='p-mainheader'><div class='p-mainheader__tab'></div></div>")
        var header_nav = $(".p-mainheader__tab")
        header_nav.append('<ul class="p-mainheader__tab-list"></ul>')

        var header_nav_ul = $("ul.p-mainheader__tab-list")
        $("ul.novelview_menu li").each(function(){
            var a = $(this).children("a");
            var text = a.text().replace("[", "（").replace("]", "）")
            var a_t = text
            a[0].innerHTML = a_t
            
            
            if(a.text()=="作品TOPへ戻る"){
                $("ul.p-header__mainnav-list").append('<li class="p-header__mainnav-item">' + a[0].outerHTML +'</li>')
            }else{
                if(path==a.attr("href")){
                    header_nav_ul.append('<li class="p-mainheader__tab-list-item is-active">' + a[0].outerHTML +'</li>')
                }else{
                    header_nav_ul.append('<li class="p-mainheader__tab-list-item">' + a[0].outerHTML +'</li>')
                }
            }
        })
        $("#novel_header").remove();

        /* Footer */
        $("#container").after('<div class="l-footer"><div class="p-footer"></div></div>')
        $("#copyright").addClass("p-footer__foot")
        $("#copyright").appendTo(".p-footer")
        $("#copyright").attr("id", "")
    }

    /* Switch */
    if(path.match('/access/top/ncode/.*/')!=null){
        general();
    }else if(path.match('/access/chapter/ncode/.*/')!=null){
        if(enable_css){

            var m = $(".novelview_h3").text().match("『(.*)』 部分別 アクセス解析")
            var title = m[1]

            $(".novelview_h3").text("部分別 ユニークアクセス")
            if(title!=undefined){$(".novelview_h3").before("<div class='novelview_h3' id='title' style='margin-bottom: 10px;'>" + title + "</div>")}
            $(".novelview_h3").append($(addInfoIcon("test")))
            console.log($(addInfoIcon("test")))
        }

        chapterUnique();
    }else if(path.match('/access/daypv/ncode/.*/')!=null){
        console.log('daypv')
    }else if(path.match('/access/monthpv/ncode/.*/')!=null){
        console.log('monthpv')
    }else if(path.match('/access/dayunique/ncode/.*/')!=null){
        console.log('dayunique')
    }else if(path.match('/access/monthunique/ncode/.*/')!=null){
        console.log('monthunique')
    }


    /* General */
    function general(){

    }

    /* Chapter Unique */
    function chapterUnique(){
        if (enable_graph){
            var unit = "人"
            var old_graph = $('.chapter-graph-list');

            /* Get Data */
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
            old_graph.after(makeTable("chapter", ["部分", "ユニーク（人）"], labels, data))

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
});