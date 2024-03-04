
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
                w.before(x);
            });
            w.remove();
        }else{
            replaceUrl(w);
        }
    });
}

export function getDateStringJapanese(date){
    if(date==undefined){date = new Date();}
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1);
    const day = String(date.getDate());
    return `${year}年${month}月${day}日`;
}

export function getDateString(date){
    if(date==undefined){date = new Date();}
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export function getDatetimeString(date){
    if(date==undefined){date = new Date();}
    return date.getFullYear() + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' +('0' + date.getDate()).slice(-2) + ' ' +  ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2) + ':' + ('0' + date.getSeconds()).slice(-2) + '.' + date.getMilliseconds();
}

export function getYesterday(){
    var yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1)
    return yesterday
}

export function parseIntWithComma(text){
    return parseInt(text.replace(/,/g, ""))
}