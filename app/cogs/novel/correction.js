import { check, defaultValue } from "../../utils/misc.js"
import { defaultOption } from "../../utils/option.js";

const bracket_end = `」】』\\\]］〉》〕）\\\)〛〟»›”>`
const symbols = `！-／：-＠［-｀｛-～、-〜”’・`
const exclamation = `！？!?‼⁇⁉⁈`

export function restoreCorrectionMode(){
    chrome.storage.local.get(null, (data) => {
        check("#novel-option--correction-indent", data.correctionIndent, defaultOption.correctionIndent)
        check("#novel-option--correction-normalize-ellipses", data.correctionNormalizeEllipses, defaultOption.correctionNormalizeEllipses)
        check("#novel-option--correction-normalize-dash", data.correctionNormalizeDash, defaultOption.correctionNormalizeDash)
        check("#novel-option--correction-repeated-symbols", data.correctionRepeatedSymbols, defaultOption.correctionRepeatedSymbols)
        check("#novel-option--correction-period-with-brackets", data.correctionPeriodWithBrackets, defaultOption.correctionPeriodWithBrackets)
        check("#novel-option--correction-no-space-exclamation", data.correctionNoSpaceExclamation, defaultOption.correctionNoSpaceExclamation)
        check("#novel-option--correction-odd-ellipses-and-dash", data.correctionOddEllipsesAndDash, defaultOption.correctionOddEllipsesAndDash)
    });
}

export function resetCorrection(){
    $("#novel_honbun > p.replaced").remove()
    $("#novel_honbun > p").addClass("original")
    $("#novel_honbun > p.original").each(function(){
        const id = $(this).prop("id")
        $(this).after("<p id='"+id+"' class='replaced'>" + $(this)[0].innerHTML + "</p>")
    })
}

function replaceText(_elem, regexp, replace, func) {
    function replaceHtml(str){
        return str.replace(regexp, replace)
    }

    var nodes = $(_elem)[0].childNodes;
    $.each(nodes, function(_, w) {
        if(w.innerHTML==undefined){
            $.each($.parseHTML(replaceHtml(w.data)), function(_, x) {
                w.before(x);
            });
            w.remove();
        }else{
            replaceText(w);
        }
    });
}

export function correctionIndent(){
    /* 行頭の段落下げ */
    $("#novel_honbun > p.replaced").each(function(){
        var text = $(this).text()

        if(text.trim().length>0){
            var firstChar = text.substr(0,1)

            if(text.substr(0,1)!="　"){
                var isSymbol = firstChar.match( new RegExp(`^[`+symbols+`]+`) )
                if(isSymbol==null || text.substr(0,2)=="――" || text.substr(0,2)=="……"){
                    $(this)[0].innerHTML = "　" + $(this)[0].innerHTML
                }
            }

            
        }
    })
}

export function correctionNormalizeEllipses(){
    /* 中点を用いた三点リーダー(・・・) → 三点リーダー（……） */
    $("#novel_honbun > p.replaced").each(function(){
        if($(this).text().match(/・{2,}/)){
            $(this).after(replaceText(this, /・{2,}/g, function(s){
                var l = s.length
                var p = 1
                if(l>=2){
                    p = Math.round(l/3)
                }
                return "……".repeat(p)
            }))
        }
    })
}

export function correctionNormalizeDash(){
    /* 罫線を用いたダッシュ(─) → 全角ダッシュ（―） */
    $("#novel_honbun > p.replaced").each(function(){
        if($(this).text().match(/─/)){
            $(this).after(replaceText(this, /─/g, "―"))
        }
    })
}

export function correctionRepeatedSymbols(){
    /* 句読点の繰り返し（。。/、、） */
    $("#novel_honbun > p.replaced").each(function(){
        if($(this).text().match(/、{2,}/)){
            replaceText(this, /[、]{2,}/g, function(s){
                return s.substr(0,1)
            })
        }
    })
}

export function correctionPeriodWithBrackets(){
    /* 句点と括弧（。」） */
    $("#novel_honbun > p.replaced").each(function(){
        if($(this).text().match(new RegExp(`[。]([`+bracket_end+`])`))){
            replaceText(this, new RegExp(`[。]([`+bracket_end+`])`, "g"), "$1")
        }
    })
}

export function correctionNoSpaceExclamation(){
    /* 空白を開けない感嘆符（！） */
    $("#novel_honbun > p.replaced").each(function(){
        const id = $(this).prop("id")
        if($(this).text().match( new RegExp(`([`+exclamation+`])([^　`+exclamation+bracket_end+`])`) )){
            replaceText(this, new RegExp(`([`+exclamation+`])([^　`+exclamation+bracket_end+`])`, "g"), "$1　$2")
        }
    })
}

export function correctionOddEllipsesAndDash(){
    /* 奇数個の三点リーダー・ダッシュ */
    $("#novel_honbun > p.replaced").each(function(){
        if($(this).text().match( /…+/ )){ //三点リーダー …
            replaceText(this, /…+/g, function(s){
                if(s.length%2==1){
                    return s + "…"
                }else{
                    return s
                }
            }) 
        }

        if($(this).text().match( /―+/ )){ //全角ダッシュ ―
            replaceText(this, /―+/g, function(s){
                if(s.length%2==1){
                    return s + "―"
                }else{
                    return s
                }
            })
        }
    })
}