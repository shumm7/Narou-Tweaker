import { saveText } from "/utils/misc.js"
import { autoIndent, escapeHtml, escapeRegex, getDatetimeStringForFilename } from "/utils/text.js"
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
            const scroll = $(".nt-editor--body").scrollTop()
            var text = $(form).selection()
            $(form)
                .selection('insert', {text: '｜'+text+"《", mode: 'before'})
                .selection('replace', {text: 'ルビを入力…'})
                .selection('insert', {text: '》', mode: 'after'})
            $(".nt-editor--body").scrollTop(scroll)
            $(form).trigger("input")
        }
    })
}

export function _toolRubyDot(){
    $("#nt-tools--rubydot").click(function(){
        const index = getSelectedContent()
        const form = getForms(index)
        if($(form).length){
            const scroll = $(".nt-editor--body").scrollTop()
            var text = $(form).selection()
            $(form)
                .selection('insert', {text: rubyDot(text), mode: 'before'})
                .selection('replace', {text: ''})
            $(".nt-editor--body").scrollTop(scroll)
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

            const scroll = $(".nt-editor--body").scrollTop()
            if(userid && !icode){
                $(form).selection('insert', {text: "<", mode: 'before'})
                    .selection('replace', {text: 'iコード'})
                    .selection('insert', {text: `|${userid}>`, mode: 'after'})
                $(".nt-editor--body").scrollTop(scroll)
                $(form).trigger("input")
            }else if(!userid && icode){
                $(form).selection('insert', {text: `<${icode}|`, mode: 'before'})
                    .selection('replace', {text: 'ユーザID'})
                    .selection('insert', {text: `>`, mode: 'after'})
                $(".nt-editor--body").scrollTop(scroll)
                $(form).trigger("input")
            }else if(userid && icode){
                $(form).selection('replace', {text: `<${icode}|${userid}>`})
                $(".nt-editor--body").scrollTop(scroll)
                $(form).trigger("input")
            }else{
                $(form).selection('insert', {text: text + "<", mode: 'before'})
                    .selection('replace', {text: 'iコード'})
                    .selection('insert', {text: '|ユーザID>', mode: 'after'})
                $(".nt-editor--body").scrollTop(scroll)
                $(form).trigger("input")
            }
        }
    })
}


export function _toolSearch(){
    let searchMode = {regex: false, word: false, case: true}
    let searchFoundIndex = 0
    let searchResult = []

    function mark(text, focusIndex){
        var ret = ""
        var startIndex = 0
        if(searchResult.length>0){
            $.each(searchResult, function(i, result){
                ret += escapeHtml(text.substring(startIndex, result.start))
                if(i==focusIndex){
                    ret += `<mark class="focused">${escapeHtml(text.substring(result.start, result.end + 1))}</mark>`
                }else{
                    ret += `<mark>${escapeHtml(text.substring(result.start, result.end + 1))}</mark>`
                }
                startIndex = result.end + 1
            })
            return ret
        }else{
            return text
        }
    }

    function createPattern(pattern){
        var regexMode = ""

        // 大文字・小文字の区別
        if(searchMode.case){regexMode = "g"}
        else{regexMode = "gi"}

        // プレーンテキスト
        if(!searchMode.regex){pattern = escapeRegex(pattern)}

        // 単語単位での検索
        if(searchMode.word){pattern = `\\b${pattern}\\b`}

        try{
            return new RegExp(pattern, regexMode)
        }catch(e){
            return 
        }
    }

    function searchPattern(text, pattern){
        var ret = []
        var startIndex = 0
        var regex = createPattern(pattern)
        if(regex){
            $.each([...text.matchAll(regex)], function(_, match){
                if(match[0].length>0){
                    const matchPosStart = match.index
                    const matchPosEnd = matchPosStart + match[0].length - 1

                    ret.push({start: matchPosStart, end: matchPosEnd})
                    startIndex = matchPosEnd + 1
                }
            })
            return ret
        }else{
            return []
        }
    }

    function nearPattern(caretPos){
        if(searchResult.length>0){
            var index
            $.each(searchResult, function(i, result){
                if(result.start>=caretPos){
                    index = i
                    return false
                }
            })
            if(index==undefined){
                return 0
            }else{
                return index
            }
        }
    }

    function moveToFocusedMark(elemBackdrop){
        var focusedElement = elemBackdrop.find(".focused")
        if(focusedElement.length){
            $(".nt-editor--body").scrollTop(focusedElement.position().top - 30)
        }
    }

    function search(isFocus){
        const index = getSelectedContent()
        const searchBox = $(".nt-search-box--field-search")
        var searchText = searchBox.val()
        const form = getForms(index)
        const prevSearchResultLength = searchResult.length

        if($(form).length){
            const caret = $(form).selection("getPos").start
            var elemBackdrop = $(form).parent().find(".nt-field--highlight")

            if(searchText.length>0){
                const text = $(form).val()
                searchResult = searchPattern(text, searchText)
                if(searchResult.length>0){
                    if(isFocus){
                        const searchFoundIndex = nearPattern(caret)
                        elemBackdrop.html(mark(text, searchFoundIndex))
                        moveToFocusedMark(elemBackdrop)
                        setCount(searchResult.length)
                    }else{
                        searchFoundIndex = nearPattern(caret)
                        elemBackdrop.html(mark(text, searchFoundIndex))
                        setCount(searchResult.length)
                    }
                }else{
                    elemBackdrop.html(mark(text))
                    searchFoundIndex = 0
                    setCount(0)
                }
            }else{
                elemBackdrop.empty()
                searchFoundIndex = 0
                setCount(0)
            }
        }else{
            searchFoundIndex = 0
            setCount(0)
        }
    }

    function replace(){
        const index = getSelectedContent()
        const replaceBox = $(".nt-search-box--field-replace")
        const searchBox = $(".nt-search-box--field-search")
        var searchText = searchBox.val()
        const replaceText = replaceBox.val()

        const form = getForms(index)
        if($(form).length && searchResult.length>0){
            var elemBackdrop = $(form).parent().find(".nt-field--highlight")

            if(searchFoundIndex==undefined){
                searchFoundIndex = nearPattern(caret)
                elemBackdrop.html(mark(text, searchFoundIndex))
                setCount(searchResult.length)
            }else{
                const text = $(form).val()
                const word = text.substring(searchResult[searchFoundIndex].start, searchResult[searchFoundIndex].end + 1)
                const pattern = createPattern(searchText)
                
                if(pattern){
                    const ret = text.substring(0, searchResult[searchFoundIndex].start)
                        + word.replace(pattern, replaceText)
                        + text.substring(searchResult[searchFoundIndex].end + 1)
                    $(form).val(ret)

                    const newCaret = searchResult[searchFoundIndex].start + replaceText.length
                    $(form).selection("setPos", {start: newCaret, end: newCaret})
                    $(form).trigger("input")

                    searchResult = searchPattern(ret, searchText)
                    replaceBox.selection("setPos", {start: replaceText.length, end: replaceText.length})

                    if(searchResult.length>0){
                        if(searchFoundIndex>=searchResult.length){
                            searchFoundIndex = searchResult.length - 1
                        }
                        setCount(searchResult.length)
                        moveToFocusedMark(elemBackdrop)
                    }else{
                        elemBackdrop.empty()
                        searchFoundIndex = 0
                        setCount(0)
                    }
                }else{
                    searchFoundIndex = undefined
                    setCount(0)
                }
            }
        }else{
            searchFoundIndex = 0
            setCount(0)
        }
    }

    function replaceAll(){
        const index = getSelectedContent()
        const replaceBox = $(".nt-search-box--field-replace")
        const searchBox = $(".nt-search-box--field-search")
        var searchText = searchBox.val()
        const replaceText = replaceBox.val()

        const form = getForms(index)
        if($(form).length && searchResult.length>0){
            var elemBackdrop = $(form).parent().find(".nt-field--highlight")

            var ret = ""
            let i = 0
            const text = $(form).val()
            const pattern = createPattern(searchText)

            if(pattern){
                $.each(searchResult, function(n, result){
                    var next
                    if(n+1<searchResult.length){
                        next = searchResult[n+1].start
                    }
                    
                    const word = text.substring(result.start, result.end + 1)
                    ret += text.substring(i, result.start)
                        + word.replace(pattern, replaceText)
                        + text.substring(result.end + 1, next)
                    i = next
                })
                $(form).val(ret)
                $(form).trigger("input")

                searchResult = searchPattern(ret, searchText)
                replaceBox.selection("setPos", {start: replaceText.length, end: replaceText.length})

                searchFoundIndex = 0
                if(searchResult.length>0){
                    if(searchFoundIndex>=searchResult.length){
                        searchFoundIndex = searchResult.length - 1
                    }
                    setCount(searchResult.length)
                }else{
                    elemBackdrop.empty()
                    searchFoundIndex = 0
                    setCount(0)
                }
            }else{
                searchFoundIndex = undefined
                setCount(0)
            }
        }else{
            searchFoundIndex = 0
            setCount(0)
        }
    }

    function setCount(max){
        var current = searchFoundIndex
        if(current==undefined){
            current = "?"
        }else{
            if(max>0){
                current += 1
            }else{
                current = 0
            }
        }
        $(".nt-search-box--count").text(`${current} / ${max}`)
    }

    function doSearchAction(){
        if(searchResult.length>0){
            const index = getSelectedContent()
            const form = getForms(index)

            if($(form).length){
                searchFoundIndex = nearPattern($(form).selection("getPos").start)
                if(searchFoundIndex<0){searchFoundIndex = searchResult.length-1}

                const text = $(form).val()
                var elemBackdrop = $(form).parent().find(".nt-field--highlight")
                elemBackdrop.html(mark(text, searchFoundIndex))
                moveToFocusedMark(elemBackdrop)
                setCount(searchResult.length)
            }
        }
    }
    
    // Initialize DOM
    $(".c-form__textarea").each(function(){
        const name = $(this).attr("name")
        $(this).wrap(`<div class="nt-field--wrapper" name="${name}"></div>`)
        $(this).before($(`
            <div class="nt-field--backdrop">
                <div class="nt-field--highlight"></div>
            </div>
        `))
    })
    setCount(0)
    if(searchMode.case){$(".nt-search-box--mode-case").addClass("nt-active")}
    if(searchMode.word){$(".nt-search-box--mode-word").addClass("nt-active")}
    if(searchMode.regex){$(".nt-search-box--mode-regex").addClass("nt-active")}


    // Button Clicked 
    $("#nt-tools--search").click(function(){
        if(getSelectedContent()!=4){
            $(".nt-search-box").removeClass("nt-content-hidden")
            const initialPos = $(".nt-search-box").offset()
            const l = $(".nt-search-box--field-search").val().length
            $(".nt-search-box--field-search").selection("setPos", {start: Math.max(0, l-1), end: Math.max(0, l-1)})
            doSearchAction()
        }
    })
    $("body").keydown(function(e){
        if (((e.ctrlKey || e.metaKey) && e.key == 'f') || (e.key == 'F3')) {
            e.preventDefault();
            if(getSelectedContent()!=4){
                if($(".nt-search-box").hasClass("nt-content-hidden")){
                    $(".nt-search-box").removeClass("nt-search-box--open")
                    $(".nt-search-box").addClass("nt-search-box--close")
                }
                $(".nt-search-box").removeClass("nt-content-hidden")
                const initialPos = $(".nt-search-box").offset()
                const l = $(".nt-search-box--field-search").val().length
                $(".nt-search-box--field-search").selection("setPos", {start: l, end: l})
                doSearchAction()
            }
        }else if ((e.ctrlKey || e.metaKey) && e.key == 'h') {
            e.preventDefault();
            if(getSelectedContent()!=4){
                $(".nt-search-box").removeClass("nt-search-box--close")
                $(".nt-search-box").addClass("nt-search-box--open")
                $(".nt-search-box").removeClass("nt-content-hidden")
                const initialPos = $(".nt-search-box").offset()
                const l = $(".nt-search-box--field-replace").val().length
                $(".nt-search-box--field-replace").selection("setPos", {start: l, end: l})
                doSearchAction()
                $("")
            }
        }
    })
    $(".nt-editor--footer-tab-item[data='4']").on("click", function(){
        $(".nt-search-box--close-self").trigger("click")
    })

    
    // Input Event
    $(".c-form__textarea").on("input", function(){
        if(!$(".nt-search-box").hasClass("nt-content-hidden")){
            search(false)
        }
    })
    $(".nt-search-box--field-search").on("input", function(){
        search(true)
    })

    // Button Event
    $(".nt-search-box--open-replace").click(function(){ //Open Replace mode
        if($(".nt-search-box").hasClass("nt-search-box--close")){
            $(".nt-search-box").removeClass("nt-search-box--close")
            $(".nt-search-box").addClass("nt-search-box--open")
        }else{
            $(".nt-search-box").removeClass("nt-search-box--open")
            $(".nt-search-box").addClass("nt-search-box--close")
        }
    })
    $(".nt-search-box--close-self").click(function(){ // Close Button
        $(".nt-search-box").addClass("nt-content-hidden")
        //$(".nt-search-box").removeClass("nt-search-box--open")
        //$(".nt-search-box").addClass("nt-search-box--close")
        $(".nt-search-box--field-search").trigger("input")
        searchFoundIndex = undefined
        $(".nt-field--highlight").empty()
    })
    $(".nt-search-box--prev-index").click(function(){ // Prev Button
        if(searchResult.length>0){
            const index = getSelectedContent()
            const form = getForms(index)

            if($(form).length){
                if(searchFoundIndex==undefined){searchFoundIndex = nearPattern($(form).selection("getPos").start)}
                else{searchFoundIndex -= 1}
                if(searchFoundIndex<0){searchFoundIndex = searchResult.length-1}

                const text = $(form).val()
                var elemBackdrop = $(form).parent().find(".nt-field--highlight")
                elemBackdrop.html(mark(text, searchFoundIndex))
                moveToFocusedMark(elemBackdrop)
                setCount(searchResult.length)
            }
        }
    })
    $(".nt-search-box--next-index").click(function(){ // Next Button
        if(searchResult.length>0){
            const index = getSelectedContent()
            const form = getForms(index)

            if($(form).length){
                if(searchFoundIndex==undefined){searchFoundIndex = nearPattern($(form).selection("getPos").start)}
                else{searchFoundIndex += 1}
                if(searchFoundIndex>=searchResult.length){searchFoundIndex = 0}

                const text = $(form).val()
                var elemBackdrop = $(form).parent().find(".nt-field--highlight")
                elemBackdrop.html(mark(text, searchFoundIndex))
                moveToFocusedMark(elemBackdrop)
                setCount(searchResult.length)
            }
        }
    })
    
    $('.nt-search-box--field-search').keydown(function(e){ // Enter Key (Same as Next Button) / Tab Key
        if(e.key == 'Enter') {
            e.preventDefault()
            $(".nt-search-box--next-index").trigger("click")
            return false;
        }
        else if(e.key == 'Tab' && $(".nt-search-box").hasClass("nt-search-box--open")) {
            e.preventDefault()
            const l = $(".nt-search-box--field-replace").val().length
            $(".nt-search-box--field-replace").selection("setPos", {start: l, end: l})
            return false;
        }
    });
    $(".nt-search-box--mode-case").click(function(){ // Mode - Case
        if($(this).hasClass("nt-active")){
            $(this).removeClass("nt-active")
            searchMode.case = false
        }else{
            $(this).addClass("nt-active")
            searchMode.case = true
        }
        search(false)
    })
    $(".nt-search-box--mode-word").click(function(){ // Mode - Word
        if($(this).hasClass("nt-active")){
            $(this).removeClass("nt-active")
            searchMode.word = false
        }else{
            $(this).addClass("nt-active")
            searchMode.word = true
        }
        search(false)
    })
    $(".nt-search-box--mode-regex").click(function(){ // Mode - Regex
        if($(this).hasClass("nt-active")){
            $(this).removeClass("nt-active")
            searchMode.regex = false
        }else{
            $(this).addClass("nt-active")
            searchMode.regex = true
        }
        search(false)
    })
    $(".nt-search-box--replace-each").click(function(){
        replace()
    })
    
    $('.nt-search-box--field-replace').keydown(function(e){ // Enter Key (Same as Replace Button) / Tab Key
        if(e.key == "Enter") {
            e.preventDefault()
            $(".nt-search-box--replace-each").trigger("click")
            return false;
        }
        else if(e.key == "Tab") {
            e.preventDefault()
            const l = $(".nt-search-box--field-search").val().length
            $(".nt-search-box--field-search").selection("setPos", {start: l, end: l})
            return false;
        }
    });
    $(".nt-search-box--replace-all").click(function(){
        replaceAll()
    })


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

export function _toolExportEach(){
    $("#nt-tools--export-each").click(function(){
        const index = getSelectedContent()
        const form = getForms(index)
        if($(form).length){
            var name = $(form).attr("name")
            var text = $(form).val()
            saveText(text, `${name}-${getDatetimeStringForFilename()}.txt`)
        }
    })
}

export function _toolExportAll(){
    $("#nt-tools--export-all").click(function(){
        var name = "all"
        var text = ""
        text += `【タイトル】\n${$("input[name='subtitle']").val()}\n\n\n\n`
        text += `【本文】\n${$("textarea[name='novel']").val()}\n\n\n\n`
        text += `【前書き】\n${$("textarea[name='preface']").val()}\n\n\n\n`
        text += `【後書き】\n${$("textarea[name='postscript']").val()}\n\n\n\n`
        text += `【フリーメモ】\n${$("textarea[name='freememo']").val()}`
        saveText(text, `${name}-${getDatetimeStringForFilename()}.txt`)
    })
}

export function _toolCorrection(){


    function rubyCheck(){
		// 青空文庫形式の場合
        // [\|｜]([^\|｜\n]{1,10})《([^\|｜》]{1,10})》
        re = new RegExp('[' + sticks + ']([^' + sticks + '\n]{' + min + ',' + max + '})《([^' + sticks + '》]{' + min + ',' + max + '})》', 'g');
		to = '<ruby>$1<rp>(</rp><rt>$2</rt><rp>)</rp></ruby>';
		text = text.replace(re, to);
		
		// フリガナの開始記号が[《(（]かつ[》)）]の場合
        // [\|｜]([^《\(（\n]{1,10})([\|｜])([ぁ-んァ-ヶー.・…]{1,10})(》\)）)
		re = new RegExp('[' + sticks + ']([^' + startBrackets + '\n]{' + min + ',' + max + '})([' + sticks + '])([' + kana + ']{' + min + ',' + max + '})(' + endBrackets + ')', 'g');
		to = '<ruby>$1<rp>(</rp><rt>$3</rt><rp>)</rp></ruby>';
		text = text.replace(re, to);

		// ルビを振りたい文字の開始記号の縦棒がなく、フリガナが括弧で囲まれている場合
        // ([A-zＡ-ｚ一-龠]{1,10})[ 　]{1}([A-zＡ-ｚ一-龠]{1,10})([《\(（])([ぁ-んァ-ヶー.・…]{1,10})[ 　]{1}([ぁ-んァ-ヶー.・…]{1,10})([》\)）])
		re = new RegExp('([' + alphaKanji + ']{' + min + ',' + max + '})[' + space + ']{1}([' + alphaKanji + ']{' + min + ',' + max + '})([' + startBrackets + '])([' + kana + ']{' + min + ',' + max + '})[' + space + ']{1}([' + kana + ']{' + min + ',' + max + '})([' + endBrackets + '])', 'g');
        to = '<ruby>$1<rp>$3</rp><rt>$4</rt><rp>$6</rp></ruby>' + '　' + '<ruby>$2<rp>$3</rp><rt>$5</rt><rp>$6</rp></ruby>';
		text = text.replace(re, to);

		// カタカナ・ひらがなと一部記号のみ(縦棒+縦棒以外の任意の文字が1～10文字の場合、または縦棒なし+アルファベットor漢字が1～10文字の場合)
        // (([\|｜]([^\|｜《\(（》\)）\n]{1,10}))|([A-zＡ-ｚ一-龠]{1,10}))([《\(（])([ぁ-んァ-ヶー.・…]{1,10}[ 　]?[ぁ-んァ-ヶー.・…]{0,10})([》\)）])
		re = new RegExp('(([' + sticks + ']([^' + sticks + startBrackets + endBrackets + '\n]{' + min + ',' + max + '}))|([' + alphaKanji + ']{' + min + ',' + max + '}))([' + startBrackets + '])([' + kana + ']{' + min + ',' + max + '}[' + space + ']?[' + kana + ']{0,' + max + '})([' + endBrackets + '])', 'g');
        to = '<ruby>$3$4<rp>$5</rp><rt>$6</rt><rp>$7</rp></ruby>';
		text = text.replace(re, to);

		// ルビの打ち消し
        // ([\|｜])([《\(（])([ぁ-んァ-ヶー.・…]{1,10}[ 　]?[ぁ-んァ-ヶー.・…]{0,10})([》\)）])
		re = new RegExp('([' + sticks + '])([' + startBrackets + '])([' + kana + ']{' + min + ',' + max + '}[' + space + ']?[' + kana + ']{0,' + max + '})([' + endBrackets + '])', 'g');
        to = '$2$3$4';
		text = text.replace(re, to);
    }
}