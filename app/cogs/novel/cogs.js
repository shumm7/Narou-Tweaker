import { defaultValue } from "../../utils/misc.js"
import { defaultSkins } from "../../utils/data/default_skins.js";
import { saveSkin } from "../../utils/option.js";

/* Header */
export function changeHeaderScrollMode(header_mode){
    var elm = "#novel_header"
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

export function applySkin(index){
    chrome.runtime.sendMessage(
        {
            action: "apply_skin",
            data: {
                index: index
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
    $("#novel-option--skin-description").text(skins[selected].description)
}

export function setOptionContentsDisplay(){
    var outer = $(".novel-option--content.novel-option-tab-1")

    /* Skin */
    outer.append("<div class='novel-option-header'>スキン設定</div>")
    outer.append('<div id="novel-option--skin"><div class="dropdown" style="width: 100%;"><select id="skin" name="skin"></select></div></div>')
    outer.append('<div id="novel-option--skin-description"></div>')
    chrome.storage.sync.get(["skin", "skins"], function(data) {
        setSkinOptions(data.skins, data.skin)
    })

    $("#novel-option--skin #skin").on("change",() => {
        var skin = parseInt($("#skin").val())
        saveSkin(skin)
        applySkin(skin)
        chrome.storage.sync.get(["skin", "skins"], function(data) {
            setSkinOptions(data.skins, data.skin)
        })
    })
}