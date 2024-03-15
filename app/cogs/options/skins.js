import { defaultValue, getCSSRule, saveJson } from "../../utils/misc.js";
import { defaultSkins } from "../../utils/data/default_skins.js";
import { defaultFont, defaultFontSettings } from "../../utils/data/default_font.js";
import { debug_log, debug_logObject } from "./debug.js";
import { saveSkin, saveSkins, saveFont } from "../../utils/option.js";
import { applySkin } from "../novel/cogs.js";

export function resetSkins(){
    saveSkins(defaultSkins)
    saveSkin(0)
    saveFont(defaultFont)
    restoreSkins(defaultSkins, 0)
    restoreFont(defaultFont)
    applySkin(0, defaultFont);
}

export function checkSkinNameDuplicate(skins, name, selected){
    var res = false
    $.each(skins, (i, skin)=>{
        if(skin.name==name && i!=selected){
            res = true;
        }
    })
    return res;
}

export function generateNoDuplicateName(skins, name, selected){
    if(checkSkinNameDuplicate(skins, name, selected)){
        for(var i=1; i<=10000; i++){
            if(!checkSkinNameDuplicate(skins, name + "("+i+")")){
            name = name + "("+i+")"
            break
            }
        }
    }
    return name
}

export function restoreSkins(skins, selected){
    skins = defaultValue(skins, defaultSkins)
    selected = defaultValue(selected, 0)
  
    $("#skin").empty()
    $.each(skins, function(i, skin){
      if(skin.show==true){
        $("#skin").append("<option value='"+i+"'>"+skin.name+"</option>")
      }
    })
    $("#skin").val(String(selected))
    $("#skin-option--editting").text((selected+1)+": " + skins[selected].name)
    restoreSkin(skins[selected])
  }

 export function restoreSkin(skin){
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
  }

  export function getSkinData(){
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
          hover: $("#skin-sublist-underline-hover").val()
        }
      }
    }
  }

export function showSkinPreview() {
    $("#skin-preview-style").remove()
    $("head").append('<style id="skin-preview-style" type="text/css">')

    var s = ""
    const style = getSkinData().style

    s += getCSSRule("#skin-preview", [{"background": style.novel.background}, {"color": style.novel.color}, {"border": "3px solid" + style.novel.background_second}])
    s += getCSSRule("#skin-preview #link", [{"color": style.link.color_link}])
    s += getCSSRule("#skin-preview #link-visited", [{"color": style.link.color_visited}])
    s += getCSSRule("#skin-preview #link:hover, #skin-preview #link-visited:hover", [{"color": style.link.color_hover}])
    s += getCSSRule("#skin-preview #link-visited", [{"border-bottom": "1px solid " + style.sublist.color}])
    s += getCSSRule("#skin-preview #link-visited:hover", [{"border-bottom": "1px solid " + style.sublist.hover}])
    $("#skin-preview-style").text(s)

    $(".skin-color-field div[name='skin-novel-color']").css("background", style.novel.color)
    $(".skin-color-field div[name='skin-novel-background']").css("background", style.novel.background)
    $(".skin-color-field div[name='skin-novel-background-second']").css("background", style.novel.background_second)
    $(".skin-color-field div[name='skin-link-color']").css("background", style.link.color_link)
    $(".skin-color-field div[name='skin-link-color-visited']").css("background", style.link.color_visited)
    $(".skin-color-field div[name='skin-link-color-hover']").css("background", style.link.color_hover)
    $(".skin-color-field div[name='skin-sublist-underline']").css("background", style.sublist.color)
    $(".skin-color-field div[name='skin-sublist-underline-hover']").css("background", style.sublist.hover)
}

export function saveSelectedSkin(){
    var skin = getSkinData()
    var selected = parseInt($("#skin").val())
  
    chrome.storage.local.get(["skins"], function(data) {
      var skins = defaultValue(data.skins, defaultValue)
      skin.name = generateNoDuplicateName(skins, skin.name, selected)
      if(skins[selected]!=undefined){
        if(skins[selected].customizable){
          skins[selected] = skin
          saveSkins(skins)
          restoreSkins(skins, selected)
          applySkin(selected)
        }
      }
    });
}


export function addSkinEditButtonEvent(){
    $("#skin").on("change",() => {
        var skin = defaultValue(parseInt($("#skin").val()), 0)
        saveSkin(skin)
        applySkin(skin)
        chrome.storage.local.get(["skins"], function(data) {
          restoreSkins(defaultValue(data.skins, defaultSkins), skin);
        })
      });

    $("#skin-selection--buttons button[name='new']").on("click", (e)=>{ /* New Button */
    e.preventDefault()
    chrome.storage.local.get(["skins"], function(data) {
      var skins = defaultValue(data.skins, defaultSkins)
        
      var defaultSkin = defaultSkins[0]
      defaultSkin.customizable = true
      defaultSkin.name = generateNoDuplicateName(skins, "新規スキン", -1)
      defaultSkin.description = ""

      skins.push(defaultSkin)
      saveSkins(skins)
      saveSkin(skins.length-1)
      restoreSkins(skins, skins.length-1)
    });
  })
  
  $("#skin-option--buttons button[name='save']").on("click", (e)=>{ /* Save Button */
    e.preventDefault()
    saveSelectedSkin()
  })
  
  $("#skin-option--buttons button[name='copy']").on("click", (e)=>{ /* Copy Button */
    e.preventDefault()
    var skin = getSkinData()
  
    chrome.storage.local.get(["skins"], function(data) {
      var skins = defaultValue(data.skins, defaultValue)
      skin.customizable = true
      skin.name = generateNoDuplicateName(skins, skin.name + " - コピー", -1)
      skins.push(skin)

      saveSkins(skins)
      saveSkin(skins.length - 1)
      restoreSkins(skins, skins.length - 1)
      applySkin(skins.length - 1)
    });
  })
  
  $("#skin-option--buttons button[name='delete']").on("click", (e)=>{ /* Delete Button */
    e.preventDefault()
    var selected = parseInt($("#skin").val())
  
    chrome.storage.local.get(["skins"], function(data) {
      var skins = defaultValue(data.skins, defaultSkins)
  
      if(skins[selected].customizable==true){
        skins.splice(selected, 1)
        if(selected>=skins.length){
          selected = skins.length-1
        }
        saveSkins(skins)
        saveSkin(selected)
        restoreSkins(skins, selected)
        applySkin(selected)
      }
    });
  })

  $("#skin-option--export button[name='export']").on("click", (e)=>{ /* Export Button */
    e.preventDefault()
    chrome.storage.local.get(["skins", "applied_skin" ], function(data) {
        var skins = defaultValue(data.skins, defaultSkins)
        var skin = defaultValue(data.applied_skin, 0)
        saveJson(skins[skin], skins[skin].name + ".json")
    });
  })

  $(".option-skin").change(()=>{
    showSkinPreview()
    saveSelectedSkin()
  });
}


export function restoreFont(font){
  $(".font-button.active").removeClass("active")
  $(".font-button#"+defaultValue(font["font-family"], "gothic")).addClass("active")

  $("#custom-font-family").val(defaultValue(font["custom-font-family"], defaultFont["custom-font-family"]))
  
  var fSize = defaultValue(font["font-size"], 0)
  if(fSize>0) {fSize = "+"+fSize}
  $("#font-size-input").val(fSize)

  var lHeight = defaultValue(font["line-height"], 0)
  if(lHeight>0) {lHeight = "+"+lHeight}
  $("#line-height-input").val(lHeight)

  showFontPreview(font)
}

export function showFontPreview(font){
  $(".font-button#custom").css("font-family", defaultValue(font["custom-font-family"], defaultFont["custom-font-family"]))
}

export function addFontEditButtonEvent(){
  $(".font-button#gothic").css("font-family", defaultFontSettings["font-family"].gothic)
  $(".font-button#serif").css("font-family", defaultFontSettings["font-family"].serif)

  $(".font-button-box").click(function(){
    const key = $(this).parent().prop("id")
    $(".font-button.active").removeClass("active")
    $(this).parent().addClass("active")
    chrome.storage.local.get(["applied_font"], (data) => {
        var font = defaultValue(data.applied_font, defaultFont)
        font["font-family"] = key
        saveFont(font)
        applySkin(undefined, font)
        showFontPreview(font)
    })
  })

  $("#custom-font-family").change(function(){
    const key = $(this).val()
    chrome.storage.local.get(["applied_font"], (data) => {
      var font = defaultValue(data.applied_font, defaultFont)
      font["custom-font-family"] = key
      saveFont(font)
      applySkin(undefined, font)
      showFontPreview(font)
    })
  })

  function setFontSizeValue(value){
    if(defaultFontSettings["font-size"] + value < 50){
        value = 50 - defaultFontSettings["font-size"]
    }else if(defaultFontSettings["font-size"] + value > 300){
        value = 300 - defaultFontSettings["font-size"]
    }
    if(value>0){value = "+" + value}
    $("#font-size-input").val(value)
    chrome.storage.local.get(["applied_font"], (data) => {
        var font = defaultValue(data.applied_font, defaultFont)
        font["font-size"] = Number(value)
        saveFont(font)
        applySkin(undefined, font)
    });
  }

  $("#font-size-minus").click(function(){
      var value = Number($("#font-size-input").val())
      if(isNaN(value)){
          value = 0
      }else{
          value -= 10 - Math.abs(value % 10)
      }
      
      setFontSizeValue(value)
  })
  $("#font-size-plus").click(function(){
      var value = Number($("#font-size-input").val())
      if(isNaN(value)){
          value = 0
      }else{
          value += 10 - Math.abs(value % 10)
      }
      setFontSizeValue(value)
  })
  $("#font-size-input").change(function(){
      var value = Number($("#font-size-input").val())
      if(isNaN(value)){
          value = 0
      }
      setFontSizeValue(value)
  })

  function setLineHeightValue(value){
    if(defaultFontSettings["line-height"] + value < 50){
        value = 50 - defaultFontSettings["line-height"]
    }else if(defaultFontSettings["line-height"] + value > 300){
        value = 300 - defaultFontSettings["line-height"]
    }
    if(value>0){value = "+" + value}
    $("#line-height-input").val(value)
    chrome.storage.local.get(["applied_font"], (data) => {
        var font = defaultValue(data.applied_font, defaultFont)
        font["line-height"] = Number(value)
        saveFont(font)
        applySkin(undefined, font)
    })
  }

  $("#line-height-minus").click(function(){
      var value = Number($("#line-height-input").val())
      if(isNaN(value)){
          value = 0
      }else{
          value -= 10 - Math.abs(value % 10)
      }
      
      setLineHeightValue(value)
  })
  $("#line-height-plus").click(function(){
      var value = Number($("#line-height-input").val())
      if(isNaN(value)){
          value = 0
      }else{
          value += 10 - Math.abs(value % 10)
      }
      setLineHeightValue(value)
  })
  $("#line-height-input").change(function(){
      var value = Number($("#line-height-input").val())
      if(isNaN(value)){
          value = 0
      }
      setLineHeightValue(value)
  })
}