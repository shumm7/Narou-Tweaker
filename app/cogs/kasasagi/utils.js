import { parseIntWithComma } from "../../utils/text.js";

/* Utilities */
export function getNcode(){
    try{
        return location.pathname.match('/access/.*/ncode/(.*)/')[1];
    }catch(e){
        return null
    }
}

export function makeTable(id, label, header, data){
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

export function makeGraph(_id, _graph_type, _graph_name){
    /* Value Type */
    var value_type = $(".access_header tr td.item").text().trim()

    /* Legends */
    var datasets = []
    var legends = []
    $(".access_header tr td:not(.day, .item)").each(function(_){
        var label = $(this).text().trim()
        var color = $(this).css("background-color")
        var cls = $(this).prop("class")

        $(".access_per_day tr").each(function(_){
            if($(this).find("td.graph div.progress_box div").prop("class")==cls){
                $(this).addClass(cls)
            }
        })

        datasets.push({label: label, backgroundColor: color, data: []})
        legends.push(cls)
    })

    /* Datasets */
    var labels = []
    $(".access_per_day").each(function(_){
        var table = $(this)
        labels.push(table.find("tr td.day").text().trim())
        $.each(legends, function(idx, value){
            var num = table.find("tr."+value+" td.item").text()
            if(value_type=="ユニーク"){
                var m = num.match(/(.*)人/)
                if(m==null){
                    num = 0
                }else{
                    num = parseIntWithComma(m[1])
                }
            }else if(value_type=="PV"){
                num = parseIntWithComma(num)
            }
            datasets[idx].data.push(num)
        })
    })

    $.each(datasets, function(idx, _){
        datasets[idx].data = datasets[idx].data.reverse()
    })

    /* Unit */
    var unit = ""
    if(value_type=="ユニーク"){
        unit = "人"
    }

    return new Chart(document.getElementById(_id), {
        type: _graph_type,
        data: {
            labels: labels.reverse(),
            datasets: datasets,
        },
        options: {
            plugins: {
                legend: {
                    display: true
                },
                tooltip: {
                    callbacks: {
                        label: function(p){
                            return p.dataset.label + ": " + p.raw + unit;
                        },
                        title: function(p) {
                            return _graph_name + ": " + p[0].label;
                        }
                    }
                }
            },
            scales: {
                y: {
                    ticks: {
                        callback: function(value, index){
                            return value + unit;
                        }
                    }
                },
                x: {
                    ticks: {
                        display: false,
                        //maxTicksLimit: tickCounts(max - min, 5) + 2,
                    },
                }
            },
        }
    });
}