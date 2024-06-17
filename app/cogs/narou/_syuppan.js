import { escapeHtml } from "/utils/text.js"

export function syuppan(){
    chrome.storage.local.get(null, function(data){
        if(location.hostname==="syosetu.com" || location.hostname==="nl.syosetu.com"){
            if(location.pathname.match(/^\/syuppan\/view\/bookid\/\d+\/*/)){
                if(data.narouSyuppanShowBookViewImage){
                    _viewBookImage()
                }
            }else if(location.pathname.match(/^\/syuppan\/list\/*/)){
                if(data.narouSyuppanShowBookImage){
                    _listBookImage()
                }
            }  
        }
    })
}

function _viewBookImage(){
    if($(".p-syuppan-detail__image[href^='https://www.amazon.co.jp/dp/'] .c-syuppan-noimage").length){
        var image = $(".p-syuppan-detail__image[href^='https://www.amazon.co.jp/dp/']")
        var amazonLink = image.prop("href")

        var amazonId = escapeHtml(amazonLink.match(/^https\:\/\/www\.amazon\.co\.jp\/dp\/(.*)\/$/)[1])
        var imageUrl = `https://images.amazon.com/images/P/${amazonId}.09_SL500_.jpg`

        image.empty()
        image.append(`<img src="${imageUrl}" class="lazy">`)
    }
}

function _listBookImage(){
    $(".p-syuppan-list .p-syuppan-list__image.p-syuppan-list__image--noimage").each(function(){
        var listImage = $(this)
        const url = listImage.prop("href")
        listImage.prop("href", "javascript:void(0)")
        listImage.addClass("p-syuppan-list__image--nosearch")
        listImage.find(".c-syuppan-noimage__title").append(`<div class="p-syuppan-list__image--searchimage">クリックで書影を取得</div>`)
        
        listImage.on("click", function(){
            chrome.runtime.sendMessage({action: "fetch", format: "text", data: {url: url, options: {'method': 'GET'}}}, function(response){
                if(response){
                    if(response.success && response.action=="fetch"){
                        var body = $($.parseHTML(response.result))

                        listImage.removeClass("p-syuppan-list__image--nosearch")
                        if(body.find(".p-syuppan-detail__image[href^='https://www.amazon.co.jp/dp/'] .c-syuppan-noimage").length){
                            var image = body.find(".p-syuppan-detail__image[href^='https://www.amazon.co.jp/dp/']")
                            var amazonLink = image.prop("href")
                    
                            var amazonId = escapeHtml(amazonLink.match(/^https\:\/\/www\.amazon\.co\.jp\/dp\/(.*)\/$/)[1])
                            var imageUrl = `https://images.amazon.com/images/P/${amazonId}.09_SL500_.jpg`

                            listImage.removeClass("p-syuppan-list__image--noimage")
                            listImage.empty()
                            listImage.append(`<img src="${imageUrl}" class="lazy" style="display: inline;">`)
                            listImage.prop("href", url)
                            listImage.find(".p-syuppan-list__image--searchimage").remove()
                        }else{
                            listImage.prop("href", url)
                            listImage.find(".p-syuppan-list__image--searchimage").remove()
                        }
                    }
                }
            })
        })
    })
}