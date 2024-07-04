import { check, defaultValue } from "../../utils/misc.js"
import { defaultOption, localFont, localFontFamily, localSkins } from "../../utils/option.js"

export function setDisplayEvent(){

    restoreFontOptions()
    restoreSkinOptions()
    
    /* Skin */
    $("#nt-display-option--skin #nt-display-option--skin-dropdown").on("change",() => {
        chrome.storage.local.set({workspaceEditorSelectedSkin: parseInt($("#nt-display-option--skin-dropdown").val())}, function() {})
    })

    /* Font Family */
    $("#nt-display-option--font-family #font-family").on("change",() => {
        chrome.storage.local.set({workspaceEditorSelectedFontFamily: parseInt($("#nt-display-option--font-family #font-family").val())}, function() {})
    })

    /* Font Size */
    function setFontSizeValue(value){
        if(localFont["font-size"] + value < 50){
            value = 50 - localFont["font-size"]
        }else if(localFont["font-size"] + value > 300){
            value = 300 - localFont["font-size"]
        }
        if(value>0){value = "+" + value}
        $("#nt-display-option--font-size-input").val(value)

        chrome.storage.local.set({workspaceEditorFontSize: Number(value)}, () => {})
    }

    $("#nt-display-option--font-size-minus").click(function(){
        var value = Number($("#nt-display-option--font-size-input").val())
        if(isNaN(value)){
            value = 0
        }else{
            value = Math.floor(value) - (5 - Math.abs(Math.floor(value) % 5))
        }
        
        setFontSizeValue(value)
    })
    $("#nt-display-option--font-size-plus").click(function(){
        var value = Number($("#nt-display-option--font-size-input").val())
        if(isNaN(value)){
            value = 0
        }else{
            value = Math.floor(value) + (5 - Math.abs(Math.floor(value) % 5))
        }
        setFontSizeValue(value)
    })
    $("#nt-display-option--font-size-input").change(function(){
        var value = Number($("#nt-display-option--font-size-input").val())
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
        $("#nt-display-option--line-height-input").val(value)

        chrome.storage.local.set({workspaceEditorLineHeight: Number(value)}, () => {})
    }

    $("#nt-display-option--line-height-minus").click(function(){
        var value = Number($("#nt-display-option--line-height-input").val())
        if(isNaN(value)){
            value = 0
        }else{
            value = Math.floor(value) - (10 - Math.abs(Math.floor(value) % 10))
        }
        
        setLineHeightValue(value)
    })
    $("#nt-display-option--line-height-plus").click(function(){
        var value = Number($("#nt-display-option--line-height-input").val())
        if(isNaN(value)){
            value = 0
        }else{
            value = Math.floor(value) + (10 - Math.abs(Math.floor(value) % 10))
        }
        setLineHeightValue(value)
    })
    $("#nt-display-option--line-height-input").change(function(){
        var value = Number($("#nt-display-option--line-height-input").val())
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
        $("#nt-display-option--page-width-input").val(value)

        chrome.storage.local.set({workspaceEditorWidth: Number(value)/100}, () => {})
    }

    $("#nt-display-option--page-width-minus").click(function(){
        var value = Number($("#nt-display-option--page-width-input").val())
        if(isNaN(value)){
            value = 0
        }else{
            value = Math.floor(value) - (10 - Math.abs(Math.floor(value) % 10))
        }
        
        setWidthValue(value)
    })
    $("#nt-display-option--page-width-plus").click(function(){
        var value = Number($("#nt-display-option--page-width-input").val())
        if(isNaN(value)){
            value = 0
        }else{
            value = Math.floor(value) + (10 - Math.abs(Math.floor(value) % 10))
        }
        setWidthValue(value)
    })
    $("#nt-display-option--page-width-input").change(function(){
        var value = Number($("#nt-display-option--page-width-input").val())
        if(isNaN(value)){
            value = 0
        }
        setWidthValue(value)
    })

    $(".nt-display-option--textfield").keydown(function(e){
        if ((e.which && e.which === 13) || (e.keyCode && e.keyCode === 13)) {
            return false;
        }
    })
}

function restoreSkinOptions(){
    chrome.storage.local.get(null, (data)=>{
        const skins = localSkins.concat(defaultValue(data.skins, defaultOption.skins))
        const selected = defaultValue(data.workspaceEditorSelectedSkin, defaultOption.workspaceEditorSelectedSkin)

        $("#nt-display-option--skin #nt-display-option--skin-dropdown").empty()
        $.each(skins, function(i, skin){
            if(skin.show==true){
                $("#nt-display-option--skin #nt-display-option--skin-dropdown").append("<option value='"+i+"'>"+skin.name+"</option>")
            }
        })
        $("#nt-display-option--skin-dropdown").val(String(selected))
        $("#nt-display-option--skin-description").text(defaultValue(skins[selected], {}).description)
    })
}

function restoreFontOptions(){
    chrome.storage.local.get(null, (data)=>{
        var fontlist = localFontFamily.concat(defaultValue(data.fontFontFamilyList, defaultOption.fontFontFamilyList))

        $("#nt-display-option--font-family #font-family").empty()
        $.each(fontlist, function(i, font){
            if(font.show==true){
                var opt = $(`<option value="${i}">${font.name}</option>`)
                opt.css("font-family", font.font)
                $("#nt-display-option--font-family #font-family").append(opt)
            }
        })
        const selected = data.workspaceEditorSelectedFontFamily
        $("#nt-display-option--font-family #font-family").val(String(selected))
        $("#nt-display-option--font-family-description").text(defaultValue(fontlist[selected], {}).description)
        $("#nt-display-option--font-family #font-family").css("font-family", defaultValue(fontlist[selected], {}).font)
        $("#nt-display-option--font-family-sample").css("font-family", defaultValue(fontlist[selected], {}).font)

        var fSize = defaultValue(data.workspaceEditorFontSize, defaultOption.workspaceEditorFontSize)
        if(fSize>0) {fSize = "+"+fSize}
        $("#nt-display-option--font-size-input").val(fSize)
        
        var lHeight = defaultValue(data.workspaceEditorLineHeight, defaultOption.workspaceEditorLineHeight)
        if(lHeight>0) {lHeight = "+"+lHeight}
        $("#nt-display-option--line-height-input").val(lHeight)

        var pWidth = defaultValue(data.workspaceEditorWidth, defaultOption.workspaceEditorWidth)
        $("#nt-display-option--page-width-input").val(Number((pWidth * 100).toFixed(1)))

        check("#nt-display-option--vertical-toggle", data.novelVertical, defaultOption.novelVertical)
    })
}