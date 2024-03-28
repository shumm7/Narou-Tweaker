
chrome.storage.local.get(["appliedSkinCSS", "additionalCSS"], (data)=>{
    if("appliedSkinCSS" in data){
        $("html").append(`<style type="text/css" id="narou-tweaker-style--skin" class="narou-tweaker-style">${data.appliedSkinCSS}</style>`)
    }else{
        $("html").append(`<style type="text/css" id="narou-tweaker-style--skin" class="narou-tweaker-style"></style>`)
    }
    if("additionalCSS" in data){
        $("html").append(`<style type="text/css" id="narou-tweaker-style--user-css" class="narou-tweaker-style">${data.additionalCSS}</style>`)
    }else{
        $("html").append(`<style type="text/css" id="narou-tweaker-style--user-css" class="narou-tweaker-style"></style>`)
    }
})


chrome.storage.local.get(["appliedSkinCSS"], (data)=>{
    if("appliedSkinCSS" in data){
        $("html").append(`<style type="text/css" id="narou-tweaker-style--skin" class="narou-tweaker-style">${data.appliedSkinCSS}</style>`)
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