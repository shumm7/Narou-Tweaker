/* Utilities */
export function getNcode(){
    return location.pathname.match('/access/.*/ncode/(.*)/')[1];
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