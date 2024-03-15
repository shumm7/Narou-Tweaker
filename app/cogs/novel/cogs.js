import { defaultValue } from "../../utils/misc.js"
import { defaultSkins } from "../../utils/data/default_skins.js";
import { saveSkin, saveFont } from "../../utils/option.js";
import { defaultFont, defaultFontSettings } from "../../utils/data/default_font.js";

/* Header */
export function changeHeaderScrollMode(header_mode, elm){
    if(!$(elm).length){return}

    $(elm).removeClass("header-mode--fixed")
    $(elm).removeClass("header-mode--absolute")
    $(elm).removeClass("header-mode--scroll")
    $(elm).css({"position": ""})

    if(header_mode=="fixed"){
        $(elm).addClass("header-mode--fixed")
    }else if(header_mode=="absolute"){
        $(elm).addClass("header-mode--absolute")
    }else if(header_mode=="scroll"){
        $(elm).addClass("header-mode--scroll")
        $(elm + '.header-mode--scroll').addClass('hide');
    }

    var pos = 0;
    $(window).on("scroll", function(){
        if($(this).scrollTop() < pos ){
            $(elm + '.header-mode--scroll').removeClass('hide'); /* Scroll Up */
        }else{
            $(elm + '.header-mode--scroll').addClass('hide'); /* Scroll Down */
        }
        pos = $(this).scrollTop();
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
    chrome.runtime.sendMessage(
        {
            action: "apply_skin",
            data: {
                index: index,
                font: font
            }
        }
    );
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
    chrome.storage.sync.get(["applied_skin", "applied_font", "skins"], (data) => {
        var outer = $(".novel-option--content.novel-option-tab-1")

        /* Skin */
        outer.append("<div class='novel-option--content-inner' id='option-skin'></div>")
        var box = $(".novel-option--content-inner#option-skin")
        box.append(`
            <div class='novel-option-header'>スキン</div>
            <div id="novel-option--skin">
                <div class="dropdown" style="width: 100%;">
                    <select id="skin" name="skin"></select>
                </div>
            </div>
            <div id="novel-option--skin-description"></div>
        `)
        setSkinOptions(defaultValue(data.skins, defaultSkins), defaultValue(data.applied_skin, 0))

        $("#novel-option--skin #skin").on("change",() => {
            var skin = parseInt($("#skin").val())
            saveSkin(skin)
            applySkin(skin)
            chrome.storage.sync.get(["applied_skin", "skins"], function(data) {
                setSkinOptions(defaultValue(data.skins, defaultSkins), defaultValue(data.applied_skin, 0))
            })
        })

        /* Font */
        outer.append("<div class='novel-option--content-inner' id='option-font'></div>")
        var box = $(".novel-option--content-inner#option-font")
        box.append(`
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
            </div>
        `)

        var font = defaultValue(data.applied_font, defaultFont)

        /* Font Family */
        $(".novel-option--font-button#"+font["font-family"]).addClass("active")

        $(".novel-option--font-button-box").click(function() {
            const key = $(this).parent().prop("id")
            $(".novel-option--font-button.active").removeClass("active")
            $(this).parent().addClass("active")
            font["font-family"] = key
            saveFont(font)
            applySkin(undefined, font)
        })

        /* Font Size */
        var size = defaultValue(font["font-size"], 0)
        if(size>0) {size = "+"+size}
        $("#novel-option--font-size-input").val(size)
        function setFontSizeValue(size){
            if(defaultFontSettings["font-size"] + size < 0){
                size = -defaultFontSettings["font-size"]
            }else if(defaultFontSettings["font-size"] + size > 300){
                size = 300 - defaultFontSettings["font-size"]
            }
            if(size>0){size = "+" + size}
            $("#novel-option--font-size-input").val(size)
            font["font-size"] = Number(size)
            saveFont(font)
            applySkin(undefined, font)
        }

        $("#novel-option--font-size-minus").click(function(){
            var size = Number($("#novel-option--font-size-input").val())
            if(isNaN(size)){
                size = 0
            }else{
                size -= 10 - Math.abs(size % 10)
            }
            
            setFontSizeValue(size)
        })
        $("#novel-option--font-size-plus").click(function(){
            var size = Number($("#novel-option--font-size-input").val())
            if(isNaN(size)){
                size = 0
            }else{
                size += 10 - Math.abs(size % 10)
            }
            setFontSizeValue(size)
        })
        $("#novel-option--font-size-input").change(function(){
            var size = Number($("#novel-option--font-size-input").val())
            if(isNaN(size)){
                size = 0
            }
            setFontSizeValue(size)
        })
    })
}