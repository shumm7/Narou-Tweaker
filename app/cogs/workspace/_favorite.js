const path = location.pathname

export function _bookmark(){
    bookmarkLayout()
    bookmarkCategoryLayout()
}

function bookmarkLayout(){
    chrome.storage.local.get(null, function(data){
        // ブックマークページのレイアウト調整
        const layout = data.workspaceBookmarkLayout
        if(layout==1){ // 旧デザインライク
            $("body").addClass("narou-tweaker-bookmark-layout-1")
        }else if(layout==2){ //コンパクト
            $("body").addClass("narou-tweaker-bookmark-layout-2")
        }else{ //デフォルト
            $("body").addClass("narou-tweaker-bookmark-layout-0")
        }

        $("li.c-up-panel__list-item.p-up-bookmark-item").each(function(){
            let insertClass
            if(path.match(/^\/favnovelmain\/isnoticelist\/*.*/) || path.match(/^\/favnovelmain18\/isnoticelist\/*.*/)){
                $(this).wrapInner("<div class='c-up-chk-item__content'>")
                insertClass = "c-up-chk-item__content--nochk"
            }

            var outer = $(this).find(".c-up-chk-item__content")
            
            if(layout==1){
                outer.addClass("narou-tweaker-bookmark-layout-1--item")
                if(insertClass){
                    outer.addClass(insertClass)
                }

                // 要素の配置
                var notice = outer.find(".p-up-bookmark-item__notice")
                var invisible = outer.find(".p-up-bookmark-item__private")

                // Header
                var title = outer.find(".p-up-bookmark-item__title a").addClass("p-up-bookmark-item__description__title")
                var label = outer.find(".p-up-bookmark-item__title span").clone().addClass("p-up-bookmark-item__description__label")
                title.find("span").remove()
                var author_link = outer.find(".p-up-bookmark-item__author a")
                var author = $(`<span class="p-up-bookmark-item__description__author">`).append(author_link)

                outer.find(".p-up-bookmark-item__header").append(`<p class="p-up-bookmark-item__description"></p>`)
                var header = outer.find(".p-up-bookmark-item__header .p-up-bookmark-item__description")
                header.append(label)
                header.append(title)
                header.append(author)
                outer.find(".p-up-bookmark-item__header > .p-up-bookmark-item__title").remove()

                // Middle
                var date = outer.find(".p-up-bookmark-item__date")
                var complete = outer.find(".p-up-bookmark-item__complete")
                var memo = outer.find(".c-up-memo")

                var middle = outer.find(".p-up-bookmark-item__info-button")
                middle.before(memo)
                middle.append(date)
                middle.append(complete)

                var current_ep = outer.find(".p-up-bookmark-item__button .c-button-combo a:nth-child(1)")
                var latest_ep = outer.find(".p-up-bookmark-item__button .c-button-combo a:nth-child(2)")
                var episode = $(`<span class="p-up-bookmark-item__episode">`)
                if(current_ep.hasClass("c-button--primary")){
                    current_ep.removeClass(["c-button c-button--primary c-button--sm"])
                    current_ep.find(".p-up-bookmark-item__unread").remove()
                    episode.prepend($(`<span class="p-up-bookmark-item__episode__siori">`).append(current_ep))
                    current_ep.find(".p-icon--siori").insertBefore(current_ep)
                    if(data.workspaceBookmarkReplaceEpisode){
                        current_ep.text(current_ep.text().replace(/ep\.(\d+)/, "$1部分"))
                    }
                    $(this).addClass("p-up-bookmark-item--siori")
                }

                latest_ep.removeClass("c-button c-button--outline c-button--sm")
                if(data.workspaceBookmarkReplaceEpisode){
                    if(complete.length){
                        latest_ep.text(latest_ep.text().replace(/最新 ep\.(\d+)/, "最終 $1部分"))
                    }else{
                        latest_ep.text(latest_ep.text().replace(/ep\.(\d+)/, "$1部分"))
                    }
                }
                episode.append($(`<span class="p-up-bookmark-item__episode__latest">`).append(latest_ep))
                outer.find(".p-up-bookmark-item__button").remove()
                outer.find(".p-up-bookmark-item__info").remove()
                middle.append(episode)
                
                // footer
                var option = outer.find(".p-up-bookmark-item__menu")

                outer.append(`<div class="p-up-bookmark-item__option-button"></div>`)
                var footer = outer.find(".p-up-bookmark-item__option-button")
                footer.append(`<span class="p-up-bookmark-item__status">`)
                if(notice.length){
                    $(this).addClass("p-up-bookmark-item--notice")
                    notice.text("チェック中")
                    outer.find(".p-up-bookmark-item__status").append(notice)
                }
                if(invisible.length){
                    invisible.text("非公開ブックマーク")
                    outer.find(".p-up-bookmark-item__status").append(invisible)
                }
                footer.append(option)

            }else if(layout==2){
                outer.addClass("narou-tweaker-bookmark-layout-2--item")
                if(insertClass){
                    outer.addClass(insertClass)
                }
                var c = outer.clone()

                // 要素の取得
                var complete = outer.find(".p-up-bookmark-item__complete")
                var info = outer.find(".p-up-bookmark-item__info")
                var option = outer.find(".p-up-bookmark-item__menu")
                var memo = outer.find(".c-up-memo")

                // 要素の配置
                // header
                var title = outer.find(".p-up-bookmark-item__title a").addClass("p-up-bookmark-item__description__title")
                var label = outer.find(".p-up-bookmark-item__title span").addClass("p-up-bookmark-item__description__label")
                title.find("span").remove()

                outer.find(".p-up-bookmark-item__header").append(`<p class="p-up-bookmark-item__description"></p>`)
                var header = outer.find(".p-up-bookmark-item__header")
                var list_elm = header.find(".p-up-bookmark-item__description")
                list_elm.append(label)
                list_elm.append(title)

                var current_ep = outer.find(".p-up-bookmark-item__button .c-button-combo a:nth-child(1)")
                var latest_ep = outer.find(".p-up-bookmark-item__button .c-button-combo a:nth-child(2)")
                var episode = $(`<span class="p-up-bookmark-item__episode">`)
                if(current_ep.hasClass("c-button--primary")){
                    current_ep.removeClass(["c-button c-button--primary c-button--sm"])
                    current_ep.find(".p-up-bookmark-item__unread").remove()
                    episode.prepend($(`<span class="p-up-bookmark-item__episode__siori">`).append(current_ep))
                    var icon = current_ep.find(".p-icon--siori").clone()
                    if(data.workspaceBookmarkReplaceEpisode){
                        current_ep.text(current_ep.text().replace(/ep\.(\d+)/, "$1部分"))
                    }
                    current_ep.find(".p-icon--siori").remove()
                    current_ep.prepend(icon)
                    $(this).addClass("p-up-bookmark-item--siori")
                }
                latest_ep.removeClass("c-button c-button--outline c-button--sm")
                if(data.workspaceBookmarkReplaceEpisode){
                    if(complete.length){
                        latest_ep.text(latest_ep.text().replace(/最新 ep\.(\d+)/, "最終 $1部分"))
                    }else{
                        latest_ep.text(latest_ep.text().replace(/ep\.(\d+)/, "$1部分"))
                    }
                }
                episode.append($(`<span class="p-up-bookmark-item__episode__latest">`).append(latest_ep))
                list_elm.after(episode)

                header.append($(`<span class="p-up-bookmark-item__show-info-button"><span class="p-icon p-icon--caret-down" aria-hidden="true"></span></span>`).click(function(){
                    if(outer.hasClass("p-up-bookmark-item--hidden")){
                        outer.removeClass("p-up-bookmark-item--hidden")
                    }else{
                        outer.addClass("p-up-bookmark-item--hidden")
                    }
                }))
                outer.addClass("p-up-bookmark-item--hidden")

                header.after(info)
                info.prepend(memo)
                info.find(".p-up-bookmark-item__status").append(option)
                outer.find(".p-up-bookmark-item__info-button").remove()

            }else{
                outer.addClass("narou-tweaker-bookmark-layout-0--item")
                if(data.workspaceBookmarkReplaceEpisode){
                    var complete = outer.find(".p-up-bookmark-item__complete").clone()
                    var current_ep = outer.find(".p-up-bookmark-item__button .c-button-combo a:nth-child(1)")
                    var latest_ep = outer.find(".p-up-bookmark-item__button .c-button-combo a:nth-child(2)")

                    var icon = current_ep.find(".p-icon--siori").clone()
                    var unread_mark = current_ep.find(".p-up-bookmark-item__unread").clone()
                    current_ep.find(".p-up-bookmark-item__unread").remove()
                    current_ep.find(".p-icon--siori").remove()
                    current_ep.text(current_ep.text().replace(/ep\.(\d+)/, "$1部分"))
                    current_ep.prepend(icon)
                    current_ep.append(unread_mark)

                    if(complete.length){
                        latest_ep.text(latest_ep.text().replace(/最新 ep\.(\d+)/, "最終 $1部分"))
                    }else{
                        latest_ep.text(latest_ep.text().replace(/ep\.(\d+)/, "$1部分"))
                    }
                }
            }
            


        })
    })
}

function bookmarkCategoryLayout(){
    chrome.storage.local.get(null, function(data){
        // ブックマークページのカテゴリのレイアウト調整
        function resetTags(layout){
            layout = parseInt(layout)
            $("body").removeClass("narou-tweaker-bookmark-category-layout-0")
            $("body").removeClass("narou-tweaker-bookmark-category-layout-1")
            $("body").removeClass("narou-tweaker-bookmark-category-layout-2")

            if(layout==1){ // サイドバー
                $("body").addClass("narou-tweaker-bookmark-category-layout-1")
            }
            else if(layout==2){ //両方
                $("body").addClass("narou-tweaker-bookmark-category-layout-2")
            }
            else{ //デフォルト
                $("body").addClass("narou-tweaker-bookmark-category-layout-0")
            }
        }
        resetTags(data.workspaceBookmarkCategoryLayout)

        if($(".p-up-bookmark-category").length){
            $(".l-sidebar .c-ad").before(`
                <div class="c-up-aside" id="bookmark-category">
                    <div class="c-up-aside__box">
                        <div class="c-up-aside__nav">
                            <div class="c-up-aside__nav-headline">カテゴリ選択</div>
                            <ul class="c-up-aside__nav-list">
                            </ul>
                        </div>
                    </div>
                </div>
            `)

            $(".p-up-bookmark-category select option").each(function(){
                var href = $(this).val()
                var selected = $(this).prop("selected")
                var title = $(this).text()

                var c = $(`
                    <li class="c-up-aside__nav-item">
                        <a href="${href}">${title}</a>
                    </li>
                `)
                if(selected){
                    c.addClass("is-selected")
                }

                $("#bookmark-category ul.c-up-aside__nav-list").append(c)
            })
        }

        chrome.storage.local.onChanged.addListener(function(changes){
            if(changes.workspaceBookmarkCategoryLayout!=undefined){
                resetTags(changes.workspaceBookmarkCategoryLayout.newValue)
            }
        })
    })
}