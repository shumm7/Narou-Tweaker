
export function _reaction(){
    _impressionRead()
}

function _impressionRead(){
    if(location.pathname.match(/^\/usernovelimpression\/passivelist\/*$/)){
        chrome.storage.local.get(null, function(data){

            var list = $(".c-up-panel .c-up-panel__list")
            if(list.length){
                if(data.workspaceImpressionReadButton){
                    restoreRead()

                    list.find(".c-up-panel__list-item").each(function(){
                        var read_button = $(`<div class="c-up-markread"><span class="p-icon p-icon--check" aria-hidden="true"></span>既読にする</div>`)
                        var unread_button = $(`<div class="c-up-unmarkread"><span class="p-icon p-icon--times" aria-hidden="true"></span>未読にする</div>`)

                        var button = $(this).find(".c-button--primary")
                        if(button.length){
                            const url = button.attr("href")
                            var read_button = $(`<div class="c-up-markread"><span class="p-icon p-icon--check" aria-hidden="true"></span>既読にする</div>`)
                            var unread_button = $(`<div class="c-up-unmarkread"><span class="p-icon p-icon--times" aria-hidden="true"></span>未読にする</div>`)

                            read_button.on("click", function(){
                                chrome.storage.local.get(["workspaceImpressionRead"], function(l){
                                    if(!l.workspaceImpressionRead.includes(url)){
                                        l.workspaceImpressionRead.push(url)
                                        chrome.storage.local.set({workspaceImpressionRead: l.workspaceImpressionRead})
                                    }
                                })
                            })
                            unread_button.on("click", function(){
                                chrome.storage.local.get(["workspaceImpressionRead"], function(l){
                                    if(l.workspaceImpressionRead.includes(url)){
                                        l.workspaceImpressionRead = l.workspaceImpressionRead.filter(d => d!=url)
                                        chrome.storage.local.set({workspaceImpressionRead: l.workspaceImpressionRead})
                                    }
                                })
                            })
                            $(this).find(".c-up-reaction-item__menu").before(read_button)
                            $(this).find(".c-up-reaction-item__menu").before(unread_button)
                        }
                    })
                    
                    chrome.storage.local.onChanged.addListener(function(changes){
                        if(changes.workspaceImpressionRead!=undefined){
                            restoreRead()
                        }
                    })
                }
                
            }
        })
    }

    function restoreRead(){
        chrome.storage.local.get(null, function(data){
            const readList = data.workspaceImpressionRead
            $(".c-up-panel .c-up-panel__list .c-up-panel__list-item").each(function(){
                $(this).removeClass("c-up-reaction--read")
                var button = $(this).find(".c-button--primary")
                if(button.length){
                    const url = button.attr("href")
                    if(readList.includes(url)){
                        $(this).addClass("c-up-reaction--read")
                    }
                }
            })
        })
    }
}