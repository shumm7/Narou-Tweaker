import { checkRankPageDetail } from "../utils.js"

const pageDetail = checkRankPageDetail()

if(pageDetail.site=="yomou"){
    if(pageDetail.detail=="rank" && pageDetail.type == "top"){
        chrome.storage.session.get(["yomouRankTop_AppliedCSS"], (data)=>{
            /* Styles */
            if("yomouRankTop_AppliedCSS" in data){
                var l = $(`<style type="text/css" id="narou-tweaker-style--rank-css" class="narou-tweaker-style"></style>`)
                l.text(data.yomouRankTop_AppliedCSS)
                $("html").append(l)
            }else{
                $("html").append(`<style type="text/css" id="narou-tweaker-style--rank-css" class="narou-tweaker-style"></style>`)
            }
        })
        chrome.storage.local.get(["yomouRankTop_CustomCSS"], (data)=>{
            /* User CSS */
            if("yomouRankTop_CustomCSS" in data){
                var l = $(`<style type="text/css" id="narou-tweaker-style--rank-user-css" class="narou-tweaker-style"></style>`)
                l.text(data.yomouRankTop_CustomCSS)
                $("html").append(l)
            }else{
                $("html").append(`<style type="text/css" id="narou-tweaker-style--rank-user-css" class="narou-tweaker-style"></style>`)
            }
        })

        chrome.storage.session.onChanged.addListener(function(changes){
            if(changes.yomouRankTop_AppliedCSS!=undefined){
                if($("#narou-tweaker-style--rank-css").length){
                    $("#narou-tweaker-style--rank-css").text(changes.yomouRankTop_AppliedCSS.newValue)
                }
            }
        })
        chrome.storage.local.onChanged.addListener(function(changes){
            if(changes.yomouRankTop_CustomCSS!=undefined){
                if($("#narou-tweaker-style--rank-user-css").length){
                    $("#narou-tweaker-style--rank-user-css").text(changes.yomouRankTop_CustomCSS.newValue)
                }
            }
        })
    }
    
    else if(pageDetail.detail=="rank" && pageDetail.type != "top"){
        chrome.storage.session.get(["yomouRank_AppliedCSS"], (data)=>{
            /* Styles */
            if("yomouRank_AppliedCSS" in data){
                var l = $(`<style type="text/css" id="narou-tweaker-style--rank-css" class="narou-tweaker-style"></style>`)
                l.text(data.yomouRank_AppliedCSS)
                $("html").append(l)
            }else{
                $("html").append(`<style type="text/css" id="narou-tweaker-style--rank-css" class="narou-tweaker-style"></style>`)
            }
        })
        
        chrome.storage.local.get(["yomouRank_CustomCSS"], (data)=>{
            /* User CSS */
            if("yomouRank_CustomCSS" in data){
                var l = $(`<style type="text/css" id="narou-tweaker-style--rank-user-css" class="narou-tweaker-style"></style>`)
                l.text(data.yomouRank_CustomCSS)
                $("html").append(l)
            }else{
                $("html").append(`<style type="text/css" id="narou-tweaker-style--rank-user-css" class="narou-tweaker-style"></style>`)
            }
        })

        chrome.storage.session.onChanged.addListener(function(changes){
            if(changes.yomouRank_AppliedCSS!=undefined){
                if($("#narou-tweaker-style--rank-css").length){
                    $("#narou-tweaker-style--rank-css").text(changes.yomouRank_AppliedCSS.newValue)
                }
            }
        })
        chrome.storage.local.onChanged.addListener(function(changes){
            if(changes.yomouRank_CustomCSS!=undefined){
                if($("#narou-tweaker-style--rank-user-css").length){
                    $("#narou-tweaker-style--rank-user-css").text(changes.yomouRank_CustomCSS.newValue)
                }
            }
        })
    }
}