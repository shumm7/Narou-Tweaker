import { indexToNcode } from "../../utils/text.js"
import { popHiddenList, popReadList, pushHiddenList, pushReadList } from "./_reactionTools.js"

export function _reaction(){
    _impressionRead()
}

function _impressionRead(){
    if(location.pathname.match(/^\/usernovelimpression\/passivelist\/*$/)){
        chrome.storage.local.get(null, function(data){

            var list = $(".c-up-panel .c-up-panel__list")
            if(list.length){
                if(data.workspaceImpressionHideButton){
                    restoreHide()
                    
                    list.find(".c-up-panel__list-item").each(function(){
                        /* 表示・隠すボタン */

                        var button = $(this).find(".c-button--primary")
                        if(button.length){
                            const url = new URL(button.attr("href"))
                            var m = url.pathname.match(/^\/impressionres\/input\/ncode\/(\d*).*\/kanrino\/(\d*)\/*/)
                            const ncode = indexToNcode(m[1])
                            const kanrino = m[2]

                            var hide_button = $(`<div class="c-up-markhide"><span class="p-icon p-icon--angle-up" aria-hidden="true"></span>隠す</div>`)
                            var show_button = $(`<div class="c-up-markshow"><span class="p-icon p-icon--angle-down" aria-hidden="true"></span>表示</div>`)

                            hide_button.on("click", function(){
                                pushHiddenList(ncode, kanrino)
                            })
                            show_button.on("click", function(){
                                popHiddenList(ncode, kanrino)
                            })
                            $(this).find(".c-up-reaction-item__menu").before(hide_button)
                            $(this).find(".c-up-reaction-item__menu").before(show_button)
                        }
                    })

                    chrome.storage.sync.onChanged.addListener(function(changes){
                        if(changes.workspaceImpressionHidden!=undefined){
                            restoreHide()
                        }
                    })
                }

                if(data.workspaceImpressionMarkedButton){
                    restoreRead()

                    list.find(".c-up-panel__list-item").each(function(){
                        /* 既読・未読ボタン */
                        var button = $(this).find(".c-button--primary")
                        if(button.length){
                            const url = new URL(button.attr("href"))
                            var m = url.pathname.match(/^\/impressionres\/input\/ncode\/(\d*).*\/kanrino\/(\d*)\/*/)
                            const ncode = indexToNcode(m[1])
                            const kanrino = m[2]

                            var read_button = $(`<div class="c-up-markread"><span class="p-icon p-icon--check" aria-hidden="true"></span>既読にする</div>`)
                            var unread_button = $(`<div class="c-up-unmarkread"><span class="p-icon p-icon--times" aria-hidden="true"></span>未読にする</div>`)

                            read_button.on("click", function(){
                                pushReadList(ncode, kanrino)
                                if(data.workspaceImpressionHideButton && data.workspaceImpressionHideWhenMarked){
                                    pushHiddenList(ncode, kanrino)
                                }
                            })
                            unread_button.on("click", function(){
                                popReadList(ncode, kanrino)
                                if(data.workspaceImpressionHideButton && data.workspaceImpressionHideWhenMarked){
                                    popHiddenList(ncode, kanrino)
                                }
                            })
                            $(this).find(".c-up-reaction-item__menu").before(read_button)
                            $(this).find(".c-up-reaction-item__menu").before(unread_button)
                        }
                    })

                    /* すべて既読・未読ボタン */
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
                        chrome.storage.sync.get(null, function(l){
                            $(".c-up-panel__list-item").each(function(){
                                var button = $(this).find(".c-button--primary")
                                const url = new URL(button.attr("href"))
                                var m = url.pathname.match(/^\/impressionres\/input\/ncode\/(\d*).*\/kanrino\/(\d*)\/*/)
                                const ncode = indexToNcode(m[1])
                                const kanrino = m[2]


                                if($(this).hasClass("c-up-reaction--read")){
                                    if(l.workspaceImpressionMarked==undefined){l.workspaceImpressionMarked = {}}
                                    if(ncode in l.workspaceImpressionMarked){
                                        l.workspaceImpressionMarked[ncode] = l.workspaceImpressionMarked[ncode].filter(d => d!=kanrino)
                                        if(l.workspaceImpressionMarked[ncode].length === 0)[
                                            l.workspaceImpressionMarked[ncode] = undefined
                                        ]
                                    }
                                }

                                if(data.workspaceImpressionHideButton && data.workspaceImpressionHideWhenMarked){
                                    if($(this).hasClass("c-up-reaction--hidden")){
                                        if(l.workspaceImpressionHidden==undefined){l.workspaceImpressionHidden = {}}
                                        if(ncode in l.workspaceImpressionHidden){
                                            l.workspaceImpressionHidden[ncode] = l.workspaceImpressionHidden[ncode].filter(d => d!=kanrino)
                                            if(l.workspaceImpressionHidden[ncode].length === 0)[
                                                l.workspaceImpressionHidden[ncode] = undefined
                                            ]
                                        }
                                    }
                                }
                            })

                            chrome.storage.sync.set({
                                workspaceImpressionMarked: l.workspaceImpressionMarked,
                                workspaceImpressionHidden: l.workspaceImpressionHidden
                            })
                        })
                    })

                    $(".c-up-markread-all").click(function(){
                        chrome.storage.sync.get(null, function(l){
                            $(".c-up-panel__list-item").each(function(){
                                var button = $(this).find(".c-button--primary")
                                const url = new URL(button.attr("href"))
                                var m = url.pathname.match(/^\/impressionres\/input\/ncode\/(\d*).*\/kanrino\/(\d*)\/*/)
                                const ncode = indexToNcode(m[1])
                                const kanrino = m[2]

                                if(!$(this).hasClass("c-up-reaction--read")){
                                    if(l.workspaceImpressionMarked==undefined){l.workspaceImpressionMarked = {}}
                                    if(!(ncode in l.workspaceImpressionMarked)){
                                        l.workspaceImpressionMarked[ncode] = []
                                    }
                                    l.workspaceImpressionMarked[ncode].push(kanrino)
                                }

                                if(data.workspaceImpressionHideButton && data.workspaceImpressionHideWhenMarked){
                                    if(!$(this).hasClass("c-up-reaction--hidden")){
                                        if(l.workspaceImpressionHidden==undefined){l.workspaceImpressionHidden = {}}
                                        if(!(ncode in l.workspaceImpressionHidden)){
                                            l.workspaceImpressionHidden[ncode] = []
                                        }
                                        l.workspaceImpressionHidden[ncode].push(kanrino)
                                    }
                                }
                            })

                            chrome.storage.sync.set({
                                workspaceImpressionMarked: l.workspaceImpressionMarked,
                                workspaceImpressionHidden: l.workspaceImpressionHidden
                            })
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

    function restoreHide(){
        chrome.storage.sync.get(null, function(data){
            let hideList = data.workspaceImpressionHidden
            if(hideList==undefined){hideList = []}
            $(".c-up-panel .c-up-panel__list .c-up-panel__list-item").each(function(){
                $(this).removeClass("c-up-reaction--hidden")
                var button = $(this).find(".c-button--primary")
                if(button.length){
                    const url = new URL(button.attr("href"))
                    var m = url.pathname.match(/^\/impressionres\/input\/ncode\/(\d*).*\/kanrino\/(\d*)\/*/)
                    const ncode = indexToNcode(m[1])
                    const kanrino = m[2]

                    if(ncode in hideList){
                        if(hideList[ncode].includes(kanrino)){
                            $(this).addClass("c-up-reaction--hidden")
                        }
                    }
                }
            })
        })
    }
}