import { defaultValue } from "./misc.js";
import { narouNetwrokUrlPattern } from "./option.js";

// HTML要素の文字列置換
export function replaceUrl(_elem, isWarning) {

    function isUrlWhitelisted(url){
        const whitelist = narouNetwrokUrlPattern
        var res = false
        $.each(whitelist, function(_, value){
            if(url.match(value)){
                res = true
                return false
            }
        })
        return res
    }

    function replaceUrlHtml(str){
        let regexp_url = /((h?)(ttps?:\/\/[a-zA-Z0-9.\-_@:/~?%&;=+#',()*!]+))/g;
        let regexp_makeLink = function(all, url, h, href) {
            if(isWarning){
                if(isUrlWhitelisted(url)){
                    return '<a href="h' + href + '" target="_blank">' + url + '</a>';
                }else{
                    href = "https://mypage.syosetu.com/?jumplink=h" + encodeURI(href)
                    return '<a href="'+href+'" target="_blank">' + url + '</a>';
                }
            }else{
                return '<a href="h' + href + '" target="_blank">' + url + '</a>';
            }
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

// 記号をエスケープする（DOMインジェクション対策用）
export function escapeHtml(string){
    if(typeof string !== 'string') {
        return string;
    }
    return string.replace(/[&'`"<>]/g, function(match) {
        return {
        '&': '&amp;',
        "'": '&#x27;',
        '`': '&#x60;',
        '"': '&quot;',
        '<': '&lt;',
        '>': '&gt;',
        }[match]
    });
}

// 日付を日本語で表示（yyyy年MM月dd日）
export function getDateStringJapanese(date){
    if(date==undefined){date = new Date();}
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1);
    const day = String(date.getDate());
    return `${year}年${month}月${day}日`;
}

// 日付を表示（yyyy-MM-dd）
export function getDateString(date){
    if(date==undefined){date = new Date();}
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// 日時を表示
export function getDatetimeFromString(datetimeString){
    return new Date(datetimeString)
}

// 日付を表示（yyyy/MM/dd HH:mm:ss.SSS）
export function getDatetimeString(date){
    if(date==undefined){date = new Date();}
    return date.getFullYear() + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' +('0' + date.getDate()).slice(-2) + ' ' +  ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2) + ':' + ('0' + date.getSeconds()).slice(-2) + '.' + date.getMilliseconds();
}

// 日付を表示（yyyy/MM/dd HH:mm）
export function getDatetimeStringWithoutSecond(date){
    if(date==undefined){date = new Date();}
    return date.getFullYear() + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' +('0' + date.getDate()).slice(-2) + ' ' +  ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);
}

// 昨日の日付を取得
export function getYesterday(){
    var yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1)
    return yesterday
}

// コンマ付きの数字（文字列）を数値型に変換
export function parseIntWithComma(text){
    return parseInt(text.replace(/,/g, ""))
}

// 分を「dd日hh時間mm分」に変換
export function minuteStringJapanese(minute){
    minute = parseFloat(minute)
    if(isNaN(minute) || minute<0){
        return ``
    }

    var hour = Math.floor(minute / 60)
    minute -= (hour * 60)
    var day = Math.floor(hour / 24)
    hour -= (day * 24)

    if(hour==0){
        return `${minute}分`
    }else if(day==0 && hour > 0){
        return `${hour}時間${minute}分`
    }else{
        return `${day.toLocaleString()}日${hour}時間${minute}分`
    }
}

/* 小説家になろうの内部関数 */
/* Count Chars */
/*
関数名:	文字数を取得
引数:	strings							文字数をカウントする文字列
		shouldCountSpecialTag			特殊タグをカウントするか
		shouldCountBlankLF				空白改行文字をカウントするか
		shouldCountHTMLSpecialCharacter	HTML特殊文字をエスケープするか
*/
export function countCharacters(strings, shouldCountSpecialTag, shouldCountBlankLF, shouldCountHTMLSpecialCharacter){
	//改行コードを統一
	strings = strings.replace(/\r\n|\r/g, '\n');

	if(!shouldCountSpecialTag){
		// みてみんの画像挿入コードを除外
		strings = strings.replace(/<i[0-9]+\|[0-9]+>/g,'');

		// ルビを除外
		strings = convertRubyTags(strings, true);
		strings = strings.replace(/<rt>.*?<\/rt>/g,'');
		strings = strings.replace(/<rp>.*?<\/rp>/g,'');
		strings = strings.replace(/<ruby>/g,'');
		strings = strings.replace(/<\/ruby>/g,'');
	}

	if(!shouldCountBlankLF){
		strings = strings.replace(/\s+/g, '')
	}

	if(shouldCountHTMLSpecialCharacter){
		strings = escapeHtml(strings);
	}

	return strings.length;

}

/* Convert Ruby Tags */
// 文字列中のルビタグを相互変換
export function convertRubyTags(text, toTags, additionalKanji){

	const min = 1;							// ルビ対応可能な最小文字数
	const max = 10;							// ルビ対応可能な最大文字数
	const sticks = '\\|｜';					// 縦棒を指定
	const startBrackets = '《\\(（';			// 開始括弧とみなす記号を指定
	const endBrackets = '》\\)）';			// 終了括弧とみなす記号を指定
	const space = ' 　';						// 空白とみなす記号を指定
	const kana = 'ぁ-んァ-ヶー.・…';			// ひらがな・カタカナを範囲指定
	let alphaKanji = 'A-zＡ-ｚ一-龠';		// アルファベット・漢字を範囲指定
    if(additionalKanji){
        alphaKanji = 'A-zＡ-ｚ一-龠𠮟々ヵヶヽヾゝゞ〃仝'
    }

	var re, to;

	if(toTags){
		// 青空文庫形式の場合
		re = new RegExp('[' + sticks + ']([^' + sticks + '\n]{' + min + ',' + max + '})《([^' + sticks + '》]{' + min + ',' + max + '})》', 'g');
		to = '<ruby>$1<rp>(</rp><rt>$2</rt><rp>)</rp></ruby>';
		text = text.replace(re, to);
		
		// フリガナの開始記号が[《(（]かつ[》)）]の場合
		re = new RegExp('[' + sticks + ']([^' + startBrackets + '\n]{' + min + ',' + max + '})([' + sticks + '])([' + kana + ']{' + min + ',' + max + '})(' + endBrackets + ')', 'g');
		to = '<ruby>$1<rp>(</rp><rt>$3</rt><rp>)</rp></ruby>';
		text = text.replace(re, to);

		// ルビを振りたい文字の開始記号の縦棒がなく、フリガナが括弧で囲まれている場合
		re = new RegExp('([' + alphaKanji + ']{' + min + ',' + max + '})[' + space + ']{1}([' + alphaKanji + ']{' + min + ',' + max + '})([' + startBrackets + '])([' + kana + ']{' + min + ',' + max + '})[' + space + ']{1}([' + kana + ']{' + min + ',' + max + '})([' + endBrackets + '])', 'g');
		to = '<ruby>$1<rp>$3</rp><rt>$4</rt><rp>$6</rp></ruby>' + '　' + '<ruby>$2<rp>$3</rp><rt>$5</rt><rp>$6</rp></ruby>';
		text = text.replace(re, to);

		// カタカナ・ひらがなと一部記号のみ(縦棒+縦棒以外の任意の文字が1～10文字の場合、または縦棒なし+アルファベットor漢字が1～10文字の場合)
		re = new RegExp('(([' + sticks + ']([^' + sticks + startBrackets + endBrackets + '\n]{' + min + ',' + max + '}))|([' + alphaKanji + ']{' + min + ',' + max + '}))([' + startBrackets + '])([' + kana + ']{' + min + ',' + max + '}[' + space + ']?[' + kana + ']{0,' + max + '})([' + endBrackets + '])', 'g');
		to = '<ruby>$3$4<rp>$5</rp><rt>$6</rt><rp>$7</rp></ruby>';
		text = text.replace(re, to);

		// ルビの打ち消し
		re = new RegExp('([' + sticks + '])([' + startBrackets + '])([' + kana + ']{' + min + ',' + max + '}[' + space + ']?[' + kana + ']{0,' + max + '})([' + endBrackets + '])', 'g');
		to = '$2$3$4';
		text = text.replace(re, to);
	}else{
		re = new RegExp('<ruby>([^<>]+)<rp>[\\(（《]</rp><rt>([^<>]+)</rt><rp>[\\)）》]</rp></ruby>', 'gi');
		text = text.replace(re, '｜$1《$2》');
	}

	return text;
}

// 原稿用紙で何枚か数える
export function countManuscriptPaper(string){
	var len = countCharacters(string, false, true, false);
	var cnt = 1;
	if(len != 0){
		cnt = Math.ceil(len / 400);
	}
	
	return cnt;
}

// 行数を数える
export function countLines(string){
	string = string.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
	var cnt = string.match(/\n/g);
	if(cnt != null){
		cnt = cnt.length + 1;
	}else{
		cnt = 1;
	}
	return cnt;
}
// 自動字下げ
export function autoIndent(novel){
	var text = novel.split(/\n　+「/g);
	novel = text.join('\n「');

	novel = novel.replace(/\n([^　「『\(≪（＜<【\[{\n])/g, '\n　$1');

	novel = novel.replace(/^([^　「『\(≪（＜<【\[{])/, '　$1');

	novel = novel.replace(/\n(　)+/g, '\n　').replace(/^(　)+/g, '　');

	novel = novel.replace(/\n(　)+\n/g,'\n\n');

	return novel;
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