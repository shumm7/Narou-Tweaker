openDropdown()

function openDropdown(){
    chrome.tabs.query({active: true, lastFocusedWindow:true}, tabs => {
        chrome.storage.local.get("extPopupDefaultPage", function(data){
            if(data.extPopupDefaultPage){
                if(data.extPopupDefaultPage === "__auto__"){
                    try{
                        const tab = tabs[0]
                        const url = new URL(tab.url)
    
                        if(url.hostname == "ncode.syosetu.com" || url.hostname=="novelcom.syosetu.com" || url.hostname == "novel18.syosetu.com" || url.hostname=="novelcom18.syosetu.com" ){
                            $("#option-popup").attr("src", `/options/novel/index.html`)
                        }
                        else if(url.hostname == "mypage.syosetu.com" || url.hostname==" xmypage.syosetu.com" ){
                            $("#option-popup").attr("src", `/options/mypage/index.html`)
                        }
                        else if(url.hostname == "kasasagi.hinaproject.com" ){
                            $("#option-popup").attr("src", `/options/kasasagi/index.html`)
                        }
                        else if(url.hostname == "syosetu.com" ){
                            $("#option-popup").attr("src", `/options/workspace/index.html`)
                        }
                        else if(url.hostname == "yomou.syosetu.com" || url.hostname=="noc.syosetu.com" || url.hostname == "mnlt.syosetu.com" || url.hostname=="mid.syosetu.com" ){
                            $("#option-popup").attr("src", `/options/yomou/index.html`)
                        }
                        else if(url.hostname == "mitemin.net" || url.hostname.match(/^\d+\.mitemin\.net$/) || url.hostname == "eparet.net" ){
                            $("#option-popup").attr("src", `/options/mitemin/index.html`)
                        }
                    }catch(e){
    
                    }
    
                }else{
                    $("#option-popup").attr("src", `/options/${data.extPopupDefaultPage}/index.html`)
                }
            }else{
                $("#option-popup").attr("src", `/options/general/index.html`)
            }
            
        })
    })
}