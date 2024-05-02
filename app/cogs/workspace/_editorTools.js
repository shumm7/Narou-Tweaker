import { autoIndent } from "../../utils/text.js"
import { getSelectedContent } from "./_editor.js"

function getForms(index){
    if(index==0){
        return 'textarea[name="novel"]'
    }else if(index==1){
        return 'textarea[name="preface"]'
    }else if(index==2){
        return 'textarea[name="postscript"]'
    }else if(index==3){
        return 'textarea[name="freememo"]'
    }
}

function rubyDot(text){
    var ret = ""
    for(let i = 0; i<text.length; i++){
        ret += `｜${text[i]}《・》`
    }
    return ret
}

export function _toolRuby(){
    $("#nt-tools--ruby").click(function(){
        const index = getSelectedContent()
        const form = getForms(index)
        if($(form).length){
            var text = $(form).selection()
            $(form)
                .selection('insert', {text: '｜'+text+"《", mode: 'before'})
                .selection('replace', {text: 'ルビを入力…'})
                .selection('insert', {text: '》', mode: 'after'})
            $(form).trigger("input")
        }
    })
}

export function _toolRubyDot(){
    $("#nt-tools--rubydot").click(function(){
        const index = getSelectedContent()
        const form = getForms(index)
        if($(form).length){
            var text = $(form).selection()
            $(form)
                .selection('insert', {text: rubyDot(text), mode: 'before'})
                .selection('replace', {text: ''})
            $(form).trigger("input")
        }
    })
}

export function _toolSasie(){
    $("#nt-tools--sasie").click(function(){
        const index = getSelectedContent()
        const form = getForms(index)
        if($(form).length){
            var text = $(form).selection()
            var url
            try{
                url = new URL(text)
            }catch(e){
                try{
                    url = new URL("https://" + text)
                }catch(e){
                    url = undefined
                }
            }

            var icode
            var userid
            if(url!=undefined){
                if(url.protocol=="https:" || url.protocol=="http:"){
                    if(url.host.match(/^[0-9]+\.mitemin\.net$/)){
                        userid = url.host.match(/^([0-9]+)\.mitemin\.net$/)[1]
                        if(url.pathname.match(/^\/i[0-9]+\/*$/)){
                            icode = url.pathname.match(/^\/(i[0-9]+)\/*$/)[1]
                        }
                    }else if(url.host.match(/^trackback\.mitemin\.net$/) && url.pathname.match(/^\/send\/image\/icode\/[0-9]+\/*$/)){
                        icode = "i" + url.pathname.match(/^\/send\/image\/icode\/([0-9]+)\/*$/)[1]
                    }
                }
                
            }

            if(userid && !icode){
                console.log($(form).selection())
                $(form).selection('insert', {text: "<", mode: 'before'})
                    .selection('replace', {text: 'iコード'})
                    .selection('insert', {text: `|${userid}>`, mode: 'after'})
                $(form).trigger("input")
            }else if(!userid && icode){
                $(form).selection('insert', {text: `<${icode}|`, mode: 'before'})
                    .selection('replace', {text: 'ユーザID'})
                    .selection('insert', {text: `>`, mode: 'after'})
                $(form).trigger("input")
            }else if(userid && icode){
                $(form).selection('replace', {text: `<${icode}|${userid}>`})
                $(form).trigger("input")
            }else{
                $(form).selection('insert', {text: text + "<", mode: 'before'})
                    .selection('replace', {text: 'iコード'})
                    .selection('insert', {text: '|ユーザID>', mode: 'after'})
                $(form).trigger("input")
            }
        }
    })
}


export function _toolSearch(){
    
}

export function _toolIndent(){
    $("#nt-tools--indent").click(function(){
        const index = getSelectedContent()
        const form = getForms(index)
        if($(form).length){
            var text = $(form).val()
            if(text.length>0){
                $(form).val(autoIndent(text))
                $(form).trigger("input")
            }
        }
    })
}

export function _toolCovertKakuyomuRubyDot(){
    function replaceKakuyomuRubyDot(text){
        return text.replace(/《《(.*?)》》/g, function(original, p){
            if(!p.match(/\n/)){
                return rubyDot(p)
            }
            return original
        })
    }

    $("#nt-tools--kakuyomu-rubydot").click(function(){
        const index = getSelectedContent()
        const form = getForms(index)
        if($(form).length){
            var text = $(form).val()
            $(form).val(replaceKakuyomuRubyDot(text))
            $(form).trigger("input")
        }
    })
}