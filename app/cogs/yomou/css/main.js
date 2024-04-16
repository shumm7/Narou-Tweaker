import { checkRankPageDetail } from "../utils.js"

const pageDetail = checkRankPageDetail()

if(pageDetail.site=="yomou"){
    if(pageDetail.detail=="rank" && pageDetail.type == "top"){
        chrome.storage.local.get(["yomouRankTop_UserCSS", "yomouRankTop_AppliedCSS"], (data)=>{
            /* Styles */
            if("yomouRankTop_AppliedCSS" in data){
                var l = $(`<style type="text/css" id="narou-tweaker-style--rank-css" class="narou-tweaker-style"></style>`)
                l.text(data.yomouRankTop_AppliedCSS)
                $("html").append(l)
            }else{
                $("html").append(`<style type="text/css" id="narou-tweaker-style--rank-css" class="narou-tweaker-style"></style>`)
            }

            /* User CSS */
            if("yomouRankTop_UserCSS" in data){
                var l = $(`<style type="text/css" id="narou-tweaker-style--rank-user-css" class="narou-tweaker-style"></style>`)
                l.text(data.yomouRankTop_UserCSS)
                $("html").append(l)
            }else{
                $("html").append(`<style type="text/css" id="narou-tweaker-style--rank-user-css" class="narou-tweaker-style"></style>`)
            }
        })

        chrome.storage.local.onChanged.addListener(function(changes){
            if(changes.yomouRankTop_AppliedCSS!=undefined){
                if($("#narou-tweaker-style--rank-css").length){
                    $("#narou-tweaker-style--rank-css").text(changes.yomouRankTop_AppliedCSS.newValue)
                }
            }
        
            if(changes.yomouRankTop_UserCSS!=undefined){
                if($("#narou-tweaker-style--rank-user-css").length){
                    $("#narou-tweaker-style--rank-user-css").text(changes.yomouRankTop_UserCSS.newValue)
                }
            }
        })
    }
    
    else if(pageDetail.detail=="rank" && pageDetail.type != "top"){
        chrome.storage.local.get(["yomouRank_UserCSS", "yomouRank_AppliedCSS"], (data)=>{
            /* Styles */
            if("yomouRank_AppliedCSS" in data){
                var l = $(`<style type="text/css" id="narou-tweaker-style--rank-css" class="narou-tweaker-style"></style>`)
                l.text(data.yomouRank_AppliedCSS)
                $("html").append(l)
            }else{
                $("html").append(`<style type="text/css" id="narou-tweaker-style--rank-css" class="narou-tweaker-style"></style>`)
            }

            /* User CSS */
            if("yomouRank_UserCSS" in data){
                var l = $(`<style type="text/css" id="narou-tweaker-style--rank-user-css" class="narou-tweaker-style"></style>`)
                l.text(data.yomouRank_UserCSS)
                $("html").append(l)
            }else{
                $("html").append(`<style type="text/css" id="narou-tweaker-style--rank-user-css" class="narou-tweaker-style"></style>`)
            }
        })

        chrome.storage.local.onChanged.addListener(function(changes){
            if(changes.yomouRank_AppliedCSS!=undefined){
                if($("#narou-tweaker-style--rank-css").length){
                    $("#narou-tweaker-style--rank-css").text(changes.yomouRank_AppliedCSS.newValue)
                }
            }
        
            if(changes.yomouRank_UserCSS!=undefined){
                if($("#narou-tweaker-style--rank-user-css").length){
                    $("#narou-tweaker-style--rank-user-css").text(changes.yomouRank_UserCSS.newValue)
                }
            }
        })
    }
}