import { check, defaultValue } from "../../utils/misc.js"
import { defaultOption, localFont, localFontFamily } from "../../utils/option.js"
import { generateNoDuplicateName } from "../../utils/skin.js";

/* Font Settings */
/* フォントの表示設定 */
export function restoreFont(){
    chrome.storage.local.get(null, (data)=>{
      const fontList = localFontFamily.concat(defaultValue(data.fontFontFamilyList, defaultOption.fontFontFamilyList))

      $("#font-family-dropdown").empty()
      $.each(fontList, function(i, font){
        if(font.show==true){
          var opt = $(`<option value="${i}">${font.name}</option>`)
          opt.css("font-family", font.font)
          $("#font-family-dropdown").append(opt)
        }
      })
      const index = defaultValue(data.fontSelectedFontFamily, defaultOption.fontSelectedFontFamily)
      const selectedFont = fontList[index]
      $("#font-family-dropdown").val(String(index))
      $("#font-family-dropdown").css("font-family", selectedFont.font)
      $("#font-family-option--editting").text((index+1)+": " + selectedFont.name)

      $(".option-font[name='font-name']").val(selectedFont.name)
      $(".option-font[name='font-description']").val(selectedFont.description)
      $(".option-font[name='font-data']").val(selectedFont.font)
      $(".option-font[name='font-css']").val(selectedFont.css)
      $(".option-font[name='font-css']").trigger("input")
      $(".option-font[name='font-license']").val(selectedFont.license)

      if(selectedFont.customizable){
        $(".option-font").prop("disabled", false)
        $("#font-family-option--buttons button[name='save']").prop("disabled", false)
        $("#font-family-option--buttons button[name='delete']").prop("disabled", false)
      }else{
        $(".option-font").prop("disabled", true)
        $("#font-family-option--buttons button[name='save']").prop("disabled", true)
        $("#font-family-option--buttons button[name='delete']").prop("disabled", true)
      }
      
      var fSize = defaultValue(data.fontFontSize, defaultOption.fontFontSize)
      if(fSize>0) {fSize = "+"+fSize}
      $("#font-size-input").val(fSize)
  
      var lHeight = defaultValue(data.fontLineHeight, defaultOption.fontLineHeight)
      if(lHeight>0) {lHeight = "+"+lHeight}
      $("#line-height-input").val(lHeight)
  
      var pWidth = defaultValue(data.fontWidth, defaultOption.fontWidth)
      $("#page-width-input").val(Number((pWidth * 100).toFixed(1)))
    })
  }

/* フィールドからフォントの設定を取得し、Objectを返す */
function getFontData(){
  return {
    name: $("#font-name").val(),
    description: $("#font-description").val(),
    show: true,
    customizable: !$(".option-font").prop("disabled"),
    font: $("#font-data").val(),
    css: $("#font-css").val(),
    license: $("#font-license").val()
  }
}
  

/* 選択中のフォントを保存 */
function saveSelectedFont(){
  var fontData = getFontData()
  var selectedFont = parseInt($("#font-family-dropdown").val())

  chrome.storage.local.get(["fontFontFamilyList"], function(data) {
    var fontList = defaultValue(data.fontFontFamilyList, defaultOption.fontFontFamilyList)
    if(fontData.name.trim().length==0){fontData.name="新規フォント"}
    fontData.name = generateNoDuplicateName(localFontFamily.concat(fontList), fontData.name, selectedFont)

    var key = selectedFont - localFontFamily.length
    if(fontList[key]!=undefined){
      if(fontList[key].customizable){
        fontList[key] = fontData
        chrome.storage.local.set({fontFontFamilyList: fontList}, function(){})
      }
    }
  });
}


/* イベントを設定 */
export function addFontEditButtonEvent(){

  /* Font Family */
  /*
  $(".font-button-box").click(function(){
    const key = $(this).parent().prop("id")
    $(".font-button.active").removeClass("active")
    $(this).parent().addClass("active")

    chrome.storage.local.set({fontFontFamily: key}, function(){})
  })
  */
  $("#font-family-dropdown").change(function(){
    const key = $(this).parent().prop("id")
    $(".font-button.active").removeClass("active")
    $(this).parent().addClass("active")

    chrome.storage.local.set({fontFontFamily: key}, function(){})
  })
  $("#font-family-dropdown").on("change",() => {
    chrome.storage.local.set({fontSelectedFontFamily: parseInt($("#font-family-dropdown").val())}, function() {})
  })

  /* New Button */
  $("#font-family-selection--buttons button[name='new']").on("click", (e)=>{
    saveSelectedFont()

    chrome.storage.local.get(["fontFontFamilyList"], function(data) {
      var fontList = defaultValue(data.fontFontFamilyList, defaultOption.fontFontFamilyList)
        
      var defaultFont = Object.assign({}, localFontFamily[0])
      
      defaultFont.customizable = true
      defaultFont.name = generateNoDuplicateName(localFontFamily.concat(fontList), "新規フォント", -1)
      defaultFont.description = ""
      defaultFont.license = ""
      defaultFont.css = ""

      fontList.push(defaultFont)
      chrome.storage.local.set({fontFontFamilyList: fontList, fontSelectedFontFamily: localFontFamily.length + fontList.length - 1}, function(){})
    });
  })

  /* Save Button */
  $("#font-family-option--buttons button[name='save']").on("click", (e)=>{
    saveSelectedFont()
  })

  /* Copy Button */
  $("#font-family-option--buttons button[name='copy']").on("click", (e)=>{
    saveSelectedFont()
    var font = getFontData()
  
    chrome.storage.local.get(["fontFontFamilyList"], function(data) {
      var fontList = defaultValue(data.fontFontFamilyList, defaultOption.fontFontFamilyList)
      font.customizable = true
      font.name = generateNoDuplicateName(localFontFamily.concat(fontList), font.name + " - コピー", -1)
      fontList.push(font)

      chrome.storage.local.set({fontFontFamilyList: fontList, fontSelectedFontFamily: localFontFamily.length + fontList.length - 1}, function(){})
    });
  })

  /* Delete Button */
  $("#font-family-option--buttons button[name='delete']").on("click", (e)=>{
    chrome.storage.local.get(["fontFontFamilyList", "fontSelectedFontFamily"], function(data) {
      var selectedFont = defaultValue(data.fontSelectedFontFamily, defaultOption.fontSelectedFontFamily)
      var key = selectedFont - localFontFamily.length
      var fontList = defaultValue(data.fontFontFamilyList, defaultOption.fontFontFamilyList)
  
      if(fontList[key].customizable==true){
        fontList.splice(key, 1)
        if(selectedFont>=fontList.length+localFontFamily.length-1){
          selectedFont = fontList.length+localFontFamily.length-1
        }
        chrome.storage.local.set({fontFontFamilyList: fontList, fontSelectedFontFamily: selectedFont}, function(){})
      }
    });
  })

  /* Auto Save */
  $(".option-font").change(()=>{ 
    saveSelectedFont()
  });

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
        value = Math.floor(value) - (10 - Math.abs(Math.floor(value) % 10))
      }
      
      setFontSizeValue(value)
  })
  $("#font-size-plus").click(function(){
      var value = Number($("#font-size-input").val())
      if(isNaN(value)){
          value = 0
      }else{
        value = Math.floor(value) + (10 - Math.abs(Math.floor(value) % 10))
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
        value = Math.floor(value) + (10 - Math.abs(Math.floor(value) % 10))
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

  /* Width */
  function setWidthValue(value){
    if(value < 0){
        value = 0
    }else if(value > 1000){
        value = 100
    }
    $("#page-width-input").val(value)

    chrome.storage.local.set({fontWidth: Number(value)/100}, function(){});
  }

  $("#page-width-minus").click(function(){
      var value = Number($("#page-width-input").val())
      if(isNaN(value)){
          value = 0
      }else{
        value = Math.floor(value) - (10 - Math.abs(Math.floor(value) % 10))
      }
      
      setWidthValue(value)
  })
  $("#page-width-plus").click(function(){
      var value = Number($("#page-width-input").val())
      if(isNaN(value)){
          value = 0
      }else{
        value = Math.floor(value) + (10 - Math.abs(Math.floor(value) % 10))
      }
      setWidthValue(value)
  })
  $("#page-width-input").change(function(){
      var value = Number($("#page-width-input").val())
      if(isNaN(value)){
          value = 0
      }
      setWidthValue(value)
  })

  /* Storage Listener */
  chrome.storage.local.onChanged.addListener(function(changes){
    if(
      changes.fontSelectedFontFamily!=undefined ||
      changes.fontFontFamilyList!=undefined ||
      changes.fontFontSize!=undefined ||
      changes.fontLineHeight!=undefined ||
      changes.fontTextRendering!=undefined ||
      changes.fontWidth!=undefined
    ){
      restoreFont()
    }
    if(changes.novelVertical!=undefined){
      check("#novelVertical", changes.novelVertical.newValue)
    }
  })
}