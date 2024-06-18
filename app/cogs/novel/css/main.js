
chrome.storage.local.get(null, (data)=>{
    /* Skin Custom CSS */
    if("appliedUserSkinCSS" in data){
        var l = $(`<style type="text/css" id="narou-tweaker-style--skin-user" class="narou-tweaker-style"></style>`)
        l.text(data.appliedUserSkinCSS)
        $("html").append(l)
    }else{
        $("html").append(`<style type="text/css" id="narou-tweaker-style--skin-user" class="narou-tweaker-style"></style>`)
    }

    /* Font Custom CSS */
    if("appliedUserFontCSS" in data){
        var l = $(`<style type="text/css" id="narou-tweaker-style--font-user" class="narou-tweaker-style"></style>`)
        l.text(data.appliedUserFontCSS)
        $("html").append(l)
    }else{
        $("html").append(`<style type="text/css" id="narou-tweaker-style--font-user" class="narou-tweaker-style"></style>`)
    }

    /* Skin */
    if("appliedSkinCSS" in data){
        var l = $(`<style type="text/css" id="narou-tweaker-style--skin" class="narou-tweaker-style"></style>`)
        l.text(data.appliedSkinCSS)
        $("html").append(l)
    }else{
        $("html").append(`<style type="text/css" id="narou-tweaker-style--skin" class="narou-tweaker-style"></style>`)
    }

    /* Author CSS */
    $("html").append(`<style type="text/css" id="narou-tweaker-style--author-css" class="narou-tweaker-style"></style>`)

    /* User CSS */
    if("additionalCSS" in data){
        var l = $(`<style type="text/css" id="narou-tweaker-style--user-css" class="narou-tweaker-style"></style>`)
        l.text(data.additionalCSS)
        $("html").append(l)
    }else{
        $("html").append(`<style type="text/css" id="narou-tweaker-style--user-css" class="narou-tweaker-style"></style>`)
    }
})

chrome.storage.local.onChanged.addListener(function(changes){
    if(changes.appliedUserSkinCSS!=undefined){
        if($("#narou-tweaker-style--skin-user").length){
            $("#narou-tweaker-style--skin-user").text(changes.appliedUserSkinCSS.newValue)
        }
    }
    if(changes.appliedUserFontCSS!=undefined){
        if($("#narou-tweaker-style--font-user").length){
            $("#narou-tweaker-style--font-user").text(changes.appliedUserFontCSS.newValue)
        }
    }

    if(changes.appliedSkinCSS!=undefined){
        if($("#narou-tweaker-style--skin").length){
            $("#narou-tweaker-style--skin").text(changes.appliedSkinCSS.newValue)
        }
    }

    if(changes.additionalCSS!=undefined){
        if($("#narou-tweaker-style--user-css").length){
            $("#narou-tweaker-style--user-css").text(changes.additionalCSS.newValue)
        }
    }
})