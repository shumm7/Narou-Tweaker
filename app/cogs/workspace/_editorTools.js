import { getSelectedContent } from "./_editor.js"

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
        if(index==0){
            var text = $('textarea[name="novel"]').selection()
            $('textarea[name="novel"]')
                .selection('insert', {text: '｜'+text+"《", mode: 'before'})
                .selection('replace', {text: 'ルビを入力…'})
                .selection('insert', {text: '》', mode: 'after'})
            $('textarea[name="novel"]').trigger("input")
        }else if(index==1){
            var text = $('textarea[name="preface"]').selection()
            $('textarea[name="preface"]')
                .selection('insert', {text: '｜'+text+"《", mode: 'before'})
                .selection('replace', {text: 'ルビを入力…'})
                .selection('insert', {text: '》', mode: 'after'})
            $('textarea[name="preface"]').trigger("input")
        }else if(index==2){
            var text = $('textarea[name="postscript"]').selection()
            $('textarea[name="postscript"]')
                .selection('insert', {text: '｜'+text+"《", mode: 'before'})
                .selection('replace', {text: 'ルビを入力…'})
                .selection('insert', {text: '》', mode: 'after'})
            $('textarea[name="postscript"]').trigger("input")
        }else if(index==3){
            var text = $('textarea[name="freememo"]').selection()
            $('textarea[name="freememo"]')
                .selection('insert', {text: '｜'+text+"《", mode: 'before'})
                .selection('replace', {text: 'ルビを入力…'})
                .selection('insert', {text: '》', mode: 'after'})
            $('textarea[name="freememo"]').trigger("input")
        }
    })
}

export function _toolRubyDot(){
    $("#nt-tools--rubydot").click(function(){
        const index = getSelectedContent()
        if(index==0){
            var text = $('textarea[name="novel"]').selection()
            $('textarea[name="novel"]')
                .selection('insert', {text: rubyDot(text), mode: 'before'})
                .selection('replace', {text: ''})
            $('textarea[name="novel"]').trigger("input")
        }else if(index==1){
            var text = $('textarea[name="preface"]').selection()
            $('textarea[name="preface"]')
                .selection('insert', {text: rubyDot(text), mode: 'before'})
                .selection('replace', {text: ''})
            $('textarea[name="preface"]').trigger("input")
        }else if(index==2){
            var text = $('textarea[name="postscript"]').selection()
            $('textarea[name="postscript"]')
                .selection('insert', {text: rubyDot(text), mode: 'before'})
                .selection('replace', {text: ''})
            $('textarea[name="postscript"]').trigger("input")
        }else if(index==3){
            var text = $('textarea[name="freememo"]').selection()
            $('textarea[name="freememo"]')
                .selection('insert', {text: rubyDot(text), mode: 'before'})
                .selection('replace', {text: ''})
            $('textarea[name="freememo"]').trigger("input")
        }
    })
}

export function _toolCovertKakuyomuRubyDot(){
    function replaceKakuyomuRubyDot(text){
        return text.replace(/《《(.*?)》》/, function(original, p){
            if(!p.match(/\n/)){
                return rubyDot(p)
            }
            return original
        })
    }

    $("#nt-tools--kakuyomu-rubydot").click(function(){
        const index = getSelectedContent()
        if(index==0){
            var text = $('textarea[name="novel"]').val()
            $('textarea[name="novel"]').val(replaceKakuyomuRubyDot(text))
            $('textarea[name="novel"]').trigger("input")
        }else if(index==1){
            var text = $('textarea[name="preface"]').val()
            $('textarea[name="preface"]').val(replaceKakuyomuRubyDot(text))
            $('textarea[name="preface"]').trigger("input")
        }else if(index==2){
            var text = $('textarea[name="postscript"]').val()
            $('textarea[name="postscript"]').val(replaceKakuyomuRubyDot(text))
            $('textarea[name="postscript"]').trigger("input")
        }else if(index==3){
            var text = $('textarea[name="freememo"]').val()
            $('textarea[name="freememo"]').val(replaceKakuyomuRubyDot(text))
            $('textarea[name="freememo"]').trigger("input")
        }
    })
}

export function _toolSasie(){
    $("#nt-tools--sasie").click(function(){
        const index = getSelectedContent()
        if(index==0){
            var text = $('textarea[name="novel"]').selection()
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
                console.log($('textarea[name="novel"]').selection())
                $('textarea[name="novel"]')
                    .selection('insert', {text: "<", mode: 'before'})
                    .selection('replace', {text: 'iコード'})
                    .selection('insert', {text: `|${userid}>`, mode: 'after'})
                $('textarea[name="novel"]').trigger("input")
            }else if(!userid && icode){
                $('textarea[name="novel"]')
                    .selection('insert', {text: `<${icode}|`, mode: 'before'})
                    .selection('replace', {text: 'ユーザID'})
                    .selection('insert', {text: `>`, mode: 'after'})
                $('textarea[name="novel"]').trigger("input")
            }else if(userid && icode){
                $('textarea[name="novel"]')
                    .selection('replace', {text: `<${icode}|${userid}>`})
                $('textarea[name="novel"]').trigger("input")
            }else{
                $('textarea[name="novel"]')
                    .selection('insert', {text: text + "<", mode: 'before'})
                    .selection('replace', {text: 'iコード'})
                    .selection('insert', {text: '|ユーザID>', mode: 'after'})
                $('textarea[name="novel"]').trigger("input")
            }
        }
    })
}