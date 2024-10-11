import { localNovelSkin, generateNoDuplicateName, formatSkinData } from "../../utils/skin.js"
import { defaultValue, getCSSRule, saveJson } from "../../utils/misc.js";
import { localSkins, defaultOption, localFont, localFontFamily } from "../../utils/option.js";

/* 指定したスキンを表示 */
/*
export function restoreSkins(){
  chrome.storage.local.get(null, function(data) {
    const skins = localSkins.concat(defaultValue(data.skins, defaultOption.skins))
    const selected = defaultValue(data.selectedSkin, defaultOption.selectedSkin)

    $("#skin").empty()
    $.each(skins, function(i, skin){
      if(skin.show==true){
        $("#skin").append("<option value='"+i+"'>"+skin.name+"</option>")
      }
    })
    $("#skin").val(String(selected))
    $("#skin-option--editting").text((selected+1)+": " + skins[selected].name)

    var skin = skins[selected]
    var style = defaultValue(skin.style, {})
    style.novel = defaultValue(style.novel, {})
    style.link = defaultValue(style.link, {})
    style.sublist = defaultValue(style.sublist, {})

    $("#skin-name").val(defaultValue(skin.name, ""))
    $("#skin-description").val(defaultValue(skin.description, ""))

    $("#skin-novel-color").val(defaultValue(style.novel.color, ""))
    $("#skin-novel-background").val(defaultValue(style.novel.background, ""))
    $("#skin-novel-background-second").val(defaultValue(style.novel.background_second, ""))
    $("#skin-link-color").val(defaultValue(style.link.color_link, ""))
    $("#skin-link-color-visited").val(defaultValue(style.link.color_visited, ""))
    $("#skin-link-color-hover").val(defaultValue(style.link.color_hover, ""))
    $("#skin-sublist-underline").val(defaultValue(style.sublist.color, ""))
    $("#skin-sublist-underline-hover").val(defaultValue(style.sublist.hover, ""))
    $("#skin-sublist-underline-visited").val(defaultValue(style.sublist.visited, ""))
    $("#skin-additional-style").val(defaultValue(skin.css, ""))
    $("#skin-additional-style").trigger("input")
    $(".color").trigger("input")
    document.querySelectorAll('.color').forEach(input => {
        input.dispatchEvent(new Event('input', { bubbles: true }));
    });
    
    if(skin.customizable){
      $(".option-skin").prop("disabled", false)
      $("#skin-option--buttons button[name='save']").prop("disabled", false)
      $("#skin-option--buttons button[name='delete']").prop("disabled", false)
    }else{
      $(".option-skin").prop("disabled", true)
      $("#skin-option--buttons button[name='save']").prop("disabled", true)
      $("#skin-option--buttons button[name='delete']").prop("disabled", true)
    }

    showSkinPreview()
  })
}
*/

export function restoreSkins(){

  /* dropdownに値を設定 */
  chrome.storage.local.get(null, function(data){
      chrome.storage.sync.get(null, function(g_data){
          var skins = g_data.novelSkins
          if(!Array.isArray(skins)){
              skins = []
          }
          skins = localNovelSkin.concat(skins)

          $("#novelSkinSelected").empty()
          $.each(skins, function(i, skin){
              $("#novelSkinSelected").append(`<option value="${i}">${skin.name}</option>`)
          })

          var selected = data.novelSkinSelected
          if(selected < 0){
              selected = 0
              chrome.storage.local.set({novelSkinSelected: selected}, function(){})
          }else if(selected >= skins.length){
              selected = skins.length - 1
              chrome.storage.local.set({novelSkinSelected: selected}, function(){})
          }

          $("#novelSkinSelected").val(selected)
      })
  })
}

/* フィールドからスキンの設定を取得し、Objectを返す */
function getSkinData(){
  return {
    name: $("#skin-name").val(),
    description: $("#skin-description").val(),
    show: true,
    customizable: !$(".option-skin").prop("disabled"),
    style: {
      novel: {
        background: $("#skin-novel-background").val(),
        background_second: $("#skin-novel-background-second").val(),
        color: $("#skin-novel-color").val()
      },
      link: {
        color_link: $("#skin-link-color").val(),
        color_visited: $("#skin-link-color-visited").val(),
        color_hover: $("#skin-link-color-hover").val()
      },
      sublist: {
        color: $("#skin-sublist-underline").val(),
        hover: $("#skin-sublist-underline-hover").val(),
        visited: $("#skin-sublist-underline-visited").val()
      }
    },
    css: $("#skin-additional-style").val()
  }
}

/* スキンのプレビューを表示 */
export function showSkinPreview() {
  chrome.storage.local.get(null, function(data){
    /* skin */
    $("#skin-preview-style").remove()
    $("head").append('<style id="skin-preview-style" type="text/css">')

    var s = ""
    const skins = localSkins.concat(defaultValue(data.skins, defaultOption.skins))
    const selected = defaultValue(data.selectedSkin, defaultOption.selectedSkin)
    const skin = skins[selected]
    const style = skin.style

    s += getCSSRule(".skin-preview", [{"background": style.novel.background}, {"color": style.novel.color}, {"border": "3px solid" + style.novel.background_second}])
    s += getCSSRule(".skin-preview #link", [{"color": style.link.color_link}])
    s += getCSSRule(".skin-preview #link-visited", [{"color": style.link.color_visited}])
    s += getCSSRule(".skin-preview #link:hover, .skin-preview #link-visited:hover", [{"color": style.link.color_hover}])
    s += getCSSRule(".skin-preview #link-visited", [{"border-bottom": "1px solid " + style.sublist.color}])
    s += getCSSRule(".skin-preview #link-visited:hover", [{"border-bottom": "1px solid " + style.sublist.hover}])

    $(".skin-color-field div[name='skin-novel-color']").css("background", style.novel.color)
    $(".skin-color-field div[name='skin-novel-background']").css("background", style.novel.background)
    $(".skin-color-field div[name='skin-novel-background-second']").css("background", style.novel.background_second)
    $(".skin-color-field div[name='skin-link-color']").css("background", style.link.color_link)
    $(".skin-color-field div[name='skin-link-color-visited']").css("background", style.link.color_visited)
    $(".skin-color-field div[name='skin-link-color-hover']").css("background", style.link.color_hover)
    $(".skin-color-field div[name='skin-sublist-underline']").css("background", style.sublist.color)
    $(".skin-color-field div[name='skin-sublist-underline-hover']").css("background", style.sublist.hover)
    $(".skin-color-field div[name='skin-sublist-underline-visited']").css("background", style.sublist.visited)

    /* font */
    const selectedFontFamily = defaultValue(data.fontSelectedFontFamily, defaultOption.fontSelectedFontFamily)
    var fontFamilyList = localFontFamily.concat(defaultValue(data.fontFontFamilyList, defaultOption.fontFontFamilyList))
    var fontFamily_Current 
    var fontSize = defaultValue(data.fontFontSize, defaultOption.fontFontSize) + localFont["font-size"]
    var lineHeight = defaultValue(data.fontLineHeight, defaultOption.fontLineHeight) + localFont["line-height"]
    var textRendering = defaultValue(data.fontTextRendering, defaultOption.fontTextRendering)
    var width = localFont["width"] * defaultValue(data.fontWidth, defaultOption.fontWidth)
    var widthRatio = defaultValue(data.fontWidth, defaultOption.fontWidth)

    if(fontFamilyList.length<=selectedFontFamily || selectedFontFamily<0){
      fontFamily_Current = localFontFamily[0].font
    }else{
        fontFamily_Current = fontFamilyList[selectedFontFamily].font
    }
    s += getCSSRule(".skin-preview", [{"font-family": fontFamily_Current, "text-rendering": textRendering}])
    //s += getCSSRule(".skin-preview p", [{"line-height": lineHeight + "%", "font-size": fontSize + "%"}])
    s += getCSSRule(".skin-preview p", [{"line-height": localFont["line-height"] + "%", "font-size": localFont["font-size"] + "%"}])

    $("#skin-preview-style").text(s)
  })
}

    /* 外部でスキンが変更されたときにdropdownを変更 */
    chrome.storage.local.onChanged.addListener(function(changes){
        if(changes.novelSkinSelected){
            restoreSkins()
        }
    })
    chrome.storage.sync.onChanged.addListener(function(changes){
        if(changes.novelSkins){
            restoreSkins()
        }
    })

    /* dropdown変更時 */
    $("#novelSkinSelected").on("change", function(e){
        var selected = Number($(this).val())

        chrome.storage.local.get(null, function(data){
            chrome.storage.sync.get(null, function(g_data){
                var skins = g_data.novelSkins
                if(!Array.isArray(skins)){
                    skins = []
                }
                skins = localNovelSkin.concat(skins)

                if(isNaN(selected)){
                    selected = 0
                }
                if(selected < 0){
                    selected = 0
                }else if(selected >= skins.length){
                    selected = skins.length - 1
                }

                chrome.storage.local.set({novelSkinSelected: selected}, function(){})
            })
        })
    })
}