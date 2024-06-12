import { checkXmypage } from "./utils.js"

export function _favuser(){
    const xmypage = checkXmypage()

    chrome.storage.local.get(null, function(data){
        $(".p-favuser-list").each(function(){
            const outer = $(this)

            if(data.mypageShowFavUserId){
                const url = outer.find(".p-favuser-list__header a").prop("href")
                try{
                    var u = new URL(url)
                    const userid = u.pathname.match(/^\/(.*)\/+/)[1]

                    outer.find(".p-favuser-list__header").append(`<span class="p-favuser-list__userid">${userid}</span>`)
                }catch(e){

                }
            }
        })
    })
}