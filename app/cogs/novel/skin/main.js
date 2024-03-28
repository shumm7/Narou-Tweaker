
chrome.storage.local.get(["appliedSkinCSS", "additionalCSS"], (data)=>{
    if("appliedSkinCSS" in data){
        var l = $(`<style type="text/css" id="narou-tweaker-style--skin" class="narou-tweaker-style"></style>`)
        l.text(data.appliedSkinCSS)
        $("html").append()
    }else{
        $("html").append(`<style type="text/css" id="narou-tweaker-style--skin" class="narou-tweaker-style"></style>`)
    }
    if("additionalCSS" in data){
        var l = $(`<style type="text/css" id="narou-tweaker-style--user-css" class="narou-tweaker-style"></style>`)
        l.text(data.additionalCSS)
        $("html").append()
    }else{
        $("html").append(`<style type="text/css" id="narou-tweaker-style--user-css" class="narou-tweaker-style"></style>`)
    }
})

chrome.storage.local.onChanged.addListener(function(changes){
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