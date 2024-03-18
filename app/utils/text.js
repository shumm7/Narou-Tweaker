export function replaceUrl(_elem) {
    function replaceUrlHtml(str){
        let regexp_url = /((h?)(ttps?:\/\/[a-zA-Z0-9.\-_@:/~?%&;=+#',()*!]+))/g;
        let regexp_makeLink = function(all, url, h, href) {
            return '<a href="h' + href + '" target="_blank">' + url + '</a>';
        }
        
        return str.replace(regexp_url, regexp_makeLink);
    }

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


/* Ncode Parse */
/* https://zenn.dev/qnighy/articles/5faa90ddfef843 */
/* By Masaki Hara (2021/07/17)*/
const RE_NCODE = /^n(\d{4})([a-z]*)$/i;

function parseBase26(s) {
    const sl = s.toLowerCase();
    let ret = 0;
    for (let i = 0; i < sl.length; i++) {
        ret = ret * 26 + (sl.charCodeAt(i) - 0x61);
    }
    return ret;
}

function stringifyBase26(n) {
    if (n === 0) return "a";
    const digits = [];
    let m = n;
    while (m > 0) {
        digits.push(m % 26 + 0x61);
        m = (m / 26) | 0;
    }
    digits.reverse();
    return String.fromCharCode(...digits);
}

export function ncodeToIndex(ncode) {
    const match = RE_NCODE.exec(ncode);
    if (!match) throw new Error(`Not an ncode: ${JSON.stringify(ncode)}`);
    const lo = parseInt(match[1], 10);
    const hi = parseBase26(match[2]);
    return hi * 9999 + lo;
}

export function indexToNcode(index) {
    const lo = (index - 1) % 9999 + 1;
    const hi = ((index - 1) / 9999) | 0;
    let lostr = lo.toString();
    while (lostr.length < 4) lostr = `0${lostr}`;
    return `n${lostr}${stringifyBase26(hi)}`;
}

export function normalizeNcode(ncode) {
    return indexToNcode(ncodeToIndex(ncode));
}