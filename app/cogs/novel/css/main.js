
chrome.storage.session.get(null, (data)=>{
    /* Skin Custom CSS */
    if("novelSkinCustomCSS" in data){
        var l = $(`<style type="text/css" id="narou-tweaker-style--skin-user" class="narou-tweaker-style"></style>`)
        l.text(data.novelSkinCustomCSS)
        $("html").append(l)
    }else{
        $("html").append(`<style type="text/css" id="narou-tweaker-style--skin-user" class="narou-tweaker-style"></style>`)
    }

    /* Font Custom CSS */
    if("novelFontCustomCSS" in data){
        var l = $(`<style type="text/css" id="narou-tweaker-style--font-user" class="narou-tweaker-style"></style>`)
        l.text(data.novelFontCustomCSS)
        $("html").append(l)
    }else{
        $("html").append(`<style type="text/css" id="narou-tweaker-style--font-user" class="narou-tweaker-style"></style>`)
    }

    /* Skin */
    if("novelAppliedSkinCSS" in data){
        var l = $(`<style type="text/css" id="narou-tweaker-style--skin" class="narou-tweaker-style"></style>`)
        l.text(data.novelAppliedSkinCSS)
        $("html").append(l)
    }else{
        $("html").append(`<style type="text/css" id="narou-tweaker-style--skin" class="narou-tweaker-style"></style>`)
    }

    /* Font */
    if("novelAppliedFontCSS" in data){
        var l = $(`<style type="text/css" id="narou-tweaker-style--font" class="narou-tweaker-style"></style>`)
        l.text(data.novelAppliedFontCSS)
        $("html").append(l)
    }else{
        $("html").append(`<style type="text/css" id="narou-tweaker-style--font" class="narou-tweaker-style"></style>`)
    }

    /* Author CSS */
    $("html").append(`<style type="text/css" id="narou-tweaker-style--author-css" class="narou-tweaker-style"></style>`)

    /* User CSS */
    if("novelCustomCSS" in data){
        var l = $(`<style type="text/css" id="narou-tweaker-style--user-css" class="narou-tweaker-style"></style>`)
        l.text(data.novelCustomCSS)
        $("html").append(l)
    }else{
        $("html").append(`<style type="text/css" id="narou-tweaker-style--user-css" class="narou-tweaker-style"></style>`)
    }
})

chrome.storage.session.onChanged.addListener(function(changes){
    if(changes.novelSkinCustomCSS!=undefined){
        if($("#narou-tweaker-style--skin-user").length){
            $("#narou-tweaker-style--skin-user").text(changes.novelSkinCustomCSS.newValue)
        }
    }
    if(changes.novelFontCustomCSS!=undefined){
        if($("#narou-tweaker-style--font-user").length){
            $("#narou-tweaker-style--font-user").text(changes.novelFontCustomCSS.newValue)
        }
    }

    if(changes.novelAppliedSkinCSS!=undefined){
        if($("#narou-tweaker-style--skin").length){
            $("#narou-tweaker-style--skin").text(changes.novelAppliedSkinCSS.newValue)
        }
    }
    if(changes.novelAppliedFontCSS!=undefined){
        if($("#narou-tweaker-style--font").length){
            $("#narou-tweaker-style--font").text(changes.novelAppliedFontCSS.newValue)
        }
    }

    if(changes.novelCustomCSS!=undefined){
        if($("#narou-tweaker-style--user-css").length){
            $("#narou-tweaker-style--user-css").text(changes.novelCustomCSS.newValue)
        }
    }
})