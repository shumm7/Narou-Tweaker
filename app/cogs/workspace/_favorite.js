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
                var c = outer.clone()

                outer.empty()
                outer.append(`
                    <div class="p-up-bookmark-item__header">
                        <p class="p-up-bookmark-item__description"></p>
                    </div>
                    <div class="p-up-bookmark-item__info-button"></div>
                    <div class="p-up-bookmark-item__option-button"></div>
                `)

                var title = c.find(".p-up-bookmark-item__title a").clone().addClass("p-up-bookmark-item__description__title")
                title.find("span").remove()
                var label = c.find(".p-up-bookmark-item__title span").clone().addClass("p-up-bookmark-item__description__label")
                var author_link = c.find(".p-up-bookmark-item__author a").clone()
                var author = $(`<span class="p-up-bookmark-item__description__author">`).append(author_link)
                var date = c.find(".p-up-bookmark-item__date").clone()
                var notice = c.find(".p-up-bookmark-item__notice").clone()
                var complete = c.find(".p-up-bookmark-item__complete").clone()
                var invisible = c.find(".p-up-bookmark-item__private").clone()
                var option = c.find(".p-up-bookmark-item__menu").clone(true)
                var memo = c.find(".c-up-memo").clone()

                var header = outer.find(".p-up-bookmark-item__header .p-up-bookmark-item__description")
                header.append(label)
                header.append(title)
                header.append(author)

                var middle = outer.find(".p-up-bookmark-item__info-button")
                middle.append(date)
                middle.append(complete)
                middle.before(memo)

                var current_ep = c.find(".p-up-bookmark-item__button .c-button-combo a:nth-child(1)").clone()
                var latest_ep = c.find(".p-up-bookmark-item__button .c-button-combo a:nth-child(2)").clone()
                var episode = $(`<span class="p-up-bookmark-item__episode">`)
                if(current_ep.hasClass("c-button--primary")){
                    current_ep.removeClass(["c-button c-button--primary c-button--sm"])
                    current_ep.find(".p-up-bookmark-item__unread").remove()
                    episode.prepend($(`<span class="p-up-bookmark-item__episode__siori">`).append(current_ep))
                    current_ep.find(".p-icon--siori").insertBefore(current_ep)
                    current_ep.text(current_ep.text().replace(/ep\.(\d+)/, "$1部分"))
                    $(this).addClass("p-up-bookmark-item--siori")
                }

                latest_ep.removeClass("c-button c-button--outline c-button--sm")
                if(complete.length){
                    latest_ep.text(latest_ep.text().replace(/最新 ep\.(\d+)/, "最終 $1部分"))
                }else{
                    latest_ep.text(latest_ep.text().replace(/ep\.(\d+)/, "$1部分"))
                }
                episode.append($(`<span class="p-up-bookmark-item__episode__latest">`).append(latest_ep))
                middle.append(episode)
                
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

            }else{
                outer.addClass("narou-tweaker-bookmark-layout-0--item")
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