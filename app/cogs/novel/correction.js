import { check, defaultValue } from "../../utils/misc.js"
import { defaultOption } from "../../utils/option.js";
import { escapeHtml } from "../../utils/text.js";
import { checkNovelPageDetail } from "./utils.js";

const bracket_begin = `「『＜《〈≪【（”“’‘\\\(\\\'`
const bracket_end = `」』＞》〉≫】）”’\\\)\\\'`
const symbols = `!-/:-@\\\[-\`{-~！-／：-＠［-｀｛-～、-〜”’・`
const exclamation = `！？!?‼⁇⁉⁈`

export function correction(){
    if($("#novel_honbun").length && checkNovelPageDetail()=="novel"){
        chrome.storage.local.get(null, (data) => {
            resetCorrection()
            if(defaultValue(data.correctionNormalizeEllipses, defaultOption.correctionNormalizeEllipses)){
                correctionNormalizeEllipses()
            }
            if(defaultValue(data.correctionNormalizeDash, defaultOption.correctionNormalizeDash)){
                correctionNormalizeDash()
            }
            if(defaultValue(data.correctionRepeatedSymbols, defaultOption.correctionRepeatedSymbols)){
                correctionRepeatedSymbols()
            }
            if(defaultValue(data.correctionPeriodWithBrackets, defaultOption.correctionPeriodWithBrackets)){
                correctionPeriodWithBrackets()
            }
            if(defaultValue(data.correctionNoSpaceExclamation, defaultOption.correctionNoSpaceExclamation)){
                correctionNoSpaceExclamation()
            }
            if(defaultValue(data.correctionOddEllipsesAndDash, defaultOption.correctionOddEllipsesAndDash)){
                correctionOddEllipsesAndDash()
            }

            
            if(defaultValue(data.correctionIndent, defaultOption.correctionIndent)){
                correctionIndent()
            }

            if(defaultValue(data.correctionReplacePatterns, defaultOption.correctionReplacePatterns).length>0){
                correctionReplaceFromPatterns(defaultValue(data.correctionReplacePatterns, defaultOption.correctionReplacePatterns))
            }
        })
    }
}

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
        const text = $(this).text()
        const lineType = checkLineType(text)

        var p = $(`<p id='${id}' class='replaced'>${$(this)[0].innerHTML}</p>`)
        p.addClass(lineType)

        if($(this).find("img").length){
            p.addClass("sasie")
        }

        $(this).after(p)
    })
}

function checkLineType(string){
    string = string.trim()
    if(string.match(new RegExp(`^[${symbols}\\s]*$`, "g"))){
        return ""
    }else if(string.match(new RegExp(`^\\s*[${bracket_begin}].*$`))){ //括弧で始まる文章
        var m = string.match(new RegExp(`^\\s*[${bracket_begin}](.*)$`))[1]
        if(m.match(new RegExp(`^.*[${bracket_end}]\\s*$`), "g")){ //括弧で終わる
            return "kaiwabun"
        }else if(!m.match(new RegExp(`[${bracket_end}]`))){ //括弧が含まれない
            return "kaiwabun"
        }else{
            return "jinobun"
        }
    }else{
        return "jinobun"
    }
}

function replaceText(_elem, regexp, replace, isReplaceAll) {
    function replaceHtml(str){
        if(isReplaceAll){
            return str.replaceAll(regexp, replace)
        }
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


function correctionIndent(){
    /* 行頭の段落下げ */
    $("#novel_honbun > p.replaced").each(function(){
        if(!$(this).hasClass("jinobun")){return}
        var text = $(this)[0].innerHTML
        $(this)[0].innerHTML = "　" + text.match(new RegExp(`^(\\s*)(.*)`))[2]
    })
}

function correctionNormalizeEllipses(){
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

function correctionNormalizeDash(){
    /* 罫線を用いたダッシュ(─) → 全角ダッシュ（―） */
    $("#novel_honbun > p.replaced").each(function(){
        if($(this).text().match(/─/)){
            $(this).after(replaceText(this, /─/g, "―"))
        }
    })
}

function correctionRepeatedSymbols(){
    /* 句読点の繰り返し（。。/、、） */
    $("#novel_honbun > p.replaced").each(function(){
        if($(this).text().match(/、{2,}/)){
            replaceText(this, /[、]{2,}/g, function(s){
                return s.substr(0,1)
            })
        }
    })
}

function correctionPeriodWithBrackets(){
    /* 句点と括弧（。」） */
    $("#novel_honbun > p.replaced").each(function(){
        if($(this).text().match(new RegExp(`[。]([`+bracket_end+`])`))){
            replaceText(this, new RegExp(`[。]([`+bracket_end+`])`, "g"), "$1")
        }
    })
}

function correctionNoSpaceExclamation(){
    /* 空白を開けない感嘆符（！） */
    $("#novel_honbun > p.replaced").each(function(){
        const id = $(this).prop("id")
        if($(this).text().match( new RegExp(`([`+exclamation+`])([^　`+exclamation+bracket_end+`])`) )){
            replaceText(this, new RegExp(`([`+exclamation+`])([^　`+exclamation+bracket_end+`])`, "g"), "$1　$2")
        }
    })
}

function correctionOddEllipsesAndDash(){
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


/* Replace Text from Patterns */
function correctionReplaceFromPatterns(patterns){
    $.each(patterns, function(_, pattern){
        $("#novel_honbun > p.replaced").each(function(){
            if(pattern.active){
                if(pattern.pattern.trim().length>0){
                    if(pattern.regex){
                        replaceText(this, new RegExp(pattern.pattern, "g"), escapeHtml(pattern.replacement)) 
                    }else{
                        replaceText(this, pattern.pattern, escapeHtml(pattern.replacement), true)
                    }
                }
            }
        })
    })
}