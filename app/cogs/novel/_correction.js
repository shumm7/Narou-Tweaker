import { check, defaultValue } from "../../utils/misc.js"
import { defaultOption } from "../../utils/option.js";
import { escapeHtml } from "../../utils/text.js";
import { checkNovelPageDetail } from "./utils.js";

const bracket_begin = `「『＜《〈≪【（”“’‘\\\(\\\'`
const bracket_end = `」』＞》〉≫】）”’\\\)\\\'`
const brackets = [
    {begin: "「", end: "」"},
    {begin: "『", end: "』"},
    {begin: "＜", end: "＞"},
    {begin: "《", end: "》"},
    {begin: "≪", end: "≫"},
    {begin: "【", end: "】"},
    {begin: "（", end: "）"},
    {begin: "”", end: "”"},
    {begin: "“", end: "”"},
    {begin: "’", end: "’"},
    {begin: "‘", end: "’"},
    {begin: "(", end: ")"},
    {begin: "'", end: "'"},
]
const symbols = `!-/:-@\\\[-\`{-~！-／：-＠［-｀｛-～、-〜”’・`
const exclamation = `！？!?‼⁇⁉⁈`

const className = {
    img: "sasie",
    talk: "kaiwabun",
    word: "jinobun"
}

export function correction(){
    if($(".p-novel__body").length && checkNovelPageDetail()=="novel"){
        chrome.storage.local.get(null, (data) => {
            resetCorrection()

            // 記号
            if(data.correctionNormalizeEllipses){
                correctionNormalizeEllipses()
            }
            if(data.correctionNormalizeDash){
                correctionNormalizeDash()
            }
            if(data.correctionNormalizeExclamation){
                correctionNormalizeExclamation()
            }
            if(data.correctionRepeatedSymbols){
                correctionRepeatedSymbols()
            }
            if(data.correctionPeriodWithBrackets){
                correctionPeriodWithBrackets()
            }
            if(data.correctionNoSpaceExclamation){
                correctionNoSpaceExclamation()
            }
            if(data.correctionOddEllipses){
                correctionOddEllipses()
            }
            if(data.correctionOddDash){
                correctionOddDash()
            }
            if(data.correctionWaveDash){
                correctionWaveDash()
            }

            // 構文
            if(data.correctionIndent){
                correctionIndent()
            }

            // 数値
            if(data.correctionNumber){
                correctionNumber({short: data.correctionNumberShort, long:data.correctionNumberLong, symbol:data.correctionNumberSymbol})
            }

            // 置換
            if(data.correctionReplacePatterns.length>0){
                correctionReplaceFromPatterns(data.correctionReplacePatterns)
            }

            // 縦書き設定
            if(data.novelVertical && data.correctionVerticalLayout_CombineWord){
                verticalLayout_CombineWord(data.correctionVerticalLayout_CombineWord)
            }
            if(data.novelVertical && data.correctionVerticalLayout_CombineNumber){
                verticalLayout_CombineNumber(data.correctionVerticalLayout_CombineNumber, data.correctionVerticalLayout_IgnoreCombineNumberInWord)
            }
            if(data.novelVertical && data.correctionVerticalLayout_CombineExclamation){
                verticalLayout_CombineExclamation(data.correctionVerticalLayout_CombineExclamation)
            }
            if(data.novelVertical && data.correctionVerticalLayout_SidewayWord){
                verticalLayout_SidewayWord(data.correctionVerticalLayout_SidewayWord)
            }
            if(data.novelVertical && data.correctionVerticalLayout_SidewayExclamation){
                verticalLayout_SidewayExclamation(data.correctionVerticalLayout_SidewayExclamation)
            }

            // その他
            if(!data.correctionShowIllustration){
                removeIllustration()
            }
            if(data.correctionRemoveIllustrationLink){
                removeIllustrationLink()
            }

        })
    }
}

export function restoreCorrectionMode(){
    chrome.storage.local.get(null, (data) => {
        check("#novel-option--correction-indent", data.correctionIndent, defaultOption.correctionIndent)
        check("#novel-option--correction-normalize-ellipses", data.correctionNormalizeEllipses, defaultOption.correctionNormalizeEllipses)
        check("#novel-option--correction-normalize-dash", data.correctionNormalizeDash, defaultOption.correctionNormalizeDash)
        check("#novel-option--correction-normalize-exclamation", data.correctionNormalizeExclamation, defaultOption.correctionNormalizeExclamation)
        check("#novel-option--correction-repeated-symbols", data.correctionRepeatedSymbols, defaultOption.correctionRepeatedSymbols)
        check("#novel-option--correction-period-with-brackets", data.correctionPeriodWithBrackets, defaultOption.correctionPeriodWithBrackets)
        check("#novel-option--correction-no-space-exclamation", data.correctionNoSpaceExclamation, defaultOption.correctionNoSpaceExclamation)
        check("#novel-option--correction-odd-ellipses", data.correctionOddEllipses, defaultOption.correctionOddEllipses)
        check("#novel-option--correction-odd-dash", data.correctionOddDash, defaultOption.correctionOddDash)
        check("#novel-option--correction-wave-dash", data.correctionWaveDash, defaultOption.correctionWaveDash)
        check("#novel-option--correction-number", data.correctionNumber, defaultOption.correctionNumber)
        check("#novel-option--correction-show-illustration", data.correctionShowIllustration, defaultOption.correctionShowIllustration)
    });
}

export function resetCorrection(){
    $(".p-novel__body p.correction-replaced").remove()
    $(".p-novel__body .p-novel__text").each(function(){
        if(!$(this).hasClass("p-novel__text--preface") && !$(this).hasClass("p-novel__text--afterword")){
            $(this).find("p").addClass("correction-original")
        }
    })
    $(".p-novel__body p.correction-original").each(function(){
        const id = $(this).prop("id")
        const text = $(this).text()
        const lineType = checkLineType(text)

        var p = $(`<p id='${id}' class='correction-replaced'>${$(this)[0].innerHTML}</p>`)
        p.addClass(lineType)

        if($(this).find("img").length){
            p.addClass(className.img)
        }

        $(this).after(p)
    })
}

function checkLineType(string){
    string = string.trim()
    if(string.match(new RegExp(`^[${symbols}\\s]*$`, "g"))){
        return ""
    }else if(string.match(new RegExp(`^\\s*[${bracket_begin}].*$`))){ //括弧で始まる文章
        var m = string.match(new RegExp(`^\\s*([${bracket_begin}])(.*)$`))
        var bracket = m[1]
        var line = m[2]

        m = line.match(new RegExp(`^.*([${bracket_end}])\\s*$`), "g")
        if(m){ //括弧で終わる
            var ret = className.word
            $.each(brackets, function(_, b){
                if(b.begin==bracket){
                    if(b.end==m[1]){
                        ret = className.talk //括弧の種類が同じ
                        return
                    }
                }
            })
            return ret
        }else if(!line.match(new RegExp(`[${bracket_end}]`))){ //括弧が含まれない
            return className.talk
        }else{
            return className.word
        }
    }else{
        return className.word
    }
}

function replaceText(_elem, regexp, replace, isReplaceAll) {
    const exceptTags = ["rp", "rt", "img"]

    function replaceHtml(str){
        if(isReplaceAll){
            return str.replaceAll(regexp, replace)
        }
        return str.replace(regexp, replace)
    }

    function isAllowedTags(tagName){
        if(tagName){
            var t = tagName.toLowerCase()
            return !(exceptTags.includes(t))
        }else{
            return true
        }
    }

    var nodes = $(_elem)[0].childNodes;
    $.each(nodes, function(_, w) {
        if(isAllowedTags(w.tagName)){
            if(w.innerHTML==undefined){
                $.each($.parseHTML(replaceHtml(w.data)), function(_, x) {
                    w.before(x);
                });
                w.remove();
            }else{
                replaceText(w, regexp, replace, isReplaceAll);
            }
        }
    });
}

function wrapTextWithTag(_elem, regexp, tag, callback, insideTag){
    function wrapHtml(str){
        var repl = str.replace(regexp, function(rpl){
            if(callback!=undefined){
                return callback(rpl, tag)
            }else{
                var t = $(tag)
                t.text(rpl)
                return t[0].outerHTML
            }
        })
        return repl
    }

    insideTag = defaultValue(insideTag, true)
    var nodes = $(_elem)[0].childNodes;
    $.each(nodes, function(_, w) {
        if(w.innerHTML==undefined){
            $.each($.parseHTML(wrapHtml(w.data)), function(_, x) {
                w.before(x);
            });
            w.remove();
        }else{
            if(insideTag){
                wrapTextWithTag(w, regexp, tag, callback, insideTag)
            }
        }
    });
}


// 校正
function correctionIndent(){
    /* 行頭の段落下げ */
    $(".p-novel__body p.correction-replaced").each(function(){
        if(!$(this).hasClass("jinobun")){return}
        var text = $(this)[0].innerHTML
        $(this)[0].innerHTML = "　" + text.match(new RegExp(`^(\\s*)(.*)`))[2]
    })
}

function correctionNormalizeEllipses(){
    /* 三点リーダー(・・・) → 三点リーダー（……） */
    $(".p-novel__body p.correction-replaced").each(function(){
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
        if($(this).text().match(/\.{3,}/)){
            $(this).after(replaceText(this, /\.{3,}/g, function(s){
                var l = s.length
                var p = 1
                if(l>=3){
                    p = Math.round(l/3)
                }
                return "……".repeat(p)
            }))
        }
    })
}

function correctionNormalizeDash(){
    /* 罫線を用いたダッシュ(─) → 全角ダッシュ（―） */
    $(".p-novel__body p.correction-replaced").each(function(){
        if($(this).text().match(/─|－|—/)){ //罫線
            $(this).after(
                replaceText(this, /─{2,}|－{2,}|—{2,}/g, function(s){
                    var l = s.length
                    return "―".repeat(l)
                })
            )
        }
    })
}

function correctionNormalizeExclamation(){
    /* 感嘆符 */
    /*
    単体の感嘆符：全角
    2つ連続する感嘆符：‼️、⁉️、⁇、⁈
    3つ以上連続する感嘆符：半角
    */
   function replaceExclamation(s){
       if(s.length==1){
           if(s=="！" || s=="？" || s=="‼" || s=="⁇" || s=="⁉" || s=="⁈"){
               return s
           }else if(s=="!"){
               return "！"
           }else if(s=="?"){
               return "？"
           }
       }else if(s.length==2){
           if(s=="!!" || s=="!！" || s=="！!" || s=="！！"){
               return "‼"
           }else if(s=="??" || s=="?？" || s=="？?" || s=="？？"){
               return "⁇"
           }else if(s=="!?" || s=="!？" || s=="！?" || s=="！？"){
               return "⁉"
           }else if(s=="?!" || s=="?！" || s=="？!" || s=="？！"){
               return "⁈"
           }
       }else{
           return s.replace(/！/g, "!").replace(/？/g, "?").replace(/‼/g, "!!").replace(/⁇/g, "??").replace(/⁉/g, "!?").replace(/⁈/g, "?!")
       }
   }

    $(".p-novel__body p.correction-replaced").each(function(){
        replaceText(this, new RegExp(`[${exclamation}]+`, "g"), replaceExclamation, true)
    })
}

function correctionRepeatedSymbols(){
    /* 句読点の繰り返し（。。/、、） */
    $(".p-novel__body p.correction-replaced").each(function(){
        if($(this).text().match(/、{2,}/)){
            replaceText(this, /[、]{2,}/g, function(s){
                return s.substr(0,1)
            })
        }
    })
}

function correctionPeriodWithBrackets(){
    /* 句点と括弧（。」） */
    $(".p-novel__body p.correction-replaced").each(function(){
        if($(this).text().match(new RegExp(`[。]([`+bracket_end+`])`))){
            replaceText(this, new RegExp(`[。]([`+bracket_end+`])`, "g"), "$1")
        }
    })
}

function correctionNoSpaceExclamation(){
    /* 空白を開けない感嘆符（！） */
    $(".p-novel__body p.correction-replaced").each(function(){
        const id = $(this).prop("id")
        if($(this).text().match( new RegExp(`([`+exclamation+`])([^　`+exclamation+bracket_end+`])`) )){
            replaceText(this, new RegExp(`([`+exclamation+`])([^　`+exclamation+bracket_end+`])`, "g"), "$1　$2")
        }
    })
}

function correctionOddEllipses(){
    /* 奇数個の三点リーダー */
    $(".p-novel__body p.correction-replaced").each(function(){
        if($(this).text().match( /…+/ )){ //三点リーダー …
            replaceText(this, /…+/g, function(s){
                if(s.length%2==1){
                    return s + "…"
                }else{
                    return s
                }
            }) 
        }
    })
}

function correctionOddDash(){
    /* 奇数個の三点ダッシュ */
    $(".p-novel__body p.correction-replaced").each(function(){
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

function correctionWaveDash(){
    /* 波ダッシュを繋げる */
    const tag = "<span class='text-sideways'>"

    $(".p-novel__body p.correction-replaced").each(function(){
        wrapTextWithTag($(this), /～{2,}/g, tag, function(s, t){
            var t = $(tag)
            t.text("〰".repeat(s.length))
            return t[0].outerHTML
        })
    })
}


// 数字表記
function correctionNumber(option){
    function convertNumber(s, numConvMode, symbolConvMode){
        const kanjiNum = "〇一二三四五六七八九"
        const fullNum = "０１２３４５６７８９"
        const halfNum = "0123456789"

        if(numConvMode=="half"){
            s = s.replace(/[０-９]/g, function(char){
                return fullNum.indexOf(char)
            })
        }else if(numConvMode=="full"){
            s = s.replace(/\d/g, function(char){
                return `${fullNum[parseInt(char)]}`
            })
        }else if(numConvMode=="kanji"){
            s = s.replace(/[０-９]/g, function(char){
                return kanjiNum[fullNum.indexOf(char)]
            }).replace(/\d/g, function(char){
                return `${kanjiNum[parseInt(char)]}`
            })
        }

        if(symbolConvMode=="half"){
            s = s.replace(/＋/g, "+").replace(/[－‐]/g, "-").replace(/．/g, ".")
        }else if(symbolConvMode=="full"){
            s = s.replace(/\+/g, "＋").replace(/\-/g, "－").replace(/\./g, "．")
        }else if(symbolConvMode=="kanji"){
            s = s.replace(/[＋+]/g, "プラス").replace(/[－‐-]/g, "マイナス").replace(/\./g, "．")
        }
        
        return s
    }

    $(".p-novel__body p.correction-replaced").each(function(){
        if($(this).text().match(/([+-]?(?:\d+\.?\d+|\.\d+|\d+)|[＋－‐+-]?(?:[０-９]+[.．]?[０-９]+|[.．][０-９]+|[０-９]+))/)){
            replaceText(this, /([+-]?(?:\d+\.?\d+|\.\d+|\d+)|[＋－‐+-]?(?:[０-９]+[.．]?[０-９]+|[.．][０-９]+|[０-９]+))/g, function(s){
                if(s.length==1 || s.match(/^[＋－‐+-.．](\d|[０-９])$/)){
                    return convertNumber(s, option.short, option.symbol)
                }else{
                    return convertNumber(s, option.long, option.symbol)
                }
            })
        }
    })
}


// 挿絵
function removeIllustration(){
    /* 挿絵の非表示 */
    $(".p-novel__body p.correction-replaced."+className.img).css("display", "none")
}

function removeIllustrationLink(){
    /* 挿絵のリンク無効化 */
    var link = $(".p-novel__body p.correction-replaced."+className.img + " a")
    link.prop("href", "javascript:void(0)")
    link.prop("target", "")
}


// 縦中横設定
function verticalLayout_CombineWord(max){
    /* 縦書き表示時の半角単語の縦中横 */
    const tag = "<span class='text-combine'>"
    var callback = (rpl, tag)=>{
        if(rpl.match(/^\d+$/)){return rpl}
        var t = $(tag)
        t.text(rpl)
        return t[0].outerHTML
    }

    $(".p-novel__body p.correction-replaced").each(function(){
        wrapTextWithTag($(this), new RegExp(`(?<![a-zA-Z\\d\.\,])[a-zA-Z\\d\.\,]{1,${max}}(?![a-zA-Z\\d\.\,])`, "g"), tag, callback)
    })
}

function verticalLayout_CombineNumber(max, ignoreCombineInWord){
    /* 縦書き表示時の数字の縦中横 */
    const tag = "<span class='text-combine'>"

    $(".p-novel__body p.correction-replaced").each(function(){
        if(ignoreCombineInWord){
            wrapTextWithTag($(this), new RegExp(`(?<![a-zA-Z\\d\\.\\,])\\d{1,${max}}(?![a-zA-Z\\d\\.\\,])`, "g"), tag)
        }else{
            wrapTextWithTag($(this), new RegExp(`(?<!\\d)\\d{1,${max}}(?!\\d)`, "g"), tag)
        }
    })
}

function verticalLayout_CombineExclamation(max){
    /* 縦書き表示時の数字の縦中横 */
    const tag = "<span class='text-combine'>"

    $(".p-novel__body p.correction-replaced").each(function(){
        wrapTextWithTag($(this), new RegExp(`(?<![!?])[!?]{1,${max}}(?![!?])`, "g"), tag)
    })
}

function verticalLayout_SidewayWord(min){
    /* 縦書き表示時の全角英数字の横向き表示 */
    const tag = "<span class='text-sideways'>"

    $(".p-novel__body p.correction-replaced").each(function(){
        wrapTextWithTag($(this), new RegExp(`[ａ-ｚＡ-Ｚ０-９．，\\s]{${min},}`, "g"), tag)
    })
}


function verticalLayout_SidewayExclamation(min){
    /* 縦書き表示時の感嘆符の横向き表示 */
    const tag = "<span class='text-sideways'>"

    $(".p-novel__body p.correction-replaced").each(function(){
        wrapTextWithTag($(this), new RegExp(`[！？‼⁇⁉⁈]{${min},}`, "g"), tag)
    })
}


/* Replace Text from Patterns */
function correctionReplaceFromPatterns(patterns){
    $.each(patterns, function(_, pattern){
        $(".p-novel__body p.correction-replaced").each(function(){
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