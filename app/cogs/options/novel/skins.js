import { defaultValue, getCSSRule, saveJson } from "/utils/misc.js";
import { localSkins, defaultOption, localFont, localFontFamily } from "/utils/option.js";
import { generateNoDuplicateName, formatSkinData } from "/utils/skin.js";

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
  $("#skin-sublist-underline-visited").val(defaultValue(style.sublist.visited, ""))
  $("#skin-additional-style").val(defaultValue(skin.css, ""))
  $("#skin-additional-style").trigger("input")
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
function showSkinPreview() {
    $("#skin-preview-style").remove()
    $("head").append('<style id="skin-preview-style" type="text/css">')

    var s = ""
    const style = getSkinData().style

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

    chrome.storage.local.get(null, function(data){
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
      s += getCSSRule(".skin-preview p", [{"line-height": lineHeight + "%", "font-size": fontSize + "%"}])

      $("#skin-preview-style").text(s)
    })
}

/* 選択中のスキンを保存 */
function saveSelectedSkin(){
    var skinData = getSkinData()
    var selectedSkin = parseInt($("#skin").val())

  
    chrome.storage.local.get(["skins"], function(data) {
      var skins = defaultValue(data.skins, defaultOption.skins)
      if(skinData.name.trim().length==0){skinData.name="新規スキン"}
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

  /* New Button */
  $("#skin-selection--buttons button[name='new']").on("click", (e)=>{
    saveSelectedSkin()

    chrome.storage.local.get(["skins"], function(data) {
      var skins = defaultValue(data.skins, defaultOption.skins)
        
      var defaultSkin = Object.assign(localSkins[0])
      defaultSkin.customizable = true
      defaultSkin.name = generateNoDuplicateName(localSkins.concat(skins), "新規スキン", -1)
      defaultSkin.description = ""

      skins.push(defaultSkin)
      chrome.storage.local.set({skins: skins, selectedSkin: localSkins.length + skins.length - 1}, function(){})
    });
  })

  /* Save Button */
  $("#skin-option--buttons button[name='save']").on("click", (e)=>{
    saveSelectedSkin()
  })

  /* Copy Button */
  $("#skin-option--buttons button[name='copy']").on("click", (e)=>{
    saveSelectedSkin()
    var skin = getSkinData()
  
    chrome.storage.local.get(["skins"], function(data) {
      var skins = defaultValue(data.skins, defaultOption.skins)
      skin.customizable = true
      skin.name = generateNoDuplicateName(localSkins.concat(skins), skin.name + " - コピー", -1)
      skins.push(skin)

      chrome.storage.local.set({skins: skins, selectedSkin: localSkins.length + skins.length - 1}, function(){})
    });
  })

   /* Delete Button */
  $("#skin-option--buttons button[name='delete']").on("click", (e)=>{
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
  /* Export Button */
  $("#skin-export-json").on("click", (e)=>{
    chrome.storage.local.get(["skins", "selectedSkin" ], function(data) {
        var skins = localSkins.concat(defaultValue(data.skins, defaultOption.skins))
        var skin = defaultValue(data.selectedSkin, 0)
        saveJson(skins[skin], skins[skin].name + ".json")
    });
  })
  $("#skin-export-text").on("click", (e)=>{
    $("#skin-export-output").css("display", "block")
    chrome.storage.local.get(["skins", "selectedSkin" ], function(data) {
        var skins = localSkins.concat(defaultValue(data.skins, defaultOption.skins))
        var skin = defaultValue(data.selectedSkin, 0)
        var field = $("#skin-export-output--field")
        field.val(JSON.stringify(skins[skin], null, "\t"))
        field.trigger("input")
    });
  })

  /* Import Button */
  $("#skin-import-json").on("change", (evt)=>{
    $("#skin-import-warnings").empty()

    try{
      var f = evt.target.files[0]
      var reader = new FileReader();
      reader.onload = function(e){
          try{
            $("#skin-import-input--field").val(e.target.result)
          }catch(e){
            console.warn(e)
          }
      }
      reader.readAsText(f);
    }catch(e){}
  })
  $('#skin-import').on('dragenter', function(evt) {
    evt.stopPropagation();
    evt.preventDefault();
  });
  $('#skin-import').on('dragover', function(evt) {
    evt.stopPropagation();
    evt.preventDefault();
  });
  $("#skin-import").on("drop", (evt)=>{
    evt.stopPropagation();
    evt.preventDefault();
    $("#skin-import-warnings").empty()

    try{
      var f = evt.originalEvent.dataTransfer.files[0];
      var reader = new FileReader();
      reader.onload = function(e){
          try{
            var field = $("#skin-import-input--field")
            field.val(e.target.result)
            field.trigger("input")
          }catch(e){
            console.warn(e)
          }
      }
      reader.readAsText(f);
    }catch(e){}
  })
  $("#skin-import-input--submit").on("click", (e)=>{
    $("#skin-import-warnings").empty()
    var raw
    try{
      raw = JSON.parse($("#skin-import-input--field").val())
    }catch(e){
      $("#skin-import-warnings").append(`<div class="skin-import-warning">データの読み取りに失敗しました。</div>`)
      console.warn(e)
      return
    }

    chrome.storage.local.get(["skins"], function(data) {
      var skins = defaultValue(data.skins, defaultOption.skins)
      raw = formatSkinData(raw)
      raw.name = generateNoDuplicateName(localSkins.concat(skins), raw.name, -1)
      skins.push(raw)

      chrome.storage.local.set({skins: skins, selectedSkin: localSkins.length + skins.length - 1}, function(){
        var field = $("#skin-import-input--field")
        field.val("")
        field.trigger("input")
      })
    })
  })

  /* Author Skin */
  const authorSkinImage = {
    "tiny-light": {
      src: "https://github.com/shumm7/Narou-Tweaker/blob/main/app/assets/banner/tiny_light.png?raw=true",
      local_src: "/assets/banner/tiny_light.png",
      width: 88,
      height: 31
    },
    "small-light":{
      src: "https://github.com/shumm7/Narou-Tweaker/blob/main/app/assets/banner/small_light.png?raw=true",
      local_src: "/assets/banner/small_light.png",
      width: 135,
      height: 35
    },
    "medium-light":{
      src: "https://github.com/shumm7/Narou-Tweaker/blob/main/app/assets/banner/medium_light.png?raw=true",
      local_src: "/assets/banner/medium_light.png",
      width: 200,
      height: 40
    },
    "big-light": {
      src: "https://github.com/shumm7/Narou-Tweaker/blob/main/app/assets/banner/big_light.png?raw=true",
      local_src: "/assets/banner/big_light.png",
      width: 300,
      height: 55
    },
    "tiny-dark": {
      src: "https://github.com/shumm7/Narou-Tweaker/blob/main/app/assets/banner/tiny_dark.png?raw=true",
      local_src: "/assets/banner/tiny_dark.png",
      width: 88,
      height: 31
    },
    "small-dark": {
      src: "https://github.com/shumm7/Narou-Tweaker/blob/main/app/assets/banner/small_dark.png?raw=true",
      local_src: "/assets/banner/small_dark.png",
      width: 135,
      height: 35
    },
    "medium-dark": {
      src: "https://github.com/shumm7/Narou-Tweaker/blob/main/app/assets/banner/medium_dark.png?raw=true",
      local_src: "/assets/banner/medium_dark.png",
      width: 200,
      height: 40
    },
    "big-dark": {
      src: "https://github.com/shumm7/Narou-Tweaker/blob/main/app/assets/banner/big_dark.png?raw=true",
      local_src: "/assets/banner/big_dark.png",
      width: 300,
      height: 55
    }
  }
  showAuthorSkinBanner()
  $("#skin-author-export--submit").on("click", (e)=>{
    chrome.storage.local.get(["skins", "selectedSkin" ], function(data) {
      var skins = localSkins.concat(defaultValue(data.skins, defaultOption.skins))
      var idx = defaultValue(data.selectedSkin, 0)
      var skin = skins[idx]

      delete skin.name
      delete skin.description
      delete skin.show
      delete skin.customizable

      var selected = defaultValue($("#skin-author-export--type").val(), "tiny-light")
      const image = authorSkinImage[selected]
      const text = JSON.stringify(skin)
      
      var field = $("#skin-author-export--field")
      field.val(
        `<a href="https://chromewebstore.google.com/detail/narou-tweaker/ihenjmpgnkmihnoogkokhgboafifphlp"><img src="${image.src}" width="${image.width}" height="${image.height}" alt="Narou Tweaker 作者スキン"/><span><!--${text}--></span></a>`
      )
      field.trigger("input")
    });
  })
  $("#skin-author-export--type").on("change", function(e){ 
    showAuthorSkinBanner()
    $("#skin-author-export--field").val("")
  })
  function showAuthorSkinBanner(){
    var selected = defaultValue($("#skin-author-export--type").val(), "tiny-light")

    const image = authorSkinImage[selected]
    if($("#skin-author-export--image").length){
      var img = $("#skin-author-export--image")
      img.prop("src", image.local_src)
      img.prop("width", image.width)
      img.prop("height", image.height)
    }else{
      $("#skin-author-export").append(`
        <img id="skin-author-export--image" src="${image.local_src}" width="${image.width}" height="${image.height}" alt="Narou Tweaker"/>
      `)
    }
  }

  /* Auto Save */
  $(".option-skin").change(()=>{ 
    saveSelectedSkin()
  });


  /* Storage Listener */
  chrome.storage.local.onChanged.addListener(function(changes){
    if(changes.selectedSkin!=undefined || changes.skins!=undefined){
      chrome.storage.local.get(["skins", "selectedSkin"], function(data) {
        restoreSkins(defaultValue(data.skins, defaultOption.skins), defaultValue(data.selectedSkin, defaultOption.selectedSkin));
      })
    }
    if(changes.skins!=undefined ||
      changes.selectedSkin!=undefined ||
      changes.fontSelectedFontFamily!=undefined ||
      changes.fontFontFamilyList!=undefined ||
      changes.fontFontSize!=undefined ||
      changes.fontLineHeight!=undefined ||
      changes.fontTextRendering!=undefined ||
      changes.fontWidth!=undefined
    ){
        showSkinPreview()
    }
  })
}