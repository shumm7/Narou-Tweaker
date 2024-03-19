import { defaultValue, getCSSRule, saveJson } from "../../utils/misc.js";
import { debug_log, debug_logObject } from "./debug.js";
import { localSkins, defaultOption, localFont } from "../../utils/option.js";

/* 重複しないスキン名を作成 */
function generateNoDuplicateName(skins, name, selected){
    if(checkSkinNameDuplicate(skins, name, selected)){
        for(var i=1; i<=10000; i++){
            if(!checkSkinNameDuplicate(skins, name + "("+i+")")){
            name = name + "("+i+")"
            break
            }
        }
    }
    return name

    function checkSkinNameDuplicate(skins, name, selected){
      var res = false
      $.each(skins, (i, skin)=>{
          if(skin.name==name && i!=selected){
              res = true;
          }
      })
      return res;
  }
}

/* 指定したスキンを表示 */
export function restoreSkins(skins, selected){
  skins = localSkins.concat(defaultValue(skins, defaultOption.skins))
  selected = defaultValue(selected, defaultOption.selectedSkin)

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
        hover: $("#skin-sublist-underline-hover").val()
      }
    }
  }
}

/* スキンのプレビューを表示 */
function showSkinPreview() {
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

/* 選択中のスキンを保存 */
function saveSelectedSkin(){
    var skinData = getSkinData()
    var selectedSkin = parseInt($("#skin").val())

  
    chrome.storage.local.get(["skins"], function(data) {
      var skins = defaultValue(data.skins, defaultOption.skins)
      skinData.name = generateNoDuplicateName(localSkins.concat(skins), skinData.name, selectedSkin)

      var key = selectedSkin - localSkins.length
      if(skins[key]!=undefined){
        if(skins[key].customizable){
          skins[key] = skinData
          chrome.storage.local.set({skins: skins}, function(){})
        }
      }
    });
}

/* イベントを設定 */
export function addSkinEditButtonEvent(){
  $("#skin").on("change",() => { /* Select Dropdown */
    var selectedSkin = defaultValue(parseInt($("#skin").val()), 0)
    chrome.storage.local.set({selectedSkin: selectedSkin}, function(){
      chrome.storage.local.get(["skins"], function(data) {})
    })
  });

  $("#skin-selection--buttons button[name='new']").on("click", (e)=>{ /* New Button */
    saveSelectedSkin()

    chrome.storage.local.get(["skins"], function(data) {
      var skins = defaultValue(data.skins, defaultOption.skins)
        
      var defaultSkin = Object.assign(localSkins[0])
      defaultSkin.customizable = true
      defaultSkin.name = generateNoDuplicateName(skins, "新規スキン", -1)
      defaultSkin.description = ""

      skins.push(defaultSkin)
      chrome.storage.local.set({skins: skins, selectedSkin: localSkins.length + skins.length - 1}, function(){})
    });
  })
  
  $("#skin-option--buttons button[name='save']").on("click", (e)=>{ /* Save Button */
    saveSelectedSkin()
  })
  
  $("#skin-option--buttons button[name='copy']").on("click", (e)=>{ /* Copy Button */
    saveSelectedSkin()
    var skin = getSkinData()
  
    chrome.storage.local.get(["skins"], function(data) {
      var skins = defaultValue(data.skins, defaultOption.skins)
      skin.customizable = true
      skin.name = generateNoDuplicateName(skins, skin.name + " - コピー", -1)
      skins.push(skin)

      chrome.storage.local.set({skins: skins, selectedSkin: localSkins.length + skins.length - 1}, function(){})
    });
  })
  
  $("#skin-option--buttons button[name='delete']").on("click", (e)=>{ /* Delete Button */
    chrome.storage.local.get(["skins", "selectedSkin"], function(data) {
      var selectedSkin = defaultValue(data.selectedSkin, defaultOption.selectedSkin)
      var key = selectedSkin - localSkins.length
      var skins = defaultValue(data.skins, defaultOption.skins)
  
      if(skins[key].customizable==true){
        skins.splice(key, 1)
        if(selectedSkin>=skins.length+localSkins.length-1){
          selectedSkin = skins.length+localSkins.length-1
        }
        chrome.storage.local.set({skins: skins, selectedSkin: selectedSkin}, function(){})
      }
    });
  })

  $("#skin-option--export button[name='export']").on("click", (e)=>{ /* Export Button */
    e.preventDefault()
    chrome.storage.local.get(["skins", "selectedSkin" ], function(data) {
        var skins = localSkins.concat(defaultValue(data.skins, defaultOption.skins))
        var skin = defaultValue(data.selectedSkin, 0)
        saveJson(skins[skin], skins[skin].name + ".json")
    });
  })

  $(".option-skin").change(()=>{ /* Auto Save */
    saveSelectedSkin()
  });

  /* Storage Listener */
  chrome.storage.local.onChanged.addListener(function(changes){
    if(changes.selectedSkin!=undefined || changes.skins!=undefined){
      chrome.storage.local.get(["skins", "selectedSkin"], function(data) {
        restoreSkins(defaultValue(data.skins, defaultOption.skins), defaultValue(data.selectedSkin, defaultOption.selectedSkin));
      })
    }
  })
}


/* Font Settings */
/* フォントの表示設定 */
export function restoreFont(){
  chrome.storage.local.get(null, (data)=>{
    $(".font-button.active").removeClass("active")
    $(".font-button#"+defaultValue(data.fontFontFamily, defaultOption.fontFontFamily)).addClass("active")

    $("#custom-font-family").val(defaultValue(data.fontFontFamily_Custom, defaultOption.fontFontFamily_Custom))
    
    var fSize = defaultValue(data.fontFontSize, defaultOption.fontFontSize)
    if(fSize>0) {fSize = "+"+fSize}
    $("#font-size-input").val(fSize)

    var lHeight = defaultValue(data.fontLineHeight, defaultOption.fontLineHeight)
    if(lHeight>0) {lHeight = "+"+lHeight}
    $("#line-height-input").val(lHeight)
  })

  showFontPreview()
}

/* フォント設定のプレビューを表示 */
function showFontPreview(){
  chrome.storage.local.get(null, (data)=>{
    $(".font-button#custom").css("font-family", defaultValue(data.fontFontFamily_Custom, defaultOption.fontFontFamily_Custom))
  })
}

/* イベントを設定 */
export function addFontEditButtonEvent(){
  $(".font-button#gothic").css("font-family", localFont["font-family"].gothic)
  $(".font-button#serif").css("font-family", localFont["font-family"].serif)

  /* Font Family */
  $(".font-button-box").click(function(){
    const key = $(this).parent().prop("id")
    $(".font-button.active").removeClass("active")
    $(this).parent().addClass("active")

    chrome.storage.local.set({fontFontFamily: key}, function(){})
  })

  /* Font Family - Custom */
  $("#custom-font-family").change(function(){
    chrome.storage.local.set({fontFontFamily_Custom: $(this).val()}, function(){})
  })

  /* Font Size */
  function setFontSizeValue(value){
    if(localFont["font-size"] + value < 50){
        value = 50 - localFont["font-size"]
    }else if(localFont["font-size"] + value > 300){
        value = 300 - localFont["font-size"]
    }
    if(value>0){value = "+" + value}
    $("#font-size-input").val(value)

    chrome.storage.local.set({fontFontSize: Number(value)}, function(){});
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

  /* Line Height */
  function setLineHeightValue(value){
    if(localFont["line-height"] + value < 50){
        value = 50 - localFont["line-height"]
    }else if(localFont["line-height"] + value > 300){
        value = 300 - localFont["line-height"]
    }
    if(value>0){value = "+" + value}
    $("#line-height-input").val(value)

    chrome.storage.local.set({fontLineHeight: Number(value)}, function(){});
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

  /* Storage Listener */
  chrome.storage.local.onChanged.addListener(function(changes){
    if(changes.fontFontFamily!=undefined || changes.fontFontFamily_Custom!=undefined || changes.fontFontSize!=undefined || changes.fontLineHeight!=undefined || changes.fontTextRendering!=undefined){
      restoreFont()
    }
  })
}