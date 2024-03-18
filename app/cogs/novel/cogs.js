import { defaultValue } from "../../utils/misc.js"
import { defaultSkins } from "../../utils/data/default_skins.js";
import { saveSkin, saveFont } from "../../utils/option.js";
import { defaultFont, defaultFontSettings } from "../../utils/data/default_font.js";
import { correctionIndent, correctionNoSpaceExclamation, correctionNormalizeDash, correctionNormalizeEllipses, correctionOddEllipsesAndDash, correctionPeriodWithBrackets, correctionRepeatedSymbols, resetCorrection, restoreCorrectionMode } from "./correction.js";

/* Header */
export function changeHeaderScrollMode(header_mode, elm, hidden_begin){
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

    var pos = $(window).scrollTop();
    $(window).on("scroll", function(){
        if(Math.abs($(this).scrollTop() - pos)>100 ){
            if($(this).scrollTop() < pos ){
                $(elm + '.header-mode--scroll').removeClass('hide'); /* Scroll Up */
            }else{
                $(elm + '.header-mode--scroll').addClass('hide'); /* Scroll Down */
                $("li.search.show").removeClass("show")
            }
            pos = $(this).scrollTop();
        }
    });
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

export function applySkin(index, font){
    chrome.runtime.sendMessage({action: "apply_skin", format: "json", data: {index: index,font: font}}, function(response){
        
    });
}

/* Option */
function setSkinOptions(skins, selected){
    skins = defaultValue(skins, defaultSkins)
    selected = defaultValue(selected, 0)

    $("#novel-option--skin #skin").empty()
    $.each(skins, function(i, skin){
        if(skin.show==true){
            $("#novel-option--skin #skin").append("<option value='"+i+"'>"+skin.name+"</option>")
        }
    })
    $("#skin").val(String(selected))
    $("#novel-option--skin-description").text(defaultValue(skins[selected], {}).description)
}

export function setOptionContentsDisplay(){
    chrome.storage.local.get(["applied_skin", "applied_font", "skins"], (data) => {
        var outer = $(".novel-option--content.novel-option-tab-1")

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
        setSkinOptions(defaultValue(data.skins, defaultSkins), defaultValue(data.applied_skin, 0))

        $("#novel-option--skin #skin").on("change",() => {
            var skin = parseInt($("#skin").val())
            saveSkin(skin)
            applySkin(skin)
            chrome.storage.local.get(["applied_skin", "skins"], function(data) {
                setSkinOptions(defaultValue(data.skins, defaultSkins), defaultValue(data.applied_skin, 0))
            })
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
                            <div class="novel-option--font-number-change-button" id="novel-option--font-size-minus">-</div>
                            <input name="novel-option--font-size-input" class="novel-option--textfield" type="text" id="novel-option--font-size-input" min="-100" max="200">
                            <div class="novel-option--font-number-change-button" id="novel-option--font-size-plus">+</div>
                            <div style="margin: 0 .5em;">%</div>
                        </div>
                    <div class='novel-option-subheader'>字間</div>
                        <div id="novel-option--line-height">
                            <div class="novel-option--font-number-change-button" id="novel-option--line-height-minus">-</div>
                            <input name="novel-option--line-height-input" class="novel-option--textfield" type="text" id="novel-option--line-height-input" min="-100" max="200">
                            <div class="novel-option--font-number-change-button" id="novel-option--line-height-plus">+</div>
                            <div style="margin: 0 .5em;">%</div>
                        </div>
                </div>
            </div>
        `)

        var font = defaultValue(data.applied_font, defaultFont)

        /* Font Family */
        $(".novel-option--font-button#"+font["font-family"]).addClass("active")

        $(".novel-option--font-button-box").click(function() {
            const key = $(this).parent().prop("id")
            $(".novel-option--font-button.active").removeClass("active")
            $(this).parent().addClass("active")
            chrome.storage.local.get(["applied_font"], (data) => {
                var font = defaultValue(data.applied_font, defaultFont)
                font["font-family"] = key
                saveFont(font)
                applySkin(undefined, font)
            })
        })

        /* Font Size */
        var fSize = defaultValue(font["font-size"], 0)
        if(fSize>0) {fSize = "+"+fSize}
        $("#novel-option--font-size-input").val(fSize)

        function setFontSizeValue(value){
            if(defaultFontSettings["font-size"] + value < 50){
                value = 50 - defaultFontSettings["font-size"]
            }else if(defaultFontSettings["font-size"] + value > 300){
                value = 300 - defaultFontSettings["font-size"]
            }
            if(value>0){value = "+" + value}
            $("#novel-option--font-size-input").val(value)
            chrome.storage.local.get(["applied_font"], (data) => {
                var font = defaultValue(data.applied_font, defaultFont)
                font["font-size"] = Number(value)
                saveFont(font)
                applySkin(undefined, font)
            });
        }

        $("#novel-option--font-size-minus").click(function(){
            var value = Number($("#novel-option--font-size-input").val())
            if(isNaN(value)){
                value = 0
            }else{
                value -= 10 - Math.abs(value % 10)
            }
            
            setFontSizeValue(value)
        })
        $("#novel-option--font-size-plus").click(function(){
            var value = Number($("#novel-option--font-size-input").val())
            if(isNaN(value)){
                value = 0
            }else{
                value += 10 - Math.abs(value % 10)
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
        var lHeight = defaultValue(font["line-height"], 0)
        if(lHeight>0) {lHeight = "+"+lHeight}
        $("#novel-option--line-height-input").val(lHeight)

        function setLineHeightValue(value){
            if(defaultFontSettings["line-height"] + value < 50){
                value = 50 - defaultFontSettings["line-height"]
            }else if(defaultFontSettings["line-height"] + value > 300){
                value = 300 - defaultFontSettings["line-height"]
            }
            if(value>0){value = "+" + value}
            $("#novel-option--line-height-input").val(value)
            chrome.storage.local.get(["applied_font"], (data) => {
                var font = defaultValue(data.applied_font, defaultFont)
                font["line-height"] = Number(value)
                saveFont(font)
                applySkin(undefined, font)
            })
        }

        $("#novel-option--line-height-minus").click(function(){
            var value = Number($("#novel-option--line-height-input").val())
            if(isNaN(value)){
                value = 0
            }else{
                value -= 10 - Math.abs(value % 10)
            }
            
            setLineHeightValue(value)
        })
        $("#novel-option--line-height-plus").click(function(){
            var value = Number($("#novel-option--line-height-input").val())
            if(isNaN(value)){
                value = 0
            }else{
                value += 10 - Math.abs(value % 10)
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
    })
}

export function setOptionContentsCorrection(){
    chrome.storage.local.get(["correction_mode"], (data) => {
        var outer = $(".novel-option--content.novel-option-tab-2")

        outer.append(`
            <div class='novel-option--content-inner' id='option-correction'>
            
                <div class='novel-option-header'>文法</div>
                <div id="novel-option--correction-syntax">
                    <div class="novel-option--toggle novel-option--correction-mode">
                        <input type="checkbox" id="novel-option--correction-indent" class="correction_mode toggle" name="indent">
                        <label for="novel-option--correction-indent" class="toggle">段落下げ</label>
                    </div>
                </div>

                <div class='novel-option-header'>記号</div>
                <div id="novel-option--correction-symbols">
                    <div class="novel-option--toggle novel-option--correction-mode">
                        <input type="checkbox" id="novel-option--correction-normalize-ellipses" class="correction_mode toggle" name="normalize_ellipses">
                        <label for="novel-option--correction-normalize-ellipses" class="toggle">中点の三点リーダー（・・・）</label>
                    </div>
                    <div class="novel-option--toggle novel-option--correction-mode">
                        <input type="checkbox" id="novel-option--correction-normalize-dash" class="correction_mode toggle" name="normalize_dash">
                        <label for="novel-option--correction-normalize-dash" class="toggle">罫線のダッシュ（――）</label>
                    </div>
                    <div class="novel-option--toggle novel-option--correction-mode">
                        <input type="checkbox" id="novel-option--correction-repeated-symbols" class="correction_mode toggle" name="repeated_symbols">
                        <label for="novel-option--correction-repeated-symbols" class="toggle">句読点の連続（、、）</label>
                    </div>
                    <div class="novel-option--toggle novel-option--correction-mode">
                        <input type="checkbox" id="novel-option--correction-period-with-brackets" class="correction_mode toggle" name="period_with_brackets">
                        <label for="novel-option--correction-period-with-brackets" class="toggle">括弧の後の句読点（。」）</label>
                    </div>
                    <div class="novel-option--toggle novel-option--correction-mode">
                        <input type="checkbox" id="novel-option--correction-no-space-exclamation" class="correction_mode toggle" name="no_space_exclamation">
                        <label for="novel-option--correction-no-space-exclamation" class="toggle">後ろに空白の無い感嘆符</label>
                    </div>
                    <div class="novel-option--toggle novel-option--correction-mode">
                        <input type="checkbox" id="novel-option--correction-odd-ellipses-and-dash" class="correction_mode toggle" name="odd_ellipses_and_dash">
                        <label for="novel-option--correction-odd-ellipses-and-dash" class="toggle">奇数の三点リーダー/ダッシュ</label>
                    </div>
                </div>
            </div>
        `)

        restoreCorrectionMode()
        correction(data.correction_mode)
        $(".correction_mode.toggle").on("click", function(e){
            var mode_settings = {}
            $(".correction_mode.toggle").each(function(){
                mode_settings[$(this).prop("name")] = $(this).prop("checked")
            })
            chrome.storage.local.set({"correction_mode": mode_settings}, function(){
                correction(mode_settings)
            })
        })

        function correction(mode){
            if(location.pathname.match(/^\/[n|N]\d{4}[a-zA-Z]{2}\/\d+\/*$/)){
                var mode = defaultValue(mode, {})

                resetCorrection()
                if(defaultValue(mode.normalize_ellipses, false)){
                    correctionNormalizeEllipses()
                }
                if(defaultValue(mode.normalize_dash, false)){
                    correctionNormalizeDash()
                }
                if(defaultValue(mode.repeated_symbols, false)){
                    correctionRepeatedSymbols()
                }
                if(defaultValue(mode.period_with_brackets, false)){
                    correctionPeriodWithBrackets()
                }
                if(defaultValue(mode.no_space_exclamation, false)){
                    correctionNoSpaceExclamation()
                }
                if(defaultValue(mode.odd_ellipses_and_dash, false)){
                    correctionOddEllipsesAndDash()
                }

                
                if(defaultValue(mode.indent, false)){
                    correctionIndent()
                }
            }
        }
    })


    
}