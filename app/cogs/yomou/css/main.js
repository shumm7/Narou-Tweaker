import { checkRankPageDetail } from "../utils.js"

const pageDetail = checkRankPageDetail()

if(pageDetail.site=="yomou"){
    if(pageDetail.detail=="rank" && pageDetail.type == "top"){
        chrome.storage.local.get(["yomouRankTop_UserCSS", "yomouRankTop_AppliedCSS"], (data)=>{
            /* Styles */
            if("yomouRankTop_AppliedCSS" in data){
                var l = $(`<style type="text/css" id="narou-tweaker-style--rank-top-css" class="narou-tweaker-style"></style>`)
                l.text(data.yomouRankTop_AppliedCSS)
                $("html").append(l)
            }else{
                $("html").append(`<style type="text/css" id="narou-tweaker-style--rank-top-css" class="narou-tweaker-style"></style>`)
            }

            /* User CSS */
            if("yomouRankTop_UserCSS" in data){
                var l = $(`<style type="text/css" id="narou-tweaker-style--rank-top-user-css" class="narou-tweaker-style"></style>`)
                l.text(data.yomouRankTop_UserCSS)
                $("html").append(l)
            }else{
                $("html").append(`<style type="text/css" id="narou-tweaker-style--rank-top-user-css" class="narou-tweaker-style"></style>`)
            }
        })

        chrome.storage.local.onChanged.addListener(function(changes){
            if(changes.yomouRankTop_AppliedCSS!=undefined){
                if($("#narou-tweaker-style--rank-top-css").length){
                    $("#narou-tweaker-style--rank-top-css").text(changes.yomouRankTop_AppliedCSS.newValue)
                }
            }
        
            if(changes.yomouRankTop_UserCSS!=undefined){
                if($("#narou-tweaker-style--rank-top-user-css").length){
                    $("#narou-tweaker-style--rank-top-user-css").text(changes.yomouRankTop_UserCSS.newValue)
                }
            }
        })
    }
}