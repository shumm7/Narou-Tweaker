import { replaceUrl, getDatetimeStringWithoutSecond } from "/utils/text.js"
import { getNcode, getEpisode, checkNovelPageDetail, isR18 } from "./utils.js"

export function _novel(){
    chrome.storage.local.get(null, (data) => {
        const pageDetail = checkNovelPageDetail()
        if(data.novelCustomStyle){
            $("body").addClass("narou-tweaker")
            $("#footer").remove()

            if(pageDetail=="novel"){
                _novelPage()
            }
        }
        if(data.novelForceMypageLink){
            _authorLink()
        }
        if(pageDetail=="novel"){
            if(data.novelVertical){
                _tategaki()
            }
            _autoURL()
            _saveHistory()
        }else if(pageDetail=="top"){
            _novelTop()
            _saveHistory()
            if(data.novelShowHistoryOnSublist){
                _history()
            }
        }else if(pageDetail=="series"){
            $("body").addClass("narou-tweaker--series")
        }

    })
}

function _novelTop(){
    chrome.storage.local.get(null, (data) => {
        if(data.novelShowAllExtext){
            var Extext = $("#novel_ex")
            var hiddenText = $("#novel_ex .hidden")
            if(hiddenText.length && Extext.length){
                var text = hiddenText[0].innerHTML
                $("#novel_ex .more").remove()
                $("#novel_ex .hidden").remove()
                $("#novel_ex span").remove()
                Extext[0].innerHTML += text
            }
        }
    })
}

function _novelPage(){
    const ncode = getNcode()
    const episode = getEpisode()
    var title
    var chapter = undefined
    
    if(episode==0){
        title = $(".novel_title")
    }else{
        title = $("#container .contents1 a[href='/"+ncode+"/']")
        if($("#container .contents1 .chapter_title").length){
            chapter = $("#container .contents1 .chapter_title").text()
        }

    }

    if(episode==0){
        var d_1 = `<div class="novel-title">`+title.text()+`</div>`
        var d_2

        if($("#novel_contents .novel_writername a").length){
            var author = $("#novel_contents .novel_writername a")
            d_2 = `<div class="novel-author"><a href="`+author.prop("href")+`">`+author.text()+`</a></div>`
        }else{
            var author = $("#novel_contents .novel_writername").text().trim().match(/作者：(.*)/)[1]
            d_2 = `<div class="novel-author">`+author+`</div>`
        }

        $("#novel_contents").before(`
        <div class="contents1">
            <div class="novel-titles" id="ep-`+episode+`">
                `+d_1+`
                `+d_2+`
            </div>
        </div>
        `)
        $(".novel_title").remove()
        $(".novel_writername").remove()

    }else{
        title.remove()
        var d = `<div class="novel-titles" id="ep-`+episode+`"></div>`
        var d_1 = `<div class="novel-title"><a href="`+title.prop("href")+`">`+title.text()+`</a></div>`
        var d_2

        if($("#container .contents1 a").length){
            var author = $("#container .contents1 a")
            d_2 = `<div class="novel-author"><a href="`+author.prop("href")+`">`+author.text()+`</a></div>`
        }else{
            var author = $("#container .contents1").text().trim().match(/作者：(.*)/)[1]
            d_2 = `<div class="novel-author">`+author+`</div>`
        }
        if(chapter){
            $("#novel_no").after("<div class='novel-chapter'>"+chapter+"</div>")
        }
        
        $("#container .contents1").empty()
        $("#container .contents1").append(d)
        $("#container .contents1 .novel-titles").append(d_1 + d_2)
    }
    


    if(episode==1){
        
    }else if(episode>1){

    }
}

function _tategaki(){
    $("#novel_honbun").wrap(`<div id="novel_vertical_wrapper" style="position: relative;"><div id="novel_vertical_items">`)
    $("body").addClass("narou-tweaker-vertical")
    var items = $("#novel_vertical_items")

    // Elements (Prepend)
    $("#novel_p").prependTo(items)
    $(".novel_subtitle").prependTo(items)
    $(".novel-chapter").prependTo(items)
    $("#novel_no").prependTo(items)
    $(".novel_bn:first-child()").prependTo(items)
    $(".contents1").prependTo(items)

    // Elements (Append)
    $("#novel_a").appendTo(items)
    $(".novel_bn:last-child()").appendTo(items)
    
    if($('#novel_vertical_items').length){
        var width = $("#novel_vertical_items").width() - 300

        gsap.to('#novel_vertical_items', {
            x: () => (width),
            ease: 'none',
            scrollTrigger: {
                trigger: '#novel_vertical_wrapper',
                start: () => `top top`,
                end: () => `+=${width}`,
                scrub: true,
                pin: true,
                anticipatePin: 1,
                invalidateOnRefresh: true,
            },
        });
    }
}

function _autoURL(){
    /* Auto Url */
    chrome.storage.local.get(null, (data) => {
        if(data.novelPrefaceAutoURL){
            $('#novel_p p').each(function (idx, elem) {
                replaceUrl(elem, false)
            });
        }
        
        if(data.novelAfterwordAutoURL){
            $('#novel_a p').each(function (idx, elem) {
                replaceUrl(elem, false)
            });
        }
    })
}

function _history(){
    chrome.storage.local.get(null, function(data){
        const ncode = getNcode()

        if(ncode){
            if($(".index_box").length){
                var outer = $(`<div class="novelview_history-box"></div>`)
                var showHistory = false

                if($(".novellingindex_bookmarker_no").length){
                    var elm = $(".novellingindex_bookmarker_no")
                    var link = elm.find("a").prop("href")
                    var text = elm.find("a").text()
                    outer.append(`
                        <div class="novelview_history-item" id="novel_siori">
                            <i class="fa-solid fa-bookmark"></i><a href="${link}">${text}</a>
                        </div>
                    `)
                    showHistory = true

                }else if($("meta[name='siori']").length){
                    var elm = $("meta[name='siori']")
                    var link = elm.attr("content")
                    var text = elm.attr("property")

                    outer.append(`
                        <div class="novelview_history-item" id="novel_siori">
                            <i class="fa-solid fa-bookmark"></i><a href="${link}">${text}</a>
                        </div>
                    `)
                    showHistory = true
                }

                chrome.storage.sync.get(["history_data"], function(h){
                    const history = h.history_data[ncode]
                    if(history){
                        const episode = history[0]
                        const date = getDatetimeStringWithoutSecond(new Date(history[1]))
                        if(episode){
                            outer.append(`
                                <div class="novelview_history-item" id="novel_history">
                                    <i class="fa-solid fa-clock-rotate-left"></i><a href="https://ncode.syosetu.com/${ncode}/${episode}/">エピソード${episode}</a><span style="font-size: 90%">（${date}）</span>
                                </div>
                            `)
                            showHistory = true

                             /* 目次欄にアンダーラインを追加 */
                            var sublist = $(`.index_box .novel_sublist2:has(a[href="/${ncode}/${episode}/"])`)
                            if(sublist.length){
                                sublist.addClass("underline")
                                sublist.find(".subtitle").append(`<span class="history_now" title="${date}"><i class="fa-solid fa-clock-rotate-left"></i></span>`)
                            }
                        }
                    }
                    if(showHistory){
                        $(".index_box").before(outer)
                    }
                })
            }
        }
    })
}

function _saveHistory(){
    const ncode = getNcode()
    const episode = getEpisode()

    if(ncode){
        chrome.storage.sync.get(["history", "history_data"], function(data){
            var history = data.history
            var history_data = data.history_data
            if(typeof history != typeof []){
                history = []
            }
            if(typeof history_data != typeof {}){
                history_data = {}
            }


            var new_history = history.filter(n => n != ncode);
            new_history.unshift(ncode)
            if(new_history.length > 300){
                const key = new_history.pop()
                delete history_data[key]
            }
            if(episode){
                var episode_name = $(".novel_subtitle").text()
                if(episode_name.length>20){
                    episode_name = episode_name.substr(0, 20) + "…"
                }
                history_data[ncode] = [episode, Date.now(), episode_name]
            }

            chrome.storage.sync.set({
                history: new_history,
                history_data: history_data
            })
        })
    }
}

function _authorLink(){
    const atom = $("link[href^='https://api.syosetu.com/writernovel/'][title='Atom']")
    const r18 = isR18()
    const ncode = getNcode()
    const pageDetail = checkNovelPageDetail()
    let userid
    if(atom.length){
        if(location.hostname == "ncode.syosetu.com"){
            userid = atom.prop("href").match(/https:\/\/api\.syosetu\.com\/writernovel\/(\d+)\.Atom/)[1]
        }else if(location.hostname == "novel18.syosetu.com"){
            userid = atom.prop("href").match(/https:\/\/api\.syosetu\.com\/writernovel\/(x\d+[a-z]+)\.Atom/)[1]
        }
    }

    if(userid){
        var userid_link
        if(r18){
            userid_link =`https://xmypage.syosetu.com/${userid}/`
        }else{
            userid_link =`https://mypage.syosetu.com/${userid}/`
        }

        if(pageDetail=="top"){
            var author_text = $(".novel_writername")
            if(!author_text.find("a").length){
                var author = author_text.text().match(/作者：(.*)/)[1]
                author_text.get(0).innerHTML = `作者：<a href="${userid_link}">${author}</a>`
            }
        }else if(pageDetail=="novel"){
            if($(".novel-author").length){
                if(!$(".novel-author a").length){
                    $(".novel-author").wrapInner(`<a href="${userid_link}">`)
                }
            }else{
                if($(".contents1").length){
                    var outer = $(".contents1").clone()
                    var elm_atteintion = outer.find(".attention")
                    var elm_title = outer.find("a[href='/"+ncode+"/']")
                    var elm_chapter = outer.find(".chapter_title")
                    var elm_atteintion_c = elm_atteintion.clone()
                    var elm_title_c = elm_title.clone()
                    var elm_chapter_c = elm_chapter.clone()

                    elm_atteintion.remove()
                    elm_title.remove()
                    elm_chapter.remove()

                    if(!outer.find("a").length){
                        var author = $("#container .contents1").text().trim().match(/作者：(.*)/)[1]
                        var outer = $(".contents1")
                        outer.empty()
                        outer.append(elm_atteintion)
                        outer.append(elm_title_c)
                        outer.append(` 作者：<a href="${userid_link}">${author}</a> `)
                        outer.append(elm_chapter_c)
                    }
                }
            }
        }else if(pageDetail=="info"){
            $("#noveltable1 tr").each(function(){
                const header = $(this).find("th").text()
                if(header == "作者名"){
                    var elm = $(this).find("td")
                    if(!elm.find("a").length){
                        const author = elm.text()
                        elm.empty()
                        elm.append(`<a href="${userid_link}">${author}</a>`)
                    }
                }
            })
        }
    }
}