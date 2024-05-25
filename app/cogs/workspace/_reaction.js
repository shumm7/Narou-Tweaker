import { indexToNcode } from "/utils/text.js"

export function _reaction(){
    _impressionRead()
}

function _impressionRead(){
    if(location.pathname.match(/^\/usernovelimpression\/passivelist\/*$/)){
        chrome.storage.local.get(null, function(data){

            var list = $(".c-up-panel .c-up-panel__list")
            if(list.length){
                if(data.workspaceImpressionMarkedButton){
                    restoreRead()

                    list.find(".c-up-panel__list-item").each(function(){
                        var read_button = $(`<div class="c-up-markread"><span class="p-icon p-icon--check" aria-hidden="true"></span>既読にする</div>`)
                        var unread_button = $(`<div class="c-up-unmarkread"><span class="p-icon p-icon--times" aria-hidden="true"></span>未読にする</div>`)

                        var button = $(this).find(".c-button--primary")
                        if(button.length){
                            const url = new URL(button.attr("href"))
                            var m = url.pathname.match(/^\/impressionres\/input\/ncode\/(\d*).*\/kanrino\/(\d*)\/*/)
                            const ncode = indexToNcode(m[1])
                            const kanrino = m[2]

                            var read_button = $(`<div class="c-up-markread"><span class="p-icon p-icon--check" aria-hidden="true"></span>既読にする</div>`)
                            var unread_button = $(`<div class="c-up-unmarkread"><span class="p-icon p-icon--times" aria-hidden="true"></span>未読にする</div>`)

                            read_button.on("click", function(){
                                chrome.storage.sync.get(["workspaceImpressionMarked"], function(l){
                                    if(l.workspaceImpressionMarked==undefined){l.workspaceImpressionMarked = {}}
                                    if(!(ncode in l.workspaceImpressionMarked)){
                                        l.workspaceImpressionMarked[ncode] = []
                                    }
                                    l.workspaceImpressionMarked[ncode].push(kanrino)
                                    chrome.storage.sync.set({workspaceImpressionMarked: l.workspaceImpressionMarked})
                                })
                            })
                            unread_button.on("click", function(){
                                chrome.storage.sync.get(["workspaceImpressionMarked"], function(l){
                                    if(l.workspaceImpressionMarked==undefined){l.workspaceImpressionMarked = {}}
                                    if(ncode in l.workspaceImpressionMarked){
                                        l.workspaceImpressionMarked[ncode] = l.workspaceImpressionMarked[ncode].filter(d => d!=kanrino)
                                        if(l.workspaceImpressionMarked[ncode].length === 0)[
                                            l.workspaceImpressionMarked[ncode] = undefined
                                        ]
                                        chrome.storage.sync.set({workspaceImpressionMarked: l.workspaceImpressionMarked})
                                    }
                                })
                            })
                            $(this).find(".c-up-reaction-item__menu").before(read_button)
                            $(this).find(".c-up-reaction-item__menu").before(unread_button)
                        }
                    })

                    $(".c-up-list-tools").append(`
                        <div class="c-up-markread-button">
                            <!--
                            <div class="c-up-unmarkread-all">
                                <span class="p-icon p-icon--times" aria-hidden="true"></span>すべて未読にする
                            </div>
                            -->
                            <div class="c-up-markread-all">
                                <span class="p-icon p-icon--check" aria-hidden="true"></span>すべて既読にする
                            </div>
                        </div>
                    `)
                    $(".c-up-unmarkread-all").click(function(){
                        chrome.storage.sync.get(["workspaceImpressionMarked"], function(l){
                            $(".c-up-panel__list-item.c-up-reaction--read").each(function(){
                                var button = $(this).find(".c-button--primary")
                                if(button.length){
                                    const url = new URL(button.attr("href"))
                                    var m = url.pathname.match(/^\/impressionres\/input\/ncode\/(\d*).*\/kanrino\/(\d*)\/*/)
                                    const ncode = indexToNcode(m[1])
                                    const kanrino = m[2]


                                    if(l.workspaceImpressionMarked==undefined){l.workspaceImpressionMarked = {}}
                                    if(ncode in l.workspaceImpressionMarked){
                                        l.workspaceImpressionMarked[ncode] = l.workspaceImpressionMarked[ncode].filter(d => d!=kanrino)
                                        if(l.workspaceImpressionMarked[ncode].length === 0)[
                                            l.workspaceImpressionMarked[ncode] = undefined
                                        ]
                                    }
                                }
                            })

                            chrome.storage.sync.set({workspaceImpressionMarked: l.workspaceImpressionMarked})
                        })
                    })

                    $(".c-up-markread-all").click(function(){
                        chrome.storage.sync.get(["workspaceImpressionMarked"], function(l){
                            $(".c-up-panel__list-item:not(.c-up-reaction--read)").each(function(){
                                var button = $(this).find(".c-button--primary")
                                if(button.length){
                                    const url = new URL(button.attr("href"))
                                    var m = url.pathname.match(/^\/impressionres\/input\/ncode\/(\d*).*\/kanrino\/(\d*)\/*/)
                                    const ncode = indexToNcode(m[1])
                                    const kanrino = m[2]

                                    if(l.workspaceImpressionMarked==undefined){l.workspaceImpressionMarked = {}}
                                    if(!(ncode in l.workspaceImpressionMarked)){
                                        l.workspaceImpressionMarked[ncode] = []
                                    }
                                    l.workspaceImpressionMarked[ncode].push(kanrino)
                                }
                            })

                            chrome.storage.sync.set({workspaceImpressionMarked: l.workspaceImpressionMarked})
                        })
                    })
                    
                    chrome.storage.sync.onChanged.addListener(function(changes){
                        if(changes.workspaceImpressionMarked!=undefined){
                            restoreRead()
                        }
                    })
                }
                
            }
        })
    }

    function restoreRead(){
        chrome.storage.sync.get(null, function(data){
            let readList = data.workspaceImpressionMarked
            if(readList==undefined){readList = []}
            $(".c-up-panel .c-up-panel__list .c-up-panel__list-item").each(function(){
                $(this).removeClass("c-up-reaction--read")
                var button = $(this).find(".c-button--primary")
                if(button.length){
                    const url = new URL(button.attr("href"))
                    var m = url.pathname.match(/^\/impressionres\/input\/ncode\/(\d*).*\/kanrino\/(\d*)\/*/)
                    const ncode = indexToNcode(m[1])
                    const kanrino = m[2]

                    if(ncode in readList){
                        if(readList[ncode].includes(kanrino)){
                            $(this).addClass("c-up-reaction--read")
                        }
                    }
                }
            })
        })
    }
}