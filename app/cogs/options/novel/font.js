import { defaultValue } from "../../../utils/misc.js"
import { defaultOption, localFont } from "../../../utils/option.js"

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
  
      var pWidth = defaultValue(data.fontWidth, defaultOption.fontWidth)
      $("#page-width-input").val(Number((pWidth * 100).toFixed(1)))
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
          value = Math.floor(value) - (10 - Math.abs(Math.floor(value) % 10))
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
      if(changes.fontFontFamily!=undefined || changes.fontFontFamily_Custom!=undefined || changes.fontFontSize!=undefined || changes.fontLineHeight!=undefined || changes.fontTextRendering!=undefined || changes.fontWidth!=undefined){
        restoreFont()
      }
    })
  }