export function _general(){
    /* Show User ID */
    chrome.storage.local.get(null, (data) => {
        if (data.mypageShowUserId){
            var userid = $(".p-userheader__tab .p-userheader__tab-list-item:nth-child(1) a").attr("href").match(`https://${location.hostname}/(.*)/`)[1].trim()
            if(userid!=undefined){
                $(".p-userheader .p-userheader__inner .p-userheader__username").after("<div class='p-userheader__userid'>" + userid + "</div>")
            }
        }
    })
    
    /* Disable External Link Warning */
    chrome.storage.local.get(null, (data) => {
        if (data.mypageDisableExternalURLWarning){
            var span = $(".p-userheader__tooltip .p-userheader__tooltip-item a > span.p-icon--earth")
            if(span.length){
                var url = decodeURIComponent(span.parent().prop("href"))
                url = url.replace(/^https:\/\/x?mypage\.syosetu\.com\/\?jumplink\=(.*)/g, "$1")
                span.parent().prop("href", url)
            }
        }
    })
}