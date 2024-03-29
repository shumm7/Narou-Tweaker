import { defaultValue } from "../../utils/misc.js"
import { localFont, localSkins, defaultOption, replacePattern } from "../../utils/option.js";
import { correction, restoreCorrectionMode } from "./correction.js";

/* Header */
export function changeHeaderScrollMode(elm){
        
    function changeMode(elm){
        chrome.storage.local.get(null, (data) => {
            const header_mode = data.novelCustomHeaderMode
            const hidden_begin = data.novelCustomHeaderScrollHidden
            if(!$(elm).length){return}

            $(elm).removeClass("header-mode--fixed")
            $(elm).removeClass("header-mode--absolute")
            $(elm).removeClass("header-mode--scroll")
            $(elm).css({"position": ""})
            $("#novelnavi_right").css({"position": ""})
            $("#novelnavi_right > *").css({"position": ""})

            if(header_mode=="fixed"){
                $(elm).addClass("header-mode--fixed")
            }else if(header_mode=="absolute"){
                $(elm).addClass("header-mode--absolute")
            }else if(header_mode=="scroll"){
                $(elm).addClass("header-mode--scroll")
                if(hidden_begin){
                    $(elm + '.header-mode--scroll').addClass('hide');
                }
            }
        })
    }
    changeMode(elm)

    var pos = $(window).scrollTop();
    $(window).on("scroll", function(){
        if(Math.abs($(this).scrollTop() - pos)>100 ){
            if($(this).scrollTop() < pos ){
                $(elm + '.header-mode--scroll').removeClass('hide'); /* Scroll Up */
                $("#novel_header_search_box.show").removeClass("show")
            }else{
                $(elm + '.header-mode--scroll').addClass('hide'); /* Scroll Down */
                $("#novel_header_search_box.show").removeClass("show")
            }
            pos = $(this).scrollTop();
        }
    });

    chrome.storage.local.onChanged.addListener(function(changes){
        if(changes.novelCustomHeaderMode!=undefined || changes.novelCustomHeaderScrollHidden!=undefined){
            changeMode(elm)
        }
    })
}

/* Skin */
export function removeDefaultSkinClass(){
    const classList = [
        "customlayout1",
        "customlayout2",
        "customlayout3",
        "customlayout4",
        "customlayout5",
        "customlayout6",
        "customlayout7",
    ]

    $.each(classList, function(_, c){
        $("."+c).each(function(){
            $(this).removeClass(c);
        });
    });

}

/* Option */
/* スキン設定のドロップダウンを設定 */
function restoreSkinOptions(skins, selected){
    skins = localSkins.concat(defaultValue(skins, defaultOption.skins))
    selected = defaultValue(selected, defaultOption.selectedSkin)

    $("#novel-option--skin #skin").empty()
    $.each(skins, function(i, skin){
        if(skin.show==true){
            $("#novel-option--skin #skin").append("<option value='"+i+"'>"+skin.name+"</option>")
        }
    })
    $("#skin").val(String(selected))
    $("#novel-option--skin-description").text(defaultValue(skins[selected], {}).description)
}

/* フォント設定の値を設定 */
function restoreFontOptions(fontFamily, fontSize, lineHeight, width){
    $(".novel-option--font-button.active").removeClass("active")
    $(".novel-option--font-button#"+defaultValue(fontFamily, defaultOption.fontFontFamily)).addClass("active")

    var fSize = defaultValue(fontSize, defaultOption.fontFontSize)
    if(fSize>0) {fSize = "+"+fSize}
    $("#novel-option--font-size-input").val(fSize)
    
    var lHeight = defaultValue(lineHeight, defaultOption.fontLineHeight)
    if(lHeight>0) {lHeight = "+"+lHeight}
    $("#novel-option--line-height-input").val(lHeight)

    var pWidth = defaultValue(width, defaultOption.fontWidth)
    $("#novel-option--page-width-input").val(Number((pWidth * 100).toFixed(1)))
}

export function setOptionContentsDisplay(id){
    chrome.storage.local.get(null, (data) => {
        var outer = $(".novel-option--content.novel-option-tab-"+id)

        /* Skin */
        outer.append(`
            <div class='novel-option--content-inner' id='option-skin'>
                <div class='novel-option-header'>スキン</div>
                <div id="novel-option--skin">
                    <div class="dropdown" style="width: 100%;">
                        <select id="skin" name="skin"></select>
                    </div>
                </div>
                <div id="novel-option--skin-description"></div>
            </div>
        `)
        restoreSkinOptions(data.skins, data.selectedSkin)

        $("#novel-option--skin #skin").on("change",() => {
            chrome.storage.local.set({selectedSkin: parseInt($("#skin").val())}, function() {})
        })

        /* Font */
        outer.append(`
            <div class='novel-option--content-inner' id='option-font'>
                <div class='novel-option-header'>本文</div>
                <div id="novel-option--text">
                    <div class='novel-option-subheader'>フォント</div>
                        <div id="novel-option--font-family">
                            <div class='novel-option--font-button' id='gothic'>
                                <div class='novel-option--font-button-box'>あ亜A</div>
                                <div class='novel-option--font-button-description'>ゴシック</div>
                            </div>
                            <div class='novel-option--font-button' id='serif'>
                                <div class='novel-option--font-button-box'>あ亜A</div>
                                <div class='novel-option--font-button-description'>明朝体</div>
                            </div>
                            <div class='novel-option--font-button' id='custom'>
                                <div class='novel-option--font-button-box'>あ亜A</div>
                                <div class='novel-option--font-button-description'>カスタム</div>
                            </div>
                        </div>
                    <div class='novel-option-subheader'>サイズ</div>
                        <div id="novel-option--font-size">
                            <div style="margin: 0 .5em;">+</div>
                            <div class="novel-option--font-number-change-button" id="novel-option--font-size-minus">-</div>
                            <input name="fontFontSize" class="novel-option--textfield" type="text" id="novel-option--font-size-input">
                            <div class="novel-option--font-number-change-button" id="novel-option--font-size-plus">+</div>
                            <div style="margin: 0 .5em;">%</div>
                        </div>
                    <div class='novel-option-subheader'>行間</div>
                        <div id="novel-option--line-height">
                            <div style="margin: 0 .5em;">+</div>
                            <div class="novel-option--font-number-change-button" id="novel-option--line-height-minus">-</div>
                            <input name="fontLineHeight" class="novel-option--textfield" type="text" id="novel-option--line-height-input">
                            <div class="novel-option--font-number-change-button" id="novel-option--line-height-plus">+</div>
                            <div style="margin: 0 .5em;">%</div>
                        </div>
                    <div class='novel-option-subheader'>横幅</div>
                        <div id="novel-option--page-width">
                            <div style="margin: 0 .5em;">×</div>
                            <div class="novel-option--font-number-change-button" id="novel-option--page-width-minus">-</div>
                            <input name="fontWidth" class="novel-option--textfield" type="text" id="novel-option--page-width-input">
                            <div class="novel-option--font-number-change-button" id="novel-option--page-width-plus">+</div>
                            <div style="margin: 0 .5em;">%</div>
                        </div>
                </div>
            </div>
        `)
        restoreFontOptions(data.fontFontFamily, data.fontFontSize, data.fontLineHeight, data.fontWidth)

        /* Font Family */
        $(".novel-option--font-button-box").click(function() {
            const key = $(this).parent().prop("id")
            $(".novel-option--font-button.active").removeClass("active")
            $(this).parent().addClass("active")

            chrome.storage.local.set({fontFontFamily: key}, () => {})
        })

        /* Font Size */
        function setFontSizeValue(value){
            if(localFont["font-size"] + value < 50){
                value = 50 - localFont["font-size"]
            }else if(localFont["font-size"] + value > 300){
                value = 300 - localFont["font-size"]
            }
            if(value>0){value = "+" + value}
            $("#novel-option--font-size-input").val(value)

            chrome.storage.local.set({fontFontSize: Number(value)}, () => {})
        }

        $("#novel-option--font-size-minus").click(function(){
            var value = Number($("#novel-option--font-size-input").val())
            if(isNaN(value)){
                value = 0
            }else{
                value = Math.floor(value) - (10 - Math.abs(Math.floor(value) % 10))
            }
            
            setFontSizeValue(value)
        })
        $("#novel-option--font-size-plus").click(function(){
            var value = Number($("#novel-option--font-size-input").val())
            if(isNaN(value)){
                value = 0
            }else{
                value = Math.floor(value) + (10 - Math.abs(Math.floor(value) % 10))
            }
            setFontSizeValue(value)
        })
        $("#novel-option--font-size-input").change(function(){
            var value = Number($("#novel-option--font-size-input").val())
            if(isNaN(value)){
                value = 0
            }
            setFontSizeValue(value)
        })

        /* Line Height */
        function setLineHeightValue(value){
            if(localFont["line-height"] + value < 50){
                value = 50 - localFont["line-height"]
            }else if(localFont["line-height"] + value > 300){
                value = 300 - localFont["line-height"]
            }
            if(value>0){value = "+" + value}
            $("#novel-option--line-height-input").val(value)

            chrome.storage.local.set({fontLineHeight: Number(value)}, () => {})
        }

        $("#novel-option--line-height-minus").click(function(){
            var value = Number($("#novel-option--line-height-input").val())
            if(isNaN(value)){
                value = 0
            }else{
                value = Math.floor(value) - (10 - Math.abs(Math.floor(value) % 10))
            }
            
            setLineHeightValue(value)
        })
        $("#novel-option--line-height-plus").click(function(){
            var value = Number($("#novel-option--line-height-input").val())
            if(isNaN(value)){
                value = 0
            }else{
                value = Math.floor(value) + (10 - Math.abs(Math.floor(value) % 10))
            }
            setLineHeightValue(value)
        })
        $("#novel-option--line-height-input").change(function(){
            var value = Number($("#novel-option--line-height-input").val())
            if(isNaN(value)){
                value = 0
            }
            setLineHeightValue(value)
        })

        /* Width */
        function setWidthValue(value){
            if(value < 0){
                value = 0
            }else if(value > 1000){
                value = 100
            }
            $("#novel-option--page-width-input").val(value)

            chrome.storage.local.set({fontWidth: Number(value)/100}, () => {})
        }

        $("#novel-option--page-width-minus").click(function(){
            var value = Number($("#novel-option--page-width-input").val())
            if(isNaN(value)){
                value = 0
            }else{
                value = Math.floor(value) - (10 - Math.abs(Math.floor(value) % 10))
            }
            
            setWidthValue(value)
        })
        $("#novel-option--page-width-plus").click(function(){
            var value = Number($("#novel-option--page-width-input").val())
            if(isNaN(value)){
                value = 0
            }else{
                value = Math.floor(value) + (10 - Math.abs(Math.floor(value) % 10))
            }
            setWidthValue(value)
        })
        $("#novel-option--page-width-input").change(function(){
            var value = Number($("#novel-option--page-width-input").val())
            if(isNaN(value)){
                value = 0
            }
            setWidthValue(value)
        })
    })

    /* Storage Listener */
    chrome.storage.local.onChanged.addListener(function(changes){
        if(changes.fontFontFamily!=undefined || changes.fontFontFamily_Custom!=undefined || changes.fontFontSize!=undefined || changes.fontLineHeight!=undefined || changes.fontTextRendering!=undefined || changes.fontWidth!=undefined){
            chrome.storage.local.get(null, (data)=>{
                restoreFontOptions(data.fontFontFamily, data.fontFontSize, data.fontLineHeight, data.fontWidth)
            })
        }
    })
}

function restoreReplacePattern(){
    chrome.storage.local.get(["correctionReplacePatterns"], function(data){
        var elementsAmount = $(".novel-option--correction-replace--pattern-box").length
        var listLength = data.correctionReplacePatterns.length
        if(listLength<elementsAmount){
            for(var i=0; i<(elementsAmount-listLength); i++){
                var idx = listLength + i
                $(".novel-option--correction-replace--pattern-box[data-for='"+idx+"']").remove()
            }
        }

        $.each(data.correctionReplacePatterns, function(idx, pattern){
            var box = $(".novel-option--correction-replace--pattern-box[data-for='"+idx+"']")
            if(!box.length){
                $("#novel-option--correction-replace--patterns").append(`
                    <div class="novel-option--correction-replace--pattern-box" data-for="`+idx+`">
                    <div class="novel-option--correction-replace--index">${idx+1}</div>
                        <div class="novel-option--correction-replace--move-buttons">
                            <div class="novel-option--correction-replace--move-front novel-option--correction-replace--icons"><i class="fa-solid fa-sort-up"></i></div>
                            <div class="novel-option--correction-replace--move-back novel-option--correction-replace--icons"><i class="fa-solid fa-sort-down"></i></div>
                        </div>
                        <div class="novel-option--correction-replace--active-button novel-option--correction-replace--icons"><i class="fa-solid fa-circle"></i></div>
                        <div class="novel-option--correction-replace--fields">
                            <input class="novel-option--correction-replace--pattern" type="text">
                            <span><i class="fa-solid fa-angles-right"></i></span>
                            <input class="novel-option--correction-replace--replacement" type="text">
                        </div>
                        <div class="novel-option--correction-replace--regex-button novel-option--correction-replace--icons"><i class="fa-solid fa-asterisk"></i></div>
                        <div class="novel-option--correction-replace--remove-button novel-option--correction-replace--icons"><i class="fa-solid fa-trash"></i></div>
                    </div>
                `)
                box = $(".novel-option--correction-replace--pattern-box[data-for='"+idx+"']")
            }

            box.find(".novel-option--correction-replace--pattern").val(pattern.pattern)
            box.find(".novel-option--correction-replace--replacement").val(pattern.replacement)
            if(pattern.regex){
                box.find(".novel-option--correction-replace--regex-button").addClass("enabled")
            }else{
                box.find(".novel-option--correction-replace--regex-button").removeClass("enabled")
            }
            if(pattern.active){
                box.find(".novel-option--correction-replace--active-button").addClass("enabled")
            }else{
                box.find(".novel-option--correction-replace--active-button").removeClass("enabled")
            }
        })

        /* Events */
        $(".novel-option--correction-replace--pattern-box .novel-option--correction-replace--move-front").on("click", function(){ // Up Button
            var idx = parseInt($(this).parent().parent().attr("data-for"))
            chrome.storage.local.get(["correctionReplacePatterns"], function(data){
                var patterns = data.correctionReplacePatterns
                if(idx>0){
                    [patterns[idx], patterns[idx-1]] = [patterns[idx-1], patterns[idx]]
                    chrome.storage.local.set({correctionReplacePatterns: patterns}, function(){})

                }
            })
        })
        $(".novel-option--correction-replace--pattern-box .novel-option--correction-replace--move-back").on("click", function(){ // Down Button
            var idx = parseInt($(this).parent().parent().attr("data-for"))
            chrome.storage.local.get(["correctionReplacePatterns"], function(data){
                var patterns = data.correctionReplacePatterns
                if(idx<patterns.length-1){
                    [patterns[idx], patterns[idx+1]] = [patterns[idx+1], patterns[idx]]
                    chrome.storage.local.set({correctionReplacePatterns: patterns}, function(){})
                }
            })
        })
        $(".novel-option--correction-replace--pattern-box .novel-option--correction-replace--regex-button").on("click", function(){ // Regex Button
            var idx = parseInt($(this).parent().attr("data-for"))
            var elm = $(this)
            chrome.storage.local.get(["correctionReplacePatterns"], function(data){
                var patterns = data.correctionReplacePatterns
                if(elm.hasClass("enabled")){
                    patterns[idx].regex = false
                }else{
                    patterns[idx].regex = true
                }
                chrome.storage.local.set({correctionReplacePatterns: patterns}, function(){})
            })
        })
        $(".novel-option--correction-replace--pattern-box .novel-option--correction-replace--active-button").on("click", function(){ // Active Button
            var idx = parseInt($(this).parent().attr("data-for"))
            var elm = $(this)
            chrome.storage.local.get(["correctionReplacePatterns"], function(data){
                var patterns = data.correctionReplacePatterns
                if(elm.hasClass("enabled")){
                    patterns[idx].active = false
                }else{
                    patterns[idx].active = true
                }
                chrome.storage.local.set({correctionReplacePatterns: patterns}, function(){})
            })
        })
        $(".novel-option--correction-replace--pattern-box .novel-option--correction-replace--remove-button").on("click", function(){ // Trash Button
            var idx = parseInt($(this).parent().attr("data-for"))
            chrome.storage.local.get(["correctionReplacePatterns"], function(data){
                var patterns = data.correctionReplacePatterns
                patterns.splice(idx, 1)
                chrome.storage.local.set({correctionReplacePatterns: patterns}, function(){})
            })
        })
        $(".novel-option--correction-replace--pattern-box .novel-option--correction-replace--pattern").on("change", function(){ // Pattern Fields
            var idx = parseInt($(this).parent().parent().attr("data-for"))
            var value = $(this).val()
            chrome.storage.local.get(["correctionReplacePatterns"], function(data){
                var patterns = data.correctionReplacePatterns
                patterns[idx].pattern = value
                chrome.storage.local.set({correctionReplacePatterns: patterns}, function(){})
            })
        })
        $(".novel-option--correction-replace--pattern-box .novel-option--correction-replace--replacement").on("change", function(){ // Replacement Fields
            var idx = parseInt($(this).parent().parent().attr("data-for"))
            var value = $(this).val()
            chrome.storage.local.get(["correctionReplacePatterns"], function(data){
                var patterns = data.correctionReplacePatterns
                patterns[idx].replacement = value
                chrome.storage.local.set({correctionReplacePatterns: patterns}, function(){})
            })
        })
    })
}

export function setOptionContentsCorrection(id){
    var outer = $(".novel-option--content.novel-option-tab-"+id)

    outer.append(`
        <div class='novel-option--content-inner' id='option-correction'>
        
            <div class='novel-option-header'>文法</div>
            <div id="novel-option--correction-syntax">
                <div class="novel-option--toggle novel-option--correction-mode">
                    <input type="checkbox" id="novel-option--correction-indent" class="correction_mode toggle" name="correctionIndent">
                    <label for="novel-option--correction-indent" class="toggle">段落下げ</label>
                </div>
            </div>

            <div class='novel-option-header'>記号</div>
            <div id="novel-option--correction-symbols">
                <div class="novel-option--toggle novel-option--correction-mode">
                    <input type="checkbox" id="novel-option--correction-normalize-ellipses" class="correction_mode toggle" name="correctionNormalizeEllipses">
                    <label for="novel-option--correction-normalize-ellipses" class="toggle">中点の三点リーダー（・・・）</label>
                </div>
                <div class="novel-option--toggle novel-option--correction-mode">
                    <input type="checkbox" id="novel-option--correction-normalize-dash" class="correction_mode toggle" name="correctionNormalizeDash">
                    <label for="novel-option--correction-normalize-dash" class="toggle">罫線のダッシュ（――）</label>
                </div>
                <div class="novel-option--toggle novel-option--correction-mode">
                    <input type="checkbox" id="novel-option--correction-repeated-symbols" class="correction_mode toggle" name="correctionRepeatedSymbols">
                    <label for="novel-option--correction-repeated-symbols" class="toggle">句読点の連続（、、）</label>
                </div>
                <div class="novel-option--toggle novel-option--correction-mode">
                    <input type="checkbox" id="novel-option--correction-period-with-brackets" class="correction_mode toggle" name="correctionPeriodWithBrackets">
                    <label for="novel-option--correction-period-with-brackets" class="toggle">括弧の後の句点（。」）</label>
                </div>
                <div class="novel-option--toggle novel-option--correction-mode">
                    <input type="checkbox" id="novel-option--correction-no-space-exclamation" class="correction_mode toggle" name="correctionNoSpaceExclamation">
                    <label for="novel-option--correction-no-space-exclamation" class="toggle">後ろに空白の無い感嘆符</label>
                </div>
                <div class="novel-option--toggle novel-option--correction-mode">
                    <input type="checkbox" id="novel-option--correction-odd-ellipses-and-dash" class="correction_mode toggle" name="correctionOddEllipsesAndDash">
                    <label for="novel-option--correction-odd-ellipses-and-dash" class="toggle">奇数の三点リーダー/ダッシュ</label>
                </div>
            </div>

            <div class='novel-option-header'>置換</div>
			<div id="novel-option--correction-replace--patterns"></div>
            <div id="novel-option--correction-replace--patterns-addition">
                <div id="novel-option--correction-replace--pattern-box-addition">
                    <i class="fa-solid fa-plus"></i>
                </div>
			</div>
        </div>
    `)

    restoreCorrectionMode()
    restoreReplacePattern()
    correction()

    /* Toggle Clicked */
    $(".correction_mode.toggle").on("click", function(e){
        var mode = {}
        mode[$(this).prop("name")] = $(this).prop("checked")

        chrome.storage.local.set(mode, function(){
            correction()
        })
    })

    /* Replacement */
    $("#novel-option--correction-replace--pattern-box-addition").on("click", function(){
        chrome.storage.local.get(["correctionReplacePatterns"], function(data){
            data.correctionReplacePatterns.push(replacePattern)
            chrome.storage.local.set({correctionReplacePatterns: data.correctionReplacePatterns}, function(){})
        })
    })

    /* Storage Listener */
    chrome.storage.local.onChanged.addListener(function(changes){
        if(changes.correctionIndent!=undefined ||
            changes.correctionNormalizeEllipses!=undefined ||
            changes.correctionNormalizeDash!=undefined ||
            changes.correctionRepeatedSymbols!=undefined ||
            changes.correctionPeriodWithBrackets!=undefined ||
            changes.correctionNoSpaceExclamation!=undefined ||
            changes.correctionOddEllipsesAndDash!=undefined ||
            changes.correctionReplacePatterns!=undefined 
        ){
            restoreCorrectionMode()
            restoreReplacePattern()
            correction()
        }
    })
    
}