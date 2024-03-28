
chrome.storage.local.get(["appliedSkinCSS"], (data)=>{
    if("appliedSkinCSS" in data){
        $("html").append(`<style type="text/css" id="narou-tweaker-style--skin" class="narou-tweaker-style">${data.appliedSkinCSS}</style>`)
    }
})

chrome.storage.local.onChanged.addListener(function(changes){
    if(changes.appliedSkinCSS!=undefined){
        $("#narou-tweaker-style--skin").remove()
        $("html").append(`<style type="text/css" id="narou-tweaker-style--skin" class="narou-tweaker-style">${changes.appliedSkinCSS.newValue}</style>`)
    }
})