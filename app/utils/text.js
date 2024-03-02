
function replaceUrlHtml(str){
    let regexp_url = /((h?)(ttps?:\/\/[a-zA-Z0-9.\-_@:/~?%&;=+#',()*!]+))/g;
    let regexp_makeLink = function(all, url, h, href) {
        return '<a href="h' + href + '" target="_blank">' + url + '</a>';
    }
    return str.replace(regexp_url, regexp_makeLink);
}

export function replaceUrl(_elem) {
    var nodes = $(_elem)[0].childNodes;
    $.each(nodes, function(_, w) {
        if(w.innerHTML==undefined){
            $.each($.parseHTML(replaceUrlHtml(w.data)), function(_, x) {
                w.after(x);
            });
            w.remove();
        }else{
            replaceUrl(w);
        }
    });
}